import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate, Link } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?&search=${input}`);
  };
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            Find the perfect <span>freelance</span> services for your business
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input
                type="text"
                placeholder="eg: Graphics & Design                             "
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <Link className="button-popular" to="/gigs?&search=Graphics%20&%20Design">
              Graphics
            </Link>
            <Link className="button-popular" to="/gigs?&search=Graphics%20&%20Design">
              Design
            </Link>
            <Link className="button-popular" to="/gigs?&search=Programming%20&%20Tech">
              Tech
            </Link>
            <Link className="button-popular" to="/gigs?&search=AI%20Services">
              AI Services
            </Link>
          </div>
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
