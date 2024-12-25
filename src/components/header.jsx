import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import ShinyButton from "./ui/shiny-button";

const Header = () => {
  return (
    <>
      <nav className="flex  justify-between items-center my-2 mr-2">
        <Link>
          <img src="/pool.png" className="h-14 w-32" />
        </Link>

        {/* <Button variant="outline">Login</Button> */}

        <SignedOut>
          <SignInButton>
            <ShinyButton variant="outline" className="">
              Login
            </ShinyButton>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  );
};

export default Header;
