import React from 'react';
import SectionHeader from '@/components/SectionHeader';
import NewsCard from '@/components/news/NewsCard';
import Pagination from '@/components/news/Pagination';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Tech News | BCA Association',
  description: 'Stay updated with the latest technology news and developments',
};

// Fetch news data with the page parameter
async function getNews(page = 1, pageSize = 9) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/news?page=${page}&pageSize=${pageSize}`, { 
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching news:', error);
    return { 
      status: 'error',
      message: error.message
    };
  }
}

// Loading component for server loading state
function NewsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-5">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Fix: Use a client-side approach for pagination instead
export default async function NewsPage() {
  // Always get page 1 on server-side
  // Client-side component Pagination will handle navigation to other pages
  const page = 1;
  const pageSize = 9;
  
  const newsData = await getNews(page, pageSize);
  
  if (newsData.status === 'error') {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <SectionHeader title="Tech News" />
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-700">
            {newsData.message || 'Failed to load news. Please try again later.'}
          </h2>
        </div>
      </div>
    );
  }
  
  const { data: articles, totalPages } = newsData;
  
  if (!articles || articles.length === 0) {
    return notFound();
  }
  
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <SectionHeader title="Tech News" />
        
        <p className="text-lg text-gray-700 text-center mb-8">
          Stay updated with the latest technology news and developments
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <NewsCard
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              publishedAt={article.publishedAt}
              urlToImage={article.urlToImage}
              source={article.source}
            />
          ))}
        </div>
        
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </>
  );
}