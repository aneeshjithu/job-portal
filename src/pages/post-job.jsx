import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { State } from "country-state-city";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import { getCompanies } from "@/api/apiCompanies";
import { Navigate, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { addNewJob } from "@/api/apiJobs";
import AddCompanyDrawer from "@/components/add-company-drawer";
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().min(1, { message: "Select Company" }),
  requirements: z.string().min(1, { message: "Requirements are required" }),
});

const PostJob = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  const {
    fn: fnCompanies,
    data: dataCompanies,
    loading: companyLoading,
  } = useFetch(getCompanies);

  const {
    fn: fnCreateJob,
    data: dataCreateJob,
    loading: createJobLoading,
    error: createJobError,
  } = useFetch(addNewJob);

  const onSubmit = async (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,
    });
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (isLoaded) {
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (dataCreateJob?.length > 0) {
      navigate("/jobs");
    }
  }, [createJobLoading]);

  if (!isLoaded && !companyLoading) {
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">
        Post Job
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pb-0 p-4"
      >
        <Input type="text" placeholder="Job Title" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
        <div className="flex gap-4 items-center">
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => {
                      return (
                        <SelectItem key={name} value={name}>
                          {name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Controller
            control={control}
            name="company_id"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Company">
                    {field.value
                      ? dataCompanies.find(
                          (cmp) => cmp.id === Number(field.value)
                        ).name
                      : "Company"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dataCompanies &&
                      dataCompanies.length > 0 &&
                      dataCompanies.map(({ name, id }) => (
                        <SelectItem key={id} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <div className="">
            <AddCompanyDrawer fetchCompanies={fnCompanies} />
          </div>
        </div>

        {errors.location && (
          <p className="text-red-500">{errors?.location?.message}</p>
        )}
        {errors.company_id && (
          <p className="text-red-500">{errors?.company_id?.message}</p>
        )}

        <Controller
          control={control}
          name="requirements"
          render={({ field }) => (
            <MDEditor value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.requirements && (
          <p className="text-red-500">{errors.requirements.message}</p>
        )}
        {createJobError?.message && (
          <p className="text-red-500">{createJobError?.message}</p>
        )}
        {createJobLoading && (
          <BarLoader
            className="mb-4"
            height={0.8}
            width={"100%"}
            color="#ff2c2c"
          />
        )}
        <Button type="submit" variant="blue" size="lg" className="mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PostJob;
