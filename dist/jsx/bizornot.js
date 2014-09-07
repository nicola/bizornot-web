/** @jsx React.DOM */

var DATA = {};
React.initializeTouchEvents(true);

var currentUser = false;

function init() {
  alert(111)
  if (currentUser) {

    React.renderComponent(
      React.DOM.div(null, 
        "Logged in"
      ),
      document.querySelector('#app')
    );

  } else {

    React.renderComponent(
      React.DOM.div(null, 
        "Log in"
      ),
      document.querySelector('#app')
    );

  }

}