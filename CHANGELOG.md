## [7.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v7.1.1...v7.1.2) (2021-09-24)


### Bug Fixes

* **aria-expanded:** fixed unnecessary aria-expanded ([#6297](https://github.com/valor-software/ngx-bootstrap/issues/6297)) ([329c7b8](https://github.com/valor-software/ngx-bootstrap/commit/329c7b8333770670ed7bda5c2c8f0b89e9098593))
* **datepicker:** fix enabledDates/disabledDates property not working in min-mode ([#6290](https://github.com/valor-software/ngx-bootstrap/issues/6290)) ([78c45bc](https://github.com/valor-software/ngx-bootstrap/commit/78c45bcec23baf9fc4fb85093ba19e72d608927b))
* **datepicker:** fix wrong value for SV and NL locales in daterangepicker ([#6303](https://github.com/valor-software/ngx-bootstrap/issues/6303)) ([2fb60fd](https://github.com/valor-software/ngx-bootstrap/commit/2fb60fd2d86fa3d03a545ec38d90f4d8d98d9bb5))
* **dropdown:** fixed dropdown right align for bs5 ([#6298](https://github.com/valor-software/ngx-bootstrap/issues/6298)) ([aa279f4](https://github.com/valor-software/ngx-bootstrap/commit/aa279f43c4694056b7ea5b1b04b5e6993934663f))
* **modal:** fixed modal uniq id ([#6299](https://github.com/valor-software/ngx-bootstrap/issues/6299)) ([be1db58](https://github.com/valor-software/ngx-bootstrap/commit/be1db5857182b7d7848d8ec0446c4dc4935f3cf0))
* **modals:** fixed modals documentation for ModalOptions ([#6292](https://github.com/valor-software/ngx-bootstrap/issues/6292)) ([0222e4f](https://github.com/valor-software/ngx-bootstrap/commit/0222e4f0e61095bbddc41dedb07fe523acb74862))
* **timepicker:** fixed reset validation for ngModel ([#6294](https://github.com/valor-software/ngx-bootstrap/issues/6294)) ([d777be6](https://github.com/valor-software/ngx-bootstrap/commit/d777be6bda108598980f4eb94f6e28dec4de4066))


### Features

* **datepicker:** add timepicker support ([#6275](https://github.com/valor-software/ngx-bootstrap/issues/6275)) ([e93950b](https://github.com/valor-software/ngx-bootstrap/commit/e93950bd9f3477c99886d2db0a725bf645c66943))
* **datepicker:** added config param to enable optional current time initialization ([#6288](https://github.com/valor-software/ngx-bootstrap/issues/6288)) ([3d2a0d5](https://github.com/valor-software/ngx-bootstrap/commit/3d2a0d530c74c2840665e58ccf576f86f8b351a8))
* **dropdown:** add arrow key navigation for dropdown list ([#4156](https://github.com/valor-software/ngx-bootstrap/issues/4156)) ([107f2b2](https://github.com/valor-software/ngx-bootstrap/commit/107f2b2b27a273e41cce382bfa60e40bdc3ee8bd))
* **timepicker:** add config for allowing empty time ([#6279](https://github.com/valor-software/ngx-bootstrap/issues/6279)) ([3a0757a](https://github.com/valor-software/ngx-bootstrap/commit/3a0757a9b87ca482a6cdce16297648bbc84609a4))
* **typeahead:** added config option selectItemOnBlur to select item onBlur ([#6295](https://github.com/valor-software/ngx-bootstrap/issues/6295)) ([f36ec96](https://github.com/valor-software/ngx-bootstrap/commit/f36ec964454ceeb9ba58982eff91f0501c322a67))



## [7.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v7.1.0...v7.1.1) (2021-09-10)


### Bug Fixes

* **carousel:** fixed prev and next buttons with disabled class, margin-right for multilist carousel ([#6241](https://github.com/valor-software/ngx-bootstrap/issues/6241)) ([3a6f7e3](https://github.com/valor-software/ngx-bootstrap/commit/3a6f7e333bfc7b1d939719fa37b86121a9d80570))
* **collapse:** fix setting display value ([#6257](https://github.com/valor-software/ngx-bootstrap/issues/6257)) ([aaf1240](https://github.com/valor-software/ngx-bootstrap/commit/aaf1240e9254f168aa3a852351490e8245560e78))
* **datepicker:** fix custom ranges adaptive view ([#6255](https://github.com/valor-software/ngx-bootstrap/issues/6255)) ([f4689aa](https://github.com/valor-software/ngx-bootstrap/commit/f4689aace88fe12a0bf76a5138b427f5d78ca8a2))
* **datepicker:** fixed isdisabled mode ([#6286](https://github.com/valor-software/ngx-bootstrap/issues/6286)) ([ff7d650](https://github.com/valor-software/ngx-bootstrap/commit/ff7d650c2c9e5024e30aa8422df88f578652f3e0))
* **pagination:** fixed default values for first, next, previous, last texts ([#6281](https://github.com/valor-software/ngx-bootstrap/issues/6281)) ([9703904](https://github.com/valor-software/ngx-bootstrap/commit/97039049de3c04201cc222f0eca7a98a195481ca))
* **popover, tooltip:** fix positioning by not accessing always undefi… ([#6271](https://github.com/valor-software/ngx-bootstrap/issues/6271)) ([6c138db](https://github.com/valor-software/ngx-bootstrap/commit/6c138dbeb10d09a90a1502f65bf73b76eac80c28)), closes [#6237](https://github.com/valor-software/ngx-bootstrap/issues/6237)
* **popover, tooltip:** fixed right position for popover and tooltip ([#6285](https://github.com/valor-software/ngx-bootstrap/issues/6285)) ([0d9d0fc](https://github.com/valor-software/ngx-bootstrap/commit/0d9d0fcb00824d80a7abf6d33f8ea71023b7830a))
* **progressbar:** fixed max value for stacked progressbar ([0a5812c](https://github.com/valor-software/ngx-bootstrap/commit/0a5812c16984734da547512bc4f4f9b5b5474441))
* **readme:** delete extra link getting start in readme ([1544a20](https://github.com/valor-software/ngx-bootstrap/commit/1544a20769176d7dacd8751c501a15516b2097a7))
* **readme:** updated metadata description ([#6273](https://github.com/valor-software/ngx-bootstrap/issues/6273)) ([e3b15db](https://github.com/valor-software/ngx-bootstrap/commit/e3b15db30029b659a727742f240d54d20dd14cea))


### Features

* **dropdown:** added option to stop propagation ([#6282](https://github.com/valor-software/ngx-bootstrap/issues/6282)) ([0e78e51](https://github.com/valor-software/ngx-bootstrap/commit/0e78e51620251705b097cac0e4207aedd335e474))
* **timepicker:** added meredianChange output with current meredian value ([#6256](https://github.com/valor-software/ngx-bootstrap/issues/6256)) ([653e4c4](https://github.com/valor-software/ngx-bootstrap/commit/653e4c4c8af1be1655ac9c35a38440eae58e03c5))



# [7.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v7.0.1...v7.1.0) (2021-08-27)


### Features

* **core:** added bootstrap5 support ([#6115](https://github.com/valor-software/ngx-bootstrap/issues/6115)) ([29c1e27](https://github.com/valor-software/ngx-bootstrap/commit/29c1e27b19d9dac9773f50e07355bb8d2f03113e))



## [7.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v7.0.0...v7.0.1) (2021-08-26)


### Bug Fixes

* **accordion:** fix isOpenChangeevent ([#6254](https://github.com/valor-software/ngx-bootstrap/issues/6254)) ([51808da](https://github.com/valor-software/ngx-bootstrap/commit/51808daf6befeaf0ef7d695e0299cc606f9cfb6f))
* **documentation:** fix cdn links for bs4 ([#6215](https://github.com/valor-software/ngx-bootstrap/issues/6215)) ([a929485](https://github.com/valor-software/ngx-bootstrap/commit/a929485bf3142e70cfdf2d366aa833ab3a2e00d9))
* **popover:** add fallback value if parseFloat on css fails ([69f68bd](https://github.com/valor-software/ngx-bootstrap/commit/69f68bdc8d7957b5a2005000f9454c9389914250))
* **typeahead:** need to check if `_matches` is not undefined in the `blur` handler ([#6028](https://github.com/valor-software/ngx-bootstrap/issues/6028)) ([c0beddb](https://github.com/valor-software/ngx-bootstrap/commit/c0beddba14d5e1caca1dde298e08b390e7f91fd7))


### Features

* **modal:** edited id type ([b6bb985](https://github.com/valor-software/ngx-bootstrap/commit/b6bb985beeda9b39130b38bac5fd4472140e04d5))



# [7.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v6.2.0...v7.0.0) (2021-07-21)


### Bug Fixes

* **build:** dropdown selector for ng12 cli build false positive issue ([#6208](https://github.com/valor-software/ngx-bootstrap/issues/6208)) ([95f7244](https://github.com/valor-software/ngx-bootstrap/commit/95f72441b4736bc4b7363026c3ce013e43b35e11))
* **buttons:** fixes btnRadioGroup emits value changes twice ([7fd0f96](https://github.com/valor-software/ngx-bootstrap/commit/7fd0f96924d46b5b72f434e86d91700a2eb9a63b)), closes [#5958](https://github.com/valor-software/ngx-bootstrap/issues/5958)
* **carousel:** go to a previous slide ([902033c](https://github.com/valor-software/ngx-bootstrap/commit/902033ce8f18502bd712226444cad792bf0642f1))
* **ci:** fix latest & next builds 'Unknown ver 76 of Android' error ([#5997](https://github.com/valor-software/ngx-bootstrap/issues/5997)) ([b4c3046](https://github.com/valor-software/ngx-bootstrap/commit/b4c3046656ef778c3386405860a37eedf15b5c3b))
* **datepicker:**  ranges and  max date ([#6156](https://github.com/valor-software/ngx-bootstrap/issues/6156)) ([fe2bb28](https://github.com/valor-software/ngx-bootstrap/commit/fe2bb28418a3c6cbef81c45da7fa6f1eb10c6001))
* **datepicker:** add maxDate value handling in maxDateRanges logic ([#6033](https://github.com/valor-software/ngx-bootstrap/issues/6033)) ([a37d845](https://github.com/valor-software/ngx-bootstrap/commit/a37d845f50fa62502b7db483c147e29939f57408))
* **datepicker:** avoid mutating value in daterangepicker ([#6035](https://github.com/valor-software/ngx-bootstrap/issues/6035)) ([ca66023](https://github.com/valor-software/ngx-bootstrap/commit/ca660238df82a8a59835db1584f37cc324eff016)), closes [#6034](https://github.com/valor-software/ngx-bootstrap/issues/6034)
* **datepicker:** fix button custom range ([#6148](https://github.com/valor-software/ngx-bootstrap/issues/6148)) ([a3b8a0a](https://github.com/valor-software/ngx-bootstrap/commit/a3b8a0af5ffd9428db6993f40a6954422ec92685))
* **datepicker:** fix multiple calendars with min-mode [#6104](https://github.com/valor-software/ngx-bootstrap/issues/6104) ([#6134](https://github.com/valor-software/ngx-bootstrap/issues/6134)) ([ae02750](https://github.com/valor-software/ngx-bootstrap/commit/ae02750ef92beff127ecc4892c0004f5510d0283))
* **datepicker:** fix navigation buttons in datepicker styles ([#6171](https://github.com/valor-software/ngx-bootstrap/issues/6171)) ([ec809cc](https://github.com/valor-software/ngx-bootstrap/commit/ec809ccc15f133214ef5fa7ffd3fca568832d8c6))
* **datepicker:** right arrow ([#6160](https://github.com/valor-software/ngx-bootstrap/issues/6160)) ([7735c87](https://github.com/valor-software/ngx-bootstrap/commit/7735c87904564f1391cc91cca70f78d19095c6c5))
* **datepicker:** setting initial state of datepicker via bsValue ([#6121](https://github.com/valor-software/ngx-bootstrap/issues/6121)) ([ea62fb9](https://github.com/valor-software/ngx-bootstrap/commit/ea62fb950f036c974dca794d0553937666f26ca5))
* **datepicker:** update the BsDatepicker's current time to the time at selection ([bc188d6](https://github.com/valor-software/ngx-bootstrap/commit/bc188d69bf17010dadd924673bfa13eef3944833))
* **discover:** add two new companies ([5385279](https://github.com/valor-software/ngx-bootstrap/commit/53852797504818cf91608641af1155b2b68c217a))
* **dropdown:** fix default value of displaying ([#6146](https://github.com/valor-software/ngx-bootstrap/issues/6146)) ([2224b5f](https://github.com/valor-software/ngx-bootstrap/commit/2224b5f1f4494be15c572507203961c2f0f4a2dc))
* **e2e:** fix e2e tests ([#6200](https://github.com/valor-software/ngx-bootstrap/issues/6200)) ([e68cc3c](https://github.com/valor-software/ngx-bootstrap/commit/e68cc3cabf587ff5c8a48e6b7cfc5bf4d9389a8b))
* **gh-page:** fix GitHub 404 page ([#6194](https://github.com/valor-software/ngx-bootstrap/issues/6194)) ([976edd3](https://github.com/valor-software/ngx-bootstrap/commit/976edd3d58cb0452989f594ae7d0dc3a564792ce))
* **gh-page:** fix github 404 page ([#6199](https://github.com/valor-software/ngx-bootstrap/issues/6199)) ([cf29ddc](https://github.com/valor-software/ngx-bootstrap/commit/cf29ddca502efdb21d33988aad549dc9f29461f5))
* **gh-page:** GitHub 404 page ([#6198](https://github.com/valor-software/ngx-bootstrap/issues/6198)) ([a6f04e6](https://github.com/valor-software/ngx-bootstrap/commit/a6f04e63efed96586627989b2a45c5dd28db07f8))
* **modal:** fix the closure of modal when clicking of scrollbar in some browsers ([6972d53](https://github.com/valor-software/ngx-bootstrap/commit/6972d536e55d450da4b20994c9eafbf8e1825ec0))
* **modal:** rollback on breaking function renaming ([e6d61b9](https://github.com/valor-software/ngx-bootstrap/commit/e6d61b91063d24ce33ac3fe3ca7570526e8010fb))
* **pagination:** fix default values for align in pager after applying strict mode ([0a52e00](https://github.com/valor-software/ngx-bootstrap/commit/0a52e00374e4e14a49a576a3ad48e5059f9e4888))
* **readme:** update slack button ([#6024](https://github.com/valor-software/ngx-bootstrap/issues/6024)) ([40662ee](https://github.com/valor-software/ngx-bootstrap/commit/40662eebc098ca5664e852169fc9b37a545f6d3d))
* **schematics:** fix schematics after npm testing ([#6211](https://github.com/valor-software/ngx-bootstrap/issues/6211)) ([92e72bd](https://github.com/valor-software/ngx-bootstrap/commit/92e72bd99bef7d654663a952d15c57e3bd533ac0))
* **schematics:** fixed schematics for ngx-bootstrap ([#6167](https://github.com/valor-software/ngx-bootstrap/issues/6167)) ([a51e916](https://github.com/valor-software/ngx-bootstrap/commit/a51e9163e622bfc3ddd23526379a310f16645096))
* **tests:** fix failed tests because of old HeadlessChrome ver. ([#6020](https://github.com/valor-software/ngx-bootstrap/issues/6020)) ([fb93e7d](https://github.com/valor-software/ngx-bootstrap/commit/fb93e7d12ae82a20a29374df9fa68519527d0798))
* **tests:** fixed tests for carousel, custom steps, rating, timepicker, modals, typeahead, pagination components ([#6100](https://github.com/valor-software/ngx-bootstrap/issues/6100)) ([66777d9](https://github.com/valor-software/ngx-bootstrap/commit/66777d920f386c95bc74a862acbae2fe36bddf3d))
* **top-menu:** fixed top logo in documentation ([#6163](https://github.com/valor-software/ngx-bootstrap/issues/6163)) ([76626ee](https://github.com/valor-software/ngx-bootstrap/commit/76626ee37db9b4238310dfe19694e0b609da8d3a))


### Features

* **accordion:** using dropdown(ngx-bootstrap) inside an accordion ([#6154](https://github.com/valor-software/ngx-bootstrap/issues/6154)) ([3947950](https://github.com/valor-software/ngx-bootstrap/commit/3947950be4543f0fdaff919d3b7a0b06d07fe51a))
* **bootstrap:** updated bootstrap 4.0.0 up to 4.5.3 ([#6206](https://github.com/valor-software/ngx-bootstrap/issues/6206)) ([67736e0](https://github.com/valor-software/ngx-bootstrap/commit/67736e09a9810d4beaddffe43af732b19fa5d7ee))
* **build:** full lifecycle update before v7 ([#6040](https://github.com/valor-software/ngx-bootstrap/issues/6040)) ([e8822ac](https://github.com/valor-software/ngx-bootstrap/commit/e8822ac6249f15f46d363f0c5d65bf02a473d719))
* **build:** update Angular to 11 ([#5883](https://github.com/valor-software/ngx-bootstrap/issues/5883)) ([b5e2539](https://github.com/valor-software/ngx-bootstrap/commit/b5e2539cf45abc0ec25055e7954cd7ff395ea4be))
* **datepicker:** add param to prevent change to next month after first date pick in right calendar ([#6058](https://github.com/valor-software/ngx-bootstrap/issues/6058)) ([2c671b6](https://github.com/valor-software/ngx-bootstrap/commit/2c671b625152da636bb88dca0f7116bfe18bf6f1))
* **datepicker:** improve manual DateRange input ([1d7adbd](https://github.com/valor-software/ngx-bootstrap/commit/1d7adbdc8d6f1a7d00ceae87759a5e7c7b791c18))
* **focus-trap:** add focus trap module ([#5634](https://github.com/valor-software/ngx-bootstrap/issues/5634)) ([8bcc900](https://github.com/valor-software/ngx-bootstrap/commit/8bcc90034cea685b9bebd64d27c85224ceb4edb7))
* **modal:** interception of closure for modal ([09c5b42](https://github.com/valor-software/ngx-bootstrap/commit/09c5b420fdd2813f62751d7ad8ba14cd3f360ed1))
* **schematics page:** add new page on docs site for schematics ([#6181](https://github.com/valor-software/ngx-bootstrap/issues/6181)) ([52083d4](https://github.com/valor-software/ngx-bootstrap/commit/52083d402da93075c942dbbfbcb33ca796272126))


### Performance Improvements

* **datepicker:** lint files ([3d81df5](https://github.com/valor-software/ngx-bootstrap/commit/3d81df5a36058ce9c707609624140dfcb21fd9b0))
* **datepicker:** unsubscribe open subscriptions on onDestroy hook ([3e37cd7](https://github.com/valor-software/ngx-bootstrap/commit/3e37cd73bdec2c27a351390c2c2ceb176ce552cd))



# [7.0.0-rc.5](https://github.com/valor-software/ngx-bootstrap/compare/v7.0.0-rc.4...v7.0.0-rc.5) (2021-07-20)


### Bug Fixes

* **schematics:** fix schematics after npm testing ([#6211](https://github.com/valor-software/ngx-bootstrap/issues/6211)) ([92e72bd](https://github.com/valor-software/ngx-bootstrap/commit/92e72bd99bef7d654663a952d15c57e3bd533ac0))



# [7.0.0-rc.4](https://github.com/valor-software/ngx-bootstrap/compare/v7.0.0-rc.1...v7.0.0-rc.4) (2021-07-19)


### Bug Fixes

* **build:** dropdown selector for ng12 cli build false positive issue ([#6208](https://github.com/valor-software/ngx-bootstrap/issues/6208)) ([95f7244](https://github.com/valor-software/ngx-bootstrap/commit/95f72441b4736bc4b7363026c3ce013e43b35e11))
* **datepicker:**  ranges and  max date ([#6156](https://github.com/valor-software/ngx-bootstrap/issues/6156)) ([fe2bb28](https://github.com/valor-software/ngx-bootstrap/commit/fe2bb28418a3c6cbef81c45da7fa6f1eb10c6001))
* **datepicker:** fix button custom range ([#6148](https://github.com/valor-software/ngx-bootstrap/issues/6148)) ([a3b8a0a](https://github.com/valor-software/ngx-bootstrap/commit/a3b8a0af5ffd9428db6993f40a6954422ec92685))
* **datepicker:** fix navigation buttons in datepicker styles ([#6171](https://github.com/valor-software/ngx-bootstrap/issues/6171)) ([ec809cc](https://github.com/valor-software/ngx-bootstrap/commit/ec809ccc15f133214ef5fa7ffd3fca568832d8c6))
* **discover:** add two new companies ([5385279](https://github.com/valor-software/ngx-bootstrap/commit/53852797504818cf91608641af1155b2b68c217a))
* **e2e:** fix e2e tests ([#6200](https://github.com/valor-software/ngx-bootstrap/issues/6200)) ([e68cc3c](https://github.com/valor-software/ngx-bootstrap/commit/e68cc3cabf587ff5c8a48e6b7cfc5bf4d9389a8b))
* **gh-page:** fix GitHub 404 page ([#6194](https://github.com/valor-software/ngx-bootstrap/issues/6194)) ([976edd3](https://github.com/valor-software/ngx-bootstrap/commit/976edd3d58cb0452989f594ae7d0dc3a564792ce))
* **gh-page:** fix github 404 page ([#6199](https://github.com/valor-software/ngx-bootstrap/issues/6199)) ([cf29ddc](https://github.com/valor-software/ngx-bootstrap/commit/cf29ddca502efdb21d33988aad549dc9f29461f5))
* **gh-page:** GitHub 404 page ([#6198](https://github.com/valor-software/ngx-bootstrap/issues/6198)) ([a6f04e6](https://github.com/valor-software/ngx-bootstrap/commit/a6f04e63efed96586627989b2a45c5dd28db07f8))
* **schematics:** fixed schematics for ngx-bootstrap ([#6167](https://github.com/valor-software/ngx-bootstrap/issues/6167)) ([a51e916](https://github.com/valor-software/ngx-bootstrap/commit/a51e9163e622bfc3ddd23526379a310f16645096))
* **top-menu:** fixed top logo in documentation ([#6163](https://github.com/valor-software/ngx-bootstrap/issues/6163)) ([76626ee](https://github.com/valor-software/ngx-bootstrap/commit/76626ee37db9b4238310dfe19694e0b609da8d3a))


### Features

* **accordion:** using dropdown(ngx-bootstrap) inside an accordion ([#6154](https://github.com/valor-software/ngx-bootstrap/issues/6154)) ([3947950](https://github.com/valor-software/ngx-bootstrap/commit/3947950be4543f0fdaff919d3b7a0b06d07fe51a))
* **bootstrap:** updated bootstrap 4.0.0 up to 4.5.3 ([#6206](https://github.com/valor-software/ngx-bootstrap/issues/6206)) ([67736e0](https://github.com/valor-software/ngx-bootstrap/commit/67736e09a9810d4beaddffe43af732b19fa5d7ee))
* **schematics page:** add new page on docs site for schematics ([#6181](https://github.com/valor-software/ngx-bootstrap/issues/6181)) ([52083d4](https://github.com/valor-software/ngx-bootstrap/commit/52083d402da93075c942dbbfbcb33ca796272126))



# [7.0.0-rc.3](https://github.com/valor-software/ngx-bootstrap/compare/v7.0.0-rc.1...v7.0.0-rc.3) (2021-07-08)


### Bug Fixes

* **datepicker:** fix button custom range ([#6148](https://github.com/valor-software/ngx-bootstrap/issues/6148)) ([a3b8a0a](https://github.com/valor-software/ngx-bootstrap/commit/a3b8a0af5ffd9428db6993f40a6954422ec92685))
* **datepicker:** fix navigation buttons in datepicker styles ([#6171](https://github.com/valor-software/ngx-bootstrap/issues/6171)) ([ec809cc](https://github.com/valor-software/ngx-bootstrap/commit/ec809ccc15f133214ef5fa7ffd3fca568832d8c6))
* **discover:** add two new companies ([5385279](https://github.com/valor-software/ngx-bootstrap/commit/53852797504818cf91608641af1155b2b68c217a))
* **gh-pages:** fix 404 gh page ([19fde75](https://github.com/valor-software/ngx-bootstrap/commit/19fde75cd960d6ecf361e64042109f1b56d8f3f7))
* **gh-pages:** use hash ([0d536a1](https://github.com/valor-software/ngx-bootstrap/commit/0d536a153bfe4ea9a1bbfedae16c31a7c4802793))
* **routing:** fix github 404 page ([a870a2b](https://github.com/valor-software/ngx-bootstrap/commit/a870a2bc9b62acb30d9f568ad0e2fb03a82a0d37))
* **routing:** move js into separate files ([8c18fbf](https://github.com/valor-software/ngx-bootstrap/commit/8c18fbf048bc31e8c1ddfe312496f748d647576d))
* **top-menu:** fixed top logo in documentation ([#6163](https://github.com/valor-software/ngx-bootstrap/issues/6163)) ([76626ee](https://github.com/valor-software/ngx-bootstrap/commit/76626ee37db9b4238310dfe19694e0b609da8d3a))


### Features

* **routing:** fix 404 github page ([ea1c07d](https://github.com/valor-software/ngx-bootstrap/commit/ea1c07da9e50f1572922f993deec614972b29db1))



# [7.0.0-rc.2](https://github.com/valor-software/ngx-bootstrap/compare/v7.0.0-rc.1...v7.0.0-rc.2) (2021-06-11)


### Bug Fixes

* **datepicker:** fix button custom range ([#6148](https://github.com/valor-software/ngx-bootstrap/issues/6148)) ([a3b8a0a](https://github.com/valor-software/ngx-bootstrap/commit/a3b8a0af5ffd9428db6993f40a6954422ec92685))
* **datepicker:** fix navigation buttons in datepicker styles ([#6171](https://github.com/valor-software/ngx-bootstrap/issues/6171)) ([ec809cc](https://github.com/valor-software/ngx-bootstrap/commit/ec809ccc15f133214ef5fa7ffd3fca568832d8c6))
* **discover:** add two new companies ([5385279](https://github.com/valor-software/ngx-bootstrap/commit/53852797504818cf91608641af1155b2b68c217a))
* **top-menu:** fixed top logo in documentation ([#6163](https://github.com/valor-software/ngx-bootstrap/issues/6163)) ([76626ee](https://github.com/valor-software/ngx-bootstrap/commit/76626ee37db9b4238310dfe19694e0b609da8d3a))



# [7.0.0-rc.1](https://github.com/valor-software/ngx-bootstrap/compare/v6.2.0...v7.0.0-rc.1) (2021-06-01)


### Bug Fixes

* **buttons:** fixes btnRadioGroup emits value changes twice ([7fd0f96](https://github.com/valor-software/ngx-bootstrap/commit/7fd0f96924d46b5b72f434e86d91700a2eb9a63b)), closes [#5958](https://github.com/valor-software/ngx-bootstrap/issues/5958)
* **carousel:** go to a previous slide ([902033c](https://github.com/valor-software/ngx-bootstrap/commit/902033ce8f18502bd712226444cad792bf0642f1))
* **ci:** fix latest & next builds 'Unknown ver 76 of Android' error ([#5997](https://github.com/valor-software/ngx-bootstrap/issues/5997)) ([b4c3046](https://github.com/valor-software/ngx-bootstrap/commit/b4c3046656ef778c3386405860a37eedf15b5c3b))
* **datepicker:** add maxDate value handling in maxDateRanges logic ([#6033](https://github.com/valor-software/ngx-bootstrap/issues/6033)) ([a37d845](https://github.com/valor-software/ngx-bootstrap/commit/a37d845f50fa62502b7db483c147e29939f57408))
* **datepicker:** avoid mutating value in daterangepicker ([#6035](https://github.com/valor-software/ngx-bootstrap/issues/6035)) ([ca66023](https://github.com/valor-software/ngx-bootstrap/commit/ca660238df82a8a59835db1584f37cc324eff016)), closes [#6034](https://github.com/valor-software/ngx-bootstrap/issues/6034)
* **datepicker:** fix multiple calendars with min-mode [#6104](https://github.com/valor-software/ngx-bootstrap/issues/6104) ([#6134](https://github.com/valor-software/ngx-bootstrap/issues/6134)) ([ae02750](https://github.com/valor-software/ngx-bootstrap/commit/ae02750ef92beff127ecc4892c0004f5510d0283))
* **datepicker:** right arrow ([#6160](https://github.com/valor-software/ngx-bootstrap/issues/6160)) ([7735c87](https://github.com/valor-software/ngx-bootstrap/commit/7735c87904564f1391cc91cca70f78d19095c6c5))
* **datepicker:** setting initial state of datepicker via bsValue ([#6121](https://github.com/valor-software/ngx-bootstrap/issues/6121)) ([ea62fb9](https://github.com/valor-software/ngx-bootstrap/commit/ea62fb950f036c974dca794d0553937666f26ca5))
* **datepicker:** update the BsDatepicker's current time to the time at selection ([bc188d6](https://github.com/valor-software/ngx-bootstrap/commit/bc188d69bf17010dadd924673bfa13eef3944833))
* **dropdown:** fix default value of displaying ([#6146](https://github.com/valor-software/ngx-bootstrap/issues/6146)) ([2224b5f](https://github.com/valor-software/ngx-bootstrap/commit/2224b5f1f4494be15c572507203961c2f0f4a2dc))
* **modal:** fix the closure of modal when clicking of scrollbar in some browsers ([6972d53](https://github.com/valor-software/ngx-bootstrap/commit/6972d536e55d450da4b20994c9eafbf8e1825ec0))
* **modal:** rollback on breaking function renaming ([e6d61b9](https://github.com/valor-software/ngx-bootstrap/commit/e6d61b91063d24ce33ac3fe3ca7570526e8010fb))
* **pagination:** fix default values for align in pager after applying strict mode ([0a52e00](https://github.com/valor-software/ngx-bootstrap/commit/0a52e00374e4e14a49a576a3ad48e5059f9e4888))
* **readme:** update slack button ([#6024](https://github.com/valor-software/ngx-bootstrap/issues/6024)) ([40662ee](https://github.com/valor-software/ngx-bootstrap/commit/40662eebc098ca5664e852169fc9b37a545f6d3d))
* **tests:** fix failed tests because of old HeadlessChrome ver. ([#6020](https://github.com/valor-software/ngx-bootstrap/issues/6020)) ([fb93e7d](https://github.com/valor-software/ngx-bootstrap/commit/fb93e7d12ae82a20a29374df9fa68519527d0798))
* **tests:** fixed tests for carousel, custom steps, rating, timepicker, modals, typeahead, pagination components ([#6100](https://github.com/valor-software/ngx-bootstrap/issues/6100)) ([66777d9](https://github.com/valor-software/ngx-bootstrap/commit/66777d920f386c95bc74a862acbae2fe36bddf3d))


### Features

* **build:** full lifecycle update before v7 ([#6040](https://github.com/valor-software/ngx-bootstrap/issues/6040)) ([e8822ac](https://github.com/valor-software/ngx-bootstrap/commit/e8822ac6249f15f46d363f0c5d65bf02a473d719))
* **build:** update Angular to 11 ([#5883](https://github.com/valor-software/ngx-bootstrap/issues/5883)) ([b5e2539](https://github.com/valor-software/ngx-bootstrap/commit/b5e2539cf45abc0ec25055e7954cd7ff395ea4be))
* **datepicker:** add param to prevent change to next month after first date pick in right calendar ([#6058](https://github.com/valor-software/ngx-bootstrap/issues/6058)) ([2c671b6](https://github.com/valor-software/ngx-bootstrap/commit/2c671b625152da636bb88dca0f7116bfe18bf6f1))
* **datepicker:** improve manual DateRange input ([1d7adbd](https://github.com/valor-software/ngx-bootstrap/commit/1d7adbdc8d6f1a7d00ceae87759a5e7c7b791c18))
* **focus-trap:** add focus trap module ([#5634](https://github.com/valor-software/ngx-bootstrap/issues/5634)) ([8bcc900](https://github.com/valor-software/ngx-bootstrap/commit/8bcc90034cea685b9bebd64d27c85224ceb4edb7))
* **modal:** interception of closure for modal ([09c5b42](https://github.com/valor-software/ngx-bootstrap/commit/09c5b420fdd2813f62751d7ad8ba14cd3f360ed1))


### Performance Improvements

* **datepicker:** lint files ([3d81df5](https://github.com/valor-software/ngx-bootstrap/commit/3d81df5a36058ce9c707609624140dfcb21fd9b0))
* **datepicker:** unsubscribe open subscriptions on onDestroy hook ([3e37cd7](https://github.com/valor-software/ngx-bootstrap/commit/3e37cd73bdec2c27a351390c2c2ceb176ce552cd))



# [6.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v6.1.0...v6.2.0) (2020-11-06)


### Bug Fixes

* **build:** fix latest & next test builds ([f94bd1d](https://github.com/valor-software/ngx-bootstrap/commit/f94bd1df6841d176739810d7e2b8e316189a5928))
* **datepicker:** fix TypeError when clearing daterange with active showPreviousMonth option ([7b5ea3d](https://github.com/valor-software/ngx-bootstrap/commit/7b5ea3dce8ee067362f119fbb04f62c239aa4e51))
* **datepicker:** translate the fixed buttons ('today', 'clear', 'custom range') [#5896](https://github.com/valor-software/ngx-bootstrap/issues/5896) ([dbf958e](https://github.com/valor-software/ngx-bootstrap/commit/dbf958e11ee7c649ce20ab03b230f067fe1ec69c))
* **demo:** fix stackblitz build, fix core-js not correct version ([#5956](https://github.com/valor-software/ngx-bootstrap/issues/5956)) ([61c6924](https://github.com/valor-software/ngx-bootstrap/commit/61c692451b48e3b690ec3d994589f05f7e8e3373))
* **modal:** change method call sequence ([#5944](https://github.com/valor-software/ngx-bootstrap/issues/5944)) ([f5e79c8](https://github.com/valor-software/ngx-bootstrap/commit/f5e79c855be39f7adc237604f6dcea0daaae15d8))
* **modal:** change to add Dismiss Reason on modal hide with back click ([#5942](https://github.com/valor-software/ngx-bootstrap/issues/5942)) ([bf25a11](https://github.com/valor-software/ngx-bootstrap/commit/bf25a1159057679e707c20067d9217be31bf3139))
* **modal:** set random value in `config.id` if it doesn't have any value ([68bd7cc](https://github.com/valor-software/ngx-bootstrap/commit/68bd7cc45558eefb0e0fde9ad4ba3f8e96d7c52c))
* **modal.service:** typo error (should compare id value) ([e73d0ab](https://github.com/valor-software/ngx-bootstrap/commit/e73d0ab99f3b56104573577de1c202bf6c1851af))
* **progressbar:** add aria-valuemax fix ([b838326](https://github.com/valor-software/ngx-bootstrap/commit/b83832617497ff9ca41d2bab7466955c597b0e40))


### Features

* **ci:** add firebase preview to PRs ([#5970](https://github.com/valor-software/ngx-bootstrap/issues/5970)) ([b7a03cc](https://github.com/valor-software/ngx-bootstrap/commit/b7a03cc8283dde58c5004348e0e60d4afd018854))
* **datepicker:** add startview to datepicker ([#5816](https://github.com/valor-software/ngx-bootstrap/issues/5816)) ([37e33ea](https://github.com/valor-software/ngx-bootstrap/commit/37e33ea8c8392a10219c12b3b1382c1f5ef2714e))
* **datepicker:** add theming to Show and Clear buttons ([#5959](https://github.com/valor-software/ngx-bootstrap/issues/5959)) ([313fe90](https://github.com/valor-software/ngx-bootstrap/commit/313fe909dbe2080adea75036b96cc0fd72e266c7))
* **modal:** add test case for id unspecified case in config (ModalOptions) ([7f0e30a](https://github.com/valor-software/ngx-bootstrap/commit/7f0e30aa19cc7314353895f5bb95c5b72973a4ca))
* **Modal:** enable type-checking for BsModalRef.content & ModalOptions.initialState ([9583752](https://github.com/valor-software/ngx-bootstrap/commit/9583752553248fff36685e7cd3ccae92b7892cc3))



# [6.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v6.0.0...v6.1.0) (2020-08-28)


### Bug Fixes

* **build:** small updates to docs ([8f7b5cb](https://github.com/valor-software/ngx-bootstrap/commit/8f7b5cbe4cb779a9cbf456b83b7f797f28626509))
* **core:** don't ship an Ivy compiled library ([#5915](https://github.com/valor-software/ngx-bootstrap/issues/5915)) ([277e86d](https://github.com/valor-software/ngx-bootstrap/commit/277e86df1bdce81ab575236c771bf60fe2a3335a)), closes [#5862](https://github.com/valor-software/ngx-bootstrap/issues/5862)
* **datepicker:** apply date format appropriately ([699f35a](https://github.com/valor-software/ngx-bootstrap/commit/699f35a73efcb29f8bd49c5ae910c9570346a86c))
* **datepicker:** fix active state for years  & months in min mode for daterange ([38f243f](https://github.com/valor-software/ngx-bootstrap/commit/38f243f043c8449475074034160c6466a4b0e83a))
* **datepicker:** fix css issue when showWeekNumbers=false for daterangepicker ([16dc65e](https://github.com/valor-software/ngx-bootstrap/commit/16dc65e2f26681915779d897baef2314c22291c2))
* **datepicker:** fix daterangerpicker min-max doesn't work correct ([94f5975](https://github.com/valor-software/ngx-bootstrap/commit/94f59750b25ffc1c2b829207da986fab4a6c32a7))
* **datepicker:** fix padding for additional buttons block ([0b6fd99](https://github.com/valor-software/ngx-bootstrap/commit/0b6fd99ae1001c606ee6d76e419a24ee4a467baf))
* **datepicker:** fix Safari macOS hover issue ([5de757f](https://github.com/valor-software/ngx-bootstrap/commit/5de757f43a993681767373a9a1da3403cc217c5a))
* **doc:** remove conflicted doc props ([4c685b5](https://github.com/valor-software/ngx-bootstrap/commit/4c685b59a6825770db1d0bb0c49e953e3cec8206))
* **modal:** remove the delay before hiding the modal ([089738d](https://github.com/valor-software/ngx-bootstrap/commit/089738d4e6ddb5f2c86aba715059a71d44906ddf))
* **modal:** rework demo & docs about modal events and onHide behaviour ([063f617](https://github.com/valor-software/ngx-bootstrap/commit/063f617b2945d6db998e7303c038597aaf6cdc52))
* **popoper:** fix memory leak in popover ([a0e945b](https://github.com/valor-software/ngx-bootstrap/commit/a0e945b7ccf1de14cc272a154d84058bf6213974))
* **popover:** fix safari dismiss popover issue ([f57fb41](https://github.com/valor-software/ngx-bootstrap/commit/f57fb41a18b346575835d5dba728e1faf190a145))
* **tabs-demo:** fix imports ([5a29054](https://github.com/valor-software/ngx-bootstrap/commit/5a29054fdf7de3cd91f1686c2bc4c3c24f4e1f77))
* **tests:** fix e2e selector ([7b8cd50](https://github.com/valor-software/ngx-bootstrap/commit/7b8cd50b9cf5d55bfc0c7183c49b117267b31f65))
* **tests:** fix e2e tests ([e433a2c](https://github.com/valor-software/ngx-bootstrap/commit/e433a2c9c4007fb6e0dc4aad2f3fded781c25f77))
* **timepicker:** add additional check while changing hours ([d87c878](https://github.com/valor-software/ngx-bootstrap/commit/d87c878f791c676770093f6943713e2640c5afc5)), closes [#3751](https://github.com/valor-software/ngx-bootstrap/issues/3751)
* **timepicker:** update incrementHours logic ([ac8f109](https://github.com/valor-software/ngx-bootstrap/commit/ac8f1096e5128f88e52bf0595f4a2110122bc5bb))
* **typeahead:** fix accessability arias ([6a5df49](https://github.com/valor-software/ngx-bootstrap/commit/6a5df49a9138a9c9c69119bae2b64bca1334f4f0))
* adding clear button for datepicker ([a304702](https://github.com/valor-software/ngx-bootstrap/commit/a304702580f23bca37a7fea6b20c4a83f27a07d3))


### Features

* **datepicker:** add ability to use min mode correctly in daterangepicker ([420620f](https://github.com/valor-software/ngx-bootstrap/commit/420620f91e0a46617450c6194662902b656eebcb))
* **datepicker:** add tooltip module to datepicker module, use it as a tooltip ([620081d](https://github.com/valor-software/ngx-bootstrap/commit/620081d0382efbb79eb9250c6d4146ce3a801002))
* **datepicker:** max date range for daterangepicker ([#5562](https://github.com/valor-software/ngx-bootstrap/issues/5562)) ([#5684](https://github.com/valor-software/ngx-bootstrap/issues/5684)) ([539dc28](https://github.com/valor-software/ngx-bootstrap/commit/539dc28e4584754f2a0feee3073353f6159885c2))
* **modal:** Expose onHide and onHidden for ModalRef ([481c058](https://github.com/valor-software/ngx-bootstrap/commit/481c058f2c649b1f3ffdc4a9600394b3b9662c9e))
* **modal:** modal show return id and bsModalRef contain id ([#4254](https://github.com/valor-software/ngx-bootstrap/issues/4254)) ([730261b](https://github.com/valor-software/ngx-bootstrap/commit/730261b20000500335b272d4e9000ec93007585f))
* **Modal:** available to use 'BsModalRef.setClass' in modal component ngOnInit lifecycle ([573ecf8](https://github.com/valor-software/ngx-bootstrap/commit/573ecf8e239426c8651c9587e282540307f0be22))
* **tooltip/datepicker:** add demo, fix issue with wrong data binding ([2252c80](https://github.com/valor-software/ngx-bootstrap/commit/2252c8045a14014d72dcf72d8b4364963fa1dbb8))
* **typeahead:** add feature to do multiple search w/ specified delimiter ([c03b229](https://github.com/valor-software/ngx-bootstrap/commit/c03b2297d1aab7f0b3c15a5c5a1cc737d97c496b)), closes [#5781](https://github.com/valor-software/ngx-bootstrap/issues/5781) [#5781](https://github.com/valor-software/ngx-bootstrap/issues/5781)



# [6.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.7.0...v6.0.0) (2020-07-10)


### Bug Fixes

* **ci:** make all SSR-related jobs as optional ([#5850](https://github.com/valor-software/ngx-bootstrap/issues/5850)) ([655215d](https://github.com/valor-software/ngx-bootstrap/commit/655215d402f4f632c37c004e8795e2ae745decaa))
* **ci:** potential fix for SSR cypress failures ([#5847](https://github.com/valor-software/ngx-bootstrap/issues/5847)) ([f975df2](https://github.com/valor-software/ngx-bootstrap/commit/f975df2e94c4e460c1878bbedddcac289f0158ca))
* **ci:** remove ivy-related configs & checks, because, ivy is enabled by default ([44146fd](https://github.com/valor-software/ngx-bootstrap/commit/44146fdca94a5dc47d3c078de30580c14e483803))
* **datepicker:** fix wrong condition for iOS double tap ([335437e](https://github.com/valor-software/ngx-bootstrap/commit/335437e12969a74f6432a80249504480e7a124d2))
* **demo:** fix random undefined errors for examples ([628e850](https://github.com/valor-software/ngx-bootstrap/commit/628e85001efddd81f989f2fc028c77e3f5153972))
* **docs:** add info about version support ([fece3c8](https://github.com/valor-software/ngx-bootstrap/commit/fece3c8a39cb4eb7f7f6fef2b2f0c67ee9532867))
* **tests:** fix failed e2e tab tests because of removal ([cce5dc9](https://github.com/valor-software/ngx-bootstrap/commit/cce5dc994ad7d9cc25334958c0a6d730ac267f1c))


### Features

* **build:** update to Angular 9.0.0 (WIP) ([88db469](https://github.com/valor-software/ngx-bootstrap/commit/88db46977e12c5647a2d6ae0a768e6aaffa08769))
* **ci:** update to 9.1.0 ([764786c](https://github.com/valor-software/ngx-bootstrap/commit/764786ce204de950ab8739e87bbefb9a16d8d84e))
* **common:** update dependencies to support angular 10 ([#5833](https://github.com/valor-software/ngx-bootstrap/issues/5833)) ([7f5c340](https://github.com/valor-software/ngx-bootstrap/commit/7f5c3406d76e56bfdde16f03d50916802afb49bf))


### Reverts

* Revert "fix(ci): potential fix for SSR cypress failures (#5847)" (#5849) ([4cc35c5](https://github.com/valor-software/ngx-bootstrap/commit/4cc35c533a17366b0937cb5b5f1bc94008903792)), closes [#5847](https://github.com/valor-software/ngx-bootstrap/issues/5847) [#5849](https://github.com/valor-software/ngx-bootstrap/issues/5849)



# [5.7.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.6.2...v5.7.0) (2020-06-30)


### Bug Fixes

* **common:** fix next ver issue with moduleWithProviders ([#5812](https://github.com/valor-software/ngx-bootstrap/issues/5812)) ([e2ef559](https://github.com/valor-software/ngx-bootstrap/commit/e2ef5590e56ab453876d20499eaa149774a26cd5))
* **datepicker:** double tap ios issue ([#5821](https://github.com/valor-software/ngx-bootstrap/issues/5821)) ([955cb93](https://github.com/valor-software/ngx-bootstrap/commit/955cb93366be726ab359af61d29fb3dd3fdf4d0a))
* **datepicker:** issue [#5790](https://github.com/valor-software/ngx-bootstrap/issues/5790) and [#5793](https://github.com/valor-software/ngx-bootstrap/issues/5793) ([#5817](https://github.com/valor-software/ngx-bootstrap/issues/5817)) ([1dc5308](https://github.com/valor-software/ngx-bootstrap/commit/1dc5308512542bdb725bd82e18a8ad8b00d7725a))
* **modal:** Close modal on back button click ([735c197](https://github.com/valor-software/ngx-bootstrap/commit/735c19712c706adc69280cc3e008a4b2359285ae))
* **typeahead:** fix error on blur after init ([ceeed10](https://github.com/valor-software/ngx-bootstrap/commit/ceeed106d0466330f72ab6143804b99c9652a3e5)), closes [#5736](https://github.com/valor-software/ngx-bootstrap/issues/5736)
* **typeahead:** fix typo to cancel request on focus lost ([#5593](https://github.com/valor-software/ngx-bootstrap/issues/5593)), ([#4622](https://github.com/valor-software/ngx-bootstrap/issues/4622)), ([#1884](https://github.com/valor-software/ngx-bootstrap/issues/1884)) ([29a44e0](https://github.com/valor-software/ngx-bootstrap/commit/29a44e02b6175840aee8606ec5ee9ae1804d12f1))


### Features

* **datepicker:** Add optional "today" button ([#5786](https://github.com/valor-software/ngx-bootstrap/issues/5786)) ([41e7a0b](https://github.com/valor-software/ngx-bootstrap/commit/41e7a0b21e3377ade48e61c93419b734dbc3299d))
* **modal:** add ability to inject default modal options ([#4222](https://github.com/valor-software/ngx-bootstrap/issues/4222)) ([2c1b2bd](https://github.com/valor-software/ngx-bootstrap/commit/2c1b2bd56233bcc37c09ffe583d10f6b0acb3f18))



## [5.6.2](https://github.com/valor-software/ngx-bootstrap/compare/v5.6.1...v5.6.2) (2020-04-10)


### Bug Fixes

* **datepicker:** fix production build issue  [#5730](https://github.com/valor-software/ngx-bootstrap/issues/5730) ([b14d3e7](https://github.com/valor-software/ngx-bootstrap/commit/b14d3e7cbeaa66be76da74b26ad8a32623b95de1))
* **dropdown:** add small delay for animation, to avoid issue with ngFor ([4744514](https://github.com/valor-software/ngx-bootstrap/commit/4744514cd6c794e8bcc401ec81664234285800f4))



## [5.6.1](https://github.com/valor-software/ngx-bootstrap/compare/v5.6.0...v5.6.1) (2020-03-31)


### Bug Fixes

* **ci:** update typescript ver in latest script, to fix build ([8b420a5](https://github.com/valor-software/ngx-bootstrap/commit/8b420a507b8d51dde9c1319368bcb3e9d4bffc39))
* **datepicker:**  remove spread operator from datepicker module ([6047bce](https://github.com/valor-software/ngx-bootstrap/commit/6047bcece88162e508f76e2b091d66badd682eca))
* **typeahead:** add variable which was missed in MR [#5547](https://github.com/valor-software/ngx-bootstrap/issues/5547) ([09f1270](https://github.com/valor-software/ngx-bootstrap/commit/09f12701b510ad38ed3108fb98b42077ee686b33))



# [5.6.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.5.0...v5.6.0) (2020-03-19)


### Bug Fixes

* **accordion, collapse:** fix according animation with collapse ([#5688](https://github.com/valor-software/ngx-bootstrap/issues/5688)) ([23800f5](https://github.com/valor-software/ngx-bootstrap/commit/23800f5d296e389df64555a54d83a083f105b7e5))
* **build:** fix latest deploy job ([#5652](https://github.com/valor-software/ngx-bootstrap/issues/5652)) ([1f1e145](https://github.com/valor-software/ngx-bootstrap/commit/1f1e14504bfd4afc113cf5b2adfd867e8ac0b73f))
* **buttons:** fix disabled state for radio button ([#5610](https://github.com/valor-software/ngx-bootstrap/issues/5610)) ([d626faf](https://github.com/valor-software/ngx-bootstrap/commit/d626faf0973fbce3040b006eede1456f1d895ce6)), closes [#5140](https://github.com/valor-software/ngx-bootstrap/issues/5140)
* **chore ci:** change sourceRoot to deepen ng cli run scope, add ampe… ([#5674](https://github.com/valor-software/ngx-bootstrap/issues/5674)) ([198cdf1](https://github.com/valor-software/ngx-bootstrap/commit/198cdf174a041c7bece0c774a5fe6f090c0c1c49))
* **ci:** update next stage build dependencies & scripts ([#5696](https://github.com/valor-software/ngx-bootstrap/issues/5696)) ([db2a21d](https://github.com/valor-software/ngx-bootstrap/commit/db2a21d5bed96b5f83a1584ebdda5edcbc576ce1))
* **ci:** update TS version in scripts (fix jobs with latest/next envs) ([#5712](https://github.com/valor-software/ngx-bootstrap/issues/5712)) ([5b568b9](https://github.com/valor-software/ngx-bootstrap/commit/5b568b96dcfbddfcb5916163ec2d4d0a5f04a471))
* **collapse:** "Collapse" component breaks "Dropdown component [#5625](https://github.com/valor-software/ngx-bootstrap/issues/5625) ([#5626](https://github.com/valor-software/ngx-bootstrap/issues/5626)) ([0b4721d](https://github.com/valor-software/ngx-bootstrap/commit/0b4721d308cca2f88ef895c59a5be650aa4b9d8e))
* **collapse:** remove overflow hidden on show ([#5649](https://github.com/valor-software/ngx-bootstrap/issues/5649)) ([3e9046f](https://github.com/valor-software/ngx-bootstrap/commit/3e9046f63f15ae8716fa02ec33f93b09b7d9c2b5)), closes [#5625](https://github.com/valor-software/ngx-bootstrap/issues/5625) [#5369](https://github.com/valor-software/ngx-bootstrap/issues/5369)
* **collapse-demo:** add default value for message ([#5659](https://github.com/valor-software/ngx-bootstrap/issues/5659)) ([df45dce](https://github.com/valor-software/ngx-bootstrap/commit/df45dcec5bb851191837bc62ef1194b6fb8760b2))
* **common:** fix ci latest ([#5650](https://github.com/valor-software/ngx-bootstrap/issues/5650)) ([7fc365e](https://github.com/valor-software/ngx-bootstrap/commit/7fc365e92479fa01ed5211b7fa402a2a50f50ee6))
* **common:** remove common module for fixing latest ng ver build ([#5658](https://github.com/valor-software/ngx-bootstrap/issues/5658)) ([cb3abf0](https://github.com/valor-software/ngx-bootstrap/commit/cb3abf0af09014e4f9f9df6dfe9f364bc18258e1))
* **datepicker:** change isOpen setter flow ([#5035](https://github.com/valor-software/ngx-bootstrap/issues/5035)) ([#5082](https://github.com/valor-software/ngx-bootstrap/issues/5082)) ([09354e6](https://github.com/valor-software/ngx-bootstrap/commit/09354e6cf280007a6994698e434dd954753ea8ad))
* **datepicker:** datepicker not closed on Enter click in IE11 ([#5641](https://github.com/valor-software/ngx-bootstrap/issues/5641)) ([2b2f5de](https://github.com/valor-software/ngx-bootstrap/commit/2b2f5de01ab43a7af6aa89b138c9a53cf97c9906))
* **datepicker:** fix updating prop values for inline date/daterange pickers ([#5681](https://github.com/valor-software/ngx-bootstrap/issues/5681)) ([54f67ff](https://github.com/valor-software/ngx-bootstrap/commit/54f67ff12f6712cc0c54c8fe7350868a1b46abbc))
* **datepicker:** Thai Buddish calendar on Datepicker show wrong on leap year  [#5679](https://github.com/valor-software/ngx-bootstrap/issues/5679) ([#5715](https://github.com/valor-software/ngx-bootstrap/issues/5715)) ([4bd2510](https://github.com/valor-software/ngx-bootstrap/commit/4bd25105dde2e2ba4a50751b2ac9d63f0913aaef))
* **dropdown:** add z-index for dropdown to not be overrided by modal ([#5627](https://github.com/valor-software/ngx-bootstrap/issues/5627)) ([220dc4a](https://github.com/valor-software/ngx-bootstrap/commit/220dc4aa4789afc76c32346b0bb01e3ffbc797ac))
* **local build:** fix issue with crashing demo build after changing in source code of components ([#5670](https://github.com/valor-software/ngx-bootstrap/issues/5670)) ([269698a](https://github.com/valor-software/ngx-bootstrap/commit/269698ac2cefc13d7e1124e006ad7b2832403839))
* **scripts:** add bunch of scripts related to only latest env, to avoid issues with build on travis and local rebuild ([#5671](https://github.com/valor-software/ngx-bootstrap/issues/5671)) ([772f5f9](https://github.com/valor-software/ngx-bootstrap/commit/772f5f96c899dc3e8eac1e509108cfac15a2d55e))
* **tests:** fix broken datepicker e2e, exclude progressbar e2e, to avoid travis fail on latest ([#5664](https://github.com/valor-software/ngx-bootstrap/issues/5664)) ([1b16704](https://github.com/valor-software/ngx-bootstrap/commit/1b167045968e956094de4253c6f8a00948a40ad3))
* **tests:** fix broken typeahead saucelab test ([#5621](https://github.com/valor-software/ngx-bootstrap/issues/5621)) ([c45c3ae](https://github.com/valor-software/ngx-bootstrap/commit/c45c3ae2da1f01eb7f8f4039c37e4b92b08ededa))
* **tests:** fix e2e tests for the Typeahead demo ([#5644](https://github.com/valor-software/ngx-bootstrap/issues/5644)) ([690f836](https://github.com/valor-software/ngx-bootstrap/commit/690f83670a20cf3e2bf6b71bf53222669277f775))
* **tooltip:** fix tooltip appearing after it has been destroyed ([#5217](https://github.com/valor-software/ngx-bootstrap/issues/5217)) ([#5548](https://github.com/valor-software/ngx-bootstrap/issues/5548)) ([db437f3](https://github.com/valor-software/ngx-bootstrap/commit/db437f36502ab9446230db26977d51e1dd50a1db))
* **travis:** fix typo in conditions ([#5673](https://github.com/valor-software/ngx-bootstrap/issues/5673)) ([a5f1d2d](https://github.com/valor-software/ngx-bootstrap/commit/a5f1d2db1be357256273fa567be4dc3d27bcac1f))
* **typeahead:** add typing for typeahead source data ([#5647](https://github.com/valor-software/ngx-bootstrap/issues/5647)) ([26aff71](https://github.com/valor-software/ngx-bootstrap/commit/26aff71f61ecf0181950779f2eaebb27cec5ad9e))
* **typeahead:** fix focus after leaving control ([#4622](https://github.com/valor-software/ngx-bootstrap/issues/4622)) ([#5593](https://github.com/valor-software/ngx-bootstrap/issues/5593)) ([1e43eba](https://github.com/valor-software/ngx-bootstrap/commit/1e43eba455b3500d570e4908557e0a3b1e3bf8dc))
* **typeahead:** fix updating model ([#5640](https://github.com/valor-software/ngx-bootstrap/issues/5640)) ([f2f8f45](https://github.com/valor-software/ngx-bootstrap/commit/f2f8f451158d26eb2556f4dcf729a46e979b4cd9)), closes [#5251](https://github.com/valor-software/ngx-bootstrap/issues/5251)
* **typeahead:** revert filter functionality ([#5651](https://github.com/valor-software/ngx-bootstrap/issues/5651)) ([ff361a4](https://github.com/valor-software/ngx-bootstrap/commit/ff361a4ddd6137ab0fee53d6dd7570789c3fd5dd)), closes [#5624](https://github.com/valor-software/ngx-bootstrap/issues/5624)


### Features

* **carousel:** add animation to carousel ([#5655](https://github.com/valor-software/ngx-bootstrap/issues/5655)) ([2c36e33](https://github.com/valor-software/ngx-bootstrap/commit/2c36e33b18da2643c2deeec5feb688290532609e)), closes [#281](https://github.com/valor-software/ngx-bootstrap/issues/281)
* **datepicker:** add ability to show one month for daterangepicker depend on max/min date value ([#5667](https://github.com/valor-software/ngx-bootstrap/issues/5667)) ([b405057](https://github.com/valor-software/ngx-bootstrap/commit/b405057af01a06b56e53f1bfe5a6d55dfa047ef1))
* **datepicker:** add enabledDates functionality ([#5645](https://github.com/valor-software/ngx-bootstrap/issues/5645)) ([e2cdbb3](https://github.com/valor-software/ngx-bootstrap/commit/e2cdbb30f1da0403707a2d319cbcaded3e5b04a0))
* **datepicker:** add quick select mode to date range picker ([#5262](https://github.com/valor-software/ngx-bootstrap/issues/5262)) ([#5580](https://github.com/valor-software/ngx-bootstrap/issues/5580)) ([4ba64f0](https://github.com/valor-software/ngx-bootstrap/commit/4ba64f097b1126ffd495b2f90a5289a5ba0af82a))
* **datepicker:** return back focus after selecting date from datepicker  ([#5633](https://github.com/valor-software/ngx-bootstrap/issues/5633)) ([7680cce](https://github.com/valor-software/ngx-bootstrap/commit/7680cce76574611f1e053f582a8fb00fe82bc4b4))
* **daterangepicker:** add ability to select week as a daterange ([#5611](https://github.com/valor-software/ngx-bootstrap/issues/5611)) ([e65bf65](https://github.com/valor-software/ngx-bootstrap/commit/e65bf65f3dd397ac95060627dda70509b9fd265d))
* **daterangepicker:** add daysDisabled support for daterangepicker ([#5639](https://github.com/valor-software/ngx-bootstrap/issues/5639)) ([c519dad](https://github.com/valor-software/ngx-bootstrap/commit/c519dadf04e133642626b3ebf8bf5f859605ab82))
* **locale:** add Kazakh locale ([#5685](https://github.com/valor-software/ngx-bootstrap/issues/5685)) ([ccb64f0](https://github.com/valor-software/ngx-bootstrap/commit/ccb64f0d0f7c025d22a7b2ac1732c2b6e6316952))
* **modal:** ability to add services to modal injector ([#5276](https://github.com/valor-software/ngx-bootstrap/issues/5276)) ([a3fc36d](https://github.com/valor-software/ngx-bootstrap/commit/a3fc36d8844dbe6a5b1d8a90c7f87e2640e8c2a4)), closes [#5275](https://github.com/valor-software/ngx-bootstrap/issues/5275)
* **modal:** add aria attributes to modal ([#5657](https://github.com/valor-software/ngx-bootstrap/issues/5657)) ([7591386](https://github.com/valor-software/ngx-bootstrap/commit/7591386c44fa04ffca2f64e7c569156c2fe0232b)), closes [#5557](https://github.com/valor-software/ngx-bootstrap/issues/5557)
* **pagination:** add custom template functionality ([#5661](https://github.com/valor-software/ngx-bootstrap/issues/5661)) ([39a0a56](https://github.com/valor-software/ngx-bootstrap/commit/39a0a56658492c463c2b7add428f739a95eee38b)), closes [#2044](https://github.com/valor-software/ngx-bootstrap/issues/2044)
* **popover:** Added "corner" pacements: "top right", "right bottom" etc. ([#5694](https://github.com/valor-software/ngx-bootstrap/issues/5694)) ([d785e71](https://github.com/valor-software/ngx-bootstrap/commit/d785e7112f76800e1c1ab0e95973ea125ad59915)), closes [#5586](https://github.com/valor-software/ngx-bootstrap/issues/5586)
* **typeahead:** add demo and property for adding optionsListTemplate  ([#4751](https://github.com/valor-software/ngx-bootstrap/issues/4751)) ([cec29c4](https://github.com/valor-software/ngx-bootstrap/commit/cec29c42c43d5927c7a9bbda7c6901adff03e026))
* **typeahead:** add more on blur logic ([#5629](https://github.com/valor-software/ngx-bootstrap/issues/5629)) ([c4f5236](https://github.com/valor-software/ngx-bootstrap/commit/c4f52369b3d84b9855b0928543ff4625153c43ff))
* **typeahead:** add sort functionality to typeahead ([#5646](https://github.com/valor-software/ngx-bootstrap/issues/5646)) ([d80bdfd](https://github.com/valor-software/ngx-bootstrap/commit/d80bdfd94cf65c7265a9251cf4d2bf5f4e870d08)), closes [#4808](https://github.com/valor-software/ngx-bootstrap/issues/4808)
* **typeahead:** improved accessibility [#582](https://github.com/valor-software/ngx-bootstrap/issues/582) ([#5547](https://github.com/valor-software/ngx-bootstrap/issues/5547)) ([00b39c4](https://github.com/valor-software/ngx-bootstrap/commit/00b39c4cc7c4352499462265e548f6e4592f9c9d))



# [5.5.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.4.0...v5.5.0) (2020-01-27)


### Bug Fixes

* **datepicker:** add check to prevent broken e2e ([#5598](https://github.com/valor-software/ngx-bootstrap/issues/5598)) ([fe4d636](https://github.com/valor-software/ngx-bootstrap/commit/fe4d6362a8f73675371799e3ea2bbe4162014309))
* **datepicker:** fix manual input accepts invalid date ([#5532](https://github.com/valor-software/ngx-bootstrap/issues/5532)) ([3078f07](https://github.com/valor-software/ngx-bootstrap/commit/3078f07ecbbd9213a05a83bb50df1589be2f275e)), closes [#4477](https://github.com/valor-software/ngx-bootstrap/issues/4477)
* **datepicker:** Maintain selected date when same date selected  ([#5209](https://github.com/valor-software/ngx-bootstrap/issues/5209)) ([#5496](https://github.com/valor-software/ngx-bootstrap/issues/5496)) ([b674b4b](https://github.com/valor-software/ngx-bootstrap/commit/b674b4b25f055d0aaab817ade3960126f28484f2))
* **modal:** added import strategy for lazy modules ([#5085](https://github.com/valor-software/ngx-bootstrap/issues/5085)) ([4c92bd1](https://github.com/valor-software/ngx-bootstrap/commit/4c92bd1b3c0341cb418f10de50531dc7f3b62b99))
* **modal:** change the mouse event to dismiss a modal on backdrop click ([#5326](https://github.com/valor-software/ngx-bootstrap/issues/5326)) ([74f752f](https://github.com/valor-software/ngx-bootstrap/commit/74f752fd1d97e7a06ee03e97daf1f17152516f26)), closes [#5264](https://github.com/valor-software/ngx-bootstrap/issues/5264)
* **modal-service:** Fix modal service not dismissing during animation ([#4550](https://github.com/valor-software/ngx-bootstrap/issues/4550)) ([8969937](https://github.com/valor-software/ngx-bootstrap/commit/89699379b2013bc31168e7b10e6717673a085200)), closes [#3711](https://github.com/valor-software/ngx-bootstrap/issues/3711)
* **rating:** fix round up for decimal values ([#5076](https://github.com/valor-software/ngx-bootstrap/issues/5076)) ([#5608](https://github.com/valor-software/ngx-bootstrap/issues/5608)) ([bf0f78e](https://github.com/valor-software/ngx-bootstrap/commit/bf0f78eb7c9e7696afcf9ac3610aec649185fb9c))
* **timepicker:** preserve date part when time crosses midnight ([#5535](https://github.com/valor-software/ngx-bootstrap/issues/5535)) ([5846bf2](https://github.com/valor-software/ngx-bootstrap/commit/5846bf2934c7f3ecbdf3e9a2edc48adbfe4f016f)), closes [#3139](https://github.com/valor-software/ngx-bootstrap/issues/3139)
* **tooltip:** fix aria attribute state ([#5614](https://github.com/valor-software/ngx-bootstrap/issues/5614)) ([009aeaa](https://github.com/valor-software/ngx-bootstrap/commit/009aeaa4f3e2b0ded3d3b57067aae7969c136b94)), closes [#5089](https://github.com/valor-software/ngx-bootstrap/issues/5089)
* **typeahead:** fix broken typeahead property ([#5616](https://github.com/valor-software/ngx-bootstrap/issues/5616)) ([70ed44a](https://github.com/valor-software/ngx-bootstrap/commit/70ed44a0725cbb59343dab4fe97c6832ff4da406))


### Features

* **datepicker:** Implement Thai Buddish calendar in Datepicker [#3893](https://github.com/valor-software/ngx-bootstrap/issues/3893) ([#5470](https://github.com/valor-software/ngx-bootstrap/issues/5470)) ([43d0da5](https://github.com/valor-software/ngx-bootstrap/commit/43d0da5d144e5ed34b8241221bd42571cce9293d))
* **discover:** add / update content on discover page ([#5592](https://github.com/valor-software/ngx-bootstrap/issues/5592)) ([716b586](https://github.com/valor-software/ngx-bootstrap/commit/716b58630909cd997f0703ac63099666bf6e39a9))
* **popover:** add delay option ([#5389](https://github.com/valor-software/ngx-bootstrap/issues/5389)) ([#5582](https://github.com/valor-software/ngx-bootstrap/issues/5582)) ([00037ef](https://github.com/valor-software/ngx-bootstrap/commit/00037ef20e5d02a0847c4967e1e5e8368e7ef1a2))
* **rating:** add aria-label attribute ([#5607](https://github.com/valor-software/ngx-bootstrap/issues/5607)) ([5d505ea](https://github.com/valor-software/ngx-bootstrap/commit/5d505eaa7e1d8a3f03077f6246175bfac3f928f4)), closes [#5579](https://github.com/valor-software/ngx-bootstrap/issues/5579)
* **tabs:** add aria attributes ([#5605](https://github.com/valor-software/ngx-bootstrap/issues/5605)) ([ef614c0](https://github.com/valor-software/ngx-bootstrap/commit/ef614c0de2697cb54e799137ea3a67ace89038b6)), closes [#4120](https://github.com/valor-software/ngx-bootstrap/issues/4120)
* **timepicker:** add aria-label to input ([#5604](https://github.com/valor-software/ngx-bootstrap/issues/5604)) ([bbb2817](https://github.com/valor-software/ngx-bootstrap/commit/bbb281716e16edd4daac995390eb9ffdbb6e6bfb)), closes [#4149](https://github.com/valor-software/ngx-bootstrap/issues/4149)
* **typeahead:** incoming data are not filtered after typeahead kicks-in [#3725](https://github.com/valor-software/ngx-bootstrap/issues/3725) ([#3728](https://github.com/valor-software/ngx-bootstrap/issues/3728)) ([8378105](https://github.com/valor-software/ngx-bootstrap/commit/837810579dbcbd7dd7667ef897ba8d69d69b6037))



# [5.4.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.3.2...v5.4.0) (2020-01-09)


### Bug Fixes

* **doc:** added punctuation, hyperlink and fixed typo. ([#5444](https://github.com/valor-software/ngx-bootstrap/issues/5444)) ([fbb4208](https://github.com/valor-software/ngx-bootstrap/commit/fbb4208736d3906885ec7a36af0e2f6f383cb0a1))
* **doc:** update carousel.examples.basic.use-case.md ([#5462](https://github.com/valor-software/ngx-bootstrap/issues/5462)) ([c86d0f5](https://github.com/valor-software/ngx-bootstrap/commit/c86d0f5fd0ee289595563073caadab863ce2dddf))
* **doc:** update pagination.examples.centering-active-page-link.md ([#5463](https://github.com/valor-software/ngx-bootstrap/issues/5463)) ([4669207](https://github.com/valor-software/ngx-bootstrap/commit/46692078ba326d590e9ed1a8d38fa451e36e3029))
* **tooltip:** tooltipChange unsubscribe on destroy ([#5431](https://github.com/valor-software/ngx-bootstrap/issues/5431)) ([6adf5f0](https://github.com/valor-software/ngx-bootstrap/commit/6adf5f0240a31e719e6f218dfe5be1a8b814c91b))
* **typeahead:** fix issue on scroll ([#5590](https://github.com/valor-software/ngx-bootstrap/issues/5590)) ([0dade71](https://github.com/valor-software/ngx-bootstrap/commit/0dade71a647e2487ed1f1f2e6b06693f5c936ce6))
* **typeahead:** fix performance issue ([#5589](https://github.com/valor-software/ngx-bootstrap/issues/5589)) ([e1d2f75](https://github.com/valor-software/ngx-bootstrap/commit/e1d2f753c13d5edee7c170ee9be4b4304b5ae5bf))


### Features

* **daterangepicker:** add ability to show prev and current month instead of current and next one ([#5513](https://github.com/valor-software/ngx-bootstrap/issues/5513)) ([cb6b29e](https://github.com/valor-software/ngx-bootstrap/commit/cb6b29e22b5d744c14c688fd0724ee93a06bbe76))



## [5.3.2](https://github.com/valor-software/ngx-bootstrap/compare/v5.3.1...v5.3.2) (2019-10-28)


### Bug Fixes

* **datepicker:** fix utc option issue ([#5534](https://github.com/valor-software/ngx-bootstrap/issues/5534)) ([04e6aad](https://github.com/valor-software/ngx-bootstrap/commit/04e6aadc1ea7599c875cf75bc5c9a51e86841827))


### Features

* **datepicker:** add Latvian locale (#hacktoberfest) ([#5432](https://github.com/valor-software/ngx-bootstrap/issues/5432)) ([9df0788](https://github.com/valor-software/ngx-bootstrap/commit/9df078877d12455c643405eb986873c464790438))



## [5.3.1](https://github.com/valor-software/ngx-bootstrap/compare/v5.3.0...v5.3.1) (2019-10-25)


### Bug Fixes

* **datepicker:** fix timezone regression && add useUtc option ([#5526](https://github.com/valor-software/ngx-bootstrap/issues/5526)) ([6742ce3](https://github.com/valor-software/ngx-bootstrap/commit/6742ce31c46fbf598963349e0e2fe3278ae2fc7c))
* **datepicker:** skip years reordering if minMode='year' ([#5346](https://github.com/valor-software/ngx-bootstrap/issues/5346)) ([f0d8ab3](https://github.com/valor-software/ngx-bootstrap/commit/f0d8ab30ffa293534f4e61aeb8618ec838f40a42))
* **doc:** fix aot.md ([#5459](https://github.com/valor-software/ngx-bootstrap/issues/5459)) ([2b0699f](https://github.com/valor-software/ngx-bootstrap/commit/2b0699f15c92bd735072b28c347ec88dc120fd69))
* **doc:** fix broken image link for 'Sauce Labs' ([#5483](https://github.com/valor-software/ngx-bootstrap/issues/5483)) ([97e5bbb](https://github.com/valor-software/ngx-bootstrap/commit/97e5bbb12330ce4fc7fba49568602ccc4dc4d8ef))
* **doc:** fix of file name mistake ([#5457](https://github.com/valor-software/ngx-bootstrap/issues/5457)) ([13bba2e](https://github.com/valor-software/ngx-bootstrap/commit/13bba2e04539957106ad89410bcca4735bd52749)), closes [#5456](https://github.com/valor-software/ngx-bootstrap/issues/5456)
* **doc:** fix typo inside CONTRIBUTING.md ([#5486](https://github.com/valor-software/ngx-bootstrap/issues/5486)) ([d595023](https://github.com/valor-software/ngx-bootstrap/commit/d5950236cd9292bbeeb17dc46fdf0b5afcb155e3))
* **doc:** fix typo inside documentation component ([#5476](https://github.com/valor-software/ngx-bootstrap/issues/5476)) ([60ee719](https://github.com/valor-software/ngx-bootstrap/commit/60ee71974600e74ca43aaa86fbdf22dbe6424c7c))
* **progressbar:** fix e2e for progressbar ([#5494](https://github.com/valor-software/ngx-bootstrap/issues/5494)) ([0ed21d5](https://github.com/valor-software/ngx-bootstrap/commit/0ed21d578dcb9c5c961a4a1b435eefd77e2cc4ea))
* **tests:** add fixes for datepicker e2e tests stability (manual_trigger && themes_spec) ([#5510](https://github.com/valor-software/ngx-bootstrap/issues/5510)) ([b82beba](https://github.com/valor-software/ngx-bootstrap/commit/b82beba216aa64dd50ebce35e847e4adff78857e))
* **tests:** fix e2e pagination ([#5528](https://github.com/valor-software/ngx-bootstrap/issues/5528)) ([849c813](https://github.com/valor-software/ngx-bootstrap/commit/849c813b8c4070afe603b6d2811463b765475b76))
* **tests:** stabilize e2e tests ([#5512](https://github.com/valor-software/ngx-bootstrap/issues/5512)) ([68db502](https://github.com/valor-software/ngx-bootstrap/commit/68db50220d52f98a497214db7f1393f2532905de))
* **typeahead:** fix typeahead performance on typeaheadMinLength = 0 ([#5525](https://github.com/valor-software/ngx-bootstrap/issues/5525)) ([1035c0b](https://github.com/valor-software/ngx-bootstrap/commit/1035c0b07b382f11388e61c2796fbb6dce2b28e0))


### Features

* **common:** add discovery page ([#5332](https://github.com/valor-software/ngx-bootstrap/issues/5332)) ([1723e5b](https://github.com/valor-software/ngx-bootstrap/commit/1723e5b1106eb76898e1ae6b259527cff9f7019c))
* **doc:** update demo(pagination) rotate button with dynamic behavior ([#5516](https://github.com/valor-software/ngx-bootstrap/issues/5516)) ([ed65226](https://github.com/valor-software/ngx-bootstrap/commit/ed652263e6f8eebbda350d61b2d1bcc67fca6643)), closes [#5401](https://github.com/valor-software/ngx-bootstrap/issues/5401)
* **timepicker:** add custom placeholder ([#3544](https://github.com/valor-software/ngx-bootstrap/issues/3544)) ([#5429](https://github.com/valor-software/ngx-bootstrap/issues/5429)) ([05a215c](https://github.com/valor-software/ngx-bootstrap/commit/05a215c65e1e9f69399ec5811a2db2f876cc1db8))



# [5.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.2.0...v5.3.0) (2019-10-11)


### Bug Fixes

* **accordion, datepicker:** prevent accidental form submissions ([#5314](https://github.com/valor-software/ngx-bootstrap/issues/5314)) ([2ed2473](https://github.com/valor-software/ngx-bootstrap/commit/2ed247341770927c573dfaad6e282ec0142e218f))
* **datepicker:** need to update inline datepicker on input change ([#5436](https://github.com/valor-software/ngx-bootstrap/issues/5436)) ([534221d](https://github.com/valor-software/ngx-bootstrap/commit/534221df2df2eb6c28cf97cb28ff11c12e6361c1))
* **docs:** fix various typos ([#5467](https://github.com/valor-software/ngx-bootstrap/issues/5467)) ([2676683](https://github.com/valor-software/ngx-bootstrap/commit/2676683a10dbe412e48ff946e4faf5be72325b80))
* **docs:** update join slack link ([#5421](https://github.com/valor-software/ngx-bootstrap/issues/5421)) ([b0a448b](https://github.com/valor-software/ngx-bootstrap/commit/b0a448bc6d768b2fdb6c1d8399336b8dbe28520b))
* **progressbar:** fix type class name binding override ([#5441](https://github.com/valor-software/ngx-bootstrap/issues/5441)) ([a544f44](https://github.com/valor-software/ngx-bootstrap/commit/a544f44e522c9a9d564a1870fc2e274d1e4d0a40))
* **timepicker:** fix placeholder full length ([#5392](https://github.com/valor-software/ngx-bootstrap/issues/5392)) ([bb5452b](https://github.com/valor-software/ngx-bootstrap/commit/bb5452ba947f6f79b2f76a29273ba968cfc8101c))
* **travis:** fix next stage ([#5419](https://github.com/valor-software/ngx-bootstrap/issues/5419)) ([6af8416](https://github.com/valor-software/ngx-bootstrap/commit/6af841664f157ff36390ea09d1e101608b572145))


### Features

* **chronos:** add uk locale resolve [#5351](https://github.com/valor-software/ngx-bootstrap/issues/5351) ([#5396](https://github.com/valor-software/ngx-bootstrap/issues/5396)) ([f2187ea](https://github.com/valor-software/ngx-bootstrap/commit/f2187ea8731bd97959ea2b5740030b5bffd3402f))
* **datepicker:** add invalidDate key to croatian locale ([#5393](https://github.com/valor-software/ngx-bootstrap/issues/5393)) ([b6c2036](https://github.com/valor-software/ngx-bootstrap/commit/b6c2036674ff96a54726413519a546cfc27e1e03))
* **dropdown:** add animation to the component ([#5475](https://github.com/valor-software/ngx-bootstrap/issues/5475)) ([d70f08b](https://github.com/valor-software/ngx-bootstrap/commit/d70f08b8c5caae60813194d5e5c58b61e53d9afe))
* **progressbar:** create type interface ([#5440](https://github.com/valor-software/ngx-bootstrap/issues/5440)) ([6696623](https://github.com/valor-software/ngx-bootstrap/commit/6696623fae8018806bcc2010fa137ab44e440786))



# [5.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.1.2...v5.2.0) (2019-09-13)


### Bug Fixes

* **datepicker:** fix issue with monthpicker for Feb ([#5371](https://github.com/valor-software/ngx-bootstrap/issues/5371)) ([#5376](https://github.com/valor-software/ngx-bootstrap/issues/5376)) ([91bda67](https://github.com/valor-software/ngx-bootstrap/commit/91bda6715a166772b31bd09b110339d8ff6194b7))
* **datepicker:** fix timezone issue ([#5364](https://github.com/valor-software/ngx-bootstrap/issues/5364)) ([137042c](https://github.com/valor-software/ngx-bootstrap/commit/137042c8ab9a869d3c23eccfcd05e74b9c78a4d8))
* **datepicker:** make datepicker view child static ([#5374](https://github.com/valor-software/ngx-bootstrap/issues/5374)) ([fe7e489](https://github.com/valor-software/ngx-bootstrap/commit/fe7e4894a3e27968c82e4a4d9bb9b845b0b54dca)), closes [#5373](https://github.com/valor-software/ngx-bootstrap/issues/5373)
* **positioning:** resolve perfomance issue ([#5385](https://github.com/valor-software/ngx-bootstrap/issues/5385)) ([988f5cf](https://github.com/valor-software/ngx-bootstrap/commit/988f5cf06ee033be989d99d5ba513a4ee5dabab9))
* **tooltip:** multiple events for tooltips ([#5382](https://github.com/valor-software/ngx-bootstrap/issues/5382)) ([3286382](https://github.com/valor-software/ngx-bootstrap/commit/328638294906f770d095bd9b8328f905500c4bd1))


### Features

* **datepicker:** add daterangepicker inline ([#5307](https://github.com/valor-software/ngx-bootstrap/issues/5307)) ([6cc64c0](https://github.com/valor-software/ngx-bootstrap/commit/6cc64c075b078dce51989e8c596b91ac8d5bb1f4))



## [5.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v5.1.1...v5.1.2) (2019-08-07)


### Bug Fixes

* **cypress:** fix page load time error ([#5353](https://github.com/valor-software/ngx-bootstrap/issues/5353)) ([b0a86eb](https://github.com/valor-software/ngx-bootstrap/commit/b0a86ebe2ae9dff49153455f25965b1fa4a20b71))
* **timepicker:** fix 12hour in 12/24 format ([#5248](https://github.com/valor-software/ngx-bootstrap/issues/5248)) ([b411130](https://github.com/valor-software/ngx-bootstrap/commit/b4111307ddd1eabef0a9c3aae43960986e46ceff)), closes [#5125](https://github.com/valor-software/ngx-bootstrap/issues/5125)


### Features

* **build:** update to latest angular ([#5350](https://github.com/valor-software/ngx-bootstrap/issues/5350)) ([bc2e73b](https://github.com/valor-software/ngx-bootstrap/commit/bc2e73b22af99bfefb2b755760181441479981ec))
* **build:** update to latest angular(8.1.2) ([#5337](https://github.com/valor-software/ngx-bootstrap/issues/5337)) ([c8a03c9](https://github.com/valor-software/ngx-bootstrap/commit/c8a03c98c6692572725abeb7478892c355b39566))
* **ci:** update cypress to latest ([#5355](https://github.com/valor-software/ngx-bootstrap/issues/5355)) ([b92e513](https://github.com/valor-software/ngx-bootstrap/commit/b92e5130d4235b4bb4d0236c5c66c413b191da95))



## [5.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v5.1.0...v5.1.1) (2019-07-10)


### Bug Fixes

* **collapse:** fix collapse animation (child height) ([#5316](https://github.com/valor-software/ngx-bootstrap/issues/5316)) ([f550605](https://github.com/valor-software/ngx-bootstrap/commit/f550605836891eec6e1bb1309c82e00139528525))
* **stackblitz:** add scss style for datepicker custom class demo example ([#5300](https://github.com/valor-software/ngx-bootstrap/issues/5300)) ([2d75dc5](https://github.com/valor-software/ngx-bootstrap/commit/2d75dc5282cdf29941ea02d786fd59214fc0c7c6))
* **tests:** add hard fix for cy test with animation ([#5318](https://github.com/valor-software/ngx-bootstrap/issues/5318)) ([8397f82](https://github.com/valor-software/ngx-bootstrap/commit/8397f82865c08605751f76ec7a35835afbb691f1))


### Features

* **doc:** enable ivy ([#5285](https://github.com/valor-software/ngx-bootstrap/issues/5285)) ([c102ff0](https://github.com/valor-software/ngx-bootstrap/commit/c102ff0ca3cede7a8e952e1e60ab288a9130749d))



# [5.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.0.0...v5.1.0) (2019-06-24)


### Bug Fixes

* **accordion|tabs:** fix cursor style when disabled element ([#4664](https://github.com/valor-software/ngx-bootstrap/issues/4664)) ([42cc778](https://github.com/valor-software/ngx-bootstrap/commit/42cc778897f768960857a34b8838a98717991440))
* **common:** fix cy logo link in getstarted page ([#5259](https://github.com/valor-software/ngx-bootstrap/issues/5259)) ([f2deb1b](https://github.com/valor-software/ngx-bootstrap/commit/f2deb1b55e22ba6d7dbc923cd1974a4fcedcd7dc))
* **tests:** fix for saucelab unit tests ([#5263](https://github.com/valor-software/ngx-bootstrap/issues/5263)) ([669d7e1](https://github.com/valor-software/ngx-bootstrap/commit/669d7e1d737f0d2d23ff481b7b224ff05ec0026c))


### Features

* **carousel:** add an opportunity to use a keyboard for navigation ([#5270](https://github.com/valor-software/ngx-bootstrap/issues/5270)) ([f5ffefa](https://github.com/valor-software/ngx-bootstrap/commit/f5ffefac0faeace02f50db3588849888394129ca))
* **common:** add compatibility table ([#5260](https://github.com/valor-software/ngx-bootstrap/issues/5260)) ([b99f10c](https://github.com/valor-software/ngx-bootstrap/commit/b99f10ca04e976f90558860e3ce77de4e1b73a20))
* **datepicker:** add ivy support (also fix ci) ([#5268](https://github.com/valor-software/ngx-bootstrap/issues/5268)) ([27639ea](https://github.com/valor-software/ngx-bootstrap/commit/27639ead64ac3a9cd8b7eb867a78937a84c978ec))
* **doc:** include docs for DateRangepicker custom format ([#5199](https://github.com/valor-software/ngx-bootstrap/issues/5199)) ([b845340](https://github.com/valor-software/ngx-bootstrap/commit/b845340870937c7a25f84465d7ce8d402da5b4b2))
* **doc:** update changelog ([#5258](https://github.com/valor-software/ngx-bootstrap/issues/5258)) ([8078824](https://github.com/valor-software/ngx-bootstrap/commit/80788242c9bee05ed7f2a2b7272bb761ffd1df2b))
* **tabs:** update of keyboard control ([#5284](https://github.com/valor-software/ngx-bootstrap/issues/5284)) ([161f419](https://github.com/valor-software/ngx-bootstrap/commit/161f419c67daed188ad7a936aad4875f2cbc4dd5))



# [5.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v4.3.0...v5.0.0) (2019-06-10)


### Bug Fixes

* **doc:** fix carousel doc ([#5250](https://github.com/valor-software/ngx-bootstrap/issues/5250)) ([f4aebbe](https://github.com/valor-software/ngx-bootstrap/commit/f4aebbe51c9611506a8baaa98840ffd919193b69))
* **doc:** fix link to Cypress.io favicon in README ([#5241](https://github.com/valor-software/ngx-bootstrap/issues/5241)) ([47a6995](https://github.com/valor-software/ngx-bootstrap/commit/47a69957a389a84b4bbfa63bf349eee5e4d9c669))
* **doc:** fix two typos ([#5244](https://github.com/valor-software/ngx-bootstrap/issues/5244)) ([8098924](https://github.com/valor-software/ngx-bootstrap/commit/8098924603e7aa028929e0f61a4b60b2d07d59ab))
* **positioning:** fix a case of looping ([#5253](https://github.com/valor-software/ngx-bootstrap/issues/5253)) ([e693810](https://github.com/valor-software/ngx-bootstrap/commit/e693810ec029edb2c14026dce9101adf06c44596))
* carousel - solved multilist slides no auto play ([#5237](https://github.com/valor-software/ngx-bootstrap/issues/5237)) ([d4fd9ad](https://github.com/valor-software/ngx-bootstrap/commit/d4fd9ade073f0e9c5ae1094cbff6c21ed4f64635)), closes [#5236](https://github.com/valor-software/ngx-bootstrap/issues/5236)


### Features

* **build:** migrate to angular8 ([#5245](https://github.com/valor-software/ngx-bootstrap/issues/5245)) ([b0d7b31](https://github.com/valor-software/ngx-bootstrap/commit/b0d7b31581838e04e795eff802684812ef797bf2))
* **carousel:** indicators for group of slides ([#5234](https://github.com/valor-software/ngx-bootstrap/issues/5234)) ([c460a6e](https://github.com/valor-software/ngx-bootstrap/commit/c460a6e5a18537ac098d682a7a0eadecde6830d5)), closes [#5233](https://github.com/valor-software/ngx-bootstrap/issues/5233)
* **datepicker:** add animation ([#5173](https://github.com/valor-software/ngx-bootstrap/issues/5173)) ([d5bc6f8](https://github.com/valor-software/ngx-bootstrap/commit/d5bc6f87879aba071aaf397b42d5c39efed3ad1d))
* **typeahead:** add animation ([#5240](https://github.com/valor-software/ngx-bootstrap/issues/5240)) ([8ce5e86](https://github.com/valor-software/ngx-bootstrap/commit/8ce5e86dfcee4244bba897a163d31f71b795d8ba))



# [4.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v4.0.1...v4.3.0) (2019-05-21)


### Bug Fixes

* **build:** fix heroku ([c76d6d8](https://github.com/valor-software/ngx-bootstrap/commit/c76d6d8d63396b122738a50cbc8c5ed58ad148d7))
* **build:** fix heroku eror 503 ([4ebf2ad](https://github.com/valor-software/ngx-bootstrap/commit/4ebf2ad281cf6dcaac507361ce79a8e6a5184d81))
* **carousel:** fix multilist carousel order ([#5193](https://github.com/valor-software/ngx-bootstrap/issues/5193)) ([1f883cb](https://github.com/valor-software/ngx-bootstrap/commit/1f883cb4b4ef5ee63fbf8fabe8b32d36e25dc419))
* **ci:** fix build next ([#5177](https://github.com/valor-software/ngx-bootstrap/issues/5177)) ([ab0d252](https://github.com/valor-software/ngx-bootstrap/commit/ab0d252d84ac5244e9eab53cc0f25a4884332618))
* **ci:** fix build on next ([#5169](https://github.com/valor-software/ngx-bootstrap/issues/5169)) ([f5be2db](https://github.com/valor-software/ngx-bootstrap/commit/f5be2dbfc89b1751a439d29948490a4f3c79f66d))
* **ci:** fix check prod build on next ([#5179](https://github.com/valor-software/ngx-bootstrap/issues/5179)) ([112ca44](https://github.com/valor-software/ngx-bootstrap/commit/112ca449d565ce06943ae1e993e961ea4945e3f8))
* **ci:** fix deploy on surge ([#5171](https://github.com/valor-software/ngx-bootstrap/issues/5171)) ([88e23e5](https://github.com/valor-software/ngx-bootstrap/commit/88e23e5f77c2632e62255e18731ad5bd878adc41))
* **docs:** update angular.json config file ([#4512](https://github.com/valor-software/ngx-bootstrap/issues/4512)) ([85faa47](https://github.com/valor-software/ngx-bootstrap/commit/85faa47f4a57f8946dc1ffd13aedba5b1bc0095b))
* **dropdown:** fix view destroyed error ([#5205](https://github.com/valor-software/ngx-bootstrap/issues/5205)) ([8cf98c2](https://github.com/valor-software/ngx-bootstrap/commit/8cf98c2152f89b6d6b3fc68a245dc208d9ba1116))
* **positioning:** fix errors on invalid position ([#5212](https://github.com/valor-software/ngx-bootstrap/issues/5212)) ([e790196](https://github.com/valor-software/ngx-bootstrap/commit/e79019652e82dfb4dbf802960a3315d4e45ad699))
* **stackblitz:** add carousel correct links, datepicker locales, remove link from accessibility ([#5176](https://github.com/valor-software/ngx-bootstrap/issues/5176)) ([caff954](https://github.com/valor-software/ngx-bootstrap/commit/caff954087add377ed3e0e887901a2e0082908ad))
* **tests:** add fix for select week test ([#5218](https://github.com/valor-software/ngx-bootstrap/issues/5218)) ([984ca74](https://github.com/valor-software/ngx-bootstrap/commit/984ca74f91f69be864b1004f790a4870c6e519a8))
* **tests:** add fixes for timepicker tests stability ([#5157](https://github.com/valor-software/ngx-bootstrap/issues/5157)) ([7563505](https://github.com/valor-software/ngx-bootstrap/commit/756350520c68662c2c9fe509273789e1354bd1d0))
* **tests:** enhancements to group and key params for cypress ([#5161](https://github.com/valor-software/ngx-bootstrap/issues/5161)) ([0006146](https://github.com/valor-software/ngx-bootstrap/commit/0006146999b35ec000cc8407164298aa8d8bc162))
* **tests:** fix cypress datepicker tests in development ([#5142](https://github.com/valor-software/ngx-bootstrap/issues/5142)) ([fa25dd5](https://github.com/valor-software/ngx-bootstrap/commit/fa25dd55d2a2577197a002ec2d6984f461c811a0))
* **tests:** modal e2e tests fix, cypress update ([#5145](https://github.com/valor-software/ngx-bootstrap/issues/5145)) ([b66b1bb](https://github.com/valor-software/ngx-bootstrap/commit/b66b1bb6d3fbbdf5f0304a287841626f08033875))
* **tests:** remove 3d cypress thread, unnecessary ([#5139](https://github.com/valor-software/ngx-bootstrap/issues/5139)) ([45cde70](https://github.com/valor-software/ngx-bootstrap/commit/45cde7092ffa947c4daa718106f210d9e7c2fa6e))
* **tests:** remove deprecated Init event (closes [#5005](https://github.com/valor-software/ngx-bootstrap/issues/5005)) ([#5182](https://github.com/valor-software/ngx-bootstrap/issues/5182)) ([3f87b84](https://github.com/valor-software/ngx-bootstrap/commit/3f87b84de34046c099b67efb731aae827891dcaf))
* **tests:** stabilize spinners timepicker test ([#5160](https://github.com/valor-software/ngx-bootstrap/issues/5160)) ([d03c66d](https://github.com/valor-software/ngx-bootstrap/commit/d03c66d9928fb13320676fab8ed2d66da3e85cb8))


### Features

* **build:** express to nestjs in ssr ([#5152](https://github.com/valor-software/ngx-bootstrap/issues/5152)) ([2b7a2fd](https://github.com/valor-software/ngx-bootstrap/commit/2b7a2fd3b9a02314d33bc5531c922df7c7e66577))
* **build:** update nestjs-universal config ([#5156](https://github.com/valor-software/ngx-bootstrap/issues/5156)) ([47b7537](https://github.com/valor-software/ngx-bootstrap/commit/47b7537f9d6d9bccfdcc15574107f76a3bfb8560))
* **carousel:** allow to display multiple items per one slide ([#5133](https://github.com/valor-software/ngx-bootstrap/issues/5133)) ([c9f4ec9](https://github.com/valor-software/ngx-bootstrap/commit/c9f4ec91cbcd96c45ac4af1b62d998f5bd608a12))
* **common:** add animation for collapse and accordion components ([#5146](https://github.com/valor-software/ngx-bootstrap/issues/5146)) ([191e5b4](https://github.com/valor-software/ngx-bootstrap/commit/191e5b4203a9e932c9f4b1e2e2605fcc49b20bf5))
* **common:** container attribute implementation ([#5174](https://github.com/valor-software/ngx-bootstrap/issues/5174)) ([b061629](https://github.com/valor-software/ngx-bootstrap/commit/b061629adac7352cbb2608e7598cbd7aadf7eac6))
* **datepicker:** add Vietnam (vi) locale to date picker ([#5221](https://github.com/valor-software/ngx-bootstrap/issues/5221)) ([4c1f2bf](https://github.com/valor-software/ngx-bootstrap/commit/4c1f2bf661ab02931b988a2db31c0e9b1c033391))
* **datepicker:** change Thai 'weekdaysShort' format for look better in datepicker ([#4674](https://github.com/valor-software/ngx-bootstrap/issues/4674)) ([77ccc37](https://github.com/valor-software/ngx-bootstrap/commit/77ccc3736ccccd0b2c9efc09050adbf7586a9a8f))
* **demo:** add stackblitz examples via SDK ([#4098](https://github.com/valor-software/ngx-bootstrap/issues/4098)) ([ecdc140](https://github.com/valor-software/ngx-bootstrap/commit/ecdc140142c0be8840cef1b104e269b7922120a1))
* **doc:** add animation module to doc and with ng add, also stackblitz ([#5207](https://github.com/valor-software/ngx-bootstrap/issues/5207)) ([bd9c72e](https://github.com/valor-software/ngx-bootstrap/commit/bd9c72e90d1afaeb62d209d624b55a8d25db3b04))
* **popover:** add adaptivePosition option ([#5183](https://github.com/valor-software/ngx-bootstrap/issues/5183)) ([c7f9e8c](https://github.com/valor-software/ngx-bootstrap/commit/c7f9e8cd35dcc941f2a48c4bbe42a900ea8ac1ee))
* **tooltip:** add adaptivePosition option ([#5204](https://github.com/valor-software/ngx-bootstrap/issues/5204)) ([8333e23](https://github.com/valor-software/ngx-bootstrap/commit/8333e23b8eb1e851a2a1d6c4c1f670ee219bb9f1))


### Performance Improvements

* **dropdown:** reduce the number of document click listeners ([#4605](https://github.com/valor-software/ngx-bootstrap/issues/4605)) ([4d49218](https://github.com/valor-software/ngx-bootstrap/commit/4d49218a993fd60b67d3a43f73f2489263fd0a35))



## [4.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v3.3.0...v4.0.1) (2019-03-29)


### Bug Fixes

* **build:** fix fail on target=es6 ([#5123](https://github.com/valor-software/ngx-bootstrap/issues/5123)) ([5a3afe3](https://github.com/valor-software/ngx-bootstrap/commit/5a3afe3f59115478454d250ec571aff75a951020))
* **build:** fix window not defined on An Universal ([#5073](https://github.com/valor-software/ngx-bootstrap/issues/5073)) ([682d1f2](https://github.com/valor-software/ngx-bootstrap/commit/682d1f2ea7088249d60abc154b70b536c2a06b58))
* **common:** fix peer dependencies ([#5131](https://github.com/valor-software/ngx-bootstrap/issues/5131)) ([343b60e](https://github.com/valor-software/ngx-bootstrap/commit/343b60ec0e03dfad283f8452cc3d9901db722387))
* **modal:** fix anchor for esc closing option demo ([#5081](https://github.com/valor-software/ngx-bootstrap/issues/5081)) ([8a4e381](https://github.com/valor-software/ngx-bootstrap/commit/8a4e3811216b5ed278f41f025ab99875d5ef8ca0))
* **positioning:** fix frozen page ([#5119](https://github.com/valor-software/ngx-bootstrap/issues/5119)) ([67bb329](https://github.com/valor-software/ngx-bootstrap/commit/67bb3299dc1217a389635aeec390ec85807f7019))
* **tabs:** fix an invoke of select event outside of tabs ([#3755](https://github.com/valor-software/ngx-bootstrap/issues/3755)) ([#5002](https://github.com/valor-software/ngx-bootstrap/issues/5002)) ([de2300c](https://github.com/valor-software/ngx-bootstrap/commit/de2300c3e95a43e8e3f2cd8982ac97865e9a1e86))
* **tarvis:** fix Travis on release ([#5122](https://github.com/valor-software/ngx-bootstrap/issues/5122)) ([f9a1094](https://github.com/valor-software/ngx-bootstrap/commit/f9a1094d71504038a3e77d73767d9633bca4a07b))
* **tests:** fix cy all command ([#5108](https://github.com/valor-software/ngx-bootstrap/issues/5108)) ([ea66fa4](https://github.com/valor-software/ngx-bootstrap/commit/ea66fa4601ee0a4ad1331d8c7af259d0ebddfa2d))
* **tests:** fix sauce tests ([#5057](https://github.com/valor-software/ngx-bootstrap/issues/5057)) ([0bc4a69](https://github.com/valor-software/ngx-bootstrap/commit/0bc4a698d117d1034f845c4814665e76d78f127f))
* **tests:** remove applitools logs ([#5124](https://github.com/valor-software/ngx-bootstrap/issues/5124)) ([c2d1c39](https://github.com/valor-software/ngx-bootstrap/commit/c2d1c390253d1355f284ab0dd010fe855a3983e0))
* **tests:** select week datepicker fix ([#5109](https://github.com/valor-software/ngx-bootstrap/issues/5109)) ([f20c531](https://github.com/valor-software/ngx-bootstrap/commit/f20c53193e467c9297d402a57ca9e5aed6c06be3))
* **timepicker:** min-max demo fix, closes([#5053](https://github.com/valor-software/ngx-bootstrap/issues/5053)) ([8a4456b](https://github.com/valor-software/ngx-bootstrap/commit/8a4456b6aabf80ade95fa42632fbd12464c0d10c))
* **travis:** fix travis 'ngx-bootstrap-ci unpublish' ([#5116](https://github.com/valor-software/ngx-bootstrap/issues/5116)) ([85b5d87](https://github.com/valor-software/ngx-bootstrap/commit/85b5d87fb7de61c6812f92f6ede56ba7a7496f68))
* **travis:** fix travis next stage and unpublish ngx-bootstrap-ci ([#5115](https://github.com/valor-software/ngx-bootstrap/issues/5115)) ([42c8904](https://github.com/valor-software/ngx-bootstrap/commit/42c89047b427a66bdbc43d0a27c909362ef92a97))
* **travis:** fix travis on dev branch ([#5111](https://github.com/valor-software/ngx-bootstrap/issues/5111)) ([111ad96](https://github.com/valor-software/ngx-bootstrap/commit/111ad962705a89b27ff8b8fe2d8cec217cf2bb6f))


### Features

* **positioning:** update variation behavior and add adaptive option ([#5065](https://github.com/valor-software/ngx-bootstrap/issues/5065)) ([c9adab6](https://github.com/valor-software/ngx-bootstrap/commit/c9adab66e85aaf93548eda473f924812263716a6))



# [3.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.2.0...v3.3.0) (2019-02-12)


### Bug Fixes

* **build:** use os specific path separator in npm run build.watch ([#4958](https://github.com/valor-software/ngx-bootstrap/issues/4958)) ([5e4183e](https://github.com/valor-software/ngx-bootstrap/commit/5e4183ee091d8b137743465f04aebb0fa3d062ad))
* **package:** decrease ts version in latest ng ([#5044](https://github.com/valor-software/ngx-bootstrap/issues/5044)) ([0e77f25](https://github.com/valor-software/ngx-bootstrap/commit/0e77f259be91b3c78521d63ef6809fb77c831524))
* **positioning:** fix on heroku also typeahead ([#5054](https://github.com/valor-software/ngx-bootstrap/issues/5054)) ([8d8836d](https://github.com/valor-software/ngx-bootstrap/commit/8d8836d3236058920045d9129059de2e027e54ae))
* **tabs:** adding tab content to DOM just if selected tab ([#1422](https://github.com/valor-software/ngx-bootstrap/issues/1422)) ([#4991](https://github.com/valor-software/ngx-bootstrap/issues/4991)) ([457c32a](https://github.com/valor-software/ngx-bootstrap/commit/457c32aec3b668d1852d1b813b5a834748dc5ffd))
* **tests:** datepicker min-max demo - fix for weeks ([#5052](https://github.com/valor-software/ngx-bootstrap/issues/5052)) ([a2aaa80](https://github.com/valor-software/ngx-bootstrap/commit/a2aaa800b46b585af3e405badad275e230a6aa84))
* **tests:** js heap out of memory, datepicker fixes ([#5048](https://github.com/valor-software/ngx-bootstrap/issues/5048)) ([235050e](https://github.com/valor-software/ngx-bootstrap/commit/235050eaee0e6b602db6d115e422c57a2c6e803c))
* **tests:** rework tests accotding to new position service ([#5055](https://github.com/valor-software/ngx-bootstrap/issues/5055)) ([8a94917](https://github.com/valor-software/ngx-bootstrap/commit/8a94917db796c6748c84b7a338059bfdb4dbed93))


### Features

* **datepicker:** Allow to disable specific dates ([#5046](https://github.com/valor-software/ngx-bootstrap/issues/5046)) ([5633d2d](https://github.com/valor-software/ngx-bootstrap/commit/5633d2d7589c20f77780836ace6382d32c976229))
* **positioning:** refactor positioning service ([#5027](https://github.com/valor-software/ngx-bootstrap/issues/5027)) ([66ae92d](https://github.com/valor-software/ngx-bootstrap/commit/66ae92d804779b0244e97bff6032632165000932)), closes [#3303](https://github.com/valor-software/ngx-bootstrap/issues/3303) [#2993](https://github.com/valor-software/ngx-bootstrap/issues/2993) [#4470](https://github.com/valor-software/ngx-bootstrap/issues/4470)
* **tests:** add full e2e coverage for DatePicker component ([#4951](https://github.com/valor-software/ngx-bootstrap/issues/4951)) ([fe2b29f](https://github.com/valor-software/ngx-bootstrap/commit/fe2b29fe5e16cca7a59358d359aea59b8cf89951))
* **tests:** added cypress tests parallelization ([#5003](https://github.com/valor-software/ngx-bootstrap/issues/5003)) ([e3396bb](https://github.com/valor-software/ngx-bootstrap/commit/e3396bb106a8da0ab2ccdad998f54800addfb3a9))
* **typeahead:** add Input Property for selected First item in option list ([#4631](https://github.com/valor-software/ngx-bootstrap/issues/4631)) ([cd13a55](https://github.com/valor-software/ngx-bootstrap/commit/cd13a55a73a6ef13d3329cab25accf8ff0dc1ab3)), closes [#3965](https://github.com/valor-software/ngx-bootstrap/issues/3965)


### Reverts

* Revert "fix(tabs): adding tab content to DOM just if selected tab (#1422) (#4991)" (#5051) ([33ac20a](https://github.com/valor-software/ngx-bootstrap/commit/33ac20a537b6bc9087388ce3ff83c099f74ec12a)), closes [#1422](https://github.com/valor-software/ngx-bootstrap/issues/1422) [#4991](https://github.com/valor-software/ngx-bootstrap/issues/4991) [#5051](https://github.com/valor-software/ngx-bootstrap/issues/5051)



# [3.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.4...v3.2.0) (2019-01-21)


### Bug Fixes

* **common:** prevent deprecated also fixed test (datepicker close on esc) for IE11 (souce tests) ([#4940](https://github.com/valor-software/ngx-bootstrap/issues/4940)) ([d338dbf](https://github.com/valor-software/ngx-bootstrap/commit/d338dbf2316b1a1617f63bdd7caa3a56f33059c8))
* **script:** fix latest script ([#5004](https://github.com/valor-software/ngx-bootstrap/issues/5004)) ([5f6a781](https://github.com/valor-software/ngx-bootstrap/commit/5f6a781cf8ba3c2b79ddfc36dfdf48195bb08b62))
* **tests:** use prev safari version while latest doesnt work on sauce ([#5011](https://github.com/valor-software/ngx-bootstrap/issues/5011)) ([89f7265](https://github.com/valor-software/ngx-bootstrap/commit/89f7265711ca2e5551bdaeeb2e7566fec9e1926e))
* **timepicker:** enable_disable timepicker in reactive forms ([#4563](https://github.com/valor-software/ngx-bootstrap/issues/4563)) ([ac55b08](https://github.com/valor-software/ngx-bootstrap/commit/ac55b0873a3f9570d53071092d728278cc2756b1)), closes [#4055](https://github.com/valor-software/ngx-bootstrap/issues/4055)


### Features

* **css:** update bootstrap css to latest ([#4999](https://github.com/valor-software/ngx-bootstrap/issues/4999)) ([91b78e7](https://github.com/valor-software/ngx-bootstrap/commit/91b78e7baa40a256f687dbf3a596ae1c48bc2252))
* **datepicker:** add catalan lang ([#4969](https://github.com/valor-software/ngx-bootstrap/issues/4969)) ([20fadbd](https://github.com/valor-software/ngx-bootstrap/commit/20fadbdda7c2606e019fe1bad0b3cd77fcdf5082)), closes [#4959](https://github.com/valor-software/ngx-bootstrap/issues/4959)
* **datepicker:** Add directive for inline datepicker ([#3956](https://github.com/valor-software/ngx-bootstrap/issues/3956)) ([d9a89b4](https://github.com/valor-software/ngx-bootstrap/commit/d9a89b427fa5c79d94cd609cdf574eaf7a143bf5)), closes [valor-software/ngx-bootstrap#3955](https://github.com/valor-software/ngx-bootstrap/issues/3955) [valor-software/ngx-bootstrap#3958](https://github.com/valor-software/ngx-bootstrap/issues/3958)
* **tooltip:** add delay to config ([#4928](https://github.com/valor-software/ngx-bootstrap/issues/4928)) ([bcf93d4](https://github.com/valor-software/ngx-bootstrap/commit/bcf93d465a8d8e127c6959eb34f5b23db7f40185)), closes [#4029](https://github.com/valor-software/ngx-bootstrap/issues/4029)



## [3.1.4](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.3...v3.1.4) (2018-12-27)


### Bug Fixes

* **core:** remove important properties for styles ([#4939](https://github.com/valor-software/ngx-bootstrap/issues/4939)) ([46d1d23](https://github.com/valor-software/ngx-bootstrap/commit/46d1d23fb04f6ba0dd76eb1fa42ac5b2e3ba17e7))
* **datepicker:** remove min-max logic from formats demo ([#4967](https://github.com/valor-software/ngx-bootstrap/issues/4967)) ([ac7b7a3](https://github.com/valor-software/ngx-bootstrap/commit/ac7b7a3275a2585b7c79063a08e4f02977d7e983))
* **demo:** The typeaheadAsync property was missing, which I found to be necessary for the dropdown/functionality to be used. ([#4662](https://github.com/valor-software/ngx-bootstrap/issues/4662)) ([9fe4acc](https://github.com/valor-software/ngx-bootstrap/commit/9fe4acc974e3e5f98f80b8fe8a2d96be5cf31d63))
* **dropdown:** fix bottom position for dropdownlist ([#4626](https://github.com/valor-software/ngx-bootstrap/issues/4626)) ([6e04b33](https://github.com/valor-software/ngx-bootstrap/commit/6e04b33e88c454eebbf21b32e3bada71bb121deb)), closes [#4545](https://github.com/valor-software/ngx-bootstrap/issues/4545)
* **popover/tooltip:** use translate for relative offset positioning for tooltip and popover arrows ([#4850](https://github.com/valor-software/ngx-bootstrap/issues/4850)) ([92efe9a](https://github.com/valor-software/ngx-bootstrap/commit/92efe9ade23fc95c4f3c97deb1aeee4df0d1d75d)), closes [#4849](https://github.com/valor-software/ngx-bootstrap/issues/4849)
* **timepicker:** demo enhancement to custom meridian example ([#4769](https://github.com/valor-software/ngx-bootstrap/issues/4769)) ([8c3cb31](https://github.com/valor-software/ngx-bootstrap/commit/8c3cb314407bb546413a51f8dacdb1ea17b53539))
* **tooltip:** tooltipEnable inconsistent value ([#4911](https://github.com/valor-software/ngx-bootstrap/issues/4911)) ([acb9dc3](https://github.com/valor-software/ngx-bootstrap/commit/acb9dc3e612451465aea0f030d2ec77d3b190a8a))
* **typeahead:** fix typeahead's breaking if typeahead property receives NULL ([#4957](https://github.com/valor-software/ngx-bootstrap/issues/4957)) ([3f536bf](https://github.com/valor-software/ngx-bootstrap/commit/3f536bf1c909fb5f08dfb72fb10e1bb65962a9a4)), closes [#4417](https://github.com/valor-software/ngx-bootstrap/issues/4417)


### Features

* **datepicker:** add custom class via bsConfig, add demo also ([#4062](https://github.com/valor-software/ngx-bootstrap/issues/4062)) ([d2a5c25](https://github.com/valor-software/ngx-bootstrap/commit/d2a5c25ab1ad1bec268dc2ae0ea07da3498a1308))
* **datepicker:** esc can close datepicker ([#3966](https://github.com/valor-software/ngx-bootstrap/issues/3966)) ([3ee6eac](https://github.com/valor-software/ngx-bootstrap/commit/3ee6eac645433ac286e93aadfc3ec4ccdfeba3d5)), closes [#3890](https://github.com/valor-software/ngx-bootstrap/issues/3890)
* **demo:** update landing page  ([#4981](https://github.com/valor-software/ngx-bootstrap/issues/4981)) ([ab87b3d](https://github.com/valor-software/ngx-bootstrap/commit/ab87b3d8075e11c416e32bf96c4ff30a6e1858e0))
* **demo:** update landing page ([#4972](https://github.com/valor-software/ngx-bootstrap/issues/4972)) ([a6f27ab](https://github.com/valor-software/ngx-bootstrap/commit/a6f27ab448f6133131dcb017fb99832180571f8c)), closes [#4970](https://github.com/valor-software/ngx-bootstrap/issues/4970)
* **doc:** reverse of docs list ([#4912](https://github.com/valor-software/ngx-bootstrap/issues/4912)) ([f17459f](https://github.com/valor-software/ngx-bootstrap/commit/f17459f29fecdd9d3adaf3845f0253269216e24c))
* **tests:** add full e2e coverage for Progressbar component ([#4924](https://github.com/valor-software/ngx-bootstrap/issues/4924)) ([3386261](https://github.com/valor-software/ngx-bootstrap/commit/3386261fa0af6f8e3ee9d849f27da4b23fafbff7))
* **tests:** add support for cypress dashboard for debugging ([#4908](https://github.com/valor-software/ngx-bootstrap/issues/4908)) ([055220e](https://github.com/valor-software/ngx-bootstrap/commit/055220ec66e5de6b8bd71fb3a01f7a1f1278165f))
* **tests:** cypress update ([#4919](https://github.com/valor-software/ngx-bootstrap/issues/4919)) ([c545860](https://github.com/valor-software/ngx-bootstrap/commit/c5458606c02c431fee91f22052916560466661b4))
* **typeahead:** optionally do not hide the results on blur ([#4783](https://github.com/valor-software/ngx-bootstrap/issues/4783)) ([b6e3b62](https://github.com/valor-software/ngx-bootstrap/commit/b6e3b62953cd68c211e4d7bc31a2a42654543c57)), closes [#2059](https://github.com/valor-software/ngx-bootstrap/issues/2059)



## [3.1.3](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.2...v3.1.3) (2018-12-07)


### Bug Fixes

* **ci:** update dep on npm-run-all to fix link to event-stream 3.3.6 ([#4882](https://github.com/valor-software/ngx-bootstrap/issues/4882)) ([0de72f9](https://github.com/valor-software/ngx-bootstrap/commit/0de72f9fbd4dad55bb74585f254aabfe173e0372))
* **components-spec:** fix paths in spec.ts files ([#4859](https://github.com/valor-software/ngx-bootstrap/issues/4859)) ([1662554](https://github.com/valor-software/ngx-bootstrap/commit/1662554409cc2a3431634d04fb1a9d38f9f39169))
* **datepicker:** cursor fixes for weeks &  disabled dates in datepicker ([#4905](https://github.com/valor-software/ngx-bootstrap/issues/4905)) ([5c0efdd](https://github.com/valor-software/ngx-bootstrap/commit/5c0efdd085e54147c09117f2627c3ccc57bbf39a))
* **datepicker:** fix datepickers cypress test ([#4771](https://github.com/valor-software/ngx-bootstrap/issues/4771)) ([9671c7e](https://github.com/valor-software/ngx-bootstrap/commit/9671c7eb3d343014a019ae99e44bf12319da1765))
* **datepicker:** fix responsive on Date Range Picker ([#4127](https://github.com/valor-software/ngx-bootstrap/issues/4127)) ([#4891](https://github.com/valor-software/ngx-bootstrap/issues/4891)) ([53b88c0](https://github.com/valor-software/ngx-bootstrap/commit/53b88c01040f6bc9dc4d7ce41f864c516938134a))
* **datepicker:** select correct month and year from month picker view… ([#4501](https://github.com/valor-software/ngx-bootstrap/issues/4501)) ([3a17cc3](https://github.com/valor-software/ngx-bootstrap/commit/3a17cc35fa518d7cfaf3f0654f7be9551b49da4e))
* **dropdown:** fix dropdown inside click ([#4609](https://github.com/valor-software/ngx-bootstrap/issues/4609)) ([75f7105](https://github.com/valor-software/ngx-bootstrap/commit/75f7105341f609dee48a029a8600750081f72612)), closes [#1933](https://github.com/valor-software/ngx-bootstrap/issues/1933)
* **schematics:** fix component option ([#4892](https://github.com/valor-software/ngx-bootstrap/issues/4892)) ([6cc0ce6](https://github.com/valor-software/ngx-bootstrap/commit/6cc0ce67b1c9411254ceab0503c0184fd9335048))
* **tests:** datepicker smoke test for reactive form ([#4895](https://github.com/valor-software/ngx-bootstrap/issues/4895)) ([55862b8](https://github.com/valor-software/ngx-bootstrap/commit/55862b80bc36dcf9a2fb31e7376fb659ad4a74ef))
* **tests:** fix for clickOnBtn method name ([#4873](https://github.com/valor-software/ngx-bootstrap/issues/4873)) ([8b1ebf1](https://github.com/valor-software/ngx-bootstrap/commit/8b1ebf1b306a5f75a9b9c22c23447032595a9677))
* **tests:** remove check for ng-reflect-model, reconfigure travis for test run ([#4885](https://github.com/valor-software/ngx-bootstrap/issues/4885)) ([b2bd459](https://github.com/valor-software/ngx-bootstrap/commit/b2bd4599c765a9e9b3ef1b944514de4ae34f1835))
* **travis:** update deployed instance for correct testing ([#4896](https://github.com/valor-software/ngx-bootstrap/issues/4896)) ([48d1b3d](https://github.com/valor-software/ngx-bootstrap/commit/48d1b3d25e41d0c6a7e812fa849fee55d775289f))


### Features

* **ci:** speed up travis builds ([#4883](https://github.com/valor-software/ngx-bootstrap/issues/4883)) ([c0b1870](https://github.com/valor-software/ngx-bootstrap/commit/c0b1870ee8ce575b1cb228fb222a517cd43d84d3))
* **common:** add strict mode support ([#4869](https://github.com/valor-software/ngx-bootstrap/issues/4869)) ([58d4517](https://github.com/valor-software/ngx-bootstrap/commit/58d4517898d4831341d2715b881754db8578c32d)), closes [#4848](https://github.com/valor-software/ngx-bootstrap/issues/4848)
* **datepicker:** add min mode ([#4874](https://github.com/valor-software/ngx-bootstrap/issues/4874)) ([1183875](https://github.com/valor-software/ngx-bootstrap/commit/118387579746db02e3c81440509e2fe120596c21)), closes [#3354](https://github.com/valor-software/ngx-bootstrap/issues/3354) [#2627](https://github.com/valor-software/ngx-bootstrap/issues/2627)
* **datepicker:** allow to select dates from other months ([#4828](https://github.com/valor-software/ngx-bootstrap/issues/4828)) ([b17926b](https://github.com/valor-software/ngx-bootstrap/commit/b17926bf35edbf59ceae59b893c09ed12e72ca79)), closes [#4485](https://github.com/valor-software/ngx-bootstrap/issues/4485) [#3746](https://github.com/valor-software/ngx-bootstrap/issues/3746)
* **datepicker:** Making it possible to disable certain days in the DatePicker ([#4491](https://github.com/valor-software/ngx-bootstrap/issues/4491)) ([4cc77f8](https://github.com/valor-software/ngx-bootstrap/commit/4cc77f8e6183f4e232209870b6c13970a16d8a7f))
* **demo:** opportunity to change bs theme by url query ([#4870](https://github.com/valor-software/ngx-bootstrap/issues/4870)) ([0e806e1](https://github.com/valor-software/ngx-bootstrap/commit/0e806e1a75bc2df7644bc31c6e5d4e6f9f8624b4))
* **dropdown:** add insideClick property to config ([#4898](https://github.com/valor-software/ngx-bootstrap/issues/4898)) ([d6e3534](https://github.com/valor-software/ngx-bootstrap/commit/d6e3534caff920e7a62f313b5893a293045560e7))
* **modal:** add method to change modal window class ([#4811](https://github.com/valor-software/ngx-bootstrap/issues/4811)) ([2fcdd7f](https://github.com/valor-software/ngx-bootstrap/commit/2fcdd7f056fee3c510933d40aaf257cba6774704)), closes [#2824](https://github.com/valor-software/ngx-bootstrap/issues/2824)
* **tests:** add 2 test scopes and examples ([#4838](https://github.com/valor-software/ngx-bootstrap/issues/4838)) ([52fc9e8](https://github.com/valor-software/ngx-bootstrap/commit/52fc9e8e10d1c29ca506ec87125debc84adac103))
* **tests:** add full coverage for Collapse component demo ([#4847](https://github.com/valor-software/ngx-bootstrap/issues/4847)) ([bb65d16](https://github.com/valor-software/ngx-bootstrap/commit/bb65d16a8fa024465642357991085a461b99431c))
* **tests:** add full coverage for Pagination component demo ([#4867](https://github.com/valor-software/ngx-bootstrap/issues/4867)) ([30d2734](https://github.com/valor-software/ngx-bootstrap/commit/30d2734817ea1bdd2fd21b0af6cffe0a27511581))
* **tests:** add possibility to run e2e tests for different bs versions ([#4886](https://github.com/valor-software/ngx-bootstrap/issues/4886)) ([86436ca](https://github.com/valor-software/ngx-bootstrap/commit/86436ca5b961c2a39de8eaea46aae8b59201836a))



## [3.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.1...v3.1.2) (2018-11-20)


### Bug Fixes

* **build:** add workaround for buildOptimizer issue ([#4799](https://github.com/valor-software/ngx-bootstrap/issues/4799)) ([50507e4](https://github.com/valor-software/ngx-bootstrap/commit/50507e4f2b75b3a99d0f74cebf18c21e9f838d85))
* **build:** back scss of datepicker ([#4759](https://github.com/valor-software/ngx-bootstrap/issues/4759)) ([a003011](https://github.com/valor-software/ngx-bootstrap/commit/a0030113a2584f75c1bd8ee8cfcaf916f2af5d25))
* **test:** run tests and change structure of spec file ([#4663](https://github.com/valor-software/ngx-bootstrap/issues/4663)) ([d5a22a4](https://github.com/valor-software/ngx-bootstrap/commit/d5a22a49b988b2cf4991119feea9612dda00d926))
* **tests:** cleanup test code ([#4778](https://github.com/valor-software/ngx-bootstrap/issues/4778)) ([9f2ec92](https://github.com/valor-software/ngx-bootstrap/commit/9f2ec9250249f33d124fab79a2b18434d1909ecd))
* **tests:** travis and karma conf update for sauce ([#4785](https://github.com/valor-software/ngx-bootstrap/issues/4785)) ([ee9472c](https://github.com/valor-software/ngx-bootstrap/commit/ee9472c7d89a90cb229b342396d1f4dac705c4e5))
* **travis:** fix heroku stage ([#4820](https://github.com/valor-software/ngx-bootstrap/issues/4820)) ([fd4a38f](https://github.com/valor-software/ngx-bootstrap/commit/fd4a38f339d3b308e331a56e97504a41e79fb535))
* **travis:** fix tslint stage ([#4813](https://github.com/valor-software/ngx-bootstrap/issues/4813)) ([805c52c](https://github.com/valor-software/ngx-bootstrap/commit/805c52c51bbadeee340614361afbebeb373659d2))
* **tslint:** fix tslint errors ([#4770](https://github.com/valor-software/ngx-bootstrap/issues/4770)) ([d01c533](https://github.com/valor-software/ngx-bootstrap/commit/d01c53316d528a43814ed8b550db18c25ff2e7b8))


### Features

* **build:** disable inline source map ([#4790](https://github.com/valor-software/ngx-bootstrap/issues/4790)) ([5ebf88c](https://github.com/valor-software/ngx-bootstrap/commit/5ebf88ccfe756d196b6d91728483a1b967055531))
* **datepicker:** add Norwegian locale ([#4634](https://github.com/valor-software/ngx-bootstrap/issues/4634)) ([2cc2561](https://github.com/valor-software/ngx-bootstrap/commit/2cc2561b33bbfce849f6df2973a98a563250d816))
* **datepicker:** added Lithuanian locale support for datepicker ([#4787](https://github.com/valor-software/ngx-bootstrap/issues/4787)) ([87e3751](https://github.com/valor-software/ngx-bootstrap/commit/87e3751c1ec8b6eb206a40eed5c7f13a3833f86a))
* **docs:** add summary for use-cases ([#4782](https://github.com/valor-software/ngx-bootstrap/issues/4782)) ([2748ff1](https://github.com/valor-software/ngx-bootstrap/commit/2748ff1bbdae7a7bd9e927dce217ab12ffb31879))
* **docs:** add use-cases for datepicker component ([#4700](https://github.com/valor-software/ngx-bootstrap/issues/4700)) ([e1a9bd5](https://github.com/valor-software/ngx-bootstrap/commit/e1a9bd5e3c3d2b221721d261e6a2a844130e5828))
* **docs:** add use-cases for dropdowns component ([#4733](https://github.com/valor-software/ngx-bootstrap/issues/4733)) ([1342b24](https://github.com/valor-software/ngx-bootstrap/commit/1342b2497e584f4a51f433ffd889096606901db5))
* **docs:** add use-cases for popover component ([#4740](https://github.com/valor-software/ngx-bootstrap/issues/4740)) ([d625db0](https://github.com/valor-software/ngx-bootstrap/commit/d625db0c6f3b263099699945f80dfeb83c8562b5))
* **docs:** add use-cases for progressbar component ([#4744](https://github.com/valor-software/ngx-bootstrap/issues/4744)) ([4b34056](https://github.com/valor-software/ngx-bootstrap/commit/4b3405681656f690b7584e23ecff6b2a6fe47d28))
* **docs:** add use-cases for rating component ([#4745](https://github.com/valor-software/ngx-bootstrap/issues/4745)) ([a74d815](https://github.com/valor-software/ngx-bootstrap/commit/a74d815867144f3315f352f23f57da08b1e6987e))
* **docs:** add use-cases for sortable component ([#4749](https://github.com/valor-software/ngx-bootstrap/issues/4749)) ([f297795](https://github.com/valor-software/ngx-bootstrap/commit/f2977954510cbf222bcff0dc713f35437b3bcf04))
* **docs:** add use-cases for tabs component ([#4753](https://github.com/valor-software/ngx-bootstrap/issues/4753)) ([0c9c707](https://github.com/valor-software/ngx-bootstrap/commit/0c9c707f8ea3ace11c60b26b2cfc7451a63faf7f))
* **docs:** add use-cases for timepicker component ([#4763](https://github.com/valor-software/ngx-bootstrap/issues/4763)) ([2bdd883](https://github.com/valor-software/ngx-bootstrap/commit/2bdd88330bcefe81b4969d1fbe1b982911576a82))
* **docs:** added use-cases for pagination component ([#4684](https://github.com/valor-software/ngx-bootstrap/issues/4684)) ([f67c76e](https://github.com/valor-software/ngx-bootstrap/commit/f67c76e70f8166b73ce7bdc25f1f43e935ccbdf7))
* **docs:** typeahead-use-cases ([#4696](https://github.com/valor-software/ngx-bootstrap/issues/4696)) ([1d2ff35](https://github.com/valor-software/ngx-bootstrap/commit/1d2ff35375716dfbbd2bce9bc6dd45376c2ff46b))



## [3.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.0...v3.1.1) (2018-10-26)


### Bug Fixes

* **latest:** config ([#4716](https://github.com/valor-software/ngx-bootstrap/issues/4716)) ([89e967f](https://github.com/valor-software/ngx-bootstrap/commit/89e967f213a88ceaa646fd42d6efaa424f14d768))
* **tests:** rework offset parameter for correct count day diffs ([#4727](https://github.com/valor-software/ngx-bootstrap/issues/4727)) ([eb907a9](https://github.com/valor-software/ngx-bootstrap/commit/eb907a95c4c7df3a11b45a8002a25646125398b0))


### Features

* **docs:** update docs according to ng add feature ([#4703](https://github.com/valor-software/ngx-bootstrap/issues/4703)) ([b51c21f](https://github.com/valor-software/ngx-bootstrap/commit/b51c21f4c87c307d781ceff08d01963c5f2587a2))
* **schematics:** add specific commands for each component ([#4715](https://github.com/valor-software/ngx-bootstrap/issues/4715)) ([26cc974](https://github.com/valor-software/ngx-bootstrap/commit/26cc97435d0aa139cd5613e36524c0673f6e830e))
* **scripts:** api-doc add compatibility typescript 3 ([#4732](https://github.com/valor-software/ngx-bootstrap/issues/4732)) ([d5de6dd](https://github.com/valor-software/ngx-bootstrap/commit/d5de6dd9f6122ded6568896703bb2c754043237a))



# [3.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.0.1...v3.1.0) (2018-10-19)


### Bug Fixes

* **build:** build with ng-packagr ([#4617](https://github.com/valor-software/ngx-bootstrap/issues/4617)) ([90765c9](https://github.com/valor-software/ngx-bootstrap/commit/90765c90c6b2528ba85efdacc542fa7d8b8febaf))
* **datepicker:** Fix navigation alignment with preserveWhitespaces: false ([#4509](https://github.com/valor-software/ngx-bootstrap/issues/4509)) ([9980218](https://github.com/valor-software/ngx-bootstrap/commit/9980218f9467e995278b3bb18b3cb6eb8d8fdae1)), closes [#4443](https://github.com/valor-software/ngx-bootstrap/issues/4443)
* **Demo:** typeahead, wrong filtering ([#4559](https://github.com/valor-software/ngx-bootstrap/issues/4559)) ([29d9656](https://github.com/valor-software/ngx-bootstrap/commit/29d965644fb60db1aa2152d4217ceaf4a573a53d)), closes [#4557](https://github.com/valor-software/ngx-bootstrap/issues/4557)
* **positioning:** browser rounding width/height bug ([#4328](https://github.com/valor-software/ngx-bootstrap/issues/4328)) ([4201a30](https://github.com/valor-software/ngx-bootstrap/commit/4201a30218f45964ff284e048854630b8cdd0e56)), closes [#4322](https://github.com/valor-software/ngx-bootstrap/issues/4322)
* **progressbar:** toggle striped and animate states ([#4581](https://github.com/valor-software/ngx-bootstrap/issues/4581)) ([436a2e8](https://github.com/valor-software/ngx-bootstrap/commit/436a2e8757abfb97de6fd8eb22810df20ff0be5a)), closes [#3864](https://github.com/valor-software/ngx-bootstrap/issues/3864)
* **rating:** rating titles change format part way through ([#4620](https://github.com/valor-software/ngx-bootstrap/issues/4620)) ([e3c4f2e](https://github.com/valor-software/ngx-bootstrap/commit/e3c4f2ed8b2e2ed1aef34ad691497d1e4ba9adf7)), closes [#1751](https://github.com/valor-software/ngx-bootstrap/issues/1751)
* **styles:** fix right sidebar on IE and Edge ([#4658](https://github.com/valor-software/ngx-bootstrap/issues/4658)) ([63af3e1](https://github.com/valor-software/ngx-bootstrap/commit/63af3e1379481ae0943a08c773fbd7bc6a321a28))
* **timepicker:** changed description for arrow keys ([#4672](https://github.com/valor-software/ngx-bootstrap/issues/4672)) ([4a58fe3](https://github.com/valor-software/ngx-bootstrap/commit/4a58fe3a7ec50ea42c9cb4c547fd00f43f772826))
* **tooltip:** fix containerClass when isOpen is true ([#4579](https://github.com/valor-software/ngx-bootstrap/issues/4579)) ([e225d8d](https://github.com/valor-software/ngx-bootstrap/commit/e225d8ddddfe0f17b209dd1edc3797d8845e2376)), closes [#4247](https://github.com/valor-software/ngx-bootstrap/issues/4247)
* **tooltip:** flickering when hover the mouse ([#4660](https://github.com/valor-software/ngx-bootstrap/issues/4660)) ([3f00320](https://github.com/valor-software/ngx-bootstrap/commit/3f0032000c8430f322c2f2172438658cb5e5f369))
* **typeahead:** dont throw error if latinize is off and no value for input ([#4480](https://github.com/valor-software/ngx-bootstrap/issues/4480)) ([fa6f174](https://github.com/valor-software/ngx-bootstrap/commit/fa6f174af7628e4049149b4fb2a29a65db64f1ad)), closes [#4465](https://github.com/valor-software/ngx-bootstrap/issues/4465)


### Features

* **collapse:** add demo with inline display ([#4630](https://github.com/valor-software/ngx-bootstrap/issues/4630)) ([0ec4c70](https://github.com/valor-software/ngx-bootstrap/commit/0ec4c7010ccb6dac686db078ac427d2602fe7033)), closes [#2473](https://github.com/valor-software/ngx-bootstrap/issues/2473)
* **datapicker:** Capitalize pt-br's locale month names ([#4455](https://github.com/valor-software/ngx-bootstrap/issues/4455)) ([86dd8e8](https://github.com/valor-software/ngx-bootstrap/commit/86dd8e8b8870a1f3d78887f8422a7e867d7f70d6))
* **datepicker:** Slovak locale added to chronos ([#4391](https://github.com/valor-software/ngx-bootstrap/issues/4391)) ([e8d777c](https://github.com/valor-software/ngx-bootstrap/commit/e8d777c3f3072e75c1935a8d6387ca50d3c7f09c))
* **doc:** added docs for modals component ([#4679](https://github.com/valor-software/ngx-bootstrap/issues/4679)) ([6e32261](https://github.com/valor-software/ngx-bootstrap/commit/6e32261c689afd50347aa126460c624f67984b16))
* **docs:** add use-cases for accordion component ([#4677](https://github.com/valor-software/ngx-bootstrap/issues/4677)) ([4d3e342](https://github.com/valor-software/ngx-bootstrap/commit/4d3e342449060847b3636308fff9eaccfcfdb45d))
* **docs:** add use-cases for alerts ([#4680](https://github.com/valor-software/ngx-bootstrap/issues/4680)) ([7c7c515](https://github.com/valor-software/ngx-bootstrap/commit/7c7c515bd0c8692ae27109951bd3d9001619aed4))
* **docs:** add use-cases for buttons component ([#4686](https://github.com/valor-software/ngx-bootstrap/issues/4686)) ([07aced2](https://github.com/valor-software/ngx-bootstrap/commit/07aced28002040bd302afbf56940fe3629ca86aa))
* **docs:** add use-cases for carousel component ([#4689](https://github.com/valor-software/ngx-bootstrap/issues/4689)) ([2eeab60](https://github.com/valor-software/ngx-bootstrap/commit/2eeab6092ba1bc2dc273531741f246a25fb90d00))
* **docs:** add use-cases for collapse component ([#4695](https://github.com/valor-software/ngx-bootstrap/issues/4695)) ([5f535c6](https://github.com/valor-software/ngx-bootstrap/commit/5f535c6e88805bad5a87e810ec2130b54066662b))
* **schematics:** adding schematic for ng-add ([#4678](https://github.com/valor-software/ngx-bootstrap/issues/4678)) ([67b88f5](https://github.com/valor-software/ngx-bootstrap/commit/67b88f55e2c3ebe9bfa84ee6483dfd599c3080be))



## [3.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v3.0.0...v3.0.1) (2018-06-19)


### Bug Fixes

* remove peer dependency on @angular/forms ([#4420](https://github.com/valor-software/ngx-bootstrap/issues/4420)) ([550af9c](https://github.com/valor-software/ngx-bootstrap/commit/550af9c2749d6ce793a94b5bd666fe59bb005c21)), closes [#4411](https://github.com/valor-software/ngx-bootstrap/issues/4411)



# [3.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.0.0-RC.1...v3.0.0) (2018-05-17)


### Bug Fixes

* **main:** fix whitespaces globally for aot ([#4326](https://github.com/valor-software/ngx-bootstrap/issues/4326)) ([0478637](https://github.com/valor-software/ngx-bootstrap/commit/04786378b7a8ce1a0d2d791f1c823dbda90e28f8))
* **typeahead:** change function name from hightlight to highlight ([#4091](https://github.com/valor-software/ngx-bootstrap/issues/4091)) ([97171ff](https://github.com/valor-software/ngx-bootstrap/commit/97171ffcced262e47ad5d733c5e20e16262cbb0a)), closes [#3518](https://github.com/valor-software/ngx-bootstrap/issues/3518)


### Features

* **accordion:** add key navigation to accordion ([#4192](https://github.com/valor-software/ngx-bootstrap/issues/4192)) ([69b35b3](https://github.com/valor-software/ngx-bootstrap/commit/69b35b356787864f53e24ad81dfd90daf3a2a24d))



# [3.0.0-RC.1](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.5...v3.0.0-RC.1) (2018-05-15)


### Bug Fixes

* **chronos:** isUTC tests fixes ([b7bd4b5](https://github.com/valor-software/ngx-bootstrap/commit/b7bd4b573867e53b7b0e5c6272961dc18d54e435))
* **demo:** fix api refenrences for pager component ([#4323](https://github.com/valor-software/ngx-bootstrap/issues/4323)) ([3249452](https://github.com/valor-software/ngx-bootstrap/commit/324945233c0fb24faef5cc86b5daab154f1242d3))
* **main:** preserve whitespaces globally ([#4324](https://github.com/valor-software/ngx-bootstrap/issues/4324)) ([fee535a](https://github.com/valor-software/ngx-bootstrap/commit/fee535a16aef6d4e352c8bc8f23778ce23abf030))
* **rxjs/operators:** use rxjs pipeable operators pattern, remove import path(not used) ([#4169](https://github.com/valor-software/ngx-bootstrap/issues/4169)) ([f7c5423](https://github.com/valor-software/ngx-bootstrap/commit/f7c542329ab1af7dbc91e1d0bcad1de8ab3ceffc))


### Features

* **angular:** upgraded angular and rxjs to v6 ([e36f7d9](https://github.com/valor-software/ngx-bootstrap/commit/e36f7d9466ef9e67df2e44c1edd31695a2b23023))



## [2.0.5](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.4...v2.0.5) (2018-05-07)


### Bug Fixes

* **chronos:** ro locale updated to momenjs etalon ([2634e8f](https://github.com/valor-software/ngx-bootstrap/commit/2634e8f18211efec33a67994be5edacfd786bfd8))
* **chronos:** updated fi locale tests ([ae01bb0](https://github.com/valor-software/ngx-bootstrap/commit/ae01bb0a77c7b5b85ed09968be50e5c7d9864a6c))
* **demo:** fix api references for pagination component ([#4303](https://github.com/valor-software/ngx-bootstrap/issues/4303)) ([edc7b95](https://github.com/valor-software/ngx-bootstrap/commit/edc7b951d633688cef7d60d57bb9799de231e94e))


### Features

* **buttons:** add aria-attributes ([#4082](https://github.com/valor-software/ngx-bootstrap/issues/4082)) ([49ee88e](https://github.com/valor-software/ngx-bootstrap/commit/49ee88ed35349d980e53b993e0cfc4e53e4d206d)), closes [#4068](https://github.com/valor-software/ngx-bootstrap/issues/4068)
* **datepicker:** add Romanian locale to date picker ([#4205](https://github.com/valor-software/ngx-bootstrap/issues/4205)) ([6a95b76](https://github.com/valor-software/ngx-bootstrap/commit/6a95b769802db187226427760113cca0717f76bd))
* **datepicker:** Added Slovenian locale support for datepicker ([#4035](https://github.com/valor-software/ngx-bootstrap/issues/4035)) ([6e2e60f](https://github.com/valor-software/ngx-bootstrap/commit/6e2e60f89864e4e88af0dc806f648834e5f77e73))
* **locale:** Galician locale ([#4246](https://github.com/valor-software/ngx-bootstrap/issues/4246)) ([08e3f56](https://github.com/valor-software/ngx-bootstrap/commit/08e3f56ec7cc0b6e19ad7306b465c4b162b306d1))
* **locale:** Mongolian locale ([#4161](https://github.com/valor-software/ngx-bootstrap/issues/4161)) ([91ffd36](https://github.com/valor-software/ngx-bootstrap/commit/91ffd363d54ba007cdd5e0b58d66eb133140ef18))
* **sortable:** add aria attributes ([#4163](https://github.com/valor-software/ngx-bootstrap/issues/4163)) ([00a331a](https://github.com/valor-software/ngx-bootstrap/commit/00a331ad3f6ea150b5b3d0a1cde034dd5c68e1e5)), closes [#4152](https://github.com/valor-software/ngx-bootstrap/issues/4152)
* **timepicker:** hide arrows with [hidden] attribute ([#4197](https://github.com/valor-software/ngx-bootstrap/issues/4197)) ([190e2db](https://github.com/valor-software/ngx-bootstrap/commit/190e2db9ad9516992a75bc4a6632e1c1369539de))



## [2.0.4](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.3...v2.0.4) (2018-04-16)


### Bug Fixes

* **build:** lock @types/tapable ([#3985](https://github.com/valor-software/ngx-bootstrap/issues/3985)) ([407ecd0](https://github.com/valor-software/ngx-bootstrap/commit/407ecd0926daf774845b0a8a00ab43e13f16bc3b))
* **demo:** fix left sidebar is not fully visible on small screens ([#3780](https://github.com/valor-software/ngx-bootstrap/issues/3780)) ([7e30c6f](https://github.com/valor-software/ngx-bootstrap/commit/7e30c6fdf80f39d0ce1d9c39b4a1a39964f1cb5c)), closes [#3383](https://github.com/valor-software/ngx-bootstrap/issues/3383)
* **demo:** fix links at getting started page. Update travis config - allow failed units ([#4218](https://github.com/valor-software/ngx-bootstrap/issues/4218)) ([ae07b41](https://github.com/valor-software/ngx-bootstrap/commit/ae07b415ee73637312fcf2df206fd43e59384800))
* **demo:** remove repetition id in demos ([#3937](https://github.com/valor-software/ngx-bootstrap/issues/3937)) ([c4c2877](https://github.com/valor-software/ngx-bootstrap/commit/c4c28775df535658378b47bd9a579fafc4f50b42)), closes [#3936](https://github.com/valor-software/ngx-bootstrap/issues/3936)
* **demo-sidebar:** remove list duplicate from sidebar ([#4201](https://github.com/valor-software/ngx-bootstrap/issues/4201)) ([605efd1](https://github.com/valor-software/ngx-bootstrap/commit/605efd13b4ca22ca584f74f002a602a4bb80b77a))
* **modal:** close only one directive modal with one esc pressing ([#4223](https://github.com/valor-software/ngx-bootstrap/issues/4223)) ([83af591](https://github.com/valor-software/ngx-bootstrap/commit/83af591bd5251cd9d2afbd7b6b8ff4954fec9bf9))
* **modals:** fix minimize Safari after press esc ([#3605](https://github.com/valor-software/ngx-bootstrap/issues/3605)) ([9c8cef4](https://github.com/valor-software/ngx-bootstrap/commit/9c8cef435eb3675529af982da4d2fd892c86e588)), closes [#3313](https://github.com/valor-software/ngx-bootstrap/issues/3313)
* **tests:** change run cypress tests for faster local run. Refactor test for making them readable ([#3742](https://github.com/valor-software/ngx-bootstrap/issues/3742)) ([c7b91fa](https://github.com/valor-software/ngx-bootstrap/commit/c7b91fa0ad0f2712ad52327165d75942cb5b1ad9))
* **tooltip:** The content(button) extends beyond the tooltip's field in Dynamic Html demo section ([#4102](https://github.com/valor-software/ngx-bootstrap/issues/4102)) ([a123c2c](https://github.com/valor-software/ngx-bootstrap/commit/a123c2ccb9e1ad08b47eab0268a6c887a271a021))
* **tooltip-popover:** fix arrow position for bs4 ([#3784](https://github.com/valor-software/ngx-bootstrap/issues/3784)) ([0b1d8e7](https://github.com/valor-software/ngx-bootstrap/commit/0b1d8e721f04c96d7d7e070e369f57bc834cc58d))


### Features

* **accordion:** add key navigation to accordion ([#3993](https://github.com/valor-software/ngx-bootstrap/issues/3993)) ([8bb2fdf](https://github.com/valor-software/ngx-bootstrap/commit/8bb2fdf7dc6c763e44ee6bfbc4ed86d20438edc0))
* **accordion:** revert changes for accordion key nav support ([#4093](https://github.com/valor-software/ngx-bootstrap/issues/4093)) ([8a46e6e](https://github.com/valor-software/ngx-bootstrap/commit/8a46e6ea9f1345124f7e3e32541334d46d12738a))
* **build:** use npm ci, it's faster then yarn ([#4059](https://github.com/valor-software/ngx-bootstrap/issues/4059)) ([838eee7](https://github.com/valor-software/ngx-bootstrap/commit/838eee701e422eee64222df2ba2fd5a418f21d59))
* **carousel:** add aria-attributes ([#4131](https://github.com/valor-software/ngx-bootstrap/issues/4131)) ([a21d3e0](https://github.com/valor-software/ngx-bootstrap/commit/a21d3e070596f50468b7b00ff52d840128417ec5)), closes [#4130](https://github.com/valor-software/ngx-bootstrap/issues/4130)
* **datepicker:** add aria-attributes ([#4141](https://github.com/valor-software/ngx-bootstrap/issues/4141)) ([20c6b87](https://github.com/valor-software/ngx-bootstrap/commit/20c6b87b182200db06e75115bb2e6e757389063a)), closes [#4132](https://github.com/valor-software/ngx-bootstrap/issues/4132)
* **demo:** add alt attribute in images ([#3932](https://github.com/valor-software/ngx-bootstrap/issues/3932)) ([122a0e5](https://github.com/valor-software/ngx-bootstrap/commit/122a0e529a9d4772b54a1db5b2d58e797c7d8438))
* **locale:** Finnish locale ([#3991](https://github.com/valor-software/ngx-bootstrap/issues/3991)) ([a333700](https://github.com/valor-software/ngx-bootstrap/commit/a333700b77927b3eaad9bbbaa34eea2c26d83b50))
* **modals:** dont call hide() func on esc if modal is not shown ([#4221](https://github.com/valor-software/ngx-bootstrap/issues/4221)) ([9254837](https://github.com/valor-software/ngx-bootstrap/commit/9254837888de6ee51785a3d4fd2bf5b32d93e394))
* **old-datepicker:** adding id for tag ([#3695](https://github.com/valor-software/ngx-bootstrap/issues/3695)) ([be14f34](https://github.com/valor-software/ngx-bootstrap/commit/be14f34dae26d354038a0cb2b533c36a7da9e00f))
* **timepicker:** add validation for timepicker ([#3588](https://github.com/valor-software/ngx-bootstrap/issues/3588)) ([d8ee1f8](https://github.com/valor-software/ngx-bootstrap/commit/d8ee1f83bb83e2db5ea5c4d52ec03f7e102f94b6)), closes [#3549](https://github.com/valor-software/ngx-bootstrap/issues/3549) [#3288](https://github.com/valor-software/ngx-bootstrap/issues/3288)



## [2.0.3](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.2...v2.0.3) (2018-03-12)


### Bug Fixes

* **alerts:** after dismissing alert are not removing from DOM [#3608](https://github.com/valor-software/ngx-bootstrap/issues/3608) ([#3622](https://github.com/valor-software/ngx-bootstrap/issues/3622)) ([479778a](https://github.com/valor-software/ngx-bootstrap/commit/479778abd3d620e50ada63c3588e3d1a12070a89))
* **build:** fix failed npm run build ([#3867](https://github.com/valor-software/ngx-bootstrap/issues/3867)) ([f5d8bcc](https://github.com/valor-software/ngx-bootstrap/commit/f5d8bcc14b283dd4a8d57147b6b2f4650c7cb679)), closes [#3866](https://github.com/valor-software/ngx-bootstrap/issues/3866)
* **build:** lock awesome typescript loader ([#3945](https://github.com/valor-software/ngx-bootstrap/issues/3945)) ([28e9a15](https://github.com/valor-software/ngx-bootstrap/commit/28e9a1531c597f777eb94ee01bf2cc8f385b4506))
* **datepicker:** added comma to index file ([#3912](https://github.com/valor-software/ngx-bootstrap/issues/3912)) ([b94bc15](https://github.com/valor-software/ngx-bootstrap/commit/b94bc155f7798bc80970f8f72312e0a606c0f7fc))
* **datepicker:** fix width in daterangerpicker at locates example ([#3543](https://github.com/valor-software/ngx-bootstrap/issues/3543)) ([72c7cb3](https://github.com/valor-software/ngx-bootstrap/commit/72c7cb30bc58d2bf221e99ace744ddaa036448b4))
* **datepicker:** remove position fixed ([#3610](https://github.com/valor-software/ngx-bootstrap/issues/3610)) ([bca0b42](https://github.com/valor-software/ngx-bootstrap/commit/bca0b4277eb3f64afdc3f92d38e195941f7b10fd)), closes [#3300](https://github.com/valor-software/ngx-bootstrap/issues/3300)
* **demo:** add null check in preventEmptyHrefNav method ([#3948](https://github.com/valor-software/ngx-bootstrap/issues/3948)) ([1a9c17d](https://github.com/valor-software/ngx-bootstrap/commit/1a9c17d78b48d4ec8c1559dbaf64f67362b2d97c))
* **demo:** added wrapper to progressbar ([#3752](https://github.com/valor-software/ngx-bootstrap/issues/3752)) ([78a5e06](https://github.com/valor-software/ngx-bootstrap/commit/78a5e06bd19ed9a265c829ea8015b95356d0ea36))
* **demo:** fix add-nav scroll to selected sections ([#3593](https://github.com/valor-software/ngx-bootstrap/issues/3593)) ([8182d92](https://github.com/valor-software/ngx-bootstrap/commit/8182d92b8db530b6415604d5f7bcab21e1f6808a))
* **demo:** fix datepicker imports ([#3910](https://github.com/valor-software/ngx-bootstrap/issues/3910)) ([e748105](https://github.com/valor-software/ngx-bootstrap/commit/e74810581e39872d73d0bfe6a7899ba6f1afe758))
* **demo:** fix demo header static position for safari browser ([#3600](https://github.com/valor-software/ngx-bootstrap/issues/3600)) ([2f0e7f8](https://github.com/valor-software/ngx-bootstrap/commit/2f0e7f81b417235d22cd350e9e6917da8f5a1f92)), closes [#3312](https://github.com/valor-software/ngx-bootstrap/issues/3312)
* **demo:** Fixed routings issue for links with inner html tags ([#3816](https://github.com/valor-software/ngx-bootstrap/issues/3816)) ([5869afb](https://github.com/valor-software/ngx-bootstrap/commit/5869afb2ba0306a68613eb692c25ba2cf41220b0)), closes [#3813](https://github.com/valor-software/ngx-bootstrap/issues/3813)
* **demo:** rename Timepicker demo to Basic ([#3733](https://github.com/valor-software/ngx-bootstrap/issues/3733)) ([1eb7990](https://github.com/valor-software/ngx-bootstrap/commit/1eb79901dff88758d89edf1ef058afd6d1ec0ac9))
* **dropdown:** fix dropup bs3 position ([#3863](https://github.com/valor-software/ngx-bootstrap/issues/3863)) ([2a177aa](https://github.com/valor-software/ngx-bootstrap/commit/2a177aade11ad7ca95e7a0e8bdf168aeb082a9da))
* **pagination:** fix PageChangeEvent export ([#3880](https://github.com/valor-software/ngx-bootstrap/issues/3880)) ([083ad0c](https://github.com/valor-software/ngx-bootstrap/commit/083ad0c825ebfa04d539c80f07880399939718f7))
* **progressbar:** fix stacked progressbar for bs4 ([#3582](https://github.com/valor-software/ngx-bootstrap/issues/3582)) ([50defdd](https://github.com/valor-software/ngx-bootstrap/commit/50defdd3c766d4dbd13f96c36c91d7c122dc24cd))
* **tabs:** add custom template in demo ([#3558](https://github.com/valor-software/ngx-bootstrap/issues/3558)) ([de90609](https://github.com/valor-software/ngx-bootstrap/commit/de90609dd8a79936d02237bc61af7cae903bc57b)), closes [#3548](https://github.com/valor-software/ngx-bootstrap/issues/3548)
* **tabs:** decompose manual selection section ([#3547](https://github.com/valor-software/ngx-bootstrap/issues/3547)) ([6c9afd9](https://github.com/valor-software/ngx-bootstrap/commit/6c9afd91c7efeb83548a60bc123e762610e1f498)), closes [#3545](https://github.com/valor-software/ngx-bootstrap/issues/3545)
* **test:** update @types/webpack ([#3970](https://github.com/valor-software/ngx-bootstrap/issues/3970)) ([bcbe405](https://github.com/valor-software/ngx-bootstrap/commit/bcbe405f1dac4c23d43463919c5a228779d6b091))
* **tests:** fix test after hard resolving conflicts ([#3946](https://github.com/valor-software/ngx-bootstrap/issues/3946)) ([5955ca7](https://github.com/valor-software/ngx-bootstrap/commit/5955ca74bd4de4e710c3c9475c908a4c5f714b61))
* **tests:** remove unstable part of e2e ([#3716](https://github.com/valor-software/ngx-bootstrap/issues/3716)) ([465ed0d](https://github.com/valor-software/ngx-bootstrap/commit/465ed0d2b23dc40162ad8d6f56ca233e5900244c))
* **tests:** updating link to ng-team for cypress ([#3674](https://github.com/valor-software/ngx-bootstrap/issues/3674)) ([6ebc6a6](https://github.com/valor-software/ngx-bootstrap/commit/6ebc6a67395ce43f4703d9c700e755c24aa3f8a0))
* **timepicker:** remove unnecessary space when showMeridian is false ([#3907](https://github.com/valor-software/ngx-bootstrap/issues/3907)) ([e7b96cd](https://github.com/valor-software/ngx-bootstrap/commit/e7b96cdc2eb55022a7887686f6c5a151e328775c))


### Features

* **accordion:** add to "Api Reference" section accordion component ([#3644](https://github.com/valor-software/ngx-bootstrap/issues/3644)) ([1c1f592](https://github.com/valor-software/ngx-bootstrap/commit/1c1f59246af0c3f00dbdc8b44ecfb01fe4513a7e)), closes [#3643](https://github.com/valor-software/ngx-bootstrap/issues/3643)
* **chronos:** add indonesia locale ([#3532](https://github.com/valor-software/ngx-bootstrap/issues/3532)) ([8ba8b18](https://github.com/valor-software/ngx-bootstrap/commit/8ba8b18f9804e3d5dd16a71596ba2c3ace84d7dd))
* **tests:** add cypress e2e tests instead of protractor e2e and e2e-bdd tests ([#3515](https://github.com/valor-software/ngx-bootstrap/issues/3515)) ([4ff55ce](https://github.com/valor-software/ngx-bootstrap/commit/4ff55ced9546847d3907fba4791a5fed40a995ec))
* **timepicker:** Add ability to set readonly/disabled state [#3602](https://github.com/valor-software/ngx-bootstrap/issues/3602) ([#3611](https://github.com/valor-software/ngx-bootstrap/issues/3611)) ([4e5f828](https://github.com/valor-software/ngx-bootstrap/commit/4e5f8287dc510d8d599261f0a4cb1ab05b244d7a)), closes [#3549](https://github.com/valor-software/ngx-bootstrap/issues/3549) [#3288](https://github.com/valor-software/ngx-bootstrap/issues/3288) [#3371](https://github.com/valor-software/ngx-bootstrap/issues/3371)
* **typeahead:** Allow typeahead to cancel ongoing requests ([#3865](https://github.com/valor-software/ngx-bootstrap/issues/3865)) ([67e073f](https://github.com/valor-software/ngx-bootstrap/commit/67e073fc8e30897532c547f851ee6594c87fff76)), closes [#1626](https://github.com/valor-software/ngx-bootstrap/issues/1626) [#1626](https://github.com/valor-software/ngx-bootstrap/issues/1626)



## [2.0.2](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.1...v2.0.2) (2018-01-24)


### Bug Fixes

* **datepicker:** date parsing when using a custom date format ([#3522](https://github.com/valor-software/ngx-bootstrap/issues/3522)) ([5c2aa9e](https://github.com/valor-software/ngx-bootstrap/commit/5c2aa9e0a57983b9a621a610f361067b3ad0497c))


### Features

* **chronos:** add danish locale configuration ([#3514](https://github.com/valor-software/ngx-bootstrap/issues/3514)) ([8fe43e2](https://github.com/valor-software/ngx-bootstrap/commit/8fe43e2684ee8a85af10d32a71eae2abe1f0e0d8))



## [2.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0...v2.0.1) (2018-01-20)


### Bug Fixes

* **datepicker:** bs date range picker config added to correct provider ([446cdf9](https://github.com/valor-software/ngx-bootstrap/commit/446cdf9d229bb9909f5d24f758d52bcee55163fe))



# [2.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-rc.1...v2.0.0) (2018-01-19)


### Bug Fixes

* **progressbar:** fix bs4, animation, add striped option, remove bs4 demos ([#3500](https://github.com/valor-software/ngx-bootstrap/issues/3500)) ([27cb1a2](https://github.com/valor-software/ngx-bootstrap/commit/27cb1a22497cf7f4d01aebcf18e919d0702392f6))


### Features

* **datepicker:** added date and range min, max and invalid validation ([#3499](https://github.com/valor-software/ngx-bootstrap/issues/3499)) ([7b43295](https://github.com/valor-software/ngx-bootstrap/commit/7b43295000594ea51fb1b4d11ede301cc2adc1a1)), closes [#2727](https://github.com/valor-software/ngx-bootstrap/issues/2727) [#3498](https://github.com/valor-software/ngx-bootstrap/issues/3498)
* **datepicker:** added date range picker config ([#3501](https://github.com/valor-software/ngx-bootstrap/issues/3501)) ([7c53bf9](https://github.com/valor-software/ngx-bootstrap/commit/7c53bf9121d4801af1403e2978cd3533612c31e5))



# [2.0.0-rc.1](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2018-01-19)


### Bug Fixes

* **buttons:** fix radio btns for reactive forms, add radio reactive demo ([#3384](https://github.com/valor-software/ngx-bootstrap/issues/3384)) ([b2b8bdc](https://github.com/valor-software/ngx-bootstrap/commit/b2b8bdc29659acd8803670b19668252a2d7e591a)), closes [#2581](https://github.com/valor-software/ngx-bootstrap/issues/2581)
* **carousel:** toggle carousel-indicators via property  ([#3319](https://github.com/valor-software/ngx-bootstrap/issues/3319)) ([4164937](https://github.com/valor-software/ngx-bootstrap/commit/416493787df811638b2e1c3674725c35acc8b35e)), closes [#1021](https://github.com/valor-software/ngx-bootstrap/issues/1021)
* **ci:** fix heroku, deploy only demo/dist ([#3441](https://github.com/valor-software/ngx-bootstrap/issues/3441)) ([321f9ae](https://github.com/valor-software/ngx-bootstrap/commit/321f9ae75473ea2cd9906165ba26be1cc0d9b237))
* **datepicker:** fix errors on fullTemplateTypeCheck rule ([#3462](https://github.com/valor-software/ngx-bootstrap/issues/3462)) ([446587e](https://github.com/valor-software/ngx-bootstrap/commit/446587e43ab6759cea6c761c18477adc93f39f65)), closes [#3455](https://github.com/valor-software/ngx-bootstrap/issues/3455)
* **demo:** fix favicon image ([#3381](https://github.com/valor-software/ngx-bootstrap/issues/3381)) ([005701d](https://github.com/valor-software/ngx-bootstrap/commit/005701dbc3b2d1d3599baacc822459b73955d0bf))
* **demo:** fix for timepicker demo layout ([#3442](https://github.com/valor-software/ngx-bootstrap/issues/3442)) ([4905ab2](https://github.com/valor-software/ngx-bootstrap/commit/4905ab2617e51aaa15a0f463c268d496d466f817))
* **demo:** fix logo for getting-started page ([#3448](https://github.com/valor-software/ngx-bootstrap/issues/3448)) ([3de13fb](https://github.com/valor-software/ngx-bootstrap/commit/3de13fb917193ea56782a483ab5c121bf2366117))
* **demo:** fix progressbar demo page autoscroll top ([#3449](https://github.com/valor-software/ngx-bootstrap/issues/3449)) ([5edd41c](https://github.com/valor-software/ngx-bootstrap/commit/5edd41cab6ff8fbed0ef953da6bdd600a5647a5b))
* **demo:** fix sidenav last item on small height screen ([#3419](https://github.com/valor-software/ngx-bootstrap/issues/3419)) ([3667c06](https://github.com/valor-software/ngx-bootstrap/commit/3667c065a9f3427caeeedfa9878143d4f4a88dec)), closes [#3295](https://github.com/valor-software/ngx-bootstrap/issues/3295)
* **dropdown:** fix dropup position with container body (bs3) ([#3343](https://github.com/valor-software/ngx-bootstrap/issues/3343)) ([402015d](https://github.com/valor-software/ngx-bootstrap/commit/402015d469d6e67eb6c2937ca416b9c20f06847b))
* **modal:** fix circular dependency warning ([#3359](https://github.com/valor-software/ngx-bootstrap/issues/3359)) ([59c0bf9](https://github.com/valor-software/ngx-bootstrap/commit/59c0bf94fa5dc9091679a722611c88869d5f1ad7))
* **modal:** focus modal container on init ([#3357](https://github.com/valor-software/ngx-bootstrap/issues/3357)) ([dd33e63](https://github.com/valor-software/ngx-bootstrap/commit/dd33e63cced1356f527eab23100fe55c396cbfa2))
* **modal:** reset scrollbar pixel ([#3491](https://github.com/valor-software/ngx-bootstrap/issues/3491)) ([1cd6f94](https://github.com/valor-software/ngx-bootstrap/commit/1cd6f94954f5eee6402d29e77bb7a8976438e936)), closes [#3490](https://github.com/valor-software/ngx-bootstrap/issues/3490)
* **popover & tooltip:** fix arrow position ([#3405](https://github.com/valor-software/ngx-bootstrap/issues/3405)) ([15ae2f0](https://github.com/valor-software/ngx-bootstrap/commit/15ae2f00eda8666250e1172324940873ceff744a))
* **tests:** fixing e2e type errors ([#3358](https://github.com/valor-software/ngx-bootstrap/issues/3358)) ([5136fd6](https://github.com/valor-software/ngx-bootstrap/commit/5136fd66653b45ea27d3f0896962c9c77034f571))
* **tooltip:** fix delay ([#3463](https://github.com/valor-software/ngx-bootstrap/issues/3463)) ([a1a54df](https://github.com/valor-software/ngx-bootstrap/commit/a1a54dfa2fd31bee2cc86f9e7b68d4864c317f60)), closes [#3038](https://github.com/valor-software/ngx-bootstrap/issues/3038)
* **typeahead:** apply existing text on focus and click with typeaheadMinLength = 0 ([#3322](https://github.com/valor-software/ngx-bootstrap/issues/3322)) ([21813b1](https://github.com/valor-software/ngx-bootstrap/commit/21813b14bb15cea903ca57c3a6aa6ce59a2dcc90))
* **typeahead:** fix autoselect on tab key with typeaheadMinLength=0 ([#3378](https://github.com/valor-software/ngx-bootstrap/issues/3378)) ([eaed118](https://github.com/valor-software/ngx-bootstrap/commit/eaed1182b9d0b032d6ffb50d39728526831d9aa5))
* **typeahead:** fix flickering ([#3321](https://github.com/valor-software/ngx-bootstrap/issues/3321)) ([cf1411a](https://github.com/valor-software/ngx-bootstrap/commit/cf1411a0c91c9f70d95ed4a16c2c7246dc80535a))


### Features

* **build:** change import for barrel file's, update seed doc ([#2990](https://github.com/valor-software/ngx-bootstrap/issues/2990)) ([7346a5a](https://github.com/valor-software/ngx-bootstrap/commit/7346a5a0027d86ccbd144a23fa6d54e548d33fea))
* **chronos:** added th locale spec ([#3450](https://github.com/valor-software/ngx-bootstrap/issues/3450)) ([bd6b119](https://github.com/valor-software/ngx-bootstrap/commit/bd6b119b836a4da9ca2f0d3fa1caef3e2e6603ce))
* **chronos:** bs-moment renamed to chronos and all locales was suffixed with Locale ([#3456](https://github.com/valor-software/ngx-bootstrap/issues/3456)) ([dfd489b](https://github.com/valor-software/ngx-bootstrap/commit/dfd489b60db9078e33ad12c930da0243e4f28a60))
* **datepicker:** added custom date parse logic for manual date input ([#3271](https://github.com/valor-software/ngx-bootstrap/issues/3271)) ([4f5fc18](https://github.com/valor-software/ngx-bootstrap/commit/4f5fc185ec08418521a553a94f976e4a54c6b892)), closes [#3206](https://github.com/valor-software/ngx-bootstrap/issues/3206) [#3104](https://github.com/valor-software/ngx-bootstrap/issues/3104) [#2809](https://github.com/valor-software/ngx-bootstrap/issues/2809)
* **datepicker:** added Thai locale support for datepicker ([#3409](https://github.com/valor-software/ngx-bootstrap/issues/3409)) ([662d8c1](https://github.com/valor-software/ngx-bootstrap/commit/662d8c10e44dfd5a5a08da5fa845ab52c73a07f2))
* **datepicker:** disable specified days of week ([#2744](https://github.com/valor-software/ngx-bootstrap/issues/2744)) ([957d54b](https://github.com/valor-software/ngx-bootstrap/commit/957d54b4b4a08a0eb806656c7ec2f93dd1a0eeaf))
* **modal:** resolve modal data before OnInit ([#2600](https://github.com/valor-software/ngx-bootstrap/issues/2600)) ([bf6361e](https://github.com/valor-software/ngx-bootstrap/commit/bf6361eefd5f3054ab1203b4891ae57cc6f3b763)), closes [#2530](https://github.com/valor-software/ngx-bootstrap/issues/2530) [#2733](https://github.com/valor-software/ngx-bootstrap/issues/2733)
* **package:** upgrade to use bootstrap v4 ([#3495](https://github.com/valor-software/ngx-bootstrap/issues/3495)) ([aa25e6a](https://github.com/valor-software/ngx-bootstrap/commit/aa25e6aebb83edac9e26efaecb47f17ba94382bc))
* **styles:** updated bootstrap4 styles to ver bootstrap-4.0.0-beta.2 ([#3306](https://github.com/valor-software/ngx-bootstrap/issues/3306)) ([86a747c](https://github.com/valor-software/ngx-bootstrap/commit/86a747c6c38d273ec4e40d5d39af0e780a3f7445))
* **timepicker:** showMinutes flag for toggle MinutesField in timepicker([#2430](https://github.com/valor-software/ngx-bootstrap/issues/2430)) ([#3341](https://github.com/valor-software/ngx-bootstrap/issues/3341)) ([9099b21](https://github.com/valor-software/ngx-bootstrap/commit/9099b2104c6380e2c480b0ce8df881a1495c266c))


### BREAKING CHANGES

* **chronos:** - bs-moment renamed to chronos
- all locales was suffixed with Locale (en -> enLocale)



# [2.0.0-rc.0](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.11...v2.0.0-rc.0) (2017-12-14)


### Bug Fixes

* **typeahead:** define latimap properly ([#3270](https://github.com/valor-software/ngx-bootstrap/issues/3270)) ([d363e5d](https://github.com/valor-software/ngx-bootstrap/commit/d363e5dd24c0979bff64c9cd4fc1719ce6736390)), closes [#3126](https://github.com/valor-software/ngx-bootstrap/issues/3126)


### Features

* **demo:** add missing section title ([#3249](https://github.com/valor-software/ngx-bootstrap/issues/3249)) ([71a2f33](https://github.com/valor-software/ngx-bootstrap/commit/71a2f33ae575c2953f50a915c6f8e98c1dc0b21c))



# [2.0.0-beta.11](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2017-12-08)


### Bug Fixes

* **datepicker:** if value is null dont reset date to 1970 ([#3207](https://github.com/valor-software/ngx-bootstrap/issues/3207)) ([8761038](https://github.com/valor-software/ngx-bootstrap/commit/8761038f8138b228ff1256ce6e12d9ede8c9c903))
* **old-datepicker:** summer time ([#3122](https://github.com/valor-software/ngx-bootstrap/issues/3122)) ([422d3bc](https://github.com/valor-software/ngx-bootstrap/commit/422d3bc7f1663db3a9507249666cac3031bca00c))


### Features

* **build:** add es2015 build target support ([#3202](https://github.com/valor-software/ngx-bootstrap/issues/3202)) ([735101c](https://github.com/valor-software/ngx-bootstrap/commit/735101c51bad2e5d07c856005ae88ddd8123abd2))
* **datepicker:** added BsLocaleService to change datepicker locale ([#3209](https://github.com/valor-software/ngx-bootstrap/issues/3209)) ([4a7f2f0](https://github.com/valor-software/ngx-bootstrap/commit/4a7f2f0ed720d159430961f7acddfd781628561c))
* **tests:** covering navigation feature with bdd ([#3026](https://github.com/valor-software/ngx-bootstrap/issues/3026)) ([c5fb8dc](https://github.com/valor-software/ngx-bootstrap/commit/c5fb8dce9c8150734e2f7d4d1fb38c2b191e537f))



# [2.0.0-beta.10](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2017-12-05)


### Bug Fixes

* **accordion demo:** fix bootstrap link in API Reference ([#3193](https://github.com/valor-software/ngx-bootstrap/issues/3193)) ([a1a1c74](https://github.com/valor-software/ngx-bootstrap/commit/a1a1c7408924fa4087ab78c059b2fbf5fa705ac2))
* **datepicker:** date manipulation was jumping over a month top ([#3130](https://github.com/valor-software/ngx-bootstrap/issues/3130)) ([a7416e6](https://github.com/valor-software/ngx-bootstrap/commit/a7416e60976f7f0df2491fb7b0cd1c34d660a59b)), closes [#2902](https://github.com/valor-software/ngx-bootstrap/issues/2902)
* **datepicker:** fixed viewed date if min max is set ([#3129](https://github.com/valor-software/ngx-bootstrap/issues/3129)) ([13bf18e](https://github.com/valor-software/ngx-bootstrap/commit/13bf18eabc6977c46776a139267c91ab7c7b0ea5)), closes [#3123](https://github.com/valor-software/ngx-bootstrap/issues/3123) [#2711](https://github.com/valor-software/ngx-bootstrap/issues/2711)
* **datepicker:** if min date is last day of a month ([#3113](https://github.com/valor-software/ngx-bootstrap/issues/3113)) ([ec445e2](https://github.com/valor-software/ngx-bootstrap/commit/ec445e2368dddc672d2fd5f0ba9325373dba1ede)), closes [#3102](https://github.com/valor-software/ngx-bootstrap/issues/3102)
* **datepicker:** model should be prestine on init from ngModel ([#3115](https://github.com/valor-software/ngx-bootstrap/issues/3115)) ([6bb077c](https://github.com/valor-software/ngx-bootstrap/commit/6bb077cf05db36f7eaea5b20d4bec904fb843f52)), closes [#3014](https://github.com/valor-software/ngx-bootstrap/issues/3014)
* **datepicker:** reseting min and max boundaries will reset it in datepicker ([#3112](https://github.com/valor-software/ngx-bootstrap/issues/3112)) ([a72fedc](https://github.com/valor-software/ngx-bootstrap/commit/a72fedce09f18ddd42849ed5659db0be8ab0ec7b)), closes [#3085](https://github.com/valor-software/ngx-bootstrap/issues/3085)
* **daterangepicker:** After clearing input, daterangepicker couldn't be opened ([dfdc58d](https://github.com/valor-software/ngx-bootstrap/commit/dfdc58dca8cee58e9c340a79ad215d1d7d3afe87)), closes [#3191](https://github.com/valor-software/ngx-bootstrap/issues/3191)
* **modal:** fix memory leak for TemplateRef modals ([#3179](https://github.com/valor-software/ngx-bootstrap/issues/3179)) ([d5d1acf](https://github.com/valor-software/ngx-bootstrap/commit/d5d1acfc21823fc75ca8cab6a3f7f4204b41150f))
* **tests:** add custom launcher for HeadlessChrome ([#3157](https://github.com/valor-software/ngx-bootstrap/issues/3157)) ([909e7ae](https://github.com/valor-software/ngx-bootstrap/commit/909e7ae8a584bf04420e9acb6e04896c67b5216b))
* **version dropdown:** z-index fix for version dropdown and header ([#3190](https://github.com/valor-software/ngx-bootstrap/issues/3190)) ([784d881](https://github.com/valor-software/ngx-bootstrap/commit/784d88115c74d42dcf1a9968e58ba09193e0e2ed))


### Features

* **datepicker:** datepicker now is a directive not a component ([#3125](https://github.com/valor-software/ngx-bootstrap/issues/3125)) ([d9822f0](https://github.com/valor-software/ngx-bootstrap/commit/d9822f04e45420db4200a940f95ef2362b6710ec))
* **modal:** ModalDirective should use config.animated ([#3156](https://github.com/valor-software/ngx-bootstrap/issues/3156)) ([f5679eb](https://github.com/valor-software/ngx-bootstrap/commit/f5679ebac30016990c50b9a9e40b99314e47aa0d))


### BREAKING CHANGES

* **datepicker:**   - datepicker and daterange component selectors was removed
  - now datepicker available only as directive



# [2.0.0-beta.9](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2017-11-23)


### Bug Fixes

* **bs-moment:** fix postformat for empty values ([d3bb3fd](https://github.com/valor-software/ngx-bootstrap/commit/d3bb3fd9bcdb93404bd7d4afc9d41087ea87cac9))
* **datepicker:** added export of he locale and fixed demo ([7616362](https://github.com/valor-software/ngx-bootstrap/commit/761636269de07b90b9608b0cfab8eb4d1cd07dd6))
* **demo:** fix scrollTop ([#2886](https://github.com/valor-software/ngx-bootstrap/issues/2886)) ([2e99010](https://github.com/valor-software/ngx-bootstrap/commit/2e9901069e01508a3f4ff94775636e09faf5a3f3))
* **demo:** fixed header overlapping for demo modals in directive examples ([#2974](https://github.com/valor-software/ngx-bootstrap/issues/2974)) ([9c648f6](https://github.com/valor-software/ngx-bootstrap/commit/9c648f6d5baf83f53899c520902c7fdf838fa2c8))
* **docs:** fix stackblitz link ([#2980](https://github.com/valor-software/ngx-bootstrap/issues/2980)) ([d97211b](https://github.com/valor-software/ngx-bootstrap/commit/d97211b69f33ff2d215c2f2fc57f896febc50310))
* **dropdown:** bootstrap 4 dropup fix in IE11 ([#3057](https://github.com/valor-software/ngx-bootstrap/issues/3057)) ([632abe1](https://github.com/valor-software/ngx-bootstrap/commit/632abe12ece6b82115f30e6b5730038b1e79581e)), closes [#3054](https://github.com/valor-software/ngx-bootstrap/issues/3054)


### Features

* **datepicker:** add hungarian localization ([5370c6a](https://github.com/valor-software/ngx-bootstrap/commit/5370c6ad674fd4c80d1e5ea732a3742d3018d6e2))
* **datepicker:** added Hebrew locale support for datepicker ([#2904](https://github.com/valor-software/ngx-bootstrap/issues/2904)) ([f2d5156](https://github.com/valor-software/ngx-bootstrap/commit/f2d5156dc27bfa2073fd6983f1b3ab62ef734980))
* **datepicker:** use init value for the first initialization ([#2897](https://github.com/valor-software/ngx-bootstrap/issues/2897)) ([7ec97f8](https://github.com/valor-software/ngx-bootstrap/commit/7ec97f852d2db40b0a942940cf960c5db193776d))
* **timepicker:** allow null value and change validation state on manual update ([#3084](https://github.com/valor-software/ngx-bootstrap/issues/3084)) ([0d72cd6](https://github.com/valor-software/ngx-bootstrap/commit/0d72cd625641ec29a45e7b417f732b8dad3bdc1f))



# [2.0.0-beta.8](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2017-11-03)


### Bug Fixes

* **datepicker:** correctly set initial input value ([#2962](https://github.com/valor-software/ngx-bootstrap/issues/2962)) ([5662e20](https://github.com/valor-software/ngx-bootstrap/commit/5662e208a4ce3c7fe3f52b714189f2890f70ef97)), closes [#2929](https://github.com/valor-software/ngx-bootstrap/issues/2929) [#2930](https://github.com/valor-software/ngx-bootstrap/issues/2930)
* **datepicker:** reactive forms in onpush components ([#2947](https://github.com/valor-software/ngx-bootstrap/issues/2947)) ([69bd6fa](https://github.com/valor-software/ngx-bootstrap/commit/69bd6fa1a5f0243e57e58243c2e20b23652434f9))
* **pagination:** and pager to mark for check when page is changed ([#2942](https://github.com/valor-software/ngx-bootstrap/issues/2942)) ([e225da7](https://github.com/valor-software/ngx-bootstrap/commit/e225da784605b96887e40686b568f539d11a8d4f))
* **rating:** fixed rating in onpush components ([#2943](https://github.com/valor-software/ngx-bootstrap/issues/2943)) ([bb0af30](https://github.com/valor-software/ngx-bootstrap/commit/bb0af3041140186b1bdff577f442e945f7d70809))
* **timepicker:** correctly set initial time manually ([#2945](https://github.com/valor-software/ngx-bootstrap/issues/2945)) ([0071733](https://github.com/valor-software/ngx-bootstrap/commit/00717337b0ec11b4f23b355fa98e4c9dfda784a9))
* **typeahead:** inside of onpush components ([#2946](https://github.com/valor-software/ngx-bootstrap/issues/2946)) ([44763a9](https://github.com/valor-software/ngx-bootstrap/commit/44763a90f72ff845a3ef88aabeeba80805c4af40))


### Features

* **accordion:** add output for isOpen state changes ([#2619](https://github.com/valor-software/ngx-bootstrap/issues/2619)) ([663f078](https://github.com/valor-software/ngx-bootstrap/commit/663f07899113f6b58c5164851fd2d345156ddd06))
* **alert:** added isOpen input and marked as OnPush ([#2940](https://github.com/valor-software/ngx-bootstrap/issues/2940)) ([af7597b](https://github.com/valor-software/ngx-bootstrap/commit/af7597b39ab92d25fa187969daee1be577015098))
* **datepicker:** respect first day of week in current locale ([#2970](https://github.com/valor-software/ngx-bootstrap/issues/2970)) ([1b6ed56](https://github.com/valor-software/ngx-bootstrap/commit/1b6ed563fcb93f9d0c3c3be46381ccc0e91e2d3e))
* **demo:** add universal support, add dockerfile ([#2925](https://github.com/valor-software/ngx-bootstrap/issues/2925)) ([b28838a](https://github.com/valor-software/ngx-bootstrap/commit/b28838aa8b585492ff34cf57ef90cc6e7150f8d2))
* **docs:** new aside menu ([#2851](https://github.com/valor-software/ngx-bootstrap/issues/2851)) ([4e3e456](https://github.com/valor-software/ngx-bootstrap/commit/4e3e456251c64e0d279b731807667de66496a097))
* **dropdown:** add option to let event propagate on toggle ([82e7832](https://github.com/valor-software/ngx-bootstrap/commit/82e78328423f21da88542663f7e5cae2c52a055d))
* **dropdown:** drop prevent event propogation from dropdown toggle ([5cbe131](https://github.com/valor-software/ngx-bootstrap/commit/5cbe131d9f0af147241f4125ba030768789b1130))
* **package:** removed ng2 bs module ([7c086a4](https://github.com/valor-software/ngx-bootstrap/commit/7c086a4b84510c5e1ae12844a25308f3359311d4))



# [2.0.0-beta.7](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2017-10-21)


### Bug Fixes

* **datepicker:** fix disabled state setter ([#2798](https://github.com/valor-software/ngx-bootstrap/issues/2798)) ([bd04f61](https://github.com/valor-software/ngx-bootstrap/commit/bd04f61f3d2c51ac092cb451dc79e4fbf155d193))
* **datepicker:** increase z-index to datepicker and daterangepicker ([#2788](https://github.com/valor-software/ngx-bootstrap/issues/2788)) ([1da7e15](https://github.com/valor-software/ngx-bootstrap/commit/1da7e15634bc4567c1187ffe1c595991b44d9540)), closes [#2736](https://github.com/valor-software/ngx-bootstrap/issues/2736)
* **demo:** fix carousel page ([#2885](https://github.com/valor-software/ngx-bootstrap/issues/2885)) ([9be31b5](https://github.com/valor-software/ngx-bootstrap/commit/9be31b5165c00dbfb717dbdc86fa40aed6e3fdda))
* **demo:** fix template bindings ([#2863](https://github.com/valor-software/ngx-bootstrap/issues/2863)) ([5632902](https://github.com/valor-software/ngx-bootstrap/commit/5632902ca04280216412af9281f5a0a6ac407e7c))
* **modal:** add null check in focusOtherModal() ([e1f9b7a](https://github.com/valor-software/ngx-bootstrap/commit/e1f9b7a0591fe97f3e91cb853bed9024985ea664)), closes [#2612](https://github.com/valor-software/ngx-bootstrap/issues/2612)
* **tabs:** fix customClass for tab content ([#2883](https://github.com/valor-software/ngx-bootstrap/issues/2883)) ([8e50e66](https://github.com/valor-software/ngx-bootstrap/commit/8e50e6643970b165aadee673692fcd2cd64001db))
* **tooltip:** fix tooltip with delay only appearing once ([#2826](https://github.com/valor-software/ngx-bootstrap/issues/2826)) ([e625faa](https://github.com/valor-software/ngx-bootstrap/commit/e625faabcbc7f92c88eba5a3710313ac5ae73991))
* **typeahead:** fix close on blur ([#2816](https://github.com/valor-software/ngx-bootstrap/issues/2816)) ([8bedcee](https://github.com/valor-software/ngx-bootstrap/commit/8bedcee67a75a697c99a2492440e75a33ab634f0)), closes [#2588](https://github.com/valor-software/ngx-bootstrap/issues/2588)
* **typeahead:** select active match on TAB ([#2839](https://github.com/valor-software/ngx-bootstrap/issues/2839)) ([9d0638c](https://github.com/valor-software/ngx-bootstrap/commit/9d0638c40f9c883be4d0a72ac5856717687b150d))


### Features

* **datepicker:** add swedish locale ([#2804](https://github.com/valor-software/ngx-bootstrap/issues/2804)) ([eccb382](https://github.com/valor-software/ngx-bootstrap/commit/eccb382671e361d146c4a507032dbce300ed860e))
* **moments:** export locales in ngx-bootstrap/index ([#2879](https://github.com/valor-software/ngx-bootstrap/issues/2879)) ([cc851e9](https://github.com/valor-software/ngx-bootstrap/commit/cc851e9455be6a7c0e0c135e9af809af599b6081))
* **popover:** don't show popover if content is undefined, [#1504](https://github.com/valor-software/ngx-bootstrap/issues/1504) ([#2815](https://github.com/valor-software/ngx-bootstrap/issues/2815)) ([64d13e7](https://github.com/valor-software/ngx-bootstrap/commit/64d13e7c64fdc719e5839fa6bfcc8e5fc5e4d5d7))
* **tab:** add tab id support ([#2405](https://github.com/valor-software/ngx-bootstrap/issues/2405)) ([89defda](https://github.com/valor-software/ngx-bootstrap/commit/89defdafc799eac5e885092b5df95cb5af9e80d2))
* **tabs:** add opportunity to add multiple classes to customClass attribute ([#2813](https://github.com/valor-software/ngx-bootstrap/issues/2813)) ([b5856ac](https://github.com/valor-software/ngx-bootstrap/commit/b5856ac564db701a15419ce970b9a6b1f90dba7e)), closes [#2467](https://github.com/valor-software/ngx-bootstrap/issues/2467) [#1508](https://github.com/valor-software/ngx-bootstrap/issues/1508)
* **timepicker:** remove inline styling, [#2496](https://github.com/valor-software/ngx-bootstrap/issues/2496) ([#2812](https://github.com/valor-software/ngx-bootstrap/issues/2812)) ([417d0a2](https://github.com/valor-software/ngx-bootstrap/commit/417d0a20985f649d60f40d978d8fbd196924df08))
* **typeahead:** add scroll support ([#2821](https://github.com/valor-software/ngx-bootstrap/issues/2821)) ([033f6e3](https://github.com/valor-software/ngx-bootstrap/commit/033f6e336becae2a76c7ba3b8b0f23ad1b51721d))
* **typeahead:** show options on focus and click ([#2320](https://github.com/valor-software/ngx-bootstrap/issues/2320)) ([7635468](https://github.com/valor-software/ngx-bootstrap/commit/763546873b4017c4ebc7ff6f066dcc9446550bd0)), closes [#1919](https://github.com/valor-software/ngx-bootstrap/issues/1919)



# [2.0.0-beta.6](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2017-10-03)


### Bug Fixes

* **demo:** fix links prefixes ([#2762](https://github.com/valor-software/ngx-bootstrap/issues/2762)) ([9a17ea9](https://github.com/valor-software/ngx-bootstrap/commit/9a17ea90776681157b81687287ccc5227676212f))
* **documentation:** fix issues after redesign ([#2761](https://github.com/valor-software/ngx-bootstrap/issues/2761)) ([d2c3309](https://github.com/valor-software/ngx-bootstrap/commit/d2c33095ebdc7991cabd38518cfc467baca3996b))


### Features

* **ci:** deploy on merge to dev ([#2743](https://github.com/valor-software/ngx-bootstrap/issues/2743)) ([8f07137](https://github.com/valor-software/ngx-bootstrap/commit/8f071372bec4d93b23e5d42dce12ed4cb3543271))
* **ci:** run tests and build with current, latest and beta ng version ([#2734](https://github.com/valor-software/ngx-bootstrap/issues/2734)) ([9e26b73](https://github.com/valor-software/ngx-bootstrap/commit/9e26b73f664ef1019b705f33b555f426ca42cf7e))
* **datepicker:** added Turkish locale support for datepicker ([9e4df47](https://github.com/valor-software/ngx-bootstrap/commit/9e4df4789197f64239431f36caff43696a6f6695))
* **datepicker:** Use !default for SASS variables ([#2777](https://github.com/valor-software/ngx-bootstrap/issues/2777)) ([cf2365a](https://github.com/valor-software/ngx-bootstrap/commit/cf2365af8ee0b573a0b5b97089edd2214ab7e6e2))
* **package:** Using ngTemplateOutletContext instead of deprectaded ngOutletContext ([#2659](https://github.com/valor-software/ngx-bootstrap/issues/2659)) ([ae2ace3](https://github.com/valor-software/ngx-bootstrap/commit/ae2ace3754f365f120eb33688febc36b556abd1e))
* **redesign:** new design for documentation page ([#2680](https://github.com/valor-software/ngx-bootstrap/issues/2680)) ([fc0cd35](https://github.com/valor-software/ngx-bootstrap/commit/fc0cd3570292879d745b491e448f61350e2657e3))



# [2.0.0-beta.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.3...v2.0.0-beta.5) (2017-09-18)


### Bug Fixes

* **datepicker:** added zindex to show datepicker above input fields ([0ec46af](https://github.com/valor-software/ngx-bootstrap/commit/0ec46af59c66a04c80548e2ea71ffc5ccd9fb638))
* **datepicker:** fix daterangepicker crash on empty value ([a30a283](https://github.com/valor-software/ngx-bootstrap/commit/a30a283002370063c51bf564f8747cb0d93e655a))
* **datepicker:** fix long date format ([#2630](https://github.com/valor-software/ngx-bootstrap/issues/2630)) ([4e40497](https://github.com/valor-software/ngx-bootstrap/commit/4e404971c958c9b14346664eed1e608ab70a9eb0)), closes [#2611](https://github.com/valor-software/ngx-bootstrap/issues/2611)
* **dropdown:** fix ngv4 dropdowns ([#2644](https://github.com/valor-software/ngx-bootstrap/issues/2644)) ([ed464c8](https://github.com/valor-software/ngx-bootstrap/commit/ed464c8b940f7808259f34a690377d76f1ff3366))
* **dropdown:** prevent event propogation if dropdown toggle clicked ([04cab1e](https://github.com/valor-software/ngx-bootstrap/commit/04cab1eb6f42ad7a6456c34a0ec54f9bd37fd83a))
* **modal:** fix bsModalRef paths in demos ([#2638](https://github.com/valor-software/ngx-bootstrap/issues/2638)) ([13043fc](https://github.com/valor-software/ngx-bootstrap/commit/13043fc8dbadabb63226cafe3e089cf78cc2a5a7))
* **modals:** fix issues with renderer2 in modal service ([73c8c6b](https://github.com/valor-software/ngx-bootstrap/commit/73c8c6ba4832e133392b212bad89675f37bf82cb))
* **modals:** fix modals crash, remove glyphicons, disable service worker ([6b7a8c4](https://github.com/valor-software/ngx-bootstrap/commit/6b7a8c46b94aaa34581d4f7bfdd1551b9845886b))
* **tabs:** fix default tab selection ([#2643](https://github.com/valor-software/ngx-bootstrap/issues/2643)) ([ff7a390](https://github.com/valor-software/ngx-bootstrap/commit/ff7a390f513613735148ff61ed9d4584034a1f2c))
* **tests:** fixed tests, change renderer to renderer2 ([18036ff](https://github.com/valor-software/ngx-bootstrap/commit/18036ff8f67bab24ebc48c1d2cc4c968a302bc11))


### Features

* **moment-ts:** added czech locale ([#2642](https://github.com/valor-software/ngx-bootstrap/issues/2642)) ([61e6ed9](https://github.com/valor-software/ngx-bootstrap/commit/61e6ed9e2d275aa3cac5f37f724ad583722d0fd5))
* **package:** drop support of ng v2 and add support of ng v4 and v5 ([#2602](https://github.com/valor-software/ngx-bootstrap/issues/2602)) ([31c5f62](https://github.com/valor-software/ngx-bootstrap/commit/31c5f62a48560d4372f0043241829a27e5f3deb6)), closes [#2357](https://github.com/valor-software/ngx-bootstrap/issues/2357) [#2368](https://github.com/valor-software/ngx-bootstrap/issues/2368)
* **rating:** remove glyphicons, add custom template support ([#2631](https://github.com/valor-software/ngx-bootstrap/issues/2631)) ([ea39858](https://github.com/valor-software/ngx-bootstrap/commit/ea39858755d8c0ac934b8bdd37c4bd4a35a6109c))
* **timepicker:** replace glyphicons with custom icons ([#2640](https://github.com/valor-software/ngx-bootstrap/issues/2640)) ([cf3fdc8](https://github.com/valor-software/ngx-bootstrap/commit/cf3fdc8fd63ac9a02e22930c2b98a4515cfb385f))



## [1.9.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.2...v1.9.3) (2017-09-08)


### Bug Fixes

* **core:** workaround on angular issue with isProdMode ([#2603](https://github.com/valor-software/ngx-bootstrap/issues/2603)) ([f9665ac](https://github.com/valor-software/ngx-bootstrap/commit/f9665ac43c89b742a883af6b7ef7401623aa1056)), closes [#2596](https://github.com/valor-software/ngx-bootstrap/issues/2596)



## [1.9.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.1...v1.9.2) (2017-09-07)


### Bug Fixes

* **datepicker:** fix nav to next month when today is 31 of month, and next month has only 30 days ([#2557](https://github.com/valor-software/ngx-bootstrap/issues/2557)) ([2bcc1d2](https://github.com/valor-software/ngx-bootstrap/commit/2bcc1d2fd779a5558ce71d1c209fec11585d9b79))
* **tooltip:** fix width property in chrome for custom element ([#2559](https://github.com/valor-software/ngx-bootstrap/issues/2559)) ([dfc736e](https://github.com/valor-software/ngx-bootstrap/commit/dfc736e7a0d793a01156519701e1c0e738696f56))


### Features

* **core:** try to guess bs version ([#2580](https://github.com/valor-software/ngx-bootstrap/issues/2580)) ([84f09e4](https://github.com/valor-software/ngx-bootstrap/commit/84f09e40bc6e231046b62cef025e246b7ed951ee))
* **datepicker:** add onTouched support, add forms demos, split demos for old and new datepicker ([17405b7](https://github.com/valor-software/ngx-bootstrap/commit/17405b7ef8417bcbb799bd58ebe1aac4c0d92381))
* **datepicker:** added bsConfig input, locales and color themes with containerClass ([#2549](https://github.com/valor-software/ngx-bootstrap/issues/2549)) ([7cbb128](https://github.com/valor-software/ngx-bootstrap/commit/7cbb128b25cdd91f5d30acd6776a6a389b4d901b))
* **datepicker:** added locale option to Datepicker Configuration ([#2560](https://github.com/valor-software/ngx-bootstrap/issues/2560)) ([8ac689a](https://github.com/valor-software/ngx-bootstrap/commit/8ac689a6face4eb52feb48933c626316b8beb44f)), closes [#455](https://github.com/valor-software/ngx-bootstrap/issues/455)
* **datepicker:** added month and year view ([#2540](https://github.com/valor-software/ngx-bootstrap/issues/2540)) ([571a00b](https://github.com/valor-software/ngx-bootstrap/commit/571a00b54aad79d6ab40dbc25826998ea2048841))
* **datepicker:** update input according to model, fix value parsing ([16affdd](https://github.com/valor-software/ngx-bootstrap/commit/16affdd26a7fed00943c785cc7c60472cb248f5c))
* **positioning:** auto option for positioning ([#1986](https://github.com/valor-software/ngx-bootstrap/issues/1986)) ([114ed42](https://github.com/valor-software/ngx-bootstrap/commit/114ed42357aff01988fe13b3d475f8dd8a45ffb8)), closes [#1111](https://github.com/valor-software/ngx-bootstrap/issues/1111)
* **typeahead:** added subscription and unsubscribe on destroy ([#2508](https://github.com/valor-software/ngx-bootstrap/issues/2508)) ([9f833eb](https://github.com/valor-software/ngx-bootstrap/commit/9f833ebe2694904e56a8dc074ded402bfd27ac29)), closes [#2382](https://github.com/valor-software/ngx-bootstrap/issues/2382)



## [1.9.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.0...v1.9.1) (2017-08-23)


### Bug Fixes

* **modals:** don't try to register outside click handler ([d8e614c](https://github.com/valor-software/ngx-bootstrap/commit/d8e614c6b3c2a945394efef079b3a9f74b375a35)), closes [#2477](https://github.com/valor-software/ngx-bootstrap/issues/2477)
* **tabs:** fixed tabs vertical pills for bs4 ([646e033](https://github.com/valor-software/ngx-bootstrap/commit/646e03382f23711f498449b0735938bc74e778c2)), closes [#2481](https://github.com/valor-software/ngx-bootstrap/issues/2481)
* **timepicker:** when showMeridian changes value, time is rerendered ([e59172f](https://github.com/valor-software/ngx-bootstrap/commit/e59172fd14b49936a9f73cd7cd37fe69aedb554b)), closes [#2476](https://github.com/valor-software/ngx-bootstrap/issues/2476)


### Features

* **datepicker:** change css to scss, add own styles ([#2478](https://github.com/valor-software/ngx-bootstrap/issues/2478)) ([08170ed](https://github.com/valor-software/ngx-bootstrap/commit/08170ed3e3b3fd08ed02c7db7d68f4c26f5ebd81))



# [1.9.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.8.1...v1.9.0) (2017-08-21)


### Bug Fixes

* **bs4:** fix dropdown, tooltip, popover, datepicker, accordion for bs4 beta ([#2418](https://github.com/valor-software/ngx-bootstrap/issues/2418)) ([f398576](https://github.com/valor-software/ngx-bootstrap/commit/f398576f12b9bfc77c7e8502ca3376f76d3e7398))
* **carousel:** fix demo expressionChanged error ([#2358](https://github.com/valor-software/ngx-bootstrap/issues/2358)) ([c0347d7](https://github.com/valor-software/ngx-bootstrap/commit/c0347d73868c8d2fa2ce712c4db114c635e8da65))
* **carousel:** setInterval by running it outside of Angular zone. ([#2388](https://github.com/valor-software/ngx-bootstrap/issues/2388)) ([da073df](https://github.com/valor-software/ngx-bootstrap/commit/da073df0a70169434d97aaeed974605c4d61c9e1))
* **datepicker:** add fix for datepicker table ([#2461](https://github.com/valor-software/ngx-bootstrap/issues/2461)) ([e0a6adf](https://github.com/valor-software/ngx-bootstrap/commit/e0a6adf8d19ff0a9ccecfe5df72dfa47e856859c))
* **datepicker:** prevent outside click to close datepicker on navigation ([6472b6f](https://github.com/valor-software/ngx-bootstrap/commit/6472b6fe2d9d5c8b85baf059a72eeef47c2b8925))
* **tabs:** fix select/deselect multiple calls ([#2361](https://github.com/valor-software/ngx-bootstrap/issues/2361)) ([5dd456b](https://github.com/valor-software/ngx-bootstrap/commit/5dd456b8767724fb708662c6552f00b0cfa53fe1)), closes [#2005](https://github.com/valor-software/ngx-bootstrap/issues/2005) [#1820](https://github.com/valor-software/ngx-bootstrap/issues/1820) [#1129](https://github.com/valor-software/ngx-bootstrap/issues/1129)


### Features

* **bs-moment:** add localization tests ([#2466](https://github.com/valor-software/ngx-bootstrap/issues/2466)) ([6589ee9](https://github.com/valor-software/ngx-bootstrap/commit/6589ee94806313702b4e1582cfc1c7dee9bbdbe1))
* **datepicker:** initial version of new datepicker ([#2426](https://github.com/valor-software/ngx-bootstrap/issues/2426)) ([b11776c](https://github.com/valor-software/ngx-bootstrap/commit/b11776c3bf46a75963c1693cd86b9a24edcc3bd1))
* **datepicker:** removed dependency on moment.js ([#2465](https://github.com/valor-software/ngx-bootstrap/issues/2465)) ([7c87162](https://github.com/valor-software/ngx-bootstrap/commit/7c87162d6949ca57460011973bf38938c9805477))
* **datepicker:** use as directives ([#2446](https://github.com/valor-software/ngx-bootstrap/issues/2446)) ([d7f9a2a](https://github.com/valor-software/ngx-bootstrap/commit/d7f9a2af9896f9dbe51ced179af7a0a3a0f96dc4))
* **demo:** add popover outside click demo ([#2449](https://github.com/valor-software/ngx-bootstrap/issues/2449)) ([da7d352](https://github.com/valor-software/ngx-bootstrap/commit/da7d352650a8f5ee5b88afdaf79c3244531a6d87))
* **docs:** add versioning implementation ([#2350](https://github.com/valor-software/ngx-bootstrap/issues/2350)) ([91cee71](https://github.com/valor-software/ngx-bootstrap/commit/91cee712214289d9192c9361a3cd3fcc2f77d0bc))
* **loader:** added ability to attach inline elements via component loader ([#2458](https://github.com/valor-software/ngx-bootstrap/issues/2458)) ([0c7d21c](https://github.com/valor-software/ngx-bootstrap/commit/0c7d21c98b627acaa65925741b0221e905791a40))
* **popover:** added outsideClick ([#2441](https://github.com/valor-software/ngx-bootstrap/issues/2441)) ([a606a7f](https://github.com/valor-software/ngx-bootstrap/commit/a606a7f4d2852110d2586bb13b21dc50c0672c30)), closes [#1477](https://github.com/valor-software/ngx-bootstrap/issues/1477)
* **popover:** support passing template context ([#2428](https://github.com/valor-software/ngx-bootstrap/issues/2428)) ([38e562d](https://github.com/valor-software/ngx-bootstrap/commit/38e562d09a2125a13cd1d72a46a08855de5f98f7)), closes [#1682](https://github.com/valor-software/ngx-bootstrap/issues/1682)
* **typeahead:** add dropup option ([#2390](https://github.com/valor-software/ngx-bootstrap/issues/2390)) ([c6ef77b](https://github.com/valor-software/ngx-bootstrap/commit/c6ef77b7dcd24a4a8e2f6356f7fe60b4d28da372))
* **typeahead:** show results when typeaheadMinLength is 0 and the search string is empty ([#2352](https://github.com/valor-software/ngx-bootstrap/issues/2352)) ([4b68adb](https://github.com/valor-software/ngx-bootstrap/commit/4b68adbe788865cd7a4a69b1c6529679b2f8e9b5))



## [1.8.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.8.0...v1.8.1) (2017-07-28)


### Bug Fixes

* **datepicker:** fix selectionDone event [fixes [#2260](https://github.com/valor-software/ngx-bootstrap/issues/2260)] ([#2282](https://github.com/valor-software/ngx-bootstrap/issues/2282)) ([763b2b7](https://github.com/valor-software/ngx-bootstrap/commit/763b2b76b8554ba1f31cfe3ab4e9204a32f58f63))
* **dropdown:** fix isOpen [fixes [#2310](https://github.com/valor-software/ngx-bootstrap/issues/2310)] ([#2313](https://github.com/valor-software/ngx-bootstrap/issues/2313)) ([a63f902](https://github.com/valor-software/ngx-bootstrap/commit/a63f9027f18cfcb455eeacd8d9ada2584de5e3bd))
* **modal:** fix system.js [fixes [#2291](https://github.com/valor-software/ngx-bootstrap/issues/2291)] ([#2311](https://github.com/valor-software/ngx-bootstrap/issues/2311)) ([8ce315b](https://github.com/valor-software/ngx-bootstrap/commit/8ce315b14487c3aac77c1e6c7ae7e0085c633b8e))
* **popover:** fix undefined container class ([#2283](https://github.com/valor-software/ngx-bootstrap/issues/2283)) ([91fc1cd](https://github.com/valor-software/ngx-bootstrap/commit/91fc1cd10160633f90b502211435ce2ed3df0ad8))
* **popover & tooltip:** fix isOpen  ([#2286](https://github.com/valor-software/ngx-bootstrap/issues/2286)) ([eb3cd04](https://github.com/valor-software/ngx-bootstrap/commit/eb3cd04ddc4e7632e8357028a4d8751a571fe4d6))
* **tabs:** fix customClass [fixes [#2253](https://github.com/valor-software/ngx-bootstrap/issues/2253)] ([#2273](https://github.com/valor-software/ngx-bootstrap/issues/2273)) ([0d67ef8](https://github.com/valor-software/ngx-bootstrap/commit/0d67ef894427541b3d590c61cb3399aa6e89ca7f))
* **tooltip:** fix isOpen and undefined containerClass [fixes [#2257](https://github.com/valor-software/ngx-bootstrap/issues/2257)] ([#2262](https://github.com/valor-software/ngx-bootstrap/issues/2262)) ([8664bb1](https://github.com/valor-software/ngx-bootstrap/commit/8664bb19c5b8fe71eba9ddd6da25799a0818a26c))


### Features

* **modal:** add ability to pass data to modal component ([#2293](https://github.com/valor-software/ngx-bootstrap/issues/2293)) ([8ac13f9](https://github.com/valor-software/ngx-bootstrap/commit/8ac13f917e4d8a4606ebe9951ac75a46b86266f4)), closes [#2290](https://github.com/valor-software/ngx-bootstrap/issues/2290) [#2275](https://github.com/valor-software/ngx-bootstrap/issues/2275) [#2251](https://github.com/valor-software/ngx-bootstrap/issues/2251) [#2294](https://github.com/valor-software/ngx-bootstrap/issues/2294)
* **modal:** add modal service events, fix modal content onDestroy [fixes [#2256](https://github.com/valor-software/ngx-bootstrap/issues/2256)] ([#2272](https://github.com/valor-software/ngx-bootstrap/issues/2272)) ([c9f85e6](https://github.com/valor-software/ngx-bootstrap/commit/c9f85e6a2933c31227df9a818cd300e435202dbd))



# [1.8.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.7.1...v1.8.0) (2017-07-20)


### Bug Fixes

* **acordion:** space beetween accordion groups ([#2014](https://github.com/valor-software/ngx-bootstrap/issues/2014)) ([ad2da54](https://github.com/valor-software/ngx-bootstrap/commit/ad2da54b4467e00615093c3763f4292383b97f34)), closes [#1854](https://github.com/valor-software/ngx-bootstrap/issues/1854)
* **button:** should work within onPush components ([#2038](https://github.com/valor-software/ngx-bootstrap/issues/2038)) ([aec0f86](https://github.com/valor-software/ngx-bootstrap/commit/aec0f86d4438a01ef15017a4e8b9dd6597c8d52b)), closes [#1689](https://github.com/valor-software/ngx-bootstrap/issues/1689)
* **datepicker:** datepickerMode does change when selection is manual ([#1976](https://github.com/valor-software/ngx-bootstrap/issues/1976)) ([e7795f7](https://github.com/valor-software/ngx-bootstrap/commit/e7795f799e31034621914aaadc3d89f232087b39)), closes [#1911](https://github.com/valor-software/ngx-bootstrap/issues/1911)
* **datepicker:** fix SimpleChanges issue, add date check ([#2223](https://github.com/valor-software/ngx-bootstrap/issues/2223)) ([501d878](https://github.com/valor-software/ngx-bootstrap/commit/501d878bc5acd74738d03187e43beabb075705a5))
* **datepicker:** for issue [#1962](https://github.com/valor-software/ngx-bootstrap/issues/1962) ([#1991](https://github.com/valor-software/ngx-bootstrap/issues/1991)) ([deb7f63](https://github.com/valor-software/ngx-bootstrap/commit/deb7f63c06bea76559be539170bd2da200c1f096))
* **datepicker:** refix issue with moment import ([#2023](https://github.com/valor-software/ngx-bootstrap/issues/2023)) ([8ed0c06](https://github.com/valor-software/ngx-bootstrap/commit/8ed0c0619612c652551f8322a2093979257f8c67)), closes [#1556](https://github.com/valor-software/ngx-bootstrap/issues/1556)
* **datepicker:** using icons instead of innerHTML chevrons to fix issue with webworkers ([#2166](https://github.com/valor-software/ngx-bootstrap/issues/2166)) ([2fedac2](https://github.com/valor-software/ngx-bootstrap/commit/2fedac2d26d9c47be6bf71b3d1630735ee09026f))
* **demo:** add Intl polyfill [fixes [#2215](https://github.com/valor-software/ngx-bootstrap/issues/2215)] ([#2238](https://github.com/valor-software/ngx-bootstrap/issues/2238)) ([e195549](https://github.com/valor-software/ngx-bootstrap/commit/e1955491c68786eb177c6141d932226320a2758c))
* **demo:** fix buttons reactive forms sample ([325b510](https://github.com/valor-software/ngx-bootstrap/commit/325b5100b23df83e4844112207855e689f2d17e5))
* **demo:** remove gitter links, fix source links to modal & sortable, fix download count ([#2240](https://github.com/valor-software/ngx-bootstrap/issues/2240)) ([9211643](https://github.com/valor-software/ngx-bootstrap/commit/92116436a8ed3ec4d1bb74fc80fb9b3bf468f483))
* **modals:** hotfix/modal-nested-close-on-esc solved ([#2173](https://github.com/valor-software/ngx-bootstrap/issues/2173)) ([41f11e6](https://github.com/valor-software/ngx-bootstrap/commit/41f11e682d5124ef70eaa8fd37507850d92fd153))
* **popover:** no focus on button on Mac OS [#1795](https://github.com/valor-software/ngx-bootstrap/issues/1795) ([#2031](https://github.com/valor-software/ngx-bootstrap/issues/2031)) ([d039a8d](https://github.com/valor-software/ngx-bootstrap/commit/d039a8d26cbd30e63526fe113aec1543ec0734fa))
* **positioning:** don't modify readonly value ([#2042](https://github.com/valor-software/ngx-bootstrap/issues/2042)) ([d12593d](https://github.com/valor-software/ngx-bootstrap/commit/d12593de2becf9dc206ac10261c46ece18219018))
* **readme:** fix angular style guide link ([#2092](https://github.com/valor-software/ngx-bootstrap/issues/2092)) ([bb7bd75](https://github.com/valor-software/ngx-bootstrap/commit/bb7bd75c6296ae5eb5c9f556035e5cad6202a6e2))
* **tabs:** fix removing tabs in IE ([#2145](https://github.com/valor-software/ngx-bootstrap/issues/2145)) ([fc5e135](https://github.com/valor-software/ngx-bootstrap/commit/fc5e135b4666ea0c9ee590628f53578197802009))
* **typeahead:** Fix crash on Firefox and `contenteditable` input ([#2057](https://github.com/valor-software/ngx-bootstrap/issues/2057)) ([8656326](https://github.com/valor-software/ngx-bootstrap/commit/865632655b247a163550b10d52209993dd3e1569))


### Features

* **docs:** add lib build for development steps ([#2220](https://github.com/valor-software/ngx-bootstrap/issues/2220)) ([c3a7aa4](https://github.com/valor-software/ngx-bootstrap/commit/c3a7aa4eee8b212fa9a6aa2f8cd608b628ab2404))
* **modal:** add dissmissReason, fix body padding, add events section… ([#2131](https://github.com/valor-software/ngx-bootstrap/issues/2131)) ([dde6620](https://github.com/valor-software/ngx-bootstrap/commit/dde6620f5a8f8a4c6d6e0441e6cccfb2d051c52d))
* **modal:** modal service wip ([#2047](https://github.com/valor-software/ngx-bootstrap/issues/2047)) ([2d02faa](https://github.com/valor-software/ngx-bootstrap/commit/2d02faa88d92024a8c39844810f1b3e5fa69cb30)), closes [#1998](https://github.com/valor-software/ngx-bootstrap/issues/1998) [#1995](https://github.com/valor-software/ngx-bootstrap/issues/1995) [#1830](https://github.com/valor-software/ngx-bootstrap/issues/1830) [#1181](https://github.com/valor-software/ngx-bootstrap/issues/1181) [#579](https://github.com/valor-software/ngx-bootstrap/issues/579) [#2128](https://github.com/valor-software/ngx-bootstrap/issues/2128) [#2130](https://github.com/valor-software/ngx-bootstrap/issues/2130) [#2133](https://github.com/valor-software/ngx-bootstrap/issues/2133)
* **popover & tooltip:** add container classes ([#2190](https://github.com/valor-software/ngx-bootstrap/issues/2190)) ([690d811](https://github.com/valor-software/ngx-bootstrap/commit/690d8116d21226512eeb8b39e427431d3d326b45)), closes [#1707](https://github.com/valor-software/ngx-bootstrap/issues/1707) [#1395](https://github.com/valor-software/ngx-bootstrap/issues/1395)
* **popups:** use events with better support ([#1211](https://github.com/valor-software/ngx-bootstrap/issues/1211)) ([46419e3](https://github.com/valor-software/ngx-bootstrap/commit/46419e365625e6044f3ba19fd37a58eb24b87d04))
* **progressbar:** value input can handle array of staked data  ([#2037](https://github.com/valor-software/ngx-bootstrap/issues/2037)) ([2bf9ad8](https://github.com/valor-software/ngx-bootstrap/commit/2bf9ad8c5aa5e982da584e9e9df4b4a686ff596b))
* **timepicker:** new timepicker implementation ([#2058](https://github.com/valor-software/ngx-bootstrap/issues/2058)) ([4a37406](https://github.com/valor-software/ngx-bootstrap/commit/4a37406e0e4a678500251f18980e2f278a341868)), closes [#2036](https://github.com/valor-software/ngx-bootstrap/issues/2036) [#1981](https://github.com/valor-software/ngx-bootstrap/issues/1981) [#1973](https://github.com/valor-software/ngx-bootstrap/issues/1973) [#1957](https://github.com/valor-software/ngx-bootstrap/issues/1957) [#1935](https://github.com/valor-software/ngx-bootstrap/issues/1935) [#1672](https://github.com/valor-software/ngx-bootstrap/issues/1672) [#1007](https://github.com/valor-software/ngx-bootstrap/issues/1007) [#962](https://github.com/valor-software/ngx-bootstrap/issues/962) [#793](https://github.com/valor-software/ngx-bootstrap/issues/793) [#173](https://github.com/valor-software/ngx-bootstrap/issues/173) [#1271](https://github.com/valor-software/ngx-bootstrap/issues/1271) [#1539](https://github.com/valor-software/ngx-bootstrap/issues/1539) [#1253](https://github.com/valor-software/ngx-bootstrap/issues/1253) [#2187](https://github.com/valor-software/ngx-bootstrap/issues/2187) [#2127](https://github.com/valor-software/ngx-bootstrap/issues/2127)



## [1.7.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.7.0...v1.7.1) (2017-06-02)


### Bug Fixes

* **accoridon:** remove unneeded card-title class ([#2024](https://github.com/valor-software/ngx-bootstrap/issues/2024)) ([ba56e64](https://github.com/valor-software/ngx-bootstrap/commit/ba56e64478caa8f16bb85b95a43fedf56d6a9bd2))
* **popover:** prevent ng router active link double ngOnInit issue ([dab394c](https://github.com/valor-software/ngx-bootstrap/commit/dab394c06dcaf11cb71a8515ac6b08767e3be6cb))
* **tabs:** fixed tabs duplication issue ([#1941](https://github.com/valor-software/ngx-bootstrap/issues/1941)) ([40335aa](https://github.com/valor-software/ngx-bootstrap/commit/40335aa22fee8b7353cd5a28cd33a13fb5817c32)), closes [#1629](https://github.com/valor-software/ngx-bootstrap/issues/1629)


### Features

* **tabs:** added id parameter in tab directive ([#1909](https://github.com/valor-software/ngx-bootstrap/issues/1909)) ([20c7fb8](https://github.com/valor-software/ngx-bootstrap/commit/20c7fb8e7c20599749cbea7a97e0de05ee622ba2)), closes [#1908](https://github.com/valor-software/ngx-bootstrap/issues/1908)



# [1.7.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.6...v1.7.0) (2017-06-01)


### Bug Fixes

* **alert:** dismissibleChange emits boolean values ([#1896](https://github.com/valor-software/ngx-bootstrap/issues/1896)) ([10bfd7f](https://github.com/valor-software/ngx-bootstrap/commit/10bfd7fa4e5065992b14889c0c5b3eaa0016cc54))
* **build:** fix most of ts errors ([1384eb1](https://github.com/valor-software/ngx-bootstrap/commit/1384eb12d804b20bca3235cd3cf05c7690a29ebb))
* **demo:** fix close btns in nested modals ([7ef989a](https://github.com/valor-software/ngx-bootstrap/commit/7ef989a4b46e6243483315f35fa6f605afc4fad4))
* **dropdown:** fix duplicated events, add spec ([da92081](https://github.com/valor-software/ngx-bootstrap/commit/da920818748df01dfc1fcca412439cdf8dc97b7a))
* **dropdown:** fixed onShow and onHidden events for inline dropdown module ([#1951](https://github.com/valor-software/ngx-bootstrap/issues/1951)) ([ead8d52](https://github.com/valor-software/ngx-bootstrap/commit/ead8d525170ee7de49cdce30c296f2108779a83c))


### Features

* **dropdown:** add isOpenChange output ([#2006](https://github.com/valor-software/ngx-bootstrap/issues/2006)) ([1c9f767](https://github.com/valor-software/ngx-bootstrap/commit/1c9f76763beb98b45ccb3281e68a7c2e4c42e899))
* **modals:** add docs for nested modals ([e28d821](https://github.com/valor-software/ngx-bootstrap/commit/e28d8219c6cfc89169af815a14ab65f82ecd7649))
* **modals:** add support for nested modals (fix scroll) ([48ef8b7](https://github.com/valor-software/ngx-bootstrap/commit/48ef8b71c080dabf833b34ed1b034ad2b1df2442)), closes [valor-software/ngx-bootstrap#896](https://github.com/valor-software/ngx-bootstrap/issues/896) [valor-software/ngx-bootstrap#1691](https://github.com/valor-software/ngx-bootstrap/issues/1691)



## [1.6.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.5...v1.6.6) (2017-04-10)


### Bug Fixes

* **dropdown:** prevent ng router active link double ngOnInit issue ([7ded538](https://github.com/valor-software/ngx-bootstrap/commit/7ded5381a0ea4983648cd997fa76efb1ae1597eb)), closes [#1885](https://github.com/valor-software/ngx-bootstrap/issues/1885)



## [1.6.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.4...v1.6.5) (2017-04-06)


### Features

* **typeahead:** deprecated typeahead utils for ngv4 aot mode work ([df499e9](https://github.com/valor-software/ngx-bootstrap/commit/df499e964d4c5381418bd90dc27ed3fcb06b92cb))



## [1.6.4](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.3...v1.6.4) (2017-04-06)



## [1.6.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.2...v1.6.3) (2017-04-05)


### Bug Fixes

* **dropdowns:** fixed styling of dropdowns with bootstrap 4 ([9c8c74b](https://github.com/valor-software/ngx-bootstrap/commit/9c8c74b5f3a09882e3a50b8d3a814e5dbc4b0d1c))


### Features

* **package:** rename to ngx-bootstrap ([c946f8e](https://github.com/valor-software/ngx-bootstrap/commit/c946f8e84ce6e080a759b44320fe35e236053c4e))



## [1.6.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.1...v1.6.2) (2017-04-05)


### Bug Fixes

* **dropdown:** Add missing rxjs filter operator dependency ([#1836](https://github.com/valor-software/ngx-bootstrap/issues/1836)) ([838821a](https://github.com/valor-software/ngx-bootstrap/commit/838821a090fb7bebf0926b8b0fc59c97540f4139))
* **dropdown:** fixed auto close input behavior ([b023ca6](https://github.com/valor-software/ngx-bootstrap/commit/b023ca60c78cd43db46f8d8a4666eace3976dc53)), closes [#1840](https://github.com/valor-software/ngx-bootstrap/issues/1840)


### Features

* **dropdown:** added inline style of adding dropdown, enabled by default ([f4334a8](https://github.com/valor-software/ngx-bootstrap/commit/f4334a8a7252722ac7b3eb5f470b435841d31648)), closes [#1860](https://github.com/valor-software/ngx-bootstrap/issues/1860) [#1862](https://github.com/valor-software/ngx-bootstrap/issues/1862)



## [1.6.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.0...v1.6.1) (2017-03-30)


### Features

* **dropdown:** now you can bind to dropup property ([d6f6d25](https://github.com/valor-software/ngx-bootstrap/commit/d6f6d2544ac4bfbb4e895033190953b27c7f0274))



# [1.6.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.5.0...v1.6.0) (2017-03-29)



# [1.5.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.4.2...v1.5.0) (2017-03-29)


### Features

* **dropdown:** rollout completely rewritten bs-dropdown version ([#1771](https://github.com/valor-software/ngx-bootstrap/issues/1771)) ([31cba41](https://github.com/valor-software/ngx-bootstrap/commit/31cba418a13674917e0fcfba2419c7f27c660ba1)), closes [#1674](https://github.com/valor-software/ngx-bootstrap/issues/1674) [#1749](https://github.com/valor-software/ngx-bootstrap/issues/1749) [#1623](https://github.com/valor-software/ngx-bootstrap/issues/1623) [#1415](https://github.com/valor-software/ngx-bootstrap/issues/1415) [#802](https://github.com/valor-software/ngx-bootstrap/issues/802) [#569](https://github.com/valor-software/ngx-bootstrap/issues/569) [#530](https://github.com/valor-software/ngx-bootstrap/issues/530) [#6](https://github.com/valor-software/ngx-bootstrap/issues/6) [#1540](https://github.com/valor-software/ngx-bootstrap/issues/1540) [#1217](https://github.com/valor-software/ngx-bootstrap/issues/1217) [#591](https://github.com/valor-software/ngx-bootstrap/issues/591) [#478](https://github.com/valor-software/ngx-bootstrap/issues/478)
* **typeahead:** added export as bs-typeahead ([#1783](https://github.com/valor-software/ngx-bootstrap/issues/1783)) ([9ef6fa6](https://github.com/valor-software/ngx-bootstrap/commit/9ef6fa6ab92b5f312f4eb24481aa089464496786))



## [1.4.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.4.1...v1.4.2) (2017-03-17)


### Bug Fixes

* **styling-local:** fix tooltip arrow styles ([b1f04d9](https://github.com/valor-software/ngx-bootstrap/commit/b1f04d9af6ec5b02fb16331071641a114fd0422b))
* **universal:** to not through on unrecognized Keyboard and Mouse events ([b81e9de](https://github.com/valor-software/ngx-bootstrap/commit/b81e9de784a0542c81021dce8d51b46076d51114))


### Features

* **build:** rename .angular-cli.json and refactor ([#1736](https://github.com/valor-software/ngx-bootstrap/issues/1736)) ([d60dcfb](https://github.com/valor-software/ngx-bootstrap/commit/d60dcfb80d852e5108b93c59837c7655866ae989))
* **datepicker:** added active date changed event ([#1703](https://github.com/valor-software/ngx-bootstrap/issues/1703)) ([8120c88](https://github.com/valor-software/ngx-bootstrap/commit/8120c88521799ea7164df7edc8a0d41b18eeeb45))
* **popover:** Updated property 'isOpen' in show and hide methods ([#1765](https://github.com/valor-software/ngx-bootstrap/issues/1765)) ([363d9e6](https://github.com/valor-software/ngx-bootstrap/commit/363d9e6f6e03aae05882910320c07ea855c833fa))



## [1.4.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.4.0...v1.4.1) (2017-03-16)


### Bug Fixes

* **dropdown,rating,typeahead:** remove global in order to be usable in System.js ([#1734](https://github.com/valor-software/ngx-bootstrap/issues/1734)) ([4a7719b](https://github.com/valor-software/ngx-bootstrap/commit/4a7719b3ce563cd48c0558c15658e9b9235ad4d5))


### Features

* **demo:** add example for `show` modal option ([a33dc10](https://github.com/valor-software/ngx-bootstrap/commit/a33dc10724bbd7c338f0fbd4fd4935eaf73133f3))
* **docs:** added Instructions for BS4 and ng-cli ([#1714](https://github.com/valor-software/ngx-bootstrap/issues/1714)) ([98b9b2e](https://github.com/valor-software/ngx-bootstrap/commit/98b9b2e78b4a495dbc52b5217d39ea475d12c4d6)), closes [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637) [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637)
* **modal:** make `show` config option work ([#1680](https://github.com/valor-software/ngx-bootstrap/issues/1680)) ([0abd801](https://github.com/valor-software/ngx-bootstrap/commit/0abd801d3fc267cf6d3c4c5660f7cdc8c52f1076))
* **package:** changed the way moment is imported ([#1556](https://github.com/valor-software/ngx-bootstrap/issues/1556)) ([27a0229](https://github.com/valor-software/ngx-bootstrap/commit/27a022922370947d54c3cfd357399eb588e8d01f))



# [1.4.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.3...v1.4.0) (2017-03-06)


### Bug Fixes

* **datepicker:** update activeDate on select ([#1676](https://github.com/valor-software/ngx-bootstrap/issues/1676)) ([378726b](https://github.com/valor-software/ngx-bootstrap/commit/378726bbb9f583da45e77acb07c39ace90ffad8d))
* **demo:** bootstrap 4 demos card text formatting incorrectly. ([#1656](https://github.com/valor-software/ngx-bootstrap/issues/1656)) ([d8f42df](https://github.com/valor-software/ngx-bootstrap/commit/d8f42df84382c4442299686aa07d0fa6c8062c9c)), closes [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637) [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637)
* **docs:** fixed angular-cli docs install guide ([e626947](https://github.com/valor-software/ngx-bootstrap/commit/e62694766a23b697511d092575677b4e303e0a47))
* **dropdown:** fixed disabled tests, removed outdated ([#1605](https://github.com/valor-software/ngx-bootstrap/issues/1605)) ([29dceba](https://github.com/valor-software/ngx-bootstrap/commit/29dcebac7cbfcc7a7a7920902f13fda6095c49f3)), closes [#1606](https://github.com/valor-software/ngx-bootstrap/issues/1606)
* **package.json:** locked version tor types/jasmine ([#1635](https://github.com/valor-software/ngx-bootstrap/issues/1635)) ([90fd995](https://github.com/valor-software/ngx-bootstrap/commit/90fd995976cb4bdc728602f9b4f64566e0f7c251))
* **tabs:** Use [ngClass] to avoid conflicts with [class.x] bindings ([#1651](https://github.com/valor-software/ngx-bootstrap/issues/1651)) ([183b275](https://github.com/valor-software/ngx-bootstrap/commit/183b275526c54f6b010efb7e828fa24ab2b2baed))
* **tooltip:** removed deprecated tooltip options ([373bed9](https://github.com/valor-software/ngx-bootstrap/commit/373bed9ed2caf006a44d431c131c0b67d94fce59)), closes [#1612](https://github.com/valor-software/ngx-bootstrap/issues/1612)
* **typeahead:** optionsListTemplate usage is fixed in TypeaheadContainerComponent ([#1625](https://github.com/valor-software/ngx-bootstrap/issues/1625)) ([f21bd8d](https://github.com/valor-software/ngx-bootstrap/commit/f21bd8ddbe99f0b5becc6f6b5361059a846dcf62))


### Features

* **buttons:** Fixed disabled buttons module tests ([#1604](https://github.com/valor-software/ngx-bootstrap/issues/1604)) ([4df17c7](https://github.com/valor-software/ngx-bootstrap/commit/4df17c7cea1328421c15c8239d4941b0d005b3ed)), closes [#1606](https://github.com/valor-software/ngx-bootstrap/issues/1606)
* **demo:** access static tabs sample ([#1603](https://github.com/valor-software/ngx-bootstrap/issues/1603)) ([63c64e0](https://github.com/valor-software/ngx-bootstrap/commit/63c64e0c07bfc8fbea566367aa697124afd46684))
* **typeahead:** - added typeaheadOnBlur event ([#1639](https://github.com/valor-software/ngx-bootstrap/issues/1639)) ([62eb22a](https://github.com/valor-software/ngx-bootstrap/commit/62eb22ab1ef0605c39dc55b29790ed3e507b8a65))



## [1.3.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.2...v1.3.3) (2017-02-03)


### Bug Fixes

* **typeahead:** allow to work with formControl ([e3f4854](https://github.com/valor-software/ngx-bootstrap/commit/e3f48548a1a2516e60328d4536da61e3632d51d3)), closes [#1595](https://github.com/valor-software/ngx-bootstrap/issues/1595)


### Features

* **package:** export missed things from utils ([54eb13d](https://github.com/valor-software/ngx-bootstrap/commit/54eb13d40d52465df2f32b8ffe6edd355d56bfab)), closes [#1584](https://github.com/valor-software/ngx-bootstrap/issues/1584) [#1590](https://github.com/valor-software/ngx-bootstrap/issues/1590)



## [1.3.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.1...v1.3.2) (2017-01-31)


### Bug Fixes

* **pagination:** export Pagination Config ([#1574](https://github.com/valor-software/ngx-bootstrap/issues/1574)) ([c3337f6](https://github.com/valor-software/ngx-bootstrap/commit/c3337f6853c8a67e8daa000ef0dddbab77d5a5e2))


### Features

* **sortable:** add support for custom item templates ([#1580](https://github.com/valor-software/ngx-bootstrap/issues/1580)) ([9d0b228](https://github.com/valor-software/ngx-bootstrap/commit/9d0b228490e2b3fc8082b3ba9939377e5a1cc33e)), closes [#1554](https://github.com/valor-software/ngx-bootstrap/issues/1554)



## [1.3.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.0...v1.3.1) (2017-01-25)


### Features

* **typeahead:** added option list template to typeahead container ([#1548](https://github.com/valor-software/ngx-bootstrap/issues/1548)) ([e56ea43](https://github.com/valor-software/ngx-bootstrap/commit/e56ea431a7991df1820ad9d19e8e9121845be359))



# [1.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.6...v1.3.0) (2017-01-23)


### Bug Fixes

* **aot:** adding missing exports ([#1525](https://github.com/valor-software/ngx-bootstrap/issues/1525)) ([7690e5d](https://github.com/valor-software/ngx-bootstrap/commit/7690e5d79b903fba332181ee61f3a6a414e2141c))
* **carousel:** _slides.add is not a function, by removing extend Array ([7d454de](https://github.com/valor-software/ngx-bootstrap/commit/7d454de62e7ae837a71a4e9fb73d28ed03f96469)), closes [#1516](https://github.com/valor-software/ngx-bootstrap/issues/1516)


### Features

* **build:** use es2015 module compile target ([2d74fc3](https://github.com/valor-software/ngx-bootstrap/commit/2d74fc39aa99a4c31ab3d3a226022c6974bb28d9)), closes [#1538](https://github.com/valor-software/ngx-bootstrap/issues/1538)
* **package:** angular-cli version bump ([a79aa26](https://github.com/valor-software/ngx-bootstrap/commit/a79aa261a0d34df7b4e1903e34bc4ffccf449c3b))



## [1.2.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.5...v1.2.6) (2017-01-19)


### Bug Fixes

* **aot:** added missing exports ([d40a299](https://github.com/valor-software/ngx-bootstrap/commit/d40a2998d15d2fbd73739ee57824572178cc23a5))



## [1.2.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.4...v1.2.5) (2017-01-18)


### Bug Fixes

* **accordion:** a tag replaced with div, so preventDefault() was removed from toggleOpen ([d352962](https://github.com/valor-software/ngx-bootstrap/commit/d352962af3f0a4ecb26835630feb822cb157cec0)), closes [#1512](https://github.com/valor-software/ngx-bootstrap/issues/1512)
* **carousel:** fixed styles for carousel navigation buttons ([a1489bd](https://github.com/valor-software/ngx-bootstrap/commit/a1489bdc43951528f907eb2b5b21bf18d1d81c8b))



## [1.2.4](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.3...v1.2.4) (2017-01-17)


### Bug Fixes

* **sortable:** fixing AoT type issues ([717a7e9](https://github.com/valor-software/ngx-bootstrap/commit/717a7e9c42ea1b3bfac4ccdbddfce3abe011ddc5))



## [1.2.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.2...v1.2.3) (2017-01-17)


### Bug Fixes

* **sortable:** prop made public for AoT ([1c25afc](https://github.com/valor-software/ngx-bootstrap/commit/1c25afc0f82b2a2fa91d9f5496184e64be849a4e))



## [1.2.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.1...v1.2.2) (2017-01-16)


### Bug Fixes

* **sortable:** Changed reference to BrowserModule to CommonModule instead ([#1503](https://github.com/valor-software/ngx-bootstrap/issues/1503)) ([e7105c6](https://github.com/valor-software/ngx-bootstrap/commit/e7105c6e688ae8ca361a9cfc30f1446c69afe0f3))
* **typeahead:** hide on blur when item was hovered ([4311c18](https://github.com/valor-software/ngx-bootstrap/commit/4311c18415983fcc91f3e2379bc6bac9734ad7c0)), closes [#1495](https://github.com/valor-software/ngx-bootstrap/issues/1495)


### Features

* **build:** upgrade to support ng v2.3+ only ([bd5171a](https://github.com/valor-software/ngx-bootstrap/commit/bd5171a214f5013363371b1f34008e95711eb711))



## [1.2.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.0...v1.2.1) (2017-01-13)


### Bug Fixes

* **sortable:** do not reexport BrowserModule ([77d79ab](https://github.com/valor-software/ngx-bootstrap/commit/77d79abbf35182414cd29f284dd2bc1764f22639)), closes [#1486](https://github.com/valor-software/ngx-bootstrap/issues/1486)


### Features

* **typeahead:** fix for bs4-alfa.6 template ([3fb6e38](https://github.com/valor-software/ngx-bootstrap/commit/3fb6e3859c7c1431d7af6a3423bf51e2a7557600)), closes [#1494](https://github.com/valor-software/ngx-bootstrap/issues/1494)



# [1.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.17...v1.2.0) (2017-01-12)


### Bug Fixes

* **sortable:** make property public for AoT compilance ([e5c3135](https://github.com/valor-software/ngx-bootstrap/commit/e5c3135bcc9fb972f77014ce9b01400b899d86e2)), closes [#1483](https://github.com/valor-software/ngx-bootstrap/issues/1483)


### Features

* **bs4:** upgrade to v4-alfa.6 ([#1485](https://github.com/valor-software/ngx-bootstrap/issues/1485)) ([4c71f87](https://github.com/valor-software/ngx-bootstrap/commit/4c71f8764b522e24860dcb57caeb704592c9dfc0))



## [1.1.17](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16-11...v1.1.17) (2017-01-11)


### Bug Fixes

* **alert:** removed duplicated event triggering ([b047d7f](https://github.com/valor-software/ngx-bootstrap/commit/b047d7feb014a672134860effaf1c747f32586c2)), closes [#1430](https://github.com/valor-software/ngx-bootstrap/issues/1430)
* **carousel:** play carousel on mouseup ([#1433](https://github.com/valor-software/ngx-bootstrap/issues/1433)) ([a1d7983](https://github.com/valor-software/ngx-bootstrap/commit/a1d798349e487e47fb5f673b52b282d08ca1469a))
* **popover:** markup for bs4 ([#1431](https://github.com/valor-software/ngx-bootstrap/issues/1431)) ([538cca8](https://github.com/valor-software/ngx-bootstrap/commit/538cca86bd1bb68e905cc25bc2385bc4bb9b05d9))
* **popover:** misspring in popover config name ([d7e8aa1](https://github.com/valor-software/ngx-bootstrap/commit/d7e8aa1a55c4a70e0dcb5e3fba8cb8f5365c1d71))


### Features

* **docs:** make urls easy to share ([47ab93b](https://github.com/valor-software/ngx-bootstrap/commit/47ab93bf4e4899bc665b3b85dd2366dbf178d358))
* **sortable:** added new sortable component ([#1295](https://github.com/valor-software/ngx-bootstrap/issues/1295)) ([fab3df5](https://github.com/valor-software/ngx-bootstrap/commit/fab3df506b94b4a4e9575d65249d5fa204903e2d))



## [1.1.16-11](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16-7...v1.1.16-11) (2016-12-30)


### Bug Fixes

* **accordion:** bs4 template updated ([53c0401](https://github.com/valor-software/ngx-bootstrap/commit/53c0401fd1d69eacd211c90eaf5d44d24689d516))
* **tabs:** removed onDestroy event ([78f6e49](https://github.com/valor-software/ngx-bootstrap/commit/78f6e49f92a247963db09f8d892ad53bbe2b273a)), closes [#696](https://github.com/valor-software/ngx-bootstrap/issues/696) [#610](https://github.com/valor-software/ngx-bootstrap/issues/610)
* **typeahead:** fixed typeahead positioning inside form-inline ([c6d4835](https://github.com/valor-software/ngx-bootstrap/commit/c6d483535a36b5814d1f3ff708752ec0d882c8f2)), closes [#1396](https://github.com/valor-software/ngx-bootstrap/issues/1396)


### Features

* **carousel:** Changed data structure to linked list. ([35102e6](https://github.com/valor-software/ngx-bootstrap/commit/35102e67404ac446a3491298555f4ea702d2a62c))
* **carousel:** direct setting of an active slide. Applying ng-bootstrap tests ([c0f41cf](https://github.com/valor-software/ngx-bootstrap/commit/c0f41cf811bb8b364e6ac111bb455a88b5b2be07))
* **docs:** added api doc generator ([eff2740](https://github.com/valor-software/ngx-bootstrap/commit/eff2740b5d7d510e720325e77a3dce59c479c292))
* **docs:** popover docs ([e96dc5c](https://github.com/valor-software/ngx-bootstrap/commit/e96dc5cd2bb83718a8de27bf2dc23eecd640e526))
* **package:** bumped to ng 2.4 ([79c4267](https://github.com/valor-software/ngx-bootstrap/commit/79c4267f58befd2f334ce986482b1f4e7548b071))



## [1.1.16-7](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16-5...v1.1.16-7) (2016-12-17)


### Bug Fixes

* **aot:** removed static variables, should fix [#1307](https://github.com/valor-software/ngx-bootstrap/issues/1307) ([ce9812a](https://github.com/valor-software/ngx-bootstrap/commit/ce9812a0385ea211131ff33086283339ff2553cc))



## [1.1.16-5](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16...v1.1.16-5) (2016-12-16)


### Bug Fixes

* **build:** fixed tslint issues ([a323690](https://github.com/valor-software/ngx-bootstrap/commit/a3236900b17318826b4cb46f2d984d7a552d6e81))
* **ci:** added build and link steps in pretest hook ([d813946](https://github.com/valor-software/ngx-bootstrap/commit/d813946229c4ed0df673089d87537b9c330bb94e))
* **ci:** karma test should work in travis now ([3d61d48](https://github.com/valor-software/ngx-bootstrap/commit/3d61d48b991f8ba57a415c162fb6a6bf9dfb888f))
* **ci:** let the karma pass ([5bb2619](https://github.com/valor-software/ngx-bootstrap/commit/5bb26193739efeaa8be44a1dde1449d665293014))
* **ci:** run linting before tests ([92e3ba5](https://github.com/valor-software/ngx-bootstrap/commit/92e3ba5d2bfb0a6dada86266575300fd1ed3c761))
* **config:** initial theme set to bs3 ([b83fd0d](https://github.com/valor-software/ngx-bootstrap/commit/b83fd0df64051e7d2752de1489dc8ba330f9632b)), closes [#1307](https://github.com/valor-software/ngx-bootstrap/issues/1307)
* **datepicker:** support reactive forms ([83fe9db](https://github.com/valor-software/ngx-bootstrap/commit/83fe9dbcbe528037ca1d09d5db12e1a1e8de4ff5)), closes [#893](https://github.com/valor-software/ngx-bootstrap/issues/893) [#1207](https://github.com/valor-software/ngx-bootstrap/issues/1207)
* **karma:** fix unit tests across the all supported browsers ([#1322](https://github.com/valor-software/ngx-bootstrap/issues/1322)) ([bd5a43a](https://github.com/valor-software/ngx-bootstrap/commit/bd5a43a86c8fc606ce1e334ca6514a4c36d8c86f))
* **karma.conf:** fix for incorrect definition of mime type of test.ts file ([#1332](https://github.com/valor-software/ngx-bootstrap/issues/1332)) ([b25f8d7](https://github.com/valor-software/ngx-bootstrap/commit/b25f8d7b35caa2568187a2b9d4a2d20dca381b10))
* **pager:** added support of reactive forms ([8daa4be](https://github.com/valor-software/ngx-bootstrap/commit/8daa4be67c50cb8e5564cd1c2c94c5f119552e08))
* **pager:** fix aot compilation ([#1232](https://github.com/valor-software/ngx-bootstrap/issues/1232)) ([fd93f7b](https://github.com/valor-software/ngx-bootstrap/commit/fd93f7b6e0202b562d4cafb09335947b75648871))
* **pagination:** added support of reactive forms ([e4547e7](https://github.com/valor-software/ngx-bootstrap/commit/e4547e747ce2a4be9b59e71ed60ef412b559c13e))
* **rating:** added support of reactive forms ([7ba357e](https://github.com/valor-software/ngx-bootstrap/commit/7ba357e536cea7c4f893b803ffefba88c9db5e75)), closes [#298](https://github.com/valor-software/ngx-bootstrap/issues/298)
* **timepicker:** make it compatible with reactive forms ([433c9f8](https://github.com/valor-software/ngx-bootstrap/commit/433c9f8d952aae76f09168d1b987422904d629bd))


### Features

* **access:** private access specifiers replaced by protected ([#1186](https://github.com/valor-software/ngx-bootstrap/issues/1186)) ([0d4e93b](https://github.com/valor-software/ngx-bootstrap/commit/0d4e93b91b1ded6e48f6b5f6568147b02947360b))
* **accordion:** add config file for accordion component ([0838055](https://github.com/valor-software/ngx-bootstrap/commit/083805570418004bbc8c76f7b41ef06287d2cb71))
* **bs4:** updated to alfa 5 Class name changes ([#1201](https://github.com/valor-software/ngx-bootstrap/issues/1201)) ([49197f0](https://github.com/valor-software/ngx-bootstrap/commit/49197f04dc1f520cadd4ea7715757363bf6e6961))
* **build:** added script for creation demo/src/index-BS4.html file ([#1278](https://github.com/valor-software/ngx-bootstrap/issues/1278)) ([e840943](https://github.com/valor-software/ngx-bootstrap/commit/e84094349a73ba7f2ccfa3287c78b78aae96f77f))
* **build:** aot fixed ([c9d447f](https://github.com/valor-software/ngx-bootstrap/commit/c9d447f675a9e23e54d70f54ff924cb8b2c58696))
* **build:** ng test now working, applied workaroud >.< ([8eea379](https://github.com/valor-software/ngx-bootstrap/commit/8eea379fe12804fbe3e1b3caac81c826427d5796))
* **build:** now using ngm build ([8126b06](https://github.com/valor-software/ngx-bootstrap/commit/8126b0626ec79f03a0671c4841e24f4440e609d8))
* **buttons:** clean control value accessor impl ([0414afa](https://github.com/valor-software/ngx-bootstrap/commit/0414afa37f1a5b0484f5a31a4447864641f6869f))
* **ci:** upload test coverage to codecov ([3d0923e](https://github.com/valor-software/ngx-bootstrap/commit/3d0923efee2df39159725410ab1a9fa1eae90dba))
* **component-helper:** removed completely ([de1d87c](https://github.com/valor-software/ngx-bootstrap/commit/de1d87c4adc93393a872d6c8b63cc8711fc551de))
* **component-loader:** added resolve method ([ea1de3c](https://github.com/valor-software/ngx-bootstrap/commit/ea1de3cd3a8435c5dc172e8e1fa3b9be6874c3a7))
* **component-loader:** simplified show method usage ([0767edf](https://github.com/valor-software/ngx-bootstrap/commit/0767edf174eb54fff7d8a62e01ee331c1fecf46f))
* **components:** new component loader provided ([3e53b7d](https://github.com/valor-software/ngx-bootstrap/commit/3e53b7d19748d3688fc2af8d024102f8cfa72c82))
* **datepicker:** add configuration class for datepicker component and use it instead of hardcoded constants ([290214e](https://github.com/valor-software/ngx-bootstrap/commit/290214ee708edc0a58276663f1af3981295af4cf))
* **datepicker:** disable datepicker dates based on dateDisabled property ([#799](https://github.com/valor-software/ngx-bootstrap/issues/799)) ([#1130](https://github.com/valor-software/ngx-bootstrap/issues/1130)) ([83452e1](https://github.com/valor-software/ngx-bootstrap/commit/83452e1ae525dd45b96d4d36b771e2c8fdf7d623))
* **demo:** fixed index for bs4 theme ([a26eb23](https://github.com/valor-software/ngx-bootstrap/commit/a26eb23ac9a0d812b9ad1e82f5f5ffa2038e1582))
* **docs:** Add "How to use with AoT compilation" ([#1273](https://github.com/valor-software/ngx-bootstrap/issues/1273)) ([a1f563e](https://github.com/valor-software/ngx-bootstrap/commit/a1f563ea07fc4b6eef1d3f776d96247695b3130f)), closes [#1270](https://github.com/valor-software/ngx-bootstrap/issues/1270) [#1188](https://github.com/valor-software/ngx-bootstrap/issues/1188)
* **docs:** modules imports usage updated ([b3b9a34](https://github.com/valor-software/ngx-bootstrap/commit/b3b9a3448a7cc5a99545e98c5ac7f1c24b98c176))
* **dropdown:** added config ([cf8b1be](https://github.com/valor-software/ngx-bootstrap/commit/cf8b1be8006235ebc235488cf93851a1c95fb570))
* **modals:** replaced component helper usage with component loader ([1447fd3](https://github.com/valor-software/ngx-bootstrap/commit/1447fd397d692e88b013aade4f3e15597d296ded))
* **modules:** now all modules export .forRoot() static method with providers ([5d663b5](https://github.com/valor-software/ngx-bootstrap/commit/5d663b5c19be95cca438b4557bb2e039517066ff))
* **ngm:** prepairing to release ([34e78c5](https://github.com/valor-software/ngx-bootstrap/commit/34e78c5e63ab47d81c19ecc8f7953e21f79ab286))
* **package:** dependencies update ([b78085b](https://github.com/valor-software/ngx-bootstrap/commit/b78085ba757f191d2d4023d1e86170db98d98c10))
* **package:** ng2 and moment version bump ([333b876](https://github.com/valor-software/ngx-bootstrap/commit/333b876726d2416311f06d20401f34c555e04203))
* **pager-tests:** added tests for pager component ([#1279](https://github.com/valor-software/ngx-bootstrap/issues/1279)) ([3970521](https://github.com/valor-software/ngx-bootstrap/commit/39705216d9576d22e14ba70c7fe7ad8613e6d46b))
* **progressbar:** add config file for progressbar component ([ec524fe](https://github.com/valor-software/ngx-bootstrap/commit/ec524feaca2d0dbdd5b65b1e519c976b7db3632b))
* **tabs:** added config ([8137030](https://github.com/valor-software/ngx-bootstrap/commit/8137030e97e411d4786fc8f7d60d444ef54bb1bb))
* **testing:** extended testing matrix ([2b42f51](https://github.com/valor-software/ngx-bootstrap/commit/2b42f5197edf0084d490758ab238184ff56498c2))
* **tests:** add alert spec ([#1336](https://github.com/valor-software/ngx-bootstrap/issues/1336)) ([d78d8df](https://github.com/valor-software/ngx-bootstrap/commit/d78d8df52031fff1b6e01bfebd955c675cde5c53))
* **tests:** added E2e saucelabs runner ([#1272](https://github.com/valor-software/ngx-bootstrap/issues/1272)) ([bce6120](https://github.com/valor-software/ngx-bootstrap/commit/bce61200b3e60c83cd1eb355683de29305001b9e))
* **timepicker:** added config to separate file ([e4a1b06](https://github.com/valor-software/ngx-bootstrap/commit/e4a1b061831764ff1fbb8be31cdbe2d272f05330))
* **tooltip:** add ability for user to define custom events for triggering tooltip displaying ([a61b40b](https://github.com/valor-software/ngx-bootstrap/commit/a61b40bdf5b06a122cd60e947d5a0325e5dbebab)), closes [#1215](https://github.com/valor-software/ngx-bootstrap/issues/1215)
* **tooltips:** add fade out effect ([#1266](https://github.com/valor-software/ngx-bootstrap/issues/1266)) ([9b69270](https://github.com/valor-software/ngx-bootstrap/commit/9b692703372aa12c7081465d4a436b6178df042c))
* **typeahead:** removed old injector usage ([#1321](https://github.com/valor-software/ngx-bootstrap/issues/1321)) ([a86c340](https://github.com/valor-software/ngx-bootstrap/commit/a86c3409ced5631f28f3a5467f369d83e227a3c1)), closes [#1318](https://github.com/valor-software/ngx-bootstrap/issues/1318)



## [1.1.16](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.15...v1.1.16) (2016-10-26)


### Bug Fixes

* **pagination:** temporary disabled pageBtnClass option ([49dd07f](https://github.com/valor-software/ngx-bootstrap/commit/49dd07fdc6535379688902ffef8fcdd078f6df9a))



## [1.1.15](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.14...v1.1.15) (2016-10-26)


### Bug Fixes

* **doc:** formatYear instead of formatMear for the datepicker ([#1126](https://github.com/valor-software/ngx-bootstrap/issues/1126)) ([045573b](https://github.com/valor-software/ngx-bootstrap/commit/045573bd8f40f680308aaeecfe75f03b34f2eb50))
* **modal:** hide bug in [#1144](https://github.com/valor-software/ngx-bootstrap/issues/1144) ([#1147](https://github.com/valor-software/ngx-bootstrap/issues/1147)) ([a3985c1](https://github.com/valor-software/ngx-bootstrap/commit/a3985c145a37c2f5dfafa85261d87e2bdefa973d))
* **tooltip:** fix `appendToBody` tooltip positioning ([#1158](https://github.com/valor-software/ngx-bootstrap/issues/1158)) ([#1159](https://github.com/valor-software/ngx-bootstrap/issues/1159)) ([0fd0a80](https://github.com/valor-software/ngx-bootstrap/commit/0fd0a80cbac669e01695c2434f91ab0fa41eb596))
* **tooltip:** fix delayed tooltip display ([#1156](https://github.com/valor-software/ngx-bootstrap/issues/1156)) ([#1161](https://github.com/valor-software/ngx-bootstrap/issues/1161)) ([c6da387](https://github.com/valor-software/ngx-bootstrap/commit/c6da3876690c858e7a9f5fee14a41f560e1c8529))


### Features

* **datepicker:** Added configurable limit for amount of items displayed in a single row of monthpicker and yearpicker ([#1141](https://github.com/valor-software/ngx-bootstrap/issues/1141)) ([859afb2](https://github.com/valor-software/ngx-bootstrap/commit/859afb24fa898f70d67fc08084b99e9ad9f0d958))
* **e2e:** added more e2e test ([d56f560](https://github.com/valor-software/ngx-bootstrap/commit/d56f56085bbe9f1424822fd93565dae52547ccdf)), closes [#1163](https://github.com/valor-software/ngx-bootstrap/issues/1163)
* **pagination:** allow setting of a custom css class on <li> ([#1115](https://github.com/valor-software/ngx-bootstrap/issues/1115)) ([235215c](https://github.com/valor-software/ngx-bootstrap/commit/235215c52c11e5bd0cc8550a10e06d1c3ab72458))
* **tooltip:** Make `appendToBody` work in Tooltip ([#1074](https://github.com/valor-software/ngx-bootstrap/issues/1074)) ([7e233b1](https://github.com/valor-software/ngx-bootstrap/commit/7e233b1054b65b3ed44970df864f8c11f45f269d))



## [1.1.14](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.14-1...v1.1.14) (2016-10-13)


### Bug Fixes

* **tooltip:** properties types ([b407012](https://github.com/valor-software/ngx-bootstrap/commit/b4070122dea9c198fb8ee1f7120a82a636b1830a))


### Features

* **package:** relax peer dependecies to work with 2.x.x ([bc55a38](https://github.com/valor-software/ngx-bootstrap/commit/bc55a38435dbd668975111580e4ff8f0073644c6))
* **tooltip:** added Tooltip delay functionality ([#1116](https://github.com/valor-software/ngx-bootstrap/issues/1116)) ([eb90e9a](https://github.com/valor-software/ngx-bootstrap/commit/eb90e9a7b8b0324e5278a937fb781e5fe620f956))



## [1.1.14-1](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.14-0...v1.1.14-1) (2016-10-11)


### Bug Fixes

* **package:** fixed link to main file ([a515089](https://github.com/valor-software/ngx-bootstrap/commit/a51508944c5c34abb8d774cb05581046d6c554cb))



## [1.1.14-0](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.13...v1.1.14-0) (2016-10-11)


### Features

* **build:** system.js bundles replaced with UMD bundles ([3e0a27d](https://github.com/valor-software/ngx-bootstrap/commit/3e0a27d516645562964b30ce3994960bd20e7fcf))
* **UMD:** added UMD bundles ([a7554a8](https://github.com/valor-software/ngx-bootstrap/commit/a7554a88262f7328c82bae87a5f60a30066f4610)), closes [#1098](https://github.com/valor-software/ngx-bootstrap/issues/1098)



## [1.1.13](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.13-1...v1.1.13) (2016-10-11)



## [1.1.13-1](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.13-0...v1.1.13-1) (2016-10-11)


### Bug Fixes

* **build:** export all internal classes so AoT can work without issues ([6e6be1a](https://github.com/valor-software/ngx-bootstrap/commit/6e6be1a0d9c0f511d8ed2f8f7dab77a8918ebf81)), closes [#1093](https://github.com/valor-software/ngx-bootstrap/issues/1093)



## [1.1.13-0](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.11...v1.1.13-0) (2016-10-10)


### Bug Fixes

* **helpers:** add a way to set root view component ref ([79d3335](https://github.com/valor-software/ngx-bootstrap/commit/79d33352bf324ee88fcf97966a06b3047111b0d7)), closes [#1056](https://github.com/valor-software/ngx-bootstrap/issues/1056)
* **tooltip:** show & hide methods should not need any arguments ([#1099](https://github.com/valor-software/ngx-bootstrap/issues/1099)) ([b80c0b4](https://github.com/valor-software/ngx-bootstrap/commit/b80c0b414295347cb6e1418afdd94d1d66cace39))



## [1.1.11](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.10...v1.1.11) (2016-10-07)


### Bug Fixes

* **datepicker:** do not emit selection done on ngModel changes ([7b24283](https://github.com/valor-software/ngx-bootstrap/commit/7b24283de84f8edc6837c317816ae7c40548e96f)), closes [#1095](https://github.com/valor-software/ngx-bootstrap/issues/1095)



## [1.1.10](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.9...v1.1.10) (2016-10-07)


### Bug Fixes

* **aot:** 2 more private methods made public ([0dbbf09](https://github.com/valor-software/ngx-bootstrap/commit/0dbbf09a8154f07e8f67e8f5e4c0e9b62e365328)), closes [#1093](https://github.com/valor-software/ngx-bootstrap/issues/1093)
* **typeahead:** onFocus should not need any arguments ([41f5834](https://github.com/valor-software/ngx-bootstrap/commit/41f58342c2335cfe2be86c4b96d9fcbe307d422a))
* **typeahead:** use TypeaheadMatch model instead of any type ([ff5c219](https://github.com/valor-software/ngx-bootstrap/commit/ff5c2199e273490edc8ef537d1129eb3b4ee448c))


### Features

* **typeahead:** add grouping of typeahead options ([fdddbde](https://github.com/valor-software/ngx-bootstrap/commit/fdddbde0a21b6fec2b1710d57d343d3eaeaa6bf1))
* **typeahead:** introduce TypeaheadMatch model ([80fccab](https://github.com/valor-software/ngx-bootstrap/commit/80fccabe3b8befa829925fede4844a9feda7ca5c))



## [1.1.9](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.8...v1.1.9) (2016-10-06)


### Bug Fixes

* **build:** All `@HostBinding` and `@HostListener` should be public ([#1086](https://github.com/valor-software/ngx-bootstrap/issues/1086)) ([3691757](https://github.com/valor-software/ngx-bootstrap/commit/369175700e11f31a59a234fcbfc4b1df3d91aaa5)), closes [#1080](https://github.com/valor-software/ngx-bootstrap/issues/1080)



## [1.1.8](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.7...v1.1.8) (2016-10-05)


### Bug Fixes

* **buttons:** all @Input() fields should be public ([c96ffd3](https://github.com/valor-software/ngx-bootstrap/commit/c96ffd3ee53acc6d701c0fabc87ed1284fdf799b))



## [1.1.7](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.6...v1.1.7) (2016-10-05)


### Bug Fixes

* **module:** class exports added back ([3eaa9ad](https://github.com/valor-software/ngx-bootstrap/commit/3eaa9ad5d2bcac670c48ad6afadb00c67ed285e5))



## [1.1.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.5...v1.1.6) (2016-10-04)


### Bug Fixes

* **build:** change properties privacy to use in factories ([19c0c61](https://github.com/valor-software/ngx-bootstrap/commit/19c0c611afb8c292f0e666d8a859569af6c839fe))
* **datepicker:** changing the date programatically selects the correct date ([#1041](https://github.com/valor-software/ngx-bootstrap/issues/1041)) ([fb6d532](https://github.com/valor-software/ngx-bootstrap/commit/fb6d532af210093f5b0570840106e7056b144e25)), closes [#858](https://github.com/valor-software/ngx-bootstrap/issues/858)
* **datepicker:** fixed broken bindings for aria-labelby and ids ([#1055](https://github.com/valor-software/ngx-bootstrap/issues/1055)) ([26d9209](https://github.com/valor-software/ngx-bootstrap/commit/26d920986585c9d753e485d2bcdb7854f03a7963))
* **datepicker:** Fixing Colspan ([#1057](https://github.com/valor-software/ngx-bootstrap/issues/1057)) ([e71a8ae](https://github.com/valor-software/ngx-bootstrap/commit/e71a8ae674573def5a12336061daba7b1bb6c0f2))
* **datepicker:** imlement ReactiveForms setDisabledState for TimepickerComponent ([cd58c3b](https://github.com/valor-software/ngx-bootstrap/commit/cd58c3b3d95fcd1bef990eb46a965069169b6871)), closes [#1024](https://github.com/valor-software/ngx-bootstrap/issues/1024)
* **demo:** fixed tabs demo ([#1050](https://github.com/valor-software/ngx-bootstrap/issues/1050)) ([969a61a](https://github.com/valor-software/ngx-bootstrap/commit/969a61aaba23c72c4bc1c60033d8f6f45ab0d1f9))
* **export:** removed obsolete exports to avoid missusage ([6993e97](https://github.com/valor-software/ngx-bootstrap/commit/6993e979fa2f2fbb145d2b03792c12e0122621da))
* **modal:** Call hideModal in ngOnDestroy if modal is shown ([#1038](https://github.com/valor-software/ngx-bootstrap/issues/1038)) ([b38db2a](https://github.com/valor-software/ngx-bootstrap/commit/b38db2a11b17d2984627107a00257d67e7ac2a03)), closes [#853](https://github.com/valor-software/ngx-bootstrap/issues/853) [#1051](https://github.com/valor-software/ngx-bootstrap/issues/1051) [#1052](https://github.com/valor-software/ngx-bootstrap/issues/1052)
* **package:** development files added to .npmignore ([887c6b2](https://github.com/valor-software/ngx-bootstrap/commit/887c6b2e13963cf732f7131704b08b0a2bbbee69)), closes [#737](https://github.com/valor-software/ngx-bootstrap/issues/737)
* **pagination:** Fix disabled class on next and last buttons ([#1036](https://github.com/valor-software/ngx-bootstrap/issues/1036)) ([01f4759](https://github.com/valor-software/ngx-bootstrap/commit/01f475971d075f1f3424768658aa6fdff24935de)), closes [#922](https://github.com/valor-software/ngx-bootstrap/issues/922)
* **slider:** Slide shouldnt enforce text alignment ([#824](https://github.com/valor-software/ngx-bootstrap/issues/824)) ([ad2c5a6](https://github.com/valor-software/ngx-bootstrap/commit/ad2c5a6c4c07f7cd2820408d38589f5ad8587419))
* **template:**  templates should not use es6 templates ([de26168](https://github.com/valor-software/ngx-bootstrap/commit/de26168d8b92d42472f7ae70ead9749ecaebfd65))
* **typeahead:** Fix crash with `contenteditable` inputs ([47b9fb1](https://github.com/valor-software/ngx-bootstrap/commit/47b9fb117a0ef27669c23c64501029bccef2b424))
* **univeral:** added hacks for missing type keywords ([d20ccf1](https://github.com/valor-software/ngx-bootstrap/commit/d20ccf109c9a718823b2eab4f971b3595b04a83f)), closes [#964](https://github.com/valor-software/ngx-bootstrap/issues/964)
* **utils:** now attach to body should work for mixed ng1+ng2 apps ([99f15c8](https://github.com/valor-software/ngx-bootstrap/commit/99f15c826bf0b39e11d69b58979b84d6819026a7)), closes [#1069](https://github.com/valor-software/ngx-bootstrap/issues/1069) [#1056](https://github.com/valor-software/ngx-bootstrap/issues/1056)


### Features

* **build:** added config file for wallabyjs ([cec8bae](https://github.com/valor-software/ngx-bootstrap/commit/cec8baecdd8a6340955f0b32e186d9e8a818f850))
* **build:** use ngc compiler to produce metadata ([afabb9d](https://github.com/valor-software/ngx-bootstrap/commit/afabb9d24b69e053e93324b380f0812652f03b53)), closes [#1060](https://github.com/valor-software/ngx-bootstrap/issues/1060) [#992](https://github.com/valor-software/ngx-bootstrap/issues/992) [#933](https://github.com/valor-software/ngx-bootstrap/issues/933)
* **buttons:** update radio button directive to work with ReactiveForms ([5d51939](https://github.com/valor-software/ngx-bootstrap/commit/5d51939092386affc28f2f4bdc488b22d28c1205)), closes [#1023](https://github.com/valor-software/ngx-bootstrap/issues/1023)
* **tabs:** added custom class option ([13fac37](https://github.com/valor-software/ngx-bootstrap/commit/13fac376888a71f9fd06f9fafb3301137e9b6f11)), closes [#766](https://github.com/valor-software/ngx-bootstrap/issues/766) [#842](https://github.com/valor-software/ngx-bootstrap/issues/842) [#842](https://github.com/valor-software/ngx-bootstrap/issues/842)
* **tooltip:** added tooltipStateChanged and exporting the directive ([#939](https://github.com/valor-software/ngx-bootstrap/issues/939)) ([650b4f7](https://github.com/valor-software/ngx-bootstrap/commit/650b4f717c298c3659ba7ea3a041c3ced89bdd9d))



## [1.1.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.4...v1.1.5) (2016-09-16)


### Bug Fixes

* **modal:** fixing hack which gets root viewContainerRef to attach backdrop ([b5db597](https://github.com/valor-software/ngx-bootstrap/commit/b5db5975e561f5594245a21400eafd9e8d92f00b)), closes [#975](https://github.com/valor-software/ngx-bootstrap/issues/975) [#854](https://github.com/valor-software/ngx-bootstrap/issues/854)



## [1.1.4](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.3...v1.1.4) (2016-09-15)



## [1.1.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.2...v1.1.3) (2016-09-14)


### Bug Fixes

* **modal:** should fix 'no provider for ...' exception ([4c3e4c9](https://github.com/valor-software/ngx-bootstrap/commit/4c3e4c9a501c3259b219c56f55b305303ccc2977)), closes [#854](https://github.com/valor-software/ngx-bootstrap/issues/854) [#951](https://github.com/valor-software/ngx-bootstrap/issues/951)
* **tests:** "no provider" error when running tests ([#963](https://github.com/valor-software/ngx-bootstrap/issues/963)) ([8483615](https://github.com/valor-software/ngx-bootstrap/commit/8483615fedb3739102b6bcde97e1861d984fc1e1))



## [1.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.1...v1.1.2) (2016-09-12)


### Bug Fixes

* **datepicker:** removed popup stub ([d1a7d09](https://github.com/valor-software/ngx-bootstrap/commit/d1a7d092b74ef583fcf48fc31d232e98654b0e27))


### Features

* **forms:**  add export of FormsModule where [ngModel] selector is present ([#931](https://github.com/valor-software/ngx-bootstrap/issues/931)) ([b5c8448](https://github.com/valor-software/ngx-bootstrap/commit/b5c8448d1c5756e97b1b6b3b2b8ebd41cd00412e)), closes [#929](https://github.com/valor-software/ngx-bootstrap/issues/929) [#929](https://github.com/valor-software/ngx-bootstrap/issues/929)



## [1.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.0...v1.1.1) (2016-09-02)


### Bug Fixes

* **dropdown:** toggle does not close when clicking directly on an icon in Chrome ([#851](https://github.com/valor-software/ngx-bootstrap/issues/851)) ([341dcf8](https://github.com/valor-software/ngx-bootstrap/commit/341dcf85c89a717ad8506b53eedc6b8a1f8b3022)), closes [#658](https://github.com/valor-software/ngx-bootstrap/issues/658)
* **window:** fixed window usage ([0b7012a](https://github.com/valor-software/ngx-bootstrap/commit/0b7012ab7ee041fddfe2090d28275ab7263e8f3d)), closes [#909](https://github.com/valor-software/ngx-bootstrap/issues/909) [#908](https://github.com/valor-software/ngx-bootstrap/issues/908) [#906](https://github.com/valor-software/ngx-bootstrap/issues/906)



# [1.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.23...v1.1.0) (2016-09-01)


### Bug Fixes

* **build:** restore coverage reports ([#755](https://github.com/valor-software/ngx-bootstrap/issues/755)) ([26191eb](https://github.com/valor-software/ngx-bootstrap/commit/26191ebcc24b9c9cdb86283f584d8cb9766616fd))
* **ci:** upload test coverage report to codecov ([#756](https://github.com/valor-software/ngx-bootstrap/issues/756)) ([4358773](https://github.com/valor-software/ngx-bootstrap/commit/43587739a12a59bcce54fbd29fcc4f598334182a))
* **datepicker:** remove unused code ([#837](https://github.com/valor-software/ngx-bootstrap/issues/837)) ([fa22c98](https://github.com/valor-software/ngx-bootstrap/commit/fa22c98c157240ef0ef7d37d29c12beb5efdd2e6))
* **demo:** fixed accordion demo ([bd4cc96](https://github.com/valor-software/ngx-bootstrap/commit/bd4cc96cb4d2c0931824eb1a1de66dbdf3e918a6)), closes [#399](https://github.com/valor-software/ngx-bootstrap/issues/399)
* **modals:** fixed modals fade in animation ([2b95c95](https://github.com/valor-software/ngx-bootstrap/commit/2b95c95b375555bbfd64e9b35e28033c0b21146c)), closes [#687](https://github.com/valor-software/ngx-bootstrap/issues/687)


### Features

* **collpase:** add collapsed and expanded events to the collapse directive [#576](https://github.com/valor-software/ngx-bootstrap/issues/576) ([#779](https://github.com/valor-software/ngx-bootstrap/issues/779)) ([a6f9bb5](https://github.com/valor-software/ngx-bootstrap/commit/a6f9bb541af02ba85cfd85610d1de7de29327ce4))
* **dropdown:** added exportAs to dropdown directives ([#785](https://github.com/valor-software/ngx-bootstrap/issues/785)) ([66531c7](https://github.com/valor-software/ngx-bootstrap/commit/66531c7cda6c8e4b73cc3aedc4875d872e96e57a))
* **dropdown:** optionally add dropdown-toggle class ([#772](https://github.com/valor-software/ngx-bootstrap/issues/772)) ([52d3167](https://github.com/valor-software/ngx-bootstrap/commit/52d316775911e4364ff1d8fbde414bacd710640e))
* **timepicker:** disabling meridian and hiding spinners if input is disabled ([#768](https://github.com/valor-software/ngx-bootstrap/issues/768)) ([a19c841](https://github.com/valor-software/ngx-bootstrap/commit/a19c841eedcb6c449dbac5e3a3a0b44ea11a21c5)), closes [#759](https://github.com/valor-software/ngx-bootstrap/issues/759)
* **tooltip:** add implementation for tooltipClass ([#664](https://github.com/valor-software/ngx-bootstrap/issues/664)) ([fa4475a](https://github.com/valor-software/ngx-bootstrap/commit/fa4475a35afb796c806f0f1cc652b9fc277d7e6a))
* **tooltip:** html content as template ([#751](https://github.com/valor-software/ngx-bootstrap/issues/751)) ([6489e38](https://github.com/valor-software/ngx-bootstrap/commit/6489e3823aaca8592073cec7a7bffb36a9903751))
* **tooltip:** tooltip html content ([#724](https://github.com/valor-software/ngx-bootstrap/issues/724)) ([9070125](https://github.com/valor-software/ngx-bootstrap/commit/9070125f7d6635a76fed569b21bcd2b14d90f7bd))
* **typeahead:** adding custom item template ([#776](https://github.com/valor-software/ngx-bootstrap/issues/776)) ([1356ff7](https://github.com/valor-software/ngx-bootstrap/commit/1356ff71cc207b2b18247725e5bed25a795888ec)), closes [#503](https://github.com/valor-software/ngx-bootstrap/issues/503) [#652](https://github.com/valor-software/ngx-bootstrap/issues/652)
* **typeahead:** adding support for nested properties and functions for typeaheadOptionField ([#777](https://github.com/valor-software/ngx-bootstrap/issues/777)) ([b24dabf](https://github.com/valor-software/ngx-bootstrap/commit/b24dabf48931d162ebdd0b95e5910931292fd4e8)), closes [#135](https://github.com/valor-software/ngx-bootstrap/issues/135) [#523](https://github.com/valor-software/ngx-bootstrap/issues/523)



## [1.0.23](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.22...v1.0.23) (2016-07-14)


### Bug Fixes

* **build:** fix rxjs typings issues on build ([b4267aa](https://github.com/valor-software/ngx-bootstrap/commit/b4267aaac9a81739902a6809c58d5b082ee15a8e))
* **dropdown:** Add the dropdown-menu class to dropdown menus ([1bc316f](https://github.com/valor-software/ngx-bootstrap/commit/1bc316fe1928b7c1861b28b1ae097879c3b3bfb9)), closes [#541](https://github.com/valor-software/ngx-bootstrap/issues/541) [#732](https://github.com/valor-software/ngx-bootstrap/issues/732)
* **modal:** injected DOCUMENT token is undefined ([48a9aa7](https://github.com/valor-software/ngx-bootstrap/commit/48a9aa781055231ad746e470fe8b9f2a761c9fc6)), closes [#575](https://github.com/valor-software/ngx-bootstrap/issues/575)
* **typeahead:** Added form support ([#723](https://github.com/valor-software/ngx-bootstrap/issues/723)) ([fa54e46](https://github.com/valor-software/ngx-bootstrap/commit/fa54e46a14b5dd17f6624fbd2b4f1344751526ca))


### Features

* **datepicker:** add emitting event when datepicker selection is done ([#733](https://github.com/valor-software/ngx-bootstrap/issues/733)) ([53c7fd1](https://github.com/valor-software/ngx-bootstrap/commit/53c7fd16917578967499a7c61dda7e0c9fe4a00e))



## [1.0.22](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.21...v1.0.22) (2016-07-12)



## [1.0.21](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.20...v1.0.21) (2016-07-12)



## [1.0.20](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.19...v1.0.20) (2016-07-11)


### Bug Fixes

* **package:** removed peer dependency to router ([c661772](https://github.com/valor-software/ngx-bootstrap/commit/c661772de1ac736484775b1b5a25f7f2257886dc))



## [1.0.19](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.17...v1.0.19) (2016-07-11)


### Bug Fixes

* **build:** emit helpers ([4771f6f](https://github.com/valor-software/ngx-bootstrap/commit/4771f6f2a6e214c03209e7f1bf9647db7c22cb25))
* **build:** fixed prod build webpack config ([753cc67](https://github.com/valor-software/ngx-bootstrap/commit/753cc67e314d660aa2a357c3e37bb3f46a648b01))
* **demo:** add "dropdownMenu" ([#580](https://github.com/valor-software/ngx-bootstrap/issues/580)) ([686a96e](https://github.com/valor-software/ngx-bootstrap/commit/686a96e65682d52f98a9f7c581c84a3516900521))
* **docs:** fix typo ([#612](https://github.com/valor-software/ngx-bootstrap/issues/612)) ([7ddd532](https://github.com/valor-software/ngx-bootstrap/commit/7ddd532fc41c5841421764cfab14712a58c1bfbf))
* **docs:** nonInput is by default ([#581](https://github.com/valor-software/ngx-bootstrap/issues/581)) ([b23ced0](https://github.com/valor-software/ngx-bootstrap/commit/b23ced0e0fd198001d251885dfbce3fdb262e295))
* **dropdown:** explicitly markForCheck() ([#566](https://github.com/valor-software/ngx-bootstrap/issues/566)) ([0ce4328](https://github.com/valor-software/ngx-bootstrap/commit/0ce432827ecb27c93e6a92fb49a326d91845afc8))
* **dropdown:** prop disabled renamed to isDisabled  ([#615](https://github.com/valor-software/ngx-bootstrap/issues/615)) ([8a1d6f8](https://github.com/valor-software/ngx-bootstrap/commit/8a1d6f86e734301766dcf5fef9a0a44c6b774115))
* **header-component:** fix style ([ccfe948](https://github.com/valor-software/ngx-bootstrap/commit/ccfe9484716c3898be51fbbfc24017903facc399))
* **modal:** don't hide on out click if backdrop === 'static' ([#629](https://github.com/valor-software/ngx-bootstrap/issues/629)) ([df85712](https://github.com/valor-software/ngx-bootstrap/commit/df85712763e494a2528771fd006fc661aad5c969)), closes [#574](https://github.com/valor-software/ngx-bootstrap/issues/574)
* **modal:** fix typo in MODAL_DIRECTIVES ([#630](https://github.com/valor-software/ngx-bootstrap/issues/630)) ([8c4c125](https://github.com/valor-software/ngx-bootstrap/commit/8c4c125ec05a3d9e41bdae5821404b88f727898e))
* **modals:** modal backdrop and onclick events handling ([b39b856](https://github.com/valor-software/ngx-bootstrap/commit/b39b85648b36cfa4a0d92be13146577d9dfe18f9)), closes [#687](https://github.com/valor-software/ngx-bootstrap/issues/687) [#703](https://github.com/valor-software/ngx-bootstrap/issues/703) [#708](https://github.com/valor-software/ngx-bootstrap/issues/708)
* **package:** include js map files in bundles ([1ffd2b4](https://github.com/valor-software/ngx-bootstrap/commit/1ffd2b48aebba8a22123934663eed0130892e8be)), closes [#632](https://github.com/valor-software/ngx-bootstrap/issues/632)
* **readme:** alert component name fixed ([e9a1d04](https://github.com/valor-software/ngx-bootstrap/commit/e9a1d04b6a520be6a3a255a9b0f5b9bb9a2dcf3d)), closes [#552](https://github.com/valor-software/ngx-bootstrap/issues/552)
* **style:** fix top menu z-index ([e70e578](https://github.com/valor-software/ngx-bootstrap/commit/e70e5784778c3abcc73b55219681980433081a30))
* **tests:** fix failing test for buttons and accordion ([8ea9c10](https://github.com/valor-software/ngx-bootstrap/commit/8ea9c109698e498b7ecc82f287b866e64eec5a55))
* **typeahead:** removed incorrect behavior to do ENTER behavior on TAB. TAB should simply skip to next field as expected. ([#715](https://github.com/valor-software/ngx-bootstrap/issues/715)) ([758ad1b](https://github.com/valor-software/ngx-bootstrap/commit/758ad1b38c0a53502bbafffcf5226f63f6c969a3)), closes [#686](https://github.com/valor-software/ngx-bootstrap/issues/686) [#490](https://github.com/valor-software/ngx-bootstrap/issues/490) [#689](https://github.com/valor-software/ngx-bootstrap/issues/689)


### Features

* **demo:** new build process with ng2-webpack-config ([5c8fcf1](https://github.com/valor-software/ngx-bootstrap/commit/5c8fcf1c03ee34091c42655c8d89b48ce815e1cc))
* **docs:** added modals section ([6ab3a07](https://github.com/valor-software/ngx-bootstrap/commit/6ab3a07e1f06261a7fa9c804c1ee2a56b5f22db9))
* **docs:** applied new docs style ([d84211a](https://github.com/valor-software/ngx-bootstrap/commit/d84211a6cd084aebe6a84796bb9dde7b114ca821))
* **docs:** menues and contents updated ([2155df6](https://github.com/valor-software/ngx-bootstrap/commit/2155df6d9682082ea8b69f219aa0889a752fc3e0))
* **package:** angular updated to rc3, fix hash (active route) ([#636](https://github.com/valor-software/ngx-bootstrap/issues/636)) ([70a84cf](https://github.com/valor-software/ngx-bootstrap/commit/70a84cf33c9e093a7debb4f0e7f55d7dab78b706))
* **typeahead:** rxjs version ([#584](https://github.com/valor-software/ngx-bootstrap/issues/584)) ([48b8abb](https://github.com/valor-software/ngx-bootstrap/commit/48b8abb126b648ec76aae9fbc13365ebc1a469b5)), closes [#536](https://github.com/valor-software/ngx-bootstrap/issues/536) [#637](https://github.com/valor-software/ngx-bootstrap/issues/637)


### BREAKING CHANGES

* **dropdown:** * dropdown property `disabled` renamed to `isDisabled`



## [1.0.17](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.16...v1.0.17) (2016-05-31)


### Bug Fixes

* **datepicker:** added ngOnChanges hook ([ecffdb0](https://github.com/valor-software/ngx-bootstrap/commit/ecffdb02f82bcb5968036b14b544790f8176f6e9)), closes [#543](https://github.com/valor-software/ngx-bootstrap/issues/543)
* **timepicker:** added null value validation ([f9ad7e7](https://github.com/valor-software/ngx-bootstrap/commit/f9ad7e7a23f351aabc496e86eac7abcade53d1ad)), closes [#533](https://github.com/valor-software/ngx-bootstrap/issues/533)
* **tooltip:** Fix tooltip arrows in bootstrap v4 ([b4250d4](https://github.com/valor-software/ngx-bootstrap/commit/b4250d4f26d286e177a5c363af8bd8649a287730)), closes [#141](https://github.com/valor-software/ngx-bootstrap/issues/141)


### Features

* **modals:** added declarative modals component ([#564](https://github.com/valor-software/ngx-bootstrap/issues/564)) ([1d0903f](https://github.com/valor-software/ngx-bootstrap/commit/1d0903f9fdd518d67452b4ca7486470c5c98711a)), closes [#29](https://github.com/valor-software/ngx-bootstrap/issues/29)
* **tooltip:** adds implementation to tooltipEnable ([#517](https://github.com/valor-software/ngx-bootstrap/issues/517)) ([1470892](https://github.com/valor-software/ngx-bootstrap/commit/1470892d3ce159e4109907ab46eb1ab694783d47))



## [1.0.16](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.15...v1.0.16) (2016-05-06)


### Bug Fixes

* **build:** system.js bundler updated to rc.1 ([6945ad9](https://github.com/valor-software/ngx-bootstrap/commit/6945ad99442b190de344eef3910d2b547c796200))
* **collapse:** had to disable animation in order to update to rc.1 ([3443495](https://github.com/valor-software/ngx-bootstrap/commit/34434958658c6436015b566a3bce48c7be300d17))
* **collapse:** removed dependecy to animation builder ([fed473f](https://github.com/valor-software/ngx-bootstrap/commit/fed473f99a63d1c9d7c8d1288cd7dcca871bb2c8))
* **docs:** update to ButtonRadioDirective and ButtonCheckboxDirective ([#476](https://github.com/valor-software/ngx-bootstrap/issues/476)) ([2e2d79b](https://github.com/valor-software/ngx-bootstrap/commit/2e2d79b1f16362d78a02a4b556d9c390670b2956))


### Features

* **package:** upgrade ng2-bootstrap to rc.1 ([#481](https://github.com/valor-software/ngx-bootstrap/issues/481)) ([554be3d](https://github.com/valor-software/ngx-bootstrap/commit/554be3d9b329c2f75c1f4d4a4cfeff43b4723c88)), closes [#482](https://github.com/valor-software/ngx-bootstrap/issues/482) [#472](https://github.com/valor-software/ngx-bootstrap/issues/472) [#477](https://github.com/valor-software/ngx-bootstrap/issues/477)



## [1.0.15](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.14...v1.0.15) (2016-04-28)


### Bug Fixes

* **buttons:** had incorrect import statement which breaks .d.ts and import ([67ee5b5](https://github.com/valor-software/ngx-bootstrap/commit/67ee5b5ef337b91b7a33b8cb0ff854e2b693b099))
* **universal:** now plays well with ng2 universal ([9d595d3](https://github.com/valor-software/ngx-bootstrap/commit/9d595d3f892066e6aa93a53712045253e6ea48c4)), closes [#61](https://github.com/valor-software/ngx-bootstrap/issues/61)



## [1.0.14](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.13...v1.0.14) (2016-04-26)


### Bug Fixes

* **accordion:** Panel isn't resizing after content has changed ([914ae1a](https://github.com/valor-software/ngx-bootstrap/commit/914ae1adb8df739c04754ccd5b79bff281c184fe)), closes [#454](https://github.com/valor-software/ngx-bootstrap/issues/454)
* **collapse:** Setting overflow back to visible in Collapse ([#433](https://github.com/valor-software/ngx-bootstrap/issues/433)) ([5c9434e](https://github.com/valor-software/ngx-bootstrap/commit/5c9434efacda2060dddf7374c80c790e64e6ac83)), closes [#372](https://github.com/valor-software/ngx-bootstrap/issues/372)
* **datepicker:** added support for null value ([8109dd2](https://github.com/valor-software/ngx-bootstrap/commit/8109dd21d609b6004ecec230d8607f1bd269832e)), closes [#16](https://github.com/valor-software/ngx-bootstrap/issues/16) [#445](https://github.com/valor-software/ngx-bootstrap/issues/445)
* **datepicker:** If the date was set by ngModel it will be overwritten by default value ([6321253](https://github.com/valor-software/ngx-bootstrap/commit/632125359a291a73f276e7499ac7d3b356698878))
* **Tabset:** add tab-container class to the Tabset component for correct display ([2b951f7](https://github.com/valor-software/ngx-bootstrap/commit/2b951f782b390fd5fe3161483bd4375ff4257b89))


### Features

* **package:** updated angular2 to 0-beta.16 ([75b3568](https://github.com/valor-software/ngx-bootstrap/commit/75b3568309fb5a274e624ac7e058a3080ceffb7a))
* **typeahead:** show list of options on focuse when minLength=0 ([f1c1909](https://github.com/valor-software/ngx-bootstrap/commit/f1c1909c04fe03c7c56309079942b5f5905376ae)), closes [#187](https://github.com/valor-software/ngx-bootstrap/issues/187) [#413](https://github.com/valor-software/ngx-bootstrap/issues/413)



## [1.0.13](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.12...v1.0.13) (2016-04-15)


### Bug Fixes

* **typeahead:** blur event handler should not prevent item selection ([847d375](https://github.com/valor-software/ngx-bootstrap/commit/847d3756b73dfc9fdff829a987e41506a6ad6143)), closes [#403](https://github.com/valor-software/ngx-bootstrap/issues/403) [#418](https://github.com/valor-software/ngx-bootstrap/issues/418) [#356](https://github.com/valor-software/ngx-bootstrap/issues/356)
* **typeahead:** Blur hide with timeout, to allow other events to be triggered. (fixes [#363](https://github.com/valor-software/ngx-bootstrap/issues/363)) ([1a719d0](https://github.com/valor-software/ngx-bootstrap/commit/1a719d077478cb506bd7c95c622a737041c025e0)), closes [#395](https://github.com/valor-software/ngx-bootstrap/issues/395) [#389](https://github.com/valor-software/ngx-bootstrap/issues/389)



## [1.0.12](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.11...v1.0.12) (2016-04-15)


### Features

* **deps:** upgrade to angular2 beta.15 ([00e6ad4](https://github.com/valor-software/ngx-bootstrap/commit/00e6ad46a84ea91c48d85efa4e574fadc247deab))



## [1.0.11](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.10...v1.0.11) (2016-04-08)


### Bug Fixes

* **build:** generate source maps for systemjs bundles (fixes [#367](https://github.com/valor-software/ngx-bootstrap/issues/367)) ([81e16b7](https://github.com/valor-software/ngx-bootstrap/commit/81e16b76390e2e5eb22cb39850518a0b1d8ed11b))
* **demo:** added card clasess to pre tags in bs4 demo ([0dfe7b2](https://github.com/valor-software/ngx-bootstrap/commit/0dfe7b2452f7e1e942a1551c29e338e199eaa329))
* **lint:** added usage of tslint-config-valorsoft ([cad6af3](https://github.com/valor-software/ngx-bootstrap/commit/cad6af366e4e90bf2315ab48c02ef9ba3c1fe0e3))
* **lint:** enable tslint and codelyzer (fixes [#309](https://github.com/valor-software/ngx-bootstrap/issues/309)) ([b60ce40](https://github.com/valor-software/ngx-bootstrap/commit/b60ce4014a560ee9ab3e1d83ac0040228da96368))
* **typeahead:** prevent form submition when typeahead selected (fixes [#359](https://github.com/valor-software/ngx-bootstrap/issues/359)) ([4297410](https://github.com/valor-software/ngx-bootstrap/commit/4297410d23c6c966fd92fbad16ff070b4d68fc6b))


### Features

* **package:** updated to angular2 beta.14 ([243585b](https://github.com/valor-software/ngx-bootstrap/commit/243585b70f2dfea7793d8db9ab36149a051e3eb4))



## [1.0.10](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.9...v1.0.10) (2016-04-01)


### Features

* **package:** angular2 version updated to beta.13 ([91e4ad1](https://github.com/valor-software/ngx-bootstrap/commit/91e4ad1bbd1226d5d4aa3deb262e16a23d763d1d))



## [1.0.9](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.8...v1.0.9) (2016-03-31)


### Bug Fixes

* **collapse:** animate is not available for system.js ([867afb8](https://github.com/valor-software/ngx-bootstrap/commit/867afb84d34e3de767f78a000ff6cada47f48b1b))



## [1.0.8](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.7...v1.0.8) (2016-03-30)


### Bug Fixes

* use synchronous event emitters as a workaround for dehydrated detector issues (see https://github.com/angular/angular/issues/6786) ([9c9f290](https://github.com/valor-software/ngx-bootstrap/commit/9c9f290b029fc2105e475788f28b0d38e5b300e6))
* **build:** reduce typings pain ([686ef90](https://github.com/valor-software/ngx-bootstrap/commit/686ef903ddacbf492374bae14a4f05836d2609a4)), closes [#128](https://github.com/valor-software/ngx-bootstrap/issues/128) [#322](https://github.com/valor-software/ngx-bootstrap/issues/322)
* **carousel:** Fix Typescript 7030 error ([128db51](https://github.com/valor-software/ngx-bootstrap/commit/128db51e5729dd8cb8f6e4dc29af02f3f35800a2))
* **demo:** including es6-shim and es6-promise (fixes [#194](https://github.com/valor-software/ngx-bootstrap/issues/194)) ([80b73b4](https://github.com/valor-software/ngx-bootstrap/commit/80b73b45a0f71bb0bf3d0467f533ba9476c9c1fe))
* **dropdowns:** dropdown should close correctly when used in modals (fixes [#267](https://github.com/valor-software/ngx-bootstrap/issues/267), fixes [#221](https://github.com/valor-software/ngx-bootstrap/issues/221)) ([a7a02ff](https://github.com/valor-software/ngx-bootstrap/commit/a7a02ff1fe3dcdf9af21086ad95965d425d086b9))
* **ie9,10:** usage of [hidden] replaced with *ngIf (fixes [#238](https://github.com/valor-software/ngx-bootstrap/issues/238)) ([260e963](https://github.com/valor-software/ngx-bootstrap/commit/260e963187794e07253785f0478d911f175b0560))
* **tooltip:** fix tooltip after upgrade to angular2 2.0.0-beta.12 ([87a57f5](https://github.com/valor-software/ngx-bootstrap/commit/87a57f599a56a447602c5e73f60a7d2c65d18b83))
* **tooltip:** updated for beta.12 (fixes [#296](https://github.com/valor-software/ngx-bootstrap/issues/296), closes [#332](https://github.com/valor-software/ngx-bootstrap/issues/332)) ([413c2f1](https://github.com/valor-software/ngx-bootstrap/commit/413c2f1080f8f2c628fa31d2ae82da6110b343d3))
* **typeahead:** Fixed potential error if value of typeahead is undefined. Fixes [#345](https://github.com/valor-software/ngx-bootstrap/issues/345) ([aeb2bc1](https://github.com/valor-software/ngx-bootstrap/commit/aeb2bc171658ef705526d7f3af11588e330845b2))
* **typeahead:** Hide typeahead popup on blur. Fixes [#351](https://github.com/valor-software/ngx-bootstrap/issues/351) ([9c6f257](https://github.com/valor-software/ngx-bootstrap/commit/9c6f2573d4a84c1c4b5744d9d4c9838801f33f1f))


### Features

* **collapse:** added animation, toggle\hide\show methods made public (closes [#348](https://github.com/valor-software/ngx-bootstrap/issues/348), fixes [#287](https://github.com/valor-software/ngx-bootstrap/issues/287)) ([2625b29](https://github.com/valor-software/ngx-bootstrap/commit/2625b295b1cb0f7896b8ddafd843f65eb0f9d20a))
* **datepicker:** Added functionality to add a custom class to specific dates. Supports empty custom class. ([0f6389f](https://github.com/valor-software/ngx-bootstrap/commit/0f6389f1e5fba47d883452f9373a24ea1a868a5a))
* **package:** angular2 version updated to 2.0.0-beta.12 ([15c866f](https://github.com/valor-software/ngx-bootstrap/commit/15c866f94870479241df87928ee924557b73e849))



## [1.0.7](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.6...v1.0.7) (2016-03-16)


### Bug Fixes

* **demo:** fix demo layout ([227ef4e](https://github.com/valor-software/ngx-bootstrap/commit/227ef4e5bebef61509a83a54c8085131a74e8b08))
* **progress:** progress bar now works with ng2 ([f970433](https://github.com/valor-software/ngx-bootstrap/commit/f9704332b3f994f4d129893b7dcc9050e053d473))


### Features

* **pagination:** use inner html for pagination button text ([66cc008](https://github.com/valor-software/ngx-bootstrap/commit/66cc008a68648e72fed6acaccbfb7c551727f16b))



## [1.0.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.5...v1.0.6) (2016-03-09)


### Bug Fixes

* **datepicker-inner:** When changing view on datepicker, and going left and right, selected date ([97c8735](https://github.com/valor-software/ngx-bootstrap/commit/97c87353dc9562bd2e8004b2fb2d8cea8eef0b8f))
* **tooltip:** fix positioning of tooltip container ([5697574](https://github.com/valor-software/ngx-bootstrap/commit/569757426c039ac6e741c99261702e113f58800f))


### Features

* **datepicker:** Added an attribute onlyCurrentMonth which if true will not show dates from previous and next month (to make a full week of 7 days). So it will show dates only from currently displayed month. ([529af20](https://github.com/valor-software/ngx-bootstrap/commit/529af2043f0ee733f6fcc0399585ff02ec8c0b36))



## [1.0.5](https://github.com/valor-software/ngx-bootstrap/compare/1.0.4...v1.0.5) (2016-02-25)


### Bug Fixes

* **datepicker:** setting default value for SHOW_WEEKS ([aa09451](https://github.com/valor-software/ngx-bootstrap/commit/aa09451905e3946fd307fa9cb85041ec7a87f6bd))
* **daypicker:** glyphicon arrows, disable and colspan attributes ([e533ee9](https://github.com/valor-software/ngx-bootstrap/commit/e533ee9879052974264c56a0eb68f539b2a2a742))
* **daypicker:** text center align in bootstrap 4 ([dfd502f](https://github.com/valor-software/ngx-bootstrap/commit/dfd502f31bc29da55730f78260e8fc1e621974a3))
* **tabs:** destroy cycle, closes [#180](https://github.com/valor-software/ngx-bootstrap/issues/180) ([ae8c617](https://github.com/valor-software/ngx-bootstrap/commit/ae8c61796da6670a62e76bc4308668a6856d2639))



## [1.0.4](https://github.com/valor-software/ngx-bootstrap/compare/1.0.1-beta.2...1.0.4) (2016-02-24)


### Bug Fixes

* **build:** updated to use ts 1.8.2, fixes [#116](https://github.com/valor-software/ngx-bootstrap/issues/116) ([206770b](https://github.com/valor-software/ngx-bootstrap/commit/206770b175d27eec46a920d149dc65e766fbedfe))
* "outsideClick" still closed the dropdown on any click ([6348f72](https://github.com/valor-software/ngx-bootstrap/commit/6348f7226d4079fd792ce49fc7a88ebae0b0f0a8)), closes [#124](https://github.com/valor-software/ngx-bootstrap/issues/124)
* **build:** fix npm start command, fixes [#113](https://github.com/valor-software/ngx-bootstrap/issues/113) ([217fe3a](https://github.com/valor-software/ngx-bootstrap/commit/217fe3a94c6c45b00b7b1db7fcf5900cd1e2096a))
* **build:** rollback compression plugin version to 0.2, fixes [#103](https://github.com/valor-software/ngx-bootstrap/issues/103) ([3d59e2d](https://github.com/valor-software/ngx-bootstrap/commit/3d59e2df352482218e5a18d9e2b3045532f709d7))
* **datepicker:** setting default value for SHOW_WEEKS ([f0079ad](https://github.com/valor-software/ngx-bootstrap/commit/f0079ad33b124b496659e0fcffdfdf48b9ebbf9e))
* **datepicker:** upgrade to beta 1, issue [#38](https://github.com/valor-software/ngx-bootstrap/issues/38) ([b1a5507](https://github.com/valor-software/ngx-bootstrap/commit/b1a550702ba605c3ff8a1d343d6747113c79063f))
* **export:** all the correct directives are now properly exported ([b00a30b](https://github.com/valor-software/ngx-bootstrap/commit/b00a30b871d162dee954a4e2270e4a4558464de1))
* **pager:** multiple times defined event numPages, fixes [#111](https://github.com/valor-software/ngx-bootstrap/issues/111), closes [#112](https://github.com/valor-software/ngx-bootstrap/issues/112) ([780eebd](https://github.com/valor-software/ngx-bootstrap/commit/780eebd61e2669a605413e564a594c4a8edbb553))
* **pagination:** multiple triggering of pageChanged event, fix [#76](https://github.com/valor-software/ngx-bootstrap/issues/76), fix [#138](https://github.com/valor-software/ngx-bootstrap/issues/138), closes [#146](https://github.com/valor-software/ngx-bootstrap/issues/146) ([91c4ec4](https://github.com/valor-software/ngx-bootstrap/commit/91c4ec4185ada9e5b14513ffb90f05c5b05bc904))


### Features

* **build:** update to use ng2 beta7 & use ts typings, fixes [#212](https://github.com/valor-software/ngx-bootstrap/issues/212) ([31e6300](https://github.com/valor-software/ngx-bootstrap/commit/31e630013efbec9e55172ffe0b53a438b7a70d36))
* **dropdown:** implement "nonInput" auto-close mode ([94d9909](https://github.com/valor-software/ngx-bootstrap/commit/94d9909825f3901fe97d7c12e467394b44fc9def)), closes [/github.com/twbs/bootstrap/blob/a1bf344c4f041ad88acaf5b2b3777c733d3afe40/js/src/dropdown.js#L174-L176](https://github.com//github.com/twbs/bootstrap/blob/a1bf344c4f041ad88acaf5b2b3777c733d3afe40/js/src/dropdown.js/issues/L174-L176)
* allow two-way binding on `isOpen` ([674fcb7](https://github.com/valor-software/ngx-bootstrap/commit/674fcb7580ab5129ffc58dc8454c9e6f8f9e51d6))
* **datepicker:** datepicker fixed for 0-beta.2, closes [#120](https://github.com/valor-software/ngx-bootstrap/issues/120), fixes [#38](https://github.com/valor-software/ngx-bootstrap/issues/38) ([a3d9e1c](https://github.com/valor-software/ngx-bootstrap/commit/a3d9e1c769d61b3024501c175f09cb79a7b2a5f2))
* **tabs:** removable tabs ([c465610](https://github.com/valor-software/ngx-bootstrap/commit/c465610b0c9fa6389968df93d7793277bf491e0e))



## [1.0.1-beta.2](https://github.com/valor-software/ngx-bootstrap/compare/3eab1e428ebe3ce2ddf1013d48693bc38e23c150...1.0.1-beta.2) (2016-01-25)


### Bug Fixes

* **demo:** replace ng-non-bindable with ngNonBindable ([2ef870a](https://github.com/valor-software/ngx-bootstrap/commit/2ef870ae6924911f743a885d525126d46980bae9))
* **dropdown:** incorrect import from *.ts, fixes [#88](https://github.com/valor-software/ngx-bootstrap/issues/88) ([6eb42e1](https://github.com/valor-software/ngx-bootstrap/commit/6eb42e1060e382e6a76c92208d68f0a2d9fbdd0a))
* **pagination:** updating Pagination.totalPages ([df0c0f0](https://github.com/valor-software/ngx-bootstrap/commit/df0c0f0c24349791801ab6ea984ff6e4c669a3ba))


### Features

* **build:** works good with typescript@1.6 ([31c513b](https://github.com/valor-software/ngx-bootstrap/commit/31c513b4f4f084ae0eabe82b2d8bec028bb48572))
* **ng 2.0.37:** ts errors fixed ([1e19f55](https://github.com/valor-software/ngx-bootstrap/commit/1e19f555da161f1f572ed6747eb6d72796060ed8))
* **typeahead:** ts style fixes ([3eab1e4](https://github.com/valor-software/ngx-bootstrap/commit/3eab1e428ebe3ce2ddf1013d48693bc38e23c150))



