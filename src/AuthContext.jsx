import { createContext, useContext, useState, useEffect } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [emailInput, setEmailInput] = useState("");
  // TODO: signup

  const signUp = async (event) => {
    event.preventDefault();
    const response = await fetch(API + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: emailInput,
        password: "super-secret-999",
      }),
    });
    // console.log(response);
    const tokenObject = await response.json();
    // console.log(tokenObject);
    setToken(tokenObject.token);
    setLocation("TABLET");
  };

  // TODO: authenticate

  const authenticate = async () => {
    try {
      const response = await fetch(API + "/authenticate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const x = await response.json();
    } catch (error) {
      console.error("Error during GET request");
    }
    throw error;
  };

  const value = {
    setLocation,
    location,
    signUp,
    emailInput,
    setEmailInput,
    authenticate,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
