import {
  Component,
  OnInit,
} from '@bran/view';

@Component({
  template: require('./todo-list.component.html'),
  selector: 'appTodoList'
})
export class TodoListComponent implements OnInit {
  constructor() {}

  public onInit() {
    console.log('TODOLIST INIT!');
  }
}
