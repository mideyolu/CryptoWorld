// src/components/Auth/Signup.jsx
import { useRef, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import logo from "../../assets/img/cryptocurrency.png";

const Signup = () => {
    const emailRef = useRef(null);
    const passRef = useRef(null);

    const [user, setUser] = useState(null);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const handleAuthError = (error) => {
        switch (error.code) {
            case "auth/invalid-email":
                setEmailError("Invalid email address");
                break;
            case "auth/email-already-in-use":
                setEmailError("Email already in use");
                break;
            case "auth/weak-password":
                setPasswordError("Password should be at least 6 characters");
                break;
            default:
                console.error(error.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        clearErrors();
        const email = emailRef.current.value;
        const password = passRef.current.value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (error) {
            handleAuthError(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser || null);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            {user && <Loader />}
            <form className="form-box" onSubmit={handleSignUp}>
                <div className="form">
                    <img src={logo} alt="logo" className="logo-img" />
                    <span className="title">Crypto World</span>
                    <span className="subtitle">Create a free account.</span>
                    <div className="form-container">
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            className="input"
                        />
                        {emailError && <p className="error">{emailError}</p>}
                        <input
                            ref={passRef}
                            type="password"
                            placeholder="Password"
                            className="input"
                        />
                        {passwordError && (
                            <p className="error">{passwordError}</p>
                        )}
                    </div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </>
    );
};

export default Signup;
