Feature: Making a move in the game
  We want to enable players to make a move in the game

  Background: An eventlistener catches click on a game board column
    Given board addEventListener was called
    And board playInProgress property is initially false

  Scenario: A player makes a valid move
    Then board makeMove should call render 6 times for any selected column on empty game board
    And board matrix property array values should end up corresponding to previous board matrix values including last player move
    And board winCheck be called to check for a 4-in-a-row win
    And board currentPlayer be set to number 1 or 2 whichever is the next player in turn
    And function game tellTurn be called with board currentPlayer as argument
    And board makeMove should return true

  Scenario: A player makes a invalid move
    When there are no free positions available in selected column for more game pieces
    Then board makeMove should return false