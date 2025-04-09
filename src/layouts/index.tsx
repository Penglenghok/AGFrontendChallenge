import { Layout } from "antd";
import "./index.styles.less";
import SideBar from "./components/Sidebar/SideBar";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import Header from "./components/Header/Header";

function AppLayout(): React.ReactElement {
  return (
    <Layout className="layout-container" hasSider>
      <SideBar />
      <Layout>
        <Header />
        <Content />
        <Footer />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
