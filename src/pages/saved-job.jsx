import { getsavedJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";

const SavedJob = () => {
  const { isLoaded } = useUser();
  const {
    fn: fnSavedJob,
    data: dataSavedJobs,
    loading: savedJobLoading,
    error: savedJobError,
  } = useFetch(getsavedJobs);

  useEffect(() => {
    if (isLoaded) {
      fnSavedJob();
    }
  }, [isLoaded]);

  if (!isLoaded || savedJobLoading)
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Saved Jobs
      </h1>
      {savedJobLoading === false && (
        <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataSavedJobs?.length ? (
            dataSavedJobs.map((saved) => (
              <JobCard
                key={saved.id}
                job={saved.job}
                savedInit={true}
                onJobSaved={() => fnSavedJob()}
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

export default SavedJob;
