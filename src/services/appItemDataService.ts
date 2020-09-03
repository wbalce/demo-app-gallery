import { ShareService, ItemService } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG, STATE } from './environmentService';
import { IAppItemDataService } from './interfaces/appItemDataService';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';

export class AppSharedItemDataService implements IAppItemDataService {
    async getItem(itemDataRetrievable: IItemDataRetrievable) {
        return await new ShareService(ENVIRONMENT_CONFIG).getSharedItem(STATE.user, itemDataRetrievable.id);
    }
}

export class AppCreatedItemDataService implements IAppItemDataService {
    async getItem(itemDataRetrievable: IItemDataRetrievable) {
        return await new ItemService(ENVIRONMENT_CONFIG).get(itemDataRetrievable.id, STATE.user.vault_access_token, STATE.user.data_encryption_key);
    }
}
