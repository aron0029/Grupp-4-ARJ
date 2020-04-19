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