import React from 'react';

import Photo from './Photo';
import NotFound from './NotFound';

const Gallery = () => {
    return(
        <div className="photo-container">
        <h2>Results</h2>
            <ul>
                <Photo />
                
                <NotFound />
            </ul>
        </div>
    );
}

  
  export default Gallery;