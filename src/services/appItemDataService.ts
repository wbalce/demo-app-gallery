import { ShareService, ItemService, AuthData } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG } from './environmentService';
import { IAppItemDataService } from './interfaces/appItemDataService';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';

export class AppSharedItemDataService implements IAppItemDataService {
    #user: AuthData;

    constructor(user: AuthData) {
        this.#user = user;
    }

    async getItem(itemDataRetrievable: IItemDataRetrievable) {
        return await new ShareService(ENVIRONMENT_CONFIG).getSharedItem(this.#user, itemDataRetrievable.id);
    }
}

export class AppCreatedItemDataService implements IAppItemDataService {
    #user: AuthData;

    constructor(user: AuthData) {
        this.#user = user;
    }

    async getItem(itemDataRetrievable: IItemDataRetrievable) {
        return await new ItemService(ENVIRONMENT_CONFIG).get(itemDataRetrievable.id, this.#user.vault_access_token, this.#user.data_encryption_key);
    }
}
