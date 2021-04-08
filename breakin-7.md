1. Dropped huge mega bundle `ngx-bootstrap`, please import only components you are actually using
2. Dropped forRoot() ?
3. remove deprecated properties
4. remove deprecated datepicker

- ci: use heroku preview instances to test ssr
- nx: split docs into libs
- ng: fix schematics for ng 11

- root lib:
  - done: with .md
  - done: build sass assets
  - FIX for nx 11 (build and test schematics) 
ssr:
- https://blog.niteo.co/staging-like-its-2020/
- https://github.com/marketplace/actions/heroku-review-app-deployment-status
- merge in dev:
  - test sauce
  - test ssr 
- on npm version
#  - update package json and current version in assets 
  - gen api-docs
- on tag:
#  - update gh-pages
  - publish to npm
  - create release notes

- deploy and test SSR
  
- documentation:
  - update contribution documentation
  - remove links to surge

- testing
  - add image testing

- package:
  -update metadata

migration:
  - https://github.com/ngneat/spectator/blob/master/MIGRATION.md#moved-from-netbasalspectator-to-ngneatspectator

deprecate:
- surge.sh
- forRoot()

cypress:
  "cy:run:smoke": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress/integration",
  "cy:run:full": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress/full",
  "cy:run:all": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress --spec '**/*_spec.ts'",
  "cy:run:snapshot": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress/snapshot",

v8:
- bs5 support
- animation
- test: use collectCoverageFrom
- gen api-docs per lib

done:
- change gh-pages deployment to include base and disable hash page 404.html
- deploy scully
- nx: use local runner by default and nx-cloud in ci
- test: fix coverage and use relative imports of ngx-bootstrap modules
- test: update tests for jest runner
