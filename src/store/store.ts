import {
  Action,
  State,
  ReducersMap
} from './models';

export class Store<T> {
  private subscribers: Function[] = [];
  private reducers: ReducersMap<T>;
  private state: State<T>;

  private get value() {
    return this.state;
  }

  constructor(reducers: ReducersMap<State> = {}, initialState: State = {}) {
    this.reducers = reducers as ReducersMap<T>;
    this.state = this.reduce(initialState as T, { type: '' });
  }

  public subscribe(fn: (state: T) => any) {
    this.subscribers = [...this.subscribers, fn];
    this.emit(fn);

    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  public dispatch(action: Action) {
    this.state = this.reduce(this.state, action);
    this.emit();
  }

  private emit(subscriber: Function = null) {
    if (subscriber) {
      subscriber(this.value);
    } else {
      this.subscribers.forEach(fn => fn(this.value));
    }
  }

  private reduce(state: State<T>, action: Action) {
    const newState = {} as State<T>;

    for (const prop in this.reducers) {
      newState[prop] = this.reducers[prop](state[prop], action);
    }

    return newState;
  }
}
