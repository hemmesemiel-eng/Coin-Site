import type { OrderStatus } from '@/types/database'

const VALID_STATUSES: OrderStatus[] = ['queued', 'transferring', 'completed']

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { status } = await request.json() as { status: OrderStatus }

  if (!VALID_STATUSES.includes(status)) {
    return Response.json({ error: 'Invalid status' }, { status: 400 })
  }

  // TODO: Auth check — verifieer owner-rol via Supabase app_metadata
  // const supabase = createServerClient()
  // const { data: { user } } = await supabase.auth.getUser()
  // if (!user || user.app_metadata?.role !== 'owner') {
  //   return Response.json({ error: 'Unauthorized' }, { status: 403 })
  // }

  // TODO: Supabase — update order status
  // const { error } = await supabase.from('orders').update({ order_status: status }).eq('id', id)
  // if (error) return Response.json({ error: 'Update failed' }, { status: 500 })

  console.log(`Order ${id} status updated to ${status}`)
  return Response.json({ ok: true })
}
