Feature: Tell which player's turn
  We want to tell which player's turn it is now on the DOM

  Scenario: Telling which player's turn
    When tellTurn method is called
    Then argument "player" should be either 1 or 2
    And if "player" is not 1 or 2, it should throw error "player must be 1 or 2"
    And in DOM element with css class 'message' change innerHTML content to "Röds tur..." if player is 1
    And change innerHTML content to "Guls tur..." if player is 2