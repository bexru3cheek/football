import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";

function HeaderP() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark");
    setDarkMode(!darkMode);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container className="container " fluid>
        <Navbar.Brand href="#">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Easports_fifa_logo.svg/2560px-Easports_fifa_logo.svg.png"
            alt=""
          style={{width:"150px"}}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <NavLink
              style={{
                textDecoration: "none",
                marginTop: "3px",
                color: "black",
                fontWeight: "bold",
              }}
              to="/"
            >
              Home
            </NavLink>
          </Nav>
          <Form className="d-flex">
            <NavLink className={`app ${darkMode ? "dark" : ""}`}>
              <button
                style={{ backgroundColor: "transparent", border: "none" }}
                className="btn-dark"
                onClick={toggleDarkMode}
              >
                {darkMode ? (
                  <DarkModeIcon style={{ color: "black" }} />
                ) : (
                  <WbSunnyIcon style={{ color: "#ef7c00" }} />
                )}
              </button>
            </NavLink>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderP;
