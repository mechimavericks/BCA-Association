"use client";
import React, { useEffect } from "react";
import SectionHeader from "../SectionHeader";
import News from "../News";
import Slider from "react-slick";
import AOS from "aos";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventSection = ({}) => {
  const [loading, setLoading] = React.useState(true);
  const [events, setEvents] = React.useState([]);

  async function fetchingTheEvents() {
    console.log("Fetching events");
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data.data);
    setLoading(false);
  }

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation should happen only once - while scrolling down
    });
    fetchingTheEvents();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading)
    return (
      <div className="max-w-6xl mx-auto py-8 px-4">
        <SectionHeader title="Events" />
        {/* cards */}
        <div
          className="animate-pulse grid grid-cols-1
            md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3
        gap-4 flex-wrap justify-center"
        >
          <div className="rounded-lg bg-gray-800 h-96 "></div>
          <div className="rounded-lg bg-gray-800 h-96 "></div>
          <div className="rounded-lg bg-gray-800 h-96 "></div>
        </div>
      </div>
    );

  if (!loading && events.status === "error")
    return (
      <div>
        <h1>Error fetching events</h1>
        <p>
          {events.message
            ? events.message
            : "An error occurred while fetching events."}
        </p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <SectionHeader title="Events" />
      <Slider {...sliderSettings}>
        {events.slice(0, 6).map((newsItem, index) => (
          <div key={index} className="px-2 m-5" data-aos="fade-up">
            <News
              id={newsItem._id}
              title={newsItem.title}
              description={newsItem.shortDesc}
              date={newsItem.date}
              image={newsItem.thumbnail}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventSection;
