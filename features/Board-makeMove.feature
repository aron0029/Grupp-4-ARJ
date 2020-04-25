Feature: Making a move in the game
  We want to enable players to make a move in the game

  Scenario: A player makes a valid move
    Given board playInProgress property is initially false upon valid move
    Then board playInProgress property should be set to true
    And board makeMove method should call render 6 times for any empty column on game board
    And board matrix property array values should end up corresponding to previous board matrix values including any player moves
    And board winCheck method be called to check for a 4-in-a-row win
    And board currentPlayer property be set to number 1 or 2 whichever is the next player in turn
    And game tellTurn method be called with board currentPlayer as argument
    And board makeMove method should return true
    And board playInProgress property end up being set to false when board makeMove has finished move

  Scenario: A player makes an invalid move
    Given board playInProgress property is initially false upon invalid move
    When there are no free positions available in a column for more game pieces
    Then board makeMove method should return false
    And board playInProgress property end up being set to false when board makeMove has skipped move