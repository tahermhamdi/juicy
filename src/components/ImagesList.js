import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import { imagesList, onCriteriaChange } from "../actions";
import { Link } from "react-router-dom";

class ImagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onFieldChange = this.onFieldChange.bind(this);
    }
    onFieldChange(criteria) {
        console.log(criteria);
        this.props.dispatch(onCriteriaChange(criteria));
    }
    componentDidMount() {
        this.props.dispatch(imagesList());
    }
    render() {
        let imageslist = this.props.imageslist;
        return (
            <div>
                <div>
                    <input
                        name="criteria"
                        id="criteria"
                        type="text"
                        placeholder="search images"
                        onChange={event =>
                            this.onFieldChange(event.target.value)
                        }
                    />
                </div>
                <h1>/ / /</h1>
                {imageslist.map(image => {
                    return (
                        <div key={image.id} className="box">
                            <img src={image.url} className="imageImgTag" />
                            <div className="details">
                                <Link
                                    to={{
                                        pathname: `/images/${image.id}`
                                    }}
                                    target="_new"
                                >
                                    {image.title}
                                </Link>
                                {image.hashtags}
                                <br />
                            </div>
                        </div>
                    );
                })}
                <hr />
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        imageslist: state.imageslist || []
    };
};
export default connect(mapStateToProps)(ImagesList);
