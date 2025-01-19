import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: uploadError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (uploadError) {
    console.error("Error uploading resume", error);
    return null;
  }
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  let query = supabase
    .from("applications")
    .insert([
      {
        ...jobData,
        resume,
      },
    ])
    .select();

  const { data, error } = await query;

  if (error) {
    console.error("Error inserting data into applications", error);
    return null;
  }
  return data;
}
