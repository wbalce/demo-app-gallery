import { ENVIRONMENT_CONFIG, STATE } from './environmentService';
import { ItemService, ShareService } from '@meeco/sdk';

export class AppItemIdCollectionService {
    async getCreatedItems() {
        const response = await new ItemService(ENVIRONMENT_CONFIG).list(STATE.user.vault_access_token);
        return response.items; 
    }

    async getIncomingSharedItems() {
        const response = await new ShareService(ENVIRONMENT_CONFIG).listShares(STATE.user);
        return response.shares;
    }
}