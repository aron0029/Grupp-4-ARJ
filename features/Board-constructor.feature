Feature: Create a new Board
  We want to start a new game with empty Board


  # Rikard Klassen Board contructor()

  Scenario: Beginning a new Game with empty Board
    When a new Board is created
    Then the Board should be empty
    And all Board positions should have a value of 0

  Scenario: Creating a new instance of Game
    Given that a new Board of type Board is passed to Game
    When a new Game is created
    Then the value of Game input argument game should be set to that Board
    And the value of Game property matrix be set to an array consisting of 6 x 7 elements each with a value set to 0
    And Game tellTurn() be called using currentPlayer property with value 1 as input argument
    And the value of Game property playInProgress set to false