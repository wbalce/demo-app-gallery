import { ShareService } from '@meeco/sdk';
import { IShareable } from '../models/interfaces/shareable';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { ENVIRONMENT_CONFIG } from './environmentService';
import { IAppShareService } from './interfaces/appShareService';
import { AppBaseMeecoService } from './appBaseMeecoService';

export class AppShareService extends AppBaseMeecoService implements IAppShareService {
    async isItemAlreadyShared(shareable: IShareable & IItemDataRetrievable, connectionId: string) {
        const itemData = await shareable.retrieveItemData();
        return !!itemData.shares.find(x => x.connection_id === connectionId);
    }

    async shareItem(shareable: IShareable, connectionId: string) {
        return await new ShareService(ENVIRONMENT_CONFIG).shareItem(this.user, connectionId, shareable.id);
    }

    async unshareItem(shareable: IShareable & IItemDataRetrievable, connectionId: string) {
        const itemData = await shareable.retrieveItemData();
        const share = itemData.shares.find(x => x.connection_id === connectionId);
        return await new ShareService(ENVIRONMENT_CONFIG).deleteSharedItem(this.user, share.id);
    }
}