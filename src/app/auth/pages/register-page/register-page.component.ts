import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { EmailValidators } from 'src/app/shared/validators/email-validators.service';
import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidators]],
    username: ['',[ Validators.required, this.validatorService.cantBeStrider]],
    password: ['', Validators.required, Validators.minLength(6)],
    password2: ['', Validators.required],
    
  },{
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorsService,
              private emailValidators: EmailValidators){}

  isValidField(field: string){
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSummit(){
    this.myForm.markAllAsTouched();
  }

}
