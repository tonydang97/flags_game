import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import MapWorld from "../components/Map";
import Cookie from "../components/Cookie";

function Map() {
  return <div>
      <Navbar />
      {/* <MapWorld /> */}
      <Cookie />
    <Footer />
  </div>;
}

export default Map;
