import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReduxPromise from 'redux-promise'; //using for async axios
import reducers from './reducers';
import Main from './Main'; // Our custom react component

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const elementsList = document.getElementsByClassName('app');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


Object.keys(elementsList).map(function(key) {
    const URL = elementsList[key].getAttribute('data-url');
    const LOGGER_URL = elementsList[key].getAttribute('data-logger-url');
    const JSON_PATH = elementsList[key].getAttribute('data-json-path');
    const DATA_HOOK = elementsList[key].getAttribute('data-hook-on-element-selected');
    const DOM_ELEMENT = document.getElementsByClassName('initialConfig')[0];

    const INITIAL_CSS_CONFIG = {
        custom: window.getComputedStyle(DOM_ELEMENT).getPropertyValue('--custom-property').trim(),
    };

    ReactDOM.render(
        <Provider store={createStoreWithMiddleware(reducers)}>
            <Main
                dataUrl={URL}
                loggerUrl={LOGGER_URL}
                jsonPath={JSON_PATH}
                dataHook={DATA_HOOK}
                initialCSSConfig={INITIAL_CSS_CONFIG}/>
        </Provider>
        , elementsList[key]);
});

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(<Main />, document.getElementById('app'));


// ReactDOM.render(
//     <Provider store={createStoreWithMiddleware(reducers)}>
//         <Main dataUrl={dataUrl} dataPath={dataPath} />
//     </Provider>
//     , document.getElementById('json-table'));