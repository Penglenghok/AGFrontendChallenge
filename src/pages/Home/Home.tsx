import Producer from "@/components/Producer/Producer";
import { Col, Row } from "antd";
import "./Home.styles.less";
import chartData from "@/mock/chart_data.json";
import { Producer as IProducer } from "@/types/common";

function HomePage() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {chartData.map((data: IProducer) => (
          <Col span={8} key={data.producerId}>
            <Producer producerId={data.producerId} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
