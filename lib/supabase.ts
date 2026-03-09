import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Client-side (browser) client — gebruikt de anon key, veilig om te exposen
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Server-side client — gebruikt de service role key (alleen in Server Components / API routes)
// De service role key omzeilt Row Level Security, dus nooit in de browser gebruiken
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
