import { getMyJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreatedJobs = () => {
  const { user, isLoaded } = useUser();
  const {
    fn: fnMyJobs,
    data: dataMyJobs,
    loading: myJobsLoading,
    error: myJobsError,
  } = useFetch(getMyJobs, {
    recruiter_id: user?.id,
  });

  useEffect(() => {
    fnMyJobs();
  }, []);

  if (!isLoaded || myJobsLoading)
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  return (
    <div>
      {myJobsLoading === false && dataMyJobs && (
        <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataMyJobs?.length ? (
            dataMyJobs.map((job) => (
              <JobCard key={job.id} job={job} isMyJob onJobSaved={fnMyJobs} />
            ))
          ) : (
            <div>No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreatedJobs;
