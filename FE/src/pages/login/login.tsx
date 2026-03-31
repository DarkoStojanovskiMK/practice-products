import React from "react";
import "./login.css";
import { supabase } from "../../utils/supabase";
import { useDispatch } from "react-redux";
import { setSession } from "../../api/apiRtk/auth/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

  // Usage example

  const handleSignUp = async () => {
    if (!email || !password || password?.length < 6) {
      alert("Please enter both email and password.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const { data, error }: any = await supabase.auth.signUp({
      email,
      password,
    });
    if (error && error.message.includes("already")) {
      alert("Account already exists. Please sign in.");
    } else if (error) {
      alert(`Error signing up:${error.message}`);
    } else {
      dispatch(setSession(data.session));
      navigate("/profile");

    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const { data, error }: any = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error(error);
      alert("Error signing in: Invalid login credentials");
    } else {
      dispatch(setSession(data.session));
     
    }
  };

  return (
    <div className="container">
      <h1 className="title">PROSHOP</h1>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="buttons">
        <button className="btn" onClick={handleSignIn}>
          Sign In
        </button>
        <button className="btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
