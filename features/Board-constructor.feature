Feature: Create a new Board
  We want to start a new game with empty Board

  Scenario: Beginning a new Game with empty Board
    When a new Board is created
    Then game should be an instance of Game
    And if game is not an instance of Game, it should throw error "game must be an instance of Game"
    And all Board positions should have a value of 0
    And currentPlayer set to 1
    And playInProgress set to false
    And call method addEventListener
    And call method render
    And call method tellTurn from game with argument currentPlayer