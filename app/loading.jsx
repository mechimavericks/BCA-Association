"use client";
import Image from "next/image";
import React from "react";
import Loading from "@/public/images/is.gif";
function loading() {
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <Image
        src={Loading}
        height={300}
        width={300}
        className="object-contain"
        alt="load"
      />
    </div>
  );
}

export default loading;
