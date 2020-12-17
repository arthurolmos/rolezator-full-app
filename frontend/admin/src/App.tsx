import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import "./firebase";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
