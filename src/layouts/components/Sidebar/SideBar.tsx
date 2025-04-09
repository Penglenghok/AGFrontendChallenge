import { Layout, Menu, MenuProps } from "antd";
import { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import "./SideBar.styles.less";
import { CONSTANT } from "@/constant";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem(
      "Charts",
      "1",
      <div className="icon-container task-background">
        <PieChartOutlined className="icon" />
      </div>
    ),
  ];

  const { Sider } = Layout;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      className={"custom-sider"}
    >
      <div className="menu-container">
        <div className="logo-container">
          <img className="img-logo" src={CONSTANT.LOGO} />
          {!collapsed && <p className="name-logo">Receiver</p>}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </div>
    </Sider>
  );
}
