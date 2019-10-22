import {
  NAMESPACE_PREFIX,
  PATTERNS,
} from './patterns';

export const MATCH_NAMESPACE_REGEXP = new RegExp(`^${NAMESPACE_PREFIX}`, 'i');
export const IS_SELECTOR_REGEXP = new RegExp(`^${PATTERNS.SELECTOR}`, 'i');

export const INTERPOLATION_REGEXP = /\{\{.*?\}\}/g;

export const IS_IF_DIRECTIVE_REGEXP = new RegExp(`${PATTERNS.IF}`, 'i');
export const IS_FOR_DIRECTIVE_REGEXP = new RegExp(`${PATTERNS.FOR}`, 'i');

export const IS_INPUT_REGEXP = new RegExp(`^${PATTERNS.INPUT}`, 'i');
export const IS_OUTPUT_REGEXP = new RegExp(`^${PATTERNS.OUTPUT}`, 'i');
