webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(104));
	__export(__webpack_require__(105));
	__export(__webpack_require__(107));
	__export(__webpack_require__(106));
	// export * from  './components/datepicker/index';
	__export(__webpack_require__(109));
	__export(__webpack_require__(13));
	__export(__webpack_require__(46));
	__export(__webpack_require__(47));
	__export(__webpack_require__(48));
	__export(__webpack_require__(108));
	__export(__webpack_require__(44));
	__export(__webpack_require__(110));
	__export(__webpack_require__(111));
	__export(__webpack_require__(112));
	__export(__webpack_require__(113));
	__export(__webpack_require__(114));
	__export(__webpack_require__(115));
	__export(__webpack_require__(118));
	__export(__webpack_require__(23));
	__export(__webpack_require__(45));
	__export(__webpack_require__(14));


/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var dropdown_service_1 = __webpack_require__(47);
	var Dropdown = (function () {
	    function Dropdown(el) {
	        this.el = el;
	        this.onToggle = new core_1.EventEmitter();
	        this.addClass = true;
	        // todo: bind to route change event
	    }
	    Object.defineProperty(Dropdown.prototype, "isOpen", {
	        get: function () {
	            return this._isOpen;
	        },
	        set: function (value) {
	            this._isOpen = !!value;
	            // todo: implement after porting position
	            if (this.dropdownAppendToBody && this.menuEl) {
	            }
	            // todo: $animate open<->close transitions, as soon as ng2Animate will be ready
	            if (this.isOpen) {
	                if (this.dropdownMenuTemplateUrl) {
	                }
	                this.focusToggleElement();
	                dropdown_service_1.dropdownService.open(this);
	            }
	            else {
	                if (this.dropdownMenuTemplateUrl) {
	                }
	                dropdown_service_1.dropdownService.close(this);
	                this.selectedOption = null;
	            }
	            this.onToggle.emit(this.isOpen);
	            // todo: implement call to setIsOpen if set and function
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Dropdown.prototype.ngOnInit = function () {
	        this.autoClose = this.autoClose || dropdown_service_1.ALWAYS;
	        this.keyboardNav = typeof this.keyboardNav !== 'undefined';
	        this.dropdownAppendToBody = typeof this.dropdownAppendToBody !== 'undefined';
	        if (this.isOpen) {
	        }
	    };
	    Dropdown.prototype.ngOnDestroy = function () {
	        if (this.dropdownAppendToBody && this.menuEl) {
	            this.menuEl.nativeElement.remove();
	        }
	    };
	    Object.defineProperty(Dropdown.prototype, "dropDownMenu", {
	        set: function (dropdownMenu) {
	            // init drop down menu
	            this.menuEl = dropdownMenu.el;
	            if (dropdownMenu.templateUrl) {
	                this.dropdownMenuTemplateUrl = dropdownMenu.templateUrl;
	            }
	            if (this.dropdownAppendToBody) {
	                window.document.body.appendChild(this.menuEl.nativeElement);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Dropdown.prototype, "dropDownToggle", {
	        set: function (dropdownToggle) {
	            // init toggle element
	            this.toggleEl = dropdownToggle.el;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Dropdown.prototype.toggle = function (open) {
	        return this.isOpen = arguments.length ? !!open : !this.isOpen;
	    };
	    Dropdown.prototype.focusDropdownEntry = function (keyCode) {
	        // If append to body is used.
	        var hostEl = this.menuEl ?
	            this.menuEl.nativeElement :
	            this.el.nativeElement.getElementsByTagName('ul')[0];
	        if (!hostEl) {
	            // todo: throw exception?
	            return;
	        }
	        var elems = hostEl.getElementsByTagName('a');
	        if (!elems || !elems.length) {
	            // todo: throw exception?
	            return;
	        }
	        // todo: use parseInt to detect isNumber?
	        // todo: or implement selectedOption as a get\set pair with parseInt on set
	        switch (keyCode) {
	            case (40):
	                if (typeof this.selectedOption !== 'number') {
	                    this.selectedOption = 0;
	                    break;
	                }
	                if (this.selectedOption === elems.length - 1) {
	                    break;
	                }
	                this.selectedOption++;
	                break;
	            case (38):
	                if (typeof this.selectedOption !== 'number') {
	                    return;
	                }
	                if (this.selectedOption === 0) {
	                    // todo: return?
	                    break;
	                }
	                this.selectedOption--;
	                break;
	        }
	        elems[this.selectedOption].focus();
	    };
	    Dropdown.prototype.focusToggleElement = function () {
	        if (this.toggleEl) {
	            this.toggleEl.nativeElement.focus();
	        }
	    };
	    __decorate([
	        core_1.HostBinding('class.open'),
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Dropdown.prototype, "isOpen", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Dropdown.prototype, "autoClose", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Dropdown.prototype, "keyboardNav", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Dropdown.prototype, "dropdownAppendToBody", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Dropdown.prototype, "onToggle", void 0);
	    __decorate([
	        core_1.HostBinding('class.dropdown'), 
	        __metadata('design:type', Object)
	    ], Dropdown.prototype, "addClass", void 0);
	    Dropdown = __decorate([
	        core_1.Directive({ selector: '[dropdown]' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Dropdown);
	    return Dropdown;
	})();
	exports.Dropdown = Dropdown;


/***/ },

/***/ 14:
/***/ function(module, exports) {

	(function (Ng2BootstrapTheme) {
	    Ng2BootstrapTheme[Ng2BootstrapTheme["BS3"] = 1] = "BS3";
	    Ng2BootstrapTheme[Ng2BootstrapTheme["BS4"] = 2] = "BS4";
	})(exports.Ng2BootstrapTheme || (exports.Ng2BootstrapTheme = {}));
	var Ng2BootstrapTheme = exports.Ng2BootstrapTheme;
	var Ng2BootstrapConfig = (function () {
	    function Ng2BootstrapConfig() {
	    }
	    Object.defineProperty(Ng2BootstrapConfig, "theme", {
	        get: function () {
	            // hack as for now
	            var w = window;
	            if (w && w.__theme === 'bs4') {
	                return Ng2BootstrapTheme.BS4;
	            }
	            return (this._theme || Ng2BootstrapTheme.BS3);
	        },
	        set: function (v) {
	            this._theme = v;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Ng2BootstrapConfig;
	})();
	exports.Ng2BootstrapConfig = Ng2BootstrapConfig;


/***/ },

/***/ 23:
/***/ function(module, exports) {

	var PositionService = (function () {
	    function PositionService() {
	    }
	    Object.defineProperty(PositionService.prototype, "window", {
	        get: function () {
	            return window;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PositionService.prototype, "document", {
	        get: function () {
	            return window.document;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PositionService.prototype.getStyle = function (nativeEl, cssProp) {
	        // IE
	        if (nativeEl.currentStyle) {
	            return nativeEl.currentStyle[cssProp];
	        }
	        if (this.window.getComputedStyle) {
	            return this.window.getComputedStyle(nativeEl)[cssProp];
	        }
	        // finally try and get inline style
	        return nativeEl.style[cssProp];
	    };
	    /**
	     * Checks if a given element is statically positioned
	     * @param nativeEl - raw DOM element
	     */
	    PositionService.prototype.isStaticPositioned = function (nativeEl) {
	        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
	    };
	    /**
	     * returns the closest, non-statically positioned parentOffset of a given element
	     * @param nativeEl
	     */
	    PositionService.prototype.parentOffsetEl = function (nativeEl) {
	        var offsetParent = nativeEl.offsetParent || this.document;
	        while (offsetParent && offsetParent !== this.document &&
	            this.isStaticPositioned(offsetParent)) {
	            offsetParent = offsetParent.offsetParent;
	        }
	        return offsetParent || this.document;
	    };
	    ;
	    /**
	     * Provides read-only equivalent of jQuery's position function:
	     * http://api.jquery.com/position/
	     */
	    PositionService.prototype.position = function (nativeEl) {
	        var elBCR = this.offset(nativeEl);
	        var offsetParentBCR = { top: 0, left: 0 };
	        var offsetParentEl = this.parentOffsetEl(nativeEl);
	        if (offsetParentEl !== this.document) {
	            offsetParentBCR = this.offset(offsetParentEl);
	            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
	            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
	        }
	        var boundingClientRect = nativeEl.getBoundingClientRect();
	        return {
	            width: boundingClientRect.width || nativeEl.offsetWidth,
	            height: boundingClientRect.height || nativeEl.offsetHeight,
	            top: elBCR.top - offsetParentBCR.top,
	            left: elBCR.left - offsetParentBCR.left
	        };
	    };
	    /**
	     * Provides read-only equivalent of jQuery's offset function:
	     * http://api.jquery.com/offset/
	     */
	    PositionService.prototype.offset = function (nativeEl) {
	        var boundingClientRect = nativeEl.getBoundingClientRect();
	        return {
	            width: boundingClientRect.width || nativeEl.offsetWidth,
	            height: boundingClientRect.height || nativeEl.offsetHeight,
	            top: boundingClientRect.top + (this.window.pageYOffset || this.document.documentElement.scrollTop),
	            left: boundingClientRect.left + (this.window.pageXOffset || this.document.documentElement.scrollLeft)
	        };
	    };
	    /**
	     * Provides coordinates for the targetEl in relation to hostEl
	     */
	    PositionService.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
	        var positionStrParts = positionStr.split('-');
	        var pos0 = positionStrParts[0];
	        var pos1 = positionStrParts[1] || 'center';
	        var hostElPos = appendToBody ?
	            this.offset(hostEl) :
	            this.position(hostEl);
	        var targetElWidth = targetEl.offsetWidth;
	        var targetElHeight = targetEl.offsetHeight;
	        var shiftWidth = {
	            center: function () {
	                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
	            },
	            left: function () {
	                return hostElPos.left;
	            },
	            right: function () {
	                return hostElPos.left + hostElPos.width;
	            }
	        };
	        var shiftHeight = {
	            center: function () {
	                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
	            },
	            top: function () {
	                return hostElPos.top;
	            },
	            bottom: function () {
	                return hostElPos.top + hostElPos.height;
	            }
	        };
	        var targetElPos;
	        switch (pos0) {
	            case 'right':
	                targetElPos = {
	                    top: shiftHeight[pos1](),
	                    left: shiftWidth[pos0]()
	                };
	                break;
	            case 'left':
	                targetElPos = {
	                    top: shiftHeight[pos1](),
	                    left: hostElPos.left - targetElWidth
	                };
	                break;
	            case 'bottom':
	                targetElPos = {
	                    top: shiftHeight[pos0](),
	                    left: shiftWidth[pos1]()
	                };
	                break;
	            default:
	                targetElPos = {
	                    top: hostElPos.top - targetElHeight,
	                    left: shiftWidth[pos1]()
	                };
	                break;
	        }
	        return targetElPos;
	    };
	    return PositionService;
	})();
	exports.PositionService = PositionService;
	exports.positionService = new PositionService();


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	// todo: add animate
	// todo: add init and on change
	var Collapse = (function () {
	    function Collapse() {
	        // shown
	        this.isExpanded = true;
	        // hidden
	        this.isCollapsed = false;
	        // stale state
	        this.isCollapse = true;
	        // animation state
	        this.isCollapsing = false;
	    }
	    Object.defineProperty(Collapse.prototype, "collapse", {
	        get: function () {
	            return this.isExpanded;
	        },
	        set: function (value) {
	            this.isExpanded = value;
	            this.toggle();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collapse.prototype.toggle = function () {
	        if (this.isExpanded) {
	            this.hide();
	        }
	        else {
	            this.show();
	        }
	    };
	    Collapse.prototype.hide = function () {
	        var _this = this;
	        this.isCollapse = false;
	        this.isCollapsing = true;
	        this.isExpanded = false;
	        this.isCollapsed = true;
	        setTimeout(function () {
	            _this.height = '0';
	            _this.isCollapse = true;
	            _this.isCollapsing = false;
	        }, 4);
	    };
	    Collapse.prototype.show = function () {
	        var _this = this;
	        this.isCollapse = false;
	        this.isCollapsing = true;
	        this.isExpanded = true;
	        this.isCollapsed = false;
	        setTimeout(function () {
	            _this.height = 'auto';
	            _this.isCollapse = true;
	            _this.isCollapsing = false;
	        }, 4);
	    };
	    __decorate([
	        core_1.HostBinding('style.height'), 
	        __metadata('design:type', String)
	    ], Collapse.prototype, "height", void 0);
	    __decorate([
	        core_1.HostBinding('class.in'),
	        core_1.HostBinding('attr.aria-expanded'), 
	        __metadata('design:type', Boolean)
	    ], Collapse.prototype, "isExpanded", void 0);
	    __decorate([
	        core_1.HostBinding('attr.aria-hidden'), 
	        __metadata('design:type', Boolean)
	    ], Collapse.prototype, "isCollapsed", void 0);
	    __decorate([
	        core_1.HostBinding('class.collapse'), 
	        __metadata('design:type', Boolean)
	    ], Collapse.prototype, "isCollapse", void 0);
	    __decorate([
	        core_1.HostBinding('class.collapsing'), 
	        __metadata('design:type', Boolean)
	    ], Collapse.prototype, "isCollapsing", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean), 
	        __metadata('design:paramtypes', [Boolean])
	    ], Collapse.prototype, "collapse", null);
	    Collapse = __decorate([
	        core_1.Directive({ selector: '[collapse]' }), 
	        __metadata('design:paramtypes', [])
	    ], Collapse);
	    return Collapse;
	})();
	exports.Collapse = Collapse;


/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var NgTransclude = (function () {
	    function NgTransclude(viewRef) {
	        this.viewRef = viewRef;
	    }
	    Object.defineProperty(NgTransclude.prototype, "ngTransclude", {
	        get: function () {
	            return this._ngTransclude;
	        },
	        set: function (templateRef) {
	            this._ngTransclude = templateRef;
	            if (templateRef) {
	                this.viewRef.createEmbeddedView(templateRef);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NgTransclude = __decorate([
	        core_1.Directive({
	            selector: '[ngTransclude]',
	            properties: ['ngTransclude']
	        }),
	        __param(0, core_1.Inject(core_1.ViewContainerRef)), 
	        __metadata('design:paramtypes', [core_1.ViewContainerRef])
	    ], NgTransclude);
	    return NgTransclude;
	})();
	exports.NgTransclude = NgTransclude;


/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var dropdown_1 = __webpack_require__(13);
	var DropdownMenu = (function () {
	    function DropdownMenu(dropdown, el) {
	        this.dropdown = dropdown;
	        this.el = el;
	    }
	    DropdownMenu.prototype.ngOnInit = function () {
	        this.dropdown.dropDownMenu = this;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], DropdownMenu.prototype, "templateUrl", void 0);
	    DropdownMenu = __decorate([
	        core_1.Directive({ selector: '[dropdown-menu]' }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [dropdown_1.Dropdown, core_1.ElementRef])
	    ], DropdownMenu);
	    return DropdownMenu;
	})();
	exports.DropdownMenu = DropdownMenu;


/***/ },

/***/ 47:
/***/ function(module, exports) {

	exports.ALWAYS = 'always';
	exports.DISABLED = 'disabled';
	exports.OUTSIDECLICK = 'outsideClick';
	var DropdownService = (function () {
	    function DropdownService() {
	        this.closeDropdownBind = this.closeDropdown.bind(this);
	        this.keybindFilterBind = this.keybindFilter.bind(this);
	    }
	    DropdownService.prototype.open = function (dropdownScope) {
	        if (!this.openScope) {
	            window.document.addEventListener('click', this.closeDropdownBind);
	            window.document.addEventListener('keydown', this.keybindFilterBind);
	        }
	        if (this.openScope && this.openScope !== this.dropdownScope) {
	            this.openScope.isOpen = false;
	        }
	        this.openScope = dropdownScope;
	    };
	    DropdownService.prototype.close = function (dropdownScope) {
	        if (this.openScope !== dropdownScope) {
	            return;
	        }
	        this.openScope = null;
	        window.document.removeEventListener('click', this.closeDropdownBind);
	        window.document.removeEventListener('keydown', this.keybindFilterBind);
	    };
	    DropdownService.prototype.closeDropdown = function (event) {
	        if (!this.openScope) {
	            return;
	        }
	        if (event && this.openScope.autoClose === exports.DISABLED) {
	            return;
	        }
	        if (event && this.openScope.toggleEl &&
	            this.openScope.toggleEl.nativeElement === event.target) {
	            return;
	        }
	        if (event && this.openScope.autoClose === exports.OUTSIDECLICK &&
	            this.openScope.menuEl &&
	            this.openScope.menuEl.nativeElement === event.target) {
	            return;
	        }
	        this.openScope.isOpen = false;
	    };
	    DropdownService.prototype.keybindFilter = function (event) {
	        if (event.which === 27) {
	            this.openScope.focusToggleElement();
	            this.closeDropdown(null);
	            return;
	        }
	        if (this.openScope.keyboardNav && this.openScope.isOpen &&
	            (event.which === 38 || event.which === 40)) {
	            event.preventDefault();
	            event.stopPropagation();
	            this.openScope.focusDropdownEntry(event.which);
	        }
	    };
	    return DropdownService;
	})();
	exports.DropdownService = DropdownService;
	exports.dropdownService = new DropdownService();


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var dropdown_1 = __webpack_require__(13);
	var DropdownToggle = (function () {
	    function DropdownToggle(dropdown, el) {
	        this.dropdown = dropdown;
	        this.el = el;
	        this.disabled = false;
	        this.addClass = true;
	    }
	    DropdownToggle.prototype.ngOnInit = function () {
	        this.dropdown.dropDownToggle = this;
	    };
	    Object.defineProperty(DropdownToggle.prototype, "isOpen", {
	        get: function () {
	            return this.dropdown.isOpen;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    DropdownToggle.prototype.toggleDropdown = function (event) {
	        event.stopPropagation();
	        if (!this.disabled) {
	            this.dropdown.toggle();
	        }
	        return false;
	    };
	    __decorate([
	        core_1.HostBinding('class.disabled'),
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], DropdownToggle.prototype, "disabled", void 0);
	    __decorate([
	        core_1.HostBinding('class.dropdown-toggle'),
	        core_1.HostBinding('attr.aria-haspopup'), 
	        __metadata('design:type', Object)
	    ], DropdownToggle.prototype, "addClass", void 0);
	    __decorate([
	        core_1.HostBinding('attr.aria-expanded'), 
	        __metadata('design:type', Object)
	    ], DropdownToggle.prototype, "isOpen", null);
	    __decorate([
	        core_1.HostListener('click', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [MouseEvent]), 
	        __metadata('design:returntype', void 0)
	    ], DropdownToggle.prototype, "toggleDropdown", null);
	    DropdownToggle = __decorate([
	        core_1.Directive({ selector: '[dropdown-toggle]' }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [dropdown_1.Dropdown, core_1.ElementRef])
	    ], DropdownToggle);
	    return DropdownToggle;
	})();
	exports.DropdownToggle = DropdownToggle;


/***/ },

/***/ 104:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var collapse_1 = __webpack_require__(44);
	// todo: support template url
	var Accordion = (function () {
	    function Accordion() {
	        this.addPanelGroupClass = true;
	        this.groups = [];
	    }
	    Accordion.prototype.closeOtherGroups = function (openGroup) {
	        if (!this.closeOthers) {
	            return;
	        }
	        this.groups.forEach(function (group) {
	            if (group !== openGroup) {
	                group.isOpen = false;
	            }
	        });
	    };
	    Accordion.prototype.addGroup = function (group) {
	        this.groups.push(group);
	    };
	    Accordion.prototype.removeGroup = function (group) {
	        var index = this.groups.indexOf(group);
	        if (index !== -1) {
	            this.groups.slice(index, 1);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Accordion.prototype, "templateUrl", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Accordion.prototype, "closeOthers", void 0);
	    __decorate([
	        core_1.HostBinding('class.panel-group'), 
	        __metadata('design:type', Object)
	    ], Accordion.prototype, "addPanelGroupClass", void 0);
	    Accordion = __decorate([
	        core_1.Component({
	            selector: 'accordion',
	            template: "<ng-content></ng-content>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Accordion);
	    return Accordion;
	})();
	exports.Accordion = Accordion;
	var AccordionTransclude = (function () {
	    function AccordionTransclude(viewRef) {
	        this.viewRef = viewRef;
	    }
	    AccordionTransclude.prototype.ngOnInit = function () {
	        if (this.accordionTransclude) {
	            this.viewRef.createEmbeddedView(this.accordionTransclude);
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', core_1.TemplateRef)
	    ], AccordionTransclude.prototype, "accordionTransclude", void 0);
	    AccordionTransclude = __decorate([
	        core_1.Directive({
	            selector: '[accordionTransclude]'
	        }),
	        __param(0, core_1.Inject(core_1.ViewContainerRef)), 
	        __metadata('design:paramtypes', [core_1.ViewContainerRef])
	    ], AccordionTransclude);
	    return AccordionTransclude;
	})();
	exports.AccordionTransclude = AccordionTransclude;
	// todo: support template url
	// todo: support custom `open class`
	var AccordionGroup = (function () {
	    function AccordionGroup(accordion) {
	        this.accordion = accordion;
	    }
	    Object.defineProperty(AccordionGroup.prototype, "isOpen", {
	        get: function () {
	            return this._isOpen;
	        },
	        set: function (value) {
	            this._isOpen = value;
	            if (value) {
	                this.accordion.closeOtherGroups(this);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AccordionGroup.prototype.ngOnInit = function () {
	        this.panelClass = this.panelClass || 'panel-default';
	        this.accordion.addGroup(this);
	    };
	    AccordionGroup.prototype.ngOnDestroy = function () {
	        this.accordion.removeGroup(this);
	    };
	    AccordionGroup.prototype.toggleOpen = function (event) {
	        event.preventDefault();
	        if (!this.isDisabled) {
	            this.isOpen = !this.isOpen;
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], AccordionGroup.prototype, "templateUrl", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], AccordionGroup.prototype, "heading", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], AccordionGroup.prototype, "panelClass", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], AccordionGroup.prototype, "isDisabled", void 0);
	    __decorate([
	        core_1.HostBinding('class.panel-open'),
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], AccordionGroup.prototype, "isOpen", null);
	    AccordionGroup = __decorate([
	        core_1.Component({
	            selector: 'accordion-group',
	            directives: [collapse_1.Collapse, AccordionTransclude, common_1.NgClass],
	            template: "\n    <div class=\"panel\" [ngClass]=\"panelClass\">\n      <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n        <h4 class=\"panel-title\">\n          <a href tabindex=\"0\" class=\"accordion-toggle\">\n            <span [ngClass]=\"{'text-muted': isDisabled}\"\n              [accordionTransclude]=\"headingTemplate\">{{heading}}</span>\n          </a>\n        </h4>\n      </div>\n      <div class=\"panel-collapse collapse\" [collapse]=\"!isOpen\">\n        <div class=\"panel-body\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [Accordion])
	    ], AccordionGroup);
	    return AccordionGroup;
	})();
	exports.AccordionGroup = AccordionGroup;
	var AccordionHeading = (function () {
	    function AccordionHeading(group, templateRef) {
	        this.group = group;
	        this.templateRef = templateRef;
	        group.headingTemplate = templateRef;
	    }
	    AccordionHeading = __decorate([
	        core_1.Directive({ selector: '[accordion-heading]' }), 
	        __metadata('design:paramtypes', [AccordionGroup, core_1.TemplateRef])
	    ], AccordionHeading);
	    return AccordionHeading;
	})();
	exports.AccordionHeading = AccordionHeading;
	exports.ACCORDION_COMPONENTS = [Accordion, AccordionGroup, AccordionHeading];
	// will be deprecated
	exports.accordion = [Accordion, AccordionGroup, AccordionHeading];


/***/ },

/***/ 105:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var ALERT_TEMPLATE = "\n  <div class=\"alert\" role=\"alert\" [ngClass]=\"classes\" *ngIf=\"!closed\">\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" (click)=\"onClose($event)\">\n      <span aria-hidden=\"true\">&times;</span>\n      <span class=\"sr-only\">Close</span>\n    </button>\n    <ng-content></ng-content>\n  </div>\n  ";
	// TODO: templateUrl
	var Alert = (function () {
	    function Alert(el) {
	        this.el = el;
	        this.type = 'warning';
	        this.close = new core_1.EventEmitter();
	        this.classes = [];
	        this.dismissible = this.dismissible || el.nativeElement.getAttribute('(close)');
	    }
	    Alert.prototype.ngOnInit = function () {
	        var _this = this;
	        this.classes[0] = "alert-" + this.type;
	        if (this.dismissible) {
	            this.classes[1] = 'alert-dismissible';
	        }
	        else {
	            this.classes.length = 1;
	        }
	        if (this.dismissOnTimeout) {
	            setTimeout(function () { return _this.onClose(); }, this.dismissOnTimeout);
	        }
	    };
	    // todo: mouse event + touch + pointer
	    Alert.prototype.onClose = function () {
	        this.close.next(this);
	        this.closed = true;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Alert.prototype, "type", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Alert.prototype, "dismissible", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Alert.prototype, "dismissOnTimeout", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Alert.prototype, "close", void 0);
	    Alert = __decorate([
	        core_1.Component({
	            selector: 'alert',
	            directives: [common_1.NgIf, common_1.NgClass],
	            template: ALERT_TEMPLATE
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef])
	    ], Alert);
	    return Alert;
	})();
	exports.Alert = Alert;


/***/ },

/***/ 106:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var ButtonCheckbox = (function () {
	    function ButtonCheckbox(cd) {
	        this.cd = cd;
	        this.state = false;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        // hack !
	        cd.valueAccessor = this;
	    }
	    // view -> model
	    ButtonCheckbox.prototype.onClick = function () {
	        this.toggle(!this.state);
	        this.cd.viewToModelUpdate(this.value);
	    };
	    ButtonCheckbox.prototype.ngOnInit = function () {
	        this.toggle(this.trueValue === this.value);
	    };
	    Object.defineProperty(ButtonCheckbox.prototype, "trueValue", {
	        get: function () {
	            return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ButtonCheckbox.prototype, "falseValue", {
	        get: function () {
	            return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ButtonCheckbox.prototype.toggle = function (state) {
	        this.state = state;
	        this.value = this.state ? this.trueValue : this.falseValue;
	    };
	    // ControlValueAccessor
	    // model -> view
	    ButtonCheckbox.prototype.writeValue = function (value) {
	        this.state = this.trueValue === value;
	        this.value = value;
	    };
	    ButtonCheckbox.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    ButtonCheckbox.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ButtonCheckbox.prototype, "btnCheckboxTrue", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ButtonCheckbox.prototype, "btnCheckboxFalse", void 0);
	    __decorate([
	        core_1.HostBinding('class.active'), 
	        __metadata('design:type', Boolean)
	    ], ButtonCheckbox.prototype, "state", void 0);
	    __decorate([
	        core_1.HostListener('click'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], ButtonCheckbox.prototype, "onClick", null);
	    ButtonCheckbox = __decorate([
	        core_1.Directive({ selector: '[btnCheckbox][ngModel]' }),
	        __param(0, core_1.Self()), 
	        __metadata('design:paramtypes', [common_1.NgModel])
	    ], ButtonCheckbox);
	    return ButtonCheckbox;
	})();
	exports.ButtonCheckbox = ButtonCheckbox;


/***/ },

/***/ 107:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var ButtonRadio = (function () {
	    function ButtonRadio(cd, el) {
	        this.cd = cd;
	        this.el = el;
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        // hack!
	        cd.valueAccessor = this;
	    }
	    Object.defineProperty(ButtonRadio.prototype, "isActive", {
	        get: function () {
	            return this.btnRadio === this.value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ButtonRadio.prototype.onClick = function () {
	        if (this.uncheckable && this.btnRadio === this.value) {
	            return this.cd.viewToModelUpdate(null);
	        }
	        this.cd.viewToModelUpdate(this.btnRadio);
	    };
	    ButtonRadio.prototype.ngOnInit = function () {
	        this.uncheckable = typeof this.uncheckable !== 'undefined';
	    };
	    Object.defineProperty(ButtonRadio.prototype, "value", {
	        // hack view model!
	        get: function () {
	            return this.cd.viewModel;
	        },
	        set: function (value) {
	            this.cd.viewModel = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    // ControlValueAccessor
	    // model -> view
	    ButtonRadio.prototype.writeValue = function (value) {
	        this.value = value;
	    };
	    ButtonRadio.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    ButtonRadio.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ButtonRadio.prototype, "btnRadio", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], ButtonRadio.prototype, "uncheckable", void 0);
	    __decorate([
	        core_1.HostBinding('class.active'), 
	        __metadata('design:type', Object)
	    ], ButtonRadio.prototype, "isActive", null);
	    __decorate([
	        core_1.HostListener('click'), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], ButtonRadio.prototype, "onClick", null);
	    ButtonRadio = __decorate([
	        core_1.Directive({ selector: '[btnRadio][ngModel]' }),
	        __param(0, core_1.Self()), 
	        __metadata('design:paramtypes', [common_1.NgModel, core_1.ElementRef])
	    ], ButtonRadio);
	    return ButtonRadio;
	})();
	exports.ButtonRadio = ButtonRadio;


/***/ },

/***/ 108:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var ng2_bootstrap_config_1 = __webpack_require__(14);
	(function (Direction) {
	    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
	    Direction[Direction["NEXT"] = 1] = "NEXT";
	    Direction[Direction["PREV"] = 2] = "PREV";
	})(exports.Direction || (exports.Direction = {}));
	var Direction = exports.Direction;
	// todo: add animate
	var NAVIGATION = (_a = {},
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n    <a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n      <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n      <span class=\"icon-next\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n  ",
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n    <a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n      <span class=\"glyphicon glyphicon-chevron-left\"></span>\n    </a>\n    <a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n      <span class=\"glyphicon glyphicon-chevron-right\"></span>\n    </a>\n  ",
	    _a
	);
	// todo:
	// (ng-swipe-right)="prev()" (ng-swipe-left)="next()"
	var Carousel = (function () {
	    function Carousel() {
	        this.slides = [];
	        this.destroyed = false;
	    }
	    Object.defineProperty(Carousel.prototype, "interval", {
	        get: function () {
	            return this._interval;
	        },
	        set: function (value) {
	            this._interval = value;
	            this.restartTimer();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Carousel.prototype.ngOnDestroy = function () {
	        this.destroyed = true;
	    };
	    Carousel.prototype.select = function (nextSlide, direction) {
	        if (direction === void 0) { direction = Direction.UNKNOWN; }
	        var nextIndex = nextSlide.index;
	        if (direction === Direction.UNKNOWN) {
	            direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
	        }
	        // Prevent this user-triggered transition from occurring if there is already one in progress
	        if (nextSlide && nextSlide !== this.currentSlide) {
	            this.goNext(nextSlide, direction);
	        }
	    };
	    Carousel.prototype.goNext = function (slide, direction) {
	        if (this.destroyed) {
	            return;
	        }
	        slide.direction = direction;
	        slide.active = true;
	        if (this.currentSlide) {
	            this.currentSlide.direction = direction;
	            this.currentSlide.active = false;
	        }
	        this.currentSlide = slide;
	        // every time you change slides, reset the timer
	        this.restartTimer();
	    };
	    Carousel.prototype.getSlideByIndex = function (index) {
	        var len = this.slides.length;
	        for (var i = 0; i < len; ++i) {
	            if (this.slides[i].index === index) {
	                return this.slides[i];
	            }
	        }
	    };
	    Carousel.prototype.getCurrentIndex = function () {
	        return !this.currentSlide ? 0 : this.currentSlide.index;
	    };
	    Carousel.prototype.next = function () {
	        var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
	        if (newIndex === 0 && this.noWrap) {
	            this.pause();
	            return;
	        }
	        return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
	    };
	    Carousel.prototype.prev = function () {
	        var newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
	        if (this.noWrap && newIndex === this.slides.length - 1) {
	            this.pause();
	            return;
	        }
	        return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
	    };
	    Carousel.prototype.restartTimer = function () {
	        var _this = this;
	        this.resetTimer();
	        var interval = +this.interval;
	        if (!isNaN(interval) && interval > 0) {
	            this.currentInterval = setInterval(function () {
	                var nInterval = +_this.interval;
	                if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
	                    _this.next();
	                }
	                else {
	                    _this.pause();
	                }
	            }, interval);
	        }
	    };
	    Carousel.prototype.resetTimer = function () {
	        if (this.currentInterval) {
	            clearInterval(this.currentInterval);
	            this.currentInterval = null;
	        }
	    };
	    Carousel.prototype.play = function () {
	        if (!this.isPlaying) {
	            this.isPlaying = true;
	            this.restartTimer();
	        }
	    };
	    Carousel.prototype.pause = function () {
	        if (!this.noPause) {
	            this.isPlaying = false;
	            this.resetTimer();
	        }
	    };
	    Carousel.prototype.addSlide = function (slide) {
	        slide.index = this.slides.length;
	        this.slides.push(slide);
	        if (this.slides.length === 1 || slide.active) {
	            this.select(this.slides[this.slides.length - 1]);
	            if (this.slides.length === 1) {
	                this.play();
	            }
	        }
	        else {
	            slide.active = false;
	        }
	    };
	    Carousel.prototype.removeSlide = function (slide) {
	        this.slides.splice(slide.index, 1);
	        if (this.slides.length === 0) {
	            this.currentSlide = null;
	            return;
	        }
	        for (var i = 0; i < this.slides.length; i++) {
	            this.slides[i].index = i;
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Carousel.prototype, "noWrap", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Carousel.prototype, "noPause", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Carousel.prototype, "noTransition", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Carousel.prototype, "interval", null);
	    Carousel = __decorate([
	        core_1.Component({
	            selector: 'carousel',
	            directives: [common_1.NgClass, common_1.NgFor],
	            template: "\n    <div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" class=\"carousel slide\">\n      <ol class=\"carousel-indicators\" [hidden]=\"slides.length <= 1\">\n         <li *ngFor=\"#slidez of slides\" [ngClass]=\"{active: slidez.active === true}\" (click)=\"select(slidez)\"></li>\n      </ol>\n      <div class=\"carousel-inner\"><ng-content></ng-content></div>\n      " + NAVIGATION[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] + "\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Carousel);
	    return Carousel;
	})();
	exports.Carousel = Carousel;
	var Slide = (function () {
	    function Slide(carousel) {
	        this.carousel = carousel;
	        this.addClass = true;
	    }
	    Slide.prototype.ngOnInit = function () {
	        this.carousel.addSlide(this);
	    };
	    Slide.prototype.ngOnDestroy = function () {
	        this.carousel.removeSlide(this);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Slide.prototype, "index", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Slide.prototype, "direction", void 0);
	    __decorate([
	        core_1.HostBinding('class.active'),
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Slide.prototype, "active", void 0);
	    __decorate([
	        core_1.HostBinding('class.item'),
	        core_1.HostBinding('class.carousel-item'), 
	        __metadata('design:type', Boolean)
	    ], Slide.prototype, "addClass", void 0);
	    Slide = __decorate([
	        core_1.Component({
	            selector: 'slide',
	            directives: [common_1.NgClass],
	            template: "\n    <div [ngClass]=\"{active: active}\" class=\"item text-center\">\n      <ng-content></ng-content>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [Carousel])
	    ], Slide);
	    return Slide;
	})();
	exports.Slide = Slide;
	exports.CAROUSEL_COMPONENTS = [Carousel, Slide];
	// will be deprecated
	exports.carousel = [Carousel, Slide];
	var _a;


/***/ },

/***/ 109:
/***/ function(module, exports, __webpack_require__) {

	var dropdown_1 = __webpack_require__(13);
	var dropdown_menu_1 = __webpack_require__(46);
	var dropdown_toggle_1 = __webpack_require__(48);
	exports.DROPDOWN_DIRECTIVES = [dropdown_1.Dropdown, dropdown_menu_1.DropdownMenu, dropdown_toggle_1.DropdownToggle];
	/**
	 * @deprecated - use DROPDOWN_DIRECTIVES
	 * @type {Dropdown|DropdownMenu|DropdownToggle[]}
	 */
	exports.dropdown = [dropdown_1.Dropdown, dropdown_menu_1.DropdownMenu, dropdown_toggle_1.DropdownToggle];
	// , KeyboardNav


/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var paginationConfig = {
	    maxSize: void 0,
	    itemsPerPage: 10,
	    boundaryLinks: false,
	    directionLinks: true,
	    firstText: 'First',
	    previousText: 'Previous',
	    nextText: 'Next',
	    lastText: 'Last',
	    rotate: true
	};
	var PAGINATION_TEMPLATE = "\n    <ul class=\"pagination\" [ngClass]=\"classMap\">\n    <li class=\"pagination-first\"\n        [ngClass]=\"{disabled: noPrevious()||disabled, hidden: !boundaryLinks}\"\n        [hidden]=\"!boundaryLinks\">\n      <a href (click)=\"selectPage(1, $event)\">{{getText('first')}}</a>\n    </li>\n\n    <li class=\"pagination-prev\"\n        [ngClass]=\"{disabled: noPrevious()||disabled, hidden: !directionLinks}\"\n        [hidden]=\"!directionLinks\">\n      <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n\n    <li *ngFor=\"#pg of pages\"\n    [ngClass]=\"{active: pg.active, disabled: disabled&&!pg.active}\"\n    class=\"pagination-page\">\n      <a href (click)=\"selectPage(pg.number, $event)\">{{pg.text}}</a>\n    </li>\n\n    <li class=\"pagination-next\"\n        [ngClass]=\"{disabled: noNext()||disabled, hidden: !directionLinks}\"\n        [hidden]=\"!directionLinks\">\n      <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n\n    <li class=\"pagination-last\"\n        [ngClass]=\"{disabled: noNext()||disabled, hidden: !boundaryLinks}\"\n        [hidden]=\"!boundaryLinks\">\n      <a href (click)=\"selectPage(totalPages, $event)\">{{getText('last')}}</a></li>\n  </ul>\n  ";
	var Pagination = (function () {
	    function Pagination(cd, renderer, elementRef) {
	        this.cd = cd;
	        this.renderer = renderer;
	        this.elementRef = elementRef;
	        this.numPages = new core_1.EventEmitter();
	        this.pageChanged = new core_1.EventEmitter();
	        this.inited = false;
	        this.onChange = function (_) {
	        };
	        this.onTouched = function () {
	        };
	        cd.valueAccessor = this;
	        this.config = this.config || paginationConfig;
	    }
	    Object.defineProperty(Pagination.prototype, "itemsPerPage", {
	        get: function () {
	            return this._itemsPerPage;
	        },
	        set: function (v) {
	            this._itemsPerPage = v;
	            this.totalPages = this.calculateTotalPages();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pagination.prototype, "totalItems", {
	        get: function () {
	            return this._totalItems;
	        },
	        set: function (v) {
	            this._totalItems = v;
	            this.totalPages = this.calculateTotalPages();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pagination.prototype, "totalPages", {
	        get: function () {
	            return this._totalPages;
	        },
	        set: function (v) {
	            this._totalPages = v;
	            this.numPages.next(v);
	            if (this.inited) {
	                this.selectPage(this.page);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pagination.prototype, "page", {
	        get: function () {
	            return this._page;
	        },
	        set: function (value) {
	            this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
	            this.pageChanged.next({
	                page: this._page,
	                itemsPerPage: this.itemsPerPage
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Pagination.prototype.ngOnInit = function () {
	        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
	        // watch for maxSize
	        this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
	        this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
	        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
	        this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
	        // base class
	        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
	        this.totalPages = this.calculateTotalPages();
	        // this class
	        this.pages = this.getPages(this.page, this.totalPages);
	        this.page = this.cd.value;
	        this.inited = true;
	    };
	    Pagination.prototype.writeValue = function (value) {
	        this.page = value;
	        this.pages = this.getPages(this.page, this.totalPages);
	    };
	    Pagination.prototype.selectPage = function (page, event) {
	        if (event) {
	            event.preventDefault();
	        }
	        if (!this.disabled) {
	            if (event && event.target) {
	                var target = event.target;
	                target.blur();
	            }
	            this.writeValue(page);
	            this.cd.viewToModelUpdate(this.page);
	        }
	    };
	    Pagination.prototype.getText = function (key) {
	        return this[key + 'Text'] || paginationConfig[key + 'Text'];
	    };
	    Pagination.prototype.noPrevious = function () {
	        return this.page === 1;
	    };
	    Pagination.prototype.noNext = function () {
	        return this.page === this.totalPages;
	    };
	    // Create page object used in template
	    Pagination.prototype.makePage = function (number, text, isActive) {
	        return {
	            number: number,
	            text: text,
	            active: isActive
	        };
	    };
	    Pagination.prototype.getPages = function (currentPage, totalPages) {
	        var pages = [];
	        // Default page limits
	        var startPage = 1;
	        var endPage = totalPages;
	        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
	        // recompute if maxSize
	        if (isMaxSized) {
	            if (this.rotate) {
	                // Current page is displayed in the middle of the visible ones
	                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
	                endPage = startPage + this.maxSize - 1;
	                // Adjust if limit is exceeded
	                if (endPage > totalPages) {
	                    endPage = totalPages;
	                    startPage = endPage - this.maxSize + 1;
	                }
	            }
	            else {
	                // Visible pages are paginated with maxSize
	                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
	                // Adjust last page if limit is exceeded
	                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
	            }
	        }
	        // Add page number links
	        for (var number = startPage; number <= endPage; number++) {
	            var page = this.makePage(number, number.toString(), number === currentPage);
	            pages.push(page);
	        }
	        // Add links to move between page sets
	        if (isMaxSized && !this.rotate) {
	            if (startPage > 1) {
	                var previousPageSet = this.makePage(startPage - 1, '...', false);
	                pages.unshift(previousPageSet);
	            }
	            if (endPage < totalPages) {
	                var nextPageSet = this.makePage(endPage + 1, '...', false);
	                pages.push(nextPageSet);
	            }
	        }
	        return pages;
	    };
	    // base class
	    Pagination.prototype.calculateTotalPages = function () {
	        var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
	        return Math.max(totalPages || 0, 1);
	    };
	    Pagination.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    Pagination.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Pagination.prototype, "maxSize", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Pagination.prototype, "boundaryLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Pagination.prototype, "directionLinks", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Pagination.prototype, "firstText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Pagination.prototype, "previousText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Pagination.prototype, "nextText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Pagination.prototype, "lastText", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Pagination.prototype, "rotate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Pagination.prototype, "disabled", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Pagination.prototype, "numPages", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Pagination.prototype, "pageChanged", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Pagination.prototype, "itemsPerPage", null);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Pagination.prototype, "totalItems", null);
	    Pagination = __decorate([
	        core_1.Component({
	            selector: 'pagination[ngModel]',
	            template: PAGINATION_TEMPLATE,
	            directives: [common_1.NgClass, common_1.NgFor]
	        }),
	        __param(0, core_1.Self()), 
	        __metadata('design:paramtypes', [common_1.NgModel, core_1.Renderer, core_1.ElementRef])
	    ], Pagination);
	    return Pagination;
	})();
	exports.Pagination = Pagination;
	var pagerConfig = {
	    itemsPerPage: 10,
	    previousText: '« Previous',
	    nextText: 'Next »',
	    align: true
	};
	var PAGER_TEMPLATE = "\n    <ul class=\"pager\">\n      <li [ngClass]=\"{disabled: noPrevious(), previous: align, 'pull-left': align}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [ngClass]=\"{disabled: noNext(), next: align, 'pull-right': align}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
	var Pager = (function (_super) {
	    __extends(Pager, _super);
	    function Pager(cd, renderer, elementRef) {
	        _super.call(this, cd, renderer, elementRef);
	        this.config = pagerConfig;
	    }
	    Pager = __decorate([
	        core_1.Component({
	            selector: 'pager[ngModel]',
	            properties: [
	                'align',
	                'totalItems', 'itemsPerPage',
	                'previousText', 'nextText',
	            ],
	            template: PAGER_TEMPLATE,
	            directives: [common_1.NgClass]
	        }),
	        __param(0, core_1.Self()), 
	        __metadata('design:paramtypes', [common_1.NgModel, core_1.Renderer, core_1.ElementRef])
	    ], Pager);
	    return Pager;
	})(Pagination);
	exports.Pager = Pager;
	exports.PAGINATION_COMPONENTS = [Pagination, Pager];
	/**
	 * @deprecated - use PAGINATION_COMPONENTS instead
	 * @type {Pagination|Pager[]}
	 */
	exports.pagination = [Pagination, Pager];


/***/ },

/***/ 111:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var progressConfig = {
	    animate: true,
	    max: 100
	};
	// todo: progress element conflict with bootstrap.css
	// todo: need hack: replace host element with div
	var Progress = (function () {
	    function Progress() {
	        this.addClass = 'progress';
	        this.bars = [];
	    }
	    Object.defineProperty(Progress.prototype, "max", {
	        get: function () {
	            return this._max;
	        },
	        set: function (v) {
	            this._max = v;
	            this.bars.forEach(function (bar) {
	                bar.recalculatePercentage();
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Progress.prototype.ngOnInit = function () {
	        this.animate = this.animate !== false;
	        this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
	    };
	    Progress.prototype.addBar = function (bar) {
	        if (!this.animate) {
	            bar.transition = 'none';
	        }
	        this.bars.push(bar);
	    };
	    Progress.prototype.removeBar = function (bar) {
	        this.bars.splice(this.bars.indexOf(bar), 1);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Progress.prototype, "animate", void 0);
	    __decorate([
	        core_1.HostBinding('attr.max'),
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Progress.prototype, "max", null);
	    __decorate([
	        core_1.HostBinding('class'), 
	        __metadata('design:type', Object)
	    ], Progress.prototype, "addClass", void 0);
	    Progress = __decorate([
	        core_1.Directive({ selector: 'bs-progress, [progress]' }), 
	        __metadata('design:paramtypes', [])
	    ], Progress);
	    return Progress;
	})();
	exports.Progress = Progress;
	// todo: number pipe
	// todo: use query from progress?
	var Bar = (function () {
	    function Bar(progress) {
	        this.progress = progress;
	        this.percent = 0;
	    }
	    Object.defineProperty(Bar.prototype, "value", {
	        get: function () {
	            return this._value;
	        },
	        set: function (v) {
	            if (!v && v !== 0) {
	                return;
	            }
	            this._value = v;
	            this.recalculatePercentage();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Bar.prototype.ngOnInit = function () {
	        this.progress.addBar(this);
	    };
	    Bar.prototype.ngOnDestroy = function () {
	        this.progress.removeBar(this);
	    };
	    Bar.prototype.recalculatePercentage = function () {
	        this.percent = +(100 * this.value / this.progress.max).toFixed(2);
	        var totalPercentage = this.progress.bars.reduce(function (total, bar) {
	            return total + bar.percent;
	        }, 0);
	        if (totalPercentage > 100) {
	            this.percent -= totalPercentage - 100;
	        }
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Bar.prototype, "type", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Bar.prototype, "value", null);
	    Bar = __decorate([
	        core_1.Component({
	            selector: 'bar, [bar]',
	            directives: [common_1.NgClass, common_1.NgStyle],
	            template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type\"\n    [ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"\n    ><ng-content></ng-content></div>\n"
	        }),
	        __param(0, core_1.Host()), 
	        __metadata('design:paramtypes', [Progress])
	    ], Bar);
	    return Bar;
	})();
	exports.Bar = Bar;
	var Progressbar = (function () {
	    function Progressbar() {
	    }
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Progressbar.prototype, "animate", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Progressbar.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Progressbar.prototype, "type", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Progressbar.prototype, "value", void 0);
	    Progressbar = __decorate([
	        core_1.Component({
	            selector: 'progressbar, [progressbar]',
	            directives: [Progress, Bar],
	            template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Progressbar);
	    return Progressbar;
	})();
	exports.Progressbar = Progressbar;
	exports.PROGRESSBAR_COMPONENTS = [Progress, Bar, Progressbar];
	/**
	 * @deprecated use PROGRESSBAR_COMPONENTS instead
	 * @type {Progress|Bar|Progressbar[]}
	 */
	exports.progressbar = [Progress, Bar, Progressbar];


/***/ },

/***/ 112:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	// TODO: templateUrl
	var Rating = (function () {
	    function Rating(cd) {
	        this.cd = cd;
	        this.onHover = new core_1.EventEmitter();
	        this.onLeave = new core_1.EventEmitter();
	        this.onChange = function (_) {
	        };
	        this.onTouched = function () {
	        };
	        cd.valueAccessor = this;
	    }
	    Rating.prototype.onKeydown = function (event) {
	        if ([37, 38, 39, 40].indexOf(event.which) === -1) {
	            return;
	        }
	        event.preventDefault();
	        event.stopPropagation();
	        var sign = event.which === 38 || event.which === 39 ? 1 : -1;
	        this.rate(this.value + sign);
	    };
	    Rating.prototype.ngOnInit = function () {
	        this.max = typeof this.max !== 'undefined' ? this.max : 5;
	        this.readonly = this.readonly === true;
	        this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
	        this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
	        this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
	        this.range = this.buildTemplateObjects(this.ratingStates, this.max);
	    };
	    // model -> view
	    Rating.prototype.writeValue = function (value) {
	        if (value % 1 !== value) {
	            this.value = Math.round(value);
	            this.preValue = value;
	            return;
	        }
	        this.preValue = value;
	        this.value = value;
	    };
	    Rating.prototype.buildTemplateObjects = function (ratingStates, max) {
	        ratingStates = ratingStates || [];
	        var count = ratingStates.length || max;
	        var result = [];
	        for (var i = 0; i < count; i++) {
	            result.push(Object.assign({
	                index: i,
	                stateOn: this.stateOn,
	                stateOff: this.stateOff,
	                title: this.titles[i] || i + 1
	            }, ratingStates[i] || {}));
	        }
	        return result;
	    };
	    Rating.prototype.rate = function (value) {
	        if (!this.readonly && value >= 0 && value <= this.range.length) {
	            this.writeValue(value);
	            this.cd.viewToModelUpdate(value);
	        }
	    };
	    Rating.prototype.enter = function (value) {
	        if (!this.readonly) {
	            this.value = value;
	            this.onHover.next(value);
	        }
	    };
	    Rating.prototype.reset = function () {
	        this.value = this.preValue;
	        this.onLeave.next(this.value);
	    };
	    Rating.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    Rating.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Rating.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Rating.prototype, "stateOn", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Rating.prototype, "stateOff", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Rating.prototype, "readonly", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Rating.prototype, "titles", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Rating.prototype, "ratingStates", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Rating.prototype, "onHover", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Rating.prototype, "onLeave", void 0);
	    __decorate([
	        core_1.HostListener('keydown', ['$event']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', [KeyboardEvent]), 
	        __metadata('design:returntype', void 0)
	    ], Rating.prototype, "onKeydown", null);
	    Rating = __decorate([
	        core_1.Component({
	            selector: 'rating[ngModel]',
	            directives: [common_1.NgFor],
	            template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ngFor #r [ngForOf]=\"range\" #index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ngClass]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  "
	        }),
	        __param(0, core_1.Self()), 
	        __metadata('design:paramtypes', [common_1.NgModel])
	    ], Rating);
	    return Rating;
	})();
	exports.Rating = Rating;


/***/ },

/***/ 113:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var common_2 = __webpack_require__(45);
	// todo: add active event to tab
	// todo: fix? mixing static and dynamic tabs position tabs in order of creation
	var Tabset = (function () {
	    function Tabset() {
	        this.tabs = [];
	    }
	    Object.defineProperty(Tabset.prototype, "classMap", {
	        get: function () {
	            var map = {
	                'nav-stacked': this.vertical,
	                'nav-justified': this.justified
	            };
	            map['nav-' + (this.type || 'tabs')] = true;
	            return map;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Tabset.prototype.ngOnInit = function () {
	        this.type = this.type !== 'undefined' ? this.type : 'tabs';
	    };
	    Tabset.prototype.addTab = function (tab) {
	        this.tabs.push(tab);
	        tab.active = this.tabs.length === 1 && tab.active !== false;
	    };
	    Tabset.prototype.removeTab = function (tab) {
	        var index = this.tabs.indexOf(tab);
	        if (index === -1) {
	            return;
	        }
	        // Select a new tab if the tab to be removed is selected and not destroyed
	        if (tab.active && this.tabs.length > 1) {
	            // If this is the last tab, select the previous tab. else, the next tab.
	            var newActiveIndex = index === this.tabs.length - 1 ? index - 1 : index + 1;
	            this.tabs[newActiveIndex].active = true;
	        }
	        this.tabs.slice(index, 1);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Tabset.prototype, "vertical", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Tabset.prototype, "justified", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Tabset.prototype, "type", void 0);
	    Tabset = __decorate([
	        core_1.Component({
	            selector: 'tabset',
	            directives: [common_1.NgClass, common_2.NgTransclude],
	            template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"#tabz of tabs\" class=\"nav-item\" [ngClass]=\"{active: tabz.active, disabled: tabz.disabled}\">\n          <a href class=\"nav-link\" [ngClass]=\"{active: tabz.active, disabled: tabz.disabled}\" (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], Tabset);
	    return Tabset;
	})();
	exports.Tabset = Tabset;
	// TODO: templateUrl?
	var Tab = (function () {
	    function Tab(tabset) {
	        this.tabset = tabset;
	        this.select = new core_1.EventEmitter();
	        this.deselect = new core_1.EventEmitter();
	        this.addClass = true;
	        this.tabset.addTab(this);
	    }
	    Object.defineProperty(Tab.prototype, "active", {
	        /** tab active state toogle */
	        get: function () {
	            return this._active;
	        },
	        set: function (active) {
	            var _this = this;
	            if (this.disabled && active || !active) {
	                if (!active) {
	                    this._active = active;
	                }
	                this.deselect.emit(this);
	                return;
	            }
	            this._active = active;
	            this.select.emit(this);
	            this.tabset.tabs.forEach(function (tab) {
	                if (tab !== _this) {
	                    tab.active = false;
	                }
	            });
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Tab.prototype.ngDoCheck = function () {
	        return true;
	    };
	    Tab.prototype.ngOnInit = function () {
	    };
	    Tab.prototype.ngOnDestroy = function () {
	        this.tabset.removeTab(this);
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], Tab.prototype, "heading", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Tab.prototype, "disabled", void 0);
	    __decorate([
	        core_1.HostBinding('class.active'),
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Tab.prototype, "active", null);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Tab.prototype, "select", void 0);
	    __decorate([
	        core_1.Output(), 
	        __metadata('design:type', core_1.EventEmitter)
	    ], Tab.prototype, "deselect", void 0);
	    __decorate([
	        core_1.HostBinding('class.tab-pane'), 
	        __metadata('design:type', Object)
	    ], Tab.prototype, "addClass", void 0);
	    Tab = __decorate([
	        core_1.Directive({ selector: 'tab, [tab]' }), 
	        __metadata('design:paramtypes', [Tabset])
	    ], Tab);
	    return Tab;
	})();
	exports.Tab = Tab;
	var TabHeading = (function () {
	    function TabHeading(templateRef, tab) {
	        this.templateRef = templateRef;
	        tab.headingRef = templateRef;
	    }
	    TabHeading = __decorate([
	        core_1.Directive({ selector: '[tab-heading]' }), 
	        __metadata('design:paramtypes', [core_1.TemplateRef, Tab])
	    ], TabHeading);
	    return TabHeading;
	})();
	exports.TabHeading = TabHeading;
	exports.TAB_COMPONENTS = [Tab, TabHeading, Tabset];
	/**
	 * @deprecated - use TAB_COMPONENTS instead
	 * @type {Tab|TabHeading|Tabset[]}
	 */
	exports.tabs = [Tab, TabHeading, Tabset];


/***/ },

/***/ 114:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var __param = (this && this.__param) || function (paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); }
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	// todo: implement global configuration via DI
	// todo: refactor directive has to many functions! (extract to stateless helper)
	// todo: use moment js?
	// todo: implement `time` validator
	// todo: replace increment/decrement blockers with getters, or extract
	// todo: unify work with selected
	exports.timepickerConfig = {
	    hourStep: 1,
	    minuteStep: 1,
	    showMeridian: true,
	    meridians: null,
	    readonlyInput: false,
	    mousewheel: true,
	    arrowkeys: true,
	    showSpinners: true,
	    min: void 0,
	    max: void 0
	};
	function isDefined(value) {
	    return typeof value !== 'undefined';
	}
	function def(value, fn, defaultValue) {
	    return fn(value) ? value : defaultValue;
	}
	function addMinutes(date, minutes) {
	    var dt = new Date(date.getTime() + minutes * 60000);
	    var newDate = new Date(date);
	    newDate.setHours(dt.getHours(), dt.getMinutes());
	    return newDate;
	}
	// TODO: templateUrl
	var Timepicker = (function () {
	    function Timepicker(cd) {
	        this.cd = cd;
	        this.meridians = ['AM', 'PM']; // ??
	        // result value
	        this._selected = new Date();
	        this.onChange = function (_) { };
	        this.onTouched = function () { };
	        cd.valueAccessor = this;
	    }
	    Object.defineProperty(Timepicker.prototype, "showMeridian", {
	        get: function () {
	            return this._showMeridian;
	        },
	        set: function (value) {
	            this._showMeridian = value;
	            // || !this.$error.time
	            if (true) {
	                this.updateTemplate();
	                return;
	            }
	            // Evaluate from template
	            var hours = this.getHoursFromTemplate();
	            var minutes = this.getMinutesFromTemplate();
	            if (isDefined(hours) && isDefined(minutes)) {
	                this.selected.setHours(hours);
	                this.refresh();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Timepicker.prototype, "selected", {
	        get: function () {
	            return this._selected;
	        },
	        set: function (v) {
	            if (v) {
	                this._selected = v;
	                this.updateTemplate();
	                this.cd.viewToModelUpdate(this.selected);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    // todo: add formatter value to Date object
	    Timepicker.prototype.ngOnInit = function () {
	        // todo: take in account $locale.DATETIME_FORMATS.AMPMS;
	        this.meridians = def(this.meridians, isDefined, exports.timepickerConfig.meridians) || ['AM', 'PM'];
	        this.mousewheel = def(this.mousewheel, isDefined, exports.timepickerConfig.mousewheel);
	        if (this.mousewheel) {
	            this.setupMousewheelEvents();
	        }
	        this.arrowkeys = def(this.arrowkeys, isDefined, exports.timepickerConfig.arrowkeys);
	        if (this.arrowkeys) {
	            this.setupArrowkeyEvents();
	        }
	        this.readonlyInput = def(this.readonlyInput, isDefined, exports.timepickerConfig.readonlyInput);
	        this.setupInputEvents();
	        this.hourStep = def(this.hourStep, isDefined, exports.timepickerConfig.hourStep);
	        this.minuteStep = def(this.minuteStep, isDefined, exports.timepickerConfig.minuteStep);
	        this.min = def(this.min, isDefined, exports.timepickerConfig.min);
	        this.max = def(this.max, isDefined, exports.timepickerConfig.max);
	        // 12H / 24H mode
	        this.showMeridian = def(this.showMeridian, isDefined, exports.timepickerConfig.showMeridian);
	        this.showSpinners = def(this.showSpinners, isDefined, exports.timepickerConfig.showSpinners);
	    };
	    Timepicker.prototype.writeValue = function (v) {
	        if (v === this.selected) {
	            return;
	        }
	        if (v && v instanceof Date) {
	            this.selected = v;
	            return;
	        }
	        this.selected = v ? new Date(v) : null;
	        // todo: implement logic from render
	    };
	    Timepicker.prototype.refresh = function (type) {
	        // this.makeValid();
	        this.updateTemplate();
	        this.cd.viewToModelUpdate(this.selected);
	    };
	    Timepicker.prototype.updateTemplate = function (keyboardChange) {
	        var hours = this.selected.getHours();
	        var minutes = this.selected.getMinutes();
	        if (this.showMeridian) {
	            // Convert 24 to 12 hour system
	            hours = (hours === 0 || hours === 12) ? 12 : hours % 12;
	        }
	        // this.hours = keyboardChange === 'h' ? hours : this.pad(hours);
	        // if (keyboardChange !== 'm') {
	        //  this.minutes = this.pad(minutes);
	        // }
	        this.hours = this.pad(hours);
	        this.minutes = this.pad(minutes);
	        this.meridian = this.selected.getHours() < 12 ? this.meridians[0] : this.meridians[1];
	    };
	    Timepicker.prototype.getHoursFromTemplate = function () {
	        var hours = parseInt(this.hours, 10);
	        var valid = this.showMeridian ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
	        if (!valid) {
	            return undefined;
	        }
	        if (this.showMeridian) {
	            if (hours === 12) {
	                hours = 0;
	            }
	            if (this.meridian === this.meridians[1]) {
	                hours = hours + 12;
	            }
	        }
	        return hours;
	    };
	    Timepicker.prototype.getMinutesFromTemplate = function () {
	        var minutes = parseInt(this.minutes, 10);
	        return (minutes >= 0 && minutes < 60) ? minutes : undefined;
	    };
	    Timepicker.prototype.pad = function (value) {
	        return (isDefined(value) && value.toString().length < 2) ? '0' + value : value.toString();
	    };
	    Timepicker.prototype.setupMousewheelEvents = function () {
	    };
	    Timepicker.prototype.setupArrowkeyEvents = function () {
	    };
	    Timepicker.prototype.setupInputEvents = function () {
	    };
	    Timepicker.prototype.updateHours = function () {
	        if (this.readonlyInput) {
	            return;
	        }
	        var hours = this.getHoursFromTemplate();
	        var minutes = this.getMinutesFromTemplate();
	        if (!isDefined(hours) || !isDefined(minutes)) {
	        }
	        this.selected.setHours(hours);
	        if (this.selected < this.min || this.selected > this.max) {
	        }
	        else {
	            this.refresh('h');
	        }
	    };
	    Timepicker.prototype.hoursOnBlur = function (event) {
	        if (this.readonlyInput) {
	            return;
	        }
	        // todo: binded with validation
	        if (!this.invalidHours && parseInt(this.hours, 10) < 10) {
	            this.hours = this.pad(this.hours);
	        }
	    };
	    Timepicker.prototype.updateMinutes = function () {
	        if (this.readonlyInput) {
	            return;
	        }
	        var minutes = this.getMinutesFromTemplate();
	        var hours = this.getHoursFromTemplate();
	        if (!isDefined(minutes) || !isDefined(hours)) {
	        }
	        this.selected.setMinutes(minutes);
	        if (this.selected < this.min || this.selected > this.max) {
	        }
	        else {
	            this.refresh('m');
	        }
	    };
	    Timepicker.prototype.minutesOnBlur = function (event) {
	        if (this.readonlyInput) {
	            return;
	        }
	        if (!this.invalidMinutes && parseInt(this.minutes, 10) < 10) {
	            this.minutes = this.pad(this.minutes);
	        }
	    };
	    Timepicker.prototype.noIncrementHours = function () {
	        var incrementedSelected = addMinutes(this.selected, this.hourStep * 60);
	        return incrementedSelected > this.max ||
	            (incrementedSelected < this.selected && incrementedSelected < this.min);
	    };
	    Timepicker.prototype.noDecrementHours = function () {
	        var decrementedSelected = addMinutes(this.selected, -this.hourStep * 60);
	        return decrementedSelected < this.min ||
	            (decrementedSelected > this.selected && decrementedSelected > this.max);
	    };
	    Timepicker.prototype.noIncrementMinutes = function () {
	        var incrementedSelected = addMinutes(this.selected, this.minuteStep);
	        return incrementedSelected > this.max ||
	            (incrementedSelected < this.selected && incrementedSelected < this.min);
	    };
	    Timepicker.prototype.noDecrementMinutes = function () {
	        var decrementedSelected = addMinutes(this.selected, -this.minuteStep);
	        return decrementedSelected < this.min ||
	            (decrementedSelected > this.selected && decrementedSelected > this.max);
	    };
	    Timepicker.prototype.addMinutesToSelected = function (minutes) {
	        this.selected = addMinutes(this.selected, minutes);
	        this.refresh();
	    };
	    Timepicker.prototype.noToggleMeridian = function () {
	        if (this.selected.getHours() < 13) {
	            return addMinutes(this.selected, 12 * 60) > this.max;
	        }
	        else {
	            return addMinutes(this.selected, -12 * 60) < this.min;
	        }
	    };
	    Timepicker.prototype.incrementHours = function () {
	        if (!this.noIncrementHours()) {
	            this.addMinutesToSelected(this.hourStep * 60);
	        }
	    };
	    Timepicker.prototype.decrementHours = function () {
	        if (!this.noDecrementHours()) {
	            this.addMinutesToSelected(-this.hourStep * 60);
	        }
	    };
	    Timepicker.prototype.incrementMinutes = function () {
	        if (!this.noIncrementMinutes()) {
	            this.addMinutesToSelected(this.minuteStep);
	        }
	    };
	    Timepicker.prototype.decrementMinutes = function () {
	        if (!this.noDecrementMinutes()) {
	            this.addMinutesToSelected(-this.minuteStep);
	        }
	    };
	    Timepicker.prototype.toggleMeridian = function () {
	        if (!this.noToggleMeridian()) {
	            var sign = this.selected.getHours() < 12 ? 1 : -1;
	            this.addMinutesToSelected(12 * 60 * sign);
	        }
	    };
	    Timepicker.prototype.registerOnChange = function (fn) {
	        this.onChange = fn;
	    };
	    Timepicker.prototype.registerOnTouched = function (fn) {
	        this.onTouched = fn;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Timepicker.prototype, "hourStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Number)
	    ], Timepicker.prototype, "minuteStep", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Timepicker.prototype, "readonlyInput", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Timepicker.prototype, "mousewheel", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Timepicker.prototype, "arrowkeys", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Timepicker.prototype, "showSpinners", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Date)
	    ], Timepicker.prototype, "min", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Date)
	    ], Timepicker.prototype, "max", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Array)
	    ], Timepicker.prototype, "meridians", void 0);
	    __decorate([
	        // ??
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], Timepicker.prototype, "showMeridian", null);
	    Timepicker = __decorate([
	        core_1.Component({
	            selector: 'timepicker[ngModel]',
	            directives: [common_1.NgClass],
	            template: "\n    <table>\n      <tbody>\n        <tr class=\"text-center\" [ngClass]=\"{hidden: !showSpinners}\">\n          <td><a (click)=\"incrementHours()\" [ngClass]=\"{disabled: noIncrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"incrementMinutes()\" [ngClass]=\"{disabled: noIncrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" [hidden]=\"!showMeridian\"></td>\n        </tr>\n        <tr>\n          <td class=\"form-group\" [ngClass]=\"{'has-error': invalidHours}\">\n            <input style=\"width:50px;\" type=\"text\" [(ngModel)]=\"hours\" (change)=\"updateHours()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"hoursOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td>:</td>\n          <td class=\"form-group\" [ngClass]=\"{'has-error': invalidMinutes}\">\n            <input style=\"width:50px;\" type=\"text\" [(ngModel)]=\"minutes\" (change)=\"updateMinutes()\" class=\"form-control text-center\" [readonly]=\"readonlyInput\" (blur)=\"minutesOnBlur($event)\" maxlength=\"2\">\n          </td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" [hidden]=\"!showMeridian\"><button type=\"button\" [ngClass]=\"{disabled: noToggleMeridian()}\" class=\"btn btn-default text-center\" (click)=\"toggleMeridian()\">{{meridian}}</button></td>\n        </tr>\n        <tr class=\"text-center\" [ngClass]=\"{hidden: !showSpinners}\">\n          <td><a (click)=\"decrementHours()\" [ngClass]=\"{disabled: noDecrementHours()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td>&nbsp;</td>\n          <td><a (click)=\"decrementMinutes()\" [ngClass]=\"{disabled: noDecrementMinutes()}\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n          <td [ngClass]=\"{hidden: !showMeridian}\" [hidden]=\"!showMeridian\"></td>\n        </tr>\n      </tbody>\n    </table>\n  "
	        }),
	        __param(0, core_1.Self()), 
	        __metadata('design:paramtypes', [common_1.NgModel])
	    ], Timepicker);
	    return Timepicker;
	})();
	exports.Timepicker = Timepicker;


/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	var core_2 = __webpack_require__(2);
	var position_1 = __webpack_require__(23);
	var TooltipOptions = (function () {
	    function TooltipOptions(options) {
	        Object.assign(this, options);
	    }
	    return TooltipOptions;
	})();
	var TooltipContainer = (function () {
	    function TooltipContainer(element, options) {
	        this.element = element;
	        Object.assign(this, options);
	        this.classMap = { 'in': false };
	        this.classMap[options.placement] = true;
	    }
	    TooltipContainer.prototype.position = function (hostEl) {
	        this.display = 'block';
	        this.top = '0px';
	        this.left = '0px';
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, this.appendToBody);
	        this.top = p.top + 'px';
	        this.left = p.left + 'px';
	        this.classMap['in'] = true;
	    };
	    TooltipContainer = __decorate([
	        core_1.Component({
	            selector: 'tooltip-container',
	            directives: [common_1.NgClass, common_1.NgStyle],
	            template: "\n    <div class=\"tooltip\" role=\"tooltip\"\n     [ngStyle]=\"{top: top, left: left, display: display}\"\n     [ngClass]=\"classMap\" >\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\">\n        {{content}}\n      </div>\n    </div>"
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, TooltipOptions])
	    ], TooltipContainer);
	    return TooltipContainer;
	})();
	var Tooltip = (function () {
	    function Tooltip(element, loader) {
	        this.element = element;
	        this.loader = loader;
	        this.placement = 'top';
	        this.visible = false;
	    }
	    Tooltip.prototype.ngOnInit = function () {
	    };
	    // todo: filter triggers
	    // params: event, target
	    Tooltip.prototype.show = function () {
	        var _this = this;
	        if (this.visible) {
	            return;
	        }
	        this.visible = true;
	        var options = new TooltipOptions({
	            content: this.content,
	            placement: this.placement
	        });
	        var binding = core_2.Injector.resolve([
	            core_2.bind(TooltipOptions).toValue(options)
	        ]);
	        this.tooltip = this.loader
	            .loadNextToLocation(TooltipContainer, this.element, binding)
	            .then(function (componentRef) {
	            componentRef.instance.position(_this.element);
	            return componentRef;
	        });
	    };
	    // params event, target
	    Tooltip.prototype.hide = function () {
	        if (!this.visible) {
	            return;
	        }
	        this.visible = false;
	        this.tooltip.then(function (componentRef) {
	            componentRef.dispose();
	            return componentRef;
	        });
	    };
	    __decorate([
	        core_1.Input('tooltip'), 
	        __metadata('design:type', String)
	    ], Tooltip.prototype, "content", void 0);
	    __decorate([
	        core_1.Input('tooltip-placement'), 
	        __metadata('design:type', String)
	    ], Tooltip.prototype, "placement", void 0);
	    __decorate([
	        core_1.Input('tooltip-isOpen'), 
	        __metadata('design:type', Boolean)
	    ], Tooltip.prototype, "isOpen", void 0);
	    __decorate([
	        core_1.Input('tooltip-enable'), 
	        __metadata('design:type', Boolean)
	    ], Tooltip.prototype, "enable", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Boolean)
	    ], Tooltip.prototype, "appendToBody", void 0);
	    __decorate([
	        core_1.HostListener('focusin', ['$event', '$target']),
	        core_1.HostListener('mouseenter', ['$event', '$target']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], Tooltip.prototype, "show", null);
	    __decorate([
	        core_1.HostListener('focusout', ['$event', '$target']),
	        core_1.HostListener('mouseleave', ['$event', '$target']), 
	        __metadata('design:type', Function), 
	        __metadata('design:paramtypes', []), 
	        __metadata('design:returntype', void 0)
	    ], Tooltip.prototype, "hide", null);
	    Tooltip = __decorate([
	        core_1.Directive({ selector: '[tooltip]' }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader])
	    ], Tooltip);
	    return Tooltip;
	})();
	exports.Tooltip = Tooltip;
	exports.TOOLTIP_COMPONENTS = [Tooltip, TooltipContainer];
	/**
	 * @deprecated
	 * @type {Tooltip|TooltipContainer[]}
	 */
	exports.tooltip = [Tooltip, TooltipContainer];


/***/ },

/***/ 116:
/***/ function(module, exports) {

	exports.latinMap = {
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


/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	var latin_map_1 = __webpack_require__(116);
	var TypeaheadUtils = (function () {
	    function TypeaheadUtils() {
	    }
	    TypeaheadUtils.latinize = function (str) {
	        return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
	            return TypeaheadUtils.latinMap[a] || a;
	        });
	    };
	    TypeaheadUtils.escapeRegexp = function (queryToEscape) {
	        // Regex: capture the whole query string and replace it with the string that will be used to match
	        // the results, for example if the capture is 'a' the result will be \a
	        return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	    };
	    TypeaheadUtils.tokenize = function (str, wordRegexDelimiters, phraseRegexDelimiters) {
	        if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
	        if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
	        var regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
	        var preTokenized = str.split(new RegExp(regexStr, 'g'));
	        var result = [];
	        var preTokenizedLength = preTokenized.length;
	        var token;
	        var replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
	        for (var i = 0; i < preTokenizedLength; i += 1) {
	            token = preTokenized[i];
	            if (token && token.length && token !== wordRegexDelimiters) {
	                result.push(token.replace(replacePhraseDelimiters, ''));
	            }
	        }
	        return result;
	    };
	    TypeaheadUtils.latinMap = latin_map_1.latinMap;
	    return TypeaheadUtils;
	})();
	exports.TypeaheadUtils = TypeaheadUtils;


/***/ },

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(4);
	// https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
	function setProperty(renderer, elementRef, propName, propValue) {
	    renderer.setElementProperty(elementRef, propName, propValue);
	}
	var core_2 = __webpack_require__(2);
	var ng2_bootstrap_config_1 = __webpack_require__(14);
	var position_1 = __webpack_require__(23);
	var typeahead_utils_1 = __webpack_require__(117);
	var TEMPLATE = (_a = {},
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n  <div class=\"dropdown-menu\"\n      [ngStyle]=\"{top: top, left: left, display: display}\"\n      style=\"display: block\">\n      <a href=\"#\"\n         *ngFor=\"#match of matches\"\n         (click)=\"selectMatch(match, $event)\"\n         [ngClass]=\"{active: isActive(match) }\"\n         (mouseenter)=\"selectActive(match)\"\n         class=\"dropdown-item\"\n         [innerHtml]=\"hightlight(match, query)\"></a>\n  </div>\n  ",
	    _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n  <ul class=\"dropdown-menu\"\n      [ngStyle]=\"{top: top, left: left, display: display}\"\n      style=\"display: block\">\n    <li *ngFor=\"#match of matches\"\n        [ngClass]=\"{active: isActive(match) }\"\n        (mouseenter)=\"selectActive(match)\">\n        <a href=\"#\" (click)=\"selectMatch(match, $event)\" tabindex=\"-1\" [inner-html]=\"hightlight(match, query)\"></a>\n    </li>\n  </ul>\n  ",
	    _a
	);
	var TypeaheadOptions = (function () {
	    function TypeaheadOptions(options) {
	        Object.assign(this, options);
	    }
	    return TypeaheadOptions;
	})();
	exports.TypeaheadOptions = TypeaheadOptions;
	var TypeaheadContainer = (function () {
	    function TypeaheadContainer(element, options) {
	        this.element = element;
	        this._matches = [];
	        Object.assign(this, options);
	    }
	    Object.defineProperty(TypeaheadContainer.prototype, "matches", {
	        get: function () {
	            return this._matches;
	        },
	        set: function (value) {
	            this._matches = value;
	            if (this._matches.length > 0) {
	                this._active = this._matches[0];
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(TypeaheadContainer.prototype, "field", {
	        set: function (value) {
	            this._field = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    TypeaheadContainer.prototype.position = function (hostEl) {
	        this.display = 'block';
	        this.top = '0px';
	        this.left = '0px';
	        var p = position_1.positionService
	            .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, false);
	        this.top = p.top + 'px';
	        this.left = p.left + 'px';
	    };
	    TypeaheadContainer.prototype.selectActiveMatch = function () {
	        this.selectMatch(this._active);
	    };
	    TypeaheadContainer.prototype.prevActiveMatch = function () {
	        var index = this.matches.indexOf(this._active);
	        this._active = this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1];
	    };
	    TypeaheadContainer.prototype.nextActiveMatch = function () {
	        var index = this.matches.indexOf(this._active);
	        this._active = this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1];
	    };
	    TypeaheadContainer.prototype.selectActive = function (value) {
	        this._active = value;
	    };
	    TypeaheadContainer.prototype.isActive = function (value) {
	        return this._active === value;
	    };
	    TypeaheadContainer.prototype.selectMatch = function (value, e) {
	        if (e === void 0) { e = null; }
	        if (e) {
	            e.stopPropagation();
	            e.preventDefault();
	        }
	        this.parent.changeModel(value);
	        this.parent.typeaheadOnSelect.next({
	            item: value
	        });
	        return false;
	    };
	    TypeaheadContainer.prototype.hightlight = function (item, query) {
	        var itemStr = (typeof item === 'object' && this._field ? item[this._field] : item).toString();
	        var itemStrHelper = (this.parent.latinize ? typeahead_utils_1.TypeaheadUtils.latinize(itemStr) : itemStr).toLowerCase();
	        var startIdx;
	        var tokenLen;
	        // Replaces the capture string with the same string inside of a "strong" tag
	        if (typeof query === 'object') {
	            var queryLen = query.length;
	            for (var i = 0; i < queryLen; i += 1) {
	                // query[i] is already latinized and lower case
	                startIdx = itemStrHelper.indexOf(query[i]);
	                tokenLen = query[i].length;
	                if (startIdx >= 0 && tokenLen > 0) {
	                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
	                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
	                }
	            }
	        }
	        else if (query) {
	            // query is already latinized and lower case
	            startIdx = itemStrHelper.indexOf(query);
	            tokenLen = query.length;
	            if (startIdx >= 0 && tokenLen > 0) {
	                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
	            }
	        }
	        return itemStr;
	    };
	    TypeaheadContainer = __decorate([
	        core_1.Component({
	            selector: 'typeahead-container',
	            directives: [common_1.CORE_DIRECTIVES],
	            template: TEMPLATE[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme],
	            encapsulation: core_1.ViewEncapsulation.None
	        }), 
	        __metadata('design:paramtypes', [core_1.ElementRef, TypeaheadOptions])
	    ], TypeaheadContainer);
	    return TypeaheadContainer;
	})();
	exports.TypeaheadContainer = TypeaheadContainer;
	// todo: options loading by http not yet implemented
	var Typeahead = (function () {
	    function Typeahead(cd, element, renderer, loader) {
	        this.cd = cd;
	        this.element = element;
	        this.renderer = renderer;
	        this.loader = loader;
	        this.typeaheadLoading = new core_1.EventEmitter();
	        this.typeaheadNoResults = new core_1.EventEmitter();
	        this.typeaheadOnSelect = new core_1.EventEmitter();
	        this.latinize = true;
	        this.singleWords = true;
	        this.async = null;
	        this.wordDelimiters = ' ';
	        this.phraseDelimiters = '\'"';
	        this._matches = [];
	        this.placement = 'bottom-left';
	    }
	    Object.defineProperty(Typeahead.prototype, "matches", {
	        get: function () {
	            return this._matches;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Typeahead.prototype.debounce = function (func, wait) {
	        var timeout;
	        var args;
	        var timestamp;
	        var waitOriginal = wait;
	        return function () {
	            // save details of latest call
	            args = [].slice.call(arguments, 0);
	            timestamp = Date.now();
	            // this trick is about implementing of 'typeaheadWaitMs'
	            // in this case we have adaptive 'wait' parameter
	            // we should use standard 'wait'('waitOriginal') in case of
	            // popup is opened, otherwise - 'typeaheadWaitMs' parameter
	            wait = this.container ? waitOriginal : this.waitMs;
	            // this is where the magic happens
	            var later = function () {
	                // how long ago was the last call
	                var last = Date.now() - timestamp;
	                // if the latest call was less that the wait period ago
	                // then we reset the timeout to wait for the difference
	                if (last < wait) {
	                    timeout = setTimeout(later, wait - last);
	                }
	                else {
	                    timeout = null;
	                    func.apply(this, args);
	                }
	            };
	            // we only need to set the timer now if one isn't already running
	            if (!timeout) {
	                timeout = setTimeout(later, wait);
	            }
	        };
	    };
	    Typeahead.prototype.processMatches = function () {
	        this._matches = [];
	        if (this.cd.model.toString().length >= this.minLength) {
	            // If singleWords, break model here to not be doing extra work on each iteration
	            var normalizedQuery = (this.latinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
	            normalizedQuery = this.singleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.wordDelimiters, this.phraseDelimiters) : normalizedQuery;
	            for (var i = 0; i < this.source.length; i++) {
	                var match = void 0;
	                if (typeof this.source[i] === 'object' &&
	                    this.source[i][this.field]) {
	                    match = this.latinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.source[i][this.field].toString()) : this.source[i][this.field].toString();
	                }
	                if (typeof this.source[i] === 'string') {
	                    match = this.latinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.source[i].toString()) : this.source[i].toString();
	                }
	                if (!match) {
	                    console.log('Invalid match type', typeof this.source[i], this.field);
	                    continue;
	                }
	                if (this.testMatch(match.toLowerCase(), normalizedQuery)) {
	                    this._matches.push(this.source[i]);
	                    if (this._matches.length > this.optionsLimit - 1) {
	                        break;
	                    }
	                }
	            }
	        }
	    };
	    Typeahead.prototype.testMatch = function (match, test) {
	        var spaceLength;
	        if (typeof test === 'object') {
	            spaceLength = test.length;
	            for (var i = 0; i < spaceLength; i += 1) {
	                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
	                    return false;
	                }
	            }
	            return true;
	        }
	        else {
	            return match.indexOf(test) >= 0;
	        }
	    };
	    Typeahead.prototype.finalizeAsyncCall = function () {
	        this.typeaheadLoading.next(false);
	        this.typeaheadNoResults.next(this.cd.model.toString().length >=
	            this.minLength && this.matches.length <= 0);
	        if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
	            this.hide();
	            return;
	        }
	        if (this.container && this._matches.length > 0) {
	            // This improves the speedas it won't have to be done for each list item
	            var normalizedQuery = (this.latinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
	            this.container.query = this.singleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.wordDelimiters, this.phraseDelimiters) : normalizedQuery;
	            this.container.matches = this._matches;
	        }
	        if (!this.container && this._matches.length > 0) {
	            this.show(this._matches);
	        }
	    };
	    Typeahead.prototype.ngOnInit = function () {
	        var _this = this;
	        this.optionsLimit = this.optionsLimit || 20;
	        this.minLength = this.minLength || 1;
	        this.waitMs = this.waitMs || 0;
	        // async should be false in case of array
	        if (this.async === null && typeof this.source !== 'function') {
	            this.async = false;
	        }
	        // async should be true for any case of function
	        if (typeof this.source === 'function') {
	            this.async = true;
	        }
	        if (this.async === true) {
	            this.debouncer = this.debounce(function () {
	                if (typeof _this.source === 'function') {
	                    _this.source().then(function (matches) {
	                        _this._matches = [];
	                        if (_this.cd.model.toString().length >= _this.minLength) {
	                            for (var i = 0; i < matches.length; i++) {
	                                _this._matches.push(matches[i]);
	                                if (_this._matches.length > _this.optionsLimit - 1) {
	                                    break;
	                                }
	                            }
	                        }
	                        _this.finalizeAsyncCall();
	                    });
	                }
	                // source is array
	                if (typeof _this.source === 'object' && _this.source.length) {
	                    _this.processMatches();
	                    _this.finalizeAsyncCall();
	                }
	            }, 100);
	        }
	    };
	    Typeahead.prototype.onChange = function (e) {
	        if (this.container) {
	            // esc
	            if (e.keyCode === 27) {
	                this.hide();
	                return;
	            }
	            // up
	            if (e.keyCode === 38) {
	                this.container.prevActiveMatch();
	                return;
	            }
	            // down
	            if (e.keyCode === 40) {
	                this.container.nextActiveMatch();
	                return;
	            }
	            // enter
	            if (e.keyCode === 13) {
	                this.container.selectActiveMatch();
	                return;
	            }
	        }
	        this.typeaheadLoading.next(true);
	        if (this.async === true) {
	            this.debouncer();
	        }
	        if (this.async === false) {
	            this.processMatches();
	            this.finalizeAsyncCall();
	        }
	    };
	    Typeahead.prototype.changeModel = function (value) {
	        var valueStr = ((typeof value === 'object' && this.field) ? value[this.field] : value).toString();
	        this.cd.viewToModelUpdate(valueStr);
	        setProperty(this.renderer, this.element, 'value', valueStr);
	        this.hide();
	    };
	    Typeahead.prototype.show = function (matches) {
	        var _this = this;
	        var options = new TypeaheadOptions({
	            placement: this.placement,
	            animation: false
	        });
	        var binding = core_2.Injector.resolve([
	            core_2.bind(TypeaheadOptions).toValue(options)
	        ]);
	        this.popup = this.loader
	            .loadNextToLocation(TypeaheadContainer, this.element, binding)
	            .then(function (componentRef) {
	            componentRef.instance.position(_this.element);
	            _this.container = componentRef.instance;
	            _this.container.parent = _this;
	            // This improves the speedas it won't have to be done for each list item
	            var normalizedQuery = (_this.latinize ? typeahead_utils_1.TypeaheadUtils.latinize(_this.cd.model) : _this.cd.model).toString().toLowerCase();
	            _this.container.query = _this.singleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, _this.wordDelimiters, _this.phraseDelimiters) : normalizedQuery;
	            _this.container.matches = matches;
	            _this.container.field = _this.field;
	            _this.element.nativeElement.focus();
	            return componentRef;
	        });
	    };
	    Typeahead.prototype.hide = function () {
	        var _this = this;
	        if (this.container) {
	            this.popup.then(function (componentRef) {
	                componentRef.dispose();
	                _this.container = null;
	                return componentRef;
	            });
	        }
	    };
	    Typeahead = __decorate([
	        core_1.Directive({
	            selector: 'typeahead, [typeahead]',
	            properties: [
	                'source:typeahead',
	                // todo: not yet implemented
	                'appendToBody:typeaheadAppendToBody',
	                // todo: not yet implemented
	                'editable:typeaheadEditable',
	                // todo: not yet implemented
	                'focusFirst:typeaheadFocusFirst',
	                // todo: not yet implemented
	                'inputFormatter:typeaheadInputFormatter',
	                'minLength:typeaheadMinLength',
	                // todo: not yet implemented
	                'selectOnExact:typeaheadSelectOnExact',
	                // todo: not yet implemented
	                'templateUrl:typeaheadTemplateUrl',
	                // todo: not yet implemented
	                'popupTemplateUrl:typeaheadPopupTemplateUrl',
	                'waitMs:typeaheadWaitMs',
	                'optionsLimit:typeaheadOptionsLimit',
	                // todo: not yet implemented
	                'selectOnBlur:typeaheadSelectOnBlur',
	                // todo: not yet implemented
	                'focusOnSelect:typeaheadFocusOnSelect',
	                'field:typeaheadOptionField',
	                'async:typeaheadAsync',
	                'latinize:typeaheadLatinize',
	                'singleWords:typeaheadSingleWords',
	                'wordDelimiters:typeaheadWordDelimiters',
	                'phraseDelimiters:typeaheadPhraseDelimiters'
	            ],
	            events: ['typeaheadLoading', 'typeaheadNoResults', 'typeaheadOnSelect'],
	            host: {
	                '(keyup)': 'onChange($event)'
	            }
	        }), 
	        __metadata('design:paramtypes', [common_1.NgModel, core_1.ElementRef, core_1.Renderer, core_1.DynamicComponentLoader])
	    ], Typeahead);
	    return Typeahead;
	})();
	exports.Typeahead = Typeahead;
	var _a;


/***/ }

});
//# sourceMappingURL=angular2-bootstrap.js.map