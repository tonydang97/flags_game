import React from 'react';

function Profil() {

  return <div class="h-screen bg-gradient-to-br from-pink-50 to-indigo-100 grid place-items-center">
  <div class="w-6/12 mx-auto rounded border">
  <div class="bg-white p-10 shadow-sm">
      <h1 class="text-lg font-medium text-gray-800">VOS SCORES</h1>
      <div class="h-1 w-full mx-auto border-b my-5"></div>
      <div class="transition hover:bg-indigo-50">
          {/* DIV EUROPE *****************************************************************************/}
      <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
          <i class="fas fa-plus"></i>
          <h3>EUROPE</h3>
      </div>

      <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
          <p class="leading-6 font-light pl-9 text-justify">
          Temps : 
          </p>
          <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
      </div>
      </div>
        {/* ****************************************************************************************** */}
        {/* DIV ASIE********************************************************************************** */}
      <div class="transition hover:bg-indigo-50">
      <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
          <i class="fas fa-plus"></i>
          <h3>ASIE</h3>
      </div>

      <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
          <p class="leading-6 font-light pl-9 text-justify">
          Temps:
          </p>
          <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
      </div>
      </div>
        {/* ***************************************************************************************** */}
        {/* ***************************************************************************************** */}
      <div class="transition hover:bg-indigo-50">

      <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
          <i class="fas fa-plus"></i>
          <h3>AMERIQUE  DU NORD</h3>
      </div>

      <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
          <p class="leading-6 font-light pl-9 text-justify">
          Temps: 
          </p>
          <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
      </div>
      </div>
    {/* ******************************************************************************************** */}
 
      <div class="transition hover:bg-indigo-50">

      <div class="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16">
          <i class="fas fa-plus"></i>
          <h3>WORLD</h3>
      </div>

      <div class="accordion-content px-5 pt-0 overflow-hidden max-h-0">
          <p class="leading-6 font-light pl-9 text-justify">
          Temps: 
          </p>
          <button class="rounded-full bg-indigo-600 text-white font-medium font-lg px-6 py-2 my-5 ml-9">Learn more</button>
      </div>
      </div>
  </div>
  </div>
</div>
}

export default Profil;

