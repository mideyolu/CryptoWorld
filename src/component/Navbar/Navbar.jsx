import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import {
  HomeOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import icon from "../../assets/img/cryptocurrency.png";

const Navbar = () => {
  // Initialize navigate function
  const navigate = useNavigate();

  // State for controlling the menu visibility
  const [active, setActive] = useState(true);

  // State for tracking the screen size
  const [screenSize, setScreenSize] = useState(null);

  // Effect to update the screenSize state on window resize
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Initial call to handleResize
    handleResize();

    // Cleanup: remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect to control the menu visibility based on screenSize
  useEffect(() => {
    if (screenSize < 768) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Crypto World</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActive((prev) => !prev)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {/* Render the menu based on the 'active' state */}
      {active && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
          <Menu.Item icon={<FaSignOutAlt />}>
            {/* Add a sign-out functionality */}
            <span
              onClick={() => {
                auth.signOut();
                navigate("/login"); // Redirect to login page on sign out
              }}
              className="profileScreen__signout"
            >
              Sign Out
            </span>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
