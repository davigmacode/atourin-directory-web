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
      attraction_categories: {
        Row: {
          attraction_id: string
          created_at: string
          taxonomy_id: string
        }
        Insert: {
          attraction_id: string
          created_at?: string
          taxonomy_id: string
        }
        Update: {
          attraction_id?: string
          created_at?: string
          taxonomy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attraction_categories_attraction_id_fkey"
            columns: ["attraction_id"]
            isOneToOne: false
            referencedRelation: "attractions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attraction_categories_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
        ]
      }
      attractions: {
        Row: {
          cover_image: Json
          created_at: string
          description: Json
          destination_id: string
          id: string
          location_accessibility: Json
          location_address: Json
          location_directions: Json
          location_latitude: number | null
          location_longitude: number | null
          min_price: number
          name: string
          opening_hours: Json
          rating_average: number
          reviews_count: number
          slug: string
          trekking: boolean
          updated_at: string
        }
        Insert: {
          cover_image: Json
          created_at?: string
          description?: Json
          destination_id: string
          id?: string
          location_accessibility?: Json
          location_address?: Json
          location_directions?: Json
          location_latitude?: number | null
          location_longitude?: number | null
          min_price?: number
          name: string
          opening_hours: Json
          rating_average?: number
          reviews_count?: number
          slug: string
          trekking?: boolean
          updated_at?: string
        }
        Update: {
          cover_image?: Json
          created_at?: string
          description?: Json
          destination_id?: string
          id?: string
          location_accessibility?: Json
          location_address?: Json
          location_directions?: Json
          location_latitude?: number | null
          location_longitude?: number | null
          min_price?: number
          name?: string
          opening_hours?: Json
          rating_average?: number
          reviews_count?: number
          slug?: string
          trekking?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "attractions_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      certifications: {
        Row: {
          created_at: string
          entity_types: string[]
          id: string
          issuer: string
          metadata: Json
          name: Json
          slug: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_types?: string[]
          id?: string
          issuer?: string
          metadata?: Json
          name?: Json
          slug: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_types?: string[]
          id?: string
          issuer?: string
          metadata?: Json
          name?: Json
          slug?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      destination_categories: {
        Row: {
          created_at: string
          destination_id: string
          taxonomy_id: string
        }
        Insert: {
          created_at?: string
          destination_id: string
          taxonomy_id: string
        }
        Update: {
          created_at?: string
          destination_id?: string
          taxonomy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "destination_categories_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "destination_categories_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
        ]
      }
      destinations: {
        Row: {
          attractions_count: number
          cover_image: Json
          created_at: string
          description: Json
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
          description?: Json
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
          description?: Json
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
          entity_types: string[]
          id: string
          metadata: Json
          name: Json
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_types?: string[]
          id?: string
          metadata?: Json
          name?: Json
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_types?: string[]
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
          created_at: string
          entity_id: string
          entity_type: string
          facility_id: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          facility_id: string
        }
        Update: {
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
          caption: Json
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
          caption?: Json
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
          caption?: Json
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
      price_tiers: {
        Row: {
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          name: Json
          price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          name?: Json
          price?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          name?: Json
          price?: number
          updated_at?: string
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
      taxonomies: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          name: Json
          slug: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: Json
          slug: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          name?: Json
          slug?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      tour_guide_certifications: {
        Row: {
          certificate_url: string | null
          certification_id: string
          created_at: string
          expires_at: string | null
          issued_at: string | null
          notes: string | null
          proficiency_level: string | null
          tour_guide_id: string
        }
        Insert: {
          certificate_url?: string | null
          certification_id: string
          created_at?: string
          expires_at?: string | null
          issued_at?: string | null
          notes?: string | null
          proficiency_level?: string | null
          tour_guide_id: string
        }
        Update: {
          certificate_url?: string | null
          certification_id?: string
          created_at?: string
          expires_at?: string | null
          issued_at?: string | null
          notes?: string | null
          proficiency_level?: string | null
          tour_guide_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_guide_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_guide_certifications_tour_guide_id_fkey"
            columns: ["tour_guide_id"]
            isOneToOne: false
            referencedRelation: "tour_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_guide_languages: {
        Row: {
          category_id: string
          created_at: string
          fluency: string
          fluency_rate: number | null
          guide_id: string
        }
        Insert: {
          category_id: string
          created_at?: string
          fluency?: string
          fluency_rate?: number | null
          guide_id: string
        }
        Update: {
          category_id?: string
          created_at?: string
          fluency?: string
          fluency_rate?: number | null
          guide_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_guide_languages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_guide_languages_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "tour_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_guide_packages: {
        Row: {
          created_at: string
          description: Json
          duration_days: number
          duration_nights: number
          guide_id: string
          highlights: Json
          id: string
          is_bestseller: boolean
          max_pax: number
          min_pax: number
          price_note: string
          price_per_pax: number
          schedule_end: string
          schedule_start: string
          slug: string
          sort_order: number
          title: Json
          transport_capacity: string
          transport_type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: Json
          duration_days?: number
          duration_nights?: number
          guide_id: string
          highlights?: Json
          id?: string
          is_bestseller?: boolean
          max_pax?: number
          min_pax?: number
          price_note?: string
          price_per_pax?: number
          schedule_end?: string
          schedule_start?: string
          slug: string
          sort_order?: number
          title?: Json
          transport_capacity?: string
          transport_type?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: Json
          duration_days?: number
          duration_nights?: number
          guide_id?: string
          highlights?: Json
          id?: string
          is_bestseller?: boolean
          max_pax?: number
          min_pax?: number
          price_note?: string
          price_per_pax?: number
          schedule_end?: string
          schedule_start?: string
          slug?: string
          sort_order?: number
          title?: Json
          transport_capacity?: string
          transport_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_guide_packages_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "tour_guides"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_guide_specialism: {
        Row: {
          created_at: string
          guide_id: string
          is_primary: boolean
          taxonomy_id: string
        }
        Insert: {
          created_at?: string
          guide_id: string
          is_primary?: boolean
          taxonomy_id: string
        }
        Update: {
          created_at?: string
          guide_id?: string
          is_primary?: boolean
          taxonomy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_guide_specialism_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "tour_guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_guide_specialism_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
        ]
      }
      tour_guides: {
        Row: {
          avatar: Json
          cover_image: Json
          created_at: string
          daily_rate: number
          description: Json
          destination_id: string
          id: string
          name: string
          rating_average: number
          reviews_count: number
          slug: string
          trips_count: number
          updated_at: string
          verified: boolean
          year_experience: number
        }
        Insert: {
          avatar?: Json
          cover_image?: Json
          created_at?: string
          daily_rate?: number
          description?: Json
          destination_id: string
          id?: string
          name: string
          rating_average?: number
          reviews_count?: number
          slug: string
          trips_count?: number
          updated_at?: string
          verified?: boolean
          year_experience?: number
        }
        Update: {
          avatar?: Json
          cover_image?: Json
          created_at?: string
          daily_rate?: number
          description?: Json
          destination_id?: string
          id?: string
          name?: string
          rating_average?: number
          reviews_count?: number
          slug?: string
          trips_count?: number
          updated_at?: string
          verified?: boolean
          year_experience?: number
        }
        Relationships: [
          {
            foreignKeyName: "tour_guides_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      tourism_village_activities: {
        Row: {
          created_at: string
          taxonomy_id: string
          tourism_village_id: string
        }
        Insert: {
          created_at?: string
          taxonomy_id: string
          tourism_village_id: string
        }
        Update: {
          created_at?: string
          taxonomy_id?: string
          tourism_village_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tourism_village_activities_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourism_village_activities_tourism_village_id_fkey"
            columns: ["tourism_village_id"]
            isOneToOne: false
            referencedRelation: "tourism_villages"
            referencedColumns: ["id"]
          },
        ]
      }
      tourism_village_categories: {
        Row: {
          created_at: string
          taxonomy_id: string
          tourism_village_id: string
        }
        Insert: {
          created_at?: string
          taxonomy_id: string
          tourism_village_id: string
        }
        Update: {
          created_at?: string
          taxonomy_id?: string
          tourism_village_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tourism_village_categories_taxonomy_id_fkey"
            columns: ["taxonomy_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourism_village_categories_tourism_village_id_fkey"
            columns: ["tourism_village_id"]
            isOneToOne: false
            referencedRelation: "tourism_villages"
            referencedColumns: ["id"]
          },
        ]
      }
      tourism_village_certifications: {
        Row: {
          awarded_at: string | null
          certification_id: string
          created_at: string
          notes: string | null
          tourism_village_id: string
          valid_until: string | null
        }
        Insert: {
          awarded_at?: string | null
          certification_id: string
          created_at?: string
          notes?: string | null
          tourism_village_id: string
          valid_until?: string | null
        }
        Update: {
          awarded_at?: string | null
          certification_id?: string
          created_at?: string
          notes?: string | null
          tourism_village_id?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tourism_village_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourism_village_certifications_tourism_village_id_fkey"
            columns: ["tourism_village_id"]
            isOneToOne: false
            referencedRelation: "tourism_villages"
            referencedColumns: ["id"]
          },
        ]
      }
      tourism_villages: {
        Row: {
          adwi_level_id: string | null
          cover_image: Json
          created_at: string
          description: Json
          destination_id: string
          featured: boolean
          homestay_count: number
          homestay_min_price: number
          id: string
          location_accessibility: Json
          location_address: Json
          location_directions: Json
          location_latitude: number | null
          location_longitude: number | null
          max_daily_visitor: number
          name: string
          rating_average: number
          reviews_count: number
          signature: string
          slug: string
          updated_at: string
          village_theme_id: string | null
        }
        Insert: {
          adwi_level_id?: string | null
          cover_image: Json
          created_at?: string
          description?: Json
          destination_id: string
          featured?: boolean
          homestay_count?: number
          homestay_min_price?: number
          id?: string
          location_accessibility?: Json
          location_address?: Json
          location_directions?: Json
          location_latitude?: number | null
          location_longitude?: number | null
          max_daily_visitor?: number
          name: string
          rating_average?: number
          reviews_count?: number
          signature?: string
          slug: string
          updated_at?: string
          village_theme_id?: string | null
        }
        Update: {
          adwi_level_id?: string | null
          cover_image?: Json
          created_at?: string
          description?: Json
          destination_id?: string
          featured?: boolean
          homestay_count?: number
          homestay_min_price?: number
          id?: string
          location_accessibility?: Json
          location_address?: Json
          location_directions?: Json
          location_latitude?: number | null
          location_longitude?: number | null
          max_daily_visitor?: number
          name?: string
          rating_average?: number
          reviews_count?: number
          signature?: string
          slug?: string
          updated_at?: string
          village_theme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tourism_villages_adwi_level_id_fkey"
            columns: ["adwi_level_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourism_villages_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tourism_villages_village_theme_id_fkey"
            columns: ["village_theme_id"]
            isOneToOne: false
            referencedRelation: "taxonomies"
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

