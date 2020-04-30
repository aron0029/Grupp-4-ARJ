Feature: Game is over
  Game is over and should ignore clicks on game board

  Scenario: When game ha ended and board eventlistener is no longer needed
    Given that board makeMove called board removeEventListener method
    Then board removeEventListener should remove eventlistener from div html element with class .board

Scenario: 2 When game ha ended and eventlistener is no longer needed
Given the game is over and makeMove called board removeEventListener method
Then  method will use command  help method  $ to get the right  element in the DOM