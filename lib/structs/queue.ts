export class Queue<T> {
  private _queue: T[];

  public get length() {
    return this._queue.length;
  }

  public get isEmpty() {
    return this._queue.length > 0;
  }

  public constructor() {
    this._queue = [];
  }

  public enqueue(item: T) {
    this._queue.push(item);
  }

  public dequeue() {
    return this._queue.shift();
  }

  public peek() {
    return this._queue[0];
  }
}
