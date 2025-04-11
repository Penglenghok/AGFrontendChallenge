import React, { memo } from "react";
import { Card, Col, Row, Typography } from "antd";
import "./States.styles.less";
import { Stats } from "@/types/common";

const { Text } = Typography;

interface StatsDisplayProps {
  stats: Stats;
  timeframe: string;
}

function StatsDisplay({
  stats,
  timeframe,
}: StatsDisplayProps): React.ReactElement {
  return (
    <Card className="stats-card">
      <Row justify={"center"}>
        <Text className="timeframe-text">
          <b>Timeframe:</b> {timeframe}
        </Text>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Text>
            <b>Min:</b> <br />
            {stats.min || "N/A"}
          </Text>
        </Col>
        <Col span={8}>
          <Text>
            <b>Max:</b> <br />
            {stats.max || "N/A"}
          </Text>
        </Col>
        <Col span={8}>
          <Text>
            <b>Avg:</b> <br />
            {stats.avg || "N/A"}
          </Text>
        </Col>
      </Row>
    </Card>
  );
}

export default memo(StatsDisplay);
