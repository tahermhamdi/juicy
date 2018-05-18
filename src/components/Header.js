import React from "react";
import ReactDOM from "react-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Uploader from "./Uploader";
import Selectable from "./Selectable";
import ImagesList from "./ImagesList";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        console.log(
            "document.location.pathname :",
            document.location.pathname.indexOf("/calendar")
        );
        return (
            <div>
                <title>Ease your social posts</title>
                <div className="topnav">
                    <Link to="/imageslist">Board</Link>
                    <Link to="/calendar">Calendar</Link>
                    <Link className="active" to="/">
                        Generate Keywords/Hashtags
                    </Link>
                    <div className="header">
                        <img className="imgLogo" src="/juicy.png" />
                    </div>
                    <Route
                        exact
                        path="/imageslist"
                        render={() => <ImagesList />}
                    />
                    <Route
                        exact
                        path="/calendar"
                        render={() => <Selectable />}
                    />
                </div>
            </div>
        );
    }
}
