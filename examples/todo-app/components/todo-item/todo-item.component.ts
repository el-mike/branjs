import {
  Component,
  OnInit,
} from '@bran/view';

@Component({
  template: require('./todo-item.component.html'),
  selector: 'appTodoItem'
})
export class TodoItemComponent implements OnInit {
  constructor() {}

  public onInit() {
    console.log('TODOITEM INIT!');
  }
}
