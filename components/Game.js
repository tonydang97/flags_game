import { useSession } from "next-auth/client";
import Image from "next/image";
import { useState } from "react";
import DisplayTime from "./DisplayTime";
import Caroussel from "./Caroussel";
import { FacebookShareButton, FacebookIcon } from "next-share";
import { PinterestShareButton, PinterestIcon } from "next-share";
import { TwitterShareButton, TwitterIcon } from "next-share";
import { LinkedinShareButton, LinkedinIcon } from "next-share";

// import { displayCountry } from "./DisplayCoutryFlag";

async function newScore(name, score, time, zone) {
  const response = await fetch("/api/addscore", {
    method: "POST",
    body: JSON.stringify({ name, score, time, zone }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

async function sendScore(name, score, time, zone) {
  console.log("test");
  const resp = await newScore(name, score, time, zone);
  console.log(resp);
}
//donne le prochain nom de pays à trouver
function getNextName(arrayCode, countriesList, count) {
  if (count === arrayCode.length) {
    null;
  } else {
    // console.log("array length de la liste de nom " + arrayCode.length);
    let code = arrayCode[count];
    let nextName = countriesList[code].translations.fra.common;
    return nextName;
  }
}

//fonction de delay pour les effets
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//Fonction voyant pour donner la réponse
async function giveAnswer(e) {
  let el = e;
  let i = 0;
  while (i < 5) {
    el.style.backgroundColor = "green";
    await sleep(150);
    el.style.backgroundColor = null;
    await sleep(150);
    i++;
  }
}

//Fonction voyant d'erreur
async function changeBorder() {
  let el = document.getElementById("border");
  el.style.border = "solid red 5px";
  await sleep(150);
  el.style.border = "solid black 2px";
  await sleep(150);
  el.style.border = "solid red 5px";
  await sleep(150);
  el.style.border = "solid black 2px";
}

//calcul le % de bonne réponse et renvoie le score
function score(goodAnswer, totalCount) {
  let score = 0;
  if (goodAnswer === 0) {
    return Math.round(score);
  } else {
    score = (goodAnswer / totalCount) * 100;
    let preciseScore = Number.parseFloat(score).toFixed(3);
    return preciseScore;
  }
}

export default function Results({ results }) {
  const [session, loading] = useSession();
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();

  const startTime = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stopTime = () => {
    clearInterval(interv);
  };

  const resetTime = () => {
    clearInterval(interv);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  //état du jeu, commencé ou non
  const [isStart, setIsStart] = useState(false);
  // état du jeu, fini ou non
  const [isFinish, setIsFinish] = useState(false);
  //compte d'avancement dans la liste des pays à trouver pour parcourir l'array
  const [count, setCount] = useState(0);
  //compte du nombre total de click
  const [totalCount, setTotalCount] = useState(0);
  //compte du nombre d'erreur consécutives
  const [mistakes, setMistakes] = useState(0);
  //enregistre le score final
  const [finalScore, setFinalScore] = useState(0);
  //enregistre le temps final
  const [finalTime, setFinalTime] = useState(0);
  //score envoyé
  const [scoreSended, setScoreSended] = useSession(false);

  //Création du dictionnaire contenant les infos pays + array contenant les codes pays
  const indexedCountries = results.index;
  const randomFlags = results.randomFlags;
  const randomNames = results.randomNames;

  // Récupère le code du drapeau cliqué, vérifie la réponse, gère les erreurs..
  async function checkFlag(e) {
    //Récupère le DOM pour vérifier le nom de pays demandé
    const h2 = document.getElementsByTagName("h2");
    const name = h2[0].firstElementChild.id;
    //récupère la bonne réponse pour potentiellement l'indiquer
    const answer = document.querySelector(`#flags #${randomNames[count]}`);
    const answerBorder = answer.parentElement.parentElement;
    //empêche la fonction de se lancer seule
    e.preventDefault();

    //si réponse correcte drapeau === nom pays
    if (name === e.target.id) {
      //disable le drapeau concerné
      e.target.style.opacity = 0.2;
      e.target.style.pointerEvents = "none";
      //réinitialise les erreurs s'il y en avait
      setMistakes(0);
      //avance d'un pays dans la liste de nom
      setCount(count + 1);
      //+1 au nombre total d'essai du joueur
      setTotalCount(totalCount + 1);
      if (count === randomNames.length - 1) {
        setCount(count + 1);
        setTotalCount(totalCount + 1);
        stopTime();
        setFinalScore(score(count, totalCount));
        setFinalTime(time);
        setIsFinish(true);
      }
      //la réponse est fausse
    } else {
      //le joueur à moins de 3 fautes consécutives
      if (mistakes < 2) {
        //déclenche le voyant d'erreur et ajoute 1 au compteur erreurs, recalcule la précision
        setMistakes(mistakes + 1);
        changeBorder();
        setTotalCount(totalCount + 1);
      } else {
        //le joueur a atteint 3 fautes consécutives, déclenche le voyant qui indique la bonne réponse
        setMistakes(mistakes + 1);
        changeBorder();
        giveAnswer(answerBorder);
        setTotalCount(totalCount + 1);
      }
    }
  }

  //Affiche le jeu, lance le timer et le score de précision
  function startGame(e) {
    e.preventDefault;
    if (isStart === false) {
      setIsStart(true);
      startTime();
      // setIsFirstName(false);
    } else {
      setIsStart(false);
      stopTime();
      resetTime();
    }
  }

  // Parcours le tableau, récupère le code ISO des pays et fetch le drapeau à l'API avec l'ISO correspondant.
  const displayCountry = randomFlags.map((key) => (
    <div className="p-3">
      <Image
        className=""
        id={indexedCountries[`${key}`].cca3}
        key={indexedCountries[`${key}`].cca3}
        src={indexedCountries[`${key}`].flags.png}
        // src={`https://countryflagsapi.com/png/${country.cca3}`}
        height={50}
        width={80}
        onClick={checkFlag}
      />
    </div>
  ));

  return (
    <div className="flex justify-center items-center p-10">
      {/* si le jeu n'a pas débuté */}
      {isStart === false && (
        <div id="border" className="">
          <h1 className="text-5xl">Vous avez choisi la zone : </h1>
          <div className="flex justify-center p-8">
            <button
              id="buttonNouveau"
              class="bg-green-500 rounded-full font-bold text-white px-10 py-5 transition duration-300 ease-in-out hover:bg-green-600 mr-6 "
              type="button"
              onClick={startGame}
            >
              {isStart === false && "Start"}
              {isStart === true && "Stop"}
            </button>
          </div> 
        </div>
      )}
      {/* si le jeu a débuté */}
      {isStart === true && (
        <div
          id="border"
          className="relative bg-slate-100 border-2 border-black px-5 pb-5 rounded-lg"
        >
          <div className="flex justify-between p-5">
            <div id="controlers" className="flex">
              <h2 id="nomdupays" className="flex text-black text-2xl mr-10">
                Nom du pays :
                <p id={randomNames[count]} key={randomNames[count]}>
                  {getNextName(randomNames, indexedCountries, count)}
                </p>
              </h2>
              <p id="bonnesreponses"className="text-black text-2xl mr-10">
                Bonnes réponses : 
                <span id="score">{" " + score(count, totalCount)}</span> %
              </p>
              <DisplayTime time={time} />
            </div>
            <button
              id="buttonNouveau"
              className="bg-red-500 font-bold text-white px-4 py-3 transition duration-300 ease-in-out hover:bg-red-600 mr-6 rounded-lg"
              type="button"
              onClick={startGame}
            >
              {isStart === false && "Start"}
              {isStart === true && "Stop"}
            </button>
          </div>
            <div id="flags" className="grid gap-2 grid-cols-10 grid-rows-3">
              {displayCountry}
            </div>
            {isFinish === true && session === null && (
              <div className="flex justify-around  bottom-0 z-1 bg-teal-400 min-w-fit min-h-fit rounded-2xl p-4 m-5">
                  <p id="response">Bravo Anonyme <br /> Vous avez terminé avec un taux de bonne
                  réponse de : {finalScore},<br /> </p>
                <DisplayTime time={finalTime} />
                <p>
                  <FacebookShareButton
                    url={"http://localhost:3000"}
                    quote={
                      "next-share is a social share buttons for your next React apps."
                    }
                    hashtag={"#nextshare"}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
  
                  <TwitterShareButton
                    url={"https://github.com/next-share"}
                    quote={"coucou"}
                    hashtag={"#nextshare"}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
  
                  <LinkedinShareButton
                    url={"https://github.com/next-share"}
                    quote={
                      "next-share is a social share buttons for your next React apps."
                    }
                    hashtag={"#nextshare"}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
  
                  <PinterestShareButton
                    url={"https://github.com/next-share"}
                    quote={
                      "next-share is a social share buttons for your next React apps."
                    }
                    hashtag={"#nextshare"}
                  >
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                </p>
              </div>
            )}
            {isFinish === true &&
              session !== null &&
              (sendScore(session.user.name, finalScore, finalTime, results.zone),
              (
                <div className="absolute bottom-0 left-0 z-1 bg-green-500 h-4/5 w-4/5">
                  <p>
                    Bravo {session.user.name || session.user.email} <br /> Vous
                    avez terminé avec un taux de bonne réponse de : {finalScore},
                    <br /> et un temps de :{" "}
                  </p>
                  <DisplayTime time={finalTime} />
                  <p>
                    <FacebookShareButton
                      url={"https://github.com/next-share"}
                      quote={
                        "next-share is a social share buttons for your next React apps."
                      }
                      hashtag={"#nextshare"}
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
  
                    <TwitterShareButton
                      url={"https://github.com/next-share"}
                      quote={
                        "next-share is a social share buttons for your next React apps."
                      }
                      hashtag={"#nextshare"}
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
  
                    <LinkedinShareButton
                      url={"https://github.com/next-share"}
                      quote={
                        "next-share is a social share buttons for your next React apps."
                      }
                      hashtag={"#nextshare"}
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
  
                    <PinterestShareButton
                      url={"https://github.com/next-share"}
                      quote={
                        "next-share is a social share buttons for your next React apps."
                      }
                      hashtag={"#nextshare"}
                    >
                      <PinterestIcon size={32} round />
                    </PinterestShareButton>
                  </p>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
