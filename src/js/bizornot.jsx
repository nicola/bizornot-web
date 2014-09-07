/** @jsx React.DOM */

var DATA = {};
React.initializeTouchEvents(true);

var currentUser = false;

function init() {
  alert(111)
  if (currentUser) {

    React.renderComponent(
      <div>
        Logged in
      </div>,
      document.querySelector('#app')
    );

  } else {

    React.renderComponent(
      <div>
        Log in
      </div>,
      document.querySelector('#app')
    );

  }

}