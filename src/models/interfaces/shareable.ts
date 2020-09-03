import { IBaseModel } from './baseModel';

export interface IShareable extends IBaseModel {
    share: (connectionId: string) => Promise<any>;
    unshare: (connectionId: string) => Promise<any>;
}