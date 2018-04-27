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
            <div id="modal">
                <img src={props.selectedImage.images.original.url} />
                <p>
                    <strong>Source:</strong>{" "}
                    <a href={props.selectedImage.source}>
                        {props.selectedImage.source}
                    </a>
                </p>
                <p>
                    <strong>User:</strong> {props.selectedImage.username}
                </p>
                <p>
                    <strong>URL:</strong>{" "}
                    {props.selectedImage.images.original.url}
                </p>
                <a target="_blank" href={"/gifs/" + props.selectedImage.id}>
                    {props.selectedImage.title}
                </a>
                <button onClick={() => props.onRequestClose()}>close</button>
            </div>
        </Modal>
    );
};

export default GifModal;
