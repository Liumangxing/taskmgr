import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup
  quote:Quote = {
    cn:'满足感在于不断的努力，而不是现有成就。全心努力定会胜利满满。',
    en:'Satisfaction lies in the effort, not in the achievement. Full effort is full victory.',
    pic:'/assets/img/quote_fallback.jpg'
  }

  constructor(
    private fb: FormBuilder,
    private quoteService$:QuoteService
  ) {
    this.quoteService$.getQuote().subscribe(q=> this.quote = q);
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
