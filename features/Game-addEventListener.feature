Feature: Playing the game again
  The game should should be restarted when clicking play again button

  Scenario: Eventlistener is triggered by click event
    Given an eventlistener listening for click events was added to html div element with class .message
    When a click event is raised by any html child element of html div element with class .message
    Then eventlistener should call game start method to create an empty new Board