export type Platform = 'ps4' | 'ps5' | 'xbox' | 'pc'
export type PaymentMethod = 'crypto' | 'bank_transfer' | 'paysafecard' | 'skrill'
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'expired' | 'awaiting_payment'
export type OrderStatus = 'queued' | 'transferring' | 'completed'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          discount_pct: number
          referral_code: string
          referred_by: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          discount_pct?: number
          referral_code: string
          referred_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          discount_pct?: number
          referral_code?: string
          referred_by?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          guest_email: string | null
          platform: Platform
          coin_amount: number
          price_paid: number
          discount_applied: number
          ea_email: string
          ea_password_encrypted: string
          backup_codes_encrypted: string
          payment_method: PaymentMethod
          payment_status: PaymentStatus
          order_status: OrderStatus
          nowpayments_id: string | null
          bank_reference: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          guest_email?: string | null
          platform: Platform
          coin_amount: number
          price_paid: number
          discount_applied?: number
          ea_email: string
          ea_password_encrypted: string
          backup_codes_encrypted: string
          payment_method: PaymentMethod
          payment_status?: PaymentStatus
          order_status?: OrderStatus
          nowpayments_id?: string | null
          bank_reference?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          guest_email?: string | null
          platform?: Platform
          coin_amount?: number
          price_paid?: number
          discount_applied?: number
          ea_email?: string
          ea_password_encrypted?: string
          backup_codes_encrypted?: string
          payment_method?: PaymentMethod
          payment_status?: PaymentStatus
          order_status?: OrderStatus
          nowpayments_id?: string | null
          bank_reference?: string | null
          expires_at?: string | null
          created_at?: string
        }
      }
      prices: {
        Row: {
          platform: Platform
          price_per_million: number
          updated_at: string
        }
        Insert: {
          platform: Platform
          price_per_million?: number
          updated_at?: string
        }
        Update: {
          platform?: Platform
          price_per_million?: number
          updated_at?: string
        }
      }
    }
  }
}
