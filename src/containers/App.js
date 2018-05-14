import React from "react";
import * as Actions from "../actions";
import Header from "../components/Header";
import ImagesList from "../components/ImagesList";
import Uploader from "../components/Uploader";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="app">
                    <Route path="/" render={() => <Header />} />
                    <div className="container">
                        <div className="links">
                            <ul>
                                <li>
                                    <Link to="/imageslist">Images list</Link>
                                </li>
                            </ul>
                        </div>
                        <Route
                            path="/imageslist"
                            render={() => <ImagesList />}
                        />
                        <Route path="/" render={() => <Uploader />} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
