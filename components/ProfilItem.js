import React from "react";

function ProfilItem(score) {
  const objectByZone = score.scores[0];

  function timeToString(time) {
    const stringTime = time.m + ":" + time.s + ":" + time.ms;
    return stringTime;
  }

  return (
    <div className="transition hover:bg-indigo-50">
      <div className="flex justify-between transition px-5 items-center h-16 text-black">
        <h3 className="flex justify-self-start text-justify">{score.zone}</h3>
        {objectByZone !== undefined && (
          <p className="leading-6 font-light pl-9 text-justify">
            {objectByZone.score}
          </p>
        )}
        {objectByZone !== undefined && (
          <p className="leading-6 font-light pl-9 text-justify">
            {timeToString(objectByZone.time)}
          </p>
        )}

        {objectByZone === undefined && (
          <p className="leading-6 font-light pl-9 text-justify">
            Vous n'avez pas encore joué
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfilItem;
