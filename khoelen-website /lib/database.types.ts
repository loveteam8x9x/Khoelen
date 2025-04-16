export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number
          created_at: string
          updated_at: string
          title: string
          slug: string
          content: string
          featured_image: string | null
          author_id: string
          published: boolean
          published_at: string | null
          category_id: number | null
        }
        Insert: {
          id?: number
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          content: string
          featured_image?: string | null
          author_id: string
          published?: boolean
          published_at?: string | null
          category_id?: number | null
        }
        Update: {
          id?: number
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          content?: string
          featured_image?: string | null
          author_id?: string
          published?: boolean
          published_at?: string | null
          category_id?: number | null
        }
      }
      categories: {
        Row: {
          id: number
          created_at: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          slug?: string
          description?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          role: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
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
      [_ in never]: never
    }
  }
}
