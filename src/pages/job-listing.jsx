import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useSession } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { session, isLoaded } = useSession();
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: jobLoading,
    error: jobError,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const hasFetched = useRef(false); // Flag to prevent multiple calls

  useEffect(() => {
    if (isLoaded && session && !hasFetched.current) {
      fnJobs();
      hasFetched.current = true; // Set the flag to true after first call
    }
  }, [isLoaded, session, location, company_id, searchQuery]); // Removed fnJobs from dependencies

  if (!isLoaded) {
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  }
  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-7xl text-center pb-5 pt-3">
        Latest Jobs
      </h1>
      {jobLoading && (
        <BarLoader
          className="mb-4"
          height={0.8}
          width={"100%"}
          color="#ff2c2c"
        />
      )}

      {jobLoading === false && dataJobs && (
        <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved_jobs?.length > 0 ?? false}
              />
            ))
          ) : (
            <div>No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
