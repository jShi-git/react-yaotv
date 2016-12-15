import React from 'react';
import $ from 'jquery';
// import { Link } from 'react-router';

class About extends React.Component {
  componentDidMount() {
    // console.log('new start');
    // console.log($);
    $('body').html();
    $('html').html();
  }
  render() {
    return (
      <div>
        关于创祀
      </div>
    );
  }
}

module.exports = About;
