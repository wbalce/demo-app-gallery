import { Events } from '../constants/events';
import { AppItem } from './app-item';
import eventBus from '../services/eventBus';
import { AppCreatedItemDataService, AppSharedItemDataService } from '../services/appItemDataService';
import { AppShareService } from '../services/appShareService';
import { Item } from '../models/item';
import { AppItemIdCollectionService } from '../services/appItemIdCollectionService';

export class AppGallery extends HTMLElement {

    async connectedCallback() {
        this.classList.add('hidden');
        eventBus.register(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }

    async loginHandler(event) {
        try {
            const appItemIdCollectionService = new AppItemIdCollectionService();
            const items = await appItemIdCollectionService.getCreatedItems();
            const sharedItems = await appItemIdCollectionService.getIncomingSharedItems();
            this.render(items, sharedItems);
            this.classList.remove('hidden');
        } catch (e) {
            console.error(e);
        }
    }

    render(items, shares) {
        items.forEach(x => {
            const itemEl = document.createElement('app-item') as AppItem;
            const item = new Item(x.id, new AppShareService(), new AppCreatedItemDataService()); 
            itemEl.item = item;
            this.appendChild(itemEl);
        });

        shares.forEach(x => {
            const itemEl = document.createElement('app-item') as AppItem;
            const item = new Item(x.id, new AppShareService(), new AppSharedItemDataService());
            itemEl.item = item;
            this.appendChild(itemEl);
        });
    }

    disconnectedCallback() {
        eventBus.remove(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }
}