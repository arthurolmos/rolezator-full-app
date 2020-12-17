import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Main from "./screens/Main";
import "./firebase";

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
