// src/components/News/newsService.js
import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";

export const getCachedArticles = (storageKey) => {
    const cached = localStorage.getItem(storageKey);
    return cached ? JSON.parse(cached) : null;
};

export const saveArticlesToCache = (storageKey, articles) => {
    localStorage.setItem(storageKey, JSON.stringify(articles));
};

// Fetch "news" = details+history+links for ALL coins
export const useFetchCryptoNews = (simplified = false) => {
    const count = simplified ? 9 : 60;
    const storageKey = simplified ? "cryptoNewsSimplified" : "cryptoNewsFull";

    const cached = getCachedArticles(storageKey);
    const [articles, setArticles] = useState(cached || []);

    const { data, isFetching, error } = useGetCryptosQuery(count);

    useEffect(() => {
        console.log("📡 Raw crypto data:", data);
        console.log("⚠️ Any error?:", error);

        if (data?.data?.coins) {
            // transform coins into "news-like" articles
            const transformed = data.data.coins.map((coin) => ({
                title: `${coin.name} (${coin.symbol})`,
                description:
                    coin.description ||
                    `Latest stats and links for ${coin.name}`,
                link: coin.coinrankingUrl,
                imgUrl: coin.iconUrl,
                source: { name: coin.name, icon: coin.iconUrl },
                publishedAt: coin.listedAt
                    ? new Date(coin.listedAt * 1000)
                    : null,
            }));

            setArticles(transformed);
            saveArticlesToCache(storageKey, transformed);
        }
    }, [data, error, storageKey]);

    return { articles, isFetching };
};
