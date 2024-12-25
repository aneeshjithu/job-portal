import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <nav className="flex  justify-between items-center my-2">
        <Link>
          <img src="/pool.png" className="h-14 w-32" />
        </Link>

        <Button variant="outline">Login</Button>
      </nav>
    </>
  );
};

export default Header;
