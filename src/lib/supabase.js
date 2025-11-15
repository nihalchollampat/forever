import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://demggjzwvfsxxlmxeryi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbWdnanp3dmZzeHhsbXhlcnlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxODQ4MDIsImV4cCI6MjA3ODc2MDgwMn0.9-DPemkhg34lGiey4RlbtChK60rMfEn1EKzI3jczc-8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
