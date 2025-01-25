import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import ApplicationCard from "./application-card";
import { useUser } from "@clerk/clerk-react";

const CreatedApplications = () => {
  const { user, isLoaded } = useUser();
  const {
    fn: fnApplications,
    data: dataApplications,
    loading: applicationsLoading,
    error: applicationsError,
  } = useFetch(getApplications, {
    user_id: user?.id,
  });

  useEffect(() => {
    fnApplications();
  }, []);

  if (!isLoaded || applicationsLoading)
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  return (
    <div className="flex flex-col gap-2">
      {dataApplications?.map((app) => {
        return <ApplicationCard key={app?.id} application={app} isCandidate />;
      })}
    </div>
  );
};

export default CreatedApplications;

// import { getApplications } from "@/api/apiApplications";
// import useFetch from "@/hooks/use-fetch";
// import { useEffect } from "react";
// import { BarLoader } from "react-spinners";
// import ApplicationCard from "./application-card";
// import { useUser } from "@clerk/clerk-react";

// const CreatedApplications = () => {
//   const { user, isLoaded } = useUser();
//   const {
//     fn: fnApplications,
//     data: dataApplications,
//     loading: applicationsLoading,
//     error: applicationsError,
//   } = useFetch(getApplications, {
//     user_id: user?.id,
//   });

//   useEffect(() => {
//     if (isLoaded) fnApplications();
//   }, []);

//   if (!isLoaded || applicationsLoading) {
//     return (
//       <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
//     );
//   }

//   if (applicationsError) {
//     return <div>Error loading applications: {applicationsError.message}</div>;
//   }

//   if (Array.isArray(dataApplications) && dataApplications.length === 0) {
//     return <div>No applications found.</div>;
//   }

//   return (
//     <div className="flex flex-col gap-2">
//       {Array.isArray(dataApplications) && dataApplications.length > 0 && (
//         <div className="flex flex-col gap-2">
//           {dataApplications.map((app) => (
//             <ApplicationCard key={app.id} application={app} isCandidate />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreatedApplications;
