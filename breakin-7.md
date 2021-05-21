#### Done: 
  1. Dropped huge mega bundle `ngx-bootstrap`, please import only components you are actually using
  2. Update package json and current version in assets
  3. change gh-pages deployment to include base and disable hash page 404.html
  4. deploy scully
  5. nx: use local runner by default and nx-cloud in ci
  6. test: fix coverage and use relative imports of ngx-bootstrap modules
  7. test: update tests for jest runner

#### v7 release blockers:
  1. ng: fix schematics for ng 11 (FIX for nx 11 (build and test schematics))
     (@valorkin @danilov) ~2d
  2. root lib:
    - done: with .md
    - done: build sass assets
    - done: test sauce
  3. ~~Drop old versions from gh-pages, keep only latest major versions
     manual task, remember about 5.6.0 is actually latest
     (@2d) 1 day~~
  4. Split latest and next versions in docs (@2d) 1day
  5. Check that it works on npm version script (generate api-docs) (@qa) after we release RC version, deps on #6
  5. Review docs (.md)
    - update contribution documentation
    - remove links to surge
     (@2d+newbie as a part of onboarding 2-3day)
  6. github actions on tag(new version):
    - update gh-pages
    - publish to npm
    - create release notes
     (@valorkin 2-3 days)
   7. github actions cypress:
      ga on PR -> "cy:run:smoke": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress/integration",
      ga on `ready for testing` -> "cy:run:full": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress/full",
      (@valorkin 1d)

[comment]: <> (      "cy:run:all": "APPLITOOLS_CONCURRENCY=100 ../cypress run --config integrationFolder=cypress --spec '**/*_spec.ts'",)

#### To be discussed:
  1. Dropped forRoot() ?
  2. remove deprecated datepicker
  3. remove deprecated properties

#### v8:
- bs5 support
- animation
- test: use collectCoverageFrom
- nx: split docs into libs
  - split generated api docs into json per component

#### Nice to have:
- ssr:
  - ci: use heroku preview instances to test ssr
  - https://blog.niteo.co/staging-like-its-2020/
  - https://github.com/marketplace/actions/heroku-review-app-deployment-status
    - test ssr
  - add algolia search
  - restore testing of n-1 version of Angular (FB or surge.sh)
  - testing
    - add image testing
