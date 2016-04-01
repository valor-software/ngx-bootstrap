<a name="1.0.10"></a>
## [1.0.10](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.9...v1.0.10) (2016-04-01)


### Features

* **package:** angular2 version updated to beta.13 ([91e4ad1](https://github.com/valor-software/ng2-bootstrap/commit/91e4ad1))



<a name="1.0.9"></a>
## [1.0.9](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.8...v1.0.9) (2016-03-31)


### Bug Fixes

* **collapse:** animate is not available for system.js ([b28fd5d](https://github.com/valor-software/ng2-bootstrap/commit/b28fd5d))



<a name="1.0.8"></a>
## [1.0.8](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.7...v1.0.8) (2016-03-30)


### Bug Fixes

* use synchronous event emitters as a workaround for dehydrated detector issues (s ([9c9f290](https://github.com/valor-software/ng2-bootstrap/commit/9c9f290))
* **build:** reduce typings pain ([686ef90](https://github.com/valor-software/ng2-bootstrap/commit/686ef90)), closes [#128](https://github.com/valor-software/ng2-bootstrap/issues/128) [#322](https://github.com/valor-software/ng2-bootstrap/issues/322)
* **carousel:** Fix Typescript 7030 error ([128db51](https://github.com/valor-software/ng2-bootstrap/commit/128db51))
* **demo:** including es6-shim and es6-promise (fixes #194) ([80b73b4](https://github.com/valor-software/ng2-bootstrap/commit/80b73b4)), closes [#194](https://github.com/valor-software/ng2-bootstrap/issues/194)
* **dropdowns:** dropdown should close correctly when used in modals (fixes #267, fixes #221) ([a7a02ff](https://github.com/valor-software/ng2-bootstrap/commit/a7a02ff)), closes [#267](https://github.com/valor-software/ng2-bootstrap/issues/267) [#221](https://github.com/valor-software/ng2-bootstrap/issues/221)
* **ie9,10:** usage of [hidden] replaced with *ngIf (fixes #238) ([260e963](https://github.com/valor-software/ng2-bootstrap/commit/260e963)), closes [#238](https://github.com/valor-software/ng2-bootstrap/issues/238)
* **tooltip:** fix tooltip after upgrade to angular2 2.0.0-beta.12 ([87a57f5](https://github.com/valor-software/ng2-bootstrap/commit/87a57f5))
* **tooltip:** updated for beta.12 (fixes #296, closes #332) ([413c2f1](https://github.com/valor-software/ng2-bootstrap/commit/413c2f1)), closes [#296](https://github.com/valor-software/ng2-bootstrap/issues/296) [#332](https://github.com/valor-software/ng2-bootstrap/issues/332)
* **typeahead:** Fixed potential error if value of typeahead is undefined. Fixes #345 ([aeb2bc1](https://github.com/valor-software/ng2-bootstrap/commit/aeb2bc1)), closes [#345](https://github.com/valor-software/ng2-bootstrap/issues/345)
* **typeahead:** Hide typeahead popup on blur. Fixes #351 ([9c6f257](https://github.com/valor-software/ng2-bootstrap/commit/9c6f257)), closes [#351](https://github.com/valor-software/ng2-bootstrap/issues/351)

### Features

* **collapse:** added animation, toggle\hide\show methods made public (closes #348, fixes #287) ([2625b29](https://github.com/valor-software/ng2-bootstrap/commit/2625b29)), closes [#348](https://github.com/valor-software/ng2-bootstrap/issues/348) [#287](https://github.com/valor-software/ng2-bootstrap/issues/287)
* **datepicker:** Added functionality to add a custom class to specific dates. Supports empty cust ([0f6389f](https://github.com/valor-software/ng2-bootstrap/commit/0f6389f))
* **package:** angular2 version updated to 2.0.0-beta.12 ([15c866f](https://github.com/valor-software/ng2-bootstrap/commit/15c866f))



<a name="1.0.7"></a>
## [1.0.7](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.6...v1.0.7) (2016-03-16)


### Bug Fixes

* **demo:** fix demo layout ([227ef4e](https://github.com/valor-software/ng2-bootstrap/commit/227ef4e))
* **progress:** progress bar now works with ng2 ([f970433](https://github.com/valor-software/ng2-bootstrap/commit/f970433))

### Features

* **pagination:** use inner html for pagination button text ([66cc008](https://github.com/valor-software/ng2-bootstrap/commit/66cc008))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.5...v1.0.6) (2016-03-09)


### Bug Fixes

* **datepicker-inner:** When changing view on datepicker, and going left and right, selected date ([97c8735](https://github.com/valor-software/ng2-bootstrap/commit/97c8735))
* **tooltip:** fix positioning of tooltip container ([5697574](https://github.com/valor-software/ng2-bootstrap/commit/5697574))

### Features

* **datepicker:** Added an attribute onlyCurrentMonth which if true will not show dates from previ ([529af20](https://github.com/valor-software/ng2-bootstrap/commit/529af20))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/valor-software/ng2-bootstrap/compare/1.0.4...v1.0.5) (2016-02-24)


### Bug Fixes

* **datepicker:** setting default value for SHOW_WEEKS ([aa09451](https://github.com/valor-software/ng2-bootstrap/commit/aa09451))
* **daypicker:** text center align in bootstrap 4 ([dfd502f](https://github.com/valor-software/ng2-bootstrap/commit/dfd502f))
* **tabs:** destroy cycle, closes #180 ([ae8c617](https://github.com/valor-software/ng2-bootstrap/commit/ae8c617)), closes [#180](https://github.com/valor-software/ng2-bootstrap/issues/180)



<a name="1.0.4"></a>
## [1.0.4](https://github.com/valor-software/ng2-bootstrap/compare/1.0.1-beta.2...v1.0.4) (2016-02-24)


### Bug Fixes

* **build:** fix npm start command, fixes #113 ([217fe3a](https://github.com/valor-software/ng2-bootstrap/commit/217fe3a)), closes [#113](https://github.com/valor-software/ng2-bootstrap/issues/113)
* **build:** rollback compression plugin version to 0.2, fixes #103 ([3d59e2d](https://github.com/valor-software/ng2-bootstrap/commit/3d59e2d)), closes [#103](https://github.com/valor-software/ng2-bootstrap/issues/103)
* "outsideClick" still closed the dropdown on any click ([6348f72](https://github.com/valor-software/ng2-bootstrap/commit/6348f72)), closes [#124](https://github.com/valor-software/ng2-bootstrap/issues/124)
* **build:** updated to use ts 1.8.2, fixes #116 ([206770b](https://github.com/valor-software/ng2-bootstrap/commit/206770b)), closes [#116](https://github.com/valor-software/ng2-bootstrap/issues/116)
* **datepicker:** setting default value for SHOW_WEEKS ([f0079ad](https://github.com/valor-software/ng2-bootstrap/commit/f0079ad))
* **datepicker:** upgrade to beta 1, issue #38 ([b1a5507](https://github.com/valor-software/ng2-bootstrap/commit/b1a5507))
* **export:** all the correct directives are now properly exported ([b00a30b](https://github.com/valor-software/ng2-bootstrap/commit/b00a30b))
* **pager:** multiple times defined event numPages, fixes #111, closes #112 ([780eebd](https://github.com/valor-software/ng2-bootstrap/commit/780eebd)), closes [#111](https://github.com/valor-software/ng2-bootstrap/issues/111) [#112](https://github.com/valor-software/ng2-bootstrap/issues/112)
* **pagination:** multiple triggering of pageChanged event, fix #76, fix #138, closes #146 ([91c4ec4](https://github.com/valor-software/ng2-bootstrap/commit/91c4ec4)), closes [#76](https://github.com/valor-software/ng2-bootstrap/issues/76) [#138](https://github.com/valor-software/ng2-bootstrap/issues/138) [#146](https://github.com/valor-software/ng2-bootstrap/issues/146)

### Features

* allow two-way binding on `isOpen` ([674fcb7](https://github.com/valor-software/ng2-bootstrap/commit/674fcb7))
* **build:** update to use ng2 beta7 & use ts typings, fixes #212 ([31e6300](https://github.com/valor-software/ng2-bootstrap/commit/31e6300)), closes [#212](https://github.com/valor-software/ng2-bootstrap/issues/212)
* **datepicker:** datepicker fixed for 0-beta.2, closes #120, fixes #38 ([a3d9e1c](https://github.com/valor-software/ng2-bootstrap/commit/a3d9e1c)), closes [#120](https://github.com/valor-software/ng2-bootstrap/issues/120) [#38](https://github.com/valor-software/ng2-bootstrap/issues/38)
* **dropdown:** implement "nonInput" auto-close mode ([94d9909](https://github.com/valor-software/ng2-bootstrap/commit/94d9909))
* **tabs:** removable tabs ([c465610](https://github.com/valor-software/ng2-bootstrap/commit/c465610))



