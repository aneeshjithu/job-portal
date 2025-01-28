import CreatedApplications from "@/components/created-applications";
import CreatedJobs from "@/components/created-jobs";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const MyJobs = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded)
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  return (
    <div className="mt-3">
      <h1 className="gradient-title font-extrabold text-3xl sm:text-7xl text-center">
        {user?.unsafeMetadata?.role === "candidate"
          ? "My Applications"
          : "Posted Jobs"}
      </h1>
      {user?.unsafeMetadata?.role === "candidate" ? (
        <CreatedApplications />
      ) : (
        <CreatedJobs />
      )}
    </div>
  );
};

export default MyJobs;
