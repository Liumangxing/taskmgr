import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['zhang@163.com', Validators.compose([Validators.required, Validators.email,this.validate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    // this.form.controls['email'].setValidators(this.validate);
    console.log(JSON.stringify(value));
    console.log(valid);

  }

  validate(c: FormControl): { [key: string]:any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^zhang+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'The email must start with zhang'
    }
  }

}
