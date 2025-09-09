import { Row, Typography } from "antd";
import HTMLReactParser from "html-react-parser";

const { Title } = Typography;

const CryptoDescription = ({ name, description }) => (
    <Row className="">
        <Title level={3} className="coin-details-heading">
            What is {name}?
        </Title>
        <p>{description && HTMLReactParser(description)}</p>
    </Row>
);

export default CryptoDescription;
