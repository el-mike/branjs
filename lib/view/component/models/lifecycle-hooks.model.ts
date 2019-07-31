export interface OnInit {
  onInit: () => void;
}

export interface OnDestroy {
  onDestroy: () => void;
}

export interface AfterViewRendered {
  afterViewRendered: () => void;
}

export interface LifecycleHooks extends
  Partial<OnInit>,
  Partial<OnDestroy>,
  Partial<AfterViewRendered> {}

