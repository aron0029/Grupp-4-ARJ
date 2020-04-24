Feature: 4-in-a-row graphical user interface
  The game should display and update game board graphics in the webbrowser

  Background: Preconditions for rendering the game board are met
    Given that a html div element with class .board exists when board render method is called

  Scenario: Running the game should draw an empty game board
    Given that this html div element with class .board is empty
    Then 42 html div elements should be added as children of that html div element each with a html div element child of their own

  Scenario: Game should update GUI when a valid move has been made by red player 1
    Given that board render method was called after a move was made
    When board currentPlayer property value was 1
    Then class red should be added to one of the 42 html div elements corresponding to player move in property board matrix array
    And all previous player moves should remain visible on game board and correspond to values in property board matrix array

  Scenario: Game should update GUI when a valid move has been made by yellow player 2
    Given that board render method was called after a move was made
    When board currentPlayer property value was 2
    Then class yellow should be added to one of the 42 html div elements corresponding to player move in property board matrix array
    And all previous player moves should remain visible on game board and correspond to values in property board matrix array