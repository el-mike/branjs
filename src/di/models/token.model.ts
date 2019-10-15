import { Type } from '../../models/type.model';

import { InjectionToken } from './injection-token.model';

export type Token<T> = Type<T> | InjectionToken;
