import React from "react";
import "./styles/App.css";
import Routing from "./routes/Routes";
import Mynavbar from "./components/navbar";

function App() {
  return (
    <div>
      <Mynavbar></Mynavbar>
      <Routing></Routing>
    </div>
  );
}

export default App;
