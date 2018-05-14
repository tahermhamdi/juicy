import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import ImageForm from "./ImageForm";
import * as Actions from "../actions";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";

class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = { imageFormVisible: false, imagedata: "" };
        this.handleChange = this.handleChange.bind(this);
        this.upload = this.upload.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    upload() {
        var formData = new FormData();
        formData.append("image", this.state.url);
        this.props.actions.uploadImage(formData);
        this.setState({
            imageFormVisible: true
        });
    }
    setFile(e) {
        this.state.url = e.target.files[0];
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <input type="file" onChange={this.setFile} />
                        <button onClick={this.upload}>
                            <p>Upload</p>
                        </button>
                    </div>
                    {this.state.imageFormVisible && (
                        <Route render={() => <ImageForm />} />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        imagedata: state.imagedata
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Uploader);
