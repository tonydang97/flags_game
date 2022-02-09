import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from "next/link";
// import "../styles/Footer.css"

function Footer() {
  return <div className='footer'>
      <div className='socialMedia'>

        <Link href="https://www.linkedin.com/in/pierre-antunes/">
          <a>
            <LinkedInIcon title="HOME" Icon={LinkedInIcon} />
          </a>
        </Link>

        <Link href="https://www.linkedin.com/in/pierre-antunes/">
          <a>
            <InstagramIcon title="HOME" Icon={InstagramIcon} />
          </a>
        </Link>

        <Link href="https://www.linkedin.com/in/pierre-antunes/">
          <a>
            <TwitterIcon title="HOME" Icon={TwitterIcon} />
          </a>
        </Link>

        <Link href="https://www.linkedin.com/in/pierre-antunes/">
          <a>
            <FacebookIcon title="HOME" Icon={FacebookIcon} />
          </a>
        </Link>
       
      </div>
          <p>&copy; 2022 Coding Academy</p> 
  </div>;
}

export default Footer;