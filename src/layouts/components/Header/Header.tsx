import { useLocation } from "react-router";
import "./Header.styles.less";

export default function Header() {
  const location = useLocation();
  const currentRoute = location.pathname.replace("/", "") || "home";
  return (
    <div className={"layout-header"}>
      <div>
        <p className="page-title">{currentRoute}</p>
      </div>
    </div>
  );
}
