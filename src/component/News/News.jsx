// src/components/News/News.js
import { Row, Col, Pagination } from "antd";
import { useState } from "react";
import { Loader } from "../index";
import NewsCard from "./NewsCard";
import { useFetchCryptoNews } from "./newsService";

const News = ({ simplified }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = simplified ? 9 : 12;

    const { articles, isFetching } = useFetchCryptoNews(simplified);

    if (isFetching && articles.length === 0) return <Loader />;

    const displayNews = articles.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    return (
        <div className="news">
            <Row gutter={[24, 24]}>
                {displayNews?.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <NewsCard news={news} />
                    </Col>
                ))}
            </Row>

            {!simplified && articles.length > 0 && (
                <section className="pagination-container">
                    <Pagination
                        current={currentPage}
                        total={articles.length}
                        pageSize={pageSize}
                        onChange={(page) => setCurrentPage(page)}
                    />
                </section>
            )}
        </div>
    );
};

export default News;
