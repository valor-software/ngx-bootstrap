import { RatingPo } from '../support/rating.po';

describe('Rating demo page testing suite', () => {
  const rating = new RatingPo();

  beforeEach(() => rating.navigateTo());

  describe('Dynamic rating', () => {
    const dynamic = rating.exampleDemosArr.dynamic;

    beforeEach(() => rating.scrollToMenu('Dynamic rating'));

    it(`example contains rating with 10 stars and card with "Rate: N, Readonly is: false;  Hovering over: none" text
    user see 2 buttons "Clear" and "Toggle Readonly", first N stars - selected and 10-N not selected`, () => {
      rating.isRatingVisible(dynamic, 0);
      rating.isRatingMaxEqual(dynamic, 10, 0);
      rating.isRatingCurrentEqual(dynamic, 7, 0);
      rating.isPreviewExist(dynamic, 'Rate: 7;  Readonly is: false;  Hovering over: none', 0);
      rating.isBtnTxtEqual(dynamic, 'Clear\n', 0);
      rating.isBtnTxtEqual(dynamic, 'Toggle Readonly\n', 1);
    });

    it(`when user move mouse to any other star, then text in card changed,
    when user clicks on any star (different from selected), then card info updated with this new number`, () => {
      rating.mouseMoveToRatingIcon(dynamic, 9);
      rating.isPreviewExist(dynamic, 'Rate: 7;  Readonly is: false;  Hovering over: 9', 0);
      rating.mouseMoveToRatingIcon(dynamic, 2);
      rating.isPreviewExist(dynamic, 'Rate: 7;  Readonly is: false;  Hovering over: 2', 0);
      rating.addRatingMark(dynamic, 0, 5);
      rating.mouseMoveToRatingIcon(dynamic, 2);
      rating.isPreviewExist(dynamic, 'Rate: 5;  Readonly is: false;  Hovering over: 2', 0);
      rating.addRatingMark(dynamic, 0, 1);
      rating.mouseMoveToRatingIcon(dynamic, 2);
      rating.isPreviewExist(dynamic, 'Rate: 1;  Readonly is: false;  Hovering over: 2', 0);
    });

    it(`when user clicks "Clear", then all stars become unselected, text: "Rate: 0;  Readonly is: false;
    Hovering over: none", when user clicks on any star, then rating and card text updated again`, () => {
      rating.mouseMoveToRatingIcon(dynamic, 9);
      rating.isPreviewExist(dynamic, 'Rate: 7;  Readonly is: false;  Hovering over: 9', 0);
      rating.addRatingMark(dynamic, 0, 5);
      rating.isPreviewExist(dynamic, 'Rate: 5', 0);
      rating.mouseMove(`${dynamic} button`, 0);
      rating.clickOnBtn(dynamic, 0);
      rating.isPreviewExist(dynamic, 'Rate: 0;  Readonly is: false', 0);
      rating.isRatingCurrentEqual(dynamic, 0);
      rating.addRatingMark(dynamic, 0, 2);
      rating.isPreviewExist(dynamic, 'Rate: 2;  Readonly is: false', 0);
    });

    it(`when user clicks on "Toggle Readonly", then text contain "Readonly is: true", button "Clear" became unclickable
    when user clicks on any star in the rating, nothing happens`, () => {
      rating.clickOnBtn(dynamic, 0);
      rating.isPreviewExist(dynamic, 'Rate: 0;  Readonly is: false;  Hovering over: none', 0);
      rating.clickOnBtn(dynamic, 1);
      rating.isPreviewExist(dynamic, 'Readonly is: true', 0);
      rating.isBtnDisabled(dynamic, true, 0);
      rating.addRatingMark(dynamic, 0, 5);
      rating.isPreviewExist(dynamic, 'Rate: 0;  Readonly is: true;  Hovering over: none', 0);
    });

    it(`when user clicks on "Toggle Readonly" again, then "Clear" became clickable, text became "Readonly is: false",
    when user clicks on any star, then rating and card text updated again`, () => {
      rating.clickOnBtn(dynamic, 1);
      rating.clickOnBtn(dynamic, 1);
      rating.isBtnDisabled(dynamic, false, 0);
      rating.isPreviewExist(dynamic, 'Readonly is: false', 0);
      rating.addRatingMark(dynamic, 0, 5);
      rating.isRatingCurrentEqual(dynamic, 5);
      rating.isPreviewExist(dynamic, 'Rate: 5;  Readonly is: false;  Hovering over: 5', 0);
    });
  });

  describe('Custom icons', () => {
    const customIcons = rating.exampleDemosArr.customIcons;

    beforeEach(() => rating.scrollToMenu('Custom icons'));

    it(`example contains 2 ratings, 1st view should be with 10 squares and amount should be in text near: "(Rate: N)",
    2d rating view should be with 10 stars and amount selected stars should be in text near rating "(Rate: N)"`, () => {
      rating.isRatingVisible(customIcons, 0);
      rating.isRatingVisible(customIcons, 1);
      rating.isRatingMaxEqual(customIcons, 10, 0);
      rating.isRatingMaxEqual(customIcons, 10, 1);
      rating.isRatingCurrentEqual(customIcons, 5, 0);
      rating.isRatingCurrentEqual(customIcons, 2, 1);
      rating.isPreviewExist(customIcons, 'Rate: 5', 0);
      rating.isPreviewExist(customIcons, 'Rate: 2', 1);
    });

    it(`when user change mark to bigger in each rating, then rating updated and text near it - also`, () => {
      rating.addRatingMark(customIcons, 0, 8);
      rating.addRatingMark(customIcons, 1, 9);
      rating.isRatingCurrentEqual(customIcons, 8, 0);
      rating.isRatingCurrentEqual(customIcons, 9, 1);
      rating.isPreviewExist(customIcons, 'Rate: 8', 0);
      rating.isPreviewExist(customIcons, 'Rate: 9', 1);
    });

    it(`when user change mark to lesser in each rating, then rating updated and text near it - also`, () => {
      rating.addRatingMark(customIcons, 0, 3);
      rating.addRatingMark(customIcons, 1, 1);
      rating.isRatingCurrentEqual(customIcons, 3, 0);
      rating.isRatingCurrentEqual(customIcons, 1, 1);
      rating.isPreviewExist(customIcons, 'Rate: 3', 0);
      rating.isPreviewExist(customIcons, 'Rate: 1', 1);
    });
  });

  describe('Select on enter', () => {
    const selectOnEnter = rating.exampleDemosArr.selectOnEnter;

    beforeEach(() => rating.scrollToMenu('Select on enter'));

    it(`example contains rating card with info "Rating: N;  Readonly is: false;",
    clickable button "Reset rating and status"`, () => {
      rating.isRatingVisible(selectOnEnter);
      rating.isRatingMaxEqual(selectOnEnter, 10);
      rating.isRatingCurrentEqual(selectOnEnter, 7);
      rating.isPreviewExist(selectOnEnter, 'Rating: 7;  Readonly is: false;');
      rating.isBtnTxtEqual(selectOnEnter, 'Reset rating and status');
    });

    it(`when user change the mark, then rating changed with appropriate info in the card`, () => {
      rating.addRatingMark(selectOnEnter, 0, 9);
      rating.isRatingCurrentEqual(selectOnEnter, 9);
      rating.isPreviewExist(selectOnEnter, 'Rating: 9');
    });

    it(`when user focus on the rating, then after press "right arrow" on the keyboard, rating value increased at 1
    when user press "left arrow" on the keyboard, rating value decreased at 1`, () => {
      rating.focusOnRating(selectOnEnter);
      rating.pressKeyboardBtn(selectOnEnter, 'leftarrow');
      rating.isPreviewExist(selectOnEnter, 'Rating: 6');
      rating.pressKeyboardBtn(selectOnEnter, 'leftarrow');
      rating.isPreviewExist(selectOnEnter, 'Rating: 5');
      rating.pressKeyboardBtn(selectOnEnter, 'leftarrow');
      rating.isPreviewExist(selectOnEnter, 'Rating: 4');
      rating.pressKeyboardBtn(selectOnEnter, 'rightarrow');
      rating.isPreviewExist(selectOnEnter, 'Rating: 5');
      rating.pressKeyboardBtn(selectOnEnter, 'rightarrow');
      rating.pressKeyboardBtn(selectOnEnter, 'rightarrow');
      rating.pressKeyboardBtn(selectOnEnter, 'rightarrow');
      rating.isPreviewExist(selectOnEnter, 'Rating: 8;  Readonly is: false;');
    });

    it(`when user press "Enter" on the keyboard, then rating saved this state and card info updated with
    "Rating: N;  Readonly is: true;", after click on any item - nothing happens`, () => {
      rating.focusOnRating(selectOnEnter);
      rating.pressKeyboardBtn(selectOnEnter, 'leftarrow');
      rating.pressKeyboardBtn(selectOnEnter, 'enter');
      rating.isRatingCurrentEqual(selectOnEnter, 6);
      rating.isPreviewExist(selectOnEnter, 'Rating: 6;  Readonly is: true;');
      rating.addRatingMark(selectOnEnter, 0, 2);
      rating.isRatingCurrentEqual(selectOnEnter, 6);
      rating.isPreviewExist(selectOnEnter, 'Rating: 6;  Readonly is: true;');
    });

    it(`when user clicks on "Reset rating and status", then all stars become unselected, text become
    "Rating: 0;  Readonly is: false;", when user change the mark, then rating changed with appropriate info`, () => {
      rating.focusOnRating(selectOnEnter);
      rating.pressKeyboardBtn(selectOnEnter, 'leftarrow');
      rating.pressKeyboardBtn(selectOnEnter, 'enter');
      rating.isRatingCurrentEqual(selectOnEnter, 6);
      rating.clickOnBtn(selectOnEnter, 0);
      rating.isRatingCurrentEqual(selectOnEnter, 0);
      rating.isPreviewExist(selectOnEnter, 'Rating: 0;  Readonly is: false;');
      rating.addRatingMark(selectOnEnter, 0, 2);
      rating.isRatingCurrentEqual(selectOnEnter, 2);
      rating.isPreviewExist(selectOnEnter, 'Rating: 2;  Readonly is: false;');
    });
  });
});
