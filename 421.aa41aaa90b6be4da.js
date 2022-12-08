"use strict";(self.webpackChunkngx_bootstrap_docs=self.webpackChunkngx_bootstrap_docs||[]).push([[421],{23421:(p,m,n)=>{n.r(m),n.d(m,{DemoTimepickerModule:()=>$,TimepickerSectionComponent:()=>_});var l=n(36895),a=n(90433),F=n(59459),u=n(26672),T=n(87633),e=n(41571),d=n(59602);let g=(()=>{class o{constructor(){this.mytime=new Date}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-basic"]],decls:3,vars:2,consts:[[3,"ngModel","ngModelChange"],[1,"alert","alert-info"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.mytime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA()),2&i&&(e.Q6J("ngModel",t.mytime),e.xp6(2),e.hij("Time is: ",t.mytime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),h=(()=>{class o{constructor(){this.ismeridian=!0,this.mytime=new Date}toggleMode(){this.ismeridian=!this.ismeridian}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-meridian"]],decls:6,vars:3,consts:[[3,"ngModel","showMeridian","ngModelChange"],[1,"alert","alert-info"],["type","button",1,"btn","btn-info",3,"click"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.mytime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA(),e._UZ(3,"br"),e.TgZ(4,"button",2),e.NdJ("click",function(){return t.toggleMode()}),e._uU(5,"12H / 24H"),e.qZA()),2&i&&(e.Q6J("ngModel",t.mytime)("showMeridian",t.ismeridian),e.xp6(2),e.hij("Time is: ",t.mytime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),C=(()=>{class o{constructor(){this.mytime=new Date,this.meridians=["AM(Midnight to Noon)","PM(Noon to Midnight)"]}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-custom-meridian"]],decls:3,vars:3,consts:[[3,"ngModel","meridians","ngModelChange"],[1,"alert","alert-info"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.mytime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA()),2&i&&(e.Q6J("ngModel",t.mytime)("meridians",t.meridians),e.xp6(2),e.hij("Time is: ",t.mytime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),f=(()=>{class o{constructor(){this.myTime=new Date,this.minTime=new Date,this.maxTime=new Date,this.minTime.setHours(8),this.minTime.setMinutes(0),this.maxTime.setHours(23),this.maxTime.setMinutes(55)}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-min-max"]],decls:3,vars:4,consts:[[3,"ngModel","min","max","ngModelChange"],[1,"alert","alert-info"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA()),2&i&&(e.Q6J("ngModel",t.myTime)("min",t.minTime)("max",t.maxTime),e.xp6(2),e.hij("Time is: ",t.myTime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),y=(()=>{class o{constructor(){this.hoursPlaceholder="hh",this.minutesPlaceholder="mm",this.secondsPlaceholder="ss"}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-placeholder"]],decls:1,vars:4,consts:[[3,"hoursPlaceholder","minutesPlaceholder","secondsPlaceholder","showSeconds"]],template:function(i,t){1&i&&e._UZ(0,"timepicker",0),2&i&&e.Q6J("hoursPlaceholder",t.hoursPlaceholder)("minutesPlaceholder",t.minutesPlaceholder)("secondsPlaceholder",t.secondsPlaceholder)("showSeconds",!0)},dependencies:[d.E],encapsulation:2}),o})(),k=(()=>{class o{constructor(){this.myTime=new Date,this.showMin=!0,this.showSec=!0}toggleMinutes(){this.showMin=!this.showMin}toggleSeconds(){this.showSec=!this.showSec}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-seconds"]],decls:11,vars:8,consts:[[3,"ngModel","showMinutes","showSeconds","ngModelChange"],[1,"alert","alert-info"],[1,"btn","btn-default","text-center",3,"click"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e._UZ(3,"br"),e._uU(4),e._UZ(5,"br"),e._uU(6),e.qZA(),e.TgZ(7,"button",2),e.NdJ("click",function(){return t.toggleMinutes()}),e._uU(8),e.qZA(),e.TgZ(9,"button",2),e.NdJ("click",function(){return t.toggleSeconds()}),e._uU(10),e.qZA()),2&i&&(e.Q6J("ngModel",t.myTime)("showMinutes",t.showMin)("showSeconds",t.showSec),e.xp6(2),e.hij("Time is: ",t.myTime,""),e.xp6(2),e.hij("showMinutes: ",t.showMin,""),e.xp6(2),e.hij("showSeconds: ",t.showSec,""),e.xp6(2),e.hij(" ",t.showMin?"Hide minutes":"Show minutes","\n"),e.xp6(2),e.hij(" ",t.showSec?"Hide seconds":"Show seconds","\n"))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),D=(()=>{class o{constructor(){this.isMeridian=!0,this.isDisabled=!0,this.myTime=new Date}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-disabled"]],decls:4,vars:3,consts:[[3,"ngModel","showMeridian","disabled","ngModelChange"],["type","button",1,"btn","btn-info",3,"click"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"button",1),e.NdJ("click",function(){return t.isDisabled=!t.isDisabled}),e._uU(3,"Enable / Disable input"),e.qZA()),2&i&&e.Q6J("ngModel",t.myTime)("showMeridian",t.isMeridian)("disabled",!t.isDisabled)},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})();function O(o,s){if(1&o&&(e.TgZ(0,"option",6),e._uU(1),e.qZA()),2&o){const i=s.$implicit;e.Q6J("value",i),e.xp6(1),e.Oqu(i)}}function X(o,s){if(1&o&&(e.TgZ(0,"option",6),e._uU(1),e.qZA()),2&o){const i=s.$implicit;e.Q6J("value",i),e.xp6(1),e.Oqu(i)}}function R(o,s){if(1&o&&(e.TgZ(0,"option",6),e._uU(1),e.qZA()),2&o){const i=s.$implicit;e.Q6J("value",i),e.xp6(1),e.Oqu(i)}}let M=(()=>{class o{constructor(){this.hstep=1,this.mstep=15,this.sstep=10,this.mytime=new Date,this.options={hstep:[1,2,3],mstep:[1,5,10,15,25,30],sstep:[5,10,20,30]}}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-custom"]],decls:16,vars:12,consts:[[3,"ngModel","hourStep","minuteStep","showSeconds","secondsStep","ngModelChange"],[1,"alert","alert-info"],[1,"row"],[1,"col-xs-6","col-6","col-md-3"],[1,"form-control",3,"ngModel","ngModelChange"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.mytime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA(),e.TgZ(3,"div",2)(4,"div",3),e._uU(5," Hours step is: "),e.TgZ(6,"select",4),e.NdJ("ngModelChange",function(r){return t.hstep=r}),e.YNc(7,O,2,2,"option",5),e.qZA()(),e.TgZ(8,"div",3),e._uU(9," Minutes step is: "),e.TgZ(10,"select",4),e.NdJ("ngModelChange",function(r){return t.mstep=r}),e.YNc(11,X,2,2,"option",5),e.qZA()(),e.TgZ(12,"div",3),e._uU(13," Seconds step is: "),e.TgZ(14,"select",4),e.NdJ("ngModelChange",function(r){return t.sstep=r}),e.YNc(15,R,2,2,"option",5),e.qZA()()()),2&i&&(e.Q6J("ngModel",t.mytime)("hourStep",t.hstep)("minuteStep",t.mstep)("showSeconds",!0)("secondsStep",t.sstep),e.xp6(2),e.hij("Time is: ",t.mytime,""),e.xp6(4),e.Q6J("ngModel",t.hstep),e.xp6(1),e.Q6J("ngForOf",t.options.hstep),e.xp6(3),e.Q6J("ngModel",t.mstep),e.xp6(1),e.Q6J("ngForOf",t.options.mstep),e.xp6(3),e.Q6J("ngModel",t.sstep),e.xp6(1),e.Q6J("ngForOf",t.options.sstep))},dependencies:[l.sg,a.YN,a.Kr,a.EJ,a.JJ,a.On,d.E],encapsulation:2}),o})();function N(o,s){1&o&&(e.TgZ(0,"div",4),e._uU(1,"Invalid time"),e.qZA())}let b=(()=>{class o{constructor(){this.ctrl=new a.p4("",i=>{const t=i.value;if(!t)return null;const c=t.getHours();return c<11||c>12?{outOfRange:!0}:null})}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-custom-validation"]],decls:7,vars:8,consts:[[1,"form-group","mb-3"],["required","",3,"ngModel","formControl","ngModelChange"],[1,"alert"],["class","alert alert-danger",4,"ngIf"],[1,"alert","alert-danger"]],template:function(i,t){1&i&&(e.TgZ(0,"p"),e._uU(1,"Illustrates custom validation, you have to select time between 11:00 and 12:59"),e.qZA(),e.TgZ(2,"div",0)(3,"timepicker",1),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA()(),e.TgZ(4,"pre",2),e._uU(5),e.qZA(),e.YNc(6,N,2,0,"div",3)),2&i&&(e.xp6(3),e.Q6J("ngModel",t.myTime)("formControl",t.ctrl),e.xp6(1),e.ekj("alert-danger",!t.ctrl.valid&&!t.ctrl.pristine)("alert-success",t.ctrl.valid&&!t.ctrl.pristine||null===t.ctrl.value),e.xp6(1),e.hij("  Time is: ",t.myTime,"\n"),e.xp6(1),e.Q6J("ngIf",t.ctrl.errors&&t.ctrl.errors.outOfRange))},dependencies:[l.O5,a.JJ,a.Q7,a.oH,d.E],encapsulation:2}),o})();function B(o,s){1&o&&(e.TgZ(0,"pre",5),e._uU(1,"Invalid time format"),e.qZA())}function K(){return Object.assign(new u.Sm,{allowEmptyTime:!0})}let E=(()=>{class o{constructor(){this.mytime=new Date}update(){const i=new Date;i.setHours(14),i.setMinutes(0),this.mytime=i}changed(){console.log(`Time changed to: ${this.mytime}`)}clear(){this.mytime=void 0}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-dynamic"]],features:[e._Bn([{provide:u.Sm,useFactory:K}])],decls:8,vars:3,consts:[[3,"ngModel","ngModelChange","isValid"],[1,"alert","alert-info"],["class","alert alert-danger",4,"ngIf"],["type","button",1,"btn","btn-primary",3,"click"],["type","button",1,"btn","btn-danger",3,"click"],[1,"alert","alert-danger"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.mytime=r})("ngModelChange",function(){return t.changed()})("isValid",function(r){return t.isValid=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA(),e.YNc(3,B,2,0,"pre",2),e.TgZ(4,"button",3),e.NdJ("click",function(){return t.update()}),e._uU(5,"Set to 14:00"),e.qZA(),e.TgZ(6,"button",4),e.NdJ("click",function(){return t.clear()}),e._uU(7,"Clear"),e.qZA()),2&i&&(e.Q6J("ngModel",t.mytime),e.xp6(2),e.hij("Time is: ",t.mytime,""),e.xp6(1),e.Q6J("ngIf",!t.isValid))},dependencies:[l.O5,a.JJ,a.On,d.E],encapsulation:2}),o})(),A=(()=>{class o{constructor(){this.allowMouseWheel=!0,this.myTime=new Date}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-mousewheel"]],decls:6,vars:3,consts:[[3,"ngModel","mousewheel","ngModelChange"],["type","button",1,"btn","btn-info","section","bd-example",3,"click"],[1,"alert","alert-info"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"button",1),e.NdJ("click",function(){return t.allowMouseWheel=!t.allowMouseWheel}),e._uU(3,"Enable / Disable mouse wheel"),e.qZA(),e.TgZ(4,"pre",2),e._uU(5),e.qZA()),2&i&&(e.Q6J("ngModel",t.myTime)("mousewheel",t.allowMouseWheel),e.xp6(5),e.hij("Time is: ",t.myTime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),v=(()=>{class o{constructor(){this.allowArrowKeys=!0,this.myTime=new Date}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-arrowkeys"]],decls:6,vars:3,consts:[[3,"ngModel","arrowkeys","ngModelChange"],["type","button",1,"btn","btn-info","section","bd-example",3,"click"],[1,"alert","alert-info"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"button",1),e.NdJ("click",function(){return t.allowArrowKeys=!t.allowArrowKeys}),e._uU(3,"Enable / Disable keyboard arrow keys"),e.qZA(),e.TgZ(4,"pre",2),e._uU(5),e.qZA()),2&i&&(e.Q6J("ngModel",t.myTime)("arrowkeys",t.allowArrowKeys),e.xp6(5),e.hij("Time is: ",t.myTime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})();function W(o,s){1&o&&(e.TgZ(0,"pre",4),e._uU(1,"Invalid time format"),e.qZA())}function V(){return Object.assign(new u.Sm,{allowEmptyTime:!0})}let w=(()=>{class o{constructor(){this.allowEmptyTime=!0,this.myTime=new Date}clear(){this.myTime=void 0}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-empty-date"]],features:[e._Bn([{provide:u.Sm,useFactory:V}])],decls:7,vars:3,consts:[[3,"ngModel","ngModelChange","isValid"],[1,"alert","alert-info"],["class","alert alert-danger",4,"ngIf"],["type","button",1,"btn","btn-danger",3,"click"],[1,"alert","alert-danger"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r})("isValid",function(r){return t.isValid=r}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"pre",1),e._uU(3),e.qZA(),e.YNc(4,W,2,0,"pre",2),e.TgZ(5,"button",3),e.NdJ("click",function(){return t.clear()}),e._uU(6,"Clear"),e.qZA()),2&i&&(e.Q6J("ngModel",t.myTime),e.xp6(3),e.hij("Time is: ",t.myTime,""),e.xp6(1),e.Q6J("ngIf",!t.isValid))},dependencies:[l.O5,a.JJ,a.On,d.E],encapsulation:2}),o})();function I(){return Object.assign(new u.Sm,{hourStep:2,minuteStep:10,showMeridian:!1,readonlyInput:!1,mousewheel:!0,showMinutes:!0,showSeconds:!1,labelHours:"Hours",labelMinutes:"Minutes",labelSeconds:"Seconds"})}let Z=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-config"]],features:[e._Bn([{provide:u.Sm,useFactory:I}])],decls:3,vars:2,consts:[[3,"ngModel","ngModelChange"],[1,"alert","alert-info"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.mytime=r}),e.qZA(),e.TgZ(1,"pre",1),e._uU(2),e.qZA()),2&i&&(e.Q6J("ngModel",t.mytime),e.xp6(2),e.hij("Time is: ",t.mytime,""))},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),U=(()=>{class o{constructor(){this.isMeridian=!1,this.readonly=!0,this.myTime=new Date}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-readonly"]],decls:4,vars:3,consts:[[3,"ngModel","showMeridian","readonlyInput","ngModelChange"],["type","button",1,"btn","btn-info",3,"click"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"button",1),e.NdJ("click",function(){return t.readonly=!t.readonly}),e._uU(3,"Editable / Readonly input"),e.qZA()),2&i&&e.Q6J("ngModel",t.myTime)("showMeridian",t.isMeridian)("readonlyInput",!t.readonly)},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})(),J=(()=>{class o{constructor(){this.isMeridian=!1,this.showSpinners=!0,this.myTime=new Date}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-spinners"]],decls:4,vars:3,consts:[[3,"ngModel","showMeridian","showSpinners","ngModelChange"],["type","button",1,"btn","btn-info",3,"click"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"button",1),e.NdJ("click",function(){return t.showSpinners=!t.showSpinners}),e._uU(3,"Show / Hide spinners"),e.qZA()),2&i&&e.Q6J("ngModel",t.myTime)("showMeridian",t.isMeridian)("showSpinners",t.showSpinners)},dependencies:[a.JJ,a.On,d.E],encapsulation:2}),o})();function L(o,s){1&o&&(e.TgZ(0,"div",3),e._uU(1,"Invalid time"),e.qZA())}let P=(()=>{class o{constructor(){this.isMeridian=!0,this.myTime=new Date,this.valid=!0}isValid(i){this.valid=i}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-isvalid"]],decls:5,vars:8,consts:[[3,"ngModel","showMeridian","ngModelChange","isValid"],[1,"alert"],["class","alert alert-danger",4,"ngIf"],[1,"alert","alert-danger"]],template:function(i,t){1&i&&(e.TgZ(0,"timepicker",0),e.NdJ("ngModelChange",function(r){return t.myTime=r})("isValid",function(r){return t.isValid(r)}),e.qZA(),e._UZ(1,"hr"),e.TgZ(2,"pre",1),e._uU(3),e.qZA(),e.YNc(4,L,2,0,"div",2)),2&i&&(e.Q6J("ngModel",t.myTime)("showMeridian",t.isMeridian),e.xp6(2),e.ekj("alert-danger",!t.valid)("alert-success",t.valid),e.xp6(1),e.hij("  Time is: ",t.myTime,"\n"),e.xp6(1),e.Q6J("ngIf",!t.valid))},dependencies:[l.O5,a.JJ,a.On,d.E],encapsulation:2}),o})();function Q(o,s){if(1&o){const i=e.EpF();e.ynx(0),e.TgZ(1,"form",1),e._UZ(2,"timepicker",2),e.qZA(),e._UZ(3,"br"),e.TgZ(4,"button",3),e.NdJ("click",function(){e.CHM(i);const c=e.oxw();let r;return e.KtG(null==(r=c.form.get("myControl"))?null:r.enable())}),e._uU(5,"Enable Control"),e.qZA(),e.TgZ(6,"button",4),e.NdJ("click",function(){e.CHM(i);const c=e.oxw();let r;return e.KtG(null==(r=c.form.get("myControl"))?null:r.disable())}),e._uU(7,"Disable Control"),e.qZA(),e._UZ(8,"br")(9,"br"),e.TgZ(10,"pre",5),e._uU(11),e.qZA(),e.BQk()}if(2&o){const i=e.oxw();let t;e.xp6(1),e.Q6J("formGroup",i.form),e.xp6(1),e.Q6J("formControlName","myControl"),e.xp6(9),e.hij("Time is: ",null==(t=i.form.get("myControl"))?null:t.value,"")}}let S=(()=>{class o{constructor(){this.form=new a.nJ({myControl:new a.p4(new Date)})}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["demo-timepicker-form"]],decls:1,vars:1,consts:[[4,"ngIf"],[3,"formGroup"],[3,"formControlName"],[1,"btn","btn-success",3,"click"],[1,"btn","btn-warning",3,"click"],[1,"alert","alert-info"]],template:function(i,t){1&i&&e.YNc(0,Q,12,3,"ng-container",0),2&i&&e.Q6J("ngIf",t.form)},dependencies:[l.O5,a._Y,a.JJ,a.JL,a.sg,a.u,d.E],encapsulation:2}),o})();const j=[{name:"Overview",anchor:"overview",tabName:"overview",outlet:T.ke,content:[{title:"Basic",anchor:"basic",component:n(12937),html:n(32649),outlet:g},{title:"Form",anchor:"form",component:n(85573),html:n(7680),outlet:S},{title:"Meridian",anchor:"meridian",component:n(1874),html:n(70429),outlet:h},{title:"Custom meridian",anchor:"custom-meridian",component:n(2041),html:n(62673),description:"<p>Text in meridian labels can be customized by using <code>meridians</code> input property</p>",outlet:C},{title:"Min - Max",anchor:"min-max",component:n(7146),html:n(69671),outlet:f},{title:"Toggle minutes/seconds",anchor:"toggleMinutesSeconds",component:n(93086),html:n(14867),outlet:k},{title:"Disabled",anchor:"disabled",component:n(35419),html:n(40281),outlet:D},{title:"Readonly",anchor:"readonly",component:n(55271),html:n(54002),outlet:U},{title:"Custom steps",anchor:"custom",component:n(62090),html:n(49818),outlet:M},{title:"Custom validation",anchor:"custom-validation",component:n(52760),html:n(16512),outlet:b},{title:"Custom validation with isValid event",anchor:"isvalid",component:n(75905),html:n(45635),description:"<p><code>isValid</code> event emits true if a value is a valid data.\n            Enter an invalid data to see error</p>",outlet:P},{title:"Dynamic",anchor:"dynamic",component:n(66599),html:n(72442),outlet:E},{title:"Mouse wheel",anchor:"mouse-wheel",component:n(67275),html:n(38300),outlet:A},{title:"Empty date",anchor:"empty-date",component:n(62051),html:n(1159),outlet:w},{title:"Arrow keys",anchor:"arrow keys",component:n(1035),html:n(73291),outlet:v},{title:"Spinners",anchor:"spinners",component:n(22045),html:n(36815),outlet:J},{title:"Placeholder",anchor:"placeholder",component:n(47684),html:n(65495),outlet:y},{title:"Configuring defaults",anchor:"config-defaults",component:n(96953),html:n(21893),outlet:Z}]},{name:"Installation",anchor:"api-reference",tabName:"api",outlet:T.s$,usage:n(31416),importInfo:'<span class="pln">ng add ngx</span><span class="pun">-</span><span class="pln">bootstrap </span> --component <span class="pln">timepicker</span>',content:[{title:"TimepickerComponent",anchor:"timepicker-component",outlet:T.Wh},{title:"TimepickerConfig",anchor:"timepicker-config",outlet:T.Vg}]},{name:"Examples",anchor:"examples",tabName:"examples",outlet:T.ke,content:[{title:"Basic",anchor:"basic-ex",outlet:g},{title:"Form",anchor:"form-ex",outlet:S},{title:"Meridian",anchor:"meridian-ex",outlet:h},{title:"Custom meridian",anchor:"custom-meridian-ex",outlet:C},{title:"Min - Max",anchor:"min-max-ex",outlet:f},{title:"Toggle minutes/seconds",anchor:"toggleMinutesSeconds-ex",outlet:k},{title:"Disabled",anchor:"disabled-ex",outlet:D},{title:"Readonly",anchor:"readonly-ex",outlet:U},{title:"Custom steps",anchor:"custom-ex",outlet:M},{title:"Custom validation",anchor:"custom-validation-ex",outlet:b},{title:"Custom validation with isValid event",anchor:"isvalid-ex",outlet:P},{title:"Dynamic",anchor:"dynamic-ex",outlet:E},{title:"Mouse wheel",anchor:"mouse-wheel-ex",outlet:A},{title:"Empty date",anchor:"empty-date-ex",outlet:w},{title:"Arrow keys",anchor:"arrow keys-ex",outlet:v},{title:"Spinners",anchor:"spinners-ex",outlet:J},{title:"Placeholder",anchor:"placeholder-ex",outlet:y},{title:"Configuring defaults",anchor:"config-defaults-ex",outlet:Z}]}];var H=n(22289),x=n(33505);let _=(()=>{class o{constructor(){this.name="Timepicker",this.src="https://github.com/valor-software/ngx-bootstrap/tree/development/src/timepicker",this.componentContent=j}}return o.\u0275fac=function(i){return new(i||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["timepicker-section"]],decls:6,vars:4,consts:[[3,"name","src","componentContent"],[3,"content"]],template:function(i,t){1&i&&(e.TgZ(0,"demo-section",0)(1,"p"),e._uU(2,"A lightweight & configurable timepicker directive"),e.qZA(),e.TgZ(3,"p"),e._uU(4,"The easiest way to add the timepicker component to your app (will be added to the root module)"),e.qZA(),e._UZ(5,"docs-section",1),e.qZA()),2&i&&(e.Q6J("name",t.name)("src",t.src)("componentContent",t.componentContent),e.xp6(5),e.Q6J("content",t.componentContent))},dependencies:[H.Z,x.Z],encapsulation:2,changeDetection:0}),o})();const Y=[{path:"",component:_}];n(32937);let $=(()=>{class o{}return o.\u0275fac=function(i){return new(i||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[l.ez,a.u5,a.UX,T.Gz,u.Db.forRoot(),F.Bz.forChild(Y)]}),o})()},73291:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [arrowkeys]="allowArrowKeys"></timepicker>\n<hr>\n\n<button type="button" class="btn btn-info section bd-example" (click)="allowArrowKeys = !allowArrowKeys">Enable / Disable keyboard arrow keys</button>\n\n<pre class="alert alert-info">Time is: {{myTime}}</pre>\n'},1035:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-arrowkeys',\n  templateUrl: './arrowkeys.html'\n})\nexport class DemoTimepickerArrowkeysComponent {\n  allowArrowKeys = true;\n  myTime = new Date();\n}\n"},32649:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="mytime"></timepicker>\n<pre class="alert alert-info">Time is: {{mytime}}</pre>\n'},12937:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-basic',\n  templateUrl: './basic.html'\n})\nexport class DemoTimepickerBasicComponent {\n  mytime: Date = new Date();\n}\n"},21893:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="mytime"></timepicker>\n<pre class="alert alert-info">Time is: {{mytime}}</pre>\n'},96953:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\nimport { TimepickerConfig } from 'ngx-bootstrap/timepicker';\n\n// such override allows to keep some initial values\n\nexport function getTimepickerConfig(): TimepickerConfig {\n  return Object.assign(new TimepickerConfig(), {\n    hourStep: 2,\n    minuteStep: 10,\n    showMeridian: false,\n    readonlyInput: false,\n    mousewheel: true,\n    showMinutes: true,\n    showSeconds: false,\n    labelHours: 'Hours',\n    labelMinutes: 'Minutes',\n    labelSeconds: 'Seconds'\n  });\n}\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-config',\n  templateUrl: './config.html',\n  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]\n})\nexport class DemoTimepickerConfigComponent {\n  mytime?: string;\n}\n"},62673:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="mytime" [meridians]="meridians"></timepicker>\n\n<pre class="alert alert-info">Time is: {{mytime}}</pre>\n'},2041:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-custom-meridian',\n  templateUrl: './custom-meridian.html'\n})\nexport class DemoTimepickerCustomMeridianComponent {\n  mytime: Date = new Date();\n  meridians = ['AM(Midnight to Noon)', 'PM(Noon to Midnight)'];\n}\n"},16512:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<p>Illustrates custom validation, you have to select time between 11:00 and 12:59</p>\n\n<div class="form-group mb-3">\n  <timepicker [(ngModel)]="myTime" [formControl]="ctrl" required></timepicker>\n</div>\n\n<pre class="alert"\n     [class.alert-danger]="!ctrl.valid && !ctrl.pristine"\n     [class.alert-success]="(ctrl.valid && !ctrl.pristine) || ctrl.value === null">\n  Time is: {{myTime}}\n</pre>\n<div class="alert alert-danger" *ngIf="ctrl.errors && ctrl.errors[\'outOfRange\']">Invalid time</div>\n'},52760:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\nimport { AbstractControl, UntypedFormControl } from '@angular/forms';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-custom-validation',\n  templateUrl: './custom-validation.html'\n})\nexport class DemoTimepickerCustomValidationComponent {\n  myTime?: Date;\n\n  ctrl = new UntypedFormControl('', (control: AbstractControl) => {\n    const value = control.value;\n\n    if (!value) {\n      return null;\n    }\n\n    const hours = value.getHours();\n\n    if (hours < 11 || hours > 12) {\n      return { outOfRange: true };\n    }\n\n    return null;\n  });\n}\n"},49818:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="mytime" [hourStep]="hstep" [minuteStep]="mstep" [showSeconds]="true" [secondsStep]="sstep"></timepicker>\n\n<pre class="alert alert-info">Time is: {{mytime}}</pre>\n\n<div class="row">\n  <div class="col-xs-6 col-6 col-md-3">\n    Hours step is:\n    <select class="form-control" [(ngModel)]="hstep">\n      <option *ngFor="let opt of options.hstep" [value]="opt">{{opt}}</option>\n    </select>\n  </div>\n  <div class="col-xs-6 col-6 col-md-3">\n    Minutes step is:\n    <select class="form-control" [(ngModel)]="mstep">\n      <option *ngFor="let opt of options.mstep" [value]="opt">{{opt}}</option>\n    </select>\n  </div>\n  <div class="col-xs-6 col-6 col-md-3">\n    Seconds step is:\n    <select class="form-control" [(ngModel)]="sstep">\n      <option *ngFor="let opt of options.sstep" [value]="opt">{{opt}}</option>\n    </select>\n  </div>\n</div>\n'},62090:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\ninterface IOptions {\n  hstep: number[];\n  mstep: number[];\n  sstep: number[];\n}\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-custom',\n  templateUrl: './custom.html'\n})\nexport class DemoTimepickerCustomComponent {\n  hstep = 1;\n  mstep = 15;\n  sstep = 10;\n\n  mytime: Date = new Date();\n  options: IOptions = {\n    hstep: [1, 2, 3],\n    mstep: [1, 5, 10, 15, 25, 30],\n    sstep: [5, 10, 20, 30]\n  };\n}\n"},40281:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [showMeridian]="isMeridian" [disabled]="!isDisabled"></timepicker>\n<hr>\n<button type="button" class="btn btn-info" (click)="isDisabled=!isDisabled">Enable / Disable input</button>\n'},35419:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-disabled',\n  templateUrl: './disabled.html'\n})\nexport class DemoTimepickerDisabledComponent {\n  isMeridian = true;\n  isDisabled = true;\n  myTime = new Date();\n}\n"},72442:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="mytime" (ngModelChange)="changed()" (isValid)="isValid = $event"></timepicker>\n\n<pre class="alert alert-info">Time is: {{mytime}}</pre>\n<pre *ngIf="!isValid" class="alert alert-danger">Invalid time format</pre>\n\n<button type="button" class="btn btn-primary" (click)="update()">Set to 14:00</button>\n<button type="button" class="btn btn-danger" (click)="clear()">Clear</button>\n'},66599:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\nimport { TimepickerConfig } from 'ngx-bootstrap/timepicker';\n\nexport function getTimepickerConfig(): TimepickerConfig {\n  return Object.assign(new TimepickerConfig(), {\n    allowEmptyTime: true\n  });\n}\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-dynamic',\n  templateUrl: './dynamic.html',\n  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]\n})\nexport class DemoTimepickerDynamicComponent {\n  mytime: Date | undefined = new Date();\n  isValid?: boolean;\n\n  update(): void {\n    const time = new Date();\n    time.setHours(14);\n    time.setMinutes(0);\n\n    this.mytime = time;\n  }\n\n  changed(): void {\n    console.log(`Time changed to: ${this.mytime}`);\n  }\n\n  clear(): void {\n    this.mytime = void 0;\n  }\n}\n"},1159:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime"  (isValid)="isValid = $event"></timepicker>\n<hr>\n\n<pre class="alert alert-info">Time is: {{myTime}}</pre>\n<pre *ngIf="!isValid" class="alert alert-danger">Invalid time format</pre>\n\n<button type="button" class="btn btn-danger" (click)="clear()">Clear</button>\n'},62051:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\nimport { TimepickerConfig } from 'ngx-bootstrap/timepicker';\n\nexport function getTimepickerConfig(): TimepickerConfig {\n  return Object.assign(new TimepickerConfig(), {\n    allowEmptyTime: true\n  });\n}\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-empty-date',\n  templateUrl: './empty-date.html',\n  providers: [{ provide: TimepickerConfig, useFactory: getTimepickerConfig }]\n})\nexport class DemoTimepickerEmptyDateComponent {\n  allowEmptyTime = true;\n  myTime?: Date = new Date();\n  isValid?: boolean;\n\n  clear(): void {\n    this.myTime = void 0;\n  }\n}\n"},7680:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<ng-container *ngIf="form">\n  <form [formGroup]="form">\n    <timepicker [formControlName]="\'myControl\'"></timepicker>\n  </form>\n\n  <br>\n  <button class="btn btn-success" (click)="form.get(\'myControl\')?.enable()">Enable Control</button>\n  <button class="btn btn-warning" (click)="form.get(\'myControl\')?.disable()">Disable Control</button>\n  <br><br>\n\n  <pre class="alert alert-info">Time is: {{ form.get(\'myControl\')?.value }}</pre>\n</ng-container>\n'},85573:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\nimport { UntypedFormControl, UntypedFormGroup } from '@angular/forms';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-form',\n  templateUrl: './form.html'\n})\nexport class DemoTimepickerFormComponent {\n  form = new UntypedFormGroup({\n    myControl: new UntypedFormControl(new Date())\n  });\n}\n"},45635:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [showMeridian]="isMeridian" (isValid)="isValid($event)"></timepicker>\n<hr>\n<pre class="alert"\n     [class.alert-danger]="!valid"\n     [class.alert-success]="valid">\n  Time is: {{myTime}}\n</pre>\n<div *ngIf="!valid" class="alert alert-danger">Invalid time</div>\n'},75905:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-isvalid',\n  templateUrl: './isvalid.html'\n})\nexport class DemoTimepickerIsValidComponent {\n  isMeridian = true;\n  myTime = new Date();\n  valid = true;\n\n  isValid(event: boolean): void {\n    this.valid = event;\n  }\n}\n"},70429:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="mytime" [showMeridian]="ismeridian"></timepicker>\n\n<pre class="alert alert-info">Time is: {{mytime}}</pre>\n\n<br>\n\n<button type="button" class="btn btn-info" (click)="toggleMode()">12H / 24H</button>\n\n'},1874:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-meridian',\n  templateUrl: './meridian.html'\n})\nexport class DemoTimepickerMeridianComponent {\n  ismeridian = true;\n\n  mytime: Date = new Date();\n\n  toggleMode(): void {\n    this.ismeridian = !this.ismeridian;\n  }\n}\n"},69671:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [min]="minTime" [max]="maxTime"></timepicker>\n\n<pre class="alert alert-info">Time is: {{myTime}}</pre>\n'},7146:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-min-max',\n  templateUrl: './min-max.html'\n})\nexport class DemoTimepickerMinMaxComponent {\n  myTime: Date = new Date();\n  minTime: Date = new Date();\n  maxTime: Date = new Date();\n\n  constructor() {\n    this.minTime.setHours(8);\n    this.minTime.setMinutes(0);\n    this.maxTime.setHours(23);\n    this.maxTime.setMinutes(55);\n  }\n}\n"},38300:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [mousewheel]="allowMouseWheel"></timepicker>\n<hr>\n\n<button type="button" class="btn btn-info section bd-example" (click)="allowMouseWheel = !allowMouseWheel">Enable / Disable mouse wheel</button>\n\n<pre class="alert alert-info">Time is: {{myTime}}</pre>\n'},67275:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-mousewheel',\n  templateUrl: './mousewheel.html'\n})\nexport class DemoTimepickerMousewheelComponent {\n  allowMouseWheel = true;\n  myTime = new Date();\n}\n"},65495:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [hoursPlaceholder]="hoursPlaceholder"\n            [minutesPlaceholder]="minutesPlaceholder"\n            [secondsPlaceholder]="secondsPlaceholder" [showSeconds]="true"></timepicker>\n\n'},47684:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-placeholder',\n  templateUrl: './placeholder.html'\n})\nexport class DemoTimepickerPlaceholderComponent {\n  hoursPlaceholder = 'hh';\n  minutesPlaceholder = 'mm';\n  secondsPlaceholder = 'ss';\n}\n\n"},54002:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [showMeridian]="isMeridian" [readonlyInput]="!readonly"></timepicker>\n<hr>\n<button type="button" class="btn btn-info" (click)="readonly=!readonly">Editable / Readonly input</button>\n'},55271:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-readonly',\n  templateUrl: './readonly.html'\n})\nexport class DemoTimepickerReadonlyComponent {\n  isMeridian = false;\n  readonly = true;\n  myTime = new Date();\n}\n"},36815:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [showMeridian]="isMeridian" [showSpinners]="showSpinners"></timepicker>\n<hr>\n\n<button type="button" class="btn btn-info" (click)="showSpinners = !showSpinners">Show / Hide spinners</button>\n\n'},22045:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-spinners',\n  templateUrl: './spinners.html'\n})\nexport class DemoTimepickerSpinnersComponent {\n  isMeridian = false;\n  showSpinners = true;\n  myTime: Date = new Date();\n}\n"},14867:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l='<timepicker [(ngModel)]="myTime" [showMinutes]="showMin" [showSeconds]="showSec"></timepicker>\n\n<pre class="alert alert-info">Time is: {{myTime}}<br>showMinutes: {{showMin}}<br>showSeconds: {{showSec}}</pre>\n\n<button class="btn btn-default text-center" (click)="toggleMinutes()">\n  {{showMin? \'Hide minutes\' : \'Show minutes\'}}\n</button>\n<button class="btn btn-default text-center" (click)="toggleSeconds()">\n  {{showSec? \'Hide seconds\' : \'Show seconds\'}}\n</button>\n'},93086:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'demo-timepicker-seconds',\n  templateUrl: './toggle-minutes-seconds.html'\n})\nexport class DemoTimepickerToggleMinutesSecondsComponent {\n  myTime: Date = new Date();\n  showMin = true;\n  showSec = true;\n\n  toggleMinutes(): void {\n    this.showMin = !this.showMin;\n  }\n\n  toggleSeconds(): void {\n    this.showSec = !this.showSec;\n  }\n\n}\n"},31416:(p,m,n)=>{n.r(m),n.d(m,{default:()=>l});const l="import { TimepickerModule } from 'ngx-bootstrap/timepicker';\n\n@NgModule({\n  imports: [TimepickerModule.forRoot(),...]\n})\nexport class AppModule(){}\n"}}]);