import React from "react";
import Modal from "react-modal";

const GifModal = props => {
    if (!props.selectedImage) {
        return <div />;
    }
    return (
        <Modal
            isOpen={props.modalVisible}
            onRequestClose={() => props.onRequestClose()}
        >
            <div>
                <img src={props.selectedImage.images.original.url} />
                <p>
                    <strong>Source:</strong>{" "}
                    <a href={props.selectedImage.source}>
                        {props.selectedImage.source}
                    </a>
                </p>
                <p>
                    <strong>Rating:</strong> {props.selectedImage.rating}
                </p>
                <p>
                    <strong>URL:</strong>{" "}
                    {props.selectedImage.images.original.url}
                </p>
                <button onClick={() => props.onRequestClose()}>close</button>
            </div>
        </Modal>
    );
};

export default GifModal;
