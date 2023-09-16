// Import necessary dependencies
import { useEffect, useRef, useState } from "react";
import { auth } from "../../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/cryptocurrency.png";
import Loader from "../Loader/Loader";

// Define the Login component
const Login = () => {
  // Create refs for email and password input elements
  const emailRef = useRef(null);
  const passRef = useRef(null);

  // Initialize state variables for user and error messages
  const [user, setUser] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Initialize navigate function
  const navigate = useNavigate();

  // Function to clear error messages
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  // Function to handle authentication errors
  const handleAuthError = (error) => {
    console.error("Authentication Error:", error.message);
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
      case "auth/missing-password":
        setPasswordError("Enter a valid password");
        break;
      case "auth/missing-email":
        setEmailError("Please enter a valid email");
        break;
      case "auth/invalid-login-credentials":
        setEmailError("Email does not exist");
        break;
      default:
        break;
    }
  };

  // Function to handle user registration
  const Register = async (e) => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    e.preventDefault();
    clearErrors();

    try {
      // Attempt to create a user account
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User Registered Successfully!");

      // Navigate to the homepage on successful login
      navigate("/");
    } catch (error) {
      // Handle registration errors
      handleAuthError(error);
    }
  };

  // Function to handle user sign-in
  const SignIn = async (e) => {
    const email = emailRef.current.value;
    const password = passRef.current.value;
    e.preventDefault();
    clearErrors();

    try {
      // Attempt to sign in the user
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully!");
      navigate("/");
    } catch (error) {
      // Handle sign-in errors
      handleAuthError(error);
    }
  };

  // useEffect to listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        console.log("User signed in:", authUser);
      } else {
        // No user is signed in
        setUser(null);
        console.log("No user is signed in");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // JSX for the login form
  return (
    <>
      {user && <Loader />}

      <form className="form-box">
        <div className="form">
          <img src={logo} alt="" className="logo-img" />
          <span className="title">Crypto World</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input
              ref={emailRef}
              className="input"
              type="email"
              placeholder="Email"
            />
            {emailError && <p className="error">{emailError}</p>}
            <input
              ref={passRef}
              className="input"
              type="password"
              placeholder="Password"
            />
            {passwordError && <p className="error">{passwordError}</p>}
          </div>
          <button type="submit" onClick={Register}>
            Sign Up
          </button>
        </div>
        <div className="form-section">
          <p onClick={SignIn}>
            Have an account? <button>Log in</button>
          </p>
        </div>
      </form>
    </>
  );
};

// Export the Login component
export default Login;
