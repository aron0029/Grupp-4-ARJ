Feature: Play Connect 4
  As a poor Connect 4 player
  I want to play the game on my screen with my friends
  So that I don't need to buy it.

  # Some random scenarios (out of the many needed)
  # (these have no When - but there will be plenty that have)

  Scenario: A new Game creates a new board
    Given that a new Game is created
    Then it should create a new Board

  Scenario: A board adds 42 divs to the .board element
    Given that a new Board is created
    Then it should render 42 divs as children of the board element


  # Rikard Klassen Game constructor()

  Scenario: Running the game
    Given that starting the game creates a new instance of Game without error
    And that Game creates a new instance of Board without error
    And that Game successfully adds an eventlistener for play again button element
    Then the GUI message of the game should present the following message: "Röds tur..."


  # Rikard Klassen Game tellTurn()

  Scenario: Red player made a move
    Given that red player has made his move
    And that this move did not win the game
    And that there still are empty positions on the game Board
    Then the game should present the following message: "Guls tur..."

  Scenario: Yellow player made a move
    Given that yellow player has made his move
    And that this move did not win the game
    And that there still are empty positions on the game Board
    Then the game should present the following message: "Guls tur..."


  # Rikard Klassen Board contructor()

  Scenario: Beginning a new Game with empty Board
    When a new Board is created
    Then the Board should be empty
    And all Board positions should have a value of 0

  Scenario: Creating a new instance of Game
    Given that a new Board of type Board is passed to Game
    When a new Game is created
    Then the value of Game input argument game should be set to that Board
    And the value of Game property matrix be set to an array consisting of 6 elements
    And Game tellTurn() be called using currentPlayer property with value 1 as input argument
    And the value of Game property playInProgress set to false

  # Johnny metod winCheck()

  Scenario: Check the whole board if anyone won
    When someone has won
    Then method should return an object
    And the object should have property "winner" with value 1 or 2 (player)
    And the object should have property "combo" with an array of 4 arrays where every inner array have the board position (row number, column number)

  Scenario: Check the whole board if the game has been draw
    When no one has won
    Then method should return an object
    And the object should have property "winner" with value "draw" as a string.

  Scenario: If no one has won or draw
    When no one has won or draw
    Then method should return value false




