import React from "react";
import ProfilItem from "./ProfilItem";

function Profil(score) {
  const scoreArray = score.score;
  return (
    <div
      className="mb-10"
      // id="profil"
      // className="h-screen bg-gradient-to-br from-pink-50 to-indigo-100 grid place-items-center"
    >
      <div className="w-6/12 mx-auto rounded border">
        <div className="bg-white p-5 shadow-sm">
          <h1 className="flex justify-center text-xl font-bold text-gray-800">
            VOS SCORES
          </h1>
          <div className="flex justify-between mx-5 mt-5">
            <p className="text-black font-bold">ZONE</p>
            <p className="text-black font-bold">SCORE</p>
            <p className="text-black font-bold">TEMPS</p>
          </div>

          {scoreArray.map((key, zone) => {
            return <ProfilItem zone={key[0]} scores={key[1]} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profil;
