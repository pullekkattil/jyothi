import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
    const reloadPage = () => {
      window.location.reload();
    };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Gigger</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Gigger Business</span>
     {/*     {!currentUser?.isSeller && <Link to="/" className="link"> Become a seller </Link>} */}
          <Link to="/gigs" className="link"> Explore Giggs </Link>
          <Link to="/" className="link"> Home </Link>
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?&search=Graphics%20&%20Design">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Video%20&%20Animation">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Writing%20&%20Translation">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/gigs?&search=AI%20Services">
              AI Services
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Digital%20Marketing">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Music%20&%20Audio">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Programming%20&%20Tech">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Business">
              Business
            </Link>
            <Link className="link menuLink" to="/gigs?&search=Lifestyle">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
