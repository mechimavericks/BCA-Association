"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const [logout, setLogout] = React.useState(true);
  const route = useRouter();

  async function logoutfn() {
    const res = await fetch("/api/logout");
    const data = await res.json();
    if (data.status === "success") {
      alert("Logged out successfully");
      route.push("/");
      setLogout(false);
    }
  }
  useEffect(() => {
    logoutfn();
  }, []);
  return (
    <div>
      <p className="text-center">Logging out...</p>
    </div>
  );
}

export default Logout;
