Feature: Start a new game of Connect four
  We want to start a new Game

  Scenario: Starting a new game

    Given that the method start() is called
    Then it should create an instance of Board
    And pass current instance of Game to Boards constructor
    And save the instance in property "board"