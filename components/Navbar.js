import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const Navbar = () => {
  return (
    <nav
      className="nav-container"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <div className="nav-item">
        <Link href="/">Home</Link>
      </div>
      <div className="nav-item">
        <Link href="/settings">Settings</Link>
      </div>
      <div className="nav-item">
        <Link href="/createalgo">Create Algo</Link>
      </div>
      <div className="connectwallet-menu-item">
        <ConnectButton chainStatus />
      </div>
    </nav>
  );
};

export default Navbar;
