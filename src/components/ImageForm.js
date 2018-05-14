import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import { Link } from "react-router-dom";

class ImageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }
    handleChange(event) {
        console.log("this is working", event.target.value);
        dispatch(action.updateField(event.target.value));
        //this.setState({ value: event.target.value });
    }
    // componentDidMount() {
    //     this.props.actions.requestImage(this.props.id);
    // }
    updateImage() {
        this.props.actions.updateImage();
    }
    deleteImage() {
        this.props.actions.deleteImage();
    }
    render() {
        let imagedata = this.props.imagedata.imagedata;
        console.log("imagedata ", imagedata);
        return (
            <div>
                <h1>Image details</h1>
                <h1 />
                {imagedata.map(image => {
                    return (
                        <div className="formDivTag">
                            <h5>Article</h5>
                            <img src={image.url} className="formImgTag" />
                            <input
                                type="text"
                                defaultValue={image.id || ""}
                                onChange={this.handleChange}
                            />
                            <h5>Keywords</h5>
                            ​<textarea
                                rows="10"
                                cols="100"
                                onChange={this.handleChange}
                                defaultValue={image.keywords || ""}
                            />
                            <h5>Hashtag</h5>
                            ​<textarea
                                rows="10"
                                cols="100"
                                onChange={this.handleChange}
                                defaultValue={image.hashtags || ""}
                            />
                            <h5>Articles</h5>
                            ​<textarea
                                rows="10"
                                cols="100"
                                onChange={this.handleChange}
                                defaultValue={image.articles || ""}
                            />
                            v
                            <br />
                            <br />
                            <button onClick={this.updateImage}>
                                <p>save</p>
                            </button>
                            <button onClick={this.deleteImage}>
                                <p>delete</p>
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        imagedata: state.uploadimage
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImageForm);
