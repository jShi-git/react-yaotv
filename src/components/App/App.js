import React from 'react';
import { Link, IndexLink } from 'react-router';

const App = (props) => (
  <div>
    <h1>摇电视项目 React 结构</h1>
    <ul>
      <li><IndexLink to="/" activeClassName="active">首页</IndexLink></li>
      <li><Link to="/about" activeStyle={{ color: 'green' }}>关于</Link></li>
    </ul>
    {props.children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
