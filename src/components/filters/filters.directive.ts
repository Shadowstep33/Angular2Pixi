import {
  Directive,
  Input,
  SimpleChanges,
} from '@angular/core';
import * as filters from 'pixi-filters';

@Directive({
  selector: 'a2pfilter, [a2pfilter]',
})
export class FilterDirective {

  @Input('container') container;
  @Input('a2pfilter')
  set filterConfig(value) {
    if ((this.filter ? this.filter.type : true) != value.type) {
      this._filterConfig = value;

      if (filters[this._filterConfig.type]) {
        this.wipeFilter();
        this.initFilter();
      }
    }
  }

  _filterConfig = {
    type: "BlurFilter"
  }

  filter: any;

  constructor(
  ) {
  }

  ngOnInit() {
    if (this.container === null)
      return;

    if (filters[this._filterConfig.type]) {
      this.initFilter();
    }
  }

  initFilter() {
    this.filter = new filters[this._filterConfig.type]();

    this.applyConfig();
    this.applyFilter();
  }

  applyConfig() {
    for (let c in this._filterConfig)
      this.filter[c] = this._filterConfig[c];
  }

  applyFilter() {
    if (this.filter)
      if (this.container.filters)
        this.container.filters.push(this.filter);
      else
        this.container.filters = [this.filter];
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
