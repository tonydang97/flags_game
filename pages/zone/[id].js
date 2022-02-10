import Footer from "../../components/Footer";
import Game from "../../components/Game";
import Navbar from "../../components/Navbar";
import requests from "../../utils/requests";

// Randomiser
function shuffleArray(array) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}
export default function Zone(props) {
  return (
    <div className="min-h-screen w-full">
      <div id="playing" className="bg-slate-500 min-h-screen w-full">
        <Navbar />
        <div className="flex justify-center items-center p-10">
          <h1 className="text-black text-5xl">
            Vous avez choisi la zone : {props.zone}{" "}
          </h1>
        </div>
        <Game results={props} />
      </div>
      <Footer />
    </div>
  );
}
//  les statics
export async function getServerSideProps(context) {
  const url = context.query.id;
  //fetch la liste des pays de la zone demandée
  const reqCountries = await fetch(requests[url]);
  // const reqCountries = await fetch("https://restcountries.com/v3.1/name/peru");
  const dataCountries = await reqCountries.json();

  // transforme la liste json en array
  const countries = Array.from(dataCountries);

  //crée un array contenant les codes ISO qu'on pourra randomiser
  const codeArray = [];
  countries.forEach((country) => {
    codeArray.push(country.cca3);
  });

  // Deep copy (pour éviter l'assignation par référence) de l'array code
  var randomFlags = codeArray.slice();
  var randomNames = codeArray.slice();

  // Randomisation liste pour les drapeaux
  randomFlags = shuffleArray(randomFlags);

  //Randomisation liste pour les pays à trouver
  randomNames = shuffleArray(randomNames);

  //crée un dictionnaire association cca3 : infos pays
  var indexedCountries = {};
  for (let i = 0; i < countries.length; i++) {
    let country = countries[i];
    indexedCountries[country.cca3] = country;
  }

  // retourne les props
  return {
    props: {
      index: indexedCountries,
      codes: codeArray,
      randomNames: randomNames,
      randomFlags: randomFlags,
      zone: url,
    },
  };
}
