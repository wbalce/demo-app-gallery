import { ShareService, ItemService, AuthData, Environment, vaultAPIFactory } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG, STATE } from './environmentService';
import { Item } from '../models/item';

export interface IAppItemDataService {
    getItem: (Item) => Promise<any>;
}

export class AppSharedItemDataService implements IAppItemDataService {
    async getItem(item: Item) {
        return await new ShareService(ENVIRONMENT_CONFIG).getSharedItem(STATE.user, item.id);
    }
}

export class AppCreatedItemDataService implements IAppItemDataService {
    async getItem(item: Item) {
        return await new ItemService(ENVIRONMENT_CONFIG).get(item.id, STATE.user.vault_access_token, STATE.user.data_encryption_key);
    }
}
