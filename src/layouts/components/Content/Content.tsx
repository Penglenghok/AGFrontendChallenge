import { Content as AntContent } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import "./Content.less";

export default function Content() {
  return (
    <AntContent className={"content-container"}>
      <Outlet />
    </AntContent>
  );
}
