import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AppContainer } from 'react-hot-loader';

let root = document.getElementById('root');

// ReactDOM.hydrate(<App/>,root)

// if (module.hot){
// 	module.hot.accept('./App.jsx',() => {
// 		const NextApp = require('./App.jsx').default
// 		ReactDOM.hydrate(<NextApp />,root) 
// 	})
// }



const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,root)
  // ReactDOM.render(
  //   <AppContainer>
  //     <Component />
  //   </AppContainer>,
  //   root,
  // );
};
 
render(App);
 
// webpack Hot Module Replacement API
if (module.hot) {
  // keep in mind - here you are configuring HMR to accept CHILDREN MODULE
  // while `hot` would configure HMR for the CURRENT module
  module.hot.accept('./App.jsx', () => {
    // if you are using harmony modules ({modules:false})
    render(App);
    // in all other cases - re-require App manually
    render(require('./App.jsx').default );
  });
}