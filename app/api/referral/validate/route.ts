export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return Response.json({ valid: false })
  }

  // TODO: Supabase — zoek code op in profiles tabel
  // const { data } = await supabase_server.from('profiles').select('id').eq('referral_code', code).single()
  // return Response.json({ valid: !!data, referrerId: data?.id })

  // Mock response
  return Response.json({ valid: true, referrerId: 'mock-uuid' })
}
