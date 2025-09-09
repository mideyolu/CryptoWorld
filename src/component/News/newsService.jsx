import { useEffect, useState } from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";

// 24 hours in milliseconds
const CACHE_DURATION = 24 * 60 * 60 * 1000;

/**
 * Check if cached timestamp is expired
 */
export const isCacheExpired = (timestamp) =>
    !timestamp || Date.now() - timestamp > CACHE_DURATION;

/**
 * Get cached articles from localStorage
 */
export const getCachedArticles = (storageKey, storageTimeKey) => {
    const cached = localStorage.getItem(storageKey);
    const cachedTime = localStorage.getItem(storageTimeKey);

    if (cached && !isCacheExpired(cachedTime)) {
        return JSON.parse(cached);
    }
    return null;
};

/**
 * Save articles to localStorage
 */
export const saveArticlesToCache = (storageKey, storageTimeKey, articles) => {
    localStorage.setItem(storageKey, JSON.stringify(articles));
    localStorage.setItem(storageTimeKey, Date.now());
};

/**
 * Custom hook to handle fetching & caching
 */
export const useFetchCryptoNews = (newsCategory, simplified = false) => {
    const pageSize = simplified ? 9 : 50;
    const storageKey = simplified
        ? `cryptoNewsSimplified_${newsCategory}`
        : `cryptoNewsFull_${newsCategory}`;
    const storageTimeKey = simplified
        ? `cryptoNewsSimplifiedTime_${newsCategory}`
        : `cryptoNewsFullTime_${newsCategory}`;

    // Check cache first
    const [articles, setArticles] = useState(
        getCachedArticles(storageKey, storageTimeKey) || [],
    );

    const { data: fetchedArticles, isFetching } = useGetCryptoNewsQuery({
        keyword: newsCategory,
        pageSize,
    });

    // Update state & cache when new data is fetched
    useEffect(() => {
        if (fetchedArticles?.length > 0) {
            setArticles(fetchedArticles);
            saveArticlesToCache(storageKey, storageTimeKey, fetchedArticles);
        }
    }, [fetchedArticles, storageKey, storageTimeKey]);

    return { articles, isFetching };
};
