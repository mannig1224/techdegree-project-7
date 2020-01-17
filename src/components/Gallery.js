import React from 'react';

import Photo from './Photo';
import NotFound from './NotFound';

const Gallery = (props, {match}) => {

    const results = props.data;
    let photos;
    let query = match.params.name;
        if(results.length > 0) {
            photos = results.map(photo =>
                <Photo 
                    key = {photo.id}
                    url = {`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`}
                    title= {photo.title}
                />
                );
        } else {
            photos = <NotFound />
        }
    
    return(
        <div className="photo-container">
        <h2>Results of </h2>
            <ul>
                {photos}                
            </ul>
        </div>
    );
}

  
  export default Gallery;