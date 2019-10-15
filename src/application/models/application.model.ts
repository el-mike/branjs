import { Type } from '../../models';
import { Provider } from '../../di';


export interface IApplicationMetadata {
  entryComponent: Type<any>;
  components: Type<any>[];
  providers: Provider<any>[];
}
