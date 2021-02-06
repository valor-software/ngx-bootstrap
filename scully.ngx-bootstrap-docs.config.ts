import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: "./apps/ngx-bootstrap-docs/src",
  projectName: "ngx-bootstrap-docs",
  outDir: './dist/static/ngx-bootstrap',
  extraRoutes: ["/documentation", "/discover", "/accordion", "/alerts", "/buttons", "/carousel", "/collapse", "/datepicker", "/dropdowns", "/modals", "/pagination", "/popover", "/progressbar", "/rating", "/sortable", "/tabs", "/timepicker", "/tooltip", "/typeahead"],
  routes: {
  },
  guessParserOptions: {
    excludedFiles: ['src/app/app.routing.ts'],
  },
};
