  # Rikard Klassen Game constructor()

  Scenario: Running the game
    Given that starting the game creates a new instance of Game without error
    And that Game creates a new instance of Board without error
    And that Game successfully adds an eventlistener for play again button element
    Then the GUI message of the game should present the following message: "Röds tur..."
