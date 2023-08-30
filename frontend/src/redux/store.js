// Third Party Imports.
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Local Imports.
import rootReducer from './reducers'

// Create the store.
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Export.
export default store;