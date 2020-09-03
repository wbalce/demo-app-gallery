import { ENVIRONMENT_CONFIG } from './environmentService';
import { AuthData, ItemService, ShareService } from '@meeco/sdk';

export class AppItemIdCollectionService {
    #user: AuthData;

    constructor(user: AuthData) {
        this.#user = user;
    }

    async getCreatedItems() {
        const response = await new ItemService(ENVIRONMENT_CONFIG).list(this.#user.vault_access_token);
        return response.items; 
    }

    async getIncomingSharedItems() {
        const response = await new ShareService(ENVIRONMENT_CONFIG).listShares(this.#user);
        return response.shares;
    }
}