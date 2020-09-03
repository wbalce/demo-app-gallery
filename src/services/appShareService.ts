import { ShareService } from '@meeco/sdk';
import { IShareable } from '../models/interfaces/shareable';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { ENVIRONMENT_CONFIG, STATE } from './environmentService';
import { IAppShareService } from './interfaces/appShareService';

export class AppShareService implements IAppShareService {

    async shareItem(shareable: IShareable, connectionId: string) {
        return await new ShareService(ENVIRONMENT_CONFIG).shareItem(STATE.user, connectionId, shareable.id);
    }

    async unshareItem(shareable: IShareable & IItemDataRetrievable, connectionId: string) {
        const itemData = await shareable.retrieveItemData();
        const share = itemData.shares.find(x => x.connection_id === connectionId);
        return await new ShareService(ENVIRONMENT_CONFIG).deleteSharedItem(STATE.user, share.id);
    }
}