"use strict";(self.webpackChunkngx_bootstrap_docs=self.webpackChunkngx_bootstrap_docs||[]).push([[444],{12444:(g,r,a)=>{a.r(r),a.d(r,{DemoSortableModule:()=>L,SortableSectionComponent:()=>S});var m=a(84341),p=a(60177),I=a(8681),e=a(54438);let T=(()=>{class s{static forRoot(){return{ngModule:s,providers:[]}}static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275mod=e.$C({type:s});static#n=this.\u0275inj=e.G2t({})}return s})();var h=a(37472),j=a(21413);let b=(()=>{class s{constructor(){this.onCapture=new j.B}dragStart(o){this.draggableItem=o}getItem(){return this.draggableItem}captureItem(o,n){return this.draggableItem&&this.draggableItem.overZoneIndex!==o&&(this.draggableItem.lastZoneIndex=this.draggableItem.overZoneIndex,this.draggableItem.overZoneIndex=o,this.onCapture.next(this.draggableItem),this.draggableItem=Object.assign({},this.draggableItem,{overZoneIndex:o,i:n})),this.draggableItem}onCaptureItem(){return this.onCapture}static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275prov=e.jDH({token:s,factory:s.\u0275fac,providedIn:"platform"})}return s})();const _=(s,d)=>[s,d],F=(s,d)=>({item:s,index:d});function x(s,d){if(1&s){const o=e.RV6();e.j41(0,"div",4),e.bIt("dragover",function(t){e.eBV(o);const l=e.XpG();return e.Njj(l.onItemDragover(t,0))})("dragenter",function(t){e.eBV(o);const l=e.XpG();return e.Njj(l.cancelEvent(t))}),e.EFF(1),e.k0s()}if(2&s){const o=e.XpG();e.Y8G("ngClass",o.placeholderClass)("ngStyle",o.placeholderStyle),e.R7$(),e.JRh(o.placeholderItem)}}function y(s,d){}function D(s,d){if(1&s){const o=e.RV6();e.j41(0,"div",5),e.bIt("dragstart",function(t){const l=e.eBV(o),i=l.$implicit,c=l.index,N=e.XpG();return e.Njj(N.onItemDragstart(t,i,c))})("dragend",function(t){e.eBV(o);const l=e.XpG();return e.Njj(l.resetActiveItem(t))})("dragover",function(t){const l=e.eBV(o).index,i=e.XpG();return e.Njj(i.onItemDragover(t,l))})("dragenter",function(t){e.eBV(o);const l=e.XpG();return e.Njj(l.cancelEvent(t))}),e.DNE(1,y,0,0,"ng-template",6),e.k0s()}if(2&s){const o=d.$implicit,n=d.index,t=e.XpG(),l=e.sdS(4);e.Y8G("ngClass",e.l_i(5,_,t.itemClass,n===t.activeItem?t.itemActiveClass:""))("ngStyle",t.getItemStyle(n===t.activeItem)),e.BMQ("aria-grabbed",n===t.activeItem),e.R7$(),e.Y8G("ngTemplateOutlet",t.itemTemplate||l)("ngTemplateOutletContext",e.l_i(8,F,o,n))}}function E(s,d){1&s&&e.EFF(0),2&s&&e.JRh(d.item.value)}let u=(()=>{class s{static#e=this.globalZoneIndex=0;get items(){return this._items}set items(o){this._items=o;const n=this.items.map(t=>t.initData);this.onChanged(n),this.onChange.emit(n)}constructor(o){this.wrapperClass="",this.wrapperStyle={},this.itemClass="",this.itemStyle={},this.itemActiveClass="",this.itemActiveStyle={},this.placeholderClass="",this.placeholderStyle={},this.placeholderItem="",this.onChange=new e.bkB,this.showPlaceholder=!1,this.activeItem=-1,this.onTouched=Function.prototype,this.onChanged=Function.prototype,this._items=[],this.transfer=o,this.currentZoneIndex=s.globalZoneIndex++,this.transfer.onCaptureItem().subscribe(n=>this.onDrop(n))}onItemDragstart(o,n,t){this.initDragstartEvent(o),this.onTouched(),this.transfer.dragStart({event:o,item:n,i:t,initialIndex:t,lastZoneIndex:this.currentZoneIndex,overZoneIndex:this.currentZoneIndex})}onItemDragover(o,n){if(!this.transfer.getItem())return;o.preventDefault();const t=this.transfer.captureItem(this.currentZoneIndex,this.items.length);let l=[];t&&(l=this.items.length?t.i>n?[...this.items.slice(0,n),t.item,...this.items.slice(n,t.i),...this.items.slice(t.i+1)]:[...this.items.slice(0,t.i),...this.items.slice(t.i+1,n+1),t.item,...this.items.slice(n+1)]:[t.item],this.items=l,t.i=n,this.activeItem=n,this.updatePlaceholderState())}cancelEvent(o){!this.transfer.getItem()||!o||o.preventDefault()}onDrop(o){o&&o.overZoneIndex!==this.currentZoneIndex&&o.lastZoneIndex===this.currentZoneIndex&&(this.items=this.items.filter((n,t)=>t!==o.i),this.updatePlaceholderState()),this.resetActiveItem()}resetActiveItem(o){this.cancelEvent(o),this.activeItem=-1}registerOnChange(o){this.onChanged=o}registerOnTouched(o){this.onTouched=o}writeValue(o){this.items=o?o.map((n,t)=>({id:t,initData:n,value:this.fieldName?n[this.fieldName]:n})):[],this.updatePlaceholderState()}updatePlaceholderState(){this.showPlaceholder=!this._items.length}getItemStyle(o){return o?Object.assign({},this.itemStyle,this.itemActiveStyle):this.itemStyle}initDragstartEvent(o){o.dataTransfer?.setData("Text","placeholder")}static#t=this.\u0275fac=function(n){return new(n||s)(e.rXU(b))};static#n=this.\u0275cmp=e.VBU({type:s,selectors:[["bs-sortable"]],inputs:{fieldName:"fieldName",wrapperClass:"wrapperClass",wrapperStyle:"wrapperStyle",itemClass:"itemClass",itemStyle:"itemStyle",itemActiveClass:"itemActiveClass",itemActiveStyle:"itemActiveStyle",placeholderClass:"placeholderClass",placeholderStyle:"placeholderStyle",placeholderItem:"placeholderItem",itemTemplate:"itemTemplate"},outputs:{onChange:"onChange"},exportAs:["bs-sortable"],standalone:!0,features:[e.Jv_([{provide:m.kq,useExisting:(0,e.Rfq)(()=>s),multi:!0},b]),e.aNF],decls:5,vars:4,consts:[["defItemTemplate",""],[3,"dragover","dragenter","drop","mouseleave","ngClass","ngStyle"],[3,"ngClass","ngStyle","dragover","dragenter",4,"ngIf"],["draggable","true","aria-dropeffect","move",3,"ngClass","ngStyle","dragstart","dragend","dragover","dragenter",4,"ngFor","ngForOf"],[3,"dragover","dragenter","ngClass","ngStyle"],["draggable","true","aria-dropeffect","move",3,"dragstart","dragend","dragover","dragenter","ngClass","ngStyle"],[3,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,t){if(1&n){const l=e.RV6();e.j41(0,"div",1),e.bIt("dragover",function(c){return e.eBV(l),e.Njj(t.cancelEvent(c))})("dragenter",function(c){return e.eBV(l),e.Njj(t.cancelEvent(c))})("drop",function(c){return e.eBV(l),e.Njj(t.resetActiveItem(c))})("mouseleave",function(c){return e.eBV(l),e.Njj(t.resetActiveItem(c))}),e.DNE(1,x,2,3,"div",2)(2,D,2,11,"div",3),e.k0s(),e.DNE(3,E,1,1,"ng-template",null,0,e.C5r)}2&n&&(e.Y8G("ngClass",t.wrapperClass)("ngStyle",t.wrapperStyle),e.R7$(),e.Y8G("ngIf",t.showPlaceholder),e.R7$(),e.Y8G("ngForOf",t.items))},dependencies:[p.YU,p.B3,p.bT,p.pM,p.T3],encapsulation:2})}return s})(),v=(()=>{class s{constructor(){this.itemStringsLeft=["Windstorm","Bombasto","Magneta","Tornado"],this.itemStringsRight=["Mr. O","Tomato"]}static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["basic-demo"]],decls:14,vars:8,consts:[[1,"row"],[1,"col-xs-6","col-6","col-md-5","col-lg-3"],["itemClass","sortable-item","itemActiveClass","sortable-item-active","placeholderItem","Drag here","placeholderClass","placeholderStyle text-center","wrapperClass","sortable-wrapper",3,"ngModelChange","ngModel"],[1,"code-preview"]],template:function(n,t){1&n&&(e.j41(0,"div",0)(1,"div",1)(2,"bs-sortable",2),e.mxI("ngModelChange",function(i){return e.DH7(t.itemStringsLeft,i)||(t.itemStringsLeft=i),i}),e.k0s()(),e.j41(3,"div",1)(4,"bs-sortable",2),e.mxI("ngModelChange",function(i){return e.DH7(t.itemStringsRight,i)||(t.itemStringsRight=i),i}),e.k0s()()(),e.j41(5,"div",0)(6,"div",1)(7,"pre",3),e.EFF(8),e.nI1(9,"json"),e.k0s()(),e.j41(10,"div",1)(11,"pre",3),e.EFF(12),e.nI1(13,"json"),e.k0s()()()),2&n&&(e.R7$(2),e.R50("ngModel",t.itemStringsLeft),e.R7$(2),e.R50("ngModel",t.itemStringsRight),e.R7$(4),e.SpI("model: ",e.bMT(9,4,t.itemStringsLeft),""),e.R7$(4),e.SpI("model: ",e.bMT(13,6,t.itemStringsRight),""))},dependencies:[m.BC,m.vS,u,p.TG],encapsulation:2})}return s})(),C=(()=>{class s{constructor(){this.itemObjectsLeft=[{id:1,name:"Windstorm"},{id:2,name:"Bombasto"},{id:3,name:"Magneta"}],this.itemObjectsRight=[{id:4,name:"Tornado"},{id:5,name:"Mr. O"},{id:6,name:"Tomato"}]}static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["complex-datamodel-demo"]],decls:14,vars:8,consts:[[1,"row"],[1,"col-xs-6","col-6","col-md-5","col-lg-3"],["fieldName","name","itemClass","sortable-item","itemActiveClass","sortable-item-active","placeholderItem","Drag here","placeholderClass","placeholderStyle text-center","wrapperClass","sortable-wrapper",3,"ngModelChange","ngModel"],[1,"code-preview"]],template:function(n,t){1&n&&(e.j41(0,"div",0)(1,"div",1)(2,"bs-sortable",2),e.mxI("ngModelChange",function(i){return e.DH7(t.itemObjectsLeft,i)||(t.itemObjectsLeft=i),i}),e.k0s()(),e.j41(3,"div",1)(4,"bs-sortable",2),e.mxI("ngModelChange",function(i){return e.DH7(t.itemObjectsRight,i)||(t.itemObjectsRight=i),i}),e.k0s()()(),e.j41(5,"div",0)(6,"div",1)(7,"pre",3),e.EFF(8),e.nI1(9,"json"),e.k0s()(),e.j41(10,"div",1)(11,"pre",3),e.EFF(12),e.nI1(13,"json"),e.k0s()()()),2&n&&(e.R7$(2),e.R50("ngModel",t.itemObjectsLeft),e.R7$(2),e.R50("ngModel",t.itemObjectsRight),e.R7$(4),e.SpI("model: ",e.bMT(9,4,t.itemObjectsLeft),""),e.R7$(4),e.SpI("model: ",e.bMT(13,6,t.itemObjectsRight),""))},dependencies:[m.BC,m.vS,u,p.TG],encapsulation:2})}return s})();function R(s,d){if(1&s&&(e.j41(0,"span"),e.EFF(1),e.k0s()),2&s){const o=d.item,n=d.index;e.R7$(),e.Lme("",n,": ",o.value,"")}}let f=(()=>{class s{constructor(){this.itemStringsLeft=["Windstorm","Bombasto","Magneta","Tornado"],this.itemStringsRight=["Mr. O","Tomato"]}static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["custom-item-template-demo"]],decls:16,vars:9,consts:[["itemTemplate",""],[1,"row"],[1,"col-xs-6","col-6","col-md-5","col-lg-3"],["itemClass","sortable-item","itemActiveClass","sortable-item-active","placeholderItem","Drag here","placeholderClass","placeholderStyle text-center","wrapperClass","sortable-wrapper",3,"ngModelChange","ngModel","itemTemplate"],["itemClass","sortable-item","itemActiveClass","sortable-item-active","placeholderItem","Drag here","placeholderClass","placeholderStyle text-center","wrapperClass","sortable-wrapper",3,"ngModelChange","ngModel"],[1,"code-preview"]],template:function(n,t){if(1&n){const l=e.RV6();e.DNE(0,R,2,2,"ng-template",null,0,e.C5r),e.j41(2,"div",1)(3,"div",2)(4,"bs-sortable",3),e.mxI("ngModelChange",function(c){return e.eBV(l),e.DH7(t.itemStringsLeft,c)||(t.itemStringsLeft=c),e.Njj(c)}),e.k0s()(),e.j41(5,"div",2)(6,"bs-sortable",4),e.mxI("ngModelChange",function(c){return e.eBV(l),e.DH7(t.itemStringsRight,c)||(t.itemStringsRight=c),e.Njj(c)}),e.k0s()()(),e.j41(7,"div",1)(8,"div",2)(9,"pre",5),e.EFF(10),e.nI1(11,"json"),e.k0s()(),e.j41(12,"div",2)(13,"pre",5),e.EFF(14),e.nI1(15,"json"),e.k0s()()()}if(2&n){const l=e.sdS(1);e.R7$(4),e.R50("ngModel",t.itemStringsLeft),e.Y8G("itemTemplate",l),e.R7$(2),e.R50("ngModel",t.itemStringsRight),e.R7$(4),e.SpI("model: ",e.bMT(11,5,t.itemStringsRight),""),e.R7$(4),e.SpI("model: ",e.bMT(15,7,t.itemStringsRight),"")}},dependencies:[m.BC,m.vS,u,p.TG],encapsulation:2})}return s})(),M=(()=>{class s{static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["demo-accessibility"]],decls:26,vars:0,consts:[["href","https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect"],[1,"highlighter-rouge"]],template:function(n,t){1&n&&(e.j41(0,"p"),e.EFF(1,"You can use "),e.j41(2,"code"),e.EFF(3,'aria-dropeffect="..."'),e.k0s(),e.EFF(4," and "),e.j41(5,"code"),e.EFF(6,"aria-grabbed"),e.k0s(),e.EFF(7," for "),e.j41(8,"code"),e.EFF(9,".sortable-item"),e.k0s(),e.EFF(10,". When you start drag item "),e.j41(11,"code"),e.EFF(12,"aria-grabbed"),e.k0s(),e.EFF(13," must have "),e.j41(14,"code"),e.EFF(15,"true"),e.k0s(),e.EFF(16," state. "),e.j41(17,"code"),e.EFF(18,"aria-dropeffect"),e.k0s(),e.EFF(19," property is defined depending on the grabbed object."),e.k0s(),e.j41(20,"p"),e.EFF(21,"But be careful, these attributes are "),e.j41(22,"a",0)(23,"code",1),e.EFF(24,"deprecated"),e.k0s()(),e.EFF(25,"."),e.k0s())},encapsulation:2})}return s})();const w=[{name:"Overview",anchor:"overview",tabName:"overview",outlet:h.xK,content:[{title:"Basic",anchor:"basic",component:a(49013),html:a(953),outlet:v},{title:"Complex data model",anchor:"complexDatamodel",component:a(90661),html:a(34185),outlet:C},{title:"Custom item template",anchor:"itemTemplate",component:a(87782),html:a(81050),outlet:f},{title:"Accessibility",anchor:"accessibility",outlet:M}]},{name:"Installation",anchor:"api-reference",tabName:"api",outlet:h.Mg,usage:a(68901),importInfo:'<span class="pln">ng add ngx</span><span class="pun">-</span><span class="pln">bootstrap </span> --component <span class="pln">sortable</span>',content:[{title:"SortableComponent",anchor:"sortable-component",outlet:h.r2}]},{name:"Examples",anchor:"examples",tabName:"examples",outlet:h.xK,content:[{title:"Basic",anchor:"basic-ex",outlet:v},{title:"Complex data model",anchor:"complexDatamodel-ex",outlet:C},{title:"Custom item template",anchor:"itemTemplate-ex",outlet:f}]}];var B=a(86223),A=a(52439);let S=(()=>{class s{constructor(){this.name="Sortable",this.src="https://github.com/valor-software/ngx-bootstrap/blob/development/src/sortable",this.componentContent=w}static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275cmp=e.VBU({type:s,selectors:[["sortable-section"]],decls:15,vars:4,consts:[[3,"name","src","componentContent"],[3,"content"]],template:function(n,t){1&n&&(e.j41(0,"demo-section",0)(1,"p"),e.EFF(2,"The "),e.j41(3,"strong"),e.EFF(4,"sortable component"),e.k0s(),e.EFF(5," represents a list of items, with ability to sort them or move to another container via drag&drop. Input collection isn't mutated by the component, so events "),e.j41(6,"code"),e.EFF(7,"ngModelChange"),e.k0s(),e.EFF(8,", "),e.j41(9,"code"),e.EFF(10,"onChange"),e.k0s(),e.EFF(11," are using new collections."),e.k0s(),e.j41(12,"p"),e.EFF(13,"The easiest way to add the sortable component to your app (will be added to the root module)"),e.k0s(),e.nrm(14,"docs-section",1),e.k0s()),2&n&&(e.Y8G("name",t.name)("src",t.src)("componentContent",t.componentContent),e.R7$(14),e.Y8G("content",t.componentContent))},dependencies:[B.q,A.C],styles:["\n    .sortable-item {\n      padding: 6px 12px;\n      margin-bottom: 4px;\n      font-size: 14px;\n      line-height: 1.4em;\n      text-align: center;\n      cursor: grab;\n      border: 1px solid transparent;\n      border-radius: 4px;\n      border-color: #adadad;\n    }\n\n    .sortable-item-active {\n      background-color: #e6e6e6;\n      box-shadow: inset 0 3px 5px rgba(0,0,0,.125);\n    }\n\n    .sortable-wrapper {\n      min-height: 150px;\n    }\n  "],encapsulation:2,changeDetection:0})}return s})();const O=[{path:"",component:S}];let L=(()=>{class s{static#e=this.\u0275fac=function(n){return new(n||s)};static#t=this.\u0275mod=e.$C({type:s});static#n=this.\u0275inj=e.G2t({imports:[p.MD,m.YN,h.ky,T,I.iI.forChild(O)]})}return s})()},953:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m='<div class="row">\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <bs-sortable\n      [(ngModel)]="itemStringsLeft"\n      itemClass="sortable-item"\n      itemActiveClass="sortable-item-active"\n      placeholderItem="Drag here"\n      placeholderClass="placeholderStyle text-center"\n      wrapperClass="sortable-wrapper"\n    ></bs-sortable>\n  </div>\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <bs-sortable\n      [(ngModel)]="itemStringsRight"\n      itemClass="sortable-item"\n      itemActiveClass="sortable-item-active"\n      placeholderItem="Drag here"\n      placeholderClass="placeholderStyle text-center"\n      wrapperClass="sortable-wrapper"\n    ></bs-sortable>\n  </div>\n</div>\n\n<div class=\'row\'>\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <pre class="code-preview">model: {{ itemStringsLeft | json }}</pre>\n  </div>\n\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <pre class="code-preview">model: {{ itemStringsRight | json }}</pre>\n  </div>\n</div>\n\n\n'},49013:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'basic-demo',\n  templateUrl: './basic.component.html'\n})\nexport class DemoBasicComponent {\n  itemStringsLeft = [\n    'Windstorm',\n    'Bombasto',\n    'Magneta',\n    'Tornado'\n  ];\n\n  itemStringsRight = ['Mr. O', 'Tomato'];\n}\n"},34185:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m='<div class="row">\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <bs-sortable\n      [(ngModel)]="itemObjectsLeft"\n      fieldName="name"\n      itemClass="sortable-item"\n      itemActiveClass="sortable-item-active"\n      placeholderItem="Drag here"\n      placeholderClass="placeholderStyle text-center"\n      wrapperClass="sortable-wrapper"\n    ></bs-sortable>\n  </div>\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <bs-sortable\n      [(ngModel)]="itemObjectsRight"\n      fieldName="name"\n      itemClass="sortable-item"\n      itemActiveClass="sortable-item-active"\n      placeholderItem="Drag here"\n      placeholderClass="placeholderStyle text-center"\n      wrapperClass="sortable-wrapper"\n    ></bs-sortable>\n  </div>\n</div>\n\n<div class=\'row\'>\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <pre class="code-preview">model: {{ itemObjectsLeft | json }}</pre>\n  </div>\n\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <pre class="code-preview">model: {{ itemObjectsRight | json }}</pre>\n  </div>\n</div>\n'},90661:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m="import { Component } from '@angular/core';\n\ninterface IItemObject {\n  id: number;\n  name: string;\n}\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'complex-datamodel-demo',\n  templateUrl: './complex-datamodel.component.html'\n})\nexport class ComplexDatamodelDemoComponent {\n  itemObjectsLeft: IItemObject[] = [\n    { id: 1, name: 'Windstorm' },\n    { id: 2, name: 'Bombasto' },\n    { id: 3, name: 'Magneta' }\n  ];\n\n  itemObjectsRight: IItemObject[] = [\n    { id: 4, name: 'Tornado' },\n    { id: 5, name: 'Mr. O' },\n    { id: 6, name: 'Tomato' }\n  ];\n}\n"},81050:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m='<ng-template #itemTemplate let-item="item" let-index="index"><span>{{index}}: {{item.value}}</span></ng-template>\n\n<div class="row">\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <bs-sortable\n      [(ngModel)]="itemStringsLeft"\n      [itemTemplate]="itemTemplate"\n      itemClass="sortable-item"\n      itemActiveClass="sortable-item-active"\n      placeholderItem="Drag here"\n      placeholderClass="placeholderStyle text-center"\n      wrapperClass="sortable-wrapper"\n    ></bs-sortable>\n  </div>\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <bs-sortable\n      [(ngModel)]="itemStringsRight"\n      itemClass="sortable-item"\n      itemActiveClass="sortable-item-active"\n      placeholderItem="Drag here"\n      placeholderClass="placeholderStyle text-center"\n      wrapperClass="sortable-wrapper"\n    ></bs-sortable>\n  </div>\n</div>\n\n<div class=\'row\'>\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <pre class="code-preview">model: {{ itemStringsRight | json }}</pre>\n  </div>\n\n  <div class="col-xs-6 col-6 col-md-5 col-lg-3">\n    <pre class="code-preview">model: {{ itemStringsRight | json }}</pre>\n  </div>\n</div>\n\n'},87782:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m="import { Component } from '@angular/core';\n\n@Component({\n  // eslint-disable-next-line @angular-eslint/component-selector\n  selector: 'custom-item-template-demo',\n  templateUrl: './custom-item-template.html'\n})\nexport class CustomItemTemplateDemoComponent {\n  itemStringsLeft: string[] = [\n    'Windstorm',\n    'Bombasto',\n    'Magneta',\n    'Tornado'\n  ];\n\n  itemStringsRight: string[] = ['Mr. O', 'Tomato'];\n}\n"},68901:(g,r,a)=>{a.r(r),a.d(r,{default:()=>m});const m="### Standalone component usage\nimport { SortableModule } from 'ngx-bootstrap/sortable';\n\n@Component({\n  standalone: true,\n  imports: [SortableModule,...]\n})\nexport class AppComponent(){}\n\n### Module usage\nimport { SortableModule } from 'ngx-bootstrap/sortable';\n\n@NgModule({\n  imports: [SortableModule,...]\n})\nexport class AppModule(){}\n"}}]);