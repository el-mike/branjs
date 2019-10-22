export enum TemplateASTBindingTargetType {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
  DIRECTIVE = 'DIRECTIVE',
  INTERPOLATION = 'INTERPOLATION'
}

export abstract class TemplateASTBindingTarget {
  public constructor() {}
}
