#!/usr/bin/env bash
# Remove when be fixed https://github.com/angular/angular/issues/22524

if grep -q 'if (sf\[`redirectInfo`\]) { sf = sf\[`redirectInfo`\].redirectTarget; }' node_modules/@angular/compiler-cli/src/ngtsc/typecheck/src/context.js; then
  echo "compiler-cli already fixed"
else
  sed -i '/var sf = this.transform(originalSf);/a if (sf[`redirectInfo`]) { sf = sf[`redirectInfo`].redirectTarget; }' node_modules/@angular/compiler-cli/src/ngtsc/typecheck/src/context.js
  echo "compiler-cli fixed"
fi
