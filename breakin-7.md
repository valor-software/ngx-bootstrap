1. Dropped huge mega bundle `ngx-bootstrap`, please import only components you are actually using
2. Dropped forRoot() ?

- nx: use local runner by default and nx-cloud in ci
- ci: use heroku preview instances to test ssr
- nx: split docs into libs
- ng: fix schematics for ng 11
- test: update tests for jest runner
- test: fix coverage and use relative imports of ngx-bootstrap modules
- root lib:
#  - with .md
#  - build sass assets
  - FIX for nx 11 (build and test schematics) 
- merge in dev:
  - test sauce
  - test ssr 
  - add https://github.com/marketplace/actions/ci-skip-action
- on npm version
#  - update package json and current version in assets 
  - gen api-docs
- on tag:
  - update gh-pages
  - publish to npm
  - create release notes
  - add https://github.com/marketplace/actions/ci-skip-action
- gen api-docs per lib
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

done:
- change gh-pages deployment to include base and disable hash page 404.html
- deploy scully
  
