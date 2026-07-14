export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  directory: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          name: Json
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: Json
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      category_assignments: {
        Row: {
          category_id: string
          created_at: string
          entity_id: string
          entity_type: string
        }
        Insert: {
          category_id: string
          created_at?: string
          entity_id: string
          entity_type: string
        }
        Update: {
          category_id?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_assignments_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          attractions_count: number
          cover_image: Json
          created_at: string
          descriptions: Json
          id: string
          itineraries_count: number
          market_products_count: number
          name: string
          popular_score: number
          province_id: string
          rating_average: number
          slug: string
          tour_guides_count: number
          type: string
          updated_at: string
          villages_count: number
        }
        Insert: {
          attractions_count?: number
          cover_image: Json
          created_at?: string
          descriptions?: Json
          id: string
          itineraries_count?: number
          market_products_count?: number
          name: string
          popular_score?: number
          province_id: string
          rating_average?: number
          slug: string
          tour_guides_count?: number
          type: string
          updated_at?: string
          villages_count?: number
        }
        Update: {
          attractions_count?: number
          cover_image?: Json
          created_at?: string
          descriptions?: Json
          id?: string
          itineraries_count?: number
          market_products_count?: number
          name?: string
          popular_score?: number
          province_id?: string
          rating_average?: number
          slug?: string
          tour_guides_count?: number
          type?: string
          updated_at?: string
          villages_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "destinations_province_id_fkey"
            columns: ["province_id"]
            isOneToOne: false
            referencedRelation: "provinces"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          name: Json
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: Json
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: Json
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      facility_assignments: {
        Row: {
          available: boolean
          created_at: string
          entity_id: string
          entity_type: string
          facility_id: string
        }
        Insert: {
          available?: boolean
          created_at?: string
          entity_id: string
          entity_type: string
          facility_id: string
        }
        Update: {
          available?: boolean
          created_at?: string
          entity_id?: string
          entity_type?: string
          facility_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "facility_assignments_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facilities"
            referencedColumns: ["id"]
          },
        ]
      }
      islands: {
        Row: {
          cover_image: Json | null
          created_at: string
          id: string
          name: string
          provinces_count: number
          updated_at: string
        }
        Insert: {
          cover_image?: Json | null
          created_at?: string
          id: string
          name: string
          provinces_count?: number
          updated_at?: string
        }
        Update: {
          cover_image?: Json | null
          created_at?: string
          id?: string
          name?: string
          provinces_count?: number
          updated_at?: string
        }
        Relationships: []
      }
      media: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          metadata: Json
          sort_order: number
          type: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          metadata?: Json
          sort_order?: number
          type: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          metadata?: Json
          sort_order?: number
          type?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      provinces: {
        Row: {
          attractions_count: number
          cover_image: Json | null
          created_at: string
          destinations_count: number
          id: string
          island_id: string
          name: string
          popularity_score: number
          slug: string
          updated_at: string
          villages_count: number
        }
        Insert: {
          attractions_count?: number
          cover_image?: Json | null
          created_at?: string
          destinations_count?: number
          id: string
          island_id: string
          name: string
          popularity_score?: number
          slug: string
          updated_at?: string
          villages_count?: number
        }
        Update: {
          attractions_count?: number
          cover_image?: Json | null
          created_at?: string
          destinations_count?: number
          id?: string
          island_id?: string
          name?: string
          popularity_score?: number
          slug?: string
          updated_at?: string
          villages_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "provinces_island_id_fkey"
            columns: ["island_id"]
            isOneToOne: false
            referencedRelation: "islands"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  directory: {
    Enums: {},
  },
} as const

