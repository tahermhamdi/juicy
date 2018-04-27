import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import GifSingle from "./containers/GifSingle";
import GifModal from "./components/GifModal";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Route, BrowserRouter } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div id="app">
                <Route exact path="/" component={App} />
                <Route path="/gifs/:cid" component={GifSingle} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector("main")
);
