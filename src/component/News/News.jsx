import moment from "moment";
import { Select, Typography, Row, Avatar, Card, Col, Pagination } from "antd";
import { Loader } from "../index";
import { useGetCryptoNewsQuery } from "../../services/cryptoNewsApi";
import { useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  // State for selecting news category
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  // Fetch crypto news data
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 50,
  });

  // Fetch crypto data (not used in the component)
  const { data } = useGetCryptosQuery(100);

  // State for current page
  const [currentPage, setCurrentPage] = useState(1);

  const { Option } = Select;

  // Pagination configuration
  const pageSize = 6;
  const totalItems = cryptoNews?.value?.length || 0;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayNews = cryptoNews?.value?.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render loading spinner if data is not available yet
  if (!cryptoNews?.value) return <Loader />;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            {/* Dropdown to select a crypto news category */}
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option>Cryptocurrency</Option>
              {data?.data?.coins?.map((coin) => (
                <Option key={coin?.name} value={coin?.name}>
                  {coin?.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {displayNews?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news?.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  {/* News title */}
                  <Typography.Title className="news-title" level={4}>
                    {news?.name}
                  </Typography.Title>

                  {/* News image */}
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="News"
                    className="img"
                  />
                </div>

                {/* News description */}
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>

                {/* Provider information */}
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="Provider Image"
                    />
                    <Typography.Text className="provider-name">
                      {news.provider[0]?.name}
                    </Typography.Text>
                  </div>
                  <Typography.Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Typography.Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>

      {!simplified && (
        // Pagination for news articles
        <section className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </section>
      )}
    </>
  );
};

export default News;
