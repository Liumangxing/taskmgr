import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkTheme = false;

  constructor(
    private oc:OverlayContainer
  ){

  }

  switchTheme(dark) {
    this.darkTheme = dark;
    if(dark){
      this.oc.getContainerElement().classList.add('myapp-dark-theme');
    }else{
      this.oc.getContainerElement().classList.remove('myapp-dark-theme');
    }
  }
  
}
