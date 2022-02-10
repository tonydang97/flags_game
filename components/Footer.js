import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
// import "../styles/Footer.css"

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <Link href="https://www.linkedin.com/company/82432247/admin/">
          <a>
            <LinkedInIcon title="HOME" icon={LinkedInIcon} />
          </a>
        </Link>

        <Link href="https://www.pinterest.fr/flagmymind/_created/">
          <a>
            <PinterestIcon title="HOME" icon={PinterestIcon} />
          </a>
        </Link>

        <Link href="https://www.twitter.com/home">
          <a>
            <TwitterIcon title="HOME" icon={TwitterIcon} />
          </a>
        </Link>

        <Link href="https://www.facebook.com/Flag-my-mind/114495134479105">
          <a>
            <FacebookIcon title="HOME" icon={FacebookIcon} />
          </a>
        </Link>
      </div>
      <p>&copy; 2022 Coding Academy</p>
    </div>
  );
}

export default Footer;
