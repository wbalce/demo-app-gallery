import { ShareService, Environment, AuthData } from '@meeco/sdk';
import { Item } from '../models/item';
import { ENVIRONMENT_CONFIG, STATE } from './environmentService';

export interface IAppShareService {
    shareItem: (Item, string) => Promise<any>;
    unshareItem: (Item, string) => Promise<void>;
}

export class AppShareService implements IAppShareService {

    async shareItem(item: Item, connectionId: string) {
        return await new ShareService(ENVIRONMENT_CONFIG).shareItem(STATE.user, connectionId, item.id);
    }

    async unshareItem(item: Item, connectionId: string) {
        const itemData = await item.itemData;
        const share = itemData.shares.find(x => x.connection_id === connectionId);
        return await new ShareService(ENVIRONMENT_CONFIG).deleteSharedItem(STATE.user, share.id);
    }
}