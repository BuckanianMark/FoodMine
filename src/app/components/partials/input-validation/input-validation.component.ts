import { Component, Input,OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES:any ={
  required:'*Should not be empty',
  email:'*Email is not valid'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit,OnChanges{

  @Input()
  control!:AbstractControl;
  @Input()
  showErrors:boolean = true;
  errormesage:string[]=[]
  ngOnInit(){
    this.control.statusChanges.subscribe(() =>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }
  ngOnChanges(changes:SimpleChanges): void{
    this.checkValidation();
  }

  checkValidation(){
    const errors = this.control.errors;
    if(!errors){
      this.errormesage = []
      return;
    }
    const errorKeys = Object.keys(errors); 
    this.errormesage = errorKeys.map(key => VALIDATORS_MESSAGES[key])
  }

}
