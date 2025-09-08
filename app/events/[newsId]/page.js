import NewsMain from "@/components/events/NewsMain";
import React from "react";

async function fetchSingleNews(id) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_URL + `/api/events/${id}`);
    return res.json();
  } catch (error) {
    return { status: "error", message: error.message };
  }
}

async function page({ params }) {
  const { newsId } = await params;
  const news = await fetchSingleNews(newsId);

  if (news.status !== "success") {
    throw new Error(news.message);
  }

  return (
    <div className="min-h-screen flex  p-5 pt-24 w-full">
      <NewsMain event={news.data} />
    </div>
  );
}

export default page;
