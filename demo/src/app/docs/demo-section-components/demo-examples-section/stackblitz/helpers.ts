export function getComponentClassName(code: string): string | null {
  const className = code.match(/export class \w+/);
  if (className.length) {
    return className[0].split(' ').pop();
  }

  return null;
}

export function getTagName(code: string): string | null {
  const matches = code.match(/selector: '.+'/);

  return matches.length ? matches[0].substring(matches[0].indexOf('\'') + 1, matches[0].lastIndexOf('\'')) : null;
}

export function getTemplateFileName(code: string): string | null {
  const matches = code.match(/templateUrl: '.+'/);

  return matches.length ? matches[0].substring(matches[0].indexOf('/') + 1, matches[0].lastIndexOf('\'')) : null;
}

export function getCSSCodeDatepickerCustomClass() {
  return `::ng-deep .theme-green {
  .bs-datepicker-body {
    table {
      td {
        span.selected {
          background-color: #5cb85c !important;
        }
      }
    }
  }
}`;
}
