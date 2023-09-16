import { Col, Row, Statistic, Typography } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { Loader } from "../index";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { Cryptocurrencies, News } from "../index";
import { selectUser } from "../../app/userSlice";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { Title } = Typography;

  // Fetch data for the top 10 cryptocurrencies
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  // Get user information from Redux
  const user = useSelector(selectUser);
  const userEmail = user?.email ? user.email.substring(0, 6) : "";
  const userName = userEmail.charAt(0).toUpperCase() + userEmail.slice(1);

  // Display a loader while fetching data
  if (isFetching) return <Loader />;

  return (
    <>
      {/* Welcome message */}
      <Title level={2} className="heading">
        Welcome {userName}
      </Title>

      {/* Global Crypto Stats */}
      <Title className="heading" level={2}>
        Global Crypto Stats.
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={globalStats?.total}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap:"
            value={millify(globalStats?.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats?.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
          />
        </Col>
      </Row>

      {/* Top 10 Cryptocurrencies */}
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top 10 CryptoCurrencies in the World.
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />

      {/* Latest CryptoCurrencies News */}
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Latest CryptoCurrencies News.
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default HomePage;
