import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const Navigate = useNavigate();
  const roleSelection = async (role) => {
    await user
      .update({ unsafeMetadata: { role } })
      .then(() => {
        Navigate(role === "recruiter" ? "/post-job" : "/jobs");
      })
      .catch((err) => {
        console.error("error updating role", err);
      });
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      Navigate(
        user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"
      );
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <BarLoader className="mb-4" height={0.8} width={"100%"} color="#ff2c2c" />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mt-44 sm:mt-14">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a ...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-32 text-2xl"
          onClick={() => {
            roleSelection("candidate");
          }}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-32 text-2xl"
          onClick={() => {
            roleSelection("recruiter");
          }}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
