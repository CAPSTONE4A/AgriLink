export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AuthRole = 'farmer' | 'cooperative' | 'buyer' | 'extension' | 'lender' | 'admin'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: AuthRole
          full_name: string
          phone: string | null
          email: string | null
          avatar_url: string | null
          address: string | null
          barangay: string | null
          municipality: string | null
          province: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: AuthRole
          full_name: string
          phone?: string | null
          email?: string | null
          avatar_url?: string | null
          address?: string | null
          barangay?: string | null
          municipality?: string | null
          province?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: AuthRole
          full_name?: string
          phone?: string | null
          email?: string | null
          avatar_url?: string | null
          address?: string | null
          barangay?: string | null
          municipality?: string | null
          province?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      farmer_profiles: {
        Row: {
          id: string
          user_id: string
          farm_name: string
          farm_type: string | null
          farm_size_hectares: number | null
          crops_grown: Json | null
          years_farming: number | null
          cooperative_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          farm_name: string
          farm_type?: string | null
          farm_size_hectares?: number | null
          crops_grown?: Json | null
          years_farming?: number | null
          cooperative_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          farm_name?: string
          farm_type?: string | null
          farm_size_hectares?: number | null
          crops_grown?: Json | null
          years_farming?: number | null
          cooperative_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      buyer_profiles: {
        Row: {
          id: string
          user_id: string
          business_name: string
          business_type: string | null
          preferred_crops: Json | null
          typical_order_volume: string | null
          delivery_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          business_name: string
          business_type?: string | null
          preferred_crops?: Json | null
          typical_order_volume?: string | null
          delivery_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          business_name?: string
          business_type?: string | null
          preferred_crops?: Json | null
          typical_order_volume?: string | null
          delivery_address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          farmer_id: string
          title: string
          description: string | null
          category: string
          price_per_unit: number
          unit: string
          quantity_available: number
          quantity_sold: number
          location: string
          images: Json | null
          badge: string | null
          status: string
          harvest_date: string | null
          expiry_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          farmer_id: string
          title: string
          description?: string | null
          category: string
          price_per_unit: number
          unit: string
          quantity_available: number
          quantity_sold?: number
          location: string
          images?: Json | null
          badge?: string | null
          status?: string
          harvest_date?: string | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          farmer_id?: string
          title?: string
          description?: string | null
          category?: string
          price_per_unit?: number
          unit?: string
          quantity_available?: number
          quantity_sold?: number
          location?: string
          images?: Json | null
          badge?: string | null
          status?: string
          harvest_date?: string | null
          expiry_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          buyer_id: string
          listing_id: string | null
          status: string
          total_amount: number
          quantity: number
          delivery_method: string | null
          delivery_address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          buyer_id: string
          listing_id?: string | null
          status?: string
          total_amount: number
          quantity: number
          delivery_method?: string | null
          delivery_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          buyer_id?: string
          listing_id?: string | null
          status?: string
          total_amount?: number
          quantity?: number
          delivery_method?: string | null
          delivery_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          order_id: string | null
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          order_id?: string | null
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string | null
          sender_id?: string
          receiver_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          order_id: string
          amount: number
          method: string
          status: string
          reference: string | null
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          amount: number
          method: string
          status?: string
          reference?: string | null
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          amount?: number
          method?: string
          status?: string
          reference?: string | null
          paid_at?: string | null
          created_at?: string
        }
      }
      cooperative_profiles: {
        Row: {
          id: string
          user_id: string
          cooperative_name: string
          registration_number: string | null
          member_count: number
          total_shared_land_hectares: number | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          cooperative_name: string
          registration_number?: string | null
          member_count?: number
          total_shared_land_hectares?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          cooperative_name?: string
          registration_number?: string | null
          member_count?: number
          total_shared_land_hectares?: number | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      extension_profiles: {
        Row: {
          id: string
          user_id: string
          agency_name: string
          region: string
          province: string
          municipality: string
          specialization: string | null
          years_experience: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          agency_name: string
          region: string
          province: string
          municipality: string
          specialization?: string | null
          years_experience?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          agency_name?: string
          region?: string
          province?: string
          municipality?: string
          specialization?: string | null
          years_experience?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      lender_profiles: {
        Row: {
          id: string
          user_id: string
          institution_name: string
          institution_type: string
          region: string
          contact_person: string | null
          phone: string | null
          email: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          institution_name: string
          institution_type: string
          region: string
          contact_person?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          institution_name?: string
          institution_type?: string
          region?: string
          contact_person?: string | null
          phone?: string | null
          email?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      loan_applications: {
        Row: {
          id: string
          farmer_id: string
          lender_id: string | null
          amount: number
          purpose: string
          term_months: number
          interest_rate: number | null
          status: string
          documents: Json | null
          reviewed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          farmer_id: string
          lender_id?: string | null
          amount: number
          purpose: string
          term_months: number
          interest_rate?: number | null
          status?: string
          documents?: Json | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          farmer_id?: string
          lender_id?: string | null
          amount?: number
          purpose?: string
          term_months?: number
          interest_rate?: number | null
          status?: string
          documents?: Json | null
          reviewed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      knowledge_articles: {
        Row: {
          id: string
          author_id: string
          title: string
          content: string
          category: string
          tags: Json | null
          region: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          content: string
          category: string
          tags?: Json | null
          region?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          title?: string
          content?: string
          category?: string
          tags?: Json | null
          region?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      questions: {
        Row: {
          id: string
          asker_id: string
          responder_id: string | null
          title: string
          body: string
          category: string
          region: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          asker_id: string
          responder_id?: string | null
          title: string
          body: string
          category: string
          region?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          asker_id?: string
          responder_id?: string | null
          title?: string
          body?: string
          category?: string
          region?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      auth_role: AuthRole
    }
  }
}
