// tslint:disable:max-line-length max-file-line-count prefer-const forin prefer-template one-variable-per-declaration newline-before-return
// tslint:disable:binary-expression-operand-order comment-format one-line no-var-keyword object-literal-shorthand
// tslint:disable:variable-name no-shadowed-variable

import { assertEq } from '../test-helpers';
import { thBeLocale } from '../../i18n/th-be';

describe('locale: th-be', () => {
  it('prevalue should -543 of years', function () {
    assertEq(thBeLocale.preinput(new Date(2553, 1, 14)).getTime(), new Date(2010, 1, 14).getTime());
  });

  it('postvalue should +543 of years', function () {
    assertEq(thBeLocale.postvalue(new Date(2010, 1, 14)).getTime(), new Date(2553, 1, 14).getTime());
  });
});
