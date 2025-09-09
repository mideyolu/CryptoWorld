import { Col, Row, Typography } from "antd";

const { Title } = Typography;

const CryptoLinks = ({ name, links }) => (
    <Col className="coin-links">
        <Title level={3} className="coin-details-heading">
            {name} Links
        </Title>
        {links?.map((link) => (
            <Row className="coin-link" key={link?.name}>
                <Title level={5} className="link-name">
                    {link?.type}
                </Title>
                <a href={link?.url} target="_blank" rel="noreferrer">
                    {link?.name}
                </a>
            </Row>
        ))}
    </Col>
);

export default CryptoLinks;
