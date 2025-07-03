import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdminClient';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "https://api.fashn.ai/v1";
const API_KEY = process.env.FASHN_API_KEY;

async function uploadImageToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `tryon/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from('tryon-images') // 実際のSupabaseバケット名を使用してください
    .upload(filePath, file, { cacheControl: '3600', upsert: false });

  if (error) {
    throw new Error(`Supabase upload error: ${error.message}`);
  }

  const { data: signedData, error: signError } = await supabaseAdmin.storage
    .from('tryon-images')
    .createSignedUrl(filePath, 60); // URLは60秒間有効
  if (signError || !signedData.signedUrl) {
    throw new Error(`Supabase signed URL error: ${signError?.message}`);
  }
  return signedData.signedUrl;
}

export async function POST(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'FASHN_API_KEY is not set in environment variables.' }, { status: 500 });
  }

  try {
    const formData = await req.formData();
    const modelImageFile = formData.get('modelImage') as File | null;
    const garmentImageFile = formData.get('garmentImage') as File | null;

    if (!modelImageFile || !garmentImageFile) {
      return NextResponse.json({ error: 'Both modelImage and garmentImage are required.' }, { status: 400 });
    }

    // 画像をSupabaseストレージにアップロード
    const modelImageUrl = await uploadImageToSupabase(modelImageFile);
    const garmentImageUrl = await uploadImageToSupabase(garmentImageFile);

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    };

    // ステップ1: Fashn.aiの/runエンドポイントに画像URLを送信
    const runResponse = await fetch(`${BASE_URL}/run`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        model_name: "tryon-v1.6", // またはtryon-v1.5
        inputs: {
          model_image: modelImageUrl,
          garment_image: garmentImageUrl,
        },
      }),
    });

    if (!runResponse.ok) {
      const errorData = await runResponse.json();
      console.error('Fashn.ai /run error:', errorData);
      return NextResponse.json({ error: errorData.detail || 'Failed to start try-on process with Fashn.ai.' }, { status: runResponse.status });
    }

    const { id: predictionId } = await runResponse.json();

    // ステップ2: 結果のために/status/:idエンドポイントをポーリング
    let resultImageUrl: string | null = null;
    let status = '';
    while (status !== 'completed' && status !== 'failed' && status !== 'canceled') {
      await new Promise(resolve => setTimeout(resolve, 3000)); // ポーリング前に3秒待機

      const statusRes = await fetch(`${BASE_URL}/status/${predictionId}`, { headers });
      if (!statusRes.ok) {
        const errorData = await statusRes.json();
        console.error('Fashn.ai /status error:', errorData);
        return NextResponse.json({ error: errorData.detail || 'Failed to get try-on status from Fashn.ai.' }, { status: statusRes.status });
      }

      const statusData = await statusRes.json();
      status = statusData.status;

      if (status === 'completed') {
        resultImageUrl = statusData.output[0]; // 最初の出力が画像URLであると仮定
      } else if (status === 'failed' || status === 'canceled') {
        console.error('Fashn.ai try-on failed or was canceled:', statusData.error);
        return NextResponse.json({ error: statusData.error || 'Try-on process failed or was canceled.' }, { status: 500 });
      }
    }

    if (resultImageUrl) {
      return NextResponse.json({ resultImageUrl });
    } else {
      return NextResponse.json({ error: 'No result image URL received.' }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('API Route error:', error);
    let message = 'An unexpected error occurred.';
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
