Feature: Rating Demo component
  Description: Primary Actor: User, Scope: Ngx-bootstrap DEMO / BS version 3&4

  Background:
    Given User opens Rating demo page

  Scenario: Rating basic example with click on menu
    When User clicks on "Basic rating" sub-menu
    Then User see rating with "10" stars
    And User see card with "Rate: 7 " text
    And First "7" stars should be selected
    And "3" stars not selected

  Scenario: Rating basic example with scroll to  menu
    When User scrolls to "Basic rating" sub-menu
    Then User see rating with "10" stars
    And User see card with "Rate: 7 " text
    And First "7" stars should be selected
    And "3" stars not selected
