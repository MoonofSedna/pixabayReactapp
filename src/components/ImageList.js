import React from 'react';
import Imagen from './Imagen';
import PropTypes from 'prop-types';

const ImageList = ({images}) => {
    return ( 
        <div className="col-12 p-5 row">
            {images.map(image => (
                <Imagen 
                key={image.id}
                image={image}/>
            ))}
        </div>
     );
}
ImageList.propTypes = {
    images:PropTypes.array.isRequired
}
 
export default ImageList;