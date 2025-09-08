"use client";
import Link from "next/link";
import React from "react";

export default function Error({ error, reset }) {
  return (
    <div className="bg-gradient-to-r from-rose-100 to-teal-100 h-[75vh]">
      <div className=" h-full w-full flex justify-center items-center">
        <div className="flex flex-col justify-center text-center gap-6">
          <a className="flex justify-center mx-auto" href="/konrix_r/">
            <img
              className="h-6 block dark:hidden"
              src="/konrix_r/assets/logo-dark-359bbb7d.png"
              alt=""
            />
            <img
              className="h-6 hidden dark:block"
              src="/konrix_r/assets/logo-light-9db6a5f0.png"
              alt=""
            />
          </a>
          <p className="text-3xl font-semibold text-primary">404!</p>
          <h1 className="text-4xl font-bold tracking-tight ">
            Page not found.
          </h1>
          <p className="text-base text-gray-600 ">{error?.message}</p>
          <Link className="text-base font-medium text-primary" href="/">
            {" "}
            Go back home{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
