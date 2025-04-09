import React from "react";
import { Card, Col, Row, Typography } from "antd";

const { Text } = Typography;

interface Stats {
  min: number | null;
  max: number | null;
  avg: string | null;
}

interface StatsDisplayProps {
  stats: Stats;
}

function StatsDisplay({ stats }: StatsDisplayProps): React.ReactElement {
  return (
    <Card>
      <Row gutter={16}>
        <Col span={8}>
          <Text>
            <b>Min:</b> <br />
            {stats.min !== null ? stats.min : "N/A"}
          </Text>
        </Col>
        <Col span={8}>
          <Text>
            <b>Max:</b> <br />
            {stats.max !== null ? stats.max : "N/A"}
          </Text>
        </Col>
        <Col span={8}>
          <Text>
            <b>Avg:</b> <br />
            {stats.avg !== null ? stats.avg : "N/A"}
          </Text>
        </Col>
      </Row>
    </Card>
  );
}

export default StatsDisplay;
