import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})




export class ButtonComponent implements OnInit{
  @Input()
  type: 'Submit' | 'button' = 'Submit';
  @Input()
  text: string = 'Submit';
  // @Input()
  // bgColor = '#e729729'
  // @Input()
  // color = 'white'
  // @Input()
  // widthRem = 12
  // @Input()
  // fontSizeRem = 1.3
  @Output()
  onClick = new EventEmitter()
  ngOnInit(): void {
     
  }


}
