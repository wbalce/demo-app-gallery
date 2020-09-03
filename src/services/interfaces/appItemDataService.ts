import { IItemDataRetrievable } from '../../models/interfaces/itemDataRetrievable';

export interface IAppItemDataService {
    getItem: (itemDataRetrievable: IItemDataRetrievable) => Promise<any>;
}

