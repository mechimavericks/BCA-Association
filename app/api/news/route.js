import { NextResponse } from 'next/server';

// Cache the API responses to avoid hitting rate limits
const NEWS_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
let cachedNews = null;
let cacheTimestamp = null;

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const pageSize = parseInt(searchParams.get('pageSize') || '9', 10);
        const id = searchParams.get('id');

        // Check if we should use the cached data
        const shouldUseCache = cachedNews &&
            cacheTimestamp &&
            (Date.now() - cacheTimestamp < NEWS_CACHE_DURATION);

        let newsData;

        if (shouldUseCache) {
            newsData = cachedNews;
        } else {
            // Make request to News API
            const response = await fetch(
                `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=100`,
                {
                    headers: {
                        'X-Api-Key': process.env.NEWS_API_KEY
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error(`News API responded with status: ${response.status}`);
            }

            const data = await response.json();
            

            // Cache the results
            cachedNews = data;
            cacheTimestamp = Date.now();

            newsData = data;
        }

        // If an ID is provided, return just that article
        if (id) {
            try {
                const article = newsData.articles.find(article => {
                    const articleTitle = article.title || '';
                    const articleUrl = article.url || '';
                    let hash = 0;
                    const str = articleTitle + articleUrl;
                    for (let i = 0; i < str.length; i++) {
                        hash = ((hash << 5) - hash) + str.charCodeAt(i);
                        hash = hash & hash;
                    }
                    const generatedId = Math.abs(hash).toString(16).substring(0, 12);
                    return generatedId === id; // <-- FIXED LINE
                });

                if (!article) {
                    return NextResponse.json({
                        status: 'error',
                        message: 'Article not found'
                    }, { status: 404 });
                }

                return NextResponse.json({
                    status: 'success',
                    data: article
                });
            } catch (error) {
                return NextResponse.json({
                    status: 'error',
                    message: 'Error processing article ID',
                    error: error.message
                }, { status: 500 });
            }
        }

        try {
            // Implement pagination
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            
            // Add unique IDs to articles - fix the ID generation
            const articlesWithIds = newsData.articles.map(article => {
                const articleTitle = article.title || '';
                const articleUrl = article.url || '';
                // Create a simple hash from title and url
                let hash = 0;
                const str = articleTitle + articleUrl;
                for (let i = 0; i < str.length; i++) {
                    hash = ((hash << 5) - hash) + str.charCodeAt(i);
                    hash = hash & hash; // Convert to 32bit integer
                }
                const id = Math.abs(hash).toString(16).substring(0, 12);
                return { ...article, id };
            });
            
            const paginatedArticles = articlesWithIds.slice(startIndex, endIndex);
            const totalPages = Math.ceil(articlesWithIds.length / pageSize);
            
            return NextResponse.json({
                status: 'success',
                data: paginatedArticles,
                page,
                pageSize,
                totalPages,
                totalArticles: articlesWithIds.length
            });
        } catch (error) {
            return NextResponse.json({
                status: 'error',
                message: 'Error processing articles',
                error: error.message
            }, { status: 500 });
        }
    } catch (error) {
        console.error('News API error:', error.message);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to fetch news data',
            error: error.message
        }, { status: 500 });
    }
}