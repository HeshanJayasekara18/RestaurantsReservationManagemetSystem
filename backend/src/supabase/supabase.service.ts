import { Injectable, Logger } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;
  private readonly logger = new Logger(SupabaseService.name);

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      this.logger.error('Supabase URL or Key is missing in environment variables');
      // Potential workaround to avoid crash on startup if credentials aren't set yet, 
      // but ideally this should throw or be handled gracefully.
      // For now, initializing with empty strings to satisfy TS, but it will fail on requests.
       this.supabase = createClient(supabaseUrl || '', supabaseKey || '');
       return;
    }

    try {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    } catch (error) {
      this.logger.error(`Failed to initialize Supabase client: ${error.message}`);
      // this.supabase remains undefined
    }
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
}
