<a name="1.1.16-3"></a>
## [1.1.16-3](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.16...v1.1.16-3) (2016-11-28)


### Bug Fixes

* **ci:** karma test should work in travis now ([3d61d48](https://github.com/valor-software/ng2-bootstrap/commit/3d61d48))
* **ci:** let the karma pass ([29615f4](https://github.com/valor-software/ng2-bootstrap/commit/29615f4))
* **pager:** fix aot compilation ([#1232](https://github.com/valor-software/ng2-bootstrap/issues/1232)) ([fd93f7b](https://github.com/valor-software/ng2-bootstrap/commit/fd93f7b))


### Features

* **access:** private access specifiers replaced by protected ([#1186](https://github.com/valor-software/ng2-bootstrap/issues/1186)) ([0d4e93b](https://github.com/valor-software/ng2-bootstrap/commit/0d4e93b))
* **bs4:** updated to alfa 5 Class name changes ([#1201](https://github.com/valor-software/ng2-bootstrap/issues/1201)) ([49197f0](https://github.com/valor-software/ng2-bootstrap/commit/49197f0))
* **build:** ng test now working, applied workaroud >.< ([8eea379](https://github.com/valor-software/ng2-bootstrap/commit/8eea379))
* **datepicker:** disable datepicker dates based on dateDisabled property ([#799](https://github.com/valor-software/ng2-bootstrap/issues/799)) ([#1130](https://github.com/valor-software/ng2-bootstrap/issues/1130)) ([83452e1](https://github.com/valor-software/ng2-bootstrap/commit/83452e1))
* **package:** ng2 and moment version bump ([333b876](https://github.com/valor-software/ng2-bootstrap/commit/333b876))



<a name="1.1.16-2"></a>
## [1.1.16-2](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.16...v1.1.16-2) (2016-11-28)


### Bug Fixes

* **ci:** karma test should work in travis now ([3d61d48](https://github.com/valor-software/ng2-bootstrap/commit/3d61d48))
* **ci:** let the karma pass ([29615f4](https://github.com/valor-software/ng2-bootstrap/commit/29615f4))
* **pager:** fix aot compilation ([#1232](https://github.com/valor-software/ng2-bootstrap/issues/1232)) ([fd93f7b](https://github.com/valor-software/ng2-bootstrap/commit/fd93f7b))


### Features

* **access:** private access specifiers replaced by protected ([#1186](https://github.com/valor-software/ng2-bootstrap/issues/1186)) ([0d4e93b](https://github.com/valor-software/ng2-bootstrap/commit/0d4e93b))
* **bs4:** updated to alfa 5 Class name changes ([#1201](https://github.com/valor-software/ng2-bootstrap/issues/1201)) ([49197f0](https://github.com/valor-software/ng2-bootstrap/commit/49197f0))
* **build:** ng test now working, applied workaroud >.< ([8eea379](https://github.com/valor-software/ng2-bootstrap/commit/8eea379))
* **datepicker:** disable datepicker dates based on dateDisabled property ([#799](https://github.com/valor-software/ng2-bootstrap/issues/799)) ([#1130](https://github.com/valor-software/ng2-bootstrap/issues/1130)) ([83452e1](https://github.com/valor-software/ng2-bootstrap/commit/83452e1))
* **package:** ng2 and moment version bump ([333b876](https://github.com/valor-software/ng2-bootstrap/commit/333b876))



<a name="1.1.16"></a>
## [1.1.16](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.23...v1.1.16) (2016-10-26)


### Bug Fixes

* **aot:** 2 more private methods made public ([0dbbf09](https://github.com/valor-software/ng2-bootstrap/commit/0dbbf09)), closes [#1093](https://github.com/valor-software/ng2-bootstrap/issues/1093)
* **build:** All `[@HostBinding](https://github.com/HostBinding)` and `[@HostListener](https://github.com/HostListener)` should be public ([#1086](https://github.com/valor-software/ng2-bootstrap/issues/1086)) ([3691757](https://github.com/valor-software/ng2-bootstrap/commit/3691757)), closes [#1080](https://github.com/valor-software/ng2-bootstrap/issues/1080)
* **build:** change properties privacy to use in factories ([19c0c61](https://github.com/valor-software/ng2-bootstrap/commit/19c0c61))
* **build:** export all internal classes so AoT can work without issues ([6e6be1a](https://github.com/valor-software/ng2-bootstrap/commit/6e6be1a)), closes [#1093](https://github.com/valor-software/ng2-bootstrap/issues/1093)
* **build:** restore coverage reports ([#755](https://github.com/valor-software/ng2-bootstrap/issues/755)) ([26191eb](https://github.com/valor-software/ng2-bootstrap/commit/26191eb))
* **buttons:** all [@Input](https://github.com/Input)() fields should be public ([c96ffd3](https://github.com/valor-software/ng2-bootstrap/commit/c96ffd3))
* **ci:** upload test coverage report to codecov ([#756](https://github.com/valor-software/ng2-bootstrap/issues/756)) ([4358773](https://github.com/valor-software/ng2-bootstrap/commit/4358773))
* **datepicker:** changing the date programatically selects the correct date ([#1041](https://github.com/valor-software/ng2-bootstrap/issues/1041)) ([fb6d532](https://github.com/valor-software/ng2-bootstrap/commit/fb6d532)), closes [#858](https://github.com/valor-software/ng2-bootstrap/issues/858)
* **datepicker:** do not emit selection done on ngModel changes ([7b24283](https://github.com/valor-software/ng2-bootstrap/commit/7b24283)), closes [#1095](https://github.com/valor-software/ng2-bootstrap/issues/1095)
* **datepicker:** fixed broken bindings for aria-labelby and ids ([#1055](https://github.com/valor-software/ng2-bootstrap/issues/1055)) ([26d9209](https://github.com/valor-software/ng2-bootstrap/commit/26d9209))
* **datepicker:** Fixing Colspan ([#1057](https://github.com/valor-software/ng2-bootstrap/issues/1057)) ([e71a8ae](https://github.com/valor-software/ng2-bootstrap/commit/e71a8ae))
* **datepicker:** imlement ReactiveForms setDisabledState for TimepickerComponent ([cd58c3b](https://github.com/valor-software/ng2-bootstrap/commit/cd58c3b)), closes [#1024](https://github.com/valor-software/ng2-bootstrap/issues/1024)
* **datepicker:** remove unused code ([#837](https://github.com/valor-software/ng2-bootstrap/issues/837)) ([fa22c98](https://github.com/valor-software/ng2-bootstrap/commit/fa22c98))
* **datepicker:** removed popup stub ([d1a7d09](https://github.com/valor-software/ng2-bootstrap/commit/d1a7d09))
* **demo:** fixed accordion demo ([bd4cc96](https://github.com/valor-software/ng2-bootstrap/commit/bd4cc96)), closes [#399](https://github.com/valor-software/ng2-bootstrap/issues/399)
* **demo:** fixed tabs demo ([#1050](https://github.com/valor-software/ng2-bootstrap/issues/1050)) ([969a61a](https://github.com/valor-software/ng2-bootstrap/commit/969a61a))
* **doc:** formatYear instead of formatMear for the datepicker ([#1126](https://github.com/valor-software/ng2-bootstrap/issues/1126)) ([045573b](https://github.com/valor-software/ng2-bootstrap/commit/045573b))
* **dropdown:** toggle does not close when clicking directly on an icon in Chrome ([#851](https://github.com/valor-software/ng2-bootstrap/issues/851)) ([341dcf8](https://github.com/valor-software/ng2-bootstrap/commit/341dcf8)), closes [#658](https://github.com/valor-software/ng2-bootstrap/issues/658)
* **export:** removed obsolete exports to avoid missusage ([6993e97](https://github.com/valor-software/ng2-bootstrap/commit/6993e97))
* **helpers:** add a way to set root view component ref ([79d3335](https://github.com/valor-software/ng2-bootstrap/commit/79d3335)), closes [#1056](https://github.com/valor-software/ng2-bootstrap/issues/1056)
* **modal:** Call hideModal in ngOnDestroy if modal is shown ([#1038](https://github.com/valor-software/ng2-bootstrap/issues/1038)) ([b38db2a](https://github.com/valor-software/ng2-bootstrap/commit/b38db2a)), closes [#853](https://github.com/valor-software/ng2-bootstrap/issues/853) [#1051](https://github.com/valor-software/ng2-bootstrap/issues/1051) [#1052](https://github.com/valor-software/ng2-bootstrap/issues/1052)
* **modal:** fixing hack which gets root viewContainerRef to attach backdrop ([b5db597](https://github.com/valor-software/ng2-bootstrap/commit/b5db597)), closes [#975](https://github.com/valor-software/ng2-bootstrap/issues/975) [#854](https://github.com/valor-software/ng2-bootstrap/issues/854)
* **modal:** hide bug in [#1144](https://github.com/valor-software/ng2-bootstrap/issues/1144) ([#1147](https://github.com/valor-software/ng2-bootstrap/issues/1147)) ([a3985c1](https://github.com/valor-software/ng2-bootstrap/commit/a3985c1))
* **modal:** should fix 'no provider for ...' exception ([4c3e4c9](https://github.com/valor-software/ng2-bootstrap/commit/4c3e4c9)), closes [#854](https://github.com/valor-software/ng2-bootstrap/issues/854) [#951](https://github.com/valor-software/ng2-bootstrap/issues/951)
* **modals:** fixed modals fade in animation ([2b95c95](https://github.com/valor-software/ng2-bootstrap/commit/2b95c95)), closes [#687](https://github.com/valor-software/ng2-bootstrap/issues/687)
* **module:** class exports added back ([3eaa9ad](https://github.com/valor-software/ng2-bootstrap/commit/3eaa9ad))
* **package:** development files added to .npmignore ([887c6b2](https://github.com/valor-software/ng2-bootstrap/commit/887c6b2)), closes [#737](https://github.com/valor-software/ng2-bootstrap/issues/737)
* **package:** fixed link to main file ([a515089](https://github.com/valor-software/ng2-bootstrap/commit/a515089))
* **pagination:** Fix disabled class on next and last buttons ([#1036](https://github.com/valor-software/ng2-bootstrap/issues/1036)) ([01f4759](https://github.com/valor-software/ng2-bootstrap/commit/01f4759)), closes [#922](https://github.com/valor-software/ng2-bootstrap/issues/922)
* **pagination:** temporary disabled pageBtnClass option ([49dd07f](https://github.com/valor-software/ng2-bootstrap/commit/49dd07f))
* **slider:** Slide shouldnt enforce text alignment ([#824](https://github.com/valor-software/ng2-bootstrap/issues/824)) ([ad2c5a6](https://github.com/valor-software/ng2-bootstrap/commit/ad2c5a6))
* **template:**  templates should not use es6 templates ([de26168](https://github.com/valor-software/ng2-bootstrap/commit/de26168))
* **tests:** "no provider" error when running tests ([#963](https://github.com/valor-software/ng2-bootstrap/issues/963)) ([8483615](https://github.com/valor-software/ng2-bootstrap/commit/8483615))
* **tooltip:** fix `appendToBody` tooltip positioning ([#1158](https://github.com/valor-software/ng2-bootstrap/issues/1158)) ([#1159](https://github.com/valor-software/ng2-bootstrap/issues/1159)) ([0fd0a80](https://github.com/valor-software/ng2-bootstrap/commit/0fd0a80))
* **tooltip:** fix delayed tooltip display ([#1156](https://github.com/valor-software/ng2-bootstrap/issues/1156)) ([#1161](https://github.com/valor-software/ng2-bootstrap/issues/1161)) ([c6da387](https://github.com/valor-software/ng2-bootstrap/commit/c6da387))
* **tooltip:** properties types ([b407012](https://github.com/valor-software/ng2-bootstrap/commit/b407012))
* **tooltip:** show & hide methods should not need any arguments ([#1099](https://github.com/valor-software/ng2-bootstrap/issues/1099)) ([b80c0b4](https://github.com/valor-software/ng2-bootstrap/commit/b80c0b4))
* **typeahead:** Fix crash with `contenteditable` inputs ([47b9fb1](https://github.com/valor-software/ng2-bootstrap/commit/47b9fb1))
* **typeahead:** onFocus should not need any arguments ([41f5834](https://github.com/valor-software/ng2-bootstrap/commit/41f5834))
* **typeahead:** use TypeaheadMatch model instead of any type ([ff5c219](https://github.com/valor-software/ng2-bootstrap/commit/ff5c219))
* **univeral:** added hacks for missing type keywords ([d20ccf1](https://github.com/valor-software/ng2-bootstrap/commit/d20ccf1)), closes [#964](https://github.com/valor-software/ng2-bootstrap/issues/964)
* **utils:** now attach to body should work for mixed ng1+ng2 apps ([99f15c8](https://github.com/valor-software/ng2-bootstrap/commit/99f15c8)), closes [#1069](https://github.com/valor-software/ng2-bootstrap/issues/1069) [#1056](https://github.com/valor-software/ng2-bootstrap/issues/1056)
* **window:** fixed window usage ([0b7012a](https://github.com/valor-software/ng2-bootstrap/commit/0b7012a)), closes [#909](https://github.com/valor-software/ng2-bootstrap/issues/909) [#908](https://github.com/valor-software/ng2-bootstrap/issues/908) [#906](https://github.com/valor-software/ng2-bootstrap/issues/906)


### Features

* **build:** added config file for wallabyjs ([cec8bae](https://github.com/valor-software/ng2-bootstrap/commit/cec8bae))
* **build:** system.js bundles replaced with UMD bundles ([3e0a27d](https://github.com/valor-software/ng2-bootstrap/commit/3e0a27d))
* **build:** use ngc compiler to produce metadata ([afabb9d](https://github.com/valor-software/ng2-bootstrap/commit/afabb9d)), closes [#1060](https://github.com/valor-software/ng2-bootstrap/issues/1060) [#992](https://github.com/valor-software/ng2-bootstrap/issues/992) [#933](https://github.com/valor-software/ng2-bootstrap/issues/933)
* **buttons:** update radio button directive to work with ReactiveForms ([5d51939](https://github.com/valor-software/ng2-bootstrap/commit/5d51939)), closes [#1023](https://github.com/valor-software/ng2-bootstrap/issues/1023)
* **collpase:** add collapsed and expanded events to the collapse directive [#576](https://github.com/valor-software/ng2-bootstrap/issues/576) ([#779](https://github.com/valor-software/ng2-bootstrap/issues/779)) ([a6f9bb5](https://github.com/valor-software/ng2-bootstrap/commit/a6f9bb5))
* **datepicker:** Added configurable limit for amount of items displayed in a single row of monthpicker and yearpicker ([#1141](https://github.com/valor-software/ng2-bootstrap/issues/1141)) ([859afb2](https://github.com/valor-software/ng2-bootstrap/commit/859afb2))
* **dropdown:** added exportAs to dropdown directives ([#785](https://github.com/valor-software/ng2-bootstrap/issues/785)) ([66531c7](https://github.com/valor-software/ng2-bootstrap/commit/66531c7))
* **dropdown:** optionally add dropdown-toggle class ([#772](https://github.com/valor-software/ng2-bootstrap/issues/772)) ([52d3167](https://github.com/valor-software/ng2-bootstrap/commit/52d3167))
* **e2e:** added more e2e test ([d56f560](https://github.com/valor-software/ng2-bootstrap/commit/d56f560)), closes [#1163](https://github.com/valor-software/ng2-bootstrap/issues/1163)
* **forms:**  add export of FormsModule where [ngModel] selector is present ([#931](https://github.com/valor-software/ng2-bootstrap/issues/931)) ([b5c8448](https://github.com/valor-software/ng2-bootstrap/commit/b5c8448)), closes [#929](https://github.com/valor-software/ng2-bootstrap/issues/929) [#929](https://github.com/valor-software/ng2-bootstrap/issues/929)
* **package:** relax peer dependecies to work with 2.x.x ([bc55a38](https://github.com/valor-software/ng2-bootstrap/commit/bc55a38))
* **pagination:** allow setting of a custom css class on <li> ([#1115](https://github.com/valor-software/ng2-bootstrap/issues/1115)) ([235215c](https://github.com/valor-software/ng2-bootstrap/commit/235215c))
* **tabs:** added custom class option ([13fac37](https://github.com/valor-software/ng2-bootstrap/commit/13fac37)), closes [#766](https://github.com/valor-software/ng2-bootstrap/issues/766) [#842](https://github.com/valor-software/ng2-bootstrap/issues/842) [#842](https://github.com/valor-software/ng2-bootstrap/issues/842)
* **timepicker:** disabling meridian and hiding spinners if input is disabled ([#768](https://github.com/valor-software/ng2-bootstrap/issues/768)) ([a19c841](https://github.com/valor-software/ng2-bootstrap/commit/a19c841)), closes [#759](https://github.com/valor-software/ng2-bootstrap/issues/759)
* **tooltip:** add implementation for tooltipClass ([#664](https://github.com/valor-software/ng2-bootstrap/issues/664)) ([fa4475a](https://github.com/valor-software/ng2-bootstrap/commit/fa4475a))
* **tooltip:** added Tooltip delay functionality ([#1116](https://github.com/valor-software/ng2-bootstrap/issues/1116)) ([eb90e9a](https://github.com/valor-software/ng2-bootstrap/commit/eb90e9a))
* **tooltip:** added tooltipStateChanged and exporting the directive ([#939](https://github.com/valor-software/ng2-bootstrap/issues/939)) ([650b4f7](https://github.com/valor-software/ng2-bootstrap/commit/650b4f7))
* **tooltip:** html content as template ([#751](https://github.com/valor-software/ng2-bootstrap/issues/751)) ([6489e38](https://github.com/valor-software/ng2-bootstrap/commit/6489e38))
* **tooltip:** Make `appendToBody` work in Tooltip ([#1074](https://github.com/valor-software/ng2-bootstrap/issues/1074)) ([7e233b1](https://github.com/valor-software/ng2-bootstrap/commit/7e233b1))
* **tooltip:** tooltip html content ([#724](https://github.com/valor-software/ng2-bootstrap/issues/724)) ([9070125](https://github.com/valor-software/ng2-bootstrap/commit/9070125))
* **typeahead:** add grouping of typeahead options ([fdddbde](https://github.com/valor-software/ng2-bootstrap/commit/fdddbde))
* **typeahead:** adding custom item template ([#776](https://github.com/valor-software/ng2-bootstrap/issues/776)) ([1356ff7](https://github.com/valor-software/ng2-bootstrap/commit/1356ff7)), closes [#503](https://github.com/valor-software/ng2-bootstrap/issues/503) [#652](https://github.com/valor-software/ng2-bootstrap/issues/652)
* **typeahead:** adding support for nested properties and functions for typeaheadOptionField ([#777](https://github.com/valor-software/ng2-bootstrap/issues/777)) ([b24dabf](https://github.com/valor-software/ng2-bootstrap/commit/b24dabf)), closes [#135](https://github.com/valor-software/ng2-bootstrap/issues/135) [#523](https://github.com/valor-software/ng2-bootstrap/issues/523)
* **typeahead:** introduce TypeaheadMatch model ([80fccab](https://github.com/valor-software/ng2-bootstrap/commit/80fccab))
* **UMD:** added UMD bundles ([a7554a8](https://github.com/valor-software/ng2-bootstrap/commit/a7554a8)), closes [#1098](https://github.com/valor-software/ng2-bootstrap/issues/1098)



<a name="1.1.15"></a>
## [1.1.15](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.14...v1.1.15) (2016-10-26)


### Bug Fixes

* **doc:** formatYear instead of formatMear for the datepicker ([#1126](https://github.com/valor-software/ng2-bootstrap/issues/1126)) ([045573b](https://github.com/valor-software/ng2-bootstrap/commit/045573b))
* **modal:** hide bug in [#1144](https://github.com/valor-software/ng2-bootstrap/issues/1144) ([#1147](https://github.com/valor-software/ng2-bootstrap/issues/1147)) ([a3985c1](https://github.com/valor-software/ng2-bootstrap/commit/a3985c1))
* **tooltip:** fix `appendToBody` tooltip positioning ([#1158](https://github.com/valor-software/ng2-bootstrap/issues/1158)) ([#1159](https://github.com/valor-software/ng2-bootstrap/issues/1159)) ([0fd0a80](https://github.com/valor-software/ng2-bootstrap/commit/0fd0a80))
* **tooltip:** fix delayed tooltip display ([#1156](https://github.com/valor-software/ng2-bootstrap/issues/1156)) ([#1161](https://github.com/valor-software/ng2-bootstrap/issues/1161)) ([c6da387](https://github.com/valor-software/ng2-bootstrap/commit/c6da387))


### Features

* **datepicker:** Added configurable limit for amount of items displayed in a single row of monthpicker and yearpicker ([#1141](https://github.com/valor-software/ng2-bootstrap/issues/1141)) ([859afb2](https://github.com/valor-software/ng2-bootstrap/commit/859afb2))
* **e2e:** added more e2e test ([d56f560](https://github.com/valor-software/ng2-bootstrap/commit/d56f560)), closes [#1163](https://github.com/valor-software/ng2-bootstrap/issues/1163)
* **pagination:** allow setting of a custom css class on <li> ([#1115](https://github.com/valor-software/ng2-bootstrap/issues/1115)) ([235215c](https://github.com/valor-software/ng2-bootstrap/commit/235215c))
* **tooltip:** Make `appendToBody` work in Tooltip ([#1074](https://github.com/valor-software/ng2-bootstrap/issues/1074)) ([7e233b1](https://github.com/valor-software/ng2-bootstrap/commit/7e233b1))



<a name="1.1.14"></a>
## [1.1.14](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.14-1...v1.1.14) (2016-10-13)


### Bug Fixes

* **tooltip:** properties types ([b407012](https://github.com/valor-software/ng2-bootstrap/commit/b407012))
* **package:** fixed link to main file ([a515089](https://github.com/valor-software/ng2-bootstrap/commit/a515089))


### Features

* **package:** relax peer dependecies to work with 2.x.x ([bc55a38](https://github.com/valor-software/ng2-bootstrap/commit/bc55a38))
* **tooltip:** added Tooltip delay functionality ([#1116](https://github.com/valor-software/ng2-bootstrap/issues/1116)) ([eb90e9a](https://github.com/valor-software/ng2-bootstrap/commit/eb90e9a))
* **build:** system.js bundles replaced with UMD bundles ([3e0a27d](https://github.com/valor-software/ng2-bootstrap/commit/3e0a27d))
* **UMD:** added UMD bundles ([a7554a8](https://github.com/valor-software/ng2-bootstrap/commit/a7554a8)), closes [#1098](https://github.com/valor-software/ng2-bootstrap/issues/1098)

<a name="1.1.13"></a>
## [1.1.13](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.13-1...v1.1.13) (2016-10-11)

### Bug Fixes

* **build:** export all internal classes so AoT can work without issues ([6e6be1a](https://github.com/valor-software/ng2-bootstrap/commit/6e6be1a)), closes [#1093](https://github.com/valor-software/ng2-bootstrap/issues/1093)
* **helpers:** add a way to set root view component ref ([79d3335](https://github.com/valor-software/ng2-bootstrap/commit/79d3335)), closes [#1056](https://github.com/valor-software/ng2-bootstrap/issues/1056)
* **tooltip:** show & hide methods should not need any arguments ([#1099](https://github.com/valor-software/ng2-bootstrap/issues/1099)) ([b80c0b4](https://github.com/valor-software/ng2-bootstrap/commit/b80c0b4))



<a name="1.1.12"></a>
## [1.1.12](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.11...v1.1.12) (2016-10-10)


### Bug Fixes

* **helpers:** add a way to set root view component ref ([6e4a033](https://github.com/valor-software/ng2-bootstrap/commit/6e4a033)), closes [#1056](https://github.com/valor-software/ng2-bootstrap/issues/1056)



<a name="1.1.11"></a>
## [1.1.11](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.10...v1.1.11) (2016-10-07)


### Bug Fixes

* **datepicker:** do not emit selection done on ngModel changes ([7b24283](https://github.com/valor-software/ng2-bootstrap/commit/7b24283)), closes [#1095](https://github.com/valor-software/ng2-bootstrap/issues/1095)



<a name="1.1.10"></a>
## [1.1.10](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.9...v1.1.10) (2016-10-07)


### Bug Fixes

* **aot:** 2 more private methods made public ([0dbbf09](https://github.com/valor-software/ng2-bootstrap/commit/0dbbf09)), closes [#1093](https://github.com/valor-software/ng2-bootstrap/issues/1093)
* **typeahead:** onFocus should not need any arguments ([41f5834](https://github.com/valor-software/ng2-bootstrap/commit/41f5834))
* **typeahead:** use TypeaheadMatch model instead of any type ([ff5c219](https://github.com/valor-software/ng2-bootstrap/commit/ff5c219))


### Features

* **typeahead:** add grouping of typeahead options ([fdddbde](https://github.com/valor-software/ng2-bootstrap/commit/fdddbde))
* **typeahead:** introduce TypeaheadMatch model ([80fccab](https://github.com/valor-software/ng2-bootstrap/commit/80fccab))



<a name="1.1.9"></a>
## [1.1.9](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.8...v1.1.9) (2016-10-06)


### Bug Fixes

* **build:** All `[@HostBinding](https://github.com/HostBinding)` and `[@HostListener](https://github.com/HostListener)` should be public ([#1086](https://github.com/valor-software/ng2-bootstrap/issues/1086)) ([3691757](https://github.com/valor-software/ng2-bootstrap/commit/3691757)), closes [#1080](https://github.com/valor-software/ng2-bootstrap/issues/1080)



<a name="1.1.8"></a>
## [1.1.8](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.7...v1.1.8) (2016-10-05)


### Bug Fixes

* **buttons:** all [@Input](https://github.com/Input)() fields should be public ([c96ffd3](https://github.com/valor-software/ng2-bootstrap/commit/c96ffd3))



<a name="1.1.7"></a>
## [1.1.7](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.6...v1.1.7) (2016-10-05)


### Bug Fixes

* **module:** class exports added back ([3eaa9ad](https://github.com/valor-software/ng2-bootstrap/commit/3eaa9ad))



<a name="1.1.6"></a>
## [1.1.6](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.5...v1.1.6) (2016-10-04)


### Bug Fixes

* **build:** change properties privacy to use in factories ([19c0c61](https://github.com/valor-software/ng2-bootstrap/commit/19c0c61))
* **datepicker:** changing the date programatically selects the correct date ([#1041](https://github.com/valor-software/ng2-bootstrap/issues/1041)) ([fb6d532](https://github.com/valor-software/ng2-bootstrap/commit/fb6d532)), closes [#858](https://github.com/valor-software/ng2-bootstrap/issues/858)
* **datepicker:** fixed broken bindings for aria-labelby and ids ([#1055](https://github.com/valor-software/ng2-bootstrap/issues/1055)) ([26d9209](https://github.com/valor-software/ng2-bootstrap/commit/26d9209))
* **datepicker:** Fixing Colspan ([#1057](https://github.com/valor-software/ng2-bootstrap/issues/1057)) ([e71a8ae](https://github.com/valor-software/ng2-bootstrap/commit/e71a8ae))
* **datepicker:** imlement ReactiveForms setDisabledState for TimepickerComponent ([cd58c3b](https://github.com/valor-software/ng2-bootstrap/commit/cd58c3b)), closes [#1024](https://github.com/valor-software/ng2-bootstrap/issues/1024)
* **demo:** fixed tabs demo ([#1050](https://github.com/valor-software/ng2-bootstrap/issues/1050)) ([969a61a](https://github.com/valor-software/ng2-bootstrap/commit/969a61a))
* **export:** removed obsolete exports to avoid missusage ([6993e97](https://github.com/valor-software/ng2-bootstrap/commit/6993e97))
* **modal:** Call hideModal in ngOnDestroy if modal is shown ([#1038](https://github.com/valor-software/ng2-bootstrap/issues/1038)) ([b38db2a](https://github.com/valor-software/ng2-bootstrap/commit/b38db2a)), closes [#853](https://github.com/valor-software/ng2-bootstrap/issues/853) [#1051](https://github.com/valor-software/ng2-bootstrap/issues/1051) [#1052](https://github.com/valor-software/ng2-bootstrap/issues/1052)
* **package:** development files added to .npmignore ([887c6b2](https://github.com/valor-software/ng2-bootstrap/commit/887c6b2)), closes [#737](https://github.com/valor-software/ng2-bootstrap/issues/737)
* **pagination:** Fix disabled class on next and last buttons ([#1036](https://github.com/valor-software/ng2-bootstrap/issues/1036)) ([01f4759](https://github.com/valor-software/ng2-bootstrap/commit/01f4759)), closes [#922](https://github.com/valor-software/ng2-bootstrap/issues/922)
* **slider:** Slide shouldnt enforce text alignment ([#824](https://github.com/valor-software/ng2-bootstrap/issues/824)) ([ad2c5a6](https://github.com/valor-software/ng2-bootstrap/commit/ad2c5a6))
* **template:**  templates should not use es6 templates ([de26168](https://github.com/valor-software/ng2-bootstrap/commit/de26168))
* **typeahead:** Fix crash with `contenteditable` inputs ([47b9fb1](https://github.com/valor-software/ng2-bootstrap/commit/47b9fb1))
* **univeral:** added hacks for missing type keywords ([d20ccf1](https://github.com/valor-software/ng2-bootstrap/commit/d20ccf1)), closes [#964](https://github.com/valor-software/ng2-bootstrap/issues/964)
* **utils:** now attach to body should work for mixed ng1+ng2 apps ([99f15c8](https://github.com/valor-software/ng2-bootstrap/commit/99f15c8)), closes [#1069](https://github.com/valor-software/ng2-bootstrap/issues/1069) [#1056](https://github.com/valor-software/ng2-bootstrap/issues/1056)


### Features

* **build:** added config file for wallabyjs ([cec8bae](https://github.com/valor-software/ng2-bootstrap/commit/cec8bae))
* **build:** use ngc compiler to produce metadata ([afabb9d](https://github.com/valor-software/ng2-bootstrap/commit/afabb9d)), closes [#1060](https://github.com/valor-software/ng2-bootstrap/issues/1060) [#992](https://github.com/valor-software/ng2-bootstrap/issues/992) [#933](https://github.com/valor-software/ng2-bootstrap/issues/933)
* **buttons:** update radio button directive to work with ReactiveForms ([5d51939](https://github.com/valor-software/ng2-bootstrap/commit/5d51939)), closes [#1023](https://github.com/valor-software/ng2-bootstrap/issues/1023)
* **tabs:** added custom class option ([13fac37](https://github.com/valor-software/ng2-bootstrap/commit/13fac37)), closes [#766](https://github.com/valor-software/ng2-bootstrap/issues/766) [#842](https://github.com/valor-software/ng2-bootstrap/issues/842) [#842](https://github.com/valor-software/ng2-bootstrap/issues/842)
* **tooltip:** added tooltipStateChanged and exporting the directive ([#939](https://github.com/valor-software/ng2-bootstrap/issues/939)) ([650b4f7](https://github.com/valor-software/ng2-bootstrap/commit/650b4f7))



<a name="1.1.5"></a>
## [1.1.5](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.4...v1.1.5) (2016-09-16)


### Bug Fixes

* **modal:** fixing hack which gets root viewContainerRef to attach backdrop ([b5db597](https://github.com/valor-software/ng2-bootstrap/commit/b5db597)), closes [#975](https://github.com/valor-software/ng2-bootstrap/issues/975) [#854](https://github.com/valor-software/ng2-bootstrap/issues/854)



<a name="1.1.4"></a>
## [1.1.4](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.3...v1.1.4) (2016-09-15)

### Features
* Update to Angular 2.0.0 ([05a7b46](https://github.com/valor-software/ng2-bootstrap/commit/05a7b46))

<a name="1.1.3"></a>
## [1.1.3](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.2...v1.1.3) (2016-09-14)


### Bug Fixes

* **modal:** should fix 'no provider for ...' exception ([4c3e4c9](https://github.com/valor-software/ng2-bootstrap/commit/4c3e4c9)), closes [#854](https://github.com/valor-software/ng2-bootstrap/issues/854) [#951](https://github.com/valor-software/ng2-bootstrap/issues/951)
* **tests:** "no provider" error when running tests ([#963](https://github.com/valor-software/ng2-bootstrap/issues/963)) ([8483615](https://github.com/valor-software/ng2-bootstrap/commit/8483615))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.1...v1.1.2) (2016-09-12)


### Bug Fixes

* **datepicker:** removed popup stub ([d1a7d09](https://github.com/valor-software/ng2-bootstrap/commit/d1a7d09))


### Features

* **forms:**  add export of FormsModule where [ngModel] selector is present ([#931](https://github.com/valor-software/ng2-bootstrap/issues/931)) ([b5c8448](https://github.com/valor-software/ng2-bootstrap/commit/b5c8448)), closes [#929](https://github.com/valor-software/ng2-bootstrap/issues/929) [#929](https://github.com/valor-software/ng2-bootstrap/issues/929)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/valor-software/ng2-bootstrap/compare/v1.1.0...v1.1.1) (2016-09-02)


### Bug Fixes

* **dropdown:** toggle does not close when clicking directly on an icon in Chrome ([#851](https://github.com/valor-software/ng2-bootstrap/issues/851)) ([341dcf8](https://github.com/valor-software/ng2-bootstrap/commit/341dcf8)), closes [#851](https://github.com/valor-software/ng2-bootstrap/issues/851) [#658](https://github.com/valor-software/ng2-bootstrap/issues/658)
* **window:** fixed window usage ([0b7012a](https://github.com/valor-software/ng2-bootstrap/commit/0b7012a)), closes [#909](https://github.com/valor-software/ng2-bootstrap/issues/909) [#908](https://github.com/valor-software/ng2-bootstrap/issues/908) [#906](https://github.com/valor-software/ng2-bootstrap/issues/906)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.23...v1.1.0) (2016-09-01)


### Bug Fixes

* **build:** restore coverage reports ([#755](https://github.com/valor-software/ng2-bootstrap/issues/755)) ([26191eb](https://github.com/valor-software/ng2-bootstrap/commit/26191eb))
* **ci:** upload test coverage report to codecov ([#756](https://github.com/valor-software/ng2-bootstrap/issues/756)) ([4358773](https://github.com/valor-software/ng2-bootstrap/commit/4358773))
* **datepicker:** remove unused code ([#837](https://github.com/valor-software/ng2-bootstrap/issues/837)) ([fa22c98](https://github.com/valor-software/ng2-bootstrap/commit/fa22c98))
* **demo:** fixed accordion demo ([bd4cc96](https://github.com/valor-software/ng2-bootstrap/commit/bd4cc96)), closes [#399](https://github.com/valor-software/ng2-bootstrap/issues/399)
* **modals:** fixed modals fade in animation ([2b95c95](https://github.com/valor-software/ng2-bootstrap/commit/2b95c95)), closes [#687](https://github.com/valor-software/ng2-bootstrap/issues/687)


### Features

* **collpase:** add collapsed and expanded events to the collapse directive [#576](https://github.com/valor-software/ng2-bootstrap/issues/576) ([#779](https://github.com/valor-software/ng2-bootstrap/issues/779)) ([a6f9bb5](https://github.com/valor-software/ng2-bootstrap/commit/a6f9bb5))
* **dropdown:** added exportAs to dropdown directives ([#785](https://github.com/valor-software/ng2-bootstrap/issues/785)) ([66531c7](https://github.com/valor-software/ng2-bootstrap/commit/66531c7))
* **dropdown:** optionally add dropdown-toggle class ([#772](https://github.com/valor-software/ng2-bootstrap/issues/772)) ([52d3167](https://github.com/valor-software/ng2-bootstrap/commit/52d3167))
* **timepicker:** disabling meridian and hiding spinners if input is disabled ([#768](https://github.com/valor-software/ng2-bootstrap/issues/768)) ([a19c841](https://github.com/valor-software/ng2-bootstrap/commit/a19c841)), closes [#759](https://github.com/valor-software/ng2-bootstrap/issues/759)
* **tooltip:** add implementation for tooltipClass ([#664](https://github.com/valor-software/ng2-bootstrap/issues/664)) ([fa4475a](https://github.com/valor-software/ng2-bootstrap/commit/fa4475a))
* **tooltip:** html content as template ([#751](https://github.com/valor-software/ng2-bootstrap/issues/751)) ([6489e38](https://github.com/valor-software/ng2-bootstrap/commit/6489e38))
* **tooltip:** tooltip html content ([#724](https://github.com/valor-software/ng2-bootstrap/issues/724)) ([9070125](https://github.com/valor-software/ng2-bootstrap/commit/9070125))
* **typeahead:** adding custom item template ([#776](https://github.com/valor-software/ng2-bootstrap/issues/776)) ([1356ff7](https://github.com/valor-software/ng2-bootstrap/commit/1356ff7)), closes [#503](https://github.com/valor-software/ng2-bootstrap/issues/503) [#652](https://github.com/valor-software/ng2-bootstrap/issues/652)
* **typeahead:** adding support for nested properties and functions for typeaheadOptionField ([#777](https://github.com/valor-software/ng2-bootstrap/issues/777)) ([b24dabf](https://github.com/valor-software/ng2-bootstrap/commit/b24dabf)), closes [#135](https://github.com/valor-software/ng2-bootstrap/issues/135) [#523](https://github.com/valor-software/ng2-bootstrap/issues/523)



<a name="1.0.24"></a>
## [1.0.24](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.23...v1.0.24) (2016-07-18)


### Bug Fixes

* **modals:** fixed modals fade in animation ([2b95c95](https://github.com/valor-software/ng2-bootstrap/commit/2b95c95)), closes [#687](https://github.com/valor-software/ng2-bootstrap/issues/687)


### Features

* **tooltip:** add implementation for tooltipClass ([#664](https://github.com/valor-software/ng2-bootstrap/issues/664)) ([fa4475a](https://github.com/valor-software/ng2-bootstrap/commit/fa4475a))
* **tooltip:** tooltip html content ([#724](https://github.com/valor-software/ng2-bootstrap/issues/724)) ([9070125](https://github.com/valor-software/ng2-bootstrap/commit/9070125))



<a name="1.0.23"></a>
## [1.0.23](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.22...v1.0.23) (2016-07-14)


### Bug Fixes

* **build:** fix rxjs typings issues on build ([b4267aa](https://github.com/valor-software/ng2-bootstrap/commit/b4267aa))
* **dropdown:** Add the dropdown-menu class to dropdown menus ([1bc316f](https://github.com/valor-software/ng2-bootstrap/commit/1bc316f)), closes [#541](https://github.com/valor-software/ng2-bootstrap/issues/541) [#732](https://github.com/valor-software/ng2-bootstrap/issues/732)
* **modal:** injected DOCUMENT token is undefined ([48a9aa7](https://github.com/valor-software/ng2-bootstrap/commit/48a9aa7)), closes [#575](https://github.com/valor-software/ng2-bootstrap/issues/575)
* **typeahead:** Added form support ([#723](https://github.com/valor-software/ng2-bootstrap/issues/723)) ([fa54e46](https://github.com/valor-software/ng2-bootstrap/commit/fa54e46))


### Features

* **datepicker:** add emitting event when datepicker selection is done ([#733](https://github.com/valor-software/ng2-bootstrap/issues/733)) ([53c7fd1](https://github.com/valor-software/ng2-bootstrap/commit/53c7fd1))



<a name="1.0.22"></a>
## [1.0.22](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.21...v1.0.22) (2016-07-12)



<a name="1.0.21"></a>
## [1.0.21](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.20...v1.0.21) (2016-07-12)



<a name="1.0.20"></a>
## [1.0.20](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.19...v1.0.20) (2016-07-11)


### Bug Fixes

* **package:** removed peer dependency to router ([c661772](https://github.com/valor-software/ng2-bootstrap/commit/c661772))



<a name="1.0.19"></a>
## [1.0.19](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.17...v1.0.19) (2016-07-11)


### Bug Fixes

* **build:** emit helpers ([4771f6f](https://github.com/valor-software/ng2-bootstrap/commit/4771f6f))
* **build:** fixed prod build webpack config ([753cc67](https://github.com/valor-software/ng2-bootstrap/commit/753cc67))
* **demo:** add "dropdownMenu" ([#580](https://github.com/valor-software/ng2-bootstrap/issues/580)) ([686a96e](https://github.com/valor-software/ng2-bootstrap/commit/686a96e))
* **docs:** fix typo ([#612](https://github.com/valor-software/ng2-bootstrap/issues/612)) ([7ddd532](https://github.com/valor-software/ng2-bootstrap/commit/7ddd532)), closes [#612](https://github.com/valor-software/ng2-bootstrap/issues/612)
* **docs:** nonInput is by default ([#581](https://github.com/valor-software/ng2-bootstrap/issues/581)) ([b23ced0](https://github.com/valor-software/ng2-bootstrap/commit/b23ced0))
* **dropdown:** explicitly markForCheck() ([#566](https://github.com/valor-software/ng2-bootstrap/issues/566)) ([0ce4328](https://github.com/valor-software/ng2-bootstrap/commit/0ce4328))
* **dropdown:** prop disabled renamed to isDisabled  ([#615](https://github.com/valor-software/ng2-bootstrap/issues/615)) ([8a1d6f8](https://github.com/valor-software/ng2-bootstrap/commit/8a1d6f8))
* **header-component:** fix style ([ccfe948](https://github.com/valor-software/ng2-bootstrap/commit/ccfe948))
* **modal:** don't hide on out click if backdrop === 'static' ([#629](https://github.com/valor-software/ng2-bootstrap/issues/629)) ([df85712](https://github.com/valor-software/ng2-bootstrap/commit/df85712))
* **modal:** fix typo in MODAL_DIRECTIVES ([#630](https://github.com/valor-software/ng2-bootstrap/issues/630)) ([8c4c125](https://github.com/valor-software/ng2-bootstrap/commit/8c4c125)), closes [#630](https://github.com/valor-software/ng2-bootstrap/issues/630)
* **modals:** modal backdrop and onclick events handling ([b39b856](https://github.com/valor-software/ng2-bootstrap/commit/b39b856)), closes [#687](https://github.com/valor-software/ng2-bootstrap/issues/687) [#703](https://github.com/valor-software/ng2-bootstrap/issues/703) [#708](https://github.com/valor-software/ng2-bootstrap/issues/708)
* **package:** include js map files in bundles ([1ffd2b4](https://github.com/valor-software/ng2-bootstrap/commit/1ffd2b4)), closes [#632](https://github.com/valor-software/ng2-bootstrap/issues/632)
* **readme:** alert component name fixed ([e9a1d04](https://github.com/valor-software/ng2-bootstrap/commit/e9a1d04)), closes [#552](https://github.com/valor-software/ng2-bootstrap/issues/552)
* **style:** fix top menu z-index ([e70e578](https://github.com/valor-software/ng2-bootstrap/commit/e70e578))
* **tests:** fix failing test for buttons and accordion ([8ea9c10](https://github.com/valor-software/ng2-bootstrap/commit/8ea9c10))
* **typeahead:** removed incorrect behavior to do ENTER behavior on TAB. TAB should simply skip to next field as expected. ([#715](https://github.com/valor-software/ng2-bootstrap/issues/715)) ([758ad1b](https://github.com/valor-software/ng2-bootstrap/commit/758ad1b)), closes [#686](https://github.com/valor-software/ng2-bootstrap/issues/686) [#490](https://github.com/valor-software/ng2-bootstrap/issues/490) [#689](https://github.com/valor-software/ng2-bootstrap/issues/689)


### Features

* **demo:** new build process with ng2-webpack-config ([5c8fcf1](https://github.com/valor-software/ng2-bootstrap/commit/5c8fcf1))
* **docs:** added modals section ([6ab3a07](https://github.com/valor-software/ng2-bootstrap/commit/6ab3a07))
* **docs:** applied new docs style ([d84211a](https://github.com/valor-software/ng2-bootstrap/commit/d84211a))
* **docs:** menues and contents updated ([2155df6](https://github.com/valor-software/ng2-bootstrap/commit/2155df6))
* **package:** angular updated to rc3, fix hash (active route) ([#636](https://github.com/valor-software/ng2-bootstrap/issues/636)) ([70a84cf](https://github.com/valor-software/ng2-bootstrap/commit/70a84cf)), closes [#636](https://github.com/valor-software/ng2-bootstrap/issues/636)
* **typeahead:** rxjs version ([#584](https://github.com/valor-software/ng2-bootstrap/issues/584)) ([48b8abb](https://github.com/valor-software/ng2-bootstrap/commit/48b8abb)), closes [#536](https://github.com/valor-software/ng2-bootstrap/issues/536) [#637](https://github.com/valor-software/ng2-bootstrap/issues/637)


### BREAKING CHANGES

* dropdown: * dropdown property `disabled` renamed to `isDisabled`
* ng2-bootstrap: misprint MODAL_DIRECTVES renamed to MODAL_DIRECTIVES


<a name="1.0.17"></a>
## [1.0.17](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.16...v1.0.17) (2016-05-31)


### Bug Fixes

* **datepicker:** added ngOnChanges hook ([ecffdb0](https://github.com/valor-software/ng2-bootstrap/commit/ecffdb0)), closes [#543](https://github.com/valor-software/ng2-bootstrap/issues/543)
* **timepicker:** added null value validation ([f9ad7e7](https://github.com/valor-software/ng2-bootstrap/commit/f9ad7e7)), closes [#533](https://github.com/valor-software/ng2-bootstrap/issues/533)
* **tooltip:** Fix tooltip arrows in bootstrap v4 ([b4250d4](https://github.com/valor-software/ng2-bootstrap/commit/b4250d4)), closes [#141](https://github.com/valor-software/ng2-bootstrap/issues/141)


### Features

* **modals:** added declarative modals component ([#564](https://github.com/valor-software/ng2-bootstrap/issues/564)) ([1d0903f](https://github.com/valor-software/ng2-bootstrap/commit/1d0903f)), closes [#29](https://github.com/valor-software/ng2-bootstrap/issues/29)
* **tooltip:** adds implementation to tooltipEnable ([#517](https://github.com/valor-software/ng2-bootstrap/issues/517)) ([1470892](https://github.com/valor-software/ng2-bootstrap/commit/1470892))

### Breaking changes
* Added view provider required by **modals** (see modals docs for more information)

<a name="1.0.16"></a>
## [1.0.16](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.15...v1.0.16) (2016-05-06)


### Bug Fixes

* **build:** system.js bundler updated to rc.1([6945ad9](https://github.com/valor-software/ng2-bootstrap/commit/6945ad9))
* **collapse:** had to disable animation in order to update to rc.1([3443495](https://github.com/valor-software/ng2-bootstrap/commit/3443495))
* **collapse:** removed dependecy to animation builder([fed473f](https://github.com/valor-software/ng2-bootstrap/commit/fed473f))
* **docs:** update to ButtonRadioDirective and ButtonCheckboxDirective ([#476](https://github.com/valor-software/ng2-bootstrap/issues/476))([2e2d79b](https://github.com/valor-software/ng2-bootstrap/commit/2e2d79b))


### Features

* **package:** upgrade ng2-bootstrap to rc.1 ([#481](https://github.com/valor-software/ng2-bootstrap/issues/481))([554be3d](https://github.com/valor-software/ng2-bootstrap/commit/554be3d)), closes [#482](https://github.com/valor-software/ng2-bootstrap/issues/482) [#472](https://github.com/valor-software/ng2-bootstrap/issues/472) [#477](https://github.com/valor-software/ng2-bootstrap/issues/477)



<a name="1.0.15"></a>
## [1.0.15](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.14...v1.0.15) (2016-04-28)


### Bug Fixes

* **buttons:** had incorrect import statement which breaks .d.ts and import ([67ee5b5](https://github.com/valor-software/ng2-bootstrap/commit/67ee5b5))
* **universal:** now plays well with ng2 universal ([9d595d3](https://github.com/valor-software/ng2-bootstrap/commit/9d595d3)), closes [#61](https://github.com/valor-software/ng2-bootstrap/issues/61)



<a name="1.0.14"></a>
## [1.0.14](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.13...v1.0.14) (2016-04-26)


### Bug Fixes

* **accordion:** Panel isn't resizing after content has changed ([914ae1a](https://github.com/valor-software/ng2-bootstrap/commit/914ae1a)), closes [#454](https://github.com/valor-software/ng2-bootstrap/issues/454)
* **collapse:** Setting overflow back to visible in Collapse (#433) ([5c9434e](https://github.com/valor-software/ng2-bootstrap/commit/5c9434e)), closes [#372](https://github.com/valor-software/ng2-bootstrap/issues/372)
* **datepicker:** added support for null value ([8109dd2](https://github.com/valor-software/ng2-bootstrap/commit/8109dd2)), closes [#16](https://github.com/valor-software/ng2-bootstrap/issues/16) [#445](https://github.com/valor-software/ng2-bootstrap/issues/445)
* **datepicker:** If the date was set by ngModel it will be overwritten by default value ([6321253](https://github.com/valor-software/ng2-bootstrap/commit/6321253))
* **Tabset:** add tab-container class to the Tabset component for correct display ([2b951f7](https://github.com/valor-software/ng2-bootstrap/commit/2b951f7))

### Features

* **package:** updated angular2 to 0-beta.16 ([75b3568](https://github.com/valor-software/ng2-bootstrap/commit/75b3568))
* **typeahead:** show list of options on focuse when minLength=0 ([f1c1909](https://github.com/valor-software/ng2-bootstrap/commit/f1c1909)), closes [#187](https://github.com/valor-software/ng2-bootstrap/issues/187) [#413](https://github.com/valor-software/ng2-bootstrap/issues/413)

### Breaking changes
All components was renamed accordingly to ng2 style guide ([da131ea](https://github.com/valor-software/ng2-bootstrap/commit/da131ea))

| Before | After |
|---|---|
|Accordion|AccordionComponent|
|AccordionPanel|AccordionPanelComponent|
|Alert|AlertComponent|
|ButtonCheckbox|ButtonCheckboxDirective|
|ButtonRadio|ButtonRadioDirective|
|Carousel|CarouselComponent|
|Slide|SlideComponent|
|Collapse|CollapseDirective|
|DatePicker|DatePickerComponent|
|Dropdown|DropdownDirective|
|Pager|PagerComponent|
|Pagination|PaginationComponent|
|Bar|BarComponent|
|Progress|ProgressDirective|
|Progressbar|ProgressbarComponent|
|Rating|RatingComponent|
|Tab|TabDirective|
|TabHeading|TabHeadingDirective|
|Tabset|TabsetComponent|
|Timepicker|TimepickerComponent|
|Tooltip|TooltipDirective|
|Typeahead|TypeaheadDirective|

<a name="1.0.13"></a>
## [1.0.13](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.12...v1.0.13) (2016-04-15)


### Bug Fixes

* **typeahead:** blur event handler should not prevent item selection ([847d375](https://github.com/valor-software/ng2-bootstrap/commit/847d375)), closes [#403](https://github.com/valor-software/ng2-bootstrap/issues/403) [#418](https://github.com/valor-software/ng2-bootstrap/issues/418) [#356](https://github.com/valor-software/ng2-bootstrap/issues/356)
* **typeahead:** Blur hide with timeout, to allow other events to be triggered. (fixes #363) ([1a719d0](https://github.com/valor-software/ng2-bootstrap/commit/1a719d0)), closes [#363](https://github.com/valor-software/ng2-bootstrap/issues/363) [#395](https://github.com/valor-software/ng2-bootstrap/issues/395) [#389](https://github.com/valor-software/ng2-bootstrap/issues/389) [#363](https://github.com/valor-software/ng2-bootstrap/issues/363)



<a name="1.0.12"></a>
## [1.0.12](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.11...v1.0.12) (2016-04-15)


### Features

* **deps:** upgrade to angular2 beta.15 ([00e6ad4](https://github.com/valor-software/ng2-bootstrap/commit/00e6ad4))



<a name="1.0.11"></a>
## [1.0.11](https://github.com/valor-software/ng2-bootstrap/compare/v1.0.10...v1.0.11) (2016-04-08)


### Bug Fixes

* **build:** generate source maps for systemjs bundles (fixes #367) ([81e16b7](https://github.com/valor-software/ng2-bootstrap/commit/81e16b7)), closes [#367](https://github.com/valor-software/ng2-bootstrap/issues/367)
* **demo:** added card clasess to pre tags in bs4 demo ([0dfe7b2](https://github.com/valor-software/ng2-bootstrap/commit/0dfe7b2))
* **lint:** added usage of tslint-config-valorsoft ([cad6af3](https://github.com/valor-software/ng2-bootstrap/commit/cad6af3))
* **lint:** enable tslint and codelyzer (fixes #309) ([b60ce40](https://github.com/valor-software/ng2-bootstrap/commit/b60ce40)), closes [#309](https://github.com/valor-software/ng2-bootstrap/issues/309)
* **typeahead:** prevent form submition when typeahead selected (fixes #359) ([4297410](https://github.com/valor-software/ng2-bootstrap/commit/4297410)), closes [#359](https://github.com/valor-software/ng2-bootstrap/issues/359)

### Features

* **package:** updated to angular2 beta.14 ([243585b](https://github.com/valor-software/ng2-bootstrap/commit/243585b))



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



