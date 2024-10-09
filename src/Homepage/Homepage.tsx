import React from "react";
import Header from "./Header";
import "./Homepage.scss";
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <h1 className="">Forge 3D</h1>
        <h2>A platform to explore and create 3D experiences for the web.</h2>
        <Link to={"/Editor"}>
          <button>Try Editor</button>
        </Link>
      </div>
    </div>
  );
}

export default Homepage;
