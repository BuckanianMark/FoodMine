import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-container',
  templateUrl: './input-conatiner.component.html',
  styleUrls: ['./input-conatiner.component.css']
})
export class InputConatinerComponent {

  @Input()
  label!:string;
  @Input()
  bgColor='white';

}
