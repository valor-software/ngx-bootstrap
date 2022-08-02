#!/bin/bash

array=( utils positioning component-loader chronos locale mini-ngrx  accordion alert dropdown modal \
collapse progressbar tabs \
buttons pagination rating timepicker \
carousel datepicker popover sortable tooltip typeahead )
for i in "${array[@]}"
do
  ng generate @nrwl/angular:library --name=$i --style=css --buildable --importPath=ngx-bootstrap/$i \
    --publishable --skipPackageJson --strict --no-interactive
done

