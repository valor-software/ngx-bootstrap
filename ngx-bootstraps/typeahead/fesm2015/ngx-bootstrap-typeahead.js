import { ɵɵelement, ɵɵnextContext, ɵɵproperty, ɵɵsanitizeHtml, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵadvance, ɵɵtextInterpolate, ɵɵgetCurrentView, ɵɵlistener, ɵɵrestoreView, ɵɵtemplate, ɵɵreference, ɵɵclassProp, ɵɵpureFunction4, ɵɵstyleProp, EventEmitter, ɵɵdirectiveInject, Renderer2, ElementRef, ChangeDetectorRef, ɵɵdefineComponent, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵattribute, ɵɵtemplateRefExtractor, ɵsetClassMetadata, Component, Output, ViewChild, ViewChildren, HostListener, ɵɵdefineInjectable, Injectable, ViewContainerRef, ɵɵdefineDirective, Directive, Input, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { isBs3, Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgTemplateOutlet, NgForOf, NgIf, CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { isObservable, from } from 'rxjs';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { debounceTime, tap, switchMap, mergeMap, filter, toArray } from 'rxjs/operators';

/* tslint:disable */
const latinMap = {
    'Á': 'A',
    'Ă': 'A',
    'Ắ': 'A',
    'Ặ': 'A',
    'Ằ': 'A',
    'Ẳ': 'A',
    'Ẵ': 'A',
    'Ǎ': 'A',
    'Â': 'A',
    'Ấ': 'A',
    'Ậ': 'A',
    'Ầ': 'A',
    'Ẩ': 'A',
    'Ẫ': 'A',
    'Ä': 'A',
    'Ǟ': 'A',
    'Ȧ': 'A',
    'Ǡ': 'A',
    'Ạ': 'A',
    'Ȁ': 'A',
    'À': 'A',
    'Ả': 'A',
    'Ȃ': 'A',
    'Ā': 'A',
    'Ą': 'A',
    'Å': 'A',
    'Ǻ': 'A',
    'Ḁ': 'A',
    'Ⱥ': 'A',
    'Ã': 'A',
    'Ꜳ': 'AA',
    'Æ': 'AE',
    'Ǽ': 'AE',
    'Ǣ': 'AE',
    'Ꜵ': 'AO',
    'Ꜷ': 'AU',
    'Ꜹ': 'AV',
    'Ꜻ': 'AV',
    'Ꜽ': 'AY',
    'Ḃ': 'B',
    'Ḅ': 'B',
    'Ɓ': 'B',
    'Ḇ': 'B',
    'Ƀ': 'B',
    'Ƃ': 'B',
    'Ć': 'C',
    'Č': 'C',
    'Ç': 'C',
    'Ḉ': 'C',
    'Ĉ': 'C',
    'Ċ': 'C',
    'Ƈ': 'C',
    'Ȼ': 'C',
    'Ď': 'D',
    'Ḑ': 'D',
    'Ḓ': 'D',
    'Ḋ': 'D',
    'Ḍ': 'D',
    'Ɗ': 'D',
    'Ḏ': 'D',
    'ǲ': 'D',
    'ǅ': 'D',
    'Đ': 'D',
    'Ƌ': 'D',
    'Ǳ': 'DZ',
    'Ǆ': 'DZ',
    'É': 'E',
    'Ĕ': 'E',
    'Ě': 'E',
    'Ȩ': 'E',
    'Ḝ': 'E',
    'Ê': 'E',
    'Ế': 'E',
    'Ệ': 'E',
    'Ề': 'E',
    'Ể': 'E',
    'Ễ': 'E',
    'Ḙ': 'E',
    'Ë': 'E',
    'Ė': 'E',
    'Ẹ': 'E',
    'Ȅ': 'E',
    'È': 'E',
    'Ẻ': 'E',
    'Ȇ': 'E',
    'Ē': 'E',
    'Ḗ': 'E',
    'Ḕ': 'E',
    'Ę': 'E',
    'Ɇ': 'E',
    'Ẽ': 'E',
    'Ḛ': 'E',
    'Ꝫ': 'ET',
    'Ḟ': 'F',
    'Ƒ': 'F',
    'Ǵ': 'G',
    'Ğ': 'G',
    'Ǧ': 'G',
    'Ģ': 'G',
    'Ĝ': 'G',
    'Ġ': 'G',
    'Ɠ': 'G',
    'Ḡ': 'G',
    'Ǥ': 'G',
    'Ḫ': 'H',
    'Ȟ': 'H',
    'Ḩ': 'H',
    'Ĥ': 'H',
    'Ⱨ': 'H',
    'Ḧ': 'H',
    'Ḣ': 'H',
    'Ḥ': 'H',
    'Ħ': 'H',
    'Í': 'I',
    'Ĭ': 'I',
    'Ǐ': 'I',
    'Î': 'I',
    'Ï': 'I',
    'Ḯ': 'I',
    'İ': 'I',
    'Ị': 'I',
    'Ȉ': 'I',
    'Ì': 'I',
    'Ỉ': 'I',
    'Ȋ': 'I',
    'Ī': 'I',
    'Į': 'I',
    'Ɨ': 'I',
    'Ĩ': 'I',
    'Ḭ': 'I',
    'Ꝺ': 'D',
    'Ꝼ': 'F',
    'Ᵹ': 'G',
    'Ꞃ': 'R',
    'Ꞅ': 'S',
    'Ꞇ': 'T',
    'Ꝭ': 'IS',
    'Ĵ': 'J',
    'Ɉ': 'J',
    'Ḱ': 'K',
    'Ǩ': 'K',
    'Ķ': 'K',
    'Ⱪ': 'K',
    'Ꝃ': 'K',
    'Ḳ': 'K',
    'Ƙ': 'K',
    'Ḵ': 'K',
    'Ꝁ': 'K',
    'Ꝅ': 'K',
    'Ĺ': 'L',
    'Ƚ': 'L',
    'Ľ': 'L',
    'Ļ': 'L',
    'Ḽ': 'L',
    'Ḷ': 'L',
    'Ḹ': 'L',
    'Ⱡ': 'L',
    'Ꝉ': 'L',
    'Ḻ': 'L',
    'Ŀ': 'L',
    'Ɫ': 'L',
    'ǈ': 'L',
    'Ł': 'L',
    'Ǉ': 'LJ',
    'Ḿ': 'M',
    'Ṁ': 'M',
    'Ṃ': 'M',
    'Ɱ': 'M',
    'Ń': 'N',
    'Ň': 'N',
    'Ņ': 'N',
    'Ṋ': 'N',
    'Ṅ': 'N',
    'Ṇ': 'N',
    'Ǹ': 'N',
    'Ɲ': 'N',
    'Ṉ': 'N',
    'Ƞ': 'N',
    'ǋ': 'N',
    'Ñ': 'N',
    'Ǌ': 'NJ',
    'Ó': 'O',
    'Ŏ': 'O',
    'Ǒ': 'O',
    'Ô': 'O',
    'Ố': 'O',
    'Ộ': 'O',
    'Ồ': 'O',
    'Ổ': 'O',
    'Ỗ': 'O',
    'Ö': 'O',
    'Ȫ': 'O',
    'Ȯ': 'O',
    'Ȱ': 'O',
    'Ọ': 'O',
    'Ő': 'O',
    'Ȍ': 'O',
    'Ò': 'O',
    'Ỏ': 'O',
    'Ơ': 'O',
    'Ớ': 'O',
    'Ợ': 'O',
    'Ờ': 'O',
    'Ở': 'O',
    'Ỡ': 'O',
    'Ȏ': 'O',
    'Ꝋ': 'O',
    'Ꝍ': 'O',
    'Ō': 'O',
    'Ṓ': 'O',
    'Ṑ': 'O',
    'Ɵ': 'O',
    'Ǫ': 'O',
    'Ǭ': 'O',
    'Ø': 'O',
    'Ǿ': 'O',
    'Õ': 'O',
    'Ṍ': 'O',
    'Ṏ': 'O',
    'Ȭ': 'O',
    'Ƣ': 'OI',
    'Ꝏ': 'OO',
    'Ɛ': 'E',
    'Ɔ': 'O',
    'Ȣ': 'OU',
    'Ṕ': 'P',
    'Ṗ': 'P',
    'Ꝓ': 'P',
    'Ƥ': 'P',
    'Ꝕ': 'P',
    'Ᵽ': 'P',
    'Ꝑ': 'P',
    'Ꝙ': 'Q',
    'Ꝗ': 'Q',
    'Ŕ': 'R',
    'Ř': 'R',
    'Ŗ': 'R',
    'Ṙ': 'R',
    'Ṛ': 'R',
    'Ṝ': 'R',
    'Ȑ': 'R',
    'Ȓ': 'R',
    'Ṟ': 'R',
    'Ɍ': 'R',
    'Ɽ': 'R',
    'Ꜿ': 'C',
    'Ǝ': 'E',
    'Ś': 'S',
    'Ṥ': 'S',
    'Š': 'S',
    'Ṧ': 'S',
    'Ş': 'S',
    'Ŝ': 'S',
    'Ș': 'S',
    'Ṡ': 'S',
    'Ṣ': 'S',
    'Ṩ': 'S',
    'Ť': 'T',
    'Ţ': 'T',
    'Ṱ': 'T',
    'Ț': 'T',
    'Ⱦ': 'T',
    'Ṫ': 'T',
    'Ṭ': 'T',
    'Ƭ': 'T',
    'Ṯ': 'T',
    'Ʈ': 'T',
    'Ŧ': 'T',
    'Ɐ': 'A',
    'Ꞁ': 'L',
    'Ɯ': 'M',
    'Ʌ': 'V',
    'Ꜩ': 'TZ',
    'Ú': 'U',
    'Ŭ': 'U',
    'Ǔ': 'U',
    'Û': 'U',
    'Ṷ': 'U',
    'Ü': 'U',
    'Ǘ': 'U',
    'Ǚ': 'U',
    'Ǜ': 'U',
    'Ǖ': 'U',
    'Ṳ': 'U',
    'Ụ': 'U',
    'Ű': 'U',
    'Ȕ': 'U',
    'Ù': 'U',
    'Ủ': 'U',
    'Ư': 'U',
    'Ứ': 'U',
    'Ự': 'U',
    'Ừ': 'U',
    'Ử': 'U',
    'Ữ': 'U',
    'Ȗ': 'U',
    'Ū': 'U',
    'Ṻ': 'U',
    'Ų': 'U',
    'Ů': 'U',
    'Ũ': 'U',
    'Ṹ': 'U',
    'Ṵ': 'U',
    'Ꝟ': 'V',
    'Ṿ': 'V',
    'Ʋ': 'V',
    'Ṽ': 'V',
    'Ꝡ': 'VY',
    'Ẃ': 'W',
    'Ŵ': 'W',
    'Ẅ': 'W',
    'Ẇ': 'W',
    'Ẉ': 'W',
    'Ẁ': 'W',
    'Ⱳ': 'W',
    'Ẍ': 'X',
    'Ẋ': 'X',
    'Ý': 'Y',
    'Ŷ': 'Y',
    'Ÿ': 'Y',
    'Ẏ': 'Y',
    'Ỵ': 'Y',
    'Ỳ': 'Y',
    'Ƴ': 'Y',
    'Ỷ': 'Y',
    'Ỿ': 'Y',
    'Ȳ': 'Y',
    'Ɏ': 'Y',
    'Ỹ': 'Y',
    'Ź': 'Z',
    'Ž': 'Z',
    'Ẑ': 'Z',
    'Ⱬ': 'Z',
    'Ż': 'Z',
    'Ẓ': 'Z',
    'Ȥ': 'Z',
    'Ẕ': 'Z',
    'Ƶ': 'Z',
    'Ĳ': 'IJ',
    'Œ': 'OE',
    'ᴀ': 'A',
    'ᴁ': 'AE',
    'ʙ': 'B',
    'ᴃ': 'B',
    'ᴄ': 'C',
    'ᴅ': 'D',
    'ᴇ': 'E',
    'ꜰ': 'F',
    'ɢ': 'G',
    'ʛ': 'G',
    'ʜ': 'H',
    'ɪ': 'I',
    'ʁ': 'R',
    'ᴊ': 'J',
    'ᴋ': 'K',
    'ʟ': 'L',
    'ᴌ': 'L',
    'ᴍ': 'M',
    'ɴ': 'N',
    'ᴏ': 'O',
    'ɶ': 'OE',
    'ᴐ': 'O',
    'ᴕ': 'OU',
    'ᴘ': 'P',
    'ʀ': 'R',
    'ᴎ': 'N',
    'ᴙ': 'R',
    'ꜱ': 'S',
    'ᴛ': 'T',
    'ⱻ': 'E',
    'ᴚ': 'R',
    'ᴜ': 'U',
    'ᴠ': 'V',
    'ᴡ': 'W',
    'ʏ': 'Y',
    'ᴢ': 'Z',
    'á': 'a',
    'ă': 'a',
    'ắ': 'a',
    'ặ': 'a',
    'ằ': 'a',
    'ẳ': 'a',
    'ẵ': 'a',
    'ǎ': 'a',
    'â': 'a',
    'ấ': 'a',
    'ậ': 'a',
    'ầ': 'a',
    'ẩ': 'a',
    'ẫ': 'a',
    'ä': 'a',
    'ǟ': 'a',
    'ȧ': 'a',
    'ǡ': 'a',
    'ạ': 'a',
    'ȁ': 'a',
    'à': 'a',
    'ả': 'a',
    'ȃ': 'a',
    'ā': 'a',
    'ą': 'a',
    'ᶏ': 'a',
    'ẚ': 'a',
    'å': 'a',
    'ǻ': 'a',
    'ḁ': 'a',
    'ⱥ': 'a',
    'ã': 'a',
    'ꜳ': 'aa',
    'æ': 'ae',
    'ǽ': 'ae',
    'ǣ': 'ae',
    'ꜵ': 'ao',
    'ꜷ': 'au',
    'ꜹ': 'av',
    'ꜻ': 'av',
    'ꜽ': 'ay',
    'ḃ': 'b',
    'ḅ': 'b',
    'ɓ': 'b',
    'ḇ': 'b',
    'ᵬ': 'b',
    'ᶀ': 'b',
    'ƀ': 'b',
    'ƃ': 'b',
    'ɵ': 'o',
    'ć': 'c',
    'č': 'c',
    'ç': 'c',
    'ḉ': 'c',
    'ĉ': 'c',
    'ɕ': 'c',
    'ċ': 'c',
    'ƈ': 'c',
    'ȼ': 'c',
    'ď': 'd',
    'ḑ': 'd',
    'ḓ': 'd',
    'ȡ': 'd',
    'ḋ': 'd',
    'ḍ': 'd',
    'ɗ': 'd',
    'ᶑ': 'd',
    'ḏ': 'd',
    'ᵭ': 'd',
    'ᶁ': 'd',
    'đ': 'd',
    'ɖ': 'd',
    'ƌ': 'd',
    'ı': 'i',
    'ȷ': 'j',
    'ɟ': 'j',
    'ʄ': 'j',
    'ǳ': 'dz',
    'ǆ': 'dz',
    'é': 'e',
    'ĕ': 'e',
    'ě': 'e',
    'ȩ': 'e',
    'ḝ': 'e',
    'ê': 'e',
    'ế': 'e',
    'ệ': 'e',
    'ề': 'e',
    'ể': 'e',
    'ễ': 'e',
    'ḙ': 'e',
    'ë': 'e',
    'ė': 'e',
    'ẹ': 'e',
    'ȅ': 'e',
    'è': 'e',
    'ẻ': 'e',
    'ȇ': 'e',
    'ē': 'e',
    'ḗ': 'e',
    'ḕ': 'e',
    'ⱸ': 'e',
    'ę': 'e',
    'ᶒ': 'e',
    'ɇ': 'e',
    'ẽ': 'e',
    'ḛ': 'e',
    'ꝫ': 'et',
    'ḟ': 'f',
    'ƒ': 'f',
    'ᵮ': 'f',
    'ᶂ': 'f',
    'ǵ': 'g',
    'ğ': 'g',
    'ǧ': 'g',
    'ģ': 'g',
    'ĝ': 'g',
    'ġ': 'g',
    'ɠ': 'g',
    'ḡ': 'g',
    'ᶃ': 'g',
    'ǥ': 'g',
    'ḫ': 'h',
    'ȟ': 'h',
    'ḩ': 'h',
    'ĥ': 'h',
    'ⱨ': 'h',
    'ḧ': 'h',
    'ḣ': 'h',
    'ḥ': 'h',
    'ɦ': 'h',
    'ẖ': 'h',
    'ħ': 'h',
    'ƕ': 'hv',
    'í': 'i',
    'ĭ': 'i',
    'ǐ': 'i',
    'î': 'i',
    'ï': 'i',
    'ḯ': 'i',
    'ị': 'i',
    'ȉ': 'i',
    'ì': 'i',
    'ỉ': 'i',
    'ȋ': 'i',
    'ī': 'i',
    'į': 'i',
    'ᶖ': 'i',
    'ɨ': 'i',
    'ĩ': 'i',
    'ḭ': 'i',
    'ꝺ': 'd',
    'ꝼ': 'f',
    'ᵹ': 'g',
    'ꞃ': 'r',
    'ꞅ': 's',
    'ꞇ': 't',
    'ꝭ': 'is',
    'ǰ': 'j',
    'ĵ': 'j',
    'ʝ': 'j',
    'ɉ': 'j',
    'ḱ': 'k',
    'ǩ': 'k',
    'ķ': 'k',
    'ⱪ': 'k',
    'ꝃ': 'k',
    'ḳ': 'k',
    'ƙ': 'k',
    'ḵ': 'k',
    'ᶄ': 'k',
    'ꝁ': 'k',
    'ꝅ': 'k',
    'ĺ': 'l',
    'ƚ': 'l',
    'ɬ': 'l',
    'ľ': 'l',
    'ļ': 'l',
    'ḽ': 'l',
    'ȴ': 'l',
    'ḷ': 'l',
    'ḹ': 'l',
    'ⱡ': 'l',
    'ꝉ': 'l',
    'ḻ': 'l',
    'ŀ': 'l',
    'ɫ': 'l',
    'ᶅ': 'l',
    'ɭ': 'l',
    'ł': 'l',
    'ǉ': 'lj',
    'ſ': 's',
    'ẜ': 's',
    'ẛ': 's',
    'ẝ': 's',
    'ḿ': 'm',
    'ṁ': 'm',
    'ṃ': 'm',
    'ɱ': 'm',
    'ᵯ': 'm',
    'ᶆ': 'm',
    'ń': 'n',
    'ň': 'n',
    'ņ': 'n',
    'ṋ': 'n',
    'ȵ': 'n',
    'ṅ': 'n',
    'ṇ': 'n',
    'ǹ': 'n',
    'ɲ': 'n',
    'ṉ': 'n',
    'ƞ': 'n',
    'ᵰ': 'n',
    'ᶇ': 'n',
    'ɳ': 'n',
    'ñ': 'n',
    'ǌ': 'nj',
    'ó': 'o',
    'ŏ': 'o',
    'ǒ': 'o',
    'ô': 'o',
    'ố': 'o',
    'ộ': 'o',
    'ồ': 'o',
    'ổ': 'o',
    'ỗ': 'o',
    'ö': 'o',
    'ȫ': 'o',
    'ȯ': 'o',
    'ȱ': 'o',
    'ọ': 'o',
    'ő': 'o',
    'ȍ': 'o',
    'ò': 'o',
    'ỏ': 'o',
    'ơ': 'o',
    'ớ': 'o',
    'ợ': 'o',
    'ờ': 'o',
    'ở': 'o',
    'ỡ': 'o',
    'ȏ': 'o',
    'ꝋ': 'o',
    'ꝍ': 'o',
    'ⱺ': 'o',
    'ō': 'o',
    'ṓ': 'o',
    'ṑ': 'o',
    'ǫ': 'o',
    'ǭ': 'o',
    'ø': 'o',
    'ǿ': 'o',
    'õ': 'o',
    'ṍ': 'o',
    'ṏ': 'o',
    'ȭ': 'o',
    'ƣ': 'oi',
    'ꝏ': 'oo',
    'ɛ': 'e',
    'ᶓ': 'e',
    'ɔ': 'o',
    'ᶗ': 'o',
    'ȣ': 'ou',
    'ṕ': 'p',
    'ṗ': 'p',
    'ꝓ': 'p',
    'ƥ': 'p',
    'ᵱ': 'p',
    'ᶈ': 'p',
    'ꝕ': 'p',
    'ᵽ': 'p',
    'ꝑ': 'p',
    'ꝙ': 'q',
    'ʠ': 'q',
    'ɋ': 'q',
    'ꝗ': 'q',
    'ŕ': 'r',
    'ř': 'r',
    'ŗ': 'r',
    'ṙ': 'r',
    'ṛ': 'r',
    'ṝ': 'r',
    'ȑ': 'r',
    'ɾ': 'r',
    'ᵳ': 'r',
    'ȓ': 'r',
    'ṟ': 'r',
    'ɼ': 'r',
    'ᵲ': 'r',
    'ᶉ': 'r',
    'ɍ': 'r',
    'ɽ': 'r',
    'ↄ': 'c',
    'ꜿ': 'c',
    'ɘ': 'e',
    'ɿ': 'r',
    'ś': 's',
    'ṥ': 's',
    'š': 's',
    'ṧ': 's',
    'ş': 's',
    'ŝ': 's',
    'ș': 's',
    'ṡ': 's',
    'ṣ': 's',
    'ṩ': 's',
    'ʂ': 's',
    'ᵴ': 's',
    'ᶊ': 's',
    'ȿ': 's',
    'ɡ': 'g',
    'ᴑ': 'o',
    'ᴓ': 'o',
    'ᴝ': 'u',
    'ť': 't',
    'ţ': 't',
    'ṱ': 't',
    'ț': 't',
    'ȶ': 't',
    'ẗ': 't',
    'ⱦ': 't',
    'ṫ': 't',
    'ṭ': 't',
    'ƭ': 't',
    'ṯ': 't',
    'ᵵ': 't',
    'ƫ': 't',
    'ʈ': 't',
    'ŧ': 't',
    'ᵺ': 'th',
    'ɐ': 'a',
    'ᴂ': 'ae',
    'ǝ': 'e',
    'ᵷ': 'g',
    'ɥ': 'h',
    'ʮ': 'h',
    'ʯ': 'h',
    'ᴉ': 'i',
    'ʞ': 'k',
    'ꞁ': 'l',
    'ɯ': 'm',
    'ɰ': 'm',
    'ᴔ': 'oe',
    'ɹ': 'r',
    'ɻ': 'r',
    'ɺ': 'r',
    'ⱹ': 'r',
    'ʇ': 't',
    'ʌ': 'v',
    'ʍ': 'w',
    'ʎ': 'y',
    'ꜩ': 'tz',
    'ú': 'u',
    'ŭ': 'u',
    'ǔ': 'u',
    'û': 'u',
    'ṷ': 'u',
    'ü': 'u',
    'ǘ': 'u',
    'ǚ': 'u',
    'ǜ': 'u',
    'ǖ': 'u',
    'ṳ': 'u',
    'ụ': 'u',
    'ű': 'u',
    'ȕ': 'u',
    'ù': 'u',
    'ủ': 'u',
    'ư': 'u',
    'ứ': 'u',
    'ự': 'u',
    'ừ': 'u',
    'ử': 'u',
    'ữ': 'u',
    'ȗ': 'u',
    'ū': 'u',
    'ṻ': 'u',
    'ų': 'u',
    'ᶙ': 'u',
    'ů': 'u',
    'ũ': 'u',
    'ṹ': 'u',
    'ṵ': 'u',
    'ᵫ': 'ue',
    'ꝸ': 'um',
    'ⱴ': 'v',
    'ꝟ': 'v',
    'ṿ': 'v',
    'ʋ': 'v',
    'ᶌ': 'v',
    'ⱱ': 'v',
    'ṽ': 'v',
    'ꝡ': 'vy',
    'ẃ': 'w',
    'ŵ': 'w',
    'ẅ': 'w',
    'ẇ': 'w',
    'ẉ': 'w',
    'ẁ': 'w',
    'ⱳ': 'w',
    'ẘ': 'w',
    'ẍ': 'x',
    'ẋ': 'x',
    'ᶍ': 'x',
    'ý': 'y',
    'ŷ': 'y',
    'ÿ': 'y',
    'ẏ': 'y',
    'ỵ': 'y',
    'ỳ': 'y',
    'ƴ': 'y',
    'ỷ': 'y',
    'ỿ': 'y',
    'ȳ': 'y',
    'ẙ': 'y',
    'ɏ': 'y',
    'ỹ': 'y',
    'ź': 'z',
    'ž': 'z',
    'ẑ': 'z',
    'ʑ': 'z',
    'ⱬ': 'z',
    'ż': 'z',
    'ẓ': 'z',
    'ȥ': 'z',
    'ẕ': 'z',
    'ᵶ': 'z',
    'ᶎ': 'z',
    'ʐ': 'z',
    'ƶ': 'z',
    'ɀ': 'z',
    'ﬀ': 'ff',
    'ﬃ': 'ffi',
    'ﬄ': 'ffl',
    'ﬁ': 'fi',
    'ﬂ': 'fl',
    'ĳ': 'ij',
    'œ': 'oe',
    'ﬆ': 'st',
    'ₐ': 'a',
    'ₑ': 'e',
    'ᵢ': 'i',
    'ⱼ': 'j',
    'ₒ': 'o',
    'ᵣ': 'r',
    'ᵤ': 'u',
    'ᵥ': 'v',
    'ₓ': 'x'
};

class TypeaheadOptions {
    constructor(options) {
        Object.assign(this, options);
    }
}

class TypeaheadMatch {
    // tslint:disable-next-line:no-any
    constructor(item, value = item, header = false) {
        this.item = item;
        this.value = value;
        this.header = header;
    }
    isHeader() {
        return this.header;
    }
    toString() {
        return this.value;
    }
}

class TypeaheadOrder {
}

function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
/* tslint:disable */
function tokenize(str, wordRegexDelimiters = ' ', phraseRegexDelimiters = '', delimitersForMultipleSearch) {
    let result = [];
    if (!delimitersForMultipleSearch) {
        result = tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters);
    }
    else {
        const multipleSearchRegexStr = `([${delimitersForMultipleSearch}]+)`;
        const delimitedTokens = str.split(new RegExp(multipleSearchRegexStr, 'g'));
        const lastToken = delimitedTokens[delimitedTokens.length - 1];
        if (lastToken > '') {
            if (wordRegexDelimiters && phraseRegexDelimiters) {
                result = tokenizeWordsAndPhrases(lastToken, wordRegexDelimiters, phraseRegexDelimiters);
            }
            else {
                result.push(lastToken);
            }
        }
    }
    return result;
}
function tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters) {
    const result = [];
    /* tslint:enable */
    const regexStr = `(?:[${phraseRegexDelimiters}])([^${phraseRegexDelimiters}]+)` +
        `(?:[${phraseRegexDelimiters}])|([^${wordRegexDelimiters}]+)`;
    const preTokenized = str.split(new RegExp(regexStr, 'g'));
    const preTokenizedLength = preTokenized.length;
    let token;
    const replacePhraseDelimiters = new RegExp(`[${phraseRegexDelimiters}]+`, 'g');
    for (let i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
// tslint:disable-next-line:no-any
function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        const functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    const properties = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    const propertiesArray = properties.split('.');
    for (const property of propertiesArray) {
        if (property in object) {
            // tslint:disable-next-line
            object = object[property];
        }
    }
    if (!object) {
        return '';
    }
    return object.toString();
}

const TYPEAHEAD_ANIMATION_TIMING = '220ms cubic-bezier(0, 0, 0.2, 1)';
const typeaheadAnimation = trigger('typeaheadAnimation', [
    state('animated-down', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-down', [
        style({ height: 0, overflow: 'hidden' }),
        animate(TYPEAHEAD_ANIMATION_TIMING)
    ]),
    state('animated-up', style({ height: '*', overflow: 'hidden' })),
    transition('* => animated-up', [
        style({ height: '*', overflow: 'hidden' }),
        animate(TYPEAHEAD_ANIMATION_TIMING)
    ]),
    transition('* => unanimated', animate('0s'))
]);

// tslint:disable:max-file-line-count max-line-length
const _c0 = ["ulElement"];
const _c1 = ["liElements"];
function TypeaheadContainerComponent_ng_template_0_Template(rf, ctx) { }
function TypeaheadContainerComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "span", 4);
} if (rf & 2) {
    const match_r7 = ctx.match;
    const query_r8 = ctx.query;
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty("innerHtml", ctx_r2.highlight(match_r7, query_r8), ɵɵsanitizeHtml);
} }
function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "li", 10, 11);
    ɵɵtext(2);
    ɵɵelementEnd();
} if (rf & 2) {
    const match_r11 = ɵɵnextContext().$implicit;
    ɵɵadvance(2);
    ɵɵtextInterpolate(match_r11);
} }
function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_ng_template_3_Template(rf, ctx) { }
const _c2 = function (a0, a1, a2, a3) { return { item: a0, index: a1, match: a2, query: a3 }; };
function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template(rf, ctx) { if (rf & 1) {
    const _r21 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 12, 11);
    ɵɵlistener("mouseenter", function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template_li_mouseenter_0_listener() { ɵɵrestoreView(_r21); const match_r11 = ɵɵnextContext().$implicit; const ctx_r19 = ɵɵnextContext(2); return ctx_r19.selectActive(match_r11); });
    ɵɵelementStart(2, "a", 13);
    ɵɵlistener("click", function TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template_a_click_2_listener($event) { ɵɵrestoreView(_r21); const match_r11 = ɵɵnextContext().$implicit; const ctx_r22 = ɵɵnextContext(2); return ctx_r22.selectMatch(match_r11, $event); });
    ɵɵtemplate(3, TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_ng_template_3_Template, 0, 0, "ng-template", 0);
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r24 = ɵɵnextContext();
    const match_r11 = ctx_r24.$implicit;
    const i_r12 = ctx_r24.index;
    const ctx_r14 = ɵɵnextContext(2);
    const _r1 = ɵɵreference(2);
    ɵɵclassProp("active", ctx_r14.isActive(match_r11));
    ɵɵproperty("id", ctx_r14.popupId + "-" + i_r12)("@typeaheadAnimation", ctx_r14.animationState);
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", ctx_r14.itemTemplate || _r1)("ngTemplateOutletContext", ɵɵpureFunction4(6, _c2, match_r11.item, i_r12, match_r11, ctx_r14.query));
} }
function TypeaheadContainerComponent_ng_template_3_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_3_ng_template_2_li_0_Template, 3, 1, "li", 8);
    ɵɵtemplate(1, TypeaheadContainerComponent_ng_template_3_ng_template_2_li_1_Template, 4, 11, "li", 9);
} if (rf & 2) {
    const match_r11 = ctx.$implicit;
    ɵɵproperty("ngIf", match_r11.isHeader());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !match_r11.isHeader());
} }
function TypeaheadContainerComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "ul", 5, 6);
    ɵɵtemplate(2, TypeaheadContainerComponent_ng_template_3_ng_template_2_Template, 2, 2, "ng-template", 7);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = ɵɵnextContext();
    ɵɵstyleProp("overflow-y", ctx_r4.needScrollbar ? "scroll" : "auto")("height", ctx_r4.needScrollbar ? ctx_r4.guiHeight : "auto");
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", ctx_r4.matches);
} }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_h6_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "h6", 10);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const match_r26 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵtextInterpolate(match_r26);
} }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_ng_template_2_Template(rf, ctx) { }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r35 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 15, 11);
    ɵɵlistener("click", function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template_button_click_0_listener($event) { ɵɵrestoreView(_r35); const match_r26 = ɵɵnextContext().$implicit; const ctx_r33 = ɵɵnextContext(2); return ctx_r33.selectMatch(match_r26, $event); })("mouseenter", function TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template_button_mouseenter_0_listener() { ɵɵrestoreView(_r35); const match_r26 = ɵɵnextContext().$implicit; const ctx_r36 = ɵɵnextContext(2); return ctx_r36.selectActive(match_r26); });
    ɵɵtemplate(2, TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_ng_template_2_Template, 0, 0, "ng-template", 0);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r38 = ɵɵnextContext();
    const match_r26 = ctx_r38.$implicit;
    const i_r27 = ctx_r38.index;
    const ctx_r29 = ɵɵnextContext(2);
    const _r1 = ɵɵreference(2);
    ɵɵclassProp("active", ctx_r29.isActive(match_r26));
    ɵɵproperty("id", ctx_r29.popupId + "-" + i_r27)("@typeaheadAnimation", ctx_r29.animationState);
    ɵɵadvance(2);
    ɵɵproperty("ngTemplateOutlet", ctx_r29.itemTemplate || _r1)("ngTemplateOutletContext", ɵɵpureFunction4(6, _c2, match_r26.item, i_r27, match_r26, ctx_r29.query));
} }
function TypeaheadContainerComponent_ng_template_5_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_5_ng_template_0_h6_0_Template, 2, 1, "h6", 8);
    ɵɵtemplate(1, TypeaheadContainerComponent_ng_template_5_ng_template_0_ng_template_1_Template, 3, 11, "ng-template", 14);
} if (rf & 2) {
    const match_r26 = ctx.$implicit;
    ɵɵproperty("ngIf", match_r26.isHeader());
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !match_r26.isHeader());
} }
function TypeaheadContainerComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_5_ng_template_0_Template, 2, 2, "ng-template", 7);
} if (rf & 2) {
    const ctx_r6 = ɵɵnextContext();
    ɵɵproperty("ngForOf", ctx_r6.matches);
} }
const _c3 = function (a0, a1, a2, a3) { return { matches: a0, itemTemplate: a1, query: a2, $implicit: a3 }; };
let nextWindowId = 0;
class TypeaheadContainerComponent {
    constructor(positionService, renderer, element, changeDetectorRef) {
        this.positionService = positionService;
        this.renderer = renderer;
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        // tslint:disable-next-line: no-output-rename
        this.activeChangeEvent = new EventEmitter();
        this.isFocused = false;
        this.height = 0;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._matches = [];
        this.isScrolledIntoView = function (elem) {
            const containerViewTop = this.ulElement.nativeElement.scrollTop;
            const containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
            const elemTop = elem.offsetTop;
            const elemBottom = elemTop + elem.offsetHeight;
            return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
        };
        this.renderer.setAttribute(this.element.nativeElement, 'id', this.popupId);
        this.positionServiceSubscription = this.positionService.event$.subscribe(() => {
            if (this.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                this.changeDetectorRef.detectChanges();
                return;
            }
            this.animationState = 'unanimated';
            this.changeDetectorRef.detectChanges();
        });
    }
    get isBs4() {
        return !isBs3();
    }
    get typeaheadTemplateMethods() {
        /* tslint:disable:no-this-assignment */
        const _that = this;
        return {
            selectMatch: this.selectMatch.bind(_that),
            selectActive: this.selectActive.bind(_that),
            isActive: this.isActive.bind(_that)
        };
    }
    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.activeChanged();
    }
    get matches() {
        return this._matches;
    }
    set matches(value) {
        this.positionService.setOptions({
            modifiers: { flip: { enabled: this.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._matches = value;
        this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
        if (this.typeaheadScrollable) {
            setTimeout(() => {
                this.setScrollableMode();
            });
        }
        if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
            this.setActive(this._matches[0]);
            if (this._active.isHeader()) {
                this.nextActiveMatch();
            }
        }
        if (this._active && !this.typeaheadIsFirstItemActive) {
            const concurrency = this._matches.find(match => match.value === this._active.value);
            if (concurrency) {
                this.selectActive(concurrency);
                return;
            }
            this.active = null;
        }
    }
    get isTopPosition() {
        return this.element.nativeElement.classList.contains('top');
    }
    // tslint:disable-next-line:no-any
    get optionsListTemplate() {
        return this.parent ? this.parent.optionsListTemplate : undefined;
    }
    get isAnimated() {
        return this.parent ? this.parent.isAnimated : false;
    }
    get adaptivePosition() {
        return this.parent ? this.parent.adaptivePosition : false;
    }
    get typeaheadScrollable() {
        return this.parent ? this.parent.typeaheadScrollable : false;
    }
    get typeaheadOptionsInScrollableView() {
        return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
    }
    get typeaheadIsFirstItemActive() {
        return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
    }
    // tslint:disable-next-line:no-any
    get itemTemplate() {
        return this.parent ? this.parent.typeaheadItemTemplate : undefined;
    }
    selectActiveMatch(isActiveItemChanged) {
        if (this._active && this.parent.typeaheadSelectFirstItem) {
            this.selectMatch(this._active);
        }
        if (!this.parent.typeaheadSelectFirstItem && isActiveItemChanged) {
            this.selectMatch(this._active);
        }
    }
    activeChanged() {
        const index = this.matches.indexOf(this._active);
        this.activeChangeEvent.emit(`${this.popupId}-${index}`);
    }
    prevActiveMatch() {
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1]);
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    }
    nextActiveMatch() {
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1]);
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    }
    selectActive(value) {
        this.isFocused = true;
        this.setActive(value);
    }
    highlight(match, query) {
        let itemStr = match.value;
        let itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        let startIdx;
        let tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            const queryLen = query.length;
            for (let i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                            `${itemStr.substring(startIdx + tokenLen)}`;
                    itemStrHelper =
                        `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
                            `${itemStrHelper.substring(startIdx + tokenLen)}`;
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                        `${itemStr.substring(startIdx + tokenLen)}`;
            }
        }
        return itemStr;
    }
    focusLost() {
        this.isFocused = false;
        this.setActive(null);
    }
    isActive(value) {
        return this.active === value;
    }
    selectMatch(value, e = void 0) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(() => this.parent.typeaheadOnSelect.emit(value), 0);
        return false;
    }
    setScrollableMode() {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements.first) {
            const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                .replace('px', ''));
            const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                .replace('px', ''));
            const optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                .replace('px', ''));
            const height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    }
    scrollPrevious(index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements) {
            const liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    }
    scrollNext(index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements) {
            const liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        Number(this.ulElement.nativeElement.offsetHeight) +
                        Number(liElement.nativeElement.offsetHeight);
            }
        }
    }
    ngOnDestroy() {
        this.positionServiceSubscription.unsubscribe();
    }
    setActive(value) {
        this._active = value;
        let preview = value;
        if ((this._active === null) || (this._active.isHeader())) {
            preview = null;
        }
        this.parent.typeaheadOnPreview.emit(preview);
    }
    scrollToBottom() {
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    }
    scrollToTop() {
        this.ulElement.nativeElement.scrollTop = 0;
    }
}
TypeaheadContainerComponent.ɵfac = function TypeaheadContainerComponent_Factory(t) { return new (t || TypeaheadContainerComponent)(ɵɵdirectiveInject(PositioningService), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ChangeDetectorRef)); };
TypeaheadContainerComponent.ɵcmp = ɵɵdefineComponent({ type: TypeaheadContainerComponent, selectors: [["typeahead-container"]], viewQuery: function TypeaheadContainerComponent_Query(rf, ctx) { if (rf & 1) {
        ɵɵviewQuery(_c0, 1);
        ɵɵviewQuery(_c1, 1);
    } if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.ulElement = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.liElements = _t);
    } }, hostAttrs: [1, "dropdown", "open", "bottom", 2, "position", "absolute", "display", "block"], hostVars: 9, hostBindings: function TypeaheadContainerComponent_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("mouseleave", function TypeaheadContainerComponent_mouseleave_HostBindingHandler() { return ctx.focusLost(); })("blur", function TypeaheadContainerComponent_blur_HostBindingHandler() { return ctx.focusLost(); });
    } if (rf & 2) {
        ɵɵattribute("role", ctx.isBs4 ? "listbox" : null);
        ɵɵstyleProp("height", ctx.isBs4 && ctx.needScrollbar ? ctx.guiHeight : "auto")("visibility", "inherit");
        ɵɵclassProp("dropdown-menu", ctx.isBs4)("dropup", ctx.dropup);
    } }, outputs: { activeChangeEvent: "activeChange" }, decls: 7, vars: 7, consts: [[3, "ngTemplateOutlet", "ngTemplateOutletContext"], ["bsItemTemplate", ""], ["bs3Template", ""], ["bs4Template", ""], [3, "innerHtml"], ["role", "listbox", 1, "dropdown-menu"], ["ulElement", ""], ["ngFor", "", 3, "ngForOf"], ["class", "dropdown-header", 4, "ngIf"], ["role", "option", 3, "id", "active", "mouseenter", 4, "ngIf"], [1, "dropdown-header"], ["liElements", ""], ["role", "option", 3, "id", "mouseenter"], ["href", "#", "tabindex", "-1", 3, "click"], [3, "ngIf"], ["role", "option", 1, "dropdown-item", 3, "id", "click", "mouseenter"]], template: function TypeaheadContainerComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, TypeaheadContainerComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
        ɵɵtemplate(1, TypeaheadContainerComponent_ng_template_1_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵtemplate(3, TypeaheadContainerComponent_ng_template_3_Template, 3, 5, "ng-template", null, 2, ɵɵtemplateRefExtractor);
        ɵɵtemplate(5, TypeaheadContainerComponent_ng_template_5_Template, 1, 1, "ng-template", null, 3, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        const _r1 = ɵɵreference(2);
        const _r3 = ɵɵreference(4);
        const _r5 = ɵɵreference(6);
        ɵɵproperty("ngTemplateOutlet", ctx.optionsListTemplate || (ctx.isBs4 ? _r5 : _r3))("ngTemplateOutletContext", ɵɵpureFunction4(2, _c3, ctx.matches, ctx.itemTemplate || _r1, ctx.query, ctx.typeaheadTemplateMethods));
    } }, directives: [NgTemplateOutlet, NgForOf, NgIf], styles: [".dropdown[_nghost-%COMP%] {\n      z-index: 1000;\n    }\n\n    .dropdown-menu[_nghost-%COMP%], .dropdown-menu[_ngcontent-%COMP%] {\n      overflow-y: auto;\n      height: 100px;\n    }"], data: { animation: [typeaheadAnimation] } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(TypeaheadContainerComponent, [{
        type: Component,
        args: [{
                selector: 'typeahead-container',
                templateUrl: './typeahead-container.component.html',
                host: {
                    class: 'dropdown open bottom',
                    '[class.dropdown-menu]': 'isBs4',
                    '[style.height]': `isBs4 && needScrollbar ? guiHeight: 'auto'`,
                    '[style.visibility]': `'inherit'`,
                    '[class.dropup]': 'dropup',
                    style: 'position: absolute;display: block;',
                    '[attr.role]': `isBs4 ? 'listbox' : null `
                },
                styles: [
                    `
    :host.dropdown {
      z-index: 1000;
    }

    :host.dropdown-menu, .dropdown-menu {
      overflow-y: auto;
      height: 100px;
    }
  `
                ],
                animations: [typeaheadAnimation]
            }]
    }], function () { return [{ type: PositioningService }, { type: Renderer2 }, { type: ElementRef }, { type: ChangeDetectorRef }]; }, { activeChangeEvent: [{
            type: Output,
            args: ['activeChange']
        }], ulElement: [{
            type: ViewChild,
            args: ['ulElement', { static: false }]
        }], liElements: [{
            type: ViewChildren,
            args: ['liElements']
        }], focusLost: [{
            type: HostListener,
            args: ['mouseleave']
        }, {
            type: HostListener,
            args: ['blur']
        }] }); })();

/** Default values provider for typeahead */
class TypeaheadConfig {
    constructor() {
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** used to hide results on blur */
        this.hideResultsOnBlur = true;
        /** if true, typeahead will cancel async request on blur */
        this.cancelRequestOnFocusLost = false;
        /** used to choose the first item in typeahead container */
        this.selectFirstItem = true;
        /** used to active/inactive the first item in typeahead container */
        this.isFirstItemActive = true;
        /** used to choose set minimal no of characters that needs to
         * be entered before typeahead kicks-in
         */
        this.minLength = 1;
    }
}
TypeaheadConfig.ɵfac = function TypeaheadConfig_Factory(t) { return new (t || TypeaheadConfig)(); };
TypeaheadConfig.ɵprov = ɵɵdefineInjectable({ token: TypeaheadConfig, factory: TypeaheadConfig.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(TypeaheadConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

/* tslint:disable:max-file-line-count */
class TypeaheadDirective {
    constructor(cis, config, changeDetection, element, ngControl, renderer, viewContainerRef) {
        this.changeDetection = changeDetection;
        this.element = element;
        this.ngControl = ngControl;
        this.renderer = renderer;
        /** minimal no of characters that needs to be entered before
         * typeahead kicks-in. When set to 0, typeahead shows on focus with full
         * list of options (limited as normal by typeaheadOptionsLimit)
         */
        this.typeaheadMinLength = void 0;
        /** turn on/off animation */
        this.isAnimated = false;
        /** should be used only in case of typeahead attribute is Observable of array.
         * If true - loading of options will be async, otherwise - sync.
         * true make sense if options array is large.
         */
        this.typeaheadAsync = void 0;
        /** match latin symbols.
         * If true the word súper would match super and vice versa.
         */
        this.typeaheadLatinize = true;
        /** Can be use to search words by inserting a single white space between each characters
         *  for example 'C a l i f o r n i a' will match 'California'.
         */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to break words. Defaults to space.
         */
        this.typeaheadWordDelimiters = ' ';
        /** Can be used to conduct a search of multiple items and have suggestion not for the
         * whole value of the input but for the value that comes after a delimiter provided via
         * typeaheadMultipleSearchDelimiters attribute. This option can only be used together with
         * typeaheadSingleWords option if typeaheadWordDelimiters and typeaheadPhraseDelimiters
         * are different from typeaheadMultipleSearchDelimiters to avoid conflict in determining
         * when to delimit multiple searches and when a single word.
         */
        this.typeaheadMultipleSearch = void 0;
        /** should be used only in case typeaheadMultipleSearch attribute is true.
         * Sets the multiple search delimiter to know when to start a new search. Defaults to comma.
         * If space needs to be used, then explicitly set typeaheadWordDelimiters to something else than space
         * because space is used by default OR set typeaheadSingleWords attribute to false if you don't need
         * to use it together with multiple search.
         */
        this.typeaheadMultipleSearchDelimiters = ',';
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to match exact phrase.
         * Defaults to simple and double quotes.
         */
        this.typeaheadPhraseDelimiters = '\'"';
        /** specifies if typeahead is scrollable  */
        this.typeaheadScrollable = false;
        /** specifies number of options to show in scroll view  */
        this.typeaheadOptionsInScrollableView = 5;
        /** fired when an options list was opened and the user clicked Tab
         * If a value equal true, it will be chosen first or active item in the list
         * If value equal false, it will be chosen an active item in the list or nothing
         */
        this.typeaheadSelectFirstItem = true;
        /** makes active first item in a list */
        this.typeaheadIsFirstItemActive = true;
        /** fired when 'busy' state of this component was changed,
         * fired on async mode only, returns boolean
         */
        this.typeaheadLoading = new EventEmitter();
        /** fired on every key event and returns true
         * in case of matches are not detected
         */
        this.typeaheadNoResults = new EventEmitter();
        /** fired when option was selected, return object with data of this option. */
        this.typeaheadOnSelect = new EventEmitter();
        /** fired when option was previewed, return object with data of this option. */
        this.typeaheadOnPreview = new EventEmitter();
        /** fired when blur event occurs. returns the active item */
        this.typeaheadOnBlur = new EventEmitter();
        /** This attribute indicates that the dropdown should be opened upwards */
        this.dropup = false;
        this.isOpen = false;
        this.list = 'list';
        this.isActiveItemChanged = false;
        this.isFocused = false;
        this.cancelRequestOnFocusLost = false;
        // tslint:disable-next-line:no-any
        this.keyUpEventEmitter = new EventEmitter();
        this._matches = [];
        this.placement = 'bottom left';
        this._subscriptions = [];
        this._typeahead = cis.createLoader(element, viewContainerRef, renderer)
            .provide({ provide: TypeaheadConfig, useValue: config });
        Object.assign(this, {
            typeaheadHideResultsOnBlur: config.hideResultsOnBlur,
            cancelRequestOnFocusLost: config.cancelRequestOnFocusLost,
            typeaheadSelectFirstItem: config.selectFirstItem,
            typeaheadIsFirstItemActive: config.isFirstItemActive,
            typeaheadMinLength: config.minLength,
            adaptivePosition: config.adaptivePosition,
            isAnimated: config.isAnimated
        });
    }
    ngOnInit() {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength =
            this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
        this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined && !(isObservable(this.typeahead))) {
            this.typeaheadAsync = false;
        }
        if (isObservable(this.typeahead)) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
        this.checkDelimitersConflict();
    }
    // tslint:disable-next-line:no-any
    onInput(e) {
        // For `<input>`s, use the `value` property. For others that don't have a
        // `value` (such as `<span contenteditable="true">`), use either
        // `textContent` or `innerText` (depending on which one is supported, i.e.
        // Firefox or IE).
        const value = e.target.value !== undefined
            ? e.target.value
            : e.target.textContent !== undefined
                ? e.target.textContent
                : e.target.innerText;
        if (value != null && value.trim().length >= this.typeaheadMinLength) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(e.target.value);
        }
        else {
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(false);
            this.hide();
        }
    }
    onChange(event) {
        if (this._container) {
            // esc
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 27 || event.key === 'Escape') {
                this.hide();
                return;
            }
            // up
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 38 || event.key === 'ArrowUp') {
                this.isActiveItemChanged = true;
                this._container.prevActiveMatch();
                return;
            }
            // down
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 40 || event.key === 'ArrowDown') {
                this.isActiveItemChanged = true;
                this._container.nextActiveMatch();
                return;
            }
            // enter
            /* tslint:disable-next-line: deprecation */
            if (event.keyCode === 13 || event.key === 'Enter') {
                this._container.selectActiveMatch();
                return;
            }
        }
    }
    onFocus() {
        this.isFocused = true;
        // add setTimeout to fix issue #5251
        // to get and emit updated value if it's changed on focus
        setTimeout(() => {
            if (this.typeaheadMinLength === 0) {
                this.typeaheadLoading.emit(true);
                this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
            }
        }, 0);
    }
    onBlur() {
        this.isFocused = false;
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
        }
        if (!this.container && this._matches.length === 0) {
            this.typeaheadOnBlur.emit(new TypeaheadMatch(this.element.nativeElement.value, this.element.nativeElement.value, false));
        }
    }
    onKeydown(event) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        /* tslint:disable-next-line: deprecation */
        if (event.keyCode === 9 || event.key === 'Tab') {
            this.onBlur();
        }
        /* tslint:disable-next-line: deprecation */
        if (event.keyCode === 9 || event.key === 'Tab' || event.keyCode === 13 || event.key === 'Enter') {
            event.preventDefault();
            if (this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch();
                return;
            }
            if (!this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch(this.isActiveItemChanged);
                this.isActiveItemChanged = false;
                this.hide();
            }
        }
    }
    changeModel(match) {
        let valueStr;
        if (this.typeaheadMultipleSearch) {
            const tokens = this._allEnteredValue.split(new RegExp(`([${this.typeaheadMultipleSearchDelimiters}]+)`));
            this._allEnteredValue = tokens.slice(0, tokens.length - 1).concat(match.value).join('');
            valueStr = this._allEnteredValue;
        }
        else {
            valueStr = match.value;
        }
        this.ngControl.viewToModelUpdate(valueStr);
        (this.ngControl.control).setValue(valueStr);
        this.changeDetection.markForCheck();
        this.hide();
    }
    get matches() {
        return this._matches;
    }
    show() {
        this._typeahead
            .attach(TypeaheadContainerComponent)
            .to(this.container)
            .position({ attachment: `${this.dropup ? 'top' : 'bottom'} left` })
            .show({
            typeaheadRef: this,
            placement: this.placement,
            animation: false,
            dropup: this.dropup
        });
        this._outsideClickListener = this.renderer.listen('document', 'click', (e) => {
            if (this.typeaheadMinLength === 0 && this.element.nativeElement.contains(e.target)) {
                return undefined;
            }
            if (!this.typeaheadHideResultsOnBlur || this.element.nativeElement.contains(e.target)) {
                return undefined;
            }
            this.onOutsideClick();
        });
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        const normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value)
            .toString()
            .toLowerCase();
        this._container.query = this.tokenizeQuery(normalizedQuery);
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
        this._container.activeChangeEvent.subscribe((activeId) => {
            this.activeDescendant = activeId;
            this.changeDetection.markForCheck();
        });
        this.isOpen = true;
    }
    hide() {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._outsideClickListener();
            this._container = null;
            this.isOpen = false;
            this.changeDetection.markForCheck();
        }
        this.typeaheadOnPreview.emit(null);
    }
    onOutsideClick() {
        if (this._container && !this._container.isFocused) {
            this.hide();
        }
    }
    ngOnDestroy() {
        // clean up subscriptions
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._typeahead.dispose();
    }
    asyncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), tap(value => {
            this._allEnteredValue = value;
        }), switchMap(() => this.typeahead))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }));
    }
    syncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), mergeMap((value) => {
            this._allEnteredValue = value;
            const normalizedQuery = this.normalizeQuery(value);
            return from(this.typeahead)
                .pipe(filter((option) => {
                return option && this.testMatch(this.normalizeOption(option), normalizedQuery);
            }), toArray());
        }))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }));
    }
    normalizeOption(option) {
        const optionValue = getValueFromObject(option, this.typeaheadOptionField);
        const normalizedOption = this.typeaheadLatinize
            ? latinize(optionValue)
            : optionValue;
        return normalizedOption.toLowerCase();
    }
    tokenizeQuery(currentQuery) {
        let query = currentQuery;
        if (this.typeaheadMultipleSearch && this.typeaheadSingleWords) {
            if (!this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters)) {
                // single words and multiple search delimiters are different, can be used together
                query = tokenize(query, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters, this.typeaheadMultipleSearchDelimiters);
            }
        }
        else if (this.typeaheadSingleWords) {
            query = tokenize(query, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters);
        }
        else {
            // multiple searches
            query = tokenize(query, null, null, this.typeaheadMultipleSearchDelimiters);
        }
        return query;
    }
    normalizeQuery(value) {
        // If singleWords, break model here to not be doing extra work on each iteration
        let normalizedQuery = (this.typeaheadLatinize
            ? latinize(value)
            : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.tokenizeQuery(normalizedQuery);
        return normalizedQuery;
    }
    testMatch(match, test) {
        let spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (let i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        return match.indexOf(test) >= 0;
    }
    finalizeAsyncCall(matches) {
        this.prepareMatches(matches || []);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (!this.isFocused && this.cancelRequestOnFocusLost) {
            return;
        }
        if (this._container) {
            // fix: remove usage of ngControl internals
            const _controlValue = (this.typeaheadLatinize
                ? latinize(this.ngControl.control.value)
                : this.ngControl.control.value) || '';
            // This improves the speed as it won't have to be done for each list item
            const normalizedQuery = _controlValue.toString().toLowerCase();
            this._container.query = this.tokenizeQuery(normalizedQuery);
            this._container.matches = this._matches;
        }
        else {
            this.show();
        }
    }
    prepareMatches(options) {
        const limited = options.slice(0, this.typeaheadOptionsLimit);
        const sorted = !this.typeaheadOrderBy ? limited : this.orderMatches(limited);
        if (this.typeaheadGroupField) {
            let matches = [];
            // extract all group names
            const groups = sorted
                .map((option) => getValueFromObject(option, this.typeaheadGroupField))
                .filter((v, i, a) => a.indexOf(v) === i);
            groups.forEach((group) => {
                // add group header to array of matches
                matches.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches = matches.concat(sorted
                    .filter((option) => getValueFromObject(option, this.typeaheadGroupField) === group)
                    .map((option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField))));
            });
            this._matches = matches;
        }
        else {
            this._matches = sorted.map(
            // tslint:disable-next-line:no-any
            (option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField)));
        }
    }
    orderMatches(options) {
        if (!options.length) {
            return options;
        }
        if (this.typeaheadOrderBy !== null
            && this.typeaheadOrderBy !== undefined
            && typeof this.typeaheadOrderBy === 'object'
            && Object.keys(this.typeaheadOrderBy).length === 0) {
            // tslint:disable-next-line:no-console
            console.error('Field and direction properties for typeaheadOrderBy have to be set according to documentation!');
            return options;
        }
        const { field, direction } = this.typeaheadOrderBy;
        if (!direction || !(direction === 'asc' || direction === 'desc')) {
            // tslint:disable-next-line:no-console
            console.error('typeaheadOrderBy direction has to equal "asc" or "desc". Please follow the documentation.');
            return options;
        }
        if (typeof options[0] === 'string') {
            return direction === 'asc' ? options.sort() : options.sort().reverse();
        }
        if (!field || typeof field !== 'string') {
            // tslint:disable-next-line:no-console
            console.error('typeaheadOrderBy field has to set according to the documentation.');
            return options;
        }
        return options.sort((a, b) => {
            const stringA = getValueFromObject(a, field);
            const stringB = getValueFromObject(b, field);
            if (stringA < stringB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (stringA > stringB) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    hasMatches() {
        return this._matches.length > 0;
    }
    checkDelimitersConflict() {
        if (this.typeaheadMultipleSearch && this.typeaheadSingleWords
            && (this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters))) {
            throw new Error(`Delimiters used in typeaheadMultipleSearchDelimiters must be different
          from delimiters used in typeaheadWordDelimiters (current value: ${this.typeaheadWordDelimiters}) and
          typeaheadPhraseDelimiters (current value: ${this.typeaheadPhraseDelimiters}).
          Please refer to the documentation`);
        }
    }
    haveCommonCharacters(str1, str2) {
        for (let i = 0; i < str1.length; i++) {
            if (str1.charAt(i).indexOf(str2) > -1) {
                return true;
            }
        }
        return false;
    }
}
TypeaheadDirective.ɵfac = function TypeaheadDirective_Factory(t) { return new (t || TypeaheadDirective)(ɵɵdirectiveInject(ComponentLoaderFactory), ɵɵdirectiveInject(TypeaheadConfig), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgControl), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef)); };
TypeaheadDirective.ɵdir = ɵɵdefineDirective({ type: TypeaheadDirective, selectors: [["", "typeahead", ""]], hostVars: 4, hostBindings: function TypeaheadDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("input", function TypeaheadDirective_input_HostBindingHandler($event) { return ctx.onInput($event); })("keyup", function TypeaheadDirective_keyup_HostBindingHandler($event) { return ctx.onChange($event); })("click", function TypeaheadDirective_click_HostBindingHandler() { return ctx.onFocus(); })("focus", function TypeaheadDirective_focus_HostBindingHandler() { return ctx.onFocus(); })("blur", function TypeaheadDirective_blur_HostBindingHandler() { return ctx.onBlur(); })("keydown", function TypeaheadDirective_keydown_HostBindingHandler($event) { return ctx.onKeydown($event); });
    } if (rf & 2) {
        ɵɵattribute("aria-activedescendant", ctx.activeDescendant)("aria-owns", ctx.isOpen ? ctx._container.popupId : null)("aria-expanded", ctx.isOpen)("aria-autocomplete", ctx.list);
    } }, inputs: { typeahead: "typeahead", typeaheadMinLength: "typeaheadMinLength", adaptivePosition: "adaptivePosition", isAnimated: "isAnimated", typeaheadWaitMs: "typeaheadWaitMs", typeaheadOptionsLimit: "typeaheadOptionsLimit", typeaheadOptionField: "typeaheadOptionField", typeaheadGroupField: "typeaheadGroupField", typeaheadOrderBy: "typeaheadOrderBy", typeaheadAsync: "typeaheadAsync", typeaheadLatinize: "typeaheadLatinize", typeaheadSingleWords: "typeaheadSingleWords", typeaheadWordDelimiters: "typeaheadWordDelimiters", typeaheadMultipleSearch: "typeaheadMultipleSearch", typeaheadMultipleSearchDelimiters: "typeaheadMultipleSearchDelimiters", typeaheadPhraseDelimiters: "typeaheadPhraseDelimiters", typeaheadItemTemplate: "typeaheadItemTemplate", optionsListTemplate: "optionsListTemplate", typeaheadScrollable: "typeaheadScrollable", typeaheadOptionsInScrollableView: "typeaheadOptionsInScrollableView", typeaheadHideResultsOnBlur: "typeaheadHideResultsOnBlur", typeaheadSelectFirstItem: "typeaheadSelectFirstItem", typeaheadIsFirstItemActive: "typeaheadIsFirstItemActive", container: "container", dropup: "dropup" }, outputs: { typeaheadLoading: "typeaheadLoading", typeaheadNoResults: "typeaheadNoResults", typeaheadOnSelect: "typeaheadOnSelect", typeaheadOnPreview: "typeaheadOnPreview", typeaheadOnBlur: "typeaheadOnBlur" }, exportAs: ["bs-typeahead"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(TypeaheadDirective, [{
        type: Directive,
        args: [{
                selector: '[typeahead]',
                exportAs: 'bs-typeahead',
                host: {
                    '[attr.aria-activedescendant]': 'activeDescendant',
                    '[attr.aria-owns]': 'isOpen ? this._container.popupId : null',
                    '[attr.aria-expanded]': 'isOpen',
                    '[attr.aria-autocomplete]': 'list'
                }
            }]
    }], function () { return [{ type: ComponentLoaderFactory }, { type: TypeaheadConfig }, { type: ChangeDetectorRef }, { type: ElementRef }, { type: NgControl }, { type: Renderer2 }, { type: ViewContainerRef }]; }, { typeahead: [{
            type: Input
        }], typeaheadMinLength: [{
            type: Input
        }], adaptivePosition: [{
            type: Input
        }], isAnimated: [{
            type: Input
        }], typeaheadWaitMs: [{
            type: Input
        }], typeaheadOptionsLimit: [{
            type: Input
        }], typeaheadOptionField: [{
            type: Input
        }], typeaheadGroupField: [{
            type: Input
        }], typeaheadOrderBy: [{
            type: Input
        }], typeaheadAsync: [{
            type: Input
        }], typeaheadLatinize: [{
            type: Input
        }], typeaheadSingleWords: [{
            type: Input
        }], typeaheadWordDelimiters: [{
            type: Input
        }], typeaheadMultipleSearch: [{
            type: Input
        }], typeaheadMultipleSearchDelimiters: [{
            type: Input
        }], typeaheadPhraseDelimiters: [{
            type: Input
        }], typeaheadItemTemplate: [{
            type: Input
        }], optionsListTemplate: [{
            type: Input
        }], typeaheadScrollable: [{
            type: Input
        }], typeaheadOptionsInScrollableView: [{
            type: Input
        }], typeaheadHideResultsOnBlur: [{
            type: Input
        }], typeaheadSelectFirstItem: [{
            type: Input
        }], typeaheadIsFirstItemActive: [{
            type: Input
        }], typeaheadLoading: [{
            type: Output
        }], typeaheadNoResults: [{
            type: Output
        }], typeaheadOnSelect: [{
            type: Output
        }], typeaheadOnPreview: [{
            type: Output
        }], typeaheadOnBlur: [{
            type: Output
        }], container: [{
            type: Input
        }], dropup: [{
            type: Input
        }], 
    // tslint:disable-next-line:no-any
    onInput: [{
            type: HostListener,
            args: ['input', ['$event']]
        }], onChange: [{
            type: HostListener,
            args: ['keyup', ['$event']]
        }], onFocus: [{
            type: HostListener,
            args: ['click']
        }, {
            type: HostListener,
            args: ['focus']
        }], onBlur: [{
            type: HostListener,
            args: ['blur']
        }], onKeydown: [{
            type: HostListener,
            args: ['keydown', ['$event']]
        }] }); })();

class TypeaheadModule {
    static forRoot() {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    }
}
TypeaheadModule.ɵmod = ɵɵdefineNgModule({ type: TypeaheadModule });
TypeaheadModule.ɵinj = ɵɵdefineInjector({ factory: function TypeaheadModule_Factory(t) { return new (t || TypeaheadModule)(); }, imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(TypeaheadModule, { declarations: [TypeaheadContainerComponent, TypeaheadDirective], imports: [CommonModule], exports: [TypeaheadContainerComponent, TypeaheadDirective] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(TypeaheadModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                exports: [TypeaheadContainerComponent, TypeaheadDirective],
                entryComponents: [TypeaheadContainerComponent]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */

export { TypeaheadConfig, TypeaheadContainerComponent, TypeaheadDirective, TypeaheadMatch, TypeaheadModule, TypeaheadOptions, TypeaheadOrder, escapeRegexp, getValueFromObject, latinMap, latinize, tokenize };
//# sourceMappingURL=ngx-bootstrap-typeahead.js.map
