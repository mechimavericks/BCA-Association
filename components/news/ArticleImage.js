'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ArticleImage = ({ src, alt, priority = false }) => {
  const [imgError, setImgError] = useState(false);

  if (!src || imgError) {
    return (
      <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
        No Image Available
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full">
      <Image
        src={src}
        alt={alt || 'News article image'}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        priority={priority}
        onError={() => setImgError(true)}
      />
    </div>
  );
};

export default ArticleImage;