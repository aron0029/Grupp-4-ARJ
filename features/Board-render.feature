Feature: 4-in-a-row game graphical user interface
  The game should display and update game board graphics in the webbrowser

  Scenario: Running the game should draw an empty game board
    Given that html div element with class .board exists when board render method is called when running the game
    And that this html div element with class .board is empty
    Then 42 html div elements should be added as children of that html div element each with a html div element child of their own

  Scenario: Game should update GUI when valid move is made by red player 1
    Given that html div element with class .board exists when board render method is called when player 1 makes a move
    And that board render method was called after move was made
    When board currentPlayer property value was 1
    Then class .red should be added to one of the 42 html div elements corresponding to last player move
    And all previous player moves should remain visible and correspond to values in property board matrix array

  Scenario: Game should update GUI when valid move is made by yellow player 2
    Given that html div element with class .board exists when board render method is called when player 2 makes a move
    And that board render method was called after move was made
    When board currentPlayer property value was 2
    Then class .yellow should be added to one of the 42 html div elements corresponding to last player move
    And all previous player moves should remain visible and correspond to values in property board matrix array

  # Unfinished
  Scenario: Running the game when html div element with class .board is missing

  # Unfinished
  Scenario: Running the game when child elements of html div element with class .board is missing
