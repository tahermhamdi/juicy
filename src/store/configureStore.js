import { createStore, compose, applyMiddleware } from "redux";
import reducer from "../reducer";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(initialState) {
    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(reduxPromise),
            composeWithDevTools(applyMiddleware(reduxPromise))
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducer", () => {
            const nextRootReducer = require("../reducer").default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
