  Scenario: A player makes a valid move
    Given that an eventlistener was added to the html element with class board
    And that this eventlistener calls function makeMove during click event on that html element
    And that this eventlistener function call passes a variable of type integer between 0 and 6 as argument to makeMove
    When board.playInProgress property is false
    Then makeMove should animate current players game piece through free positions in selected column until no more free position is available
    And board.matrix property array values should be set corresponding to previous board.matrix values including the latest player move
    And board.playInProgress property be set to true
    And makeMove return true

  Scenario: A player makes a invalid move
    Given that an eventlistener was added to the html element with class board
    And that this eventlistener calls function makeMove during click event on that html element
    And that this eventlistener function call passes a variable of type integer between 0 and 6 as argument to makeMove
    When board.playInProgress property is false
    And ... is full


