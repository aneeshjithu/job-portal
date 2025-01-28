import { getSingleJob, updateHiringStatus } from "@/api/apiJobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import React, { useEffect } from "react";

import { debounce } from "lodash";
import { data, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import MDEditor from "@uiw/react-md-editor";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ApplyJobDrawer from "@/components/apply-job";
import ApplicationCard from "@/components/application-card";

const Job = () => {
  const { isLoaded, user, session } = useUser();
  const { id } = useParams();

  const {
    fn: fnJob,
    data: dataJob,
    loading: jobLoading,
    error: jobError,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  const {
    fn: fnHiringStatus,
    data: dataHiringStatus,
    loading: HiringStatusLoading,
    error: HiringStatusError,
  } = useFetch(updateHiringStatus, {
    job_id: id,
  });

  // const handleStatusChange = async (value) => {
  //   const isOpen = value === "open";

  //   // Optimistically update the UI
  //   const previousStatus = dataJob?.isOpen;
  //   dataJob.isOpen = isOpen;

  //   try {
  //     await fnHiringStatus(isOpen); // Make the API call
  //     await fnJob(); // Re-fetch the job data
  //   } catch (error) {
  //     console.error("Error updating hiring status:", error);
  //     dataJob.isOpen = previousStatus; // Rollback if API fails
  //   }
  // };

  const handleStatusChange = debounce(async (value) => {
    const isOpen = value === "open";
    try {
      await fnHiringStatus(isOpen);
      await fnJob();
    } catch (error) {
      console.error("Error updating hiring status:", error);
    }
  }, 300); // 300ms debounce delay

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
          {dataJob?.applications?.length} Applicants
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

      {user?.id === dataJob?.recruiter_id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger
            className={`w-full ${
              dataJob?.isOpen
                ? "bg-green-500 opacity-80"
                : "bg-red-500 opacity-80"
            }`}
          >
            <SelectValue
              className=""
              placeholder={
                "Hiring Status " + (dataJob?.isOpen ? "(Open)" : "(Closed)")
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem className="mb-3" value="open">
                Open
              </SelectItem>
              <SelectItem className="mb-3" value="closed">
                Closed
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

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

      {dataJob?.recruiter_id !== user?.id && (
        <ApplyJobDrawer
          job={dataJob !== undefined ? dataJob : null}
          user={user}
          fetchJob={fnJob}
          applied={dataJob?.applications?.find(
            (app) => app?.candidate_id === user?.id
          )}
        />
      )}

      {dataJob?.recruiter_id === user?.id &&
        dataJob?.applications?.length > 0 && (
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>

            {dataJob?.applications?.map((app) => {
              return <ApplicationCard key={app?.id} application={app} />;
            })}
          </div>
        )}
    </div>
  );
};

export default Job;
