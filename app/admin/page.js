import { redirect } from "next/navigation";
import React from "react";

function page() {
  redirect("/admin/login");
  return <div>page</div>;
}

export default page;
