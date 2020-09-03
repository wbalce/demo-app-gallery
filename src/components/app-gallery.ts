import { Events } from '../constants/events';
import { AppItem } from './app-item';
import eventBus from '../services/eventBus';
import { AppCreatedItemDataService, AppSharedItemDataService } from '../services/appItemDataService';
import { AppShareService } from '../services/appShareService';
import { Item } from '../models/item';
import { AppItemIdCollectionService } from '../services/appItemIdCollectionService';
import { AuthData } from '@meeco/sdk';

export class AppGallery extends HTMLElement {

    connectedCallback() {
        this.classList.add('hidden');
        eventBus.register(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }

    async loginHandler(event) {
        const user: AuthData = event.detail;

        const appItemIdCollectionService = new AppItemIdCollectionService(user);
        const items = await appItemIdCollectionService.getCreatedItems();
        const sharedItems = await appItemIdCollectionService.getIncomingSharedItems();

        this.render(items, sharedItems, user);
        this.classList.remove('hidden');
    }

    render(items, shares, user) {
        items.forEach(x => {
            const itemEl = document.createElement('app-item') as AppItem;
            const item = new Item(x.id, new AppShareService(user), new AppCreatedItemDataService(user)); 
            itemEl.item = item;
            this.appendChild(itemEl);
        });

        shares.forEach(x => {
            const itemEl = document.createElement('app-item') as AppItem;
            const item = new Item(x.id, new AppShareService(user), new AppSharedItemDataService(user));
            itemEl.item = item;
            this.appendChild(itemEl);
        });
    }

    disconnectedCallback() {
        eventBus.remove(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }
}