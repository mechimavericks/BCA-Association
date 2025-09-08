'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsCard = ({ id, title, description, publishedAt, urlToImage, source }) => {
  const [imgError, setImgError] = useState(false);

  // Format the date
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full">
        {urlToImage && !imgError ? (
          <Image
            src={urlToImage}
            alt={title || 'News article image'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            {source?.name || 'Tech News'}
          </span>
          <span className="mx-1 text-gray-400">•</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {description || "No description available for this article."}
        </p>

        <div className="mt-auto">
          <Link
            href={`/news/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
          >
            Read more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;