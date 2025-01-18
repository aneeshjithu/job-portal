import { getSingleJob } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: dataJob,
    loading: jobLoading,
    error: jobError,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  useEffect(() => {
    if (isLoaded) {
      fnJob();
    }
  }, [isLoaded]);

  if (!isLoaded || jobLoading) {
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse md:flex-row gap-6  justify-between items-center">
        <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">
          {dataJob?.title}
        </h1>
        <img
          src={dataJob?.company?.logo_url}
          className="h-12"
          alt={dataJob?.title}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <MapPinIcon />
          {dataJob?.location}
        </div>
        <div className="flex gap-2">
          <Briefcase />
          {dataJob?.application?.length} Applicants
        </div>
        <div className="flex gap-2">
          {dataJob?.isOpen ? (
            <>
              <DoorOpen />
              Open
            </>
          ) : (
            <>
              <DoorClosed />
              Closed
            </>
          )}
        </div>
      </div>

      {/* hiring status */}

      <h2 className="text-2xl sm:text-3xl font-bold">About the job</h2>
      <p className="sm:text-lg">{dataJob?.description}</p>
      <h2 className="text-2xl sm:text-3xl font-bold">
        What we are looking for
      </h2>

      <MDEditor.Markdown
        source={dataJob?.requirements}
        className="bg-transparent sm:text-lg"
      />

      {/* render applications */}
    </div>
  );
};

export default Job;
