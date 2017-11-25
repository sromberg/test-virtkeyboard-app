
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  IKeyboardLayout, IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardComponent, MatKeyboardModule, MatKeyboardRef,
  MatKeyboardService
} from '@ngx-material-keyboard/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  private _keyboardRef: MatKeyboardRef<MatKeyboardComponent>;

  darkTheme: boolean;
  duration: number;
  hasAction: boolean;
  isDebug: boolean;
  defaultLocale: string;
  layout: string;

  layouts: {
    name: string;
    layout: IKeyboardLayout;
  }[];

  constructor(private _keyboardService: MatKeyboardService,
              @Inject(LOCALE_ID) public locale,
              @Inject(MAT_KEYBOARD_LAYOUTS) private _layouts) {
    // console.log(locale);
    // console.log(_layouts);
  }

  ngOnInit() {
    this.defaultLocale = ` ${this.locale}`.slice(1);
    this.layouts = Object.keys(this._layouts)
      .map((name: string) => (
        {
          name: name,
          layout: this._layouts[name]
        }
      ))
      .sort((a, b) => a.layout.name.localeCompare(b.layout.name));
  }


  openKeyboard(locale = this.defaultLocale) {
    this._keyboardRef = this._keyboardService.open(locale, {
      darkTheme: this.darkTheme,
      duration: this.duration,
      isDebug: this.isDebug
    });
  }


}
