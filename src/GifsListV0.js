import React from "react";
import GifElement from "./GifElement";

const GifsList = props => {
    const gifElements = props.gifs.map(image => {
        return (
            <GifElement
                key={image.id}
                gif={image}
                onImageSelect={props.onImageSelect}
            />
        );
    });

    return <div className="gifs-list">{gifElements}</div>;
};

export default GifsList;
