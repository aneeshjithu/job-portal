import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import "../App.css";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import ShinyButton from "./ui/shiny-button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { ShimmerButton } from "./ui/shimmer-button";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams("");

  const { user } = useUser();
  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch([]);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center ">
        <Link>
          <img src="/pool.png" className="h-14 w-32" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            {/* <ShinyButton variant="blue" onClick={() => setShowSignIn(true)}> */}
            {/* <ShimmerButton
              className=" px-9 py-0 text-sm"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </ShimmerButton> */}
            <ShinyButton
              variant="blue"
              className=" px-8 py-2 text-sm"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </ShinyButton>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/post-job">
                <ShinyButton className="cursor-pointer flex items-center px-4 py-2 text-sm bg-red-500 hover:bg-red-700">
                  <PenBox size={20} className="mr-1 inline-block" />
                  <span>Post Job</span>
                </ShinyButton>
                {/* <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-1" />
                  Post a Job
                </Button> */}
              </Link>
            )}
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                ></UserButton.Link>

                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/Saved-job"
                ></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>
      {showSignIn && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </>
  );
};

export default Header;
