import React from "react";
import ReactDOM from "react-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="header">
                <title>Ease your social life</title>
                <img className="imgLogo" src="/juicy.png" />
            </div>
        );
    }
}
