import React from 'react';
import Image from 'next/image';

function Caroussel() {
  return (
    <div className='contenu_carou_auto'>
      {['china', 'frane', 'japon', 'espagna', 'india', 'usa', 'germany'].map(path => {
          return (
              <div class="caroussel-image" key={path}>
                  <Image src={`/${path}.webp`} alt='flags' width="420" height="279"/>
              </div>
          )
      })}
  </div>
  )
}

export default Caroussel;

