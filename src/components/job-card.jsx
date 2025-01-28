import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useFetch from "@/hooks/use-fetch";
import { deleteJob, saveJob } from "@/api/apiJobs";
import { BarLoader } from "react-spinners";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
const JobCard = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();

  const [saved, setSaved] = useState(savedInit);

  const {
    fn: fnSavedJob,
    data: dataSavedJob,
    loading: loadingSavedJob,
    error: SavedJobError,
  } = useFetch(saveJob, {
    alreadysaved: saved,
  });

  const {
    fn: fnDeleteJob,
    data: dataDeleteJob,
    loading: loadingDeleteJob,
    error: deleteJobError,
  } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    try {
      await fnDeleteJob();
      onJobSaved();
      const toastMessage = "Job deleted successfully!";

      // Show toast notification
      toast({
        variant: "destructive",
        className:
          "bg-red-600 px-4 py-2 bg-opacity-70 rounded-md text-sm  truncate flex items-center justify-center",
        description: toastMessage,
        duration: 1500,
      });
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  const handleSaveJob = async () => {
    try {
      // Call the API to save/remove the job
      await fnSavedJob({ job_id: job.id, user_id: user.id });

      // Call the callback function (if provided)
      onJobSaved();

      const toastMessage = !saved
        ? "Job saved successfully!"
        : "Job removed successfully!";

      // Show toast notification
      toast({
        variant: "success",
        className:
          "bg-emerald-600 px-4 py-2 bg-opacity-70 rounded-md text-sm  truncate flex items-center justify-center",
        description: toastMessage,
        duration: 1000,
      });
    } catch (error) {
      console.error("Failed to save job", error);

      // Show error toast notification
      toast({
        variant: "destructive",
        className:
          "bg-red-600 px-4 py-2 rounded-md text-sm max-w-[200px] truncate flex items-center justify-center",
        description: "Failed to save job. Please try again.",
      });
    }
  };

  useEffect(() => {
    if (dataSavedJob !== undefined) {
      setSaved(dataSavedJob?.length > 0);
    }
  }, [dataSavedJob]);

  return (
    <Card className="flex flex-col opa">
      {loadingDeleteJob && (
        <BarLoader
          className="mb-4"
          height={0.8}
          width={"100%"}
          color="#ff2c2c"
        />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
              onClick={handleDeleteJob}
            ></Trash2Icon>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} className="" />{" "}
            {job.location ? job.location : "test"}
          </div>
        </div>
        <hr />
        {job.description?.length > 0
          ? job.description.indexOf(".") > -1
            ? job.description.substring(0, job.description.indexOf("."))
            : job.description
          : ""}
      </CardContent>
      <CardFooter className="flex-gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handleSaveJob}
            disabled={loadingSavedJob}
          >
            {saved ? (
              <Heart className="mx-3" size={20} stroke="red" fill="red"></Heart>
            ) : (
              <Heart className="mx-3" size={20}></Heart>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
