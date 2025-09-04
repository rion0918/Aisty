import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabaseAdminClient'

export async function GET(_req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('tryon_history')
    .select('id,prediction_id,result_image_url,label,created_at,clerk_id')
    .eq('clerk_id', userId)
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('History fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 })
  }

  return NextResponse.json({ items: data ?? [] })
}

export const runtime = 'nodejs'
export const maxDuration = 60
export const preferredRegion = ['hnd1']
