import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY'); // Use service_role key for admin bypass or anon if public bucket permits

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not found in environment variables.');
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      const fileExt = path.extname(file.originalname);
      const fileName = `${uuidv4()}${fileExt}`;
      const bucketName = 'restaurant-images';

      const { data, error } = await this.supabase.storage
        .from(bucketName)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: publicUrlData } = this.supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading to Supabase:', error);
      throw new InternalServerErrorException('Failed to upload image to storage');
    }
  }
}
