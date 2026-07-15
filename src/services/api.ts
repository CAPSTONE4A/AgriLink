import { supabase } from '../lib/supabase'
import type { Database } from '../lib/database.types'
import { marketplaceListings } from '../data/demoData'

type Tables = Database['public']['Tables']

type FarmerProfileRow = Tables['farmer_profiles']['Row']
type BuyerProfileRow = Tables['buyer_profiles']['Row']
type CooperativeProfileRow = Tables['cooperative_profiles']['Row']
type ExtensionProfileRow = Tables['extension_profiles']['Row']
type LenderProfileRow = Tables['lender_profiles']['Row']
type ListingRow = Tables['listings']['Row']
export type OrderRow = Tables['orders']['Row']
type LoanApplicationRow = Tables['loan_applications']['Row']
type KnowledgeArticleRow = Tables['knowledge_articles']['Row']
type QuestionRow = Tables['questions']['Row']
type ProfileRow = Tables['profiles']['Row']

export interface DashboardStats {
  totalUsers: number
  totalFarmers: number
  totalBuyers: number
  totalCooperatives: number
  totalExtensions: number
  totalLenders: number
  totalListings: number
  totalOrders: number
  totalRevenue: number
  pendingLoans: number
  pendingKyc: number
  openQuestions: number
}

export interface AdminUser {
  id: string
  full_name: string
  email: string | null
  role: string
  created_at: string
}

export interface AdminKycItem {
  id: string
  user_id: string
  full_name: string
  email: string | null
  role: string
  farm_name?: string
  business_name?: string
  cooperative_name?: string
  created_at: string
}

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!supabase) {
    return {
      totalUsers: 0,
      totalFarmers: 0,
      totalBuyers: 0,
      totalCooperatives: 0,
      totalExtensions: 0,
      totalLenders: 0,
      totalListings: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingLoans: 0,
      pendingKyc: 0,
      openQuestions: 0,
    }
  }

  const [
    { count: totalUsers },
    { count: totalFarmers },
    { count: totalBuyers },
    { count: totalCooperatives },
    { count: totalExtensions },
    { count: totalLenders },
    { count: totalListings },
    { count: totalOrders },
    { count: pendingLoans },
    { count: openQuestions },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'farmer'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'buyer'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'cooperative'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'extension'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'lender'),
    supabase.from('listings').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('loan_applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('questions').select('*', { count: 'exact', head: true }).eq('status', 'open'),
  ])

  const { data: orders } = await supabase.from('orders').select('total_amount')
  const totalRevenue = (orders ?? []).reduce((sum, order) => sum + Number((order as { total_amount: number }).total_amount), 0)

  return {
    totalUsers: totalUsers ?? 0,
    totalFarmers: totalFarmers ?? 0,
    totalBuyers: totalBuyers ?? 0,
    totalCooperatives: totalCooperatives ?? 0,
    totalExtensions: totalExtensions ?? 0,
    totalLenders: totalLenders ?? 0,
    totalListings: totalListings ?? 0,
    totalOrders: totalOrders ?? 0,
    totalRevenue,
    pendingLoans: pendingLoans ?? 0,
    pendingKyc: 0,
    openQuestions: openQuestions ?? 0,
  }
}

export async function getUsers(): Promise<AdminUser[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as AdminUser[]
}

export async function getListings(): Promise<ListingRow[]> {
  if (!supabase) {
    return marketplaceListings.map((listing) => ({
      id: listing.id,
      farmer_id: 'demo-farmer',
      title: listing.title,
      description: '',
      category: listing.category,
      price_per_unit: parseFloat(listing.price.replace(/[₱,]/g, '').split('/')[0]) || 0,
      unit: listing.price.includes('/') ? listing.price.split('/')[1].trim() : 'unit',
      quantity_available: parseFloat(listing.quantity.replace(/[^\d.]/g, '')) || 0,
      quantity_sold: 0,
      location: listing.location,
      images: null,
      badge: listing.badge,
      status: 'active',
      harvest_date: null,
      expiry_date: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })) as ListingRow[]
  }
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as ListingRow[]
}

export async function getAllOrders(): Promise<OrderRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as OrderRow[]
}

export async function getOrders(buyerId: string): Promise<OrderRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('buyer_id', buyerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as OrderRow[]
}

export async function getListingsByFarmer(farmerId: string): Promise<ListingRow[]> {
  if (!supabase) {
    return marketplaceListings
      .filter((listing) => listing.id !== '4')
      .map((listing) => ({
        id: listing.id,
        farmer_id: farmerId,
        title: listing.title,
        description: '',
        category: listing.category,
        price_per_unit: parseFloat(listing.price.replace(/[₱,]/g, '').split('/')[0]) || 0,
        unit: listing.price.includes('/') ? listing.price.split('/')[1].trim() : 'unit',
        quantity_available: parseFloat(listing.quantity.replace(/[^\d.]/g, '')) || 0,
        quantity_sold: 0,
        location: listing.location,
        images: null,
        badge: listing.badge,
        status: 'active',
        harvest_date: null,
        expiry_date: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })) as ListingRow[]
  }
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('farmer_id', farmerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as ListingRow[]
}

export async function getOrdersByFarmer(farmerId: string): Promise<OrderRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*, listings!inner(farmer_id)')
    .eq('listings.farmer_id', farmerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as OrderRow[]
}

export async function getFarmerProfile(userId: string): Promise<FarmerProfileRow | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('farmer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data as FarmerProfileRow
}

export async function getBuyerProfile(userId: string): Promise<BuyerProfileRow | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('buyer_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data as BuyerProfileRow
}

export async function getCooperativeProfile(userId: string): Promise<CooperativeProfileRow | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('cooperative_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data as CooperativeProfileRow
}

export async function getExtensionProfile(userId: string): Promise<ExtensionProfileRow | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('extension_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data as ExtensionProfileRow
}

export async function getLenderProfile(userId: string): Promise<LenderProfileRow | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('lender_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) return null
  return data as LenderProfileRow
}

export async function getLoanApplications(): Promise<LoanApplicationRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('loan_applications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as LoanApplicationRow[]
}

export async function getKnowledgeArticles(): Promise<KnowledgeArticleRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('knowledge_articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as KnowledgeArticleRow[]
}

export async function getQuestions(): Promise<QuestionRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw error
  return (data ?? []) as QuestionRow[]
}

export async function getProfile(userId: string): Promise<ProfileRow | null> {
  if (!supabase) return null
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) return null
  return data as ProfileRow
}

export async function updateOrderStatus(orderId: string, status: string): Promise<void> {
  if (!supabase) return
  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() } as never)
    .eq('id', orderId)

  if (error) throw error
}
