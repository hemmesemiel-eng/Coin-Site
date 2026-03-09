import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  // TODO: Supabase — controleer sessie server-side via @supabase/ssr
  // import { createServerClient } from '@supabase/ssr'
  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //   { cookies: { getAll: () => request.cookies.getAll() } }
  // )
  // const { data: { session } } = await supabase.auth.getSession()
  // if (!session || session.user.app_metadata?.role !== 'owner') {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // Tijdelijk: altijd doorlaten (Supabase nog niet live)
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
