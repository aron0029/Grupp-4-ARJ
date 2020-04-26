Feature: Checking if game is over
  Playing connect four, we like to check if the game is over

  Scenario: Check if argument "won" is valid
    When over(won) is called
    Then check if argument won's value is "draw", 1 or 2. If not, cast error 'won must be "draw", 1 or 2'

  Scenario: Check if argument "won" is draw
    When over(won) is called
    Then check if argument won is "draw"
    And check if css class "message" innerHTML is 'Det blev oavgjort!'

  Scenario: Check if argument "won" is 1
    When over(won) is called
    Then check if argument won is 1
    And check if css class "message" innerHTML is 'Röd vann!'

  Scenario: Check if argument "won" is 2
    When over(won) is called
    Then check if argument won is 2
    And check if css class "message" innerHTML is 'Gul vann!'

  Scenario: Play again when game is over
    When the game is over
    Then a button-element should appear in the css class 'message' innerHTML.
    And the button should have a css class named 'again'
    And with a text 'Spela igen'