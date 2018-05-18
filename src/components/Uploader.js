import React from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import ImageForm from "./ImageForm";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import Dropzone from "react-dropzone";
import { uploadImage } from "../actions";

class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { imageFormVisible: false, imagedata: "", imageFiles: [] };
        this.handleChange = this.handleChange.bind(this);
        this.upload = this.upload.bind(this);
        this.setFile = this.setFile.bind(this);
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    onDrop(imageFiles) {
        this.setState({
            imageFiles: imageFiles
        });
        this.state.url = imageFiles[0];
    }
    upload() {
        var formData = new FormData();
        formData.append("image", this.state.url);
        this.props.dispatch(uploadImage(formData));
        this.setState({
            imageFormVisible: true
        });
    }
    setFile(e) {
        this.state.url = e.target.files[0];
    }
    render() {
        return (
            <div>
                <div className="uploadBox">
                    <Dropzone
                        className="dragAndDropArea"
                        onChange={this.setFile}
                        onDrop={this.onDrop.bind(this)}
                        accept="image/jpeg,image/jpg,image/tiff,image/gif,image/png"
                        multiple={false}
                    >
                        <div className="uploadDivTag">
                            Drag and drop or click here
                            {this.state.imageFiles.length > 0 ? (
                                <div>
                                    <div className="divPhotoDragNew">
                                        {this.state.imageFiles.map(file => (
                                            <img
                                                key={file.preview}
                                                src={file.preview}
                                                className="photoDragNew"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </Dropzone>
                </div>
                {this.state.imageFiles.length > 0 ? (
                    <div className="uploadButtonDivTag">
                        <button onClick={this.upload} className="buttonTag">
                            <p>Upload</p>
                        </button>
                    </div>
                ) : null}

                {this.state.imageFormVisible && <Route component={ImageForm} />}
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        imagedata: state.imagedata
    };
};
export default connect(mapStateToProps)(Uploader);
