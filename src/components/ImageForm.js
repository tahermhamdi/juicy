import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { Link } from "react-router-dom";
import { updateField, updateImage } from "../actions";

class ImageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleBlog = this.handleBlog.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.generateText = this.generateText.bind(this);
    }
    handleChange(event) {
        this.props.dispatch(updateField(event.target.name, event.target.value));

        //this.setState({ value: event.target.value });
    }
    handleBlog() {
        this.props.dispatch(
            updateField(this.refs.blog.name, this.refs.blog.value)
        );

        //this.setState({ value: event.target.value });
    }

    // componentDidMount() {
    //     this.props.actions.requestImage(this.props.id);
    // }
    updateImage() {
        this.props.dispatch(updateImage(this.props.imagedata));
    }
    generateText() {
        var MarkovChain = require("markovchain-generate");
        var chain = new MarkovChain();
        var blogChain = this.refs.blog.value;
        blogChain = blogChain.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            ""
        );
        chain.generateChain(blogChain);

        // Generate strings to your heart's content!
        var generated_string = chain.generateString();
        this.refs.blog.value = generated_string;
        this.props.dispatch(
            updateField(this.refs.blog.name, this.refs.blog.value)
        );
    }

    render() {
        if (!this.props.imagedata) {
            return <h3>LOADING...</h3>;
        }
        let imagedata = this.props.imagedata;
        return (
            <div>
                {imagedata.map(image => {
                    return (
                        <div className="forms" key={image.id}>
                            <div>
                                <table className="formkeywords">
                                    <tbody>
                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>
                                                <h5>title</h5>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="titletext"
                                                    onChange={this.handleChange}
                                                    defaultValue={
                                                        image.title || ""
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <h5>description</h5>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    className="descriptiontext"
                                                    onChange={this.handleChange}
                                                    defaultValue={
                                                        image.description || ""
                                                    }
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>
                                                <h5>keywords</h5>
                                            </td>
                                            <td>
                                                <h5>hashtags</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            </td>
                                            <td>
                                                <textarea
                                                    name="keywords"
                                                    className="textareaKeywords"
                                                    rows="10"
                                                    cols="50"
                                                    onChange={this.handleChange}
                                                    defaultValue={
                                                        image.keywords || ""
                                                    }
                                                />
                                            </td>
                                            <td>
                                                ​<textarea
                                                    name="hashtags"
                                                    className="textareaHashtags"
                                                    rows="10"
                                                    cols="50"
                                                    onChange={this.handleChange}
                                                    defaultValue={
                                                        image.hashtags || ""
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="formArticles">
                                <h5>Articles</h5>
                                ​<textarea
                                    name="articles"
                                    className="textareaArticles"
                                    rows="10"
                                    cols="100"
                                    onChange={this.handleChange}
                                    defaultValue={image.articles || ""}
                                />
                            </div>
                            <div className="formBlog">
                                <h5>Blog</h5>
                                ​<textarea
                                    className="textareaBlog"
                                    name="blog"
                                    ref="blog"
                                    rows="30"
                                    cols="100"
                                    onChange={this.handleBlog}
                                    defaultValue={image.blog || ""}
                                />
                                <br />
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <button
                                                    className="buttonTag"
                                                    onClick={this.generateText}
                                                >
                                                    <p>generate text</p>
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="buttonTag"
                                                    onClick={this.updateImage}
                                                >
                                                    <p>save</p>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        imagedata: state.imagedata
    };
};
export default connect(mapStateToProps)(ImageForm);
