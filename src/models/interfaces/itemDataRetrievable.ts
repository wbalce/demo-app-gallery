import { IBaseModel } from './baseModel';

export interface IItemDataRetrievable extends IBaseModel {
    retrieveItemData: () => Promise<any>;
}