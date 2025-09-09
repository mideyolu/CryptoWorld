import { Card, Typography, Avatar } from "antd";
import moment from "moment";

const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const NewsCard = ({ news }) => {
    return (
        <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                    <Typography.Title className="news-title" level={4}>
                        {news.title}
                    </Typography.Title>
                    <img
                        src={news.urlToImage || demoImage}
                        alt="News"
                        className="img"
                    />
                </div>
                <p>
                    {news.description?.length > 100
                        ? `${news.description.substring(0, 100)}...`
                        : news.description}
                </p>
                <div className="provider-container">
                    <div>
                        <Avatar
                            src={news.urlToImage || demoImage}
                            alt="Provider"
                        />
                        <Typography.Text className="provider-name">
                            {news.source?.name || "Unknown"}
                        </Typography.Text>
                    </div>
                    <Typography.Text>
                        {moment(news.publishedAt).fromNow()}
                    </Typography.Text>
                </div>
            </a>
        </Card>
    );
};

export default NewsCard;
