import React from "react";
import * as Actions from "../actions";
import Header from "../components/Header";
import Uploader from "../components/Uploader";
import ImageModal from "../components/ImageModal";
import ImagesCalendar from "../components/ImagesCalendar";
import Selectable from "../components/Selectable";
import { Route } from "react-router-dom";
import { imagesList } from "../actions";
import { connect } from "react-redux";

class App extends React.Component {
    componentDidMount() {
        this.props.dispatch(imagesList());
    }
    render() {
        return (
            <div className="app">
                <Route path="/" render={() => <Header />} />
                <Route exact path="/" render={() => <Uploader />} />
                <Route exact path={"/images/:id"} component={ImageModal} />
                <Route exact path={"/calendar"} component={Selectable} />
                <Route
                    render={() => (
                        <ImagesCalendar
                            modalVisible={this.props.modalVisible}
                        />
                    )}
                />
            </div>
        );
    }
}
const mapStateToProps = function(state) {
    console.log("state.modalVisible : " + state.modalVisible);
    return {
        imageslist: state.imageslist || [],
        modalVisible: state.modalVisible,
        selectedImage: null
    };
};

export default connect(mapStateToProps)(App);
