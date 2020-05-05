Feature: Two player game
  We want the GUI to show which players turn it is

  Scenario: Showing player 1 is next
    Given tellTurn method is called after move by second player 2 or on game start
    And and was passed player argument "number" value of 1 to show first player is next
    Then the content of html div element with css class .message should be changed to first player 1's entered name + "s tur..."

  Scenario: Showing player 2 is next
    Given tellTurn method is called after move by first player 1
    And and was passed player argument "number" value of 2 to show second player is next
    Then the content of html div element with css class .message should be changed to second player 2's entered name + "s tur..."

  Scenario: Wrong player value is passed to tellTurn by Board class
    When tellTurn method is called and passed a value which is not a "number" of 1 or 2
    Then tellTurn method should throw error "player must be 1 or 2"