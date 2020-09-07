import { IShareable } from '../../models/interfaces/shareable';

export interface IAppShareService {
    isItemAlreadyShared: (shareable: IShareable, connectionId: string) => Promise<boolean>;
    shareItem: (shareable: IShareable, connectionId: string) => Promise<any>;
    unshareItem: (shareable: IShareable, connectionId: string) => Promise<void>;
}