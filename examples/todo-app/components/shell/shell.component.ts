import {
  Component,
  OnInit,
} from '@bran/view';

@Component({
  template: require('./shell.component.html'),
  selector: 'appShell'
})
export class ShellComponent implements OnInit {
  constructor() {}

  public onInit() {
    console.log('SHELL INIT!');
  }
}
