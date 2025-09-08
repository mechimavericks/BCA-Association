import About from "@/components/home/About";
import EventSection from "@/components/home/EventSection";
import Hero from "@/components/home/Hero";
import React from "react";
import TicketForm from "@/components/tickets/TicketMain";

const page = async () => {
 

  return (
    <div>
      <Hero />
      <About />
      <EventSection />
      <div className="flex h-[80vh] gap-3 items-center justify-between w-full p-8">
        <div className="lg:flex hidden w-full flex-col items-center gap-3">
          <h1 className="text-4xl font-bold">Any Problem? Contact Us Now</h1>
          <img
            src="https://static.vecteezy.com/system/resources/previews/006/584/592/original/illustration-graphic-cartoon-character-of-contact-us-vector.jpg"
            alt="contact"
            className="w-1/3"
          />
        </div>
        <div className="flex lg:w-1/2 w-full flex-col gap-3">
          <TicketForm />
        </div>
      </div>

      {/* <ContactSection /> */}
    </div>
  );
};

export default page;
