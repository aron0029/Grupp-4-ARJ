Feature: Checking if game is over
  Playing connect four, we like to check if the game is over

  Scenario: Check if argument "won" is valid
    When over(won) is called
    Then check if argument won's value is "draw", 1 or 2. If not, cast error "won must be 'draw', 1 or 2"

  Scenario: Check if argument "won" is draw
    When over(won) is called when draw
    Then check if argument won is "draw"
    And check if css class "message" innerHTML is "Det blev oavgjort!" when draw

  Scenario: Check if argument "won" is 1
    When over(won) is called when player one won
    Then check if argument won is 1 when Player one won
    And check if css class "message" innerHTML is Player 1's name + " vann!" when Player one won

  Scenario: Check if argument "won" is 2
    When over(won) is called when player two won
    Then check if argument won is 2 when Player two won
    And check if css class "message" innerHTML is Player 2's name + " vann!" when Player two won

  Scenario: Play again when game is over
    When the game is over
    Then a button-element should appear in the css class "message" innerHTML.
    And the button should have a css class named "again"
    And with a text "Spela igen"