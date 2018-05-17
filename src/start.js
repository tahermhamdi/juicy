import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Route, BrowserRouter } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Route component={App} />
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector("main")
);
