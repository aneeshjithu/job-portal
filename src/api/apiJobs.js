import supabaseClient from "@/utils/supabase";

/**
 * Fetches jobs from the database based on the provided filters.
 *
 * @param {string} token - The authentication token.
 * @param {Object} filters - The filters to apply to the job search.
 * @param {string} [filters.location] - The location to filter jobs by.
 * @param {number} [filters.company_id] - The company ID to filter jobs by.
 * @param {string} [filters.searchQuery] - The search query to filter jobs by title.
 * @returns {Promise<Array|Null>} - The list of jobs or null if an error occurs.
 */
export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*, company:company_id(name,logo_url),saved_jobs(id)")
    .order("company_id", { ascending: true });

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching jobs", error);
    return null;
  }
  return data;
}

/**
 * Saves or deletes a job from the saved jobs list based on the `alreadysaved` flag.
 *
 * @param {string} token - The authentication token for the Supabase client.
 * @param {Object} options - The options object.
 * @param {boolean} options.alreadysaved - Flag indicating if the job is already saved.
 * @param {Object} saveData - The data of the job to be saved or deleted.
 * @param {number} saveData.job_id - The ID of the job to be saved or deleted.
 * @returns {Promise<Object|null>} - The data returned from the Supabase operation, or null if there was an error.
 */
export async function saveJob(token, { alreadysaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadysaved) {
    const { data, deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);
    if (deleteError) {
      console.error("Error deleting saved jobs", deleteError);
      return null;
    }
    return data;
  } else {
    const { data, insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error deleting saved jobs", insertError);
      return null;
    }
    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url),applications:applications(*)")
    .eq("id", job_id)
    .single();

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching single job", error);
    return null;
  }
  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  const { data, error } = await query;

  if (error) {
    console.error("Error updating job status", error);
    return null;
  }
  return data;
}

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").insert([jobData]).select();

  const { data, error } = await query;

  if (error) {
    console.error("Error inserting job", error);
    return null;
  }
  return data;
}

export async function getsavedJobs(token) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("saved_jobs")
    .select("*,job:jobs(*,company:companies(name,logo_url))")
    .order("id", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching saved job", error);
    return null;
  }
  return data;
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)")
    .eq("recruiter_id", recruiter_id);
  const { data, error } = await query;

  if (error) {
    console.error("Error fetching My jobs", error);
    return null;
  }
  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let query = supabase.from("jobs").delete().eq("id", job_id).select();
  const { data, error } = await query;

  if (error) {
    console.error("Error deleting jobs", error);
    return null;
  }
  return data;
}
