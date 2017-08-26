"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const PIXI = require("pixi.js");
let FilterComponent = class FilterComponent {
    constructor() {
        this.filterName = null;
        this.container = null;
        this.config = {};
    }
    ngOnInit() {
        switch (this.filterName) {
            case 'blur':
                this.filter = new PIXI.filters.BlurFilter();
                for (var c in this.config)
                    this.filter[c] = this.config[c];
                break;
        }
        console.log(this.container);
        if (this.container.filters)
            this.container.filters.push(this.filter);
        else
            this.container.filters = [this.filter];
    }
    ngOnDestroy() {
        let filterIndex = this.container.filters.indexOf(this.filter);
        this.container.filters.splice(filterIndex, 1);
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FilterComponent.prototype, "filterName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", typeof (_a = (typeof PIXI !== "undefined" && PIXI).Container) === "function" && _a || Object)
], FilterComponent.prototype, "container", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FilterComponent.prototype, "config", void 0);
FilterComponent = __decorate([
    core_1.Component({
        selector: 'filter-effect',
        template: '<span></span>'
    }),
    __metadata("design:paramtypes", [])
], FilterComponent);
exports.FilterComponent = FilterComponent;
var _a;
//# sourceMappingURL=filters.component.js.map