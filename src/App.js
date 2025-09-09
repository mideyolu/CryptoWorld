import { Layout, Space, Typography } from "antd";
import { FaLinkedin } from "react-icons/fa";
import { Route, Routes } from "react-router-dom";
import {
    CryptoDetails,
    Cryptocurrencies,
    HomePage,
    Loader,
    Login,
    Navbar,
    News,
    Signup,
} from "./component/index";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./app/userSlice";
import { auth } from "./firebase/firebase";

const App = () => {
    const { Title } = Typography;
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // loading state

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userAuth) => {
            if (userAuth) {
                dispatch(login({ uid: userAuth.uid, email: userAuth.email }));
            } else {
                dispatch(logout());
            }
            setLoading(false); // auth check complete
        });
        return () => unsubscribe();
    }, [dispatch]);

    if (loading)
        return (
            <div className="loader">
                <Loader />
            </div>
        );

    return (
        <>
            {!user ? (
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Login />} />{" "}
                    {/* redirect unknown paths */}
                </Routes>
            ) : (
                <>
                    <div className="app">
                        <Navbar />
                        <Layout className="main">
                            <Routes>
                                <Route path="/home" element={<HomePage />} />
                                <Route
                                    path="/crypto/:coinId"
                                    element={<CryptoDetails />}
                                />
                                <Route
                                    path="/cryptocurrencies"
                                    element={<Cryptocurrencies />}
                                />
                                <Route path="/news" element={<News />} />
                                <Route path="*" element={<HomePage />} />{" "}
                                {/* fallback */}
                            </Routes>
                        </Layout>
                    </div>

                    <footer className="footer">
                        <Title
                            level={2}
                            style={{ color: "#fff", textAlign: "center" }}
                        >
                            Crypto World All rights reserved
                        </Title>
                        <Space>
                            <a href="/home">Home</a>
                            <a href="/news">News</a>
                            <a href="/cryptocurrencies">Cryptocurrencies</a>
                            <a
                                href="https://linkedin.com/in/olumide-oluwuyi-66650b26a"
                                target="_blank"
                            >
                                <FaLinkedin />
                            </a>
                        </Space>
                    </footer>
                </>
            )}
        </>
    );
};

export default App;
