export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      hr_access_requests: {
        Row: {
          created_at: string
          cv_id: string
          cv_owner_id: string
          hr_email: string
          hr_name: string | null
          hr_user_id: string
          id: string
          message: string | null
          responded_at: string | null
          status: Database["public"]["Enums"]["hr_request_status"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          cv_id: string
          cv_owner_id: string
          hr_email: string
          hr_name?: string | null
          hr_user_id: string
          id?: string
          message?: string | null
          responded_at?: string | null
          status?: Database["public"]["Enums"]["hr_request_status"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          cv_id?: string
          cv_owner_id?: string
          hr_email?: string
          hr_name?: string | null
          hr_user_id?: string
          id?: string
          message?: string | null
          responded_at?: string | null
          status?: Database["public"]["Enums"]["hr_request_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hr_access_requests_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "published_cvs"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_cloned_cvs: {
        Row: {
          created_at: string
          cv_data: Json
          hr_user_id: string
          id: string
          name: string
          notes: string | null
          original_cv_id: string | null
          original_user_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          cv_data: Json
          hr_user_id: string
          id?: string
          name?: string
          notes?: string | null
          original_cv_id?: string | null
          original_user_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          cv_data?: Json
          hr_user_id?: string
          id?: string
          name?: string
          notes?: string | null
          original_cv_id?: string | null
          original_user_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hr_cloned_cvs_original_cv_id_fkey"
            columns: ["original_cv_id"]
            isOneToOne: false
            referencedRelation: "published_cvs"
            referencedColumns: ["id"]
          },
        ]
      }
      pro_waitlist: {
        Row: {
          created_at: string
          email: string
          id: string
          language: string | null
          plan_type: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          language?: string | null
          plan_type: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          language?: string | null
          plan_type?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
          premium_until: string | null
          referral_code: string | null
          referral_credits: number | null
          referred_by: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
          premium_until?: string | null
          referral_code?: string | null
          referral_credits?: number | null
          referred_by?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          premium_until?: string | null
          referral_code?: string | null
          referral_credits?: number | null
          referred_by?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
        }
        Relationships: []
      }
      published_cvs: {
        Row: {
          allow_hr_copy: boolean
          created_at: string
          cv_data: Json
          id: string
          is_public: boolean
          slug: string
          updated_at: string
          user_id: string
          views_count: number
        }
        Insert: {
          allow_hr_copy?: boolean
          created_at?: string
          cv_data: Json
          id?: string
          is_public?: boolean
          slug: string
          updated_at?: string
          user_id: string
          views_count?: number
        }
        Update: {
          allow_hr_copy?: boolean
          created_at?: string
          cv_data?: Json
          id?: string
          is_public?: boolean
          slug?: string
          updated_at?: string
          user_id?: string
          views_count?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          commission_paid: number | null
          converted_to_premium: boolean | null
          created_at: string | null
          id: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          commission_paid?: number | null
          converted_to_premium?: boolean | null
          created_at?: string | null
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          commission_paid?: number | null
          converted_to_premium?: boolean | null
          created_at?: string | null
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referred_id_fkey"
            columns: ["referred_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_cvs: {
        Row: {
          created_at: string
          cv_data: Json
          deleted_at: string | null
          id: string
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cv_data: Json
          deleted_at?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cv_data?: Json
          deleted_at?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_deleted_cvs: { Args: never; Returns: number }
      generate_cv_slug: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_cv_views: { Args: { cv_slug: string }; Returns: undefined }
    }
    Enums: {
      app_role: "user" | "hr" | "admin"
      hr_request_status: "pending" | "approved" | "denied"
      subscription_tier: "free" | "premium"
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
  public: {
    Enums: {
      app_role: ["user", "hr", "admin"],
      hr_request_status: ["pending", "approved", "denied"],
      subscription_tier: ["free", "premium"],
    },
  },
} as const
