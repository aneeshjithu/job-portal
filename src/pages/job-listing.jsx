import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { useSession } from "@clerk/clerk-react";
import { State } from "country-state-city";
import React, { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "@/hooks/use-toast";
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { session, isLoaded } = useSession();
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: jobLoading,
    error: jobError,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: dataCompanies } = useFetch(getCompanies);

  const hasFetched = useRef(false); // Flag to prevent multiple calls

  useEffect(() => {
    if (isLoaded && session && !hasFetched.current) {
      fnJobs();
      hasFetched.current = true; // Set the flag to true after first call
    }
  }, [isLoaded, session, location, company_id, searchQuery]); // Removed fnJobs from dependencies

  const hasFetchedCmpny = useRef(false); // Flag to prevent multiple calls

  useEffect(() => {
    if (isLoaded && session && !hasFetchedCmpny.current) {
      fnCompanies();
      hasFetchedCmpny.current = true; // Set the flag to true after first call
    }
  }, [isLoaded, session, location, company_id, searchQuery]); // Removed fnJobs from dependencies

  useEffect(() => {
    if (searchQuery) {
      console.log("Updated search query:", searchQuery);
      fnJobs(); // Optionally refetch jobs if needed
    }
  }, [searchQuery]);

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   let formData = new FormData(e.target);

  //   const query = formData.get("search-query");

  //   if (query) setSearchQuery(query);
  //   console.log(searchQuery);
  // };
  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");

    if (query) {
      setSearchQuery(query);
      // Move the console log inside a useEffect to log the updated state
    } else {
      setSearchQuery(""); // Clear the search query
      fnJobs({ location, company_id, searchQuery: "" });
    }
  };
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value === "" || value === null || value === undefined) {
      // Call fnJobs when the input is empty
      fnJobs({ location, company_id, searchQuery: "" });
    }
  };

  const handleClearFilters = () => {
    if (location || company_id) {
      toast({
        variant: "success",
        className:
          "bg-slate-500 px-4 py-2 bg-opacity-70 rounded-md text-sm  truncate flex items-center justify-center",
        description: "Removed Filters.",
        duration: 1500,
      });
    } else {
      toast({
        variant: "success",
        className:
          "bg-slate-500 px-4 py-2 bg-opacity-70 rounded-md text-sm  truncate flex items-center justify-center",
        description: "No Filters found.",
        duration: 1500,
      });
    }

    setLocation("");
    setCompany_id("");
    setSearchQuery("");
  };

  if (!isLoaded) {
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  }
  return (
    <div className="">
      <h1 className="gradient-title font-extrabold text-4xl sm:text-7xl text-center pb-5 pt-3">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex h-14 w-full gap-3 items-center  mb-3"
      >
        <Input
          type="text"
          placeholder="Search..."
          name="search-query"
          className="max-h-10 flex-1 px-4 text-md"
          onChange={handleSearchChange}
        ></Input>
        <Button type="submit" className="h-10 sm:w-28 " variant="blue">
          Search
        </Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
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
        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
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
        <Button
          onClick={handleClearFilters}
          variant="destructive"
          className="sm:w-1/2"
        >
          Clear Filters
        </Button>
      </div>
      {jobLoading && (
        <BarLoader
          className="mb-4 my-3"
          height={0.8}
          width={"100%"}
          color="#ff2c2c"
        />
      )}

      {jobLoading === false && dataJobs && (
        <div className="mt-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => (
              <JobCard
                // key={job.id}
                // job={job}
                // savedInit={job?.saved_jobs?.length > 0 ?? false}
                key={job.id}
                job={job}
                savedInit={job?.saved_jobs?.length > 0}
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

export default JobListing;
