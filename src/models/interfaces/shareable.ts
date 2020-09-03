import { IBaseModel } from './baseModel';
// import { IItemDataRetrievable } from './itemDataRetrievable';

export interface IShareable extends IBaseModel {
    share: (connectionId: string) => Promise<any>;
    unshare: (connectionId: string) => Promise<any>;
}