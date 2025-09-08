import ContactSection from "@/components/ContactSection";
import News from "@/components/News";
import SectionHeader from "@/components/SectionHeader";
import { fetchEvents } from "../admin/[type]/page";

const page = async () => {
  const events = await fetchEvents();
  if (events.status !== "success") {
    return <div>{events.message}</div>;
  }
  const data = events.data;
  return (
    <>
      <div className="max-w-6xl mx-auto pt-20">
        <SectionHeader title="News & Notices" />

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((news, index) => (
            <News
              key={index}
              title={news.title}
              description={news.shortDesc}
              date={news.date}
              image={news.banner}
              id={news._id}
            />
          ))}
        </div>
      </div>
      <ContactSection />
    </>
  );
};

export default page;
