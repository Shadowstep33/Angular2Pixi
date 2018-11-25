import { Directive, Input, SimpleChanges } from "@angular/core";
import * as PIXI from "pixi.js";
import * as filters from "pixi-filters";

@Directive({
  selector: "[a2pfilter]"
})
export class FilterDirective {
  @Input("container")
  container;
  @Input("a2pfilter")
  set filterConfig(value) {
    console.log("Tryina change", value, this._filterConfig, this.filter);
    if ((this.filter ? this.filter.type : true) != value.type) {
      console.log("fitle rchanger", value);
      this._filterConfig = value;

      if (filters[this._filterConfig.type]) {
        this.wipeFilter();
        this.initFilter();
      } else {
        console.log(
          this._filterConfig.type + " filter not available (from set)",
          filters
        );
      }
    }
  }

  _filterConfig = {
    type: "BlurFilter"
  };

  filter: any;

  constructor() {}

  ngOnInit() {
    if (this.container === null) return;

    if (filters[this._filterConfig.type]) {
      this.initFilter();
    } else {
      console.log(this._filterConfig.type + " filter not available", filters);
    }
  }

  initFilter() {
    this.filter = new filters[this._filterConfig.type]();

    this.applyConfig();
    this.applyFilter();
  }

  applyConfig() {
    for (let c in this._filterConfig) this.filter[c] = this._filterConfig[c];
  }

  applyFilter() {
    if (this.container.filters) this.container.filters.push(this.filter);
    else this.container.filters = [this.filter];
  }

  wipeFilter() {
    this.container.filters = null;
  }

  ngOnDestroy() {
    this.wipeFilter();
  }

  getAvailableFilters() {
    return Object.keys(filters);
  }
}
