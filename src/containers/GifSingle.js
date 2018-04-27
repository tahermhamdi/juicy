import React from "react";
import axios from "axios";

export default class GifSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gifs: this.props.gifs,
            username: this.props.username
        };
    }
    componentDidMount() {
        console.log(
            "this.props.match.params.cid : " + this.props.match.params.cid
        );
        const url = `http://api.giphy.com/v1/gifs/${
            this.props.match.params.cid
        }?api_key=dc6zaTOxFJmzC`;

        axios.get(url).then(resp => {
            console.log(resp.data.data);
            this.setState({
                gifs: resp.data.data.images.original.url,
                username: resp.data.data.username
            });
        });
        // axios
        // update the props
    }
    render() {
        return (
            <div id="modal">
                <img src={this.state.gifs} />
                <p>
                    <strong>User:</strong> {this.state.username}
                </p>
                <p>
                    <strong>URL:</strong> {this.state.gifs}
                </p>
            </div>
        );
    }
}
// function mapStateToProps(state) {
//     return {
//         gifs: state.single.data
//     };
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(Actions, dispatch)
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(GifSingle);
