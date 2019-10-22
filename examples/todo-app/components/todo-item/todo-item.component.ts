import {
  Component,
  OnInit,
  EventHandler,
} from '@bran/view';

@Component({
  template: require('./todo-item.component.html'),
  selector: 'appTodoItem'
})
export class TodoItemComponent implements OnInit {
  constructor() {}

  @EventHandler({
    selector: '#completeTodoBtn',
    event: 'click'
  })
  public completeTodo() {
    console.log('TODO COMPLETED!');
  }

  public onInit() {
    console.log('TODOITEM INIT!');
  }
}
