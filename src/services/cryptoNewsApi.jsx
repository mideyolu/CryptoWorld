import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import moment from "moment";

const NEWS_API_KEY = process.env.REACT_APP_CRYPTO_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }), 
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            async queryFn({ keyword = "crypto", pageSize = 60 }) {
                try {

                    const fromDate = moment()
                        .subtract(1, "days")
                        .format("YYYY-MM-DD");

                    const response = await axios.get(`${BASE_URL}/everything`, {
                        params: {
                            q: keyword,
                            language: "en",
                            pageSize,
                            sortBy: "publishedAt",
                            from: fromDate,
                            apiKey: NEWS_API_KEY,
                        },
                    });

                    console.log("NewsAPI response:", response.data.articles);

                    return { data: response.data.articles };
                } catch (error) {
                    console.error("NewsAPI fetch error:", error);
                    return { error: error.message || error };
                }
            },
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
