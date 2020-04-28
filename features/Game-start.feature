Feature: Start a new game of Connect four
  We want to start a new Game

  Scenario: Starting a new game
    When method start() is called
    Then it should create an instance of Board
    And send current instance of Game to Boards constructor
    And save the instance in property "board".