import { Select, Col } from "antd";

const NewsCategory = ({ newsCategory, setNewsCategory, cryptoCoins }) => {
    return (
        <Col span={24}>
            <Select
                showSearch
                className="select-news"
                placeholder="Select a Crypto or Coin"
                value={newsCategory}
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                }
            >
                <Select.Option key="crypto" value="crypto">
                    General
                </Select.Option>
                {cryptoCoins.map((coin) => (
                    <Select.Option key={coin} value={coin}>
                        {coin}
                    </Select.Option>
                ))}
            </Select>
        </Col>
    );
};

export default NewsCategory;
