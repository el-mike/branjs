import { Queue } from './queue';

export interface ITreeNode<T> {
  data: T;
  parent: ITreeNode<T>;
  children: ITreeNode<T>[];
}

export interface ITree<T> {
  root: ITreeNode<T>;
}

export enum TreeTraversal {
  DEPTH_FIRST = 'DEPTH_FIRST',
  BREADTH_FIRST = 'BREADTH_FIRST',
}

export class TreeNode<T> {
  public data: T;
  public parent: TreeNode<T>;
  public children: TreeNode<T>[];

  public get isRoot() {
    return !this.parent;
  }

  public get hasChildren() {
    return this.children.length > 0;
  }

  public constructor(payload: Partial<TreeNode<T>> = {}) {
    this.data = payload.data || null;
    this.parent = payload.parent || null;
    this.children = payload.children || [];
  }

  public addChild(childNode: TreeNode<T>) {
    this.children.push(childNode);
  }
}

export class Tree<T> implements ITree<T> {
  public root: TreeNode<T>;

  public constructor(data: T) {
    this.root = new TreeNode({ data });
  }

  public add(data: T, parentData: T, traversalType: TreeTraversal = TreeTraversal.DEPTH_FIRST) {
    const child = new TreeNode<T>({ data });
    let parent: TreeNode<T> | null = null;

    this.contains(node => {
      if (node.data === parentData) {
        parent = node;
      }
    }, traversalType);

    if (parent) {
      child.parent = parent;
      parent.addChild(child);
    }
  }

  public remove(data: T, parentData: T, traversalType: TreeTraversal = TreeTraversal.DEPTH_FIRST) {
    let parent: TreeNode<T> | null = null;

    this.contains(node => {
      if (node.data === parentData) {
        parent = node;
      }
    }, traversalType);

    if (parent) {
      parent.children = parent.children.filter(child => child.data !== data);
    }
  }

  public contains(cb: (node: TreeNode<T>) => void, traversalType: TreeTraversal = TreeTraversal.DEPTH_FIRST) {
    const traversal = this._getTraversalMethod(traversalType);

    traversal.call(this, cb);
  }

  public traverseDF(cb: (node: TreeNode<T>) => void) {
    const recurse = (currentNode: TreeNode<T>) => {
      currentNode.children.forEach(childNode => recurse(childNode));

      cb(currentNode);
    };

    recurse(this.root);
  }

  public traverseBF(cb: (node: TreeNode<T>) => void) {
    const queue = new Queue<TreeNode<T>>();

    queue.enqueue(this.root);

    let currentNode = queue.dequeue();

    while (currentNode) {
      currentNode.children.forEach(childNode => queue.enqueue(childNode));

      cb(currentNode);
      currentNode = queue.dequeue();
    }
  }

  private _getTraversalMethod(traversalType: TreeTraversal) {
    if (traversalType === TreeTraversal.DEPTH_FIRST) {
      return this.traverseDF;
    }

    if (traversalType === TreeTraversal.BREADTH_FIRST) {
      return this.traverseBF;
    }

    return this.traverseDF;
  }
}
