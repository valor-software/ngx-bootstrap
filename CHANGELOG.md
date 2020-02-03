<a name="5.5.0"></a>
# [5.5.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.4.0...v5.5.0) (2020-01-27)


### Bug Fixes

* **datepicker:** add check to prevent broken e2e ([#5598](https://github.com/valor-software/ngx-bootstrap/issues/5598)) ([fe4d636](https://github.com/valor-software/ngx-bootstrap/commit/fe4d636))
* **datepicker:** fix manual input accepts invalid date ([#5532](https://github.com/valor-software/ngx-bootstrap/issues/5532)) ([3078f07](https://github.com/valor-software/ngx-bootstrap/commit/3078f07)), closes [#4477](https://github.com/valor-software/ngx-bootstrap/issues/4477)
* **datepicker:** Maintain selected date when same date selected  ([#5209](https://github.com/valor-software/ngx-bootstrap/issues/5209)) ([#5496](https://github.com/valor-software/ngx-bootstrap/issues/5496)) ([b674b4b](https://github.com/valor-software/ngx-bootstrap/commit/b674b4b))
* **modal:** added import strategy for lazy modules ([#5085](https://github.com/valor-software/ngx-bootstrap/issues/5085)) ([4c92bd1](https://github.com/valor-software/ngx-bootstrap/commit/4c92bd1))
* **modal:** change the mouse event to dismiss a modal on backdrop click ([#5326](https://github.com/valor-software/ngx-bootstrap/issues/5326)) ([74f752f](https://github.com/valor-software/ngx-bootstrap/commit/74f752f)), closes [#5264](https://github.com/valor-software/ngx-bootstrap/issues/5264)
* **modal-service:** Fix modal service not dismissing during animation ([#4550](https://github.com/valor-software/ngx-bootstrap/issues/4550)) ([8969937](https://github.com/valor-software/ngx-bootstrap/commit/8969937)), closes [#3711](https://github.com/valor-software/ngx-bootstrap/issues/3711)
* **rating:** fix round up for decimal values ([#5076](https://github.com/valor-software/ngx-bootstrap/issues/5076)) ([#5608](https://github.com/valor-software/ngx-bootstrap/issues/5608)) ([bf0f78e](https://github.com/valor-software/ngx-bootstrap/commit/bf0f78e))
* **timepicker:** preserve date part when time crosses midnight ([#5535](https://github.com/valor-software/ngx-bootstrap/issues/5535)) ([5846bf2](https://github.com/valor-software/ngx-bootstrap/commit/5846bf2)), closes [#3139](https://github.com/valor-software/ngx-bootstrap/issues/3139)
* **tooltip:** fix aria attribute state ([#5614](https://github.com/valor-software/ngx-bootstrap/issues/5614)) ([009aeaa](https://github.com/valor-software/ngx-bootstrap/commit/009aeaa)), closes [#5089](https://github.com/valor-software/ngx-bootstrap/issues/5089)
* **typeahead:** fix broken typeahead property ([#5616](https://github.com/valor-software/ngx-bootstrap/issues/5616)) ([70ed44a](https://github.com/valor-software/ngx-bootstrap/commit/70ed44a))


### Features

* **datepicker:** Implement Thai Buddish calendar in Datepicker [#3893](https://github.com/valor-software/ngx-bootstrap/issues/3893) ([#5470](https://github.com/valor-software/ngx-bootstrap/issues/5470)) ([43d0da5](https://github.com/valor-software/ngx-bootstrap/commit/43d0da5))
* **discover:** add / update content on discover page ([#5592](https://github.com/valor-software/ngx-bootstrap/issues/5592)) ([716b586](https://github.com/valor-software/ngx-bootstrap/commit/716b586))
* **popover:** add delay option ([#5389](https://github.com/valor-software/ngx-bootstrap/issues/5389)) ([#5582](https://github.com/valor-software/ngx-bootstrap/issues/5582)) ([00037ef](https://github.com/valor-software/ngx-bootstrap/commit/00037ef))
* **rating:** add aria-label attribute ([#5607](https://github.com/valor-software/ngx-bootstrap/issues/5607)) ([5d505ea](https://github.com/valor-software/ngx-bootstrap/commit/5d505ea)), closes [#5579](https://github.com/valor-software/ngx-bootstrap/issues/5579)
* **tabs:** add aria attributes ([#5605](https://github.com/valor-software/ngx-bootstrap/issues/5605)) ([ef614c0](https://github.com/valor-software/ngx-bootstrap/commit/ef614c0)), closes [#4120](https://github.com/valor-software/ngx-bootstrap/issues/4120)
* **timepicker:** add aria-label to input ([#5604](https://github.com/valor-software/ngx-bootstrap/issues/5604)) ([bbb2817](https://github.com/valor-software/ngx-bootstrap/commit/bbb2817)), closes [#4149](https://github.com/valor-software/ngx-bootstrap/issues/4149)
* **typeahead:** incoming data are not filtered after typeahead kicks-in [#3725](https://github.com/valor-software/ngx-bootstrap/issues/3725) ([#3728](https://github.com/valor-software/ngx-bootstrap/issues/3728)) ([8378105](https://github.com/valor-software/ngx-bootstrap/commit/8378105))



<a name="5.4.0"></a>
# [5.4.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.3.2...v5.4.0) (2020-01-09)


### Bug Fixes

* **doc:** added punctuation, hyperlink and fixed typo. ([#5444](https://github.com/valor-software/ngx-bootstrap/issues/5444)) ([fbb4208](https://github.com/valor-software/ngx-bootstrap/commit/fbb4208))
* **doc:** update carousel.examples.basic.use-case.md ([#5462](https://github.com/valor-software/ngx-bootstrap/issues/5462)) ([c86d0f5](https://github.com/valor-software/ngx-bootstrap/commit/c86d0f5))
* **doc:** update pagination.examples.centering-active-page-link.md ([#5463](https://github.com/valor-software/ngx-bootstrap/issues/5463)) ([4669207](https://github.com/valor-software/ngx-bootstrap/commit/4669207))
* **tooltip:** tooltipChange unsubscribe on destroy ([#5431](https://github.com/valor-software/ngx-bootstrap/issues/5431)) ([6adf5f0](https://github.com/valor-software/ngx-bootstrap/commit/6adf5f0))
* **typeahead:** fix issue on scroll ([#5590](https://github.com/valor-software/ngx-bootstrap/issues/5590)) ([0dade71](https://github.com/valor-software/ngx-bootstrap/commit/0dade71))
* **typeahead:** fix performance issue ([#5589](https://github.com/valor-software/ngx-bootstrap/issues/5589)) ([e1d2f75](https://github.com/valor-software/ngx-bootstrap/commit/e1d2f75))


### Features

* **daterangepicker:** add ability to show prev and current month instead of current and next one ([#5513](https://github.com/valor-software/ngx-bootstrap/issues/5513)) ([cb6b29e](https://github.com/valor-software/ngx-bootstrap/commit/cb6b29e))



<a name="5.3.2"></a>
## [5.3.2](https://github.com/valor-software/ngx-bootstrap/compare/v5.3.1...v5.3.2) (2019-10-28)


### Bug Fixes

* **datepicker:** fix utc option issue ([#5534](https://github.com/valor-software/ngx-bootstrap/issues/5534)) ([04e6aad](https://github.com/valor-software/ngx-bootstrap/commit/04e6aad))


### Features

* **datepicker:** add Latvian locale (#hacktoberfest) ([#5432](https://github.com/valor-software/ngx-bootstrap/issues/5432)) ([9df0788](https://github.com/valor-software/ngx-bootstrap/commit/9df0788))



<a name="5.3.1"></a>
## [5.3.1](https://github.com/valor-software/ngx-bootstrap/compare/v5.3.0...v5.3.1) (2019-10-25)


### Bug Fixes

* **datepicker:** fix timezone regression && add useUtc option ([#5526](https://github.com/valor-software/ngx-bootstrap/issues/5526)) ([6742ce3](https://github.com/valor-software/ngx-bootstrap/commit/6742ce3))
* **datepicker:** skip years reordering if minMode='year' ([#5346](https://github.com/valor-software/ngx-bootstrap/issues/5346)) ([f0d8ab3](https://github.com/valor-software/ngx-bootstrap/commit/f0d8ab3))
* **doc:** fix aot.md ([#5459](https://github.com/valor-software/ngx-bootstrap/issues/5459)) ([2b0699f](https://github.com/valor-software/ngx-bootstrap/commit/2b0699f))
* **doc:** fix broken image link for 'Sauce Labs' ([#5483](https://github.com/valor-software/ngx-bootstrap/issues/5483)) ([97e5bbb](https://github.com/valor-software/ngx-bootstrap/commit/97e5bbb))
* **doc:** fix of file name mistake ([#5457](https://github.com/valor-software/ngx-bootstrap/issues/5457)) ([13bba2e](https://github.com/valor-software/ngx-bootstrap/commit/13bba2e)), closes [#5456](https://github.com/valor-software/ngx-bootstrap/issues/5456)
* **doc:** fix typo inside CONTRIBUTING.md ([#5486](https://github.com/valor-software/ngx-bootstrap/issues/5486)) ([d595023](https://github.com/valor-software/ngx-bootstrap/commit/d595023))
* **doc:** fix typo inside documentation component ([#5476](https://github.com/valor-software/ngx-bootstrap/issues/5476)) ([60ee719](https://github.com/valor-software/ngx-bootstrap/commit/60ee719))
* **progressbar:** fix e2e for progressbar ([#5494](https://github.com/valor-software/ngx-bootstrap/issues/5494)) ([0ed21d5](https://github.com/valor-software/ngx-bootstrap/commit/0ed21d5))
* **tests:** add fixes for datepicker e2e tests stability (manual_trigger && themes_spec) ([#5510](https://github.com/valor-software/ngx-bootstrap/issues/5510)) ([b82beba](https://github.com/valor-software/ngx-bootstrap/commit/b82beba))
* **tests:** fix e2e pagination ([#5528](https://github.com/valor-software/ngx-bootstrap/issues/5528)) ([849c813](https://github.com/valor-software/ngx-bootstrap/commit/849c813))
* **tests:** stabilize e2e tests ([#5512](https://github.com/valor-software/ngx-bootstrap/issues/5512)) ([68db502](https://github.com/valor-software/ngx-bootstrap/commit/68db502))
* **typeahead:** fix typeahead performance on typeaheadMinLength = 0 ([#5525](https://github.com/valor-software/ngx-bootstrap/issues/5525)) ([1035c0b](https://github.com/valor-software/ngx-bootstrap/commit/1035c0b))


### Features

* **common:** add discovery page ([#5332](https://github.com/valor-software/ngx-bootstrap/issues/5332)) ([1723e5b](https://github.com/valor-software/ngx-bootstrap/commit/1723e5b))
* **doc:** update demo(pagination) rotate button with dynamic behavior ([#5516](https://github.com/valor-software/ngx-bootstrap/issues/5516)) ([ed65226](https://github.com/valor-software/ngx-bootstrap/commit/ed65226)), closes [#5401](https://github.com/valor-software/ngx-bootstrap/issues/5401)
* **timepicker:** add custom placeholder ([#3544](https://github.com/valor-software/ngx-bootstrap/issues/3544)) ([#5429](https://github.com/valor-software/ngx-bootstrap/issues/5429)) ([05a215c](https://github.com/valor-software/ngx-bootstrap/commit/05a215c))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.2.0...v5.3.0) (2019-10-11)


### Bug Fixes

* **accordion, datepicker:** prevent accidental form submissions ([#5314](https://github.com/valor-software/ngx-bootstrap/issues/5314)) ([2ed2473](https://github.com/valor-software/ngx-bootstrap/commit/2ed2473))
* **datepicker:** need to update inline datepicker on input change ([#5436](https://github.com/valor-software/ngx-bootstrap/issues/5436)) ([534221d](https://github.com/valor-software/ngx-bootstrap/commit/534221d))
* **docs:** fix various typos ([#5467](https://github.com/valor-software/ngx-bootstrap/issues/5467)) ([2676683](https://github.com/valor-software/ngx-bootstrap/commit/2676683))
* **docs:** update join slack link ([#5421](https://github.com/valor-software/ngx-bootstrap/issues/5421)) ([b0a448b](https://github.com/valor-software/ngx-bootstrap/commit/b0a448b))
* **progressbar:** fix type class name binding override ([#5441](https://github.com/valor-software/ngx-bootstrap/issues/5441)) ([a544f44](https://github.com/valor-software/ngx-bootstrap/commit/a544f44))
* **timepicker:** fix placeholder full length ([#5392](https://github.com/valor-software/ngx-bootstrap/issues/5392)) ([bb5452b](https://github.com/valor-software/ngx-bootstrap/commit/bb5452b))
* **travis:** fix next stage ([#5419](https://github.com/valor-software/ngx-bootstrap/issues/5419)) ([6af8416](https://github.com/valor-software/ngx-bootstrap/commit/6af8416))


### Features

* **chronos:** add uk locale resolve [#5351](https://github.com/valor-software/ngx-bootstrap/issues/5351) ([#5396](https://github.com/valor-software/ngx-bootstrap/issues/5396)) ([f2187ea](https://github.com/valor-software/ngx-bootstrap/commit/f2187ea))
* **datepicker:** add invalidDate key to croatian locale ([#5393](https://github.com/valor-software/ngx-bootstrap/issues/5393)) ([b6c2036](https://github.com/valor-software/ngx-bootstrap/commit/b6c2036))
* **dropdown:** add animation to the component ([#5475](https://github.com/valor-software/ngx-bootstrap/issues/5475)) ([d70f08b](https://github.com/valor-software/ngx-bootstrap/commit/d70f08b))
* **progressbar:** create type interface ([#5440](https://github.com/valor-software/ngx-bootstrap/issues/5440)) ([6696623](https://github.com/valor-software/ngx-bootstrap/commit/6696623))



<a name="5.2.0"></a>
# [5.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.1.2...v5.2.0) (2019-09-13)


### Bug Fixes

* **datepicker:** fix issue with monthpicker for Feb ([#5371](https://github.com/valor-software/ngx-bootstrap/issues/5371)) ([#5376](https://github.com/valor-software/ngx-bootstrap/issues/5376)) ([91bda67](https://github.com/valor-software/ngx-bootstrap/commit/91bda67))
* **datepicker:** fix timezone issue ([#5364](https://github.com/valor-software/ngx-bootstrap/issues/5364)) ([137042c](https://github.com/valor-software/ngx-bootstrap/commit/137042c))
* **datepicker:** make datepicker view child static ([#5374](https://github.com/valor-software/ngx-bootstrap/issues/5374)) ([fe7e489](https://github.com/valor-software/ngx-bootstrap/commit/fe7e489)), closes [#5373](https://github.com/valor-software/ngx-bootstrap/issues/5373)
* **positioning:** resolve perfomance issue ([#5385](https://github.com/valor-software/ngx-bootstrap/issues/5385)) ([988f5cf](https://github.com/valor-software/ngx-bootstrap/commit/988f5cf))
* **tooltip:** multiple events for tooltips ([#5382](https://github.com/valor-software/ngx-bootstrap/issues/5382)) ([3286382](https://github.com/valor-software/ngx-bootstrap/commit/3286382))


### Features

* **datepicker:** add daterangepicker inline ([#5307](https://github.com/valor-software/ngx-bootstrap/issues/5307)) ([6cc64c0](https://github.com/valor-software/ngx-bootstrap/commit/6cc64c0))



<a name="5.1.2"></a>
## [5.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v5.1.1...v5.1.2) (2019-08-07)


### Bug Fixes

* **cypress:** fix page load time error ([#5353](https://github.com/valor-software/ngx-bootstrap/issues/5353)) ([b0a86eb](https://github.com/valor-software/ngx-bootstrap/commit/b0a86eb))
* **timepicker:** fix 12hour in 12/24 format ([#5248](https://github.com/valor-software/ngx-bootstrap/issues/5248)) ([b411130](https://github.com/valor-software/ngx-bootstrap/commit/b411130)), closes [#5125](https://github.com/valor-software/ngx-bootstrap/issues/5125)


### Features

* **build:** update to latest angular ([#5350](https://github.com/valor-software/ngx-bootstrap/issues/5350)) ([bc2e73b](https://github.com/valor-software/ngx-bootstrap/commit/bc2e73b))
* **build:** update to latest angular(8.1.2) ([#5337](https://github.com/valor-software/ngx-bootstrap/issues/5337)) ([c8a03c9](https://github.com/valor-software/ngx-bootstrap/commit/c8a03c9))
* **ci:** update cypress to latest ([#5355](https://github.com/valor-software/ngx-bootstrap/issues/5355)) ([b92e513](https://github.com/valor-software/ngx-bootstrap/commit/b92e513))



<a name="5.1.1"></a>
## [5.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v5.1.0...v5.1.1) (2019-07-10)


### Bug Fixes

* **collapse:** fix collapse animation (child height) ([#5316](https://github.com/valor-software/ngx-bootstrap/issues/5316)) ([f550605](https://github.com/valor-software/ngx-bootstrap/commit/f550605))
* **stackblitz:** add scss style for datepicker custom class demo example ([#5300](https://github.com/valor-software/ngx-bootstrap/issues/5300)) ([2d75dc5](https://github.com/valor-software/ngx-bootstrap/commit/2d75dc5))
* **tests:** add hard fix for cy test with animation ([#5318](https://github.com/valor-software/ngx-bootstrap/issues/5318)) ([8397f82](https://github.com/valor-software/ngx-bootstrap/commit/8397f82))


### Features

* **doc:** enable ivy ([#5285](https://github.com/valor-software/ngx-bootstrap/issues/5285)) ([c102ff0](https://github.com/valor-software/ngx-bootstrap/commit/c102ff0))



<a name="5.1.0"></a>
# [5.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v5.0.0...v5.1.0) (2019-06-24)


### Bug Fixes

* **accordion|tabs:** fix cursor style when disabled element ([#4664](https://github.com/valor-software/ngx-bootstrap/issues/4664)) ([42cc778](https://github.com/valor-software/ngx-bootstrap/commit/42cc778))
* **common:** fix cy logo link in getstarted page ([#5259](https://github.com/valor-software/ngx-bootstrap/issues/5259)) ([f2deb1b](https://github.com/valor-software/ngx-bootstrap/commit/f2deb1b))
* **tests:** fix for saucelab unit tests ([#5263](https://github.com/valor-software/ngx-bootstrap/issues/5263)) ([669d7e1](https://github.com/valor-software/ngx-bootstrap/commit/669d7e1))


### Features

* **carousel:** add an opportunity to use a keyboard for navigation ([#5270](https://github.com/valor-software/ngx-bootstrap/issues/5270)) ([f5ffefa](https://github.com/valor-software/ngx-bootstrap/commit/f5ffefa))
* **common:** add compatibility table ([#5260](https://github.com/valor-software/ngx-bootstrap/issues/5260)) ([b99f10c](https://github.com/valor-software/ngx-bootstrap/commit/b99f10c))
* **datepicker:** add ivy support (also fix ci) ([#5268](https://github.com/valor-software/ngx-bootstrap/issues/5268)) ([27639ea](https://github.com/valor-software/ngx-bootstrap/commit/27639ea))
* **doc:** include docs for DateRangepicker custom format ([#5199](https://github.com/valor-software/ngx-bootstrap/issues/5199)) ([b845340](https://github.com/valor-software/ngx-bootstrap/commit/b845340))
* **doc:** update changelog ([#5258](https://github.com/valor-software/ngx-bootstrap/issues/5258)) ([8078824](https://github.com/valor-software/ngx-bootstrap/commit/8078824))
* **tabs:** update of keyboard control ([#5284](https://github.com/valor-software/ngx-bootstrap/issues/5284)) ([161f419](https://github.com/valor-software/ngx-bootstrap/commit/161f419))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v4.3.0...v5.0.0) (2019-06-10)


### Bug Fixes

* carousel - solved multilist slides no auto play ([#5237](https://github.com/valor-software/ngx-bootstrap/issues/5237)) ([d4fd9ad](https://github.com/valor-software/ngx-bootstrap/commit/d4fd9ad)), closes [#5236](https://github.com/valor-software/ngx-bootstrap/issues/5236)
* **doc:** fix carousel doc ([#5250](https://github.com/valor-software/ngx-bootstrap/issues/5250)) ([f4aebbe](https://github.com/valor-software/ngx-bootstrap/commit/f4aebbe))
* **doc:** fix link to Cypress.io favicon in README ([#5241](https://github.com/valor-software/ngx-bootstrap/issues/5241)) ([47a6995](https://github.com/valor-software/ngx-bootstrap/commit/47a6995))
* **doc:** fix two typos ([#5244](https://github.com/valor-software/ngx-bootstrap/issues/5244)) ([8098924](https://github.com/valor-software/ngx-bootstrap/commit/8098924))
* **positioning:** fix a case of looping ([#5253](https://github.com/valor-software/ngx-bootstrap/issues/5253)) ([e693810](https://github.com/valor-software/ngx-bootstrap/commit/e693810))


### Features

* **build:** migrate to angular8 ([#5245](https://github.com/valor-software/ngx-bootstrap/issues/5245)) ([b0d7b31](https://github.com/valor-software/ngx-bootstrap/commit/b0d7b31))
* **carousel:** indicators for group of slides ([#5234](https://github.com/valor-software/ngx-bootstrap/issues/5234)) ([c460a6e](https://github.com/valor-software/ngx-bootstrap/commit/c460a6e)), closes [#5233](https://github.com/valor-software/ngx-bootstrap/issues/5233)
* **datepicker:** add animation ([#5173](https://github.com/valor-software/ngx-bootstrap/issues/5173)) ([d5bc6f8](https://github.com/valor-software/ngx-bootstrap/commit/d5bc6f8))
* **typeahead:** add animation ([#5240](https://github.com/valor-software/ngx-bootstrap/issues/5240)) ([8ce5e86](https://github.com/valor-software/ngx-bootstrap/commit/8ce5e86))



<a name="4.3.0"></a>
# [4.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v4.0.1...v4.3.0) (2019-05-21)


### Bug Fixes

* **build:** fix heroku ([c76d6d8](https://github.com/valor-software/ngx-bootstrap/commit/c76d6d8))
* **build:** fix heroku eror 503 ([4ebf2ad](https://github.com/valor-software/ngx-bootstrap/commit/4ebf2ad))
* **carousel:** fix multilist carousel order ([#5193](https://github.com/valor-software/ngx-bootstrap/issues/5193)) ([1f883cb](https://github.com/valor-software/ngx-bootstrap/commit/1f883cb))
* **ci:** fix build next ([#5177](https://github.com/valor-software/ngx-bootstrap/issues/5177)) ([ab0d252](https://github.com/valor-software/ngx-bootstrap/commit/ab0d252))
* **ci:** fix build on next ([#5169](https://github.com/valor-software/ngx-bootstrap/issues/5169)) ([f5be2db](https://github.com/valor-software/ngx-bootstrap/commit/f5be2db))
* **ci:** fix check prod build on next ([#5179](https://github.com/valor-software/ngx-bootstrap/issues/5179)) ([112ca44](https://github.com/valor-software/ngx-bootstrap/commit/112ca44))
* **ci:** fix deploy on surge ([#5171](https://github.com/valor-software/ngx-bootstrap/issues/5171)) ([88e23e5](https://github.com/valor-software/ngx-bootstrap/commit/88e23e5))
* **docs:** update angular.json config file ([#4512](https://github.com/valor-software/ngx-bootstrap/issues/4512)) ([85faa47](https://github.com/valor-software/ngx-bootstrap/commit/85faa47))
* **dropdown:** fix view destroyed error ([#5205](https://github.com/valor-software/ngx-bootstrap/issues/5205)) ([8cf98c2](https://github.com/valor-software/ngx-bootstrap/commit/8cf98c2))
* **positioning:** fix errors on invalid position ([#5212](https://github.com/valor-software/ngx-bootstrap/issues/5212)) ([e790196](https://github.com/valor-software/ngx-bootstrap/commit/e790196))
* **stackblitz:** add carousel correct links, datepicker locales, remove link from accessibility ([#5176](https://github.com/valor-software/ngx-bootstrap/issues/5176)) ([caff954](https://github.com/valor-software/ngx-bootstrap/commit/caff954))
* **tests:** add fix for select week test ([#5218](https://github.com/valor-software/ngx-bootstrap/issues/5218)) ([984ca74](https://github.com/valor-software/ngx-bootstrap/commit/984ca74))
* **tests:** add fixes for timepicker tests stability ([#5157](https://github.com/valor-software/ngx-bootstrap/issues/5157)) ([7563505](https://github.com/valor-software/ngx-bootstrap/commit/7563505))
* **tests:** enhancements to group and key params for cypress ([#5161](https://github.com/valor-software/ngx-bootstrap/issues/5161)) ([0006146](https://github.com/valor-software/ngx-bootstrap/commit/0006146))
* **tests:** fix cypress datepicker tests in development ([#5142](https://github.com/valor-software/ngx-bootstrap/issues/5142)) ([fa25dd5](https://github.com/valor-software/ngx-bootstrap/commit/fa25dd5))
* **tests:** modal e2e tests fix, cypress update ([#5145](https://github.com/valor-software/ngx-bootstrap/issues/5145)) ([b66b1bb](https://github.com/valor-software/ngx-bootstrap/commit/b66b1bb))
* **tests:** remove 3d cypress thread, unnecessary ([#5139](https://github.com/valor-software/ngx-bootstrap/issues/5139)) ([45cde70](https://github.com/valor-software/ngx-bootstrap/commit/45cde70))
* **tests:** remove deprecated Init event (closes [#5005](https://github.com/valor-software/ngx-bootstrap/issues/5005)) ([#5182](https://github.com/valor-software/ngx-bootstrap/issues/5182)) ([3f87b84](https://github.com/valor-software/ngx-bootstrap/commit/3f87b84))
* **tests:** stabilize spinners timepicker test ([#5160](https://github.com/valor-software/ngx-bootstrap/issues/5160)) ([d03c66d](https://github.com/valor-software/ngx-bootstrap/commit/d03c66d))


### Features

* **build:** express to nestjs in ssr ([#5152](https://github.com/valor-software/ngx-bootstrap/issues/5152)) ([2b7a2fd](https://github.com/valor-software/ngx-bootstrap/commit/2b7a2fd))
* **build:** update nestjs-universal config ([#5156](https://github.com/valor-software/ngx-bootstrap/issues/5156)) ([47b7537](https://github.com/valor-software/ngx-bootstrap/commit/47b7537))
* **carousel:** allow to display multiple items per one slide ([#5133](https://github.com/valor-software/ngx-bootstrap/issues/5133)) ([c9f4ec9](https://github.com/valor-software/ngx-bootstrap/commit/c9f4ec9))
* **common:** add animation for collapse and accordion components ([#5146](https://github.com/valor-software/ngx-bootstrap/issues/5146)) ([191e5b4](https://github.com/valor-software/ngx-bootstrap/commit/191e5b4))
* **common:** container attribute implementation ([#5174](https://github.com/valor-software/ngx-bootstrap/issues/5174)) ([b061629](https://github.com/valor-software/ngx-bootstrap/commit/b061629))
* **datepicker:** add Vietnam (vi) locale to date picker ([#5221](https://github.com/valor-software/ngx-bootstrap/issues/5221)) ([4c1f2bf](https://github.com/valor-software/ngx-bootstrap/commit/4c1f2bf))
* **datepicker:** change Thai 'weekdaysShort' format for look better in datepicker ([#4674](https://github.com/valor-software/ngx-bootstrap/issues/4674)) ([77ccc37](https://github.com/valor-software/ngx-bootstrap/commit/77ccc37))
* **demo:** add stackblitz examples via SDK ([#4098](https://github.com/valor-software/ngx-bootstrap/issues/4098)) ([ecdc140](https://github.com/valor-software/ngx-bootstrap/commit/ecdc140))
* **doc:** add animation module to doc and with ng add, also stackblitz ([#5207](https://github.com/valor-software/ngx-bootstrap/issues/5207)) ([bd9c72e](https://github.com/valor-software/ngx-bootstrap/commit/bd9c72e))
* **popover:** add adaptivePosition option ([#5183](https://github.com/valor-software/ngx-bootstrap/issues/5183)) ([c7f9e8c](https://github.com/valor-software/ngx-bootstrap/commit/c7f9e8c))
* **tooltip:** add adaptivePosition option ([#5204](https://github.com/valor-software/ngx-bootstrap/issues/5204)) ([8333e23](https://github.com/valor-software/ngx-bootstrap/commit/8333e23))


### Performance Improvements

* **dropdown:** reduce the number of document click listeners ([#4605](https://github.com/valor-software/ngx-bootstrap/issues/4605)) ([4d49218](https://github.com/valor-software/ngx-bootstrap/commit/4d49218))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v3.3.0...v4.0.1) (2019-03-29)


### Bug Fixes

* **build:** fix fail on target=es6 ([#5123](https://github.com/valor-software/ngx-bootstrap/issues/5123)) ([5a3afe3](https://github.com/valor-software/ngx-bootstrap/commit/5a3afe3))
* **build:** fix window not defined on An Universal ([#5073](https://github.com/valor-software/ngx-bootstrap/issues/5073)) ([682d1f2](https://github.com/valor-software/ngx-bootstrap/commit/682d1f2))
* **common:** fix peer dependencies ([#5131](https://github.com/valor-software/ngx-bootstrap/issues/5131)) ([343b60e](https://github.com/valor-software/ngx-bootstrap/commit/343b60e))
* **modal:** fix anchor for esc closing option demo ([#5081](https://github.com/valor-software/ngx-bootstrap/issues/5081)) ([8a4e381](https://github.com/valor-software/ngx-bootstrap/commit/8a4e381))
* **positioning:** fix frozen page ([#5119](https://github.com/valor-software/ngx-bootstrap/issues/5119)) ([67bb329](https://github.com/valor-software/ngx-bootstrap/commit/67bb329))
* **tabs:** fix an invoke of select event outside of tabs ([#3755](https://github.com/valor-software/ngx-bootstrap/issues/3755)) ([#5002](https://github.com/valor-software/ngx-bootstrap/issues/5002)) ([de2300c](https://github.com/valor-software/ngx-bootstrap/commit/de2300c))
* **tarvis:** fix Travis on release ([#5122](https://github.com/valor-software/ngx-bootstrap/issues/5122)) ([f9a1094](https://github.com/valor-software/ngx-bootstrap/commit/f9a1094))
* **tests:** fix cy all command ([#5108](https://github.com/valor-software/ngx-bootstrap/issues/5108)) ([ea66fa4](https://github.com/valor-software/ngx-bootstrap/commit/ea66fa4))
* **tests:** fix sauce tests ([#5057](https://github.com/valor-software/ngx-bootstrap/issues/5057)) ([0bc4a69](https://github.com/valor-software/ngx-bootstrap/commit/0bc4a69))
* **tests:** remove applitools logs ([#5124](https://github.com/valor-software/ngx-bootstrap/issues/5124)) ([c2d1c39](https://github.com/valor-software/ngx-bootstrap/commit/c2d1c39))
* **tests:** select week datepicker fix ([#5109](https://github.com/valor-software/ngx-bootstrap/issues/5109)) ([f20c531](https://github.com/valor-software/ngx-bootstrap/commit/f20c531))
* **timepicker:** min-max demo fix, closes([#5053](https://github.com/valor-software/ngx-bootstrap/issues/5053)) ([8a4456b](https://github.com/valor-software/ngx-bootstrap/commit/8a4456b))
* **travis:** fix travis 'ngx-bootstrap-ci unpublish' ([#5116](https://github.com/valor-software/ngx-bootstrap/issues/5116)) ([85b5d87](https://github.com/valor-software/ngx-bootstrap/commit/85b5d87))
* **travis:** fix travis next stage and unpublish ngx-bootstrap-ci ([#5115](https://github.com/valor-software/ngx-bootstrap/issues/5115)) ([42c8904](https://github.com/valor-software/ngx-bootstrap/commit/42c8904))
* **travis:** fix travis on dev branch ([#5111](https://github.com/valor-software/ngx-bootstrap/issues/5111)) ([111ad96](https://github.com/valor-software/ngx-bootstrap/commit/111ad96))


### Features

* **positioning:** update variation behavior and add adaptive option ([#5065](https://github.com/valor-software/ngx-bootstrap/issues/5065)) ([c9adab6](https://github.com/valor-software/ngx-bootstrap/commit/c9adab6))



<a name="3.3.0"></a>
# [3.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.2.0...v3.3.0) (2019-02-12)


### Bug Fixes

* **build:** use os specific path separator in npm run build.watch ([#4958](https://github.com/valor-software/ngx-bootstrap/issues/4958)) ([5e4183e](https://github.com/valor-software/ngx-bootstrap/commit/5e4183e))
* **package:** decrease ts version in latest ng ([#5044](https://github.com/valor-software/ngx-bootstrap/issues/5044)) ([0e77f25](https://github.com/valor-software/ngx-bootstrap/commit/0e77f25))
* **positioning:** fix on heroku also typeahead ([#5054](https://github.com/valor-software/ngx-bootstrap/issues/5054)) ([8d8836d](https://github.com/valor-software/ngx-bootstrap/commit/8d8836d))
* **tabs:** adding tab content to DOM just if selected tab ([#1422](https://github.com/valor-software/ngx-bootstrap/issues/1422)) ([#4991](https://github.com/valor-software/ngx-bootstrap/issues/4991)) ([457c32a](https://github.com/valor-software/ngx-bootstrap/commit/457c32a))
* **tests:** datepicker min-max demo - fix for weeks ([#5052](https://github.com/valor-software/ngx-bootstrap/issues/5052)) ([a2aaa80](https://github.com/valor-software/ngx-bootstrap/commit/a2aaa80))
* **tests:** js heap out of memory, datepicker fixes ([#5048](https://github.com/valor-software/ngx-bootstrap/issues/5048)) ([235050e](https://github.com/valor-software/ngx-bootstrap/commit/235050e))
* **tests:** rework tests accotding to new position service ([#5055](https://github.com/valor-software/ngx-bootstrap/issues/5055)) ([8a94917](https://github.com/valor-software/ngx-bootstrap/commit/8a94917))


### Features

* **datepicker:** Allow to disable specific dates ([#5046](https://github.com/valor-software/ngx-bootstrap/issues/5046)) ([5633d2d](https://github.com/valor-software/ngx-bootstrap/commit/5633d2d))
* **positioning:** refactor positioning service ([#5027](https://github.com/valor-software/ngx-bootstrap/issues/5027)) ([66ae92d](https://github.com/valor-software/ngx-bootstrap/commit/66ae92d)), closes [#3303](https://github.com/valor-software/ngx-bootstrap/issues/3303) [#2993](https://github.com/valor-software/ngx-bootstrap/issues/2993) [#4470](https://github.com/valor-software/ngx-bootstrap/issues/4470)
* **tests:** add full e2e coverage for DatePicker component ([#4951](https://github.com/valor-software/ngx-bootstrap/issues/4951)) ([fe2b29f](https://github.com/valor-software/ngx-bootstrap/commit/fe2b29f))
* **tests:** added cypress tests parallelization ([#5003](https://github.com/valor-software/ngx-bootstrap/issues/5003)) ([e3396bb](https://github.com/valor-software/ngx-bootstrap/commit/e3396bb))
* **typeahead:** add Input Property for selected First item in option list ([#4631](https://github.com/valor-software/ngx-bootstrap/issues/4631)) ([cd13a55](https://github.com/valor-software/ngx-bootstrap/commit/cd13a55)), closes [#3965](https://github.com/valor-software/ngx-bootstrap/issues/3965)



<a name="3.2.0"></a>
# [3.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.4...v3.2.0) (2019-01-21)


### Bug Fixes

* **common:** prevent deprecated also fixed test (datepicker close on esc) for IE11 (souce tests) ([#4940](https://github.com/valor-software/ngx-bootstrap/issues/4940)) ([d338dbf](https://github.com/valor-software/ngx-bootstrap/commit/d338dbf))
* **script:** fix latest script ([#5004](https://github.com/valor-software/ngx-bootstrap/issues/5004)) ([5f6a781](https://github.com/valor-software/ngx-bootstrap/commit/5f6a781))
* **tests:** use prev safari version while latest doesnt work on sauce ([#5011](https://github.com/valor-software/ngx-bootstrap/issues/5011)) ([89f7265](https://github.com/valor-software/ngx-bootstrap/commit/89f7265))
* **timepicker:** enable_disable timepicker in reactive forms ([#4563](https://github.com/valor-software/ngx-bootstrap/issues/4563)) ([ac55b08](https://github.com/valor-software/ngx-bootstrap/commit/ac55b08)), closes [#4055](https://github.com/valor-software/ngx-bootstrap/issues/4055)


### Features

* **css:** update bootstrap css to latest ([#4999](https://github.com/valor-software/ngx-bootstrap/issues/4999)) ([91b78e7](https://github.com/valor-software/ngx-bootstrap/commit/91b78e7))
* **datepicker:** add catalan lang ([#4969](https://github.com/valor-software/ngx-bootstrap/issues/4969)) ([20fadbd](https://github.com/valor-software/ngx-bootstrap/commit/20fadbd)), closes [#4959](https://github.com/valor-software/ngx-bootstrap/issues/4959)
* **datepicker:** Add directive for inline datepicker ([#3956](https://github.com/valor-software/ngx-bootstrap/issues/3956)) ([d9a89b4](https://github.com/valor-software/ngx-bootstrap/commit/d9a89b4)), closes [valor-software/ngx-bootstrap#3955](https://github.com/valor-software/ngx-bootstrap/issues/3955) [valor-software/ngx-bootstrap#3958](https://github.com/valor-software/ngx-bootstrap/issues/3958)
* **tooltip:** add delay to config ([#4928](https://github.com/valor-software/ngx-bootstrap/issues/4928)) ([bcf93d4](https://github.com/valor-software/ngx-bootstrap/commit/bcf93d4)), closes [#4029](https://github.com/valor-software/ngx-bootstrap/issues/4029)



<a name="3.1.4"></a>
## [3.1.4](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.3...v3.1.4) (2018-12-27)


### Bug Fixes

* **core:** remove important properties for styles ([#4939](https://github.com/valor-software/ngx-bootstrap/issues/4939)) ([46d1d23](https://github.com/valor-software/ngx-bootstrap/commit/46d1d23))
* **datepicker:** remove min-max logic from formats demo ([#4967](https://github.com/valor-software/ngx-bootstrap/issues/4967)) ([ac7b7a3](https://github.com/valor-software/ngx-bootstrap/commit/ac7b7a3))
* **demo:** The typeaheadAsync property was missing, which I found to be necessary for the dropdown/functionality to be used. ([#4662](https://github.com/valor-software/ngx-bootstrap/issues/4662)) ([9fe4acc](https://github.com/valor-software/ngx-bootstrap/commit/9fe4acc))
* **dropdown:** fix bottom position for dropdownlist ([#4626](https://github.com/valor-software/ngx-bootstrap/issues/4626)) ([6e04b33](https://github.com/valor-software/ngx-bootstrap/commit/6e04b33)), closes [#4545](https://github.com/valor-software/ngx-bootstrap/issues/4545)
* **popover/tooltip:** use translate for relative offset positioning for tooltip and popover arrows ([#4850](https://github.com/valor-software/ngx-bootstrap/issues/4850)) ([92efe9a](https://github.com/valor-software/ngx-bootstrap/commit/92efe9a)), closes [#4849](https://github.com/valor-software/ngx-bootstrap/issues/4849)
* **timepicker:** demo enhancement to custom meridian example ([#4769](https://github.com/valor-software/ngx-bootstrap/issues/4769)) ([8c3cb31](https://github.com/valor-software/ngx-bootstrap/commit/8c3cb31))
* **tooltip:** tooltipEnable inconsistent value ([#4911](https://github.com/valor-software/ngx-bootstrap/issues/4911)) ([acb9dc3](https://github.com/valor-software/ngx-bootstrap/commit/acb9dc3))
* **typeahead:** fix typeahead's breaking if typeahead property receives NULL ([#4957](https://github.com/valor-software/ngx-bootstrap/issues/4957)) ([3f536bf](https://github.com/valor-software/ngx-bootstrap/commit/3f536bf)), closes [#4417](https://github.com/valor-software/ngx-bootstrap/issues/4417)


### Features

* **datepicker:** add custom class via bsConfig, add demo also ([#4062](https://github.com/valor-software/ngx-bootstrap/issues/4062)) ([d2a5c25](https://github.com/valor-software/ngx-bootstrap/commit/d2a5c25))
* **datepicker:** esc can close datepicker ([#3966](https://github.com/valor-software/ngx-bootstrap/issues/3966)) ([3ee6eac](https://github.com/valor-software/ngx-bootstrap/commit/3ee6eac)), closes [#3890](https://github.com/valor-software/ngx-bootstrap/issues/3890)
* **demo:** update landing page  ([#4981](https://github.com/valor-software/ngx-bootstrap/issues/4981)) ([ab87b3d](https://github.com/valor-software/ngx-bootstrap/commit/ab87b3d))
* **demo:** update landing page ([#4972](https://github.com/valor-software/ngx-bootstrap/issues/4972)) ([a6f27ab](https://github.com/valor-software/ngx-bootstrap/commit/a6f27ab)), closes [#4970](https://github.com/valor-software/ngx-bootstrap/issues/4970)
* **doc:** reverse of docs list ([#4912](https://github.com/valor-software/ngx-bootstrap/issues/4912)) ([f17459f](https://github.com/valor-software/ngx-bootstrap/commit/f17459f))
* **tests:** add full e2e coverage for Progressbar component ([#4924](https://github.com/valor-software/ngx-bootstrap/issues/4924)) ([3386261](https://github.com/valor-software/ngx-bootstrap/commit/3386261))
* **tests:** add support for cypress dashboard for debugging ([#4908](https://github.com/valor-software/ngx-bootstrap/issues/4908)) ([055220e](https://github.com/valor-software/ngx-bootstrap/commit/055220e))
* **tests:** cypress update ([#4919](https://github.com/valor-software/ngx-bootstrap/issues/4919)) ([c545860](https://github.com/valor-software/ngx-bootstrap/commit/c545860))
* **typeahead:** optionally do not hide the results on blur ([#4783](https://github.com/valor-software/ngx-bootstrap/issues/4783)) ([b6e3b62](https://github.com/valor-software/ngx-bootstrap/commit/b6e3b62)), closes [#2059](https://github.com/valor-software/ngx-bootstrap/issues/2059)



<a name="3.1.3"></a>
## [3.1.3](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.2...v3.1.3) (2018-12-07)


### Bug Fixes

* **ci:** update dep on npm-run-all to fix link to event-stream 3.3.6 ([#4882](https://github.com/valor-software/ngx-bootstrap/issues/4882)) ([0de72f9](https://github.com/valor-software/ngx-bootstrap/commit/0de72f9))
* **components-spec:** fix paths in spec.ts files ([#4859](https://github.com/valor-software/ngx-bootstrap/issues/4859)) ([1662554](https://github.com/valor-software/ngx-bootstrap/commit/1662554))
* **datepicker:** cursor fixes for weeks &  disabled dates in datepicker ([#4905](https://github.com/valor-software/ngx-bootstrap/issues/4905)) ([5c0efdd](https://github.com/valor-software/ngx-bootstrap/commit/5c0efdd))
* **datepicker:** fix datepickers cypress test ([#4771](https://github.com/valor-software/ngx-bootstrap/issues/4771)) ([9671c7e](https://github.com/valor-software/ngx-bootstrap/commit/9671c7e))
* **datepicker:** fix responsive on Date Range Picker ([#4127](https://github.com/valor-software/ngx-bootstrap/issues/4127)) ([#4891](https://github.com/valor-software/ngx-bootstrap/issues/4891)) ([53b88c0](https://github.com/valor-software/ngx-bootstrap/commit/53b88c0))
* **datepicker:** select correct month and year from month picker view… ([#4501](https://github.com/valor-software/ngx-bootstrap/issues/4501)) ([3a17cc3](https://github.com/valor-software/ngx-bootstrap/commit/3a17cc3))
* **dropdown:** fix dropdown inside click ([#4609](https://github.com/valor-software/ngx-bootstrap/issues/4609)) ([75f7105](https://github.com/valor-software/ngx-bootstrap/commit/75f7105)), closes [#1933](https://github.com/valor-software/ngx-bootstrap/issues/1933)
* **schematics:** fix component option ([#4892](https://github.com/valor-software/ngx-bootstrap/issues/4892)) ([6cc0ce6](https://github.com/valor-software/ngx-bootstrap/commit/6cc0ce6))
* **tests:** datepicker smoke test for reactive form ([#4895](https://github.com/valor-software/ngx-bootstrap/issues/4895)) ([55862b8](https://github.com/valor-software/ngx-bootstrap/commit/55862b8))
* **tests:** fix for clickOnBtn method name ([#4873](https://github.com/valor-software/ngx-bootstrap/issues/4873)) ([8b1ebf1](https://github.com/valor-software/ngx-bootstrap/commit/8b1ebf1))
* **tests:** remove check for ng-reflect-model, reconfigure travis for test run ([#4885](https://github.com/valor-software/ngx-bootstrap/issues/4885)) ([b2bd459](https://github.com/valor-software/ngx-bootstrap/commit/b2bd459))
* **travis:** update deployed instance for correct testing ([#4896](https://github.com/valor-software/ngx-bootstrap/issues/4896)) ([48d1b3d](https://github.com/valor-software/ngx-bootstrap/commit/48d1b3d))


### Features

* **ci:** speed up travis builds ([#4883](https://github.com/valor-software/ngx-bootstrap/issues/4883)) ([c0b1870](https://github.com/valor-software/ngx-bootstrap/commit/c0b1870))
* **common:** add strict mode support ([#4869](https://github.com/valor-software/ngx-bootstrap/issues/4869)) ([58d4517](https://github.com/valor-software/ngx-bootstrap/commit/58d4517)), closes [#4848](https://github.com/valor-software/ngx-bootstrap/issues/4848)
* **datepicker:** add min mode ([#4874](https://github.com/valor-software/ngx-bootstrap/issues/4874)) ([1183875](https://github.com/valor-software/ngx-bootstrap/commit/1183875)), closes [#3354](https://github.com/valor-software/ngx-bootstrap/issues/3354) [#2627](https://github.com/valor-software/ngx-bootstrap/issues/2627)
* **datepicker:** allow to select dates from other months ([#4828](https://github.com/valor-software/ngx-bootstrap/issues/4828)) ([b17926b](https://github.com/valor-software/ngx-bootstrap/commit/b17926b)), closes [#4485](https://github.com/valor-software/ngx-bootstrap/issues/4485) [#3746](https://github.com/valor-software/ngx-bootstrap/issues/3746)
* **datepicker:** Making it possible to disable certain days in the DatePicker ([#4491](https://github.com/valor-software/ngx-bootstrap/issues/4491)) ([4cc77f8](https://github.com/valor-software/ngx-bootstrap/commit/4cc77f8))
* **demo:** opportunity to change bs theme by url query ([#4870](https://github.com/valor-software/ngx-bootstrap/issues/4870)) ([0e806e1](https://github.com/valor-software/ngx-bootstrap/commit/0e806e1))
* **dropdown:** add insideClick property to config ([#4898](https://github.com/valor-software/ngx-bootstrap/issues/4898)) ([d6e3534](https://github.com/valor-software/ngx-bootstrap/commit/d6e3534))
* **modal:** add method to change modal window class ([#4811](https://github.com/valor-software/ngx-bootstrap/issues/4811)) ([2fcdd7f](https://github.com/valor-software/ngx-bootstrap/commit/2fcdd7f)), closes [#2824](https://github.com/valor-software/ngx-bootstrap/issues/2824)
* **tests:** add 2 test scopes and examples ([#4838](https://github.com/valor-software/ngx-bootstrap/issues/4838)) ([52fc9e8](https://github.com/valor-software/ngx-bootstrap/commit/52fc9e8))
* **tests:** add full coverage for Collapse component demo ([#4847](https://github.com/valor-software/ngx-bootstrap/issues/4847)) ([bb65d16](https://github.com/valor-software/ngx-bootstrap/commit/bb65d16))
* **tests:** add full coverage for Pagination component demo ([#4867](https://github.com/valor-software/ngx-bootstrap/issues/4867)) ([30d2734](https://github.com/valor-software/ngx-bootstrap/commit/30d2734))
* **tests:** add possibility to run e2e tests for different bs versions ([#4886](https://github.com/valor-software/ngx-bootstrap/issues/4886)) ([86436ca](https://github.com/valor-software/ngx-bootstrap/commit/86436ca))



<a name="3.1.2"></a>
## [3.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.1...v3.1.2) (2018-11-20)


### Bug Fixes

* **build:** add workaround for buildOptimizer issue ([#4799](https://github.com/valor-software/ngx-bootstrap/issues/4799)) ([50507e4](https://github.com/valor-software/ngx-bootstrap/commit/50507e4))
* **build:** back scss of datepicker ([#4759](https://github.com/valor-software/ngx-bootstrap/issues/4759)) ([a003011](https://github.com/valor-software/ngx-bootstrap/commit/a003011))
* **test:** run tests and change structure of spec file ([#4663](https://github.com/valor-software/ngx-bootstrap/issues/4663)) ([d5a22a4](https://github.com/valor-software/ngx-bootstrap/commit/d5a22a4))
* **tests:** cleanup test code ([#4778](https://github.com/valor-software/ngx-bootstrap/issues/4778)) ([9f2ec92](https://github.com/valor-software/ngx-bootstrap/commit/9f2ec92))
* **tests:** travis and karma conf update for sauce ([#4785](https://github.com/valor-software/ngx-bootstrap/issues/4785)) ([ee9472c](https://github.com/valor-software/ngx-bootstrap/commit/ee9472c))
* **travis:** fix heroku stage ([#4820](https://github.com/valor-software/ngx-bootstrap/issues/4820)) ([fd4a38f](https://github.com/valor-software/ngx-bootstrap/commit/fd4a38f))
* **travis:** fix tslint stage ([#4813](https://github.com/valor-software/ngx-bootstrap/issues/4813)) ([805c52c](https://github.com/valor-software/ngx-bootstrap/commit/805c52c))
* **tslint:** fix tslint errors ([#4770](https://github.com/valor-software/ngx-bootstrap/issues/4770)) ([d01c533](https://github.com/valor-software/ngx-bootstrap/commit/d01c533))


### Features

* **build:** disable inline source map ([#4790](https://github.com/valor-software/ngx-bootstrap/issues/4790)) ([5ebf88c](https://github.com/valor-software/ngx-bootstrap/commit/5ebf88c))
* **datepicker:** add Norwegian locale ([#4634](https://github.com/valor-software/ngx-bootstrap/issues/4634)) ([2cc2561](https://github.com/valor-software/ngx-bootstrap/commit/2cc2561))
* **datepicker:** added Lithuanian locale support for datepicker ([#4787](https://github.com/valor-software/ngx-bootstrap/issues/4787)) ([87e3751](https://github.com/valor-software/ngx-bootstrap/commit/87e3751))
* **docs:** add summary for use-cases ([#4782](https://github.com/valor-software/ngx-bootstrap/issues/4782)) ([2748ff1](https://github.com/valor-software/ngx-bootstrap/commit/2748ff1))
* **docs:** add use-cases for datepicker component ([#4700](https://github.com/valor-software/ngx-bootstrap/issues/4700)) ([e1a9bd5](https://github.com/valor-software/ngx-bootstrap/commit/e1a9bd5))
* **docs:** add use-cases for dropdowns component ([#4733](https://github.com/valor-software/ngx-bootstrap/issues/4733)) ([1342b24](https://github.com/valor-software/ngx-bootstrap/commit/1342b24))
* **docs:** add use-cases for popover component ([#4740](https://github.com/valor-software/ngx-bootstrap/issues/4740)) ([d625db0](https://github.com/valor-software/ngx-bootstrap/commit/d625db0))
* **docs:** add use-cases for progressbar component ([#4744](https://github.com/valor-software/ngx-bootstrap/issues/4744)) ([4b34056](https://github.com/valor-software/ngx-bootstrap/commit/4b34056))
* **docs:** add use-cases for rating component ([#4745](https://github.com/valor-software/ngx-bootstrap/issues/4745)) ([a74d815](https://github.com/valor-software/ngx-bootstrap/commit/a74d815))
* **docs:** add use-cases for sortable component ([#4749](https://github.com/valor-software/ngx-bootstrap/issues/4749)) ([f297795](https://github.com/valor-software/ngx-bootstrap/commit/f297795))
* **docs:** add use-cases for tabs component ([#4753](https://github.com/valor-software/ngx-bootstrap/issues/4753)) ([0c9c707](https://github.com/valor-software/ngx-bootstrap/commit/0c9c707))
* **docs:** add use-cases for timepicker component ([#4763](https://github.com/valor-software/ngx-bootstrap/issues/4763)) ([2bdd883](https://github.com/valor-software/ngx-bootstrap/commit/2bdd883))
* **docs:** added use-cases for pagination component ([#4684](https://github.com/valor-software/ngx-bootstrap/issues/4684)) ([f67c76e](https://github.com/valor-software/ngx-bootstrap/commit/f67c76e))
* **docs:** typeahead-use-cases ([#4696](https://github.com/valor-software/ngx-bootstrap/issues/4696)) ([1d2ff35](https://github.com/valor-software/ngx-bootstrap/commit/1d2ff35))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v3.1.0...v3.1.1) (2018-10-26)


### Bug Fixes

* **latest:** config ([#4716](https://github.com/valor-software/ngx-bootstrap/issues/4716)) ([89e967f](https://github.com/valor-software/ngx-bootstrap/commit/89e967f))
* **tests:** rework offset parameter for correct count day diffs ([#4727](https://github.com/valor-software/ngx-bootstrap/issues/4727)) ([eb907a9](https://github.com/valor-software/ngx-bootstrap/commit/eb907a9))


### Features

* **docs:** update docs according to ng add feature ([#4703](https://github.com/valor-software/ngx-bootstrap/issues/4703)) ([b51c21f](https://github.com/valor-software/ngx-bootstrap/commit/b51c21f))
* **schematics:** add specific commands for each component ([#4715](https://github.com/valor-software/ngx-bootstrap/issues/4715)) ([26cc974](https://github.com/valor-software/ngx-bootstrap/commit/26cc974))
* **scripts:** api-doc add compatibility typescript 3 ([#4732](https://github.com/valor-software/ngx-bootstrap/issues/4732)) ([d5de6dd](https://github.com/valor-software/ngx-bootstrap/commit/d5de6dd))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.0.1...v3.1.0) (2018-10-19)


### Bug Fixes

* **build:** build with ng-packagr ([#4617](https://github.com/valor-software/ngx-bootstrap/issues/4617)) ([90765c9](https://github.com/valor-software/ngx-bootstrap/commit/90765c9))
* **datepicker:** Fix navigation alignment with preserveWhitespaces: false ([#4509](https://github.com/valor-software/ngx-bootstrap/issues/4509)) ([9980218](https://github.com/valor-software/ngx-bootstrap/commit/9980218)), closes [#4443](https://github.com/valor-software/ngx-bootstrap/issues/4443)
* **Demo:** typeahead, wrong filtering ([#4559](https://github.com/valor-software/ngx-bootstrap/issues/4559)) ([29d9656](https://github.com/valor-software/ngx-bootstrap/commit/29d9656)), closes [#4557](https://github.com/valor-software/ngx-bootstrap/issues/4557)
* **positioning:** browser rounding width/height bug ([#4328](https://github.com/valor-software/ngx-bootstrap/issues/4328)) ([4201a30](https://github.com/valor-software/ngx-bootstrap/commit/4201a30)), closes [#4322](https://github.com/valor-software/ngx-bootstrap/issues/4322)
* **progressbar:** toggle striped and animate states ([#4581](https://github.com/valor-software/ngx-bootstrap/issues/4581)) ([436a2e8](https://github.com/valor-software/ngx-bootstrap/commit/436a2e8)), closes [#3864](https://github.com/valor-software/ngx-bootstrap/issues/3864)
* **rating:** rating titles change format part way through ([#4620](https://github.com/valor-software/ngx-bootstrap/issues/4620)) ([e3c4f2e](https://github.com/valor-software/ngx-bootstrap/commit/e3c4f2e)), closes [#1751](https://github.com/valor-software/ngx-bootstrap/issues/1751)
* **styles:** fix right sidebar on IE and Edge ([#4658](https://github.com/valor-software/ngx-bootstrap/issues/4658)) ([63af3e1](https://github.com/valor-software/ngx-bootstrap/commit/63af3e1))
* **timepicker:** changed description for arrow keys ([#4672](https://github.com/valor-software/ngx-bootstrap/issues/4672)) ([4a58fe3](https://github.com/valor-software/ngx-bootstrap/commit/4a58fe3))
* **tooltip:** fix containerClass when isOpen is true ([#4579](https://github.com/valor-software/ngx-bootstrap/issues/4579)) ([e225d8d](https://github.com/valor-software/ngx-bootstrap/commit/e225d8d)), closes [#4247](https://github.com/valor-software/ngx-bootstrap/issues/4247)
* **tooltip:** flickering when hover the mouse ([#4660](https://github.com/valor-software/ngx-bootstrap/issues/4660)) ([3f00320](https://github.com/valor-software/ngx-bootstrap/commit/3f00320))
* **typeahead:** dont throw error if latinize is off and no value for input ([#4480](https://github.com/valor-software/ngx-bootstrap/issues/4480)) ([fa6f174](https://github.com/valor-software/ngx-bootstrap/commit/fa6f174)), closes [#4465](https://github.com/valor-software/ngx-bootstrap/issues/4465)


### Features

* **collapse:** add demo with inline display ([#4630](https://github.com/valor-software/ngx-bootstrap/issues/4630)) ([0ec4c70](https://github.com/valor-software/ngx-bootstrap/commit/0ec4c70)), closes [#2473](https://github.com/valor-software/ngx-bootstrap/issues/2473)
* **datapicker:** Capitalize pt-br's locale month names ([#4455](https://github.com/valor-software/ngx-bootstrap/issues/4455)) ([86dd8e8](https://github.com/valor-software/ngx-bootstrap/commit/86dd8e8))
* **datepicker:** Slovak locale added to chronos ([#4391](https://github.com/valor-software/ngx-bootstrap/issues/4391)) ([e8d777c](https://github.com/valor-software/ngx-bootstrap/commit/e8d777c))
* **doc:** added docs for modals component ([#4679](https://github.com/valor-software/ngx-bootstrap/issues/4679)) ([6e32261](https://github.com/valor-software/ngx-bootstrap/commit/6e32261))
* **docs:** add use-cases for accordion component ([#4677](https://github.com/valor-software/ngx-bootstrap/issues/4677)) ([4d3e342](https://github.com/valor-software/ngx-bootstrap/commit/4d3e342))
* **docs:** add use-cases for alerts ([#4680](https://github.com/valor-software/ngx-bootstrap/issues/4680)) ([7c7c515](https://github.com/valor-software/ngx-bootstrap/commit/7c7c515))
* **docs:** add use-cases for buttons component ([#4686](https://github.com/valor-software/ngx-bootstrap/issues/4686)) ([07aced2](https://github.com/valor-software/ngx-bootstrap/commit/07aced2))
* **docs:** add use-cases for carousel component ([#4689](https://github.com/valor-software/ngx-bootstrap/issues/4689)) ([2eeab60](https://github.com/valor-software/ngx-bootstrap/commit/2eeab60))
* **docs:** add use-cases for collapse component ([#4695](https://github.com/valor-software/ngx-bootstrap/issues/4695)) ([5f535c6](https://github.com/valor-software/ngx-bootstrap/commit/5f535c6))
* **schematics:** adding schematic for ng-add ([#4678](https://github.com/valor-software/ngx-bootstrap/issues/4678)) ([67b88f5](https://github.com/valor-software/ngx-bootstrap/commit/67b88f5))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v3.0.0...v3.0.1) (2018-06-19)


### Bug Fixes

* remove peer dependency on [@angular](https://github.com/angular)/forms ([#4420](https://github.com/valor-software/ngx-bootstrap/issues/4420)) ([550af9c](https://github.com/valor-software/ngx-bootstrap/commit/550af9c)), closes [#4411](https://github.com/valor-software/ngx-bootstrap/issues/4411)



<a name="3.0.0"></a>
# [3.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v3.0.0-RC.1...v3.0.0) (2018-05-17)


### Bug Fixes

* **main:** fix whitespaces globally for aot ([#4326](https://github.com/valor-software/ngx-bootstrap/issues/4326)) ([0478637](https://github.com/valor-software/ngx-bootstrap/commit/0478637))


### Features

* **accordion:** add key navigation to accordion ([#4192](https://github.com/valor-software/ngx-bootstrap/issues/4192)) ([69b35b3](https://github.com/valor-software/ngx-bootstrap/commit/69b35b3))



<a name="3.0.0-RC.1"></a>
# [3.0.0-RC.1](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.5...v3.0.0-RC.1) (2018-05-15)


### Bug Fixes

* **chronos:** isUTC tests fixes ([b7bd4b5](https://github.com/valor-software/ngx-bootstrap/commit/b7bd4b5))
* **demo:** fix api refenrences for pager component ([#4323](https://github.com/valor-software/ngx-bootstrap/issues/4323)) ([3249452](https://github.com/valor-software/ngx-bootstrap/commit/3249452))
* **main:** preserve whitespaces globally ([#4324](https://github.com/valor-software/ngx-bootstrap/issues/4324)) ([fee535a](https://github.com/valor-software/ngx-bootstrap/commit/fee535a))
* **rxjs/operators:** use rxjs pipeable operators pattern, remove import path(not used) ([#4169](https://github.com/valor-software/ngx-bootstrap/issues/4169)) ([f7c5423](https://github.com/valor-software/ngx-bootstrap/commit/f7c5423))
* **typeahead:** change function name from hightlight to highlight ([#4091](https://github.com/valor-software/ngx-bootstrap/issues/4091)) ([97171ff](https://github.com/valor-software/ngx-bootstrap/commit/97171ff)), closes [#3518](https://github.com/valor-software/ngx-bootstrap/issues/3518)


### Features

* **angular:** upgraded angular and rxjs to v6 ([e36f7d9](https://github.com/valor-software/ngx-bootstrap/commit/e36f7d9))



<a name="2.0.5"></a>
## [2.0.5](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.4...v2.0.5) (2018-05-07)


### Bug Fixes

* **chronos:** ro locale updated to momenjs etalon ([2634e8f](https://github.com/valor-software/ngx-bootstrap/commit/2634e8f))
* **chronos:** updated fi locale tests ([ae01bb0](https://github.com/valor-software/ngx-bootstrap/commit/ae01bb0))
* **demo:** fix api references for pagination component ([#4303](https://github.com/valor-software/ngx-bootstrap/issues/4303)) ([edc7b95](https://github.com/valor-software/ngx-bootstrap/commit/edc7b95))


### Features

* **buttons:** add aria-attributes ([#4082](https://github.com/valor-software/ngx-bootstrap/issues/4082)) ([49ee88e](https://github.com/valor-software/ngx-bootstrap/commit/49ee88e)), closes [#4068](https://github.com/valor-software/ngx-bootstrap/issues/4068)
* **datepicker:** add Romanian locale to date picker ([#4205](https://github.com/valor-software/ngx-bootstrap/issues/4205)) ([6a95b76](https://github.com/valor-software/ngx-bootstrap/commit/6a95b76))
* **datepicker:** Added Slovenian locale support for datepicker ([#4035](https://github.com/valor-software/ngx-bootstrap/issues/4035)) ([6e2e60f](https://github.com/valor-software/ngx-bootstrap/commit/6e2e60f))
* **locale:** Galician locale ([#4246](https://github.com/valor-software/ngx-bootstrap/issues/4246)) ([08e3f56](https://github.com/valor-software/ngx-bootstrap/commit/08e3f56))
* **locale:** Mongolian locale ([#4161](https://github.com/valor-software/ngx-bootstrap/issues/4161)) ([91ffd36](https://github.com/valor-software/ngx-bootstrap/commit/91ffd36))
* **sortable:** add aria attributes ([#4163](https://github.com/valor-software/ngx-bootstrap/issues/4163)) ([00a331a](https://github.com/valor-software/ngx-bootstrap/commit/00a331a)), closes [#4152](https://github.com/valor-software/ngx-bootstrap/issues/4152)
* **timepicker:** hide arrows with [hidden] attribute ([#4197](https://github.com/valor-software/ngx-bootstrap/issues/4197)) ([190e2db](https://github.com/valor-software/ngx-bootstrap/commit/190e2db))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.3...v2.0.4) (2018-04-16)


### Bug Fixes

* **build:** lock [@types](https://github.com/types)/tapable ([#3985](https://github.com/valor-software/ngx-bootstrap/issues/3985)) ([407ecd0](https://github.com/valor-software/ngx-bootstrap/commit/407ecd0))
* **demo:** fix left sidebar is not fully visible on small screens ([#3780](https://github.com/valor-software/ngx-bootstrap/issues/3780)) ([7e30c6f](https://github.com/valor-software/ngx-bootstrap/commit/7e30c6f)), closes [#3383](https://github.com/valor-software/ngx-bootstrap/issues/3383)
* **demo:** fix links at getting started page. Update travis config - allow failed units ([#4218](https://github.com/valor-software/ngx-bootstrap/issues/4218)) ([ae07b41](https://github.com/valor-software/ngx-bootstrap/commit/ae07b41))
* **demo:** remove repetition id in demos ([#3937](https://github.com/valor-software/ngx-bootstrap/issues/3937)) ([c4c2877](https://github.com/valor-software/ngx-bootstrap/commit/c4c2877)), closes [#3936](https://github.com/valor-software/ngx-bootstrap/issues/3936)
* **demo-sidebar:** remove list duplicate from sidebar ([#4201](https://github.com/valor-software/ngx-bootstrap/issues/4201)) ([605efd1](https://github.com/valor-software/ngx-bootstrap/commit/605efd1))
* **modal:** close only one directive modal with one esc pressing ([#4223](https://github.com/valor-software/ngx-bootstrap/issues/4223)) ([83af591](https://github.com/valor-software/ngx-bootstrap/commit/83af591))
* **modals:** fix minimize Safari after press esc ([#3605](https://github.com/valor-software/ngx-bootstrap/issues/3605)) ([9c8cef4](https://github.com/valor-software/ngx-bootstrap/commit/9c8cef4)), closes [#3313](https://github.com/valor-software/ngx-bootstrap/issues/3313)
* **tests:** change run cypress tests for faster local run. Refactor test for making them readable ([#3742](https://github.com/valor-software/ngx-bootstrap/issues/3742)) ([c7b91fa](https://github.com/valor-software/ngx-bootstrap/commit/c7b91fa))
* **tooltip:** The content(button) extends beyond the tooltip's field in Dynamic Html demo section ([#4102](https://github.com/valor-software/ngx-bootstrap/issues/4102)) ([a123c2c](https://github.com/valor-software/ngx-bootstrap/commit/a123c2c))
* **tooltip-popover:** fix arrow position for bs4 ([#3784](https://github.com/valor-software/ngx-bootstrap/issues/3784)) ([0b1d8e7](https://github.com/valor-software/ngx-bootstrap/commit/0b1d8e7))


### Features

* **accordion:** add key navigation to accordion ([#3993](https://github.com/valor-software/ngx-bootstrap/issues/3993)) ([8bb2fdf](https://github.com/valor-software/ngx-bootstrap/commit/8bb2fdf))
* **accordion:** revert changes for accordion key nav support ([#4093](https://github.com/valor-software/ngx-bootstrap/issues/4093)) ([8a46e6e](https://github.com/valor-software/ngx-bootstrap/commit/8a46e6e))
* **build:** use npm ci, it's faster then yarn ([#4059](https://github.com/valor-software/ngx-bootstrap/issues/4059)) ([838eee7](https://github.com/valor-software/ngx-bootstrap/commit/838eee7))
* **carousel:** add aria-attributes ([#4131](https://github.com/valor-software/ngx-bootstrap/issues/4131)) ([a21d3e0](https://github.com/valor-software/ngx-bootstrap/commit/a21d3e0)), closes [#4130](https://github.com/valor-software/ngx-bootstrap/issues/4130)
* **datepicker:** add aria-attributes ([#4141](https://github.com/valor-software/ngx-bootstrap/issues/4141)) ([20c6b87](https://github.com/valor-software/ngx-bootstrap/commit/20c6b87)), closes [#4132](https://github.com/valor-software/ngx-bootstrap/issues/4132)
* **demo:** add alt attribute in images ([#3932](https://github.com/valor-software/ngx-bootstrap/issues/3932)) ([122a0e5](https://github.com/valor-software/ngx-bootstrap/commit/122a0e5))
* **locale:** Finnish locale ([#3991](https://github.com/valor-software/ngx-bootstrap/issues/3991)) ([a333700](https://github.com/valor-software/ngx-bootstrap/commit/a333700))
* **modals:** dont call hide() func on esc if modal is not shown ([#4221](https://github.com/valor-software/ngx-bootstrap/issues/4221)) ([9254837](https://github.com/valor-software/ngx-bootstrap/commit/9254837))
* **old-datepicker:** adding id for tag ([#3695](https://github.com/valor-software/ngx-bootstrap/issues/3695)) ([be14f34](https://github.com/valor-software/ngx-bootstrap/commit/be14f34))
* **timepicker:** add validation for timepicker ([#3588](https://github.com/valor-software/ngx-bootstrap/issues/3588)) ([d8ee1f8](https://github.com/valor-software/ngx-bootstrap/commit/d8ee1f8)), closes [#3549](https://github.com/valor-software/ngx-bootstrap/issues/3549) [#3288](https://github.com/valor-software/ngx-bootstrap/issues/3288)



<a name="2.0.3"></a>
## [2.0.3](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.2...v2.0.3) (2018-03-12)


### Bug Fixes

* **alerts:** after dismissing alert are not removing from DOM [#3608](https://github.com/valor-software/ngx-bootstrap/issues/3608) ([#3622](https://github.com/valor-software/ngx-bootstrap/issues/3622)) ([479778a](https://github.com/valor-software/ngx-bootstrap/commit/479778a))
* **build:** fix failed npm run build ([#3867](https://github.com/valor-software/ngx-bootstrap/issues/3867)) ([f5d8bcc](https://github.com/valor-software/ngx-bootstrap/commit/f5d8bcc)), closes [#3866](https://github.com/valor-software/ngx-bootstrap/issues/3866)
* **build:** lock awesome typescript loader ([#3945](https://github.com/valor-software/ngx-bootstrap/issues/3945)) ([28e9a15](https://github.com/valor-software/ngx-bootstrap/commit/28e9a15))
* **datepicker:** added comma to index file ([#3912](https://github.com/valor-software/ngx-bootstrap/issues/3912)) ([b94bc15](https://github.com/valor-software/ngx-bootstrap/commit/b94bc15))
* **datepicker:** fix width in daterangerpicker at locates example ([#3543](https://github.com/valor-software/ngx-bootstrap/issues/3543)) ([72c7cb3](https://github.com/valor-software/ngx-bootstrap/commit/72c7cb3))
* **datepicker:** remove position fixed ([#3610](https://github.com/valor-software/ngx-bootstrap/issues/3610)) ([bca0b42](https://github.com/valor-software/ngx-bootstrap/commit/bca0b42)), closes [#3300](https://github.com/valor-software/ngx-bootstrap/issues/3300)
* **demo:** add null check in preventEmptyHrefNav method ([#3948](https://github.com/valor-software/ngx-bootstrap/issues/3948)) ([1a9c17d](https://github.com/valor-software/ngx-bootstrap/commit/1a9c17d))
* **demo:** added wrapper to progressbar ([#3752](https://github.com/valor-software/ngx-bootstrap/issues/3752)) ([78a5e06](https://github.com/valor-software/ngx-bootstrap/commit/78a5e06))
* **demo:** fix add-nav scroll to selected sections ([#3593](https://github.com/valor-software/ngx-bootstrap/issues/3593)) ([8182d92](https://github.com/valor-software/ngx-bootstrap/commit/8182d92))
* **demo:** fix datepicker imports ([#3910](https://github.com/valor-software/ngx-bootstrap/issues/3910)) ([e748105](https://github.com/valor-software/ngx-bootstrap/commit/e748105))
* **demo:** fix demo header static position for safari browser ([#3600](https://github.com/valor-software/ngx-bootstrap/issues/3600)) ([2f0e7f8](https://github.com/valor-software/ngx-bootstrap/commit/2f0e7f8)), closes [#3312](https://github.com/valor-software/ngx-bootstrap/issues/3312)
* **demo:** Fixed routings issue for links with inner html tags ([#3816](https://github.com/valor-software/ngx-bootstrap/issues/3816)) ([5869afb](https://github.com/valor-software/ngx-bootstrap/commit/5869afb)), closes [#3813](https://github.com/valor-software/ngx-bootstrap/issues/3813)
* **demo:** rename Timepicker demo to Basic ([#3733](https://github.com/valor-software/ngx-bootstrap/issues/3733)) ([1eb7990](https://github.com/valor-software/ngx-bootstrap/commit/1eb7990))
* **dropdown:** fix dropup bs3 position ([#3863](https://github.com/valor-software/ngx-bootstrap/issues/3863)) ([2a177aa](https://github.com/valor-software/ngx-bootstrap/commit/2a177aa))
* **pagination:** fix PageChangeEvent export ([#3880](https://github.com/valor-software/ngx-bootstrap/issues/3880)) ([083ad0c](https://github.com/valor-software/ngx-bootstrap/commit/083ad0c))
* **progressbar:** fix stacked progressbar for bs4 ([#3582](https://github.com/valor-software/ngx-bootstrap/issues/3582)) ([50defdd](https://github.com/valor-software/ngx-bootstrap/commit/50defdd))
* **tabs:** add custom template in demo ([#3558](https://github.com/valor-software/ngx-bootstrap/issues/3558)) ([de90609](https://github.com/valor-software/ngx-bootstrap/commit/de90609)), closes [#3548](https://github.com/valor-software/ngx-bootstrap/issues/3548)
* **tabs:** decompose manual selection section ([#3547](https://github.com/valor-software/ngx-bootstrap/issues/3547)) ([6c9afd9](https://github.com/valor-software/ngx-bootstrap/commit/6c9afd9)), closes [#3545](https://github.com/valor-software/ngx-bootstrap/issues/3545)
* **test:** update [@types](https://github.com/types)/webpack ([#3970](https://github.com/valor-software/ngx-bootstrap/issues/3970)) ([bcbe405](https://github.com/valor-software/ngx-bootstrap/commit/bcbe405))
* **tests:** fix test after hard resolving conflicts ([#3946](https://github.com/valor-software/ngx-bootstrap/issues/3946)) ([5955ca7](https://github.com/valor-software/ngx-bootstrap/commit/5955ca7))
* **tests:** remove unstable part of e2e ([#3716](https://github.com/valor-software/ngx-bootstrap/issues/3716)) ([465ed0d](https://github.com/valor-software/ngx-bootstrap/commit/465ed0d))
* **tests:** updating link to ng-team for cypress ([#3674](https://github.com/valor-software/ngx-bootstrap/issues/3674)) ([6ebc6a6](https://github.com/valor-software/ngx-bootstrap/commit/6ebc6a6))
* **timepicker:** remove unnecessary space when showMeridian is false ([#3907](https://github.com/valor-software/ngx-bootstrap/issues/3907)) ([e7b96cd](https://github.com/valor-software/ngx-bootstrap/commit/e7b96cd))


### Features

* **accordion:** add to "Api Reference" section accordion component ([#3644](https://github.com/valor-software/ngx-bootstrap/issues/3644)) ([1c1f592](https://github.com/valor-software/ngx-bootstrap/commit/1c1f592)), closes [#3643](https://github.com/valor-software/ngx-bootstrap/issues/3643)
* **chronos:** add indonesia locale ([#3532](https://github.com/valor-software/ngx-bootstrap/issues/3532)) ([8ba8b18](https://github.com/valor-software/ngx-bootstrap/commit/8ba8b18))
* **tests:** add cypress e2e tests instead of protractor e2e and e2e-bdd tests ([#3515](https://github.com/valor-software/ngx-bootstrap/issues/3515)) ([4ff55ce](https://github.com/valor-software/ngx-bootstrap/commit/4ff55ce))
* **timepicker:** Add ability to set readonly/disabled state [#3602](https://github.com/valor-software/ngx-bootstrap/issues/3602) ([#3611](https://github.com/valor-software/ngx-bootstrap/issues/3611)) ([4e5f828](https://github.com/valor-software/ngx-bootstrap/commit/4e5f828)), closes [#3549](https://github.com/valor-software/ngx-bootstrap/issues/3549) [#3288](https://github.com/valor-software/ngx-bootstrap/issues/3288) [#3371](https://github.com/valor-software/ngx-bootstrap/issues/3371)
* **typeahead:** Allow typeahead to cancel ongoing requests ([#3865](https://github.com/valor-software/ngx-bootstrap/issues/3865)) ([67e073f](https://github.com/valor-software/ngx-bootstrap/commit/67e073f)), closes [#1626](https://github.com/valor-software/ngx-bootstrap/issues/1626) [#1626](https://github.com/valor-software/ngx-bootstrap/issues/1626)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.1...v2.0.2) (2018-01-24)


### Bug Fixes

* **datepicker:** date parsing when using a custom date format ([#3522](https://github.com/valor-software/ngx-bootstrap/issues/3522)) ([5c2aa9e](https://github.com/valor-software/ngx-bootstrap/commit/5c2aa9e))


### Features

* **chronos:** add danish locale configuration ([#3514](https://github.com/valor-software/ngx-bootstrap/issues/3514)) ([8fe43e2](https://github.com/valor-software/ngx-bootstrap/commit/8fe43e2))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0...v2.0.1) (2018-01-20)


### Bug Fixes

* **datepicker:** bs date range picker config added to correct provider ([446cdf9](https://github.com/valor-software/ngx-bootstrap/commit/446cdf9))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-rc.1...v2.0.0) (2018-01-19)


### Bug Fixes

* **progressbar:** fix bs4, animation, add striped option, remove bs4 demos ([#3500](https://github.com/valor-software/ngx-bootstrap/issues/3500)) ([27cb1a2](https://github.com/valor-software/ngx-bootstrap/commit/27cb1a2))


### Features

* **datepicker:** added date and range min, max and invalid validation ([#3499](https://github.com/valor-software/ngx-bootstrap/issues/3499)) ([7b43295](https://github.com/valor-software/ngx-bootstrap/commit/7b43295)), closes [#2727](https://github.com/valor-software/ngx-bootstrap/issues/2727) [#3498](https://github.com/valor-software/ngx-bootstrap/issues/3498)
* **datepicker:** added date range picker config ([#3501](https://github.com/valor-software/ngx-bootstrap/issues/3501)) ([7c53bf9](https://github.com/valor-software/ngx-bootstrap/commit/7c53bf9))



<a name="2.0.0-rc.1"></a>
# [2.0.0-rc.1](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2018-01-19)


### Bug Fixes

* **buttons:** fix radio btns for reactive forms, add radio reactive demo ([#3384](https://github.com/valor-software/ngx-bootstrap/issues/3384)) ([b2b8bdc](https://github.com/valor-software/ngx-bootstrap/commit/b2b8bdc)), closes [#2581](https://github.com/valor-software/ngx-bootstrap/issues/2581)
* **carousel:** toggle carousel-indicators via property  ([#3319](https://github.com/valor-software/ngx-bootstrap/issues/3319)) ([4164937](https://github.com/valor-software/ngx-bootstrap/commit/4164937)), closes [#1021](https://github.com/valor-software/ngx-bootstrap/issues/1021)
* **ci:** fix heroku, deploy only demo/dist ([#3441](https://github.com/valor-software/ngx-bootstrap/issues/3441)) ([321f9ae](https://github.com/valor-software/ngx-bootstrap/commit/321f9ae))
* **datepicker:** fix errors on fullTemplateTypeCheck rule ([#3462](https://github.com/valor-software/ngx-bootstrap/issues/3462)) ([446587e](https://github.com/valor-software/ngx-bootstrap/commit/446587e)), closes [#3455](https://github.com/valor-software/ngx-bootstrap/issues/3455)
* **demo:** fix favicon image ([#3381](https://github.com/valor-software/ngx-bootstrap/issues/3381)) ([005701d](https://github.com/valor-software/ngx-bootstrap/commit/005701d))
* **demo:** fix for timepicker demo layout ([#3442](https://github.com/valor-software/ngx-bootstrap/issues/3442)) ([4905ab2](https://github.com/valor-software/ngx-bootstrap/commit/4905ab2))
* **demo:** fix logo for getting-started page ([#3448](https://github.com/valor-software/ngx-bootstrap/issues/3448)) ([3de13fb](https://github.com/valor-software/ngx-bootstrap/commit/3de13fb))
* **demo:** fix progressbar demo page autoscroll top ([#3449](https://github.com/valor-software/ngx-bootstrap/issues/3449)) ([5edd41c](https://github.com/valor-software/ngx-bootstrap/commit/5edd41c))
* **demo:** fix sidenav last item on small height screen ([#3419](https://github.com/valor-software/ngx-bootstrap/issues/3419)) ([3667c06](https://github.com/valor-software/ngx-bootstrap/commit/3667c06)), closes [#3295](https://github.com/valor-software/ngx-bootstrap/issues/3295)
* **dropdown:** fix dropup position with container body (bs3) ([#3343](https://github.com/valor-software/ngx-bootstrap/issues/3343)) ([402015d](https://github.com/valor-software/ngx-bootstrap/commit/402015d))
* **modal:** fix circular dependency warning ([#3359](https://github.com/valor-software/ngx-bootstrap/issues/3359)) ([59c0bf9](https://github.com/valor-software/ngx-bootstrap/commit/59c0bf9))
* **modal:** focus modal container on init ([#3357](https://github.com/valor-software/ngx-bootstrap/issues/3357)) ([dd33e63](https://github.com/valor-software/ngx-bootstrap/commit/dd33e63))
* **modal:** reset scrollbar pixel ([#3491](https://github.com/valor-software/ngx-bootstrap/issues/3491)) ([1cd6f94](https://github.com/valor-software/ngx-bootstrap/commit/1cd6f94)), closes [#3490](https://github.com/valor-software/ngx-bootstrap/issues/3490)
* **popover & tooltip:** fix arrow position ([#3405](https://github.com/valor-software/ngx-bootstrap/issues/3405)) ([15ae2f0](https://github.com/valor-software/ngx-bootstrap/commit/15ae2f0))
* **tests:** fixing e2e type errors ([#3358](https://github.com/valor-software/ngx-bootstrap/issues/3358)) ([5136fd6](https://github.com/valor-software/ngx-bootstrap/commit/5136fd6))
* **tooltip:** fix delay ([#3463](https://github.com/valor-software/ngx-bootstrap/issues/3463)) ([a1a54df](https://github.com/valor-software/ngx-bootstrap/commit/a1a54df)), closes [#3038](https://github.com/valor-software/ngx-bootstrap/issues/3038)
* **typeahead:** apply existing text on focus and click with typeaheadMinLength = 0 ([#3322](https://github.com/valor-software/ngx-bootstrap/issues/3322)) ([21813b1](https://github.com/valor-software/ngx-bootstrap/commit/21813b1))
* **typeahead:** fix autoselect on tab key with typeaheadMinLength=0 ([#3378](https://github.com/valor-software/ngx-bootstrap/issues/3378)) ([eaed118](https://github.com/valor-software/ngx-bootstrap/commit/eaed118))
* **typeahead:** fix flickering ([#3321](https://github.com/valor-software/ngx-bootstrap/issues/3321)) ([cf1411a](https://github.com/valor-software/ngx-bootstrap/commit/cf1411a))


### Features

* **build:** change import for barrel file's, update seed doc ([#2990](https://github.com/valor-software/ngx-bootstrap/issues/2990)) ([7346a5a](https://github.com/valor-software/ngx-bootstrap/commit/7346a5a))
* **chronos:** added th locale spec ([#3450](https://github.com/valor-software/ngx-bootstrap/issues/3450)) ([bd6b119](https://github.com/valor-software/ngx-bootstrap/commit/bd6b119))
* **chronos:** bs-moment renamed to chronos and all locales was suffixed with Locale ([#3456](https://github.com/valor-software/ngx-bootstrap/issues/3456)) ([dfd489b](https://github.com/valor-software/ngx-bootstrap/commit/dfd489b))
* **datepicker:** added custom date parse logic for manual date input ([#3271](https://github.com/valor-software/ngx-bootstrap/issues/3271)) ([4f5fc18](https://github.com/valor-software/ngx-bootstrap/commit/4f5fc18)), closes [#3206](https://github.com/valor-software/ngx-bootstrap/issues/3206) [#3104](https://github.com/valor-software/ngx-bootstrap/issues/3104) [#2809](https://github.com/valor-software/ngx-bootstrap/issues/2809)
* **datepicker:** added Thai locale support for datepicker ([#3409](https://github.com/valor-software/ngx-bootstrap/issues/3409)) ([662d8c1](https://github.com/valor-software/ngx-bootstrap/commit/662d8c1))
* **datepicker:** disable specified days of week ([#2744](https://github.com/valor-software/ngx-bootstrap/issues/2744)) ([957d54b](https://github.com/valor-software/ngx-bootstrap/commit/957d54b))
* **modal:** resolve modal data before OnInit ([#2600](https://github.com/valor-software/ngx-bootstrap/issues/2600)) ([bf6361e](https://github.com/valor-software/ngx-bootstrap/commit/bf6361e)), closes [#2530](https://github.com/valor-software/ngx-bootstrap/issues/2530) [#2733](https://github.com/valor-software/ngx-bootstrap/issues/2733)
* **package:** upgrade to use bootstrap v4 ([#3495](https://github.com/valor-software/ngx-bootstrap/issues/3495)) ([aa25e6a](https://github.com/valor-software/ngx-bootstrap/commit/aa25e6a))
* **styles:** updated bootstrap4 styles to ver bootstrap-4.0.0-beta.2 ([#3306](https://github.com/valor-software/ngx-bootstrap/issues/3306)) ([86a747c](https://github.com/valor-software/ngx-bootstrap/commit/86a747c))
* **timepicker:** showMinutes flag for toggle MinutesField in timepicker([#2430](https://github.com/valor-software/ngx-bootstrap/issues/2430)) ([#3341](https://github.com/valor-software/ngx-bootstrap/issues/3341)) ([9099b21](https://github.com/valor-software/ngx-bootstrap/commit/9099b21))


### BREAKING CHANGES

* **chronos:** - bs-moment renamed to chronos
- all locales was suffixed with Locale (en -> enLocale)



<a name="2.0.0-rc.0"></a>
# [2.0.0-rc.0](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.11...v2.0.0-rc.0) (2017-12-14)


### Bug Fixes

* **typeahead:** define latimap properly ([#3270](https://github.com/valor-software/ngx-bootstrap/issues/3270)) ([d363e5d](https://github.com/valor-software/ngx-bootstrap/commit/d363e5d)), closes [#3126](https://github.com/valor-software/ngx-bootstrap/issues/3126)


### Features

* **demo:** add missing section title ([#3249](https://github.com/valor-software/ngx-bootstrap/issues/3249)) ([71a2f33](https://github.com/valor-software/ngx-bootstrap/commit/71a2f33))



<a name="2.0.0-beta.11"></a>
# [2.0.0-beta.11](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2017-12-08)


### Bug Fixes

* **datepicker:** if value is null dont reset date to 1970 ([#3207](https://github.com/valor-software/ngx-bootstrap/issues/3207)) ([8761038](https://github.com/valor-software/ngx-bootstrap/commit/8761038))
* **old-datepicker:** summer time ([#3122](https://github.com/valor-software/ngx-bootstrap/issues/3122)) ([422d3bc](https://github.com/valor-software/ngx-bootstrap/commit/422d3bc))


### Features

* **build:** add es2015 build target support ([#3202](https://github.com/valor-software/ngx-bootstrap/issues/3202)) ([735101c](https://github.com/valor-software/ngx-bootstrap/commit/735101c))
* **datepicker:** added BsLocaleService to change datepicker locale ([#3209](https://github.com/valor-software/ngx-bootstrap/issues/3209)) ([4a7f2f0](https://github.com/valor-software/ngx-bootstrap/commit/4a7f2f0))
* **tests:** covering navigation feature with bdd ([#3026](https://github.com/valor-software/ngx-bootstrap/issues/3026)) ([c5fb8dc](https://github.com/valor-software/ngx-bootstrap/commit/c5fb8dc))



<a name="2.0.0-beta.10"></a>
# [2.0.0-beta.10](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2017-12-05)


### Bug Fixes

* **accordion demo:** fix bootstrap link in API Reference ([#3193](https://github.com/valor-software/ngx-bootstrap/issues/3193)) ([a1a1c74](https://github.com/valor-software/ngx-bootstrap/commit/a1a1c74))
* **datepicker:** date manipulation was jumping over a month top ([#3130](https://github.com/valor-software/ngx-bootstrap/issues/3130)) ([a7416e6](https://github.com/valor-software/ngx-bootstrap/commit/a7416e6)), closes [#2902](https://github.com/valor-software/ngx-bootstrap/issues/2902)
* **datepicker:** fixed viewed date if min max is set ([#3129](https://github.com/valor-software/ngx-bootstrap/issues/3129)) ([13bf18e](https://github.com/valor-software/ngx-bootstrap/commit/13bf18e)), closes [#3123](https://github.com/valor-software/ngx-bootstrap/issues/3123) [#2711](https://github.com/valor-software/ngx-bootstrap/issues/2711)
* **datepicker:** if min date is last day of a month ([#3113](https://github.com/valor-software/ngx-bootstrap/issues/3113)) ([ec445e2](https://github.com/valor-software/ngx-bootstrap/commit/ec445e2)), closes [#3102](https://github.com/valor-software/ngx-bootstrap/issues/3102)
* **datepicker:** model should be prestine on init from ngModel ([#3115](https://github.com/valor-software/ngx-bootstrap/issues/3115)) ([6bb077c](https://github.com/valor-software/ngx-bootstrap/commit/6bb077c)), closes [#3014](https://github.com/valor-software/ngx-bootstrap/issues/3014)
* **datepicker:** reseting min and max boundaries will reset it in datepicker ([#3112](https://github.com/valor-software/ngx-bootstrap/issues/3112)) ([a72fedc](https://github.com/valor-software/ngx-bootstrap/commit/a72fedc)), closes [#3085](https://github.com/valor-software/ngx-bootstrap/issues/3085)
* **daterangepicker:** After clearing input, daterangepicker couldn't be opened ([dfdc58d](https://github.com/valor-software/ngx-bootstrap/commit/dfdc58d)), closes [#3191](https://github.com/valor-software/ngx-bootstrap/issues/3191)
* **modal:** fix memory leak for TemplateRef modals ([#3179](https://github.com/valor-software/ngx-bootstrap/issues/3179)) ([d5d1acf](https://github.com/valor-software/ngx-bootstrap/commit/d5d1acf))
* **tests:** add custom launcher for HeadlessChrome ([#3157](https://github.com/valor-software/ngx-bootstrap/issues/3157)) ([909e7ae](https://github.com/valor-software/ngx-bootstrap/commit/909e7ae))
* **version dropdown:** z-index fix for version dropdown and header ([#3190](https://github.com/valor-software/ngx-bootstrap/issues/3190)) ([784d881](https://github.com/valor-software/ngx-bootstrap/commit/784d881))


### Features

* **datepicker:** datepicker now is a directive not a component ([#3125](https://github.com/valor-software/ngx-bootstrap/issues/3125)) ([d9822f0](https://github.com/valor-software/ngx-bootstrap/commit/d9822f0))
* **modal:** ModalDirective should use config.animated ([#3156](https://github.com/valor-software/ngx-bootstrap/issues/3156)) ([f5679eb](https://github.com/valor-software/ngx-bootstrap/commit/f5679eb))


### BREAKING CHANGES

* **datepicker:**   - datepicker and daterange component selectors was removed
  - now datepicker available only as directive



<a name="2.0.0-beta.9"></a>
# [2.0.0-beta.9](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2017-11-23)


### Bug Fixes

* **bs-moment:** fix postformat for empty values ([d3bb3fd](https://github.com/valor-software/ngx-bootstrap/commit/d3bb3fd))
* **datepicker:** added export of he locale and fixed demo ([7616362](https://github.com/valor-software/ngx-bootstrap/commit/7616362))
* **demo:** fix scrollTop ([#2886](https://github.com/valor-software/ngx-bootstrap/issues/2886)) ([2e99010](https://github.com/valor-software/ngx-bootstrap/commit/2e99010))
* **demo:** fixed header overlapping for demo modals in directive examples ([#2974](https://github.com/valor-software/ngx-bootstrap/issues/2974)) ([9c648f6](https://github.com/valor-software/ngx-bootstrap/commit/9c648f6))
* **docs:** fix stackblitz link ([#2980](https://github.com/valor-software/ngx-bootstrap/issues/2980)) ([d97211b](https://github.com/valor-software/ngx-bootstrap/commit/d97211b))
* **dropdown:** bootstrap 4 dropup fix in IE11 ([#3057](https://github.com/valor-software/ngx-bootstrap/issues/3057)) ([632abe1](https://github.com/valor-software/ngx-bootstrap/commit/632abe1)), closes [#3054](https://github.com/valor-software/ngx-bootstrap/issues/3054)


### Features

* **datepicker:** add hungarian localization ([5370c6a](https://github.com/valor-software/ngx-bootstrap/commit/5370c6a))
* **datepicker:** added Hebrew locale support for datepicker ([#2904](https://github.com/valor-software/ngx-bootstrap/issues/2904)) ([f2d5156](https://github.com/valor-software/ngx-bootstrap/commit/f2d5156))
* **datepicker:** use init value for the first initialization ([#2897](https://github.com/valor-software/ngx-bootstrap/issues/2897)) ([7ec97f8](https://github.com/valor-software/ngx-bootstrap/commit/7ec97f8))
* **timepicker:** allow null value and change validation state on manual update ([#3084](https://github.com/valor-software/ngx-bootstrap/issues/3084)) ([0d72cd6](https://github.com/valor-software/ngx-bootstrap/commit/0d72cd6))



<a name="2.0.0-beta.8"></a>
# [2.0.0-beta.8](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2017-11-03)


### Bug Fixes

* **datepicker:** correctly set initial input value ([#2962](https://github.com/valor-software/ngx-bootstrap/issues/2962)) ([5662e20](https://github.com/valor-software/ngx-bootstrap/commit/5662e20)), closes [#2929](https://github.com/valor-software/ngx-bootstrap/issues/2929) [#2930](https://github.com/valor-software/ngx-bootstrap/issues/2930)
* **datepicker:** reactive forms in onpush components ([#2947](https://github.com/valor-software/ngx-bootstrap/issues/2947)) ([69bd6fa](https://github.com/valor-software/ngx-bootstrap/commit/69bd6fa))
* **pagination:** and pager to mark for check when page is changed ([#2942](https://github.com/valor-software/ngx-bootstrap/issues/2942)) ([e225da7](https://github.com/valor-software/ngx-bootstrap/commit/e225da7))
* **rating:** fixed rating in onpush components ([#2943](https://github.com/valor-software/ngx-bootstrap/issues/2943)) ([bb0af30](https://github.com/valor-software/ngx-bootstrap/commit/bb0af30))
* **timepicker:** correctly set initial time manually ([#2945](https://github.com/valor-software/ngx-bootstrap/issues/2945)) ([0071733](https://github.com/valor-software/ngx-bootstrap/commit/0071733))
* **typeahead:** inside of onpush components ([#2946](https://github.com/valor-software/ngx-bootstrap/issues/2946)) ([44763a9](https://github.com/valor-software/ngx-bootstrap/commit/44763a9))


### Features

* **accordion:** add output for isOpen state changes ([#2619](https://github.com/valor-software/ngx-bootstrap/issues/2619)) ([663f078](https://github.com/valor-software/ngx-bootstrap/commit/663f078))
* **alert:** added isOpen input and marked as OnPush ([#2940](https://github.com/valor-software/ngx-bootstrap/issues/2940)) ([af7597b](https://github.com/valor-software/ngx-bootstrap/commit/af7597b))
* **datepicker:** respect first day of week in current locale ([#2970](https://github.com/valor-software/ngx-bootstrap/issues/2970)) ([1b6ed56](https://github.com/valor-software/ngx-bootstrap/commit/1b6ed56))
* **demo:** add universal support, add dockerfile ([#2925](https://github.com/valor-software/ngx-bootstrap/issues/2925)) ([b28838a](https://github.com/valor-software/ngx-bootstrap/commit/b28838a))
* **docs:** new aside menu ([#2851](https://github.com/valor-software/ngx-bootstrap/issues/2851)) ([4e3e456](https://github.com/valor-software/ngx-bootstrap/commit/4e3e456))
* **dropdown:** add option to let event propagate on toggle ([82e7832](https://github.com/valor-software/ngx-bootstrap/commit/82e7832))
* **dropdown:** drop prevent event propogation from dropdown toggle ([5cbe131](https://github.com/valor-software/ngx-bootstrap/commit/5cbe131))
* **package:** removed ng2 bs module ([7c086a4](https://github.com/valor-software/ngx-bootstrap/commit/7c086a4))



<a name="2.0.0-beta.7"></a>
# [2.0.0-beta.7](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2017-10-21)


### Bug Fixes

* **datepicker:** fix disabled state setter ([#2798](https://github.com/valor-software/ngx-bootstrap/issues/2798)) ([bd04f61](https://github.com/valor-software/ngx-bootstrap/commit/bd04f61))
* **datepicker:** increase z-index to datepicker and daterangepicker ([#2788](https://github.com/valor-software/ngx-bootstrap/issues/2788)) ([1da7e15](https://github.com/valor-software/ngx-bootstrap/commit/1da7e15)), closes [#2736](https://github.com/valor-software/ngx-bootstrap/issues/2736)
* **demo:** fix carousel page ([#2885](https://github.com/valor-software/ngx-bootstrap/issues/2885)) ([9be31b5](https://github.com/valor-software/ngx-bootstrap/commit/9be31b5))
* **demo:** fix template bindings ([#2863](https://github.com/valor-software/ngx-bootstrap/issues/2863)) ([5632902](https://github.com/valor-software/ngx-bootstrap/commit/5632902))
* **modal:** add null check in focusOtherModal() ([e1f9b7a](https://github.com/valor-software/ngx-bootstrap/commit/e1f9b7a)), closes [#2612](https://github.com/valor-software/ngx-bootstrap/issues/2612)
* **tabs:** fix customClass for tab content ([#2883](https://github.com/valor-software/ngx-bootstrap/issues/2883)) ([8e50e66](https://github.com/valor-software/ngx-bootstrap/commit/8e50e66))
* **tooltip:** fix tooltip with delay only appearing once ([#2826](https://github.com/valor-software/ngx-bootstrap/issues/2826)) ([e625faa](https://github.com/valor-software/ngx-bootstrap/commit/e625faa))
* **typeahead:** fix close on blur ([#2816](https://github.com/valor-software/ngx-bootstrap/issues/2816)) ([8bedcee](https://github.com/valor-software/ngx-bootstrap/commit/8bedcee)), closes [#2588](https://github.com/valor-software/ngx-bootstrap/issues/2588)
* **typeahead:** select active match on TAB ([#2839](https://github.com/valor-software/ngx-bootstrap/issues/2839)) ([9d0638c](https://github.com/valor-software/ngx-bootstrap/commit/9d0638c))


### Features

* **datepicker:** add swedish locale ([#2804](https://github.com/valor-software/ngx-bootstrap/issues/2804)) ([eccb382](https://github.com/valor-software/ngx-bootstrap/commit/eccb382))
* **moments:** export locales in ngx-bootstrap/index ([#2879](https://github.com/valor-software/ngx-bootstrap/issues/2879)) ([cc851e9](https://github.com/valor-software/ngx-bootstrap/commit/cc851e9))
* **popover:** don't show popover if content is undefined, [#1504](https://github.com/valor-software/ngx-bootstrap/issues/1504) ([#2815](https://github.com/valor-software/ngx-bootstrap/issues/2815)) ([64d13e7](https://github.com/valor-software/ngx-bootstrap/commit/64d13e7))
* **tab:** add tab id support ([#2405](https://github.com/valor-software/ngx-bootstrap/issues/2405)) ([89defda](https://github.com/valor-software/ngx-bootstrap/commit/89defda))
* **tabs:** add opportunity to add multiple classes to customClass attribute ([#2813](https://github.com/valor-software/ngx-bootstrap/issues/2813)) ([b5856ac](https://github.com/valor-software/ngx-bootstrap/commit/b5856ac)), closes [#2467](https://github.com/valor-software/ngx-bootstrap/issues/2467) [#1508](https://github.com/valor-software/ngx-bootstrap/issues/1508)
* **timepicker:** remove inline styling, [#2496](https://github.com/valor-software/ngx-bootstrap/issues/2496) ([#2812](https://github.com/valor-software/ngx-bootstrap/issues/2812)) ([417d0a2](https://github.com/valor-software/ngx-bootstrap/commit/417d0a2))
* **typeahead:** add scroll support ([#2821](https://github.com/valor-software/ngx-bootstrap/issues/2821)) ([033f6e3](https://github.com/valor-software/ngx-bootstrap/commit/033f6e3))
* **typeahead:** show options on focus and click ([#2320](https://github.com/valor-software/ngx-bootstrap/issues/2320)) ([7635468](https://github.com/valor-software/ngx-bootstrap/commit/7635468)), closes [#1919](https://github.com/valor-software/ngx-bootstrap/issues/1919)



<a name="2.0.0-beta.6"></a>
# [2.0.0-beta.6](https://github.com/valor-software/ngx-bootstrap/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2017-10-03)


### Bug Fixes

* **demo:** fix links prefixes ([#2762](https://github.com/valor-software/ngx-bootstrap/issues/2762)) ([9a17ea9](https://github.com/valor-software/ngx-bootstrap/commit/9a17ea9))
* **documentation:** fix issues after redesign ([#2761](https://github.com/valor-software/ngx-bootstrap/issues/2761)) ([d2c3309](https://github.com/valor-software/ngx-bootstrap/commit/d2c3309))


### Features

* **ci:** deploy on merge to dev ([#2743](https://github.com/valor-software/ngx-bootstrap/issues/2743)) ([8f07137](https://github.com/valor-software/ngx-bootstrap/commit/8f07137))
* **ci:** run tests and build with current, latest and beta ng version ([#2734](https://github.com/valor-software/ngx-bootstrap/issues/2734)) ([9e26b73](https://github.com/valor-software/ngx-bootstrap/commit/9e26b73))
* **datepicker:** added Turkish locale support for datepicker ([9e4df47](https://github.com/valor-software/ngx-bootstrap/commit/9e4df47))
* **datepicker:** Use !default for SASS variables ([#2777](https://github.com/valor-software/ngx-bootstrap/issues/2777)) ([cf2365a](https://github.com/valor-software/ngx-bootstrap/commit/cf2365a))
* **package:** Using ngTemplateOutletContext instead of deprectaded ngOutletContext ([#2659](https://github.com/valor-software/ngx-bootstrap/issues/2659)) ([ae2ace3](https://github.com/valor-software/ngx-bootstrap/commit/ae2ace3))
* **redesign:** new design for documentation page ([#2680](https://github.com/valor-software/ngx-bootstrap/issues/2680)) ([fc0cd35](https://github.com/valor-software/ngx-bootstrap/commit/fc0cd35))



<a name="2.0.0-beta.5"></a>
# [2.0.0-beta.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.3...v2.0.0-beta.5) (2017-09-18)


### Bug Fixes

* **datepicker:** added zindex to show datepicker above input fields ([0ec46af](https://github.com/valor-software/ngx-bootstrap/commit/0ec46af))
* **datepicker:** fix daterangepicker crash on empty value ([a30a283](https://github.com/valor-software/ngx-bootstrap/commit/a30a283))
* **datepicker:** fix long date format ([#2630](https://github.com/valor-software/ngx-bootstrap/issues/2630)) ([4e40497](https://github.com/valor-software/ngx-bootstrap/commit/4e40497)), closes [#2611](https://github.com/valor-software/ngx-bootstrap/issues/2611)
* **dropdown:** fix ngv4 dropdowns ([#2644](https://github.com/valor-software/ngx-bootstrap/issues/2644)) ([ed464c8](https://github.com/valor-software/ngx-bootstrap/commit/ed464c8))
* **dropdown:** prevent event propogation if dropdown toggle clicked ([04cab1e](https://github.com/valor-software/ngx-bootstrap/commit/04cab1e))
* **modal:** fix bsModalRef paths in demos ([#2638](https://github.com/valor-software/ngx-bootstrap/issues/2638)) ([13043fc](https://github.com/valor-software/ngx-bootstrap/commit/13043fc))
* **modals:** fix issues with renderer2 in modal service ([73c8c6b](https://github.com/valor-software/ngx-bootstrap/commit/73c8c6b))
* **modals:** fix modals crash, remove glyphicons, disable service worker ([6b7a8c4](https://github.com/valor-software/ngx-bootstrap/commit/6b7a8c4))
* **tabs:** fix default tab selection ([#2643](https://github.com/valor-software/ngx-bootstrap/issues/2643)) ([ff7a390](https://github.com/valor-software/ngx-bootstrap/commit/ff7a390))
* **tests:** fixed tests, change renderer to renderer2 ([18036ff](https://github.com/valor-software/ngx-bootstrap/commit/18036ff))


### Features

* **moment-ts:** added czech locale ([#2642](https://github.com/valor-software/ngx-bootstrap/issues/2642)) ([61e6ed9](https://github.com/valor-software/ngx-bootstrap/commit/61e6ed9))
* **package:** drop support of ng v2 and add support of ng v4 and v5 ([#2602](https://github.com/valor-software/ngx-bootstrap/issues/2602)) ([31c5f62](https://github.com/valor-software/ngx-bootstrap/commit/31c5f62)), closes [#2357](https://github.com/valor-software/ngx-bootstrap/issues/2357) [#2368](https://github.com/valor-software/ngx-bootstrap/issues/2368)
* **rating:** remove glyphicons, add custom template support ([#2631](https://github.com/valor-software/ngx-bootstrap/issues/2631)) ([ea39858](https://github.com/valor-software/ngx-bootstrap/commit/ea39858))
* **timepicker:** replace glyphicons with custom icons ([#2640](https://github.com/valor-software/ngx-bootstrap/issues/2640)) ([cf3fdc8](https://github.com/valor-software/ngx-bootstrap/commit/cf3fdc8))


### BREAKING CHANGES

* **rating:** - removed input properties stateOn, stateOff and ratingStates
- custom icons now working via customTemplate
* **package:** - dropped support of ng v2

* feat(package): upgrading ng v4

* feat(package): dropped support of ng v2

* chore(datepicker): initial commit

* chore(package): beta.6

* fix(datepicker): for ng v4

* chore(core): after merge fix

* fix(demo): fix carousel demo error

* fix(tests): add matchers, fix fn output type in draggable service

* chore(package): upgraded angular dependencies

* 2.0.0-beta.3

* chore(changelog): update

* chore(package): fixed missing moment dependecy



<a name="1.9.3"></a>
## [1.9.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.2...v1.9.3) (2017-09-08)


### Bug Fixes

* **core:** workaround on angular issue with isProdMode ([#2603](https://github.com/valor-software/ngx-bootstrap/issues/2603)) ([f9665ac](https://github.com/valor-software/ngx-bootstrap/commit/f9665ac)), closes [#2596](https://github.com/valor-software/ngx-bootstrap/issues/2596)



<a name="1.9.2"></a>
## [1.9.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.1...v1.9.2) (2017-09-07)


### Bug Fixes

* **datepicker:** fix nav to next month when today is 31 of month, and next month has only 30 days ([#2557](https://github.com/valor-software/ngx-bootstrap/issues/2557)) ([2bcc1d2](https://github.com/valor-software/ngx-bootstrap/commit/2bcc1d2))
* **tooltip:** fix width property in chrome for custom element ([#2559](https://github.com/valor-software/ngx-bootstrap/issues/2559)) ([dfc736e](https://github.com/valor-software/ngx-bootstrap/commit/dfc736e))


### Features

* **core:** try to guess bs version ([#2580](https://github.com/valor-software/ngx-bootstrap/issues/2580)) ([84f09e4](https://github.com/valor-software/ngx-bootstrap/commit/84f09e4))
* **datepicker:** add onTouched support, add forms demos, split demos for old and new datepicker ([17405b7](https://github.com/valor-software/ngx-bootstrap/commit/17405b7))
* **datepicker:** added bsConfig input, locales and color themes with containerClass ([#2549](https://github.com/valor-software/ngx-bootstrap/issues/2549)) ([7cbb128](https://github.com/valor-software/ngx-bootstrap/commit/7cbb128))
* **datepicker:** added locale option to Datepicker Configuration ([#2560](https://github.com/valor-software/ngx-bootstrap/issues/2560)) ([8ac689a](https://github.com/valor-software/ngx-bootstrap/commit/8ac689a)), closes [#455](https://github.com/valor-software/ngx-bootstrap/issues/455)
* **datepicker:** added month and year view ([#2540](https://github.com/valor-software/ngx-bootstrap/issues/2540)) ([571a00b](https://github.com/valor-software/ngx-bootstrap/commit/571a00b))
* **datepicker:** update input according to model, fix value parsing ([16affdd](https://github.com/valor-software/ngx-bootstrap/commit/16affdd))
* **positioning:** auto option for positioning ([#1986](https://github.com/valor-software/ngx-bootstrap/issues/1986)) ([114ed42](https://github.com/valor-software/ngx-bootstrap/commit/114ed42)), closes [#1111](https://github.com/valor-software/ngx-bootstrap/issues/1111)
* **typeahead:** added subscription and unsubscribe on destroy ([#2508](https://github.com/valor-software/ngx-bootstrap/issues/2508)) ([9f833eb](https://github.com/valor-software/ngx-bootstrap/commit/9f833eb)), closes [#2382](https://github.com/valor-software/ngx-bootstrap/issues/2382)



<a name="1.9.1"></a>
## [1.9.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.9.0...v1.9.1) (2017-08-23)


### Bug Fixes

* **modals:** don't try to register outside click handler ([d8e614c](https://github.com/valor-software/ngx-bootstrap/commit/d8e614c)), closes [#2477](https://github.com/valor-software/ngx-bootstrap/issues/2477)
* **tabs:** fixed tabs vertical pills for bs4 ([646e033](https://github.com/valor-software/ngx-bootstrap/commit/646e033)), closes [#2481](https://github.com/valor-software/ngx-bootstrap/issues/2481)
* **timepicker:** when showMeridian changes value, time is rerendered ([e59172f](https://github.com/valor-software/ngx-bootstrap/commit/e59172f)), closes [#2476](https://github.com/valor-software/ngx-bootstrap/issues/2476)


### Features

* **datepicker:** change css to scss, add own styles ([#2478](https://github.com/valor-software/ngx-bootstrap/issues/2478)) ([08170ed](https://github.com/valor-software/ngx-bootstrap/commit/08170ed))



<a name="1.9.0"></a>
# [1.9.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.8.1...v1.9.0) (2017-08-21)


### Bug Fixes

* **bs4:** fix dropdown, tooltip, popover, datepicker, accordion for bs4 beta ([#2418](https://github.com/valor-software/ngx-bootstrap/issues/2418)) ([f398576](https://github.com/valor-software/ngx-bootstrap/commit/f398576))
* **carousel:** fix demo expressionChanged error ([#2358](https://github.com/valor-software/ngx-bootstrap/issues/2358)) ([c0347d7](https://github.com/valor-software/ngx-bootstrap/commit/c0347d7))
* **carousel:** setInterval by running it outside of Angular zone. ([#2388](https://github.com/valor-software/ngx-bootstrap/issues/2388)) ([da073df](https://github.com/valor-software/ngx-bootstrap/commit/da073df))
* **datepicker:** add fix for datepicker table ([#2461](https://github.com/valor-software/ngx-bootstrap/issues/2461)) ([e0a6adf](https://github.com/valor-software/ngx-bootstrap/commit/e0a6adf))
* **datepicker:** prevent outside click to close datepicker on navigation ([6472b6f](https://github.com/valor-software/ngx-bootstrap/commit/6472b6f))
* **tabs:** fix select/deselect multiple calls ([#2361](https://github.com/valor-software/ngx-bootstrap/issues/2361)) ([5dd456b](https://github.com/valor-software/ngx-bootstrap/commit/5dd456b)), closes [#2005](https://github.com/valor-software/ngx-bootstrap/issues/2005) [#1820](https://github.com/valor-software/ngx-bootstrap/issues/1820) [#1129](https://github.com/valor-software/ngx-bootstrap/issues/1129)


### Features

* **bs-moment:** add localization tests ([#2466](https://github.com/valor-software/ngx-bootstrap/issues/2466)) ([6589ee9](https://github.com/valor-software/ngx-bootstrap/commit/6589ee9))
* **datepicker:** initial version of new datepicker ([#2426](https://github.com/valor-software/ngx-bootstrap/issues/2426)) ([b11776c](https://github.com/valor-software/ngx-bootstrap/commit/b11776c))
* **datepicker:** removed dependency on moment.js ([#2465](https://github.com/valor-software/ngx-bootstrap/issues/2465)) ([7c87162](https://github.com/valor-software/ngx-bootstrap/commit/7c87162))
* **datepicker:** use as directives ([#2446](https://github.com/valor-software/ngx-bootstrap/issues/2446)) ([d7f9a2a](https://github.com/valor-software/ngx-bootstrap/commit/d7f9a2a))
* **demo:** add popover outside click demo ([#2449](https://github.com/valor-software/ngx-bootstrap/issues/2449)) ([da7d352](https://github.com/valor-software/ngx-bootstrap/commit/da7d352))
* **docs:** add versioning implementation ([#2350](https://github.com/valor-software/ngx-bootstrap/issues/2350)) ([91cee71](https://github.com/valor-software/ngx-bootstrap/commit/91cee71))
* **loader:** added ability to attach inline elements via component loader ([#2458](https://github.com/valor-software/ngx-bootstrap/issues/2458)) ([0c7d21c](https://github.com/valor-software/ngx-bootstrap/commit/0c7d21c))
* **popover:** added outsideClick ([#2441](https://github.com/valor-software/ngx-bootstrap/issues/2441)) ([a606a7f](https://github.com/valor-software/ngx-bootstrap/commit/a606a7f)), closes [#1477](https://github.com/valor-software/ngx-bootstrap/issues/1477)
* **popover:** support passing template context ([#2428](https://github.com/valor-software/ngx-bootstrap/issues/2428)) ([38e562d](https://github.com/valor-software/ngx-bootstrap/commit/38e562d)), closes [#1682](https://github.com/valor-software/ngx-bootstrap/issues/1682)
* **typeahead:** add dropup option ([#2390](https://github.com/valor-software/ngx-bootstrap/issues/2390)) ([c6ef77b](https://github.com/valor-software/ngx-bootstrap/commit/c6ef77b))
* **typeahead:** show results when typeaheadMinLength is 0 and the search string is empty ([#2352](https://github.com/valor-software/ngx-bootstrap/issues/2352)) ([4b68adb](https://github.com/valor-software/ngx-bootstrap/commit/4b68adb))



<a name="1.8.1"></a>
## [1.8.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.8.0...v1.8.1) (2017-07-28)


### Bug Fixes

* **datepicker:** fix selectionDone event [fixes [#2260](https://github.com/valor-software/ngx-bootstrap/issues/2260)] ([#2282](https://github.com/valor-software/ngx-bootstrap/issues/2282)) ([763b2b7](https://github.com/valor-software/ngx-bootstrap/commit/763b2b7))
* **dropdown:** fix isOpen [fixes [#2310](https://github.com/valor-software/ngx-bootstrap/issues/2310)] ([#2313](https://github.com/valor-software/ngx-bootstrap/issues/2313)) ([a63f902](https://github.com/valor-software/ngx-bootstrap/commit/a63f902))
* **modal:** fix system.js [fixes [#2291](https://github.com/valor-software/ngx-bootstrap/issues/2291)] ([#2311](https://github.com/valor-software/ngx-bootstrap/issues/2311)) ([8ce315b](https://github.com/valor-software/ngx-bootstrap/commit/8ce315b))
* **popover:** fix undefined container class ([#2283](https://github.com/valor-software/ngx-bootstrap/issues/2283)) ([91fc1cd](https://github.com/valor-software/ngx-bootstrap/commit/91fc1cd))
* **popover & tooltip:** fix isOpen  ([#2286](https://github.com/valor-software/ngx-bootstrap/issues/2286)) ([eb3cd04](https://github.com/valor-software/ngx-bootstrap/commit/eb3cd04))
* **tabs:** fix customClass [fixes [#2253](https://github.com/valor-software/ngx-bootstrap/issues/2253)] ([#2273](https://github.com/valor-software/ngx-bootstrap/issues/2273)) ([0d67ef8](https://github.com/valor-software/ngx-bootstrap/commit/0d67ef8))
* **tooltip:** fix isOpen and undefined containerClass [fixes [#2257](https://github.com/valor-software/ngx-bootstrap/issues/2257)] ([#2262](https://github.com/valor-software/ngx-bootstrap/issues/2262)) ([8664bb1](https://github.com/valor-software/ngx-bootstrap/commit/8664bb1))


### Features

* **modal:** add ability to pass data to modal component ([#2293](https://github.com/valor-software/ngx-bootstrap/issues/2293)) ([8ac13f9](https://github.com/valor-software/ngx-bootstrap/commit/8ac13f9)), closes [#2290](https://github.com/valor-software/ngx-bootstrap/issues/2290) [#2275](https://github.com/valor-software/ngx-bootstrap/issues/2275) [#2251](https://github.com/valor-software/ngx-bootstrap/issues/2251) [#2294](https://github.com/valor-software/ngx-bootstrap/issues/2294)
* **modal:** add modal service events, fix modal content onDestroy [fixes [#2256](https://github.com/valor-software/ngx-bootstrap/issues/2256)] ([#2272](https://github.com/valor-software/ngx-bootstrap/issues/2272)) ([c9f85e6](https://github.com/valor-software/ngx-bootstrap/commit/c9f85e6))



<a name="1.8.0"></a>
# [1.8.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.7.1...v1.8.0) (2017-07-20)


### Bug Fixes

* **acordion:** space beetween accordion groups ([#2014](https://github.com/valor-software/ngx-bootstrap/issues/2014)) ([ad2da54](https://github.com/valor-software/ngx-bootstrap/commit/ad2da54)), closes [#1854](https://github.com/valor-software/ngx-bootstrap/issues/1854)
* **button:** should work within onPush components ([#2038](https://github.com/valor-software/ngx-bootstrap/issues/2038)) ([aec0f86](https://github.com/valor-software/ngx-bootstrap/commit/aec0f86)), closes [#1689](https://github.com/valor-software/ngx-bootstrap/issues/1689)
* **datepicker:** datepickerMode does change when selection is manual ([#1976](https://github.com/valor-software/ngx-bootstrap/issues/1976)) ([e7795f7](https://github.com/valor-software/ngx-bootstrap/commit/e7795f7)), closes [#1911](https://github.com/valor-software/ngx-bootstrap/issues/1911)
* **datepicker:** fix SimpleChanges issue, add date check ([#2223](https://github.com/valor-software/ngx-bootstrap/issues/2223)) ([501d878](https://github.com/valor-software/ngx-bootstrap/commit/501d878))
* **datepicker:** for issue [#1962](https://github.com/valor-software/ngx-bootstrap/issues/1962) ([#1991](https://github.com/valor-software/ngx-bootstrap/issues/1991)) ([deb7f63](https://github.com/valor-software/ngx-bootstrap/commit/deb7f63))
* **datepicker:** refix issue with moment import ([#2023](https://github.com/valor-software/ngx-bootstrap/issues/2023)) ([8ed0c06](https://github.com/valor-software/ngx-bootstrap/commit/8ed0c06)), closes [#1556](https://github.com/valor-software/ngx-bootstrap/issues/1556)
* **datepicker:** using icons instead of innerHTML chevrons to fix issue with webworkers ([#2166](https://github.com/valor-software/ngx-bootstrap/issues/2166)) ([2fedac2](https://github.com/valor-software/ngx-bootstrap/commit/2fedac2))
* **demo:** add Intl polyfill [fixes [#2215](https://github.com/valor-software/ngx-bootstrap/issues/2215)] ([#2238](https://github.com/valor-software/ngx-bootstrap/issues/2238)) ([e195549](https://github.com/valor-software/ngx-bootstrap/commit/e195549))
* **demo:** fix buttons reactive forms sample ([325b510](https://github.com/valor-software/ngx-bootstrap/commit/325b510))
* **demo:** remove gitter links, fix source links to modal & sortable, fix download count ([#2240](https://github.com/valor-software/ngx-bootstrap/issues/2240)) ([9211643](https://github.com/valor-software/ngx-bootstrap/commit/9211643))
* **modals:** hotfix/modal-nested-close-on-esc solved ([#2173](https://github.com/valor-software/ngx-bootstrap/issues/2173)) ([41f11e6](https://github.com/valor-software/ngx-bootstrap/commit/41f11e6))
* **popover:** no focus on button on Mac OS [#1795](https://github.com/valor-software/ngx-bootstrap/issues/1795) ([#2031](https://github.com/valor-software/ngx-bootstrap/issues/2031)) ([d039a8d](https://github.com/valor-software/ngx-bootstrap/commit/d039a8d))
* **positioning:** don't modify readonly value ([#2042](https://github.com/valor-software/ngx-bootstrap/issues/2042)) ([d12593d](https://github.com/valor-software/ngx-bootstrap/commit/d12593d))
* **readme:** fix angular style guide link ([#2092](https://github.com/valor-software/ngx-bootstrap/issues/2092)) ([bb7bd75](https://github.com/valor-software/ngx-bootstrap/commit/bb7bd75))
* **tabs:** fix removing tabs in IE ([#2145](https://github.com/valor-software/ngx-bootstrap/issues/2145)) ([fc5e135](https://github.com/valor-software/ngx-bootstrap/commit/fc5e135))
* **typeahead:** Fix crash on Firefox and `contenteditable` input ([#2057](https://github.com/valor-software/ngx-bootstrap/issues/2057)) ([8656326](https://github.com/valor-software/ngx-bootstrap/commit/8656326))


### Features

* **docs:** add lib build for development steps ([#2220](https://github.com/valor-software/ngx-bootstrap/issues/2220)) ([c3a7aa4](https://github.com/valor-software/ngx-bootstrap/commit/c3a7aa4))
* **modal:** add dissmissReason, fix body padding, add events section… ([#2131](https://github.com/valor-software/ngx-bootstrap/issues/2131)) ([dde6620](https://github.com/valor-software/ngx-bootstrap/commit/dde6620))
* **modal:** modal service wip ([#2047](https://github.com/valor-software/ngx-bootstrap/issues/2047)) ([2d02faa](https://github.com/valor-software/ngx-bootstrap/commit/2d02faa)), closes [#1998](https://github.com/valor-software/ngx-bootstrap/issues/1998) [#1995](https://github.com/valor-software/ngx-bootstrap/issues/1995) [#1830](https://github.com/valor-software/ngx-bootstrap/issues/1830) [#1181](https://github.com/valor-software/ngx-bootstrap/issues/1181) [#579](https://github.com/valor-software/ngx-bootstrap/issues/579) [#2128](https://github.com/valor-software/ngx-bootstrap/issues/2128) [#2130](https://github.com/valor-software/ngx-bootstrap/issues/2130) [#2133](https://github.com/valor-software/ngx-bootstrap/issues/2133)
* **popover & tooltip:** add container classes ([#2190](https://github.com/valor-software/ngx-bootstrap/issues/2190)) ([690d811](https://github.com/valor-software/ngx-bootstrap/commit/690d811)), closes [#1707](https://github.com/valor-software/ngx-bootstrap/issues/1707) [#1395](https://github.com/valor-software/ngx-bootstrap/issues/1395)
* **popups:** use events with better support ([#1211](https://github.com/valor-software/ngx-bootstrap/issues/1211)) ([46419e3](https://github.com/valor-software/ngx-bootstrap/commit/46419e3))
* **progressbar:** value input can handle array of staked data  ([#2037](https://github.com/valor-software/ngx-bootstrap/issues/2037)) ([2bf9ad8](https://github.com/valor-software/ngx-bootstrap/commit/2bf9ad8))
* **timepicker:** new timepicker implementation ([#2058](https://github.com/valor-software/ngx-bootstrap/issues/2058)) ([4a37406](https://github.com/valor-software/ngx-bootstrap/commit/4a37406)), closes [#2036](https://github.com/valor-software/ngx-bootstrap/issues/2036) [#1981](https://github.com/valor-software/ngx-bootstrap/issues/1981) [#1973](https://github.com/valor-software/ngx-bootstrap/issues/1973) [#1957](https://github.com/valor-software/ngx-bootstrap/issues/1957) [#1935](https://github.com/valor-software/ngx-bootstrap/issues/1935) [#1672](https://github.com/valor-software/ngx-bootstrap/issues/1672) [#1007](https://github.com/valor-software/ngx-bootstrap/issues/1007) [#962](https://github.com/valor-software/ngx-bootstrap/issues/962) [#793](https://github.com/valor-software/ngx-bootstrap/issues/793) [#173](https://github.com/valor-software/ngx-bootstrap/issues/173) [#1271](https://github.com/valor-software/ngx-bootstrap/issues/1271) [#1539](https://github.com/valor-software/ngx-bootstrap/issues/1539) [#1253](https://github.com/valor-software/ngx-bootstrap/issues/1253) [#2187](https://github.com/valor-software/ngx-bootstrap/issues/2187) [#2127](https://github.com/valor-software/ngx-bootstrap/issues/2127)



<a name="1.7.1"></a>
## [1.7.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.7.0...v1.7.1) (2017-06-02)


### Bug Fixes

* **accoridon:** remove unneeded card-title class ([#2024](https://github.com/valor-software/ngx-bootstrap/issues/2024)) ([ba56e64](https://github.com/valor-software/ngx-bootstrap/commit/ba56e64))
* **popover:** prevent ng router active link double ngOnInit issue ([dab394c](https://github.com/valor-software/ngx-bootstrap/commit/dab394c))
* **tabs:** fixed tabs duplication issue ([#1941](https://github.com/valor-software/ngx-bootstrap/issues/1941)) ([40335aa](https://github.com/valor-software/ngx-bootstrap/commit/40335aa)), closes [#1629](https://github.com/valor-software/ngx-bootstrap/issues/1629)


### Features

* **tabs:** added id parameter in tab directive ([#1909](https://github.com/valor-software/ngx-bootstrap/issues/1909)) ([20c7fb8](https://github.com/valor-software/ngx-bootstrap/commit/20c7fb8)), closes [#1908](https://github.com/valor-software/ngx-bootstrap/issues/1908)



<a name="1.7.0"></a>
# [1.7.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.6...v1.7.0) (2017-06-01)


### Bug Fixes

* **alert:** dismissibleChange emits boolean values ([#1896](https://github.com/valor-software/ngx-bootstrap/issues/1896)) ([10bfd7f](https://github.com/valor-software/ngx-bootstrap/commit/10bfd7f))
* **build:** fix most of ts errors ([1384eb1](https://github.com/valor-software/ngx-bootstrap/commit/1384eb1))
* **demo:** fix close btns in nested modals ([7ef989a](https://github.com/valor-software/ngx-bootstrap/commit/7ef989a))
* **dropdown:** fix duplicated events, add spec ([da92081](https://github.com/valor-software/ngx-bootstrap/commit/da92081))
* **dropdown:** fixed onShow and onHidden events for inline dropdown module ([#1951](https://github.com/valor-software/ngx-bootstrap/issues/1951)) ([ead8d52](https://github.com/valor-software/ngx-bootstrap/commit/ead8d52))


### Features

* **dropdown:** add isOpenChange output ([#2006](https://github.com/valor-software/ngx-bootstrap/issues/2006)) ([1c9f767](https://github.com/valor-software/ngx-bootstrap/commit/1c9f767))
* **modals:** add docs for nested modals ([e28d821](https://github.com/valor-software/ngx-bootstrap/commit/e28d821))
* **modals:** add support for nested modals (fix scroll) ([48ef8b7](https://github.com/valor-software/ngx-bootstrap/commit/48ef8b7)), closes [valor-software/ngx-bootstrap#896](https://github.com/valor-software/ngx-bootstrap/issues/896) [valor-software/ngx-bootstrap#1691](https://github.com/valor-software/ngx-bootstrap/issues/1691)



<a name="1.6.6"></a>
## [1.6.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.5...v1.6.6) (2017-04-10)


### Bug Fixes

* **dropdown:** prevent ng router active link double ngOnInit issue ([7ded538](https://github.com/valor-software/ngx-bootstrap/commit/7ded538)), closes [#1885](https://github.com/valor-software/ngx-bootstrap/issues/1885)



<a name="1.6.5"></a>
## [1.6.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.4...v1.6.5) (2017-04-06)


### Features

* **typeahead:** deprecated typeahead utils for ngv4 aot mode work ([df499e9](https://github.com/valor-software/ngx-bootstrap/commit/df499e9))



<a name="1.6.4"></a>
## [1.6.4](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.3...v1.6.4) (2017-04-06)



<a name="1.6.3"></a>
## [1.6.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.2...v1.6.3) (2017-04-05)


### Bug Fixes

* **dropdowns:** fixed styling of dropdowns with bootstrap 4 ([9c8c74b](https://github.com/valor-software/ngx-bootstrap/commit/9c8c74b))


### Features

* **package:** rename to ngx-bootstrap ([c946f8e](https://github.com/valor-software/ngx-bootstrap/commit/c946f8e))



<a name="1.6.2"></a>
## [1.6.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.1...v1.6.2) (2017-04-05)


### Bug Fixes

* **dropdown:** Add missing rxjs filter operator dependency ([#1836](https://github.com/valor-software/ngx-bootstrap/issues/1836)) ([838821a](https://github.com/valor-software/ngx-bootstrap/commit/838821a))
* **dropdown:** fixed auto close input behavior ([b023ca6](https://github.com/valor-software/ngx-bootstrap/commit/b023ca6)), closes [#1840](https://github.com/valor-software/ngx-bootstrap/issues/1840)


### Features

* **dropdown:** added inline style of adding dropdown, enabled by default ([f4334a8](https://github.com/valor-software/ngx-bootstrap/commit/f4334a8)), closes [#1860](https://github.com/valor-software/ngx-bootstrap/issues/1860) [#1862](https://github.com/valor-software/ngx-bootstrap/issues/1862)



<a name="1.6.1"></a>
## [1.6.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.6.0...v1.6.1) (2017-03-30)


### Features

* **dropdown:** now you can bind to dropup property ([d6f6d25](https://github.com/valor-software/ngx-bootstrap/commit/d6f6d25))



<a name="1.6.0"></a>
# [1.6.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.5.0...v1.6.0) (2017-03-29)



<a name="1.5.0"></a>
# [1.5.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.4.2...v1.5.0) (2017-03-29)


### Features

* **dropdown:** rollout completely rewritten bs-dropdown version ([#1771](https://github.com/valor-software/ngx-bootstrap/issues/1771)) ([31cba41](https://github.com/valor-software/ngx-bootstrap/commit/31cba41)), closes [#1674](https://github.com/valor-software/ngx-bootstrap/issues/1674) [#1749](https://github.com/valor-software/ngx-bootstrap/issues/1749) [#1623](https://github.com/valor-software/ngx-bootstrap/issues/1623) [#1415](https://github.com/valor-software/ngx-bootstrap/issues/1415) [#802](https://github.com/valor-software/ngx-bootstrap/issues/802) [#569](https://github.com/valor-software/ngx-bootstrap/issues/569) [#530](https://github.com/valor-software/ngx-bootstrap/issues/530) [#6](https://github.com/valor-software/ngx-bootstrap/issues/6) [#1540](https://github.com/valor-software/ngx-bootstrap/issues/1540) [#1217](https://github.com/valor-software/ngx-bootstrap/issues/1217) [#591](https://github.com/valor-software/ngx-bootstrap/issues/591) [#478](https://github.com/valor-software/ngx-bootstrap/issues/478)
* **typeahead:** added export as bs-typeahead ([#1783](https://github.com/valor-software/ngx-bootstrap/issues/1783)) ([9ef6fa6](https://github.com/valor-software/ngx-bootstrap/commit/9ef6fa6))


### BREAKING CHANGES

* **dropdown:** - `DropdownModule` renamed to `BsDropdownModule`, same to all dropdown components added `bs` prefix
- `addToggleClass` option is deprecated, now you need to add `dropdown-toggle` class manually if needed
- `dropdownMenu` menu become a template selector, so `*` should be added
sample:  `<ul dropdownMenu>` should become `<ul *dropdownMenu>`
- `onToggle` event deprecated use `isOpenChange` instead
- `appendToBody` deprecated, use `container="body"` instead, now dropdown behaviour and attachment params alligned with tooltips and popovers
- `keyboardNav` deprecated
- `disabled` renamed to `isDisabled`
- `dropdownToggle` doesn't prevent default behaviour anymore



<a name="1.4.2"></a>
## [1.4.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.4.1...v1.4.2) (2017-03-17)


### Bug Fixes

* **styling-local:** fix tooltip arrow styles ([b1f04d9](https://github.com/valor-software/ngx-bootstrap/commit/b1f04d9))
* **universal:** to not through on unrecognized Keyboard and Mouse events ([b81e9de](https://github.com/valor-software/ngx-bootstrap/commit/b81e9de))


### Features

* **build:** rename .angular-cli.json and refactor ([#1736](https://github.com/valor-software/ngx-bootstrap/issues/1736)) ([d60dcfb](https://github.com/valor-software/ngx-bootstrap/commit/d60dcfb))
* **datepicker:** added active date changed event ([#1703](https://github.com/valor-software/ngx-bootstrap/issues/1703)) ([8120c88](https://github.com/valor-software/ngx-bootstrap/commit/8120c88))
* **popover:** Updated property 'isOpen' in show and hide methods ([#1765](https://github.com/valor-software/ngx-bootstrap/issues/1765)) ([363d9e6](https://github.com/valor-software/ngx-bootstrap/commit/363d9e6))



<a name="1.4.1"></a>
## [1.4.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.4.0...v1.4.1) (2017-03-16)


### Bug Fixes

* **dropdown,rating,typeahead:** remove global in order to be usable in System.js ([#1734](https://github.com/valor-software/ngx-bootstrap/issues/1734)) ([4a7719b](https://github.com/valor-software/ngx-bootstrap/commit/4a7719b))


### Features

* **demo:** add example for `show` modal option ([a33dc10](https://github.com/valor-software/ngx-bootstrap/commit/a33dc10))
* **docs:** added Instructions for BS4 and ng-cli ([#1714](https://github.com/valor-software/ngx-bootstrap/issues/1714)) ([98b9b2e](https://github.com/valor-software/ngx-bootstrap/commit/98b9b2e)), closes [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637) [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637)
* **modal:** make `show` config option work ([#1680](https://github.com/valor-software/ngx-bootstrap/issues/1680)) ([0abd801](https://github.com/valor-software/ngx-bootstrap/commit/0abd801))
* **package:** changed the way moment is imported ([#1556](https://github.com/valor-software/ngx-bootstrap/issues/1556)) ([27a0229](https://github.com/valor-software/ngx-bootstrap/commit/27a0229))



<a name="1.4.0"></a>
# [1.4.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.3...v1.4.0) (2017-03-06)


### Bug Fixes

* **datepicker:** update activeDate on select ([#1676](https://github.com/valor-software/ngx-bootstrap/issues/1676)) ([378726b](https://github.com/valor-software/ngx-bootstrap/commit/378726b))
* **demo:** bootstrap 4 demos card text formatting incorrectly. ([#1656](https://github.com/valor-software/ngx-bootstrap/issues/1656)) ([d8f42df](https://github.com/valor-software/ngx-bootstrap/commit/d8f42df)), closes [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637) [#1637](https://github.com/valor-software/ngx-bootstrap/issues/1637)
* **docs:** fixed angular-cli docs install guide ([e626947](https://github.com/valor-software/ngx-bootstrap/commit/e626947))
* **dropdown:** fixed disabled tests, removed outdated ([#1605](https://github.com/valor-software/ngx-bootstrap/issues/1605)) ([29dceba](https://github.com/valor-software/ngx-bootstrap/commit/29dceba)), closes [#1606](https://github.com/valor-software/ngx-bootstrap/issues/1606)
* **package.json:** locked version tor types/jasmine ([#1635](https://github.com/valor-software/ngx-bootstrap/issues/1635)) ([90fd995](https://github.com/valor-software/ngx-bootstrap/commit/90fd995))
* **tabs:** Use [ngClass] to avoid conflicts with [class.x] bindings ([#1651](https://github.com/valor-software/ngx-bootstrap/issues/1651)) ([183b275](https://github.com/valor-software/ngx-bootstrap/commit/183b275))
* **tooltip:** removed deprecated tooltip options ([373bed9](https://github.com/valor-software/ngx-bootstrap/commit/373bed9)), closes [#1612](https://github.com/valor-software/ngx-bootstrap/issues/1612)
* **typeahead:** optionsListTemplate usage is fixed in TypeaheadContainerComponent ([#1625](https://github.com/valor-software/ngx-bootstrap/issues/1625)) ([f21bd8d](https://github.com/valor-software/ngx-bootstrap/commit/f21bd8d))


### Features

* **buttons:** Fixed disabled buttons module tests ([#1604](https://github.com/valor-software/ngx-bootstrap/issues/1604)) ([4df17c7](https://github.com/valor-software/ngx-bootstrap/commit/4df17c7)), closes [#1606](https://github.com/valor-software/ngx-bootstrap/issues/1606)
* **demo:** access static tabs sample ([#1603](https://github.com/valor-software/ngx-bootstrap/issues/1603)) ([63c64e0](https://github.com/valor-software/ngx-bootstrap/commit/63c64e0))
* **typeahead:** - added typeaheadOnBlur event ([#1639](https://github.com/valor-software/ngx-bootstrap/issues/1639)) ([62eb22a](https://github.com/valor-software/ngx-bootstrap/commit/62eb22a))



<a name="1.3.3"></a>
## [1.3.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.2...v1.3.3) (2017-02-03)


### Bug Fixes

* **typeahead:** allow to work with formControl ([e3f4854](https://github.com/valor-software/ngx-bootstrap/commit/e3f4854)), closes [#1595](https://github.com/valor-software/ngx-bootstrap/issues/1595)


### Features

* **package:** export missed things from utils ([54eb13d](https://github.com/valor-software/ngx-bootstrap/commit/54eb13d)), closes [#1584](https://github.com/valor-software/ngx-bootstrap/issues/1584) [#1590](https://github.com/valor-software/ngx-bootstrap/issues/1590)



<a name="1.3.2"></a>
## [1.3.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.1...v1.3.2) (2017-01-31)


### Bug Fixes

* **pagination:** export Pagination Config ([#1574](https://github.com/valor-software/ngx-bootstrap/issues/1574)) ([c3337f6](https://github.com/valor-software/ngx-bootstrap/commit/c3337f6))


### Features

* **sortable:** add support for custom item templates ([#1580](https://github.com/valor-software/ngx-bootstrap/issues/1580)) ([9d0b228](https://github.com/valor-software/ngx-bootstrap/commit/9d0b228)), closes [#1554](https://github.com/valor-software/ngx-bootstrap/issues/1554)



<a name="1.3.1"></a>
## [1.3.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.3.0...v1.3.1) (2017-01-25)


### Features

* **typeahead:** added option list template to typeahead container ([#1548](https://github.com/valor-software/ngx-bootstrap/issues/1548)) ([e56ea43](https://github.com/valor-software/ngx-bootstrap/commit/e56ea43))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.6...v1.3.0) (2017-01-23)


### Bug Fixes

* **aot:** adding missing exports ([#1525](https://github.com/valor-software/ngx-bootstrap/issues/1525)) ([7690e5d](https://github.com/valor-software/ngx-bootstrap/commit/7690e5d))
* **carousel:** _slides.add is not a function, by removing extend Array ([7d454de](https://github.com/valor-software/ngx-bootstrap/commit/7d454de)), closes [#1516](https://github.com/valor-software/ngx-bootstrap/issues/1516)


### Features

* **build:** use es2015 module compile target ([2d74fc3](https://github.com/valor-software/ngx-bootstrap/commit/2d74fc3)), closes [#1538](https://github.com/valor-software/ngx-bootstrap/issues/1538)
* **package:** angular-cli version bump ([a79aa26](https://github.com/valor-software/ngx-bootstrap/commit/a79aa26))



<a name="1.2.6"></a>
## [1.2.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.5...v1.2.6) (2017-01-19)


### Bug Fixes

* **aot:** added missing exports ([d40a299](https://github.com/valor-software/ngx-bootstrap/commit/d40a299))



<a name="1.2.5"></a>
## [1.2.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.4...v1.2.5) (2017-01-18)


### Bug Fixes

* **accordion:** a tag replaced with div, so preventDefault() was removed from toggleOpen ([d352962](https://github.com/valor-software/ngx-bootstrap/commit/d352962)), closes [#1512](https://github.com/valor-software/ngx-bootstrap/issues/1512)
* **carousel:** fixed styles for carousel navigation buttons ([a1489bd](https://github.com/valor-software/ngx-bootstrap/commit/a1489bd))



<a name="1.2.4"></a>
## [1.2.4](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.3...v1.2.4) (2017-01-17)


### Bug Fixes

* **sortable:** fixing AoT type issues ([717a7e9](https://github.com/valor-software/ngx-bootstrap/commit/717a7e9))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.2...v1.2.3) (2017-01-17)


### Bug Fixes

* **sortable:** prop made public for AoT ([1c25afc](https://github.com/valor-software/ngx-bootstrap/commit/1c25afc))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.1...v1.2.2) (2017-01-16)


### Bug Fixes

* **sortable:** Changed reference to BrowserModule to CommonModule instead ([#1503](https://github.com/valor-software/ngx-bootstrap/issues/1503)) ([e7105c6](https://github.com/valor-software/ngx-bootstrap/commit/e7105c6))
* **typeahead:** hide on blur when item was hovered ([4311c18](https://github.com/valor-software/ngx-bootstrap/commit/4311c18)), closes [#1495](https://github.com/valor-software/ngx-bootstrap/issues/1495)


### Features

* **build:** upgrade to support ng v2.3+ only ([bd5171a](https://github.com/valor-software/ngx-bootstrap/commit/bd5171a))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.2.0...v1.2.1) (2017-01-13)


### Bug Fixes

* **sortable:** do not reexport BrowserModule ([77d79ab](https://github.com/valor-software/ngx-bootstrap/commit/77d79ab)), closes [#1486](https://github.com/valor-software/ngx-bootstrap/issues/1486)


### Features

* **typeahead:** fix for bs4-alfa.6 template ([3fb6e38](https://github.com/valor-software/ngx-bootstrap/commit/3fb6e38)), closes [#1494](https://github.com/valor-software/ngx-bootstrap/issues/1494)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.17...v1.2.0) (2017-01-12)


### Bug Fixes

* **sortable:** make property public for AoT compilance ([e5c3135](https://github.com/valor-software/ngx-bootstrap/commit/e5c3135)), closes [#1483](https://github.com/valor-software/ngx-bootstrap/issues/1483)


### Features

* **bs4:** upgrade to v4-alfa.6 ([#1485](https://github.com/valor-software/ngx-bootstrap/issues/1485)) ([4c71f87](https://github.com/valor-software/ngx-bootstrap/commit/4c71f87))



<a name="1.1.17"></a>
## [1.1.17](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16-11...v1.1.17) (2017-01-11)


### Bug Fixes

* **alert:** removed duplicated event triggering ([b047d7f](https://github.com/valor-software/ngx-bootstrap/commit/b047d7f)), closes [#1430](https://github.com/valor-software/ngx-bootstrap/issues/1430)
* **carousel:** play carousel on mouseup ([#1433](https://github.com/valor-software/ngx-bootstrap/issues/1433)) ([a1d7983](https://github.com/valor-software/ngx-bootstrap/commit/a1d7983))
* **popover:** markup for bs4 ([#1431](https://github.com/valor-software/ngx-bootstrap/issues/1431)) ([538cca8](https://github.com/valor-software/ngx-bootstrap/commit/538cca8))
* **popover:** misspring in popover config name ([d7e8aa1](https://github.com/valor-software/ngx-bootstrap/commit/d7e8aa1))


### Features

* **docs:** make urls easy to share ([47ab93b](https://github.com/valor-software/ngx-bootstrap/commit/47ab93b))
* **sortable:** added new sortable component ([#1295](https://github.com/valor-software/ngx-bootstrap/issues/1295)) ([fab3df5](https://github.com/valor-software/ngx-bootstrap/commit/fab3df5))



<a name="1.1.16-11"></a>
## [1.1.16-11](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16-7...v1.1.16-11) (2016-12-30)


### Bug Fixes

* **accordion:** bs4 template updated ([53c0401](https://github.com/valor-software/ngx-bootstrap/commit/53c0401))
* **tabs:** removed onDestroy event ([78f6e49](https://github.com/valor-software/ngx-bootstrap/commit/78f6e49)), closes [#696](https://github.com/valor-software/ngx-bootstrap/issues/696) [#610](https://github.com/valor-software/ngx-bootstrap/issues/610)
* **typeahead:** fixed typeahead positioning inside form-inline ([c6d4835](https://github.com/valor-software/ngx-bootstrap/commit/c6d4835)), closes [#1396](https://github.com/valor-software/ngx-bootstrap/issues/1396)


### Features

* **carousel:** Changed data structure to linked list. ([35102e6](https://github.com/valor-software/ngx-bootstrap/commit/35102e6))
* **carousel:** direct setting of an active slide. Applying ng-bootstrap tests ([c0f41cf](https://github.com/valor-software/ngx-bootstrap/commit/c0f41cf))
* **docs:** added api doc generator ([eff2740](https://github.com/valor-software/ngx-bootstrap/commit/eff2740))
* **docs:** popover docs ([e96dc5c](https://github.com/valor-software/ngx-bootstrap/commit/e96dc5c))
* **package:** bumped to ng 2.4 ([79c4267](https://github.com/valor-software/ngx-bootstrap/commit/79c4267))



<a name="1.1.16-7"></a>
## [1.1.16-7](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16-5...v1.1.16-7) (2016-12-17)


### Bug Fixes

* **aot:** removed static variables, should fix [#1307](https://github.com/valor-software/ngx-bootstrap/issues/1307) ([ce9812a](https://github.com/valor-software/ngx-bootstrap/commit/ce9812a))



<a name="1.1.16-5"></a>
## [1.1.16-5](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.16...v1.1.16-5) (2016-12-16)


### Bug Fixes

* **build:** fixed tslint issues ([a323690](https://github.com/valor-software/ngx-bootstrap/commit/a323690))
* **ci:** added build and link steps in pretest hook ([d813946](https://github.com/valor-software/ngx-bootstrap/commit/d813946))
* **ci:** karma test should work in travis now ([3d61d48](https://github.com/valor-software/ngx-bootstrap/commit/3d61d48))
* **ci:** let the karma pass ([5bb2619](https://github.com/valor-software/ngx-bootstrap/commit/5bb2619))
* **ci:** run linting before tests ([92e3ba5](https://github.com/valor-software/ngx-bootstrap/commit/92e3ba5))
* **config:** initial theme set to bs3 ([b83fd0d](https://github.com/valor-software/ngx-bootstrap/commit/b83fd0d)), closes [#1307](https://github.com/valor-software/ngx-bootstrap/issues/1307)
* **datepicker:** support reactive forms ([83fe9db](https://github.com/valor-software/ngx-bootstrap/commit/83fe9db)), closes [#893](https://github.com/valor-software/ngx-bootstrap/issues/893) [#1207](https://github.com/valor-software/ngx-bootstrap/issues/1207)
* **karma:** fix unit tests across the all supported browsers ([#1322](https://github.com/valor-software/ngx-bootstrap/issues/1322)) ([bd5a43a](https://github.com/valor-software/ngx-bootstrap/commit/bd5a43a))
* **karma.conf:** fix for incorrect definition of mime type of test.ts file ([#1332](https://github.com/valor-software/ngx-bootstrap/issues/1332)) ([b25f8d7](https://github.com/valor-software/ngx-bootstrap/commit/b25f8d7))
* **pager:** added support of reactive forms ([8daa4be](https://github.com/valor-software/ngx-bootstrap/commit/8daa4be))
* **pager:** fix aot compilation ([#1232](https://github.com/valor-software/ngx-bootstrap/issues/1232)) ([fd93f7b](https://github.com/valor-software/ngx-bootstrap/commit/fd93f7b))
* **pagination:** added support of reactive forms ([e4547e7](https://github.com/valor-software/ngx-bootstrap/commit/e4547e7))
* **rating:** added support of reactive forms ([7ba357e](https://github.com/valor-software/ngx-bootstrap/commit/7ba357e)), closes [#298](https://github.com/valor-software/ngx-bootstrap/issues/298)
* **timepicker:** make it compatible with reactive forms ([433c9f8](https://github.com/valor-software/ngx-bootstrap/commit/433c9f8))


### Features

* **access:** private access specifiers replaced by protected ([#1186](https://github.com/valor-software/ngx-bootstrap/issues/1186)) ([0d4e93b](https://github.com/valor-software/ngx-bootstrap/commit/0d4e93b))
* **accordion:** add config file for accordion component ([0838055](https://github.com/valor-software/ngx-bootstrap/commit/0838055))
* **bs4:** updated to alfa 5 Class name changes ([#1201](https://github.com/valor-software/ngx-bootstrap/issues/1201)) ([49197f0](https://github.com/valor-software/ngx-bootstrap/commit/49197f0))
* **build:** added script for creation demo/src/index-BS4.html file ([#1278](https://github.com/valor-software/ngx-bootstrap/issues/1278)) ([e840943](https://github.com/valor-software/ngx-bootstrap/commit/e840943))
* **build:** aot fixed ([c9d447f](https://github.com/valor-software/ngx-bootstrap/commit/c9d447f))
* **build:** ng test now working, applied workaroud >.< ([8eea379](https://github.com/valor-software/ngx-bootstrap/commit/8eea379))
* **build:** now using ngm build ([8126b06](https://github.com/valor-software/ngx-bootstrap/commit/8126b06))
* **buttons:** clean control value accessor impl ([0414afa](https://github.com/valor-software/ngx-bootstrap/commit/0414afa))
* **ci:** upload test coverage to codecov ([3d0923e](https://github.com/valor-software/ngx-bootstrap/commit/3d0923e))
* **component-helper:** removed completely ([de1d87c](https://github.com/valor-software/ngx-bootstrap/commit/de1d87c))
* **component-loader:** added resolve method ([ea1de3c](https://github.com/valor-software/ngx-bootstrap/commit/ea1de3c))
* **component-loader:** simplified show method usage ([0767edf](https://github.com/valor-software/ngx-bootstrap/commit/0767edf))
* **components:** new component loader provided ([3e53b7d](https://github.com/valor-software/ngx-bootstrap/commit/3e53b7d))
* **datepicker:** add configuration class for datepicker component and use it instead of hardcoded constants ([290214e](https://github.com/valor-software/ngx-bootstrap/commit/290214e))
* **datepicker:** disable datepicker dates based on dateDisabled property ([#799](https://github.com/valor-software/ngx-bootstrap/issues/799)) ([#1130](https://github.com/valor-software/ngx-bootstrap/issues/1130)) ([83452e1](https://github.com/valor-software/ngx-bootstrap/commit/83452e1))
* **demo:** fixed index for bs4 theme ([a26eb23](https://github.com/valor-software/ngx-bootstrap/commit/a26eb23))
* **docs:** Add "How to use with AoT compilation" ([#1273](https://github.com/valor-software/ngx-bootstrap/issues/1273)) ([a1f563e](https://github.com/valor-software/ngx-bootstrap/commit/a1f563e)), closes [#1270](https://github.com/valor-software/ngx-bootstrap/issues/1270) [#1188](https://github.com/valor-software/ngx-bootstrap/issues/1188)
* **docs:** modules imports usage updated ([b3b9a34](https://github.com/valor-software/ngx-bootstrap/commit/b3b9a34))
* **dropdown:** added config ([cf8b1be](https://github.com/valor-software/ngx-bootstrap/commit/cf8b1be))
* **modals:** replaced component helper usage with component loader ([1447fd3](https://github.com/valor-software/ngx-bootstrap/commit/1447fd3))
* **modules:** now all modules export .forRoot() static method with providers ([5d663b5](https://github.com/valor-software/ngx-bootstrap/commit/5d663b5))
* **ngm:** prepairing to release ([34e78c5](https://github.com/valor-software/ngx-bootstrap/commit/34e78c5))
* **package:** dependencies update ([b78085b](https://github.com/valor-software/ngx-bootstrap/commit/b78085b))
* **package:** ng2 and moment version bump ([333b876](https://github.com/valor-software/ngx-bootstrap/commit/333b876))
* **pager-tests:** added tests for pager component ([#1279](https://github.com/valor-software/ngx-bootstrap/issues/1279)) ([3970521](https://github.com/valor-software/ngx-bootstrap/commit/3970521))
* **progressbar:** add config file for progressbar component ([ec524fe](https://github.com/valor-software/ngx-bootstrap/commit/ec524fe))
* **tabs:** added config ([8137030](https://github.com/valor-software/ngx-bootstrap/commit/8137030))
* **testing:** extended testing matrix ([2b42f51](https://github.com/valor-software/ngx-bootstrap/commit/2b42f51))
* **tests:** add alert spec ([#1336](https://github.com/valor-software/ngx-bootstrap/issues/1336)) ([d78d8df](https://github.com/valor-software/ngx-bootstrap/commit/d78d8df))
* **tests:** added E2e saucelabs runner ([#1272](https://github.com/valor-software/ngx-bootstrap/issues/1272)) ([bce6120](https://github.com/valor-software/ngx-bootstrap/commit/bce6120))
* **timepicker:** added config to separate file ([e4a1b06](https://github.com/valor-software/ngx-bootstrap/commit/e4a1b06))
* **tooltip:** add ability for user to define custom events for triggering tooltip displaying ([a61b40b](https://github.com/valor-software/ngx-bootstrap/commit/a61b40b)), closes [#1215](https://github.com/valor-software/ngx-bootstrap/issues/1215)
* **tooltips:** add fade out effect ([#1266](https://github.com/valor-software/ngx-bootstrap/issues/1266)) ([9b69270](https://github.com/valor-software/ngx-bootstrap/commit/9b69270))
* **typeahead:** removed old injector usage ([#1321](https://github.com/valor-software/ngx-bootstrap/issues/1321)) ([a86c340](https://github.com/valor-software/ngx-bootstrap/commit/a86c340)), closes [#1318](https://github.com/valor-software/ngx-bootstrap/issues/1318)



<a name="1.1.16"></a>
## [1.1.16](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.15...v1.1.16) (2016-10-26)


### Bug Fixes

* **pagination:** temporary disabled pageBtnClass option ([49dd07f](https://github.com/valor-software/ngx-bootstrap/commit/49dd07f))



<a name="1.1.15"></a>
## [1.1.15](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.14...v1.1.15) (2016-10-26)


### Bug Fixes

* **doc:** formatYear instead of formatMear for the datepicker ([#1126](https://github.com/valor-software/ngx-bootstrap/issues/1126)) ([045573b](https://github.com/valor-software/ngx-bootstrap/commit/045573b))
* **modal:** hide bug in [#1144](https://github.com/valor-software/ngx-bootstrap/issues/1144) ([#1147](https://github.com/valor-software/ngx-bootstrap/issues/1147)) ([a3985c1](https://github.com/valor-software/ngx-bootstrap/commit/a3985c1))
* **tooltip:** fix `appendToBody` tooltip positioning ([#1158](https://github.com/valor-software/ngx-bootstrap/issues/1158)) ([#1159](https://github.com/valor-software/ngx-bootstrap/issues/1159)) ([0fd0a80](https://github.com/valor-software/ngx-bootstrap/commit/0fd0a80))
* **tooltip:** fix delayed tooltip display ([#1156](https://github.com/valor-software/ngx-bootstrap/issues/1156)) ([#1161](https://github.com/valor-software/ngx-bootstrap/issues/1161)) ([c6da387](https://github.com/valor-software/ngx-bootstrap/commit/c6da387))


### Features

* **datepicker:** Added configurable limit for amount of items displayed in a single row of monthpicker and yearpicker ([#1141](https://github.com/valor-software/ngx-bootstrap/issues/1141)) ([859afb2](https://github.com/valor-software/ngx-bootstrap/commit/859afb2))
* **e2e:** added more e2e test ([d56f560](https://github.com/valor-software/ngx-bootstrap/commit/d56f560)), closes [#1163](https://github.com/valor-software/ngx-bootstrap/issues/1163)
* **pagination:** allow setting of a custom css class on <li> ([#1115](https://github.com/valor-software/ngx-bootstrap/issues/1115)) ([235215c](https://github.com/valor-software/ngx-bootstrap/commit/235215c))
* **tooltip:** Make `appendToBody` work in Tooltip ([#1074](https://github.com/valor-software/ngx-bootstrap/issues/1074)) ([7e233b1](https://github.com/valor-software/ngx-bootstrap/commit/7e233b1))



<a name="1.1.14"></a>
## [1.1.14](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.14-1...v1.1.14) (2016-10-13)


### Bug Fixes

* **tooltip:** properties types ([b407012](https://github.com/valor-software/ngx-bootstrap/commit/b407012))


### Features

* **package:** relax peer dependecies to work with 2.x.x ([bc55a38](https://github.com/valor-software/ngx-bootstrap/commit/bc55a38))
* **tooltip:** added Tooltip delay functionality ([#1116](https://github.com/valor-software/ngx-bootstrap/issues/1116)) ([eb90e9a](https://github.com/valor-software/ngx-bootstrap/commit/eb90e9a))



<a name="1.1.14-1"></a>
## [1.1.14-1](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.14-0...v1.1.14-1) (2016-10-11)


### Bug Fixes

* **package:** fixed link to main file ([a515089](https://github.com/valor-software/ngx-bootstrap/commit/a515089))



<a name="1.1.14-0"></a>
## [1.1.14-0](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.13...v1.1.14-0) (2016-10-11)


### Features

* **build:** system.js bundles replaced with UMD bundles ([3e0a27d](https://github.com/valor-software/ngx-bootstrap/commit/3e0a27d))
* **UMD:** added UMD bundles ([a7554a8](https://github.com/valor-software/ngx-bootstrap/commit/a7554a8)), closes [#1098](https://github.com/valor-software/ngx-bootstrap/issues/1098)



<a name="1.1.13"></a>
## [1.1.13](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.13-1...v1.1.13) (2016-10-11)



<a name="1.1.13-1"></a>
## [1.1.13-1](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.13-0...v1.1.13-1) (2016-10-11)


### Bug Fixes

* **build:** export all internal classes so AoT can work without issues ([6e6be1a](https://github.com/valor-software/ngx-bootstrap/commit/6e6be1a)), closes [#1093](https://github.com/valor-software/ngx-bootstrap/issues/1093)



<a name="1.1.13-0"></a>
## [1.1.13-0](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.11...v1.1.13-0) (2016-10-10)


### Bug Fixes

* **helpers:** add a way to set root view component ref ([79d3335](https://github.com/valor-software/ngx-bootstrap/commit/79d3335)), closes [#1056](https://github.com/valor-software/ngx-bootstrap/issues/1056)
* **tooltip:** show & hide methods should not need any arguments ([#1099](https://github.com/valor-software/ngx-bootstrap/issues/1099)) ([b80c0b4](https://github.com/valor-software/ngx-bootstrap/commit/b80c0b4))



<a name="1.1.11"></a>
## [1.1.11](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.10...v1.1.11) (2016-10-07)


### Bug Fixes

* **datepicker:** do not emit selection done on ngModel changes ([7b24283](https://github.com/valor-software/ngx-bootstrap/commit/7b24283)), closes [#1095](https://github.com/valor-software/ngx-bootstrap/issues/1095)



<a name="1.1.10"></a>
## [1.1.10](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.9...v1.1.10) (2016-10-07)


### Bug Fixes

* **aot:** 2 more private methods made public ([0dbbf09](https://github.com/valor-software/ngx-bootstrap/commit/0dbbf09)), closes [#1093](https://github.com/valor-software/ngx-bootstrap/issues/1093)
* **typeahead:** onFocus should not need any arguments ([41f5834](https://github.com/valor-software/ngx-bootstrap/commit/41f5834))
* **typeahead:** use TypeaheadMatch model instead of any type ([ff5c219](https://github.com/valor-software/ngx-bootstrap/commit/ff5c219))


### Features

* **typeahead:** add grouping of typeahead options ([fdddbde](https://github.com/valor-software/ngx-bootstrap/commit/fdddbde))
* **typeahead:** introduce TypeaheadMatch model ([80fccab](https://github.com/valor-software/ngx-bootstrap/commit/80fccab))



<a name="1.1.9"></a>
## [1.1.9](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.8...v1.1.9) (2016-10-06)


### Bug Fixes

* **build:** All `@HostBinding` and `@HostListener` should be public ([#1086](https://github.com/valor-software/ngx-bootstrap/issues/1086)) ([3691757](https://github.com/valor-software/ngx-bootstrap/commit/3691757)), closes [#1080](https://github.com/valor-software/ngx-bootstrap/issues/1080)



<a name="1.1.8"></a>
## [1.1.8](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.7...v1.1.8) (2016-10-05)


### Bug Fixes

* **buttons:** all @Input() fields should be public ([c96ffd3](https://github.com/valor-software/ngx-bootstrap/commit/c96ffd3))



<a name="1.1.7"></a>
## [1.1.7](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.6...v1.1.7) (2016-10-05)


### Bug Fixes

* **module:** class exports added back ([3eaa9ad](https://github.com/valor-software/ngx-bootstrap/commit/3eaa9ad))



<a name="1.1.6"></a>
## [1.1.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.5...v1.1.6) (2016-10-04)


### Bug Fixes

* **build:** change properties privacy to use in factories ([19c0c61](https://github.com/valor-software/ngx-bootstrap/commit/19c0c61))
* **datepicker:** changing the date programatically selects the correct date ([#1041](https://github.com/valor-software/ngx-bootstrap/issues/1041)) ([fb6d532](https://github.com/valor-software/ngx-bootstrap/commit/fb6d532)), closes [#858](https://github.com/valor-software/ngx-bootstrap/issues/858)
* **datepicker:** fixed broken bindings for aria-labelby and ids ([#1055](https://github.com/valor-software/ngx-bootstrap/issues/1055)) ([26d9209](https://github.com/valor-software/ngx-bootstrap/commit/26d9209))
* **datepicker:** Fixing Colspan ([#1057](https://github.com/valor-software/ngx-bootstrap/issues/1057)) ([e71a8ae](https://github.com/valor-software/ngx-bootstrap/commit/e71a8ae))
* **datepicker:** imlement ReactiveForms setDisabledState for TimepickerComponent ([cd58c3b](https://github.com/valor-software/ngx-bootstrap/commit/cd58c3b)), closes [#1024](https://github.com/valor-software/ngx-bootstrap/issues/1024)
* **demo:** fixed tabs demo ([#1050](https://github.com/valor-software/ngx-bootstrap/issues/1050)) ([969a61a](https://github.com/valor-software/ngx-bootstrap/commit/969a61a))
* **export:** removed obsolete exports to avoid missusage ([6993e97](https://github.com/valor-software/ngx-bootstrap/commit/6993e97))
* **modal:** Call hideModal in ngOnDestroy if modal is shown ([#1038](https://github.com/valor-software/ngx-bootstrap/issues/1038)) ([b38db2a](https://github.com/valor-software/ngx-bootstrap/commit/b38db2a)), closes [#853](https://github.com/valor-software/ngx-bootstrap/issues/853) [#1051](https://github.com/valor-software/ngx-bootstrap/issues/1051) [#1052](https://github.com/valor-software/ngx-bootstrap/issues/1052)
* **package:** development files added to .npmignore ([887c6b2](https://github.com/valor-software/ngx-bootstrap/commit/887c6b2)), closes [#737](https://github.com/valor-software/ngx-bootstrap/issues/737)
* **pagination:** Fix disabled class on next and last buttons ([#1036](https://github.com/valor-software/ngx-bootstrap/issues/1036)) ([01f4759](https://github.com/valor-software/ngx-bootstrap/commit/01f4759)), closes [#922](https://github.com/valor-software/ngx-bootstrap/issues/922)
* **slider:** Slide shouldnt enforce text alignment ([#824](https://github.com/valor-software/ngx-bootstrap/issues/824)) ([ad2c5a6](https://github.com/valor-software/ngx-bootstrap/commit/ad2c5a6))
* **template:**  templates should not use es6 templates ([de26168](https://github.com/valor-software/ngx-bootstrap/commit/de26168))
* **typeahead:** Fix crash with `contenteditable` inputs ([47b9fb1](https://github.com/valor-software/ngx-bootstrap/commit/47b9fb1))
* **univeral:** added hacks for missing type keywords ([d20ccf1](https://github.com/valor-software/ngx-bootstrap/commit/d20ccf1)), closes [#964](https://github.com/valor-software/ngx-bootstrap/issues/964)
* **utils:** now attach to body should work for mixed ng1+ng2 apps ([99f15c8](https://github.com/valor-software/ngx-bootstrap/commit/99f15c8)), closes [#1069](https://github.com/valor-software/ngx-bootstrap/issues/1069) [#1056](https://github.com/valor-software/ngx-bootstrap/issues/1056)


### Features

* **build:** added config file for wallabyjs ([cec8bae](https://github.com/valor-software/ngx-bootstrap/commit/cec8bae))
* **build:** use ngc compiler to produce metadata ([afabb9d](https://github.com/valor-software/ngx-bootstrap/commit/afabb9d)), closes [#1060](https://github.com/valor-software/ngx-bootstrap/issues/1060) [#992](https://github.com/valor-software/ngx-bootstrap/issues/992) [#933](https://github.com/valor-software/ngx-bootstrap/issues/933)
* **buttons:** update radio button directive to work with ReactiveForms ([5d51939](https://github.com/valor-software/ngx-bootstrap/commit/5d51939)), closes [#1023](https://github.com/valor-software/ngx-bootstrap/issues/1023)
* **tabs:** added custom class option ([13fac37](https://github.com/valor-software/ngx-bootstrap/commit/13fac37)), closes [#766](https://github.com/valor-software/ngx-bootstrap/issues/766) [#842](https://github.com/valor-software/ngx-bootstrap/issues/842) [#842](https://github.com/valor-software/ngx-bootstrap/issues/842)
* **tooltip:** added tooltipStateChanged and exporting the directive ([#939](https://github.com/valor-software/ngx-bootstrap/issues/939)) ([650b4f7](https://github.com/valor-software/ngx-bootstrap/commit/650b4f7))



<a name="1.1.5"></a>
## [1.1.5](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.4...v1.1.5) (2016-09-16)


### Bug Fixes

* **modal:** fixing hack which gets root viewContainerRef to attach backdrop ([b5db597](https://github.com/valor-software/ngx-bootstrap/commit/b5db597)), closes [#975](https://github.com/valor-software/ngx-bootstrap/issues/975) [#854](https://github.com/valor-software/ngx-bootstrap/issues/854)



<a name="1.1.4"></a>
## [1.1.4](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.3...v1.1.4) (2016-09-15)



<a name="1.1.3"></a>
## [1.1.3](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.2...v1.1.3) (2016-09-14)


### Bug Fixes

* **modal:** should fix 'no provider for ...' exception ([4c3e4c9](https://github.com/valor-software/ngx-bootstrap/commit/4c3e4c9)), closes [#854](https://github.com/valor-software/ngx-bootstrap/issues/854) [#951](https://github.com/valor-software/ngx-bootstrap/issues/951)
* **tests:** "no provider" error when running tests ([#963](https://github.com/valor-software/ngx-bootstrap/issues/963)) ([8483615](https://github.com/valor-software/ngx-bootstrap/commit/8483615))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.1...v1.1.2) (2016-09-12)


### Bug Fixes

* **datepicker:** removed popup stub ([d1a7d09](https://github.com/valor-software/ngx-bootstrap/commit/d1a7d09))


### Features

* **forms:**  add export of FormsModule where [ngModel] selector is present ([#931](https://github.com/valor-software/ngx-bootstrap/issues/931)) ([b5c8448](https://github.com/valor-software/ngx-bootstrap/commit/b5c8448)), closes [#929](https://github.com/valor-software/ngx-bootstrap/issues/929) [#929](https://github.com/valor-software/ngx-bootstrap/issues/929)



<a name="1.1.1"></a>
## [1.1.1](https://github.com/valor-software/ngx-bootstrap/compare/v1.1.0...v1.1.1) (2016-09-02)


### Bug Fixes

* **dropdown:** toggle does not close when clicking directly on an icon in Chrome ([#851](https://github.com/valor-software/ngx-bootstrap/issues/851)) ([341dcf8](https://github.com/valor-software/ngx-bootstrap/commit/341dcf8)), closes [#658](https://github.com/valor-software/ngx-bootstrap/issues/658)
* **window:** fixed window usage ([0b7012a](https://github.com/valor-software/ngx-bootstrap/commit/0b7012a)), closes [#909](https://github.com/valor-software/ngx-bootstrap/issues/909) [#908](https://github.com/valor-software/ngx-bootstrap/issues/908) [#906](https://github.com/valor-software/ngx-bootstrap/issues/906)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.23...v1.1.0) (2016-09-01)


### Bug Fixes

* **build:** restore coverage reports ([#755](https://github.com/valor-software/ngx-bootstrap/issues/755)) ([26191eb](https://github.com/valor-software/ngx-bootstrap/commit/26191eb))
* **ci:** upload test coverage report to codecov ([#756](https://github.com/valor-software/ngx-bootstrap/issues/756)) ([4358773](https://github.com/valor-software/ngx-bootstrap/commit/4358773))
* **datepicker:** remove unused code ([#837](https://github.com/valor-software/ngx-bootstrap/issues/837)) ([fa22c98](https://github.com/valor-software/ngx-bootstrap/commit/fa22c98))
* **demo:** fixed accordion demo ([bd4cc96](https://github.com/valor-software/ngx-bootstrap/commit/bd4cc96)), closes [#399](https://github.com/valor-software/ngx-bootstrap/issues/399)
* **modals:** fixed modals fade in animation ([2b95c95](https://github.com/valor-software/ngx-bootstrap/commit/2b95c95)), closes [#687](https://github.com/valor-software/ngx-bootstrap/issues/687)


### Features

* **collpase:** add collapsed and expanded events to the collapse directive [#576](https://github.com/valor-software/ngx-bootstrap/issues/576) ([#779](https://github.com/valor-software/ngx-bootstrap/issues/779)) ([a6f9bb5](https://github.com/valor-software/ngx-bootstrap/commit/a6f9bb5))
* **dropdown:** added exportAs to dropdown directives ([#785](https://github.com/valor-software/ngx-bootstrap/issues/785)) ([66531c7](https://github.com/valor-software/ngx-bootstrap/commit/66531c7))
* **dropdown:** optionally add dropdown-toggle class ([#772](https://github.com/valor-software/ngx-bootstrap/issues/772)) ([52d3167](https://github.com/valor-software/ngx-bootstrap/commit/52d3167))
* **timepicker:** disabling meridian and hiding spinners if input is disabled ([#768](https://github.com/valor-software/ngx-bootstrap/issues/768)) ([a19c841](https://github.com/valor-software/ngx-bootstrap/commit/a19c841)), closes [#759](https://github.com/valor-software/ngx-bootstrap/issues/759)
* **tooltip:** add implementation for tooltipClass ([#664](https://github.com/valor-software/ngx-bootstrap/issues/664)) ([fa4475a](https://github.com/valor-software/ngx-bootstrap/commit/fa4475a))
* **tooltip:** html content as template ([#751](https://github.com/valor-software/ngx-bootstrap/issues/751)) ([6489e38](https://github.com/valor-software/ngx-bootstrap/commit/6489e38))
* **tooltip:** tooltip html content ([#724](https://github.com/valor-software/ngx-bootstrap/issues/724)) ([9070125](https://github.com/valor-software/ngx-bootstrap/commit/9070125))
* **typeahead:** adding custom item template ([#776](https://github.com/valor-software/ngx-bootstrap/issues/776)) ([1356ff7](https://github.com/valor-software/ngx-bootstrap/commit/1356ff7)), closes [#503](https://github.com/valor-software/ngx-bootstrap/issues/503) [#652](https://github.com/valor-software/ngx-bootstrap/issues/652)
* **typeahead:** adding support for nested properties and functions for typeaheadOptionField ([#777](https://github.com/valor-software/ngx-bootstrap/issues/777)) ([b24dabf](https://github.com/valor-software/ngx-bootstrap/commit/b24dabf)), closes [#135](https://github.com/valor-software/ngx-bootstrap/issues/135) [#523](https://github.com/valor-software/ngx-bootstrap/issues/523)



<a name="1.0.23"></a>
## [1.0.23](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.22...v1.0.23) (2016-07-14)


### Bug Fixes

* **build:** fix rxjs typings issues on build ([b4267aa](https://github.com/valor-software/ngx-bootstrap/commit/b4267aa))
* **dropdown:** Add the dropdown-menu class to dropdown menus ([1bc316f](https://github.com/valor-software/ngx-bootstrap/commit/1bc316f)), closes [#541](https://github.com/valor-software/ngx-bootstrap/issues/541) [#732](https://github.com/valor-software/ngx-bootstrap/issues/732)
* **modal:** injected DOCUMENT token is undefined ([48a9aa7](https://github.com/valor-software/ngx-bootstrap/commit/48a9aa7)), closes [#575](https://github.com/valor-software/ngx-bootstrap/issues/575)
* **typeahead:** Added form support ([#723](https://github.com/valor-software/ngx-bootstrap/issues/723)) ([fa54e46](https://github.com/valor-software/ngx-bootstrap/commit/fa54e46))


### Features

* **datepicker:** add emitting event when datepicker selection is done ([#733](https://github.com/valor-software/ngx-bootstrap/issues/733)) ([53c7fd1](https://github.com/valor-software/ngx-bootstrap/commit/53c7fd1))



<a name="1.0.22"></a>
## [1.0.22](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.21...v1.0.22) (2016-07-12)



<a name="1.0.21"></a>
## [1.0.21](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.20...v1.0.21) (2016-07-12)



<a name="1.0.20"></a>
## [1.0.20](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.19...v1.0.20) (2016-07-11)


### Bug Fixes

* **package:** removed peer dependency to router ([c661772](https://github.com/valor-software/ngx-bootstrap/commit/c661772))



<a name="1.0.19"></a>
## [1.0.19](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.17...v1.0.19) (2016-07-11)


### Bug Fixes

* **build:** emit helpers ([4771f6f](https://github.com/valor-software/ngx-bootstrap/commit/4771f6f))
* **build:** fixed prod build webpack config ([753cc67](https://github.com/valor-software/ngx-bootstrap/commit/753cc67))
* **demo:** add "dropdownMenu" ([#580](https://github.com/valor-software/ngx-bootstrap/issues/580)) ([686a96e](https://github.com/valor-software/ngx-bootstrap/commit/686a96e))
* **docs:** fix typo ([#612](https://github.com/valor-software/ngx-bootstrap/issues/612)) ([7ddd532](https://github.com/valor-software/ngx-bootstrap/commit/7ddd532))
* **docs:** nonInput is by default ([#581](https://github.com/valor-software/ngx-bootstrap/issues/581)) ([b23ced0](https://github.com/valor-software/ngx-bootstrap/commit/b23ced0))
* **dropdown:** explicitly markForCheck() ([#566](https://github.com/valor-software/ngx-bootstrap/issues/566)) ([0ce4328](https://github.com/valor-software/ngx-bootstrap/commit/0ce4328))
* **dropdown:** prop disabled renamed to isDisabled  ([#615](https://github.com/valor-software/ngx-bootstrap/issues/615)) ([8a1d6f8](https://github.com/valor-software/ngx-bootstrap/commit/8a1d6f8))
* **header-component:** fix style ([ccfe948](https://github.com/valor-software/ngx-bootstrap/commit/ccfe948))
* **modal:** don't hide on out click if backdrop === 'static' ([#629](https://github.com/valor-software/ngx-bootstrap/issues/629)) ([df85712](https://github.com/valor-software/ngx-bootstrap/commit/df85712)), closes [#574](https://github.com/valor-software/ngx-bootstrap/issues/574)
* **modal:** fix typo in MODAL_DIRECTIVES ([#630](https://github.com/valor-software/ngx-bootstrap/issues/630)) ([8c4c125](https://github.com/valor-software/ngx-bootstrap/commit/8c4c125))
* **modals:** modal backdrop and onclick events handling ([b39b856](https://github.com/valor-software/ngx-bootstrap/commit/b39b856)), closes [#687](https://github.com/valor-software/ngx-bootstrap/issues/687) [#703](https://github.com/valor-software/ngx-bootstrap/issues/703) [#708](https://github.com/valor-software/ngx-bootstrap/issues/708)
* **package:** include js map files in bundles ([1ffd2b4](https://github.com/valor-software/ngx-bootstrap/commit/1ffd2b4)), closes [#632](https://github.com/valor-software/ngx-bootstrap/issues/632)
* **readme:** alert component name fixed ([e9a1d04](https://github.com/valor-software/ngx-bootstrap/commit/e9a1d04)), closes [#552](https://github.com/valor-software/ngx-bootstrap/issues/552)
* **style:** fix top menu z-index ([e70e578](https://github.com/valor-software/ngx-bootstrap/commit/e70e578))
* **tests:** fix failing test for buttons and accordion ([8ea9c10](https://github.com/valor-software/ngx-bootstrap/commit/8ea9c10))
* **typeahead:** removed incorrect behavior to do ENTER behavior on TAB. TAB should simply skip to next field as expected. ([#715](https://github.com/valor-software/ngx-bootstrap/issues/715)) ([758ad1b](https://github.com/valor-software/ngx-bootstrap/commit/758ad1b)), closes [#686](https://github.com/valor-software/ngx-bootstrap/issues/686) [#490](https://github.com/valor-software/ngx-bootstrap/issues/490) [#689](https://github.com/valor-software/ngx-bootstrap/issues/689)


### Features

* **demo:** new build process with ng2-webpack-config ([5c8fcf1](https://github.com/valor-software/ngx-bootstrap/commit/5c8fcf1))
* **docs:** added modals section ([6ab3a07](https://github.com/valor-software/ngx-bootstrap/commit/6ab3a07))
* **docs:** applied new docs style ([d84211a](https://github.com/valor-software/ngx-bootstrap/commit/d84211a))
* **docs:** menues and contents updated ([2155df6](https://github.com/valor-software/ngx-bootstrap/commit/2155df6))
* **package:** angular updated to rc3, fix hash (active route) ([#636](https://github.com/valor-software/ngx-bootstrap/issues/636)) ([70a84cf](https://github.com/valor-software/ngx-bootstrap/commit/70a84cf))
* **typeahead:** rxjs version ([#584](https://github.com/valor-software/ngx-bootstrap/issues/584)) ([48b8abb](https://github.com/valor-software/ngx-bootstrap/commit/48b8abb)), closes [#536](https://github.com/valor-software/ngx-bootstrap/issues/536) [#637](https://github.com/valor-software/ngx-bootstrap/issues/637)


### BREAKING CHANGES

* **dropdown:** * dropdown property `disabled` renamed to `isDisabled`



<a name="1.0.17"></a>
## [1.0.17](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.16...v1.0.17) (2016-05-31)


### Bug Fixes

* **datepicker:** added ngOnChanges hook ([ecffdb0](https://github.com/valor-software/ngx-bootstrap/commit/ecffdb0)), closes [#543](https://github.com/valor-software/ngx-bootstrap/issues/543)
* **timepicker:** added null value validation ([f9ad7e7](https://github.com/valor-software/ngx-bootstrap/commit/f9ad7e7)), closes [#533](https://github.com/valor-software/ngx-bootstrap/issues/533)


### Features

* **modals:** added declarative modals component ([#564](https://github.com/valor-software/ngx-bootstrap/issues/564)) ([1d0903f](https://github.com/valor-software/ngx-bootstrap/commit/1d0903f)), closes [#29](https://github.com/valor-software/ngx-bootstrap/issues/29)
* **tooltip:** adds implementation to tooltipEnable ([#517](https://github.com/valor-software/ngx-bootstrap/issues/517)) ([1470892](https://github.com/valor-software/ngx-bootstrap/commit/1470892))



<a name="1.0.16"></a>
## [1.0.16](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.15...v1.0.16) (2016-05-06)


### Bug Fixes

* **build:** system.js bundler updated to rc.1 ([6945ad9](https://github.com/valor-software/ngx-bootstrap/commit/6945ad9))
* **collapse:** had to disable animation in order to update to rc.1 ([3443495](https://github.com/valor-software/ngx-bootstrap/commit/3443495))
* **collapse:** removed dependecy to animation builder ([fed473f](https://github.com/valor-software/ngx-bootstrap/commit/fed473f))
* **docs:** update to ButtonRadioDirective and ButtonCheckboxDirective ([#476](https://github.com/valor-software/ngx-bootstrap/issues/476)) ([2e2d79b](https://github.com/valor-software/ngx-bootstrap/commit/2e2d79b))


### Features

* **package:** upgrade ng2-bootstrap to rc.1 ([#481](https://github.com/valor-software/ngx-bootstrap/issues/481)) ([554be3d](https://github.com/valor-software/ngx-bootstrap/commit/554be3d)), closes [#482](https://github.com/valor-software/ngx-bootstrap/issues/482) [#472](https://github.com/valor-software/ngx-bootstrap/issues/472) [#477](https://github.com/valor-software/ngx-bootstrap/issues/477)



<a name="1.0.15"></a>
## [1.0.15](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.14...v1.0.15) (2016-04-28)


### Bug Fixes

* **buttons:** had incorrect import statement which breaks .d.ts and import ([67ee5b5](https://github.com/valor-software/ngx-bootstrap/commit/67ee5b5))
* **tooltip:** Fix tooltip arrows in bootstrap v4 ([b4250d4](https://github.com/valor-software/ngx-bootstrap/commit/b4250d4)), closes [#141](https://github.com/valor-software/ngx-bootstrap/issues/141)
* **universal:** now plays well with ng2 universal ([9d595d3](https://github.com/valor-software/ngx-bootstrap/commit/9d595d3)), closes [#61](https://github.com/valor-software/ngx-bootstrap/issues/61)



<a name="1.0.14"></a>
## [1.0.14](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.13...v1.0.14) (2016-04-26)


### Bug Fixes

* **accordion:** Panel isn't resizing after content has changed ([914ae1a](https://github.com/valor-software/ngx-bootstrap/commit/914ae1a)), closes [#454](https://github.com/valor-software/ngx-bootstrap/issues/454)
* **collapse:** Setting overflow back to visible in Collapse ([#433](https://github.com/valor-software/ngx-bootstrap/issues/433)) ([5c9434e](https://github.com/valor-software/ngx-bootstrap/commit/5c9434e)), closes [#372](https://github.com/valor-software/ngx-bootstrap/issues/372)
* **datepicker:** added support for null value ([8109dd2](https://github.com/valor-software/ngx-bootstrap/commit/8109dd2)), closes [#16](https://github.com/valor-software/ngx-bootstrap/issues/16) [#445](https://github.com/valor-software/ngx-bootstrap/issues/445)
* **datepicker:** If the date was set by ngModel it will be overwritten by default value ([6321253](https://github.com/valor-software/ngx-bootstrap/commit/6321253))
* **Tabset:** add tab-container class to the Tabset component for correct display ([2b951f7](https://github.com/valor-software/ngx-bootstrap/commit/2b951f7))


### Features

* **package:** updated angular2 to 0-beta.16 ([75b3568](https://github.com/valor-software/ngx-bootstrap/commit/75b3568))
* **typeahead:** show list of options on focuse when minLength=0 ([f1c1909](https://github.com/valor-software/ngx-bootstrap/commit/f1c1909)), closes [#187](https://github.com/valor-software/ngx-bootstrap/issues/187) [#413](https://github.com/valor-software/ngx-bootstrap/issues/413)



<a name="1.0.13"></a>
## [1.0.13](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.12...v1.0.13) (2016-04-15)


### Bug Fixes

* **typeahead:** blur event handler should not prevent item selection ([847d375](https://github.com/valor-software/ngx-bootstrap/commit/847d375)), closes [#403](https://github.com/valor-software/ngx-bootstrap/issues/403) [#418](https://github.com/valor-software/ngx-bootstrap/issues/418) [#356](https://github.com/valor-software/ngx-bootstrap/issues/356)



<a name="1.0.12"></a>
## [1.0.12](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.11...v1.0.12) (2016-04-15)


### Bug Fixes

* **typeahead:** Blur hide with timeout, to allow other events to be triggered. (fixes [#363](https://github.com/valor-software/ngx-bootstrap/issues/363)) ([1a719d0](https://github.com/valor-software/ngx-bootstrap/commit/1a719d0)), closes [#395](https://github.com/valor-software/ngx-bootstrap/issues/395) [#389](https://github.com/valor-software/ngx-bootstrap/issues/389)


### Features

* **deps:** upgrade to angular2 beta.15 ([00e6ad4](https://github.com/valor-software/ngx-bootstrap/commit/00e6ad4))



<a name="1.0.11"></a>
## [1.0.11](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.10...v1.0.11) (2016-04-08)


### Bug Fixes

* **build:** generate source maps for systemjs bundles (fixes [#367](https://github.com/valor-software/ngx-bootstrap/issues/367)) ([81e16b7](https://github.com/valor-software/ngx-bootstrap/commit/81e16b7))
* **demo:** added card clasess to pre tags in bs4 demo ([0dfe7b2](https://github.com/valor-software/ngx-bootstrap/commit/0dfe7b2))
* **lint:** added usage of tslint-config-valorsoft ([cad6af3](https://github.com/valor-software/ngx-bootstrap/commit/cad6af3))
* **lint:** enable tslint and codelyzer (fixes [#309](https://github.com/valor-software/ngx-bootstrap/issues/309)) ([b60ce40](https://github.com/valor-software/ngx-bootstrap/commit/b60ce40))
* **typeahead:** prevent form submition when typeahead selected (fixes [#359](https://github.com/valor-software/ngx-bootstrap/issues/359)) ([4297410](https://github.com/valor-software/ngx-bootstrap/commit/4297410))


### Features

* **package:** updated to angular2 beta.14 ([243585b](https://github.com/valor-software/ngx-bootstrap/commit/243585b))



<a name="1.0.10"></a>
## [1.0.10](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.9...v1.0.10) (2016-04-01)


### Features

* **package:** angular2 version updated to beta.13 ([91e4ad1](https://github.com/valor-software/ngx-bootstrap/commit/91e4ad1))



<a name="1.0.9"></a>
## [1.0.9](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.8...v1.0.9) (2016-03-31)


### Bug Fixes

* **collapse:** animate is not available for system.js ([867afb8](https://github.com/valor-software/ngx-bootstrap/commit/867afb8))



<a name="1.0.8"></a>
## [1.0.8](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.7...v1.0.8) (2016-03-30)


### Bug Fixes

* use synchronous event emitters as a workaround for dehydrated detector issues (see https://github.com/angular/angular/issues/6786) ([9c9f290](https://github.com/valor-software/ngx-bootstrap/commit/9c9f290))
* **build:** reduce typings pain ([686ef90](https://github.com/valor-software/ngx-bootstrap/commit/686ef90)), closes [#128](https://github.com/valor-software/ngx-bootstrap/issues/128) [#322](https://github.com/valor-software/ngx-bootstrap/issues/322)
* **carousel:** Fix Typescript 7030 error ([128db51](https://github.com/valor-software/ngx-bootstrap/commit/128db51))
* **demo:** including es6-shim and es6-promise (fixes [#194](https://github.com/valor-software/ngx-bootstrap/issues/194)) ([80b73b4](https://github.com/valor-software/ngx-bootstrap/commit/80b73b4))
* **dropdowns:** dropdown should close correctly when used in modals (fixes [#267](https://github.com/valor-software/ngx-bootstrap/issues/267), fixes [#221](https://github.com/valor-software/ngx-bootstrap/issues/221)) ([a7a02ff](https://github.com/valor-software/ngx-bootstrap/commit/a7a02ff))
* **ie9,10:** usage of [hidden] replaced with *ngIf (fixes [#238](https://github.com/valor-software/ngx-bootstrap/issues/238)) ([260e963](https://github.com/valor-software/ngx-bootstrap/commit/260e963))
* **tooltip:** fix tooltip after upgrade to angular2 2.0.0-beta.12 ([87a57f5](https://github.com/valor-software/ngx-bootstrap/commit/87a57f5))
* **tooltip:** updated for beta.12 (fixes [#296](https://github.com/valor-software/ngx-bootstrap/issues/296), closes [#332](https://github.com/valor-software/ngx-bootstrap/issues/332)) ([413c2f1](https://github.com/valor-software/ngx-bootstrap/commit/413c2f1))
* **typeahead:** Fixed potential error if value of typeahead is undefined. Fixes [#345](https://github.com/valor-software/ngx-bootstrap/issues/345) ([aeb2bc1](https://github.com/valor-software/ngx-bootstrap/commit/aeb2bc1))
* **typeahead:** Hide typeahead popup on blur. Fixes [#351](https://github.com/valor-software/ngx-bootstrap/issues/351) ([9c6f257](https://github.com/valor-software/ngx-bootstrap/commit/9c6f257))


### Features

* **collapse:** added animation, toggle\hide\show methods made public (closes [#348](https://github.com/valor-software/ngx-bootstrap/issues/348), fixes [#287](https://github.com/valor-software/ngx-bootstrap/issues/287)) ([2625b29](https://github.com/valor-software/ngx-bootstrap/commit/2625b29))
* **datepicker:** Added functionality to add a custom class to specific dates. Supports empty custom class. ([0f6389f](https://github.com/valor-software/ngx-bootstrap/commit/0f6389f))
* **package:** angular2 version updated to 2.0.0-beta.12 ([15c866f](https://github.com/valor-software/ngx-bootstrap/commit/15c866f))



<a name="1.0.7"></a>
## [1.0.7](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.6...v1.0.7) (2016-03-16)


### Bug Fixes

* **demo:** fix demo layout ([227ef4e](https://github.com/valor-software/ngx-bootstrap/commit/227ef4e))
* **progress:** progress bar now works with ng2 ([f970433](https://github.com/valor-software/ngx-bootstrap/commit/f970433))


### Features

* **pagination:** use inner html for pagination button text ([66cc008](https://github.com/valor-software/ngx-bootstrap/commit/66cc008))



<a name="1.0.6"></a>
## [1.0.6](https://github.com/valor-software/ngx-bootstrap/compare/v1.0.5...v1.0.6) (2016-03-09)


### Bug Fixes

* **datepicker-inner:** When changing view on datepicker, and going left and right, selected date ([97c8735](https://github.com/valor-software/ngx-bootstrap/commit/97c8735))
* **tooltip:** fix positioning of tooltip container ([5697574](https://github.com/valor-software/ngx-bootstrap/commit/5697574))


### Features

* **datepicker:** Added an attribute onlyCurrentMonth which if true will not show dates from previous and next month (to make a full week of 7 days). So it will show dates only from currently displayed month. ([529af20](https://github.com/valor-software/ngx-bootstrap/commit/529af20))



<a name="1.0.5"></a>
## [1.0.5](https://github.com/valor-software/ngx-bootstrap/compare/1.0.4...v1.0.5) (2016-02-25)


### Bug Fixes

* **daypicker:** glyphicon arrows, disable and colspan attributes ([e533ee9](https://github.com/valor-software/ngx-bootstrap/commit/e533ee9))
* **tabs:** destroy cycle, closes [#180](https://github.com/valor-software/ngx-bootstrap/issues/180) ([ae8c617](https://github.com/valor-software/ngx-bootstrap/commit/ae8c617))



<a name="1.0.4"></a>
## [1.0.4](https://github.com/valor-software/ngx-bootstrap/compare/1.0.1-beta.2...1.0.4) (2016-02-24)


### Bug Fixes

* **build:** fix npm start command, fixes [#113](https://github.com/valor-software/ngx-bootstrap/issues/113) ([217fe3a](https://github.com/valor-software/ngx-bootstrap/commit/217fe3a))
* **build:** rollback compression plugin version to 0.2, fixes [#103](https://github.com/valor-software/ngx-bootstrap/issues/103) ([3d59e2d](https://github.com/valor-software/ngx-bootstrap/commit/3d59e2d))
* **build:** updated to use ts 1.8.2, fixes [#116](https://github.com/valor-software/ngx-bootstrap/issues/116) ([206770b](https://github.com/valor-software/ngx-bootstrap/commit/206770b))
* **datepicker:** setting default value for SHOW_WEEKS ([aa09451](https://github.com/valor-software/ngx-bootstrap/commit/aa09451))
* **datepicker:** setting default value for SHOW_WEEKS ([f0079ad](https://github.com/valor-software/ngx-bootstrap/commit/f0079ad))
* **datepicker:** upgrade to beta 1, issue [#38](https://github.com/valor-software/ngx-bootstrap/issues/38) ([b1a5507](https://github.com/valor-software/ngx-bootstrap/commit/b1a5507))
* **daypicker:** text center align in bootstrap 4 ([dfd502f](https://github.com/valor-software/ngx-bootstrap/commit/dfd502f))
* **export:** all the correct directives are now properly exported ([b00a30b](https://github.com/valor-software/ngx-bootstrap/commit/b00a30b))
* **pager:** multiple times defined event numPages, fixes [#111](https://github.com/valor-software/ngx-bootstrap/issues/111), closes [#112](https://github.com/valor-software/ngx-bootstrap/issues/112) ([780eebd](https://github.com/valor-software/ngx-bootstrap/commit/780eebd))
* **pagination:** multiple triggering of pageChanged event, fix [#76](https://github.com/valor-software/ngx-bootstrap/issues/76), fix [#138](https://github.com/valor-software/ngx-bootstrap/issues/138), closes [#146](https://github.com/valor-software/ngx-bootstrap/issues/146) ([91c4ec4](https://github.com/valor-software/ngx-bootstrap/commit/91c4ec4))
* "outsideClick" still closed the dropdown on any click ([6348f72](https://github.com/valor-software/ngx-bootstrap/commit/6348f72)), closes [#124](https://github.com/valor-software/ngx-bootstrap/issues/124)


### Features

* allow two-way binding on `isOpen` ([674fcb7](https://github.com/valor-software/ngx-bootstrap/commit/674fcb7))
* **build:** update to use ng2 beta7 & use ts typings, fixes [#212](https://github.com/valor-software/ngx-bootstrap/issues/212) ([31e6300](https://github.com/valor-software/ngx-bootstrap/commit/31e6300))
* **datepicker:** datepicker fixed for 0-beta.2, closes [#120](https://github.com/valor-software/ngx-bootstrap/issues/120), fixes [#38](https://github.com/valor-software/ngx-bootstrap/issues/38) ([a3d9e1c](https://github.com/valor-software/ngx-bootstrap/commit/a3d9e1c))
* **dropdown:** implement "nonInput" auto-close mode ([94d9909](https://github.com/valor-software/ngx-bootstrap/commit/94d9909)), closes [/github.com/twbs/bootstrap/blob/a1bf344c4f041ad88acaf5b2b3777c733d3afe40/js/src/dropdown.js#L174-L176](https://github.com//github.com/twbs/bootstrap/blob/a1bf344c4f041ad88acaf5b2b3777c733d3afe40/js/src/dropdown.js/issues/L174-L176)
* **tabs:** removable tabs ([c465610](https://github.com/valor-software/ngx-bootstrap/commit/c465610))



<a name="1.0.1-beta.2"></a>
## [1.0.1-beta.2](https://github.com/valor-software/ngx-bootstrap/compare/3eab1e4...1.0.1-beta.2) (2016-01-25)


### Bug Fixes

* **demo:** replace ng-non-bindable with ngNonBindable ([2ef870a](https://github.com/valor-software/ngx-bootstrap/commit/2ef870a))
* **dropdown:** incorrect import from *.ts, fixes [#88](https://github.com/valor-software/ngx-bootstrap/issues/88) ([6eb42e1](https://github.com/valor-software/ngx-bootstrap/commit/6eb42e1))
* **pagination:** updating Pagination.totalPages ([df0c0f0](https://github.com/valor-software/ngx-bootstrap/commit/df0c0f0))


### Features

* **build:** works good with typescript@1.6 ([31c513b](https://github.com/valor-software/ngx-bootstrap/commit/31c513b))
* **ng 2.0.37:** ts errors fixed ([1e19f55](https://github.com/valor-software/ngx-bootstrap/commit/1e19f55))
* **typeahead:** ts style fixes ([3eab1e4](https://github.com/valor-software/ngx-bootstrap/commit/3eab1e4))



