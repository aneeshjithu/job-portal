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
import { saveJob } from "@/api/apiJobs";
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

  const handleSaveJob = async () => {
    try {
      await fnSavedJob({ job_id: job.id, user_id: user.id });
      onJobSaved();
    } catch (error) {
      console.error("Failed to save job", error);
    }
  };

  useEffect(() => {
    if (dataSavedJob !== undefined) {
      setSaved(dataSavedJob?.length > 0);
    }
  }, [dataSavedJob]);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-300 cursor-pointer"
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
        {job.description.substring(0, job.description.indexOf("."))}
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
