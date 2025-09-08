import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleImage from '@/components/news/ArticleImage';

// Fetch a specific news article
async function getNewsArticle(articleId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/news?id=${articleId}`, { 
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch article');
    return res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return { status: 'error', message: error.message };
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }) {
  const { id } = await params;
  const article = await getNewsArticle(id);
  if (article.status === 'error' || !article.data) {
    return {
      title: 'Article Not Found | BCA Association',
      description: 'The requested article could not be found.'
    };
  }
  return {
    title: `${article.data.title} | BCA Association`,
    description: article.data.description || 'Read the latest technology news'
  };
}

export default async function NewsArticlePage({ params }) {
  const { id } = await params;
  const articleData = await getNewsArticle(id);

  if (articleData.status === 'error' || !articleData.data) {
    return notFound();
  }

  const article = articleData.data;
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <>
      <div className="max-w-4xl mt-4 mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        <Link 
          href="/news" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to News
        </Link>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center mb-6">
          {article.source?.name && (
            <>
              <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                {article.source.name}
              </span>
              <span className="mx-2 text-gray-400">•</span>
            </>
          )}
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        
        <ArticleImage 
          src={article.urlToImage} 
          alt={article.title} 
          priority={true}
        />
        
        <div className="mt-8 prose prose-lg prose-blue max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed">
            {article.description}
          </p>
          
          {article.content && (
            <div className="mt-4">
              <p className="text-gray-700 leading-relaxed">{article.content}</p>
            </div>
          )}
          
          {article.url && (
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-700">
                Read the full article:
              </p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {article.url}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}