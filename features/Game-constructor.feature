Feature: Running the game
  The game should run when started

  Scenario: Before a game start, user inputs two names
    When starting a new Game
    Then a prompt should appear to input two names
    And save the names in property playerNames
    And the property should have 2 elements
    And in each element with a players name

  Scenario: Starting the game by creating a new instance of game
    Given that the game is started by creating a new instance of Game
    Then  game property board should be set to a new instance of Board by calling game start method
    And game addEventListener method should be called
    And game tellTurn method should be called by board with board currentPlayer value 1 as argument