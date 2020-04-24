Feature: Making a move in the game
  We want to enable players to make a move in the game

  Background: An eventlistener catches click on a game board column
    Given board addEventListener method was called
    And board playInProgress property is initially false

  Scenario: A player makes a valid move
    Then board makeMove method should call render 6 times for any selected column on empty game board
    And board matrix property array values should end up corresponding to previous board matrix values including last player move
    And board winCheck method be called to check for a 4-in-a-row win
    And board currentPlayer be set to number 1 or 2 whichever is the next player in turn
    And game tellTurn method be called with board currentPlayer as argument
    And board makeMove method should return true

  Scenario: A player makes a invalid move
    When there are no free positions available in selected column for more game pieces
    Then board makeMove method should return false