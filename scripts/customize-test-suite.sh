#!/bin/bash

# USAGE:
# ./scripts/customize-test-suite.sh [first argument for demo] [second argument for src]

FN="./demo/src/environments/environment.qa.ts"

demo="$1"
src="$2"

# these commands assign first argument to demo value, second argument to src value
sed -i "s/\(demo: *\).*/demo: $1,/" ${FN}
sed -i "s/\(src: *\).*/src: $2/" ${FN}
