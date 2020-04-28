Feature: Showing a winning combination on game board
  If a player wins by achieving 4-in-a-row the game should highlight these four game pieces

  Scenario: The game was won by a player
    Given a player wins the game
    And board makeMove method called board markWin method
    Then the argument passed by makeMove method should be a type "array" with a length of 4
    And each of the 4 elements of this array should be a type "array" with 2 elements each containing type "numbers"
    And first of these 2 elements be set to a value between 0 to 6 and the second element be set to a value of 0 to 7
    Then markWin should add the class .win to html div elements that correspond to the winning rows position in board matrix

  Scenario: The game was a draw
    Given the board is full without any player winning
    Then markWin should not be called
