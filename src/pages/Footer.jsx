import { NavLink } from "react-bootstrap";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from '@mui/icons-material/Telegram';
const Footer = () => {
  return (
    <div className="footers">
      <footer className="container ">
        <div className="row align-items-center">
          <div className="col-10 title">
            <a href="#">Finstreet 118 2561 Fintown</a>
            <p>Hello@finsweet.com 020 7993 2905</p>
          </div>
          <div className="col d-flex  justify-content-between">
            <NavLink href="#">
              <FacebookIcon style={{ fontSize: "20px", color: "#6D6E76" }} />
            </NavLink>
            <NavLink href="https://instagram.com/xakimoveldorbek7?utm_source=qr&igshid=NGExMmI2YTkyZg%3D%3D">
              <InstagramIcon style={{ fontSize: "20px", color: "#6D6E76" }} />
            </NavLink>
            <NavLink href="#">
              <TwitterIcon style={{ fontSize: "20px", color: "#6D6E76" }} />
            </NavLink>
            <NavLink href="https://t.me/xakimovE">
              <TelegramIcon style={{ fontSize: "20px", color: "#6D6E76" }} />
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
