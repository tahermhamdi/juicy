import React from "react";
import * as Actions from "../actions";
import Header from "../components/Header";
import Uploader from "../components/Uploader";
import ImageModal from "../components/ImageModal";
import ImagesCalendar from "../components/ImagesCalendar";
import { Route } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Route path="/" render={() => <Header />} />
                <Route exact path="/" render={() => <Uploader />} />
                <Route exact path={"/images/:id"} component={ImageModal} />
                <Route
                    exact
                    path={"/imagescalendar"}
                    component={ImagesCalendar}
                />
            </div>
        );
    }
}
