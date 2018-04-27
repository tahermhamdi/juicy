import React from "react";
import * as Actions from "../actions";
import GifsList from "../components/GifsList";
import GifsTrending from "../components/GifsTrending";
import GifModal from "../components/GifModal";
import Search from "../components/Search";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import { bindActionCreators } from "redux";

class App extends React.Component {
    componentDidMount() {
        this.props.actions.requestTrending();
    }
    render() {
        return (
            <div className="app">
                <Search onCriteriaChange={this.props.actions.requestGifs} />
                <div id="trendingTitle">NOW TRENDING</div>
                <GifsTrending
                    trending={this.props.trending}
                    onImageSelect={selectedImage =>
                        this.props.actions.openModal({ selectedImage })
                    }
                />
                <div />
                <hr />
                <GifsList
                    gifs={this.props.gifs}
                    onImageSelect={selectedImage =>
                        this.props.actions.openModal({ selectedImage })
                    }
                />
                <GifModal
                    modalVisible={this.props.modalVisible}
                    selectedImage={this.props.selectedImage}
                    onRequestClose={() => this.props.actions.closeModal()}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        gifs: state.gifs.data,
        trending: state.trending.data,
        modalVisible: state.modal.modalVisible,
        selectedImage: state.modal.selectedImage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
