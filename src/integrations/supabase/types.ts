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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analytics: {
        Row: {
          automations_triggered: number | null
          created_at: string | null
          date: string
          id: string
          messages_received: number | null
          messages_sent: number | null
          new_contacts: number | null
          response_rate: number | null
          user_id: string
        }
        Insert: {
          automations_triggered?: number | null
          created_at?: string | null
          date: string
          id?: string
          messages_received?: number | null
          messages_sent?: number | null
          new_contacts?: number | null
          response_rate?: number | null
          user_id: string
        }
        Update: {
          automations_triggered?: number | null
          created_at?: string | null
          date?: string
          id?: string
          messages_received?: number | null
          messages_sent?: number | null
          new_contacts?: number | null
          response_rate?: number | null
          user_id?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          last_used_at: string | null
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          last_used_at?: string | null
          name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          last_used_at?: string | null
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      automations: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          instagram_account_id: string | null
          messages_sent: number | null
          name: string
          response_message: string | null
          response_rate: number | null
          status: Database["public"]["Enums"]["automation_status"] | null
          trigger_keywords: string[] | null
          trigger_type: Database["public"]["Enums"]["trigger_type"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          instagram_account_id?: string | null
          messages_sent?: number | null
          name: string
          response_message?: string | null
          response_rate?: number | null
          status?: Database["public"]["Enums"]["automation_status"] | null
          trigger_keywords?: string[] | null
          trigger_type: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          instagram_account_id?: string | null
          messages_sent?: number | null
          name?: string
          response_message?: string | null
          response_rate?: number | null
          status?: Database["public"]["Enums"]["automation_status"] | null
          trigger_keywords?: string[] | null
          trigger_type?: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "automations_instagram_account_id_fkey"
            columns: ["instagram_account_id"]
            isOneToOne: false
            referencedRelation: "instagram_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      billing: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string | null
          followers_count: number | null
          id: string
          instagram_id: string | null
          last_interaction_at: string | null
          name: string | null
          notes: string | null
          phone: string | null
          profile_picture_url: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          tags: string[] | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          followers_count?: number | null
          id?: string
          instagram_id?: string | null
          last_interaction_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          profile_picture_url?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          tags?: string[] | null
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          followers_count?: number | null
          id?: string
          instagram_id?: string | null
          last_interaction_at?: string | null
          name?: string | null
          notes?: string | null
          phone?: string | null
          profile_picture_url?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          tags?: string[] | null
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      instagram_accounts: {
        Row: {
          access_token: string | null
          created_at: string | null
          daily_message_limit: number | null
          followers_count: number | null
          id: string
          instagram_id: string
          is_connected: boolean | null
          last_synced_at: string | null
          messages_sent_today: number | null
          profile_picture_url: string | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          daily_message_limit?: number | null
          followers_count?: number | null
          id?: string
          instagram_id: string
          is_connected?: boolean | null
          last_synced_at?: string | null
          messages_sent_today?: number | null
          profile_picture_url?: string | null
          updated_at?: string | null
          user_id: string
          username: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          daily_message_limit?: number | null
          followers_count?: number | null
          id?: string
          instagram_id?: string
          is_connected?: boolean | null
          last_synced_at?: string | null
          messages_sent_today?: number | null
          profile_picture_url?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          automation_id: string | null
          contact_id: string | null
          content: string
          created_at: string | null
          direction: string
          id: string
          sent_at: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          automation_id?: string | null
          contact_id?: string | null
          content: string
          created_at?: string | null
          direction: string
          id?: string
          sent_at?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          automation_id?: string | null
          contact_id?: string | null
          content?: string
          created_at?: string | null
          direction?: string
          id?: string
          sent_at?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          plan: Database["public"]["Enums"]["subscription_plan"] | null
          timezone: string | null
          two_factor_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          plan?: Database["public"]["Enums"]["subscription_plan"] | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          plan?: Database["public"]["Enums"]["subscription_plan"] | null
          timezone?: string | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          accepted_at: string | null
          id: string
          invited_at: string | null
          member_id: string
          owner_id: string
          permissions: string[] | null
          role: string | null
        }
        Insert: {
          accepted_at?: string | null
          id?: string
          invited_at?: string | null
          member_id: string
          owner_id: string
          permissions?: string[] | null
          role?: string | null
        }
        Update: {
          accepted_at?: string | null
          id?: string
          invited_at?: string | null
          member_id?: string
          owner_id?: string
          permissions?: string[] | null
          role?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          usage_count: number | null
          user_id: string
          variables: string[] | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          usage_count?: number | null
          user_id: string
          variables?: string[] | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          usage_count?: number | null
          user_id?: string
          variables?: string[] | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      automation_status: "active" | "paused" | "draft"
      contact_status: "active" | "inactive" | "blocked"
      subscription_plan: "free" | "pro" | "business" | "enterprise"
      trigger_type:
        | "keyword"
        | "comment"
        | "story_mention"
        | "story_reply"
        | "new_follower"
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
      app_role: ["admin", "moderator", "user"],
      automation_status: ["active", "paused", "draft"],
      contact_status: ["active", "inactive", "blocked"],
      subscription_plan: ["free", "pro", "business", "enterprise"],
      trigger_type: [
        "keyword",
        "comment",
        "story_mention",
        "story_reply",
        "new_follower",
      ],
    },
  },
} as const
