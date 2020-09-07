import { IBaseModel } from './baseModel';

export interface IShareable extends IBaseModel {
    isAlreadyShared: (connectionId: string) => Promise<boolean>;
    share: (connectionId: string) => Promise<any>;
    unshare: (connectionId: string) => Promise<any>;
}