import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { swNewUpdate } from "./actions/SWUpdate";
import localForage from "localforage";
import createCompressor from "redux-persist-transform-compress";

localForage.config({
    name: "resource2health",
    storeName: "resource2health",
    description: "storage for the resource2health",
});

const compressor = createCompressor({});

const persistConfig = {
    key: "root",
    storage: localForage,
    transforms: [compressor],
    // blacklist: ['waitingSW']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* eslint-disable no-underscore-dangle */
const store = createStore(
    persistedReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

let persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
    onUpdate: (registration) => {
        console.log(registration);
        if (registration.waiting) {
            console.log(registration);
            store.dispatch(swNewUpdate(registration.waiting));
        }
    },
    onSuccess: (registration) => {},
});
