import eventBus from '../services/eventBus';
import { ENVIRONMENT_CONFIG } from '../services/environmentService';
import { Events } from '../constants/events';
import { Item } from '../models/item';

export class AppItemModal extends HTMLElement {
    connectedCallback() {
        this.classList.add('hidden');
        eventBus.register(Events.ITEM_CLICKED, this.openModalHandler.bind(this));
    }

    async openModalHandler(event) {
        const item = event.detail as Item;
        const itemData = await item.itemData;
        this.classList.remove('hidden');
        this.render(itemData.item.label, item.id);
    }

    render(label, id) {
        this.innerHTML = `
            <ul>
                <li>
                    Label: ${label}
                </li>
                <li>
                    ID: ${id}
                </li>
            </ul>
        `;
    }
}