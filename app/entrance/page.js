"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const cards = "flex flex-col justify-center items-center  m-auto  w-full";
const card =  " border  rounded-lg w-96 m-3 px-8 max-w-96 shadow hover:shadow-md p-6 justify-self-center text-left transition transform hover:-translate-y-1 hover:bg-blue-50  hover:text-blue-600 cursor-pointer ";

const Options = [
    {
        route:"quick-test",
        text : "Take a Quick Test  "
    },
    {
        route:"model-question",
        text: "Entrance Model Questions"
    }

]

export default function EntranceQuestionsPage() {
  return (
    <div className="max-w-6xl text-center mx-auto pt-24  ">
      <h1 className="text-4xl font-bold text-blue-800 ">
       Welcome! 
      </h1>
      <p className="mt-2 text-lg md:text-xl text-gray-600">
        
        Click a set to preview the PDF
      </p>
        <div className={cards}>
        { Options.map((b, idx) => (
            <Link
            href={`/entrance/${b.route}`}
             className={card}
             >
            <p className="w-full px-4 inline-flex font-semibold justify-between items-center" >{b.text}  <FaArrowRight /></p>
        </Link>
        ))}
        </div>
        
   
      
    </div>
  );
}
