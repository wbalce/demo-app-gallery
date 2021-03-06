import { ENVIRONMENT_CONFIG } from './environmentService';
import { ItemService, ShareService } from '@meeco/sdk';
import { AppBaseMeecoService } from './appBaseMeecoService';

export class AppItemIdCollectionService extends AppBaseMeecoService {
    async getCreatedItems() {
        const response = await new ItemService(ENVIRONMENT_CONFIG).list(this.user.vault_access_token);
        return response.items.map(x => x.id); 
    }

    async getIncomingSharedItems() {
        const response = await new ShareService(ENVIRONMENT_CONFIG).listShares(this.user);
        return response.shares.map(x => x.id);
    }
}