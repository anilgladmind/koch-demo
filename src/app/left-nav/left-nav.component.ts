import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'koch-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  @Input() minValue: number = 0;
  @Input() maxValue: number = 100;
  @Input() floor: number = 0;
  @Input() ceil: number=1000;

  @Output() priceRangeValues = new EventEmitter();

  private setValues:any;

  options: Options = {
    floor: this.floor,
    ceil: this.ceil
  };

  constructor() {
  }

  ngOnInit() {
    this.options = {
      floor: this.floor,
      ceil: this.ceil
    }
  }

  valueChangeSet($event) {
    this.setValues = {
      minValue: $event.value,
      maxValue: $event.highValue
    };
  }

  applyButton(){
    this.priceRangeValues.emit(this.setValues);
  }
}
