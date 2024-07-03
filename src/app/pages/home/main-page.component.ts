import { Component } from '@angular/core';
import {NgxTypedJsModule} from 'ngx-typed-js';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [NgxTypedJsModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {

  ngOnInit(): void {}

  // writeAnimation(text: string): void {
  //   let index = 0;
  //   const arrayCaracteres = text.split('');
  //   const counter: any = arrayCaracteres.length;

  //   setInterval(() => {
  //     if (index !== counter) {
  //       index++
  //       this.subtitle = text.substring(0,index);
  //     }
  //   }, 100)
  // }

}
