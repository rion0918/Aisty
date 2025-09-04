import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabaseAdminClient'

export async function GET(_req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Some older rows might use user_id instead of clerk_id. Query both and merge.
  const selectCols = 'id,prediction_id,result_image_url,output_image_url,label,created_at,clerk_id,user_id'

  const [byClerk, byUser] = await Promise.all([
    supabaseAdmin
      .from('tryon_history')
      .select(selectCols)
      .eq('clerk_id', userId)
      .order('created_at', { ascending: false })
      .limit(100),
    supabaseAdmin
      .from('tryon_history')
      .select(selectCols)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  if (byClerk.error) {
    console.error('History fetch error (clerk_id):', byClerk.error)
  }
  if (byUser.error) {
    console.error('History fetch error (user_id):', byUser.error)
  }

  const list1 = byClerk.data ?? []
  const list2 = byUser.data ?? []
  // Merge unique by id
  const map = new Map<string, any>()
  for (const row of [...list1, ...list2]) {
    if (!map.has(row.id)) map.set(row.id, row)
  }
  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )

  return NextResponse.json({ items: merged })
}

export const runtime = 'nodejs'
export const maxDuration = 60
export const preferredRegion = ['hnd1']
