Feature: Calling method addEventListener when creating a new instance of Board
  Creating a new Board, we want to call addEventListener for listening click events

  Scenario: addEventListener should be called in Board constructor
    When a new Board is created for a new Game
    Then Board constructor should call addEventListener method

# Not testing this...

# Feature: Playing the game by clicking on game board
# Game should respond to mouse clicks

# Scenario: Eventlistener is triggered by click event
#  Given an eventlistener listening for click events was added to html div element with class .board
#  When a click event is raised by any html child element of html div element with class .board
#  Then eventlistener should call board makeMove method passing selected column as type "number" between 0 to 6 to board makeMove method