Feature: Playing the game by clicking on game board
  Creating a new instance of Board we want a add an eventlistener for click events

  Scenario: addEventListener should be called in Board constructor
    When a new Board is created for a new Game
    Then Board constructor should call addEventListener method

  Scenario: Board eventlistener is triggered by click event when player makes a move
    Given a click event is raised by any html child element of html div element with class .board
    Then eventlistener should call board makeMove method passing selected column as type "number" between 0 to 6 to board makeMove method