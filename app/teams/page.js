"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import SectionHeader from "@/components/SectionHeader";
import ContactSection from "@/components/ContactSection";
import Logo from "@/public/images/association.png";
import Image from "next/image";
import teamData from "./teamData"; // Import the team data 


const TeamsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a duration of 1000ms
  }, []);

  return (
    <>
      <div className="max-w-6xl relative mx-auto text-center bg-white pt-20">
        {/* Header Section */}
        <SectionHeader
          title="Meet Our Team"
          subtitle="The leadership behind BCA Association MMC"
        />

        {/* President Section */}
        <div className="mb-12" data-aos="fade-up">
          {teamData.slice(0, 1).map((team, index) => (
            <div key={index} className="mb-10">
              <h2 className="text-3xl font-bold text-blue-900">
                {team.position}
              </h2>
              <div className="flex justify-center gap-6 mt-6">
                {team.members.map((member, idx) => (
                  <div key={idx} className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-full w-40 h-40 object-cover mx-auto"
                      data-aos="zoom-in"
                    />
                    <p className="mt-2 text-lg font-medium text-blue-900">
                      {member.name}
                    </p>
                    <p className="text-md text-gray-600">
                      {member.designation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vice Presidents & Secretaries Section */}
        <div className="mb-12" data-aos="fade-up">
          {teamData.slice(1, 2).map((team, index) => (
            <div key={index} className="mb-10 hover:cursor-pointer">
              <h2 className="text-2xl font-bold text-blue-900">
                {team.position}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {team.members.map((member, idx) => (
                  <div key={idx} className="text-center" data-aos="flip-right">
                    {!!member?.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="rounded-full w-40 h-40 object-cover mx-auto"
                      />
                    ) : (
                      <Image
                        src={Logo}
                        alt="BCA Association MMC"
                        height={150}
                        width={150}
                        className="rounded-full w-40 h-40 object-cover mx-auto"
                      />
                    )}
                    <p className="mt-2 text-lg font-medium text-blue-900">
                      {member.name}
                    </p>
                    <p className="text-md text-gray-600">
                      {member.designation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Members Section */}
        <div data-aos="fade-up ">
          {teamData.slice(2).map((team, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-blue-900 mt-8">
                {team.position}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                {team.members.map((member, idx) => (
                  <div key={idx} className="text-center" data-aos="flip-left">
                    {!!member?.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="rounded-full w-40 h-40 object-cover mx-auto"
                      />
                    ) : (
                      <Image
                        src={Logo}
                        alt="BCA Association MMC"
                        height={150}
                        width={150}
                        className="rounded-full w-40 h-40 object-cover mx-auto"
                      />
                    )}
                    <p className="mt-2 text-lg font-medium text-blue-900">
                      {member.name}
                    </p>
                    <p className="text-md text-gray-600">
                      {member.designation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactSection />
    </>
  );
};

export default TeamsPage;
