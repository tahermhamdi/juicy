import React from "react";
import Logo from "./logo";
import ProfilePic from "./profilePic";
import Profile from "./profile";
import Uploader from "./uploader";
import SetBio from "./setBio";
import OtherProfile from "./otherProfile";
import Friends from "./friends";
import Online from "./online";
import Chat from "./chat";
import axios from "./axios";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            email: this.props.email,
            bio: this.props.bio,
            profilepic: this.props.profilepic
        };
        this.showUploader = this.showUploader.bind(this);
    }
    componentDidMount() {
        axios.get("/user").then(resp => {
            this.setState({
                id: resp.data.id,
                firstname: resp.data.firstname,
                lastname: resp.data.lastname,
                email: resp.data.email,
                bio: resp.data.bio,
                profilepic: resp.data.profilepic
            });
        });
    }
    showUploader() {
        this.setState({
            uploaderVisible: true
        });
    }
    render() {
        //if (!this.state.id) {
        //     return null; // <img src='spinner.gif' />;
        // }
        return (
            <BrowserRouter>
                <div>
                    <div className="links">
                        <Link to="/online">online</Link>
                        <br />
                        <Link to="/chat">chat</Link>
                    </div>
                    <header>
                        <div>
                            <Route path="/" render={() => <Logo />} />
                            <Route
                                path="/"
                                render={() => (
                                    <ProfilePic
                                        id={this.state.id}
                                        profilepic={this.state.profilepic}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/app"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        profilepic={this.state.profilepic}
                                        bio={this.state.bio}
                                        showUploader={this.showUploader}
                                        setBio={bio =>
                                            this.setState({
                                                bio: bio
                                            })
                                        }
                                    />
                                )}
                            />
                            {this.state.uploaderVisible && (
                                <Route
                                    path="/"
                                    render={() => (
                                        <Uploader
                                            setProfilepic={img =>
                                                this.setState({
                                                    profilepic: img,
                                                    uploaderVisible: false
                                                })
                                            }
                                        />
                                    )}
                                />
                            )}
                            <Route
                                path={"/users/:id"}
                                component={OtherProfile}
                            />
                            <Route
                                exact
                                path="/friends"
                                render={() => (
                                    <Friends
                                        id={this.state.id}
                                        firstname={this.state.firstname}
                                        lastname={this.state.lastname}
                                        profilepic={this.state.profilepic}
                                    />
                                )}
                            />
                            <Route
                                exact
                                path="/online"
                                render={() => <Online id={this.state.id} />}
                            />
                            <Route
                                exact
                                path="/chat"
                                render={() => <Chat id={this.state.id} />}
                            />
                        </div>
                    </header>
                </div>
            </BrowserRouter>
        );
    }
}
