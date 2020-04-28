Feature: Game is over
  Game is over and should ignore clicks on game board

  Scenario: When game ha ended and board eventlistener is no longer needed
    Given that board makeMove called board removeEventListener method
    Then board removeEventListener should remove eventlistener from div html element with class .board

