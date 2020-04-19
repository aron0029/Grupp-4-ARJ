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


