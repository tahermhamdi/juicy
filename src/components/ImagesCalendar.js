import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";
import { imagesList, onCriteriaChange, closeModal } from "../actions";
import { Link } from "react-router-dom";
import Modal from "react-modal";

class ImagesCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSelectedImage = this.handleSelectedImage.bind(this);
    }

    handleSelectedImage(event) {
        this.props.dispatch(
            closeModal(
                event.currentTarget.attributes["imageid"].value,
                this.props.slotinfo
            )
        );
    }
    onFieldChange(criteria) {
        this.props.dispatch(onCriteriaChange(criteria));
    }
    componentWillMount() {
        Modal.setAppElement("body");
    }
    componentDidMount() {
        this.props.dispatch(imagesList());
    }
    render() {
        let imageslist = this.props.imageslist;
        return (
            <Modal isOpen={this.props.modalVisible}>
                <h3>Action on the image</h3>
                <input type="text" key="action" />
                <h1>/ / /</h1>
                {imageslist.map(image => {
                    return (
                        <div
                            key={image.id}
                            imageid={image.id}
                            className="box"
                            onClick={this.handleSelectedImage}
                        >
                            <img src={image.url} />
                            {image.title}
                        </div>
                    );
                })}
                <hr />
            </Modal>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        imageslist: state.imageslist || [],
        slotinfo: state.slotinfo
    };
};
export default connect(mapStateToProps)(ImagesCalendar);
