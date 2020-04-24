Feature: Playing the game by clicking on game board
  Game should respond to mouse clicks

  Scenario: Eventlistener is triggered by click event
    Given an eventlistener listening for click events was added to html div element with class .board
    When a click event is raised on any html child element of html div element with class .board
    Then eventlistener function should call board makeMove passing selected column as argument of type "number"