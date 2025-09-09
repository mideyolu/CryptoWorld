// CryptoStatsList.jsx
import { Col, Typography } from "antd";

const { Text } = Typography;

const CryptoStatsList = ({ stats, className = "" }) => (
    <Col className={` ${className}`}>
        {stats.map((stat) => (
            <Col className="coin-stats" key={stat.title}>
                <Col className="coin-stats-name">
                    <Text>{stat.icon}</Text>
                    <Text>{stat.title}</Text>
                </Col>
                <Text className="stats">{stat.value}</Text>
            </Col>
        ))}
    </Col>
);

export default CryptoStatsList;
