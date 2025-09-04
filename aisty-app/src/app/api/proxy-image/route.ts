import { NextRequest } from 'next/server'

function hostMatches(hostname: string, allowed: string) {
  return hostname === allowed || hostname.endsWith(`.${allowed}`)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const urlParam = searchParams.get('url')
  if (!urlParam) {
    return new Response('Missing url', { status: 400 })
  }

  let target: URL
  try {
    target = new URL(urlParam)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }

  // Allow-list target hosts to avoid creating an open proxy
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const allowedHosts: string[] = ['fashn.ai', 'api.fashn.ai', 'storage.googleapis.com']
  if (supabaseUrl) {
    try {
      allowedHosts.push(new URL(supabaseUrl).hostname)
    } catch {}
  }

  const isAllowed = allowedHosts.some((h) => hostMatches(target.hostname, h))
  if (!isAllowed) {
    return new Response('Host not allowed', { status: 400 })
  }

  const headers: Record<string, string> = {}

  // Some providers require auth to fetch the final asset
  if (hostMatches(target.hostname, 'fashn.ai') || hostMatches(target.hostname, 'api.fashn.ai')) {
    const apiKey = process.env.FASHN_API_KEY
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`
    }
  }

  const upstream = await fetch(target.toString(), { headers })

  if (!upstream.ok) {
    return new Response('Upstream fetch failed', { status: upstream.status })
  }

  const contentType = upstream.headers.get('content-type') ?? 'application/octet-stream'
  const body = upstream.body ?? (await upstream.arrayBuffer())

  return new Response(body as any, {
    status: 200,
    headers: {
      'content-type': contentType,
      // short cache to reduce repeated fetches while keeping fresh
      'cache-control': 'public, max-age=300',
    },
  })
}

export const runtime = 'nodejs'
export const maxDuration = 60
export const preferredRegion = ['hnd1']

