import { useEffect, useState } from "react";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";

/**
 * Get cached articles from localStorage
 */
export const getCachedArticles = (storageKey) => {
  const cached = localStorage.getItem(storageKey);
  return cached ? JSON.parse(cached) : null;
};

/**
 * Save articles to localStorage
 */
export const saveArticlesToCache = (storageKey, articles) => {
  localStorage.setItem(storageKey, JSON.stringify(articles));
};

/**
 * Custom hook to handle fetching & caching
 */
export const useFetchCryptoNews = (newsCategory, simplified = false) => {
  const pageSize = simplified ? 9 : 50;
  const storageKey = simplified
    ? `cryptoNewsSimplified_${newsCategory}`
    : `cryptoNewsFull_${newsCategory}`;

  // Check cache first
  const cached = getCachedArticles(storageKey);
  const [articles, setArticles] = useState(cached || []);

  // Only fetch if there's no cached data at all
  const shouldFetch = !cached;
  const {
    data: fetchedArticles,
    isFetching,
  } = useGetCryptoNewsQuery(
    { keyword: newsCategory, pageSize },
    { skip: !shouldFetch } 
  );

  // Save to cache when new data arrives
  useEffect(() => {
    if (fetchedArticles?.length > 0) {
      setArticles(fetchedArticles);
      saveArticlesToCache(storageKey, fetchedArticles);
    }
  }, [fetchedArticles, storageKey]);

  return { articles, isFetching: shouldFetch ? isFetching : false };
};
