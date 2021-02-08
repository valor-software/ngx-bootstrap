1. Dropped huge mega bundle `ngx-bootstrap`, please import only components you are actually using
2. Dropped forRoot() ?

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

- package:
  -update metadata

deprecate:
- surge.sh
- forRoot()

v8:
- bs5 support
- animation

done:
- change gh-pages deployment to include base and disable hash page 404.html
- deploy scully
  
