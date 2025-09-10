// src/components/News/NewsCard.js
import { Card, Typography, Avatar } from "antd";
import moment from "moment";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const NewsCard = ({ news }) => {
    return (
        <Card hoverable className="news-card">
            <a href={news?.link} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                    <Typography.Title className="news-title" level={4}>
                        {news?.title}
                    </Typography.Title>
                    <img
                        src={news?.imgUrl || demoImage}
                        alt="News"
                        className="img"
                    />
                </div>

                <p>
                    {news?.description?.length > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news?.description}
                </p>

                <div className="provider-container">
                    <div className="flex items-center gap-2">
                        <Avatar
                            src={news?.source?.icon || demoImage}
                            alt={news?.source?.name || "Provider"}
                        />
                        <Typography.Text className="provider-name">
                            {news?.source?.name || "Unknown"}
                        </Typography.Text>
                    </div>
                    <Typography.Text>
                        {news?.publishedAt
                            ? moment(news.publishedAt).fromNow()
                            : moment().fromNow()}
                    </Typography.Text>
                </div>
            </a>
        </Card>
    );
};

export default NewsCard;
