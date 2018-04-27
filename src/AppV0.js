import React from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import GifsList from "./GifsList";
import GifModal from "./GifModal";
import GifsTemp from "./GifsTemp";
import { Link } from "react-router-dom";
import { HashRouter, Route } from "react-router-dom";

import axios from "axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: [],
            selectedImage: null,
            modalVisible: false
        };
        this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
    }
    closeModal() {
        this.setState({
            modalVisible: false,
            modalVisible: null
        });
    }
    openModal(gif) {
        this.setState({
            modalVisible: true,
            selectedImage: gif
        });
    }

    handleCriteriaChange(criteria) {
        const url = `http://api.giphy.com/v1/gifs/search?q=${criteria.replace(
            /\s/g,
            "+"
        )}&api_key=dc6zaTOxFJmzC&limit=20`;
        axios
            .get(url)
            .then(response => {
                this.setState({ gifs: response.data.data });
            })
            .catch(error => {
                console.log("Error searching gif", error);
            });
    }
    render() {
        return (
            <div>
                <Search onCriteriaChange={this.handleCriteriaChange} />
                <GifsList
                    gifs={this.state.gifs}
                    onImageSelect={selectedImage =>
                        this.openModal(selectedImage)
                    }
                />
                <GifModal
                    modalVisible={this.state.modalVisible}
                    selectedImage={this.state.selectedImage}
                    onRequestClose={() => this.closeModal()}
                />
            </div>
        );
    }
}
