import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdminClient'

// This endpoint is intended to be called by a scheduled job (e.g., Vercel Cron)
// It deletes try-on history entries older than 3 days.

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  const header = req.headers.get('x-cron-key') || undefined
  const url = new URL(req.url)
  const key = url.searchParams.get('key') || undefined
  // Authorize when a secret is configured and either header or query matches
  if (secret && header !== secret && key !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  const thresholdIso = threeDaysAgo.toISOString()

  try {
    // Return deleted rows to count them
    const { data, error } = await supabaseAdmin
      .from('tryon_history')
      .delete()
      .lte('created_at', thresholdIso)
      .select('id')

    if (error) {
      console.error('Purge history error:', error)
      return NextResponse.json({ error: 'Failed to purge history' }, { status: 500 })
    }

    return NextResponse.json({ deleted: data?.length ?? 0, before: thresholdIso })
  } catch (e) {
    console.error('Purge handler error:', e)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const maxDuration = 60
export const preferredRegion = ['hnd1']
