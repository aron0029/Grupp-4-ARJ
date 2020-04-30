Feature: 4-in-a-row game graphical user interface
  The game should display and update game board graphics in the webbrowser

  Scenario: Running the game should draw an empty game board
    Given that board render method is called by board constructor when running the game
    And that html div element with class .board exists when board render method is called when running the game
    Then 42 html div elements should be added as children of that html div element each with a html div element child of their own

  Scenario: Game should update GUI when valid move is made by red player 1
    Given that html div element with class .board exists when board render method is called when red player 1 makes a move
    And that board render method was called after move was made by red player
    When board currentPlayer property value was 1 on move by red player
    Then class .red should be added to one of the 42 html div elements corresponding to last player move
    And all previous moves should remain visible including red player 1's and correspond to values in property board matrix array

  Scenario: Game should update GUI when valid move is made by yellow player 2
    Given that html div element with class .board exists when board render method is called when yellow player 2 makes a move
    And that board render method was called after move was made by yellow player
    When board currentPlayer property value was 2 on move by yellow player
    Then class .yellow should be added to one of the 42 html div elements corresponding to last player move
    And all previous moves should remain visible including yellow player 2's and correspond to values in property board matrix array
