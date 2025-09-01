import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.fashn.ai/v1';
const API_KEY = process.env.FASHN_API_KEY;

export const runtime = 'nodejs';
export const maxDuration = 60;
export const preferredRegion = ['hnd1'];

async function uploadImageToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `tryon/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from('tryon-images')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) {
    throw new Error(`Supabase upload error: ${error.message}`);
  }

  const { data: signedData, error: signError } = await supabaseAdmin.storage
    .from('tryon-images')
    .createSignedUrl(filePath, 900);
  if (signError || !signedData.signedUrl) {
    throw new Error(`Supabase signed URL error: ${signError?.message}`);
  }
  return signedData.signedUrl;
}

// 非同期化: POSTはジョブ起動のみ。predictionIdを返す
export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'FASHN_API_KEY を設定してください' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const modelImageFile = formData.get('modelImage') as File | null;
    const garmentImageFile = formData.get('garmentImage') as File | null;

    if (!modelImageFile || !garmentImageFile) {
      return NextResponse.json({ error: 'modelImage と garmentImage が必要です' }, { status: 400 });
    }

    // Supabase にアップロードし署名URLを取得
    const modelImageUrl = await uploadImageToSupabase(modelImageFile);
    const garmentImageUrl = await uploadImageToSupabase(garmentImageFile);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    // Fashn.ai のジョブ起動
    const runResponse = await fetch(`${BASE_URL}/run`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model_name: 'tryon-v1.6',
        inputs: {
          model_image: modelImageUrl,
          garment_image: garmentImageUrl,
        },
      }),
    });

    if (!runResponse.ok) {
      const errorData = await runResponse.json();
      console.error('Fashn.ai /run error:', errorData);
      return NextResponse.json(
        { error: errorData.detail || 'Failed to start try-on process with Fashn.ai.' },
        { status: runResponse.status }
      );
    }

    const { id: predictionId } = await runResponse.json();
    return NextResponse.json({ id: predictionId });
  } catch (error: unknown) {
    console.error('API Route POST error:', error);
    const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// 非同期化: GETはstatusを返す。完了時は画像URLも返す
export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'FASHN_API_KEY を設定してください' }, { status: 500 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id が必要です' }, { status: 400 });
  }

  const headers = { Authorization: `Bearer ${API_KEY}` };
  const statusRes = await fetch(`${BASE_URL}/status/${id}`, { headers });
  if (!statusRes.ok) {
    let detail = 'Failed to get try-on status from Fashn.ai.';
    try {
      const err = await statusRes.json();
      detail = err.detail || detail;
    } catch (_) {}
    return NextResponse.json({ error: detail }, { status: statusRes.status });
  }

  const statusData = await statusRes.json();
  if (statusData.status === 'completed') {
    const resultImageUrl: string | null = statusData.output?.[0] ?? null;
    return NextResponse.json({ status: 'completed', resultImageUrl });
  }
  if (statusData.status === 'failed' || statusData.status === 'canceled') {
    return NextResponse.json({ status: statusData.status, error: statusData.error || null });
  }
  return NextResponse.json({ status: statusData.status });
}
