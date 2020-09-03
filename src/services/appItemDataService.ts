import { ShareService, ItemService, AuthData } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG } from './environmentService';
import { IAppItemDataService } from './interfaces/appItemDataService';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { AppBaseMeecoService } from './appBaseMeecoService';

export class AppSharedItemDataService extends AppBaseMeecoService implements IAppItemDataService {
    async getItem(itemDataRetrievable: IItemDataRetrievable) {
        return await new ShareService(ENVIRONMENT_CONFIG).getSharedItem(this.user, itemDataRetrievable.id);
    }
}

export class AppCreatedItemDataService extends AppBaseMeecoService implements IAppItemDataService {
    async getItem(itemDataRetrievable: IItemDataRetrievable) {
        return await new ItemService(ENVIRONMENT_CONFIG).get(itemDataRetrievable.id, this.user.vault_access_token, this.user.data_encryption_key);
    }
}
