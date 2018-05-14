import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import { Link } from "react-router-dom";

class ImagesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.props.actions.imagesList();
    }
    render() {
        let imageslist = this.props.imageslist;
        return (
            <div>
                <h1>Images list</h1>
                <div className="imagesDivTag">
                    {imageslist.map(image => {
                        return (
                            <div className="imageDivTag">
                                <Link
                                    to={{
                                        pathname: `/images/${image.id}`
                                    }}
                                >
                                    <img
                                        src={image.url}
                                        className="imageImgTag"
                                    />
                                </Link>
                                /{image.title}/{image.article}/{image.tags}/{
                                    image.video_url
                                }
                            </div>
                        );
                    })}
                </div>

                <hr />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        imageslist: state.imageslist.data
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ImagesList);
