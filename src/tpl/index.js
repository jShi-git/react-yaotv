import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route, browserHistory } from 'react-router';
import { Router, browserHistory } from 'react-router';
import App from '../components/App';
import About from '../routes/About';
// import About from './routes/About/components/About';

const rootRoute = {
  path: '/',
  component: App,
  childRoutes: [
    About,
  ],
};
ReactDOM.render(
  (
    <Router history={browserHistory} routes={rootRoute} />
  ), document.getElementById('app')
);

// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path="/" component={App}>
//       <Route path="/about" component={About} />
//     </Route>
//   </Router>,
//   document.getElementById('app'));
