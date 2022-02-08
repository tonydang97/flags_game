import React from 'react';
import Link from "next/link";

function HomePage() {
  return <div className='home'>
      <div className='headerContainer' >
          <h1>Flags Games</h1>
          <p>Le meilleur jeux de l'histoire</p>
          <Link href="/Games">
          <button>JOUER</button>
          </Link>
      </div>
  </div>;
}

export default HomePage;