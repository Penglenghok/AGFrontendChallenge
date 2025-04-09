import Producer from "@/components/Producer/Producer";
import { Col, Row } from "antd";

function HomePage() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Producer producerId={"1"} />
        </Col>
        <Col span={8}>
          <Producer producerId={"1"} />
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
