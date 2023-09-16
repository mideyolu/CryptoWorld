import React, { useState } from "react";
import { Card, Col, Input, Row, Pagination } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useEffect } from "react";
import { Loader } from "../index";

const Cryptocurrencies = ({ simplified }) => {
  // Determine the number of cryptocurrencies to fetch based on 'simplified' prop
  const count = simplified ? 10 : 350;

  // Fetch data for cryptocurrencies
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  // Define state variables
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter cryptocurrencies based on the search query
  useEffect(() => {
    const filterSearch = cryptosList?.data?.coins;

    const filteredData = filterSearch?.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );

    setCryptos(filteredData || []);
  }, [cryptosList, search]);

  // Define pagination settings
  const pageSize = 20;
  const totalItems = cryptos.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCryptos = cryptos.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Display loader while fetching data
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search cryptocurrencies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {displayedCryptos.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency?.uuid}
          >
            <Link to={`/crypto/${currency?.uuid}`} key={currency?.uuid}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    src={currency.iconUrl}
                    className="crypto-image"
                    alt="CryptoImage"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {!simplified && (
        <div className="pagination-container">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default Cryptocurrencies;
