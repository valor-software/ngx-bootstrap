// todo: add support of offsets
// tslint:disable:no-bitwise
// FORMATTING
import { addFormatToken } from '../format-functions';
import { zeroFill } from '../utils';
import { addRegexToken, matchShortOffset } from '../parse/regex';
import { addParseToken} from '../parse/token';
import { DateParsingConfig } from '../create/parsing.types';
import { isNumber, isString, toInt } from '../utils/type-checks';
import { DateArray } from '../types';

function addOffsetFormatToken(token, separator) {
  addFormatToken(token, 0, 0, function (date: Date): string {
    let offset = getUTCOffset(date);
    let sign = '+';
    if (offset < 0) {
      offset = -offset;
      sign = '-';
    }

    return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
  });
}

addOffsetFormatToken('Z', ':');
addOffsetFormatToken('ZZ', '');

// PARSING

addRegexToken('Z', matchShortOffset);
addRegexToken('ZZ', matchShortOffset);
addParseToken(['Z', 'ZZ'], function (input: string, array: DateArray, config: DateParsingConfig): DateArray {
  config._useUTC = true;
  config._tzm = offsetFromString(matchShortOffset, input);

  return array;
});

// HELPERS

// timezone chunker
// '+10:00' > ['10',  '00']
// '-1530'  > ['-15', '30']
const chunkOffset = /([\+\-]|\d\d)/gi;

function offsetFromString(matcher: RegExp, str: string): number {
  const matches = (str || '').match(matcher);

  if (matches === null) {
    return null;
  }

  const chunk = matches[matches.length - 1];
  const parts = chunk.match(chunkOffset) || ['-', '0', '0'];
  const minutes = parseInt(parts[1], 10) * 60 + toInt(parts[2]);
  const _min = parts[0] === '+' ? minutes : -minutes;

  return minutes === 0 ? 0 : _min;
}

// Return a moment from input, that is local/utc/zone equivalent to model.
export function cloneWithOffset(input, model) {
  var res, diff;
  if (model._isUTC) {
    res = model.clone();
    diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
    // Use low-level api, because this fn is low-level api.
    res._d.setTime(res._d.valueOf() + diff);
    hooks.updateOffset(res, false);
    return res;
  } else {
    return createLocal(input).local();
  }
}

function getDateOffset(date: Date): number {
  // On Firefox.24 Date#getTimezoneOffset returns a floating point.
  // https://github.com/moment/moment/pull/1871
  return -Math.round(date.getTimezoneOffset() / 15) * 15;
}

// HOOKS

// This function will be called whenever a moment is mutated.
// It is intended to keep the offset in sync with the timezone.
// hooks.updateOffset = function () {};

// MOMENTS

// keepLocalTime = true means only change the timezone, without
// affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
// 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
// +0200, so we adjust the time as needed, to be valid.
//
// Keeping the time actually adds/subtracts (one hour)
// from the actual represented time. That is why we call updateOffset
// a second time. In case it wants us to change the offset again
// _changeInProgress == true case, then we have to adjust, because
// there is no such time in the given timezone.
/**
 * @deprecated
 */
export function getSetOffset(date: Date, input: number | string, keepLocalTime?: boolean, keepMinutes?: boolean, config?: DateParsingConfig): Date | number {
  // if (!this.isValid()) {
  //   return input != null ? this : NaN;
  // }
  if (input != null) {
    return setUTCOffset(date, input, keepLocalTime, keepMinutes, config);
  }

  return getUTCOffset(date, { _isUTC: config._isUTC });
  // return this._isUTC ? offset : getDateOffset(date);
}

export function getUTCOffset(date: Date, config?: DateParsingConfig): number {
  const offset = config._offset || 0;

  return config._isUTC ? offset : getDateOffset(date);
}

export function setUTCOffset(date: Date, input: number | string, keepLocalTime?: boolean, keepMinutes?: boolean, config?: DateParsingConfig): Date {
  let localAdjust;
  let _input = input;
  if (isString(_input)) {
    _input = offsetFromString(matchShortOffset, _input);
    if (_input === null) {
      return date;
    }
  }
  // else if
  if (isNumber(_input) && Math.abs(_input) < 16 && !keepMinutes) {
    _input = _input * 60;
  }

  if (!config._isUTC && keepLocalTime) {
    localAdjust = getDateOffset(date);
  }
  config._offset = _input;
  config._isUTC = true;
  if (localAdjust != null) {
    // todo: make it work
    // this.add(localAdjust, 'm');
  }
  if (offset !== _input) {
    if (!keepLocalTime || this._changeInProgress) {
      addSubtract(this, createDuration(_input - offset, 'm'), 1, false);
    } else if (!this._changeInProgress) {
      this._changeInProgress = true;
      hooks.updateOffset(this, true);
      this._changeInProgress = null;
    }
  }
}

export function getSetZone(input, keepLocalTime) {
  if (input != null) {
    if (typeof input !== 'string') {
      input = -input;
    }

    this.utcOffset(input, keepLocalTime);

    return this;
  } else {
    return -this.utcOffset();
  }
}

export function setOffsetToUTC(date: Date, keepLocalTime?: boolean): Date {
  // return utcOffset(date, 0, keepLocalTime);
  return getSetOffset(date, 0, keepLocalTime);
}

export function setOffsetToLocal(keepLocalTime) {
  if (this._isUTC) {
    this.utcOffset(0, keepLocalTime);
    this._isUTC = false;

    if (keepLocalTime) {
      this.subtract(getDateOffset(this), 'm');
    }
  }
  return this;
}

export function setOffsetToParsedOffset() {
  if (this._tzm != null) {
    this.utcOffset(this._tzm, false, true);
  } else if (typeof this._i === 'string') {
    var tZone = offsetFromString(matchOffset, this._i);
    if (tZone != null) {
      this.utcOffset(tZone);
    }
    else {
      this.utcOffset(0, true);
    }
  }
  return this;
}

export function hasAlignedHourOffset(input) {
  if (!this.isValid()) {
    return false;
  }
  input = input ? createLocal(input).utcOffset() : 0;

  return (this.utcOffset() - input) % 60 === 0;
}

export function isDaylightSavingTime() {
  return (
    this.utcOffset() > this.clone().month(0).utcOffset() ||
    this.utcOffset() > this.clone().month(5).utcOffset()
  );
}

export function isDaylightSavingTimeShifted() {
  if (!isUndefined(this._isDSTShifted)) {
    return this._isDSTShifted;
  }

  var c = {};

  copyConfig(c, this);
  c = prepareConfig(c);

  if (c._a) {
    var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
    this._isDSTShifted = this.isValid() &&
      compareArrays(c._a, other.toArray()) > 0;
  } else {
    this._isDSTShifted = false;
  }

  return this._isDSTShifted;
}

export function isLocal() {
  return this.isValid() ? !this._isUTC : false;
}

export function isUtcOffset() {
  return this.isValid() ? this._isUTC : false;
}

export function isUtc() {
  return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
