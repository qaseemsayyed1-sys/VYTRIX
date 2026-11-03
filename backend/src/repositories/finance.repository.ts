import { supabase } from '../config/supabase';
import { CustomError } from '../utils/custom-error';

export class FinanceRepository {
  static async getProfile(userId: string) {
    const { data, error } = await supabase.from('financial_profiles').select('*').eq('user_id', userId).single();
    if (error && error.code !== 'PGRST116') throw new CustomError(error.message, 500);
    return data;
  }

  static async upsertProfile(userId: string, profileData: any) {
    const { data, error } = await supabase.from('financial_profiles').upsert({ user_id: userId, ...profileData }, { onConflict: 'user_id' }).select().single();
    if (error) throw new CustomError(error.message, 500);
    return data;
  }

  static async addTransaction(userId: string, transactionData: any) {
    const { data, error } = await supabase.from('financial_transactions').insert({ user_id: userId, ...transactionData }).select().single();
    if (error) throw new CustomError(error.message, 500);
    return data;
  }

  static async getTransactions(userId: string) {
    const { data, error } = await supabase.from('financial_transactions').select('*').eq('user_id', userId).order('transaction_date', { ascending: false });
    if (error) throw new CustomError(error.message, 500);
    return data;
  }
}