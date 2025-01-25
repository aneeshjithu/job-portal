import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { updateApplicationStatus } from "@/api/apiApplications";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const ApplicationCard = ({ application, isCandidate = false }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const {
    fn: fnHiringStatus,
    loading: loadingHiringStatus,
    error: hiringStatusError,
  } = useFetch(updateApplicationStatus, {
    job_id: application?.job_id,
  });

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card className="mb-4">
      {loadingHiringStatus && (
        <BarLoader
          className="mb-4"
          height={0.8}
          width={"100%"}
          color="#ff2c2c"
        />
      )}
      <CardHeader>
        <CardTitle className="flex font-bold justify-between">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-9 w-9 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-3">
            <BriefcaseBusiness size={15} />
            {application?.experience} Years of Experience
          </div>
          <div className="flex items-center gap-3 mt-1">
            <School size={15} />
            {application?.education}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <Boxes size={15} />
            {application?.skills}
          </div>
        </div>
        <hr className="my-4" />
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <span>{new Date(application?.created_at).toDateString()}</span> */}
        <span>
          {application?.created_at &&
            new Date(application.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
          {application?.created_at &&
            new Date(application.created_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
        </span>

        {isCandidate ? (
          <span className="font-bold capitalize">
            Status: {application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application?.status}
          >
            <SelectTrigger className="w-40">
              <SelectValue className="" placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="hired">Hired</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {console.log(application)}
      </CardFooter>
    </Card>
  );
};

export default ApplicationCard;
