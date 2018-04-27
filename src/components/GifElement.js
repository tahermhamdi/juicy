import React from "react";

const GifElement = ({ gif, onImageSelect }) => {
    return (
        <div className="gifElement" onClick={() => onImageSelect(gif)}>
            <img src={gif.images.downsized.url} />
        </div>
    );
};
export default GifElement;
