import React from "react";
import GifElement from "./GifElement";

const GifsTrending = props => {
    const gifElements = props.trending.map(image => {
        return (
            <GifElement
                key={image.id}
                gif={image}
                onImageSelect={props.onImageSelect}
            />
        );
    });

    return (
        <div id="gifsTrending">
            <br />
            {gifElements}
        </div>
    );
};

export default GifsTrending;
