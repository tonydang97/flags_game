import React, { useState } from "react";
import Image from "next/image";
import ReorderIcon from "@mui/icons-material/Reorder";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import MapIcon from "@mui/icons-material/Map";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/client";
import { HomeIcon } from "@heroicons/react/outline";
import NavbarItem from "./NavbarItem";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const [session] = useSession();

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        {/* <Image src="/public/logo2.jpg" width={80} height={60} /> */}
        <div className="hiddenLinks">
          <Link href="/">HOME</Link>
          <Link href="/Games">GAMES</Link>
          <Link href="/Leaderboard">LEADERBOARD</Link>
          <Link href="/Map">MAP</Link>
          <Link href="/Profil">PROFIL</Link>
        </div>
      </div>
      <div className="rightSide">
        {/* <Image src="/public/logo2.jpg" width={80} height={60} /> */}
        <Link href="/">
          <a>
            <NavbarItem title="HOME" Icon={HomeIcon} />
          </a>
        </Link>
        <Link href="/Games">
          <a>
            <NavbarItem title="PLAY" Icon={SportsEsportsOutlinedIcon} />
          </a>
        </Link>
        <Link href="/Leaderboard">
          <a>
            <NavbarItem title="LEADERBOARD" Icon={LeaderboardIcon} />
          </a>
        </Link>
        <Link href="/Map">
          <a>
            <NavbarItem title="MAP" Icon={MapIcon} />
          </a>
        </Link>
        <Link href="/Profil">
          <a>
            <NavbarItem title="PROFIL" Icon={AccountCircleIcon} />
          </a>
        </Link>
        {/* <div className="flex text-2xl justify-between"> */}
        {session && (
          <a href="#" onClick={handleSignout} className="btn-signin">
            SIGN OUT
          </a>
        )}
        {!session && (
          // <a href="#" onClick={handleSignin} className="btn-signin">
          //   SIGN IN
          // </a>

          <div onClick={handleSignin}>
            <NavbarItem title="SIGN IN" Icon={LoginIcon} />
          </div>
        )}
        {/* </div> */}
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
