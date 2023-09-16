import { Routes, Route } from "react-router-dom";
import { Typography, Layout, Space } from "antd";
import { FaLinkedin } from "react-icons/fa";

import {
  Navbar,
  HomePage,
  CryptoDetails,
  Cryptocurrencies,
  News,
  Login,
} from "./component/index"; // Import your components
import { auth } from "./firebase/firebase"; // Import Firebase authentication
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./app/userSlice"; // Import Redux actions and selectors
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const { Title } = Typography;
  const user = useSelector(selectUser); // Get user data from Redux store
  const dispatch = useDispatch(); // Initialize Redux dispatch function

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      // Listen for changes in the user's authentication state
      if (userAuth) {
        // If user is authenticated
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        ); // Dispatch a login action to store user data in Redux
      } else {
        // If user is not authenticated
        dispatch(logout()); // Dispatch a logout action to clear user data in Redux
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from the authentication state change listener
    };
  }, [dispatch]); // Only run this effect when the `dispatch` function changes

  return (
    <>
      {!user ? (
        // If user is not authenticated, show the login component
        <Login />
      ) : (
        // If user is authenticated, show the main app content
        <div className="app">
          <div className="navbar">
            <Navbar />
          </div>

          <div className="main">
            <Layout>
              <div className="routes">
                <Routes>
                  <Route index path="/" element={<HomePage />} />
                  <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                  <Route
                    exact
                    path="/cryptocurrencies"
                    element={<Cryptocurrencies />}
                  />
                  <Route exact path="/news" element={<News />} />
                </Routes>
              </div>
            </Layout>
            <footer className="footer">
              <Title
                level={2}
                style={{
                  color: "#fff",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                Crypto World All rights reserved
              </Title>
              <Space>
                <Link to="/">Home</Link>
                <Link to="/news">News</Link>
                <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                <Link
                  to="https://linkedin.com/in/olumide-oluwuyi-66650b26a"
                  target="_blank"
                >
                  <FaLinkedin />
                </Link>
              </Space>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
