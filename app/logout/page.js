import Logout from "@/components/logout/Logout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  return (
    <div className="pt-24 flex flex-col justify-center h-screen items-center">
      <Logout />
    </div>
  );
}

export default page;
