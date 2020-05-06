Feature: Playing the game again
  The game should should be restarted when clicking play again button

  Scenario: Eventlistener is triggered by click event
    Given eventlistener listening for click events was added to html div element with class .message
    When click event is raised by clicking child element button with class .again
    Then eventlistener should call game start method to create an empty new Board