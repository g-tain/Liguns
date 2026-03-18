"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

interface JobData {
  id?: string;
  title: string;
  company_name: string;
  location: string;
  salary_range: string;
  description: string;
  qualifications: string[];
  facilities: string[];
  status: 'active' | 'inactive';
  image_url: string;
}

export async function createJob(formData: JobData) {
  const supabase = createClient();
  
  // Clean data
  const cleanData = {
    ...formData,
    qualifications: formData.qualifications.filter(q => q.trim() !== ""),
    facilities: formData.facilities.filter(f => f.trim() !== "")
  };

  const { error } = await supabase
    .from('jobs')
    .insert([cleanData]);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate both admin and public job pages
  revalidatePath('/id/lowongan');
  revalidatePath('/en/lowongan');
  revalidatePath('/id/admin/jobs');
  revalidatePath('/en/admin/jobs');

  return { success: true };
}

export async function updateJob(id: string, formData: JobData) {
  const supabase = createClient();
  
  // Clean data
  const cleanData = {
    ...formData,
    qualifications: formData.qualifications.filter(q => q.trim() !== ""),
    facilities: formData.facilities.filter(f => f.trim() !== "")
  };

  const { error } = await supabase
    .from('jobs')
    .update(cleanData)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate both admin and public job pages
  revalidatePath('/id/lowongan');
  revalidatePath('/en/lowongan');
  revalidatePath('/id/admin/jobs');
  revalidatePath('/en/admin/jobs');

  return { success: true };
}

export async function deleteJob(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate both admin and public job pages
  revalidatePath('/id/lowongan');
  revalidatePath('/en/lowongan');
  revalidatePath('/id/admin/jobs');
  revalidatePath('/en/admin/jobs');

  return { success: true };
}

export async function toggleJobStatus(id: string, currentStatus: 'active' | 'inactive') {
  const supabase = createClient();
  
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

  const { error } = await supabase
    .from('jobs')
    .update({ status: newStatus })
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate both admin and public job pages
  revalidatePath('/id/lowongan');
  revalidatePath('/en/lowongan');
  revalidatePath('/id/admin/jobs');
  revalidatePath('/en/admin/jobs');

  return { success: true, newStatus };
}
