import { AuthData } from '@meeco/sdk';
import { IView } from '../components/interfaces/view';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { Item } from '../models/item';
import { Share } from '../models/share';
import { AppAttachmentService } from '../services/appAttachmentService';
import { AppCreatedItemDataService, AppSharedItemDataService } from '../services/appItemDataService';
import { AppItemIdCollectionService } from '../services/appItemIdCollectionService';
import { AppShareService } from '../services/appShareService';

export class AppGalleryPresenter {
    #view: IView<IItemDataRetrievable>;

    constructor(view: IView<IItemDataRetrievable>) {
        this.#view = view;
    }

    buildItemInstances(user: AuthData, itemIds: string[], shareIds: string[]) {
        const result: IItemDataRetrievable[] = [];
    
        itemIds.forEach(id => {
            result.push(new Item(id, new AppShareService(user), new AppCreatedItemDataService(user), new AppAttachmentService(user))); 
        });

        shareIds.forEach(id => {
            result.push(new Share(id, new AppSharedItemDataService(user)));
        });

        return result;
    }

    async galleryLoginHandler(event: CustomEvent) {
        const user = event.detail as AuthData;
        const appItemIdCollectionService = new AppItemIdCollectionService(user);
        const itemIds = await appItemIdCollectionService.getCreatedItems();
        const shareIds = await appItemIdCollectionService.getIncomingSharedItems();
        const itemDataRetrievables = this.buildItemInstances(user, itemIds, shareIds);

        this.#view.render(itemDataRetrievables);
    }
}