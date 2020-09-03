import { IShareable } from '../../models/interfaces/shareable';

export interface IAppShareService {
    shareItem: (shareable: IShareable, connectionId: string) => Promise<any>;
    unshareItem: (shareable: IShareable, connectionId: string) => Promise<void>;
}