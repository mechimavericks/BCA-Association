import Login from "@/components/admin/login/LoginMain";
import { cookies } from "next/headers";
import React from "react";
import { redirect } from "next/navigation";

async function page() {
  const cookieStore = await cookies();
  const cookieSet = cookieStore.get("token");
  
  if (cookieSet) {
    redirect("/admin/events");
  }
  return (
    <div className="pt-24 flex flex-col justify-center h-screen items-center">
      <Login />
    </div>
  );
}

export default page;
