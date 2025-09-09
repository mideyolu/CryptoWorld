import { Col, Select, Typography } from "antd";
import millify from "millify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
} from "../../services/cryptoApi";
import { LineChart, Loader } from "../index";
import CryptoDescription from "./CryptoDescription";
import CryptoLinks from "./CryptoLinks";

import { getGenericStats, getValueStats } from "./CryptoStats";
import CryptoStatsList from "./CryptoStatsList";

const { Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");

    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
    const { data: coinHistory } = useGetCryptoHistoryQuery({
        coinId,
        timePeriod,
    });

    const cryptoDetails = data?.data?.coin;

    if (isFetching) return <Loader />;

    const timeOptions = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = getValueStats(cryptoDetails);
    const genericStats = getGenericStats(cryptoDetails);

    return (
        <Col className="coin-detail-container">
            {/* Heading */}
            <Col className="coin-heading-container">
                <Title level={2} className="coin-name">
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                </Title>
                <p>
                    {cryptoDetails?.name} live price in US Dollars. View
                    Statistics, market cap and supply.
                </p>
            </Col>

            {/* Time Period Selector */}
            <Select
                defaultValue="7d"
                className="select-timeperiod"
                placeholder="Select Timeperiod"
                onChange={setTimePeriod}
            >
                {timeOptions.map((date) => (
                    <Option key={date}>{date}</Option>
                ))}
            </Select>

            {/* Line Chart */}
            <LineChart
                coinHistory={coinHistory}
                currentPrice={millify(cryptoDetails?.price)}
                coinName={cryptoDetails?.name}
            />

            {/* Stats */}
            <Col className="stats-container">
                <CryptoStatsList
                    stats={stats}
                    className="coin-value-statistics"
                />

                <CryptoStatsList
                    stats={genericStats}
                    className="other-stats-info"
                />
            </Col>

            {/* Description & Links */}
            <Col className="coin-desc-link">
                <CryptoDescription
                    name={cryptoDetails?.name}
                    description={cryptoDetails?.description}
                />
                <CryptoLinks
                    name={cryptoDetails?.name}
                    links={cryptoDetails?.links}
                />
            </Col>
        </Col>
    );
};
export default CryptoDetails;
