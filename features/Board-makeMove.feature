Feature: Making a move in the game
  We want to enable players to make a move in the game

  Background: An eventlistener catches click on a game board column
    Given that an eventlistener was added to the html element with class board
    And that this eventlistener calls function makeMove during click event on that html element
    And that this eventlistener function call passes a variable of type integer between 0 and 6 as argument to makeMove

  Scenario: A player makes a valid move
    Given board.playInProgress property is false
    Then makeMove should move current players game piece through free positions in selected column until no free position is available
    And board.matrix property array values should be set corresponding to previous board.matrix values including this latest player move
    And winCheck called to check for a 4-in-a-row win
    And board.currentPlayer be set to integer 1 or 2 whichever is the next player in turn
    And function game.tellTurn be called with board.currentPlayer as argument
    And board.playInProgress property be set to true
    And makeMove return true

  Scenario: A player makes a invalid move
    Given board.playInProgress property is false
    When there are no free positions available in selected column for more game pieces
    Then board.playInProgress property should be set to false
    And makeMove return false


