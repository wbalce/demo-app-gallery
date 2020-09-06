import { EVENT_BUS } from '../services/eventBus';
import { Events } from '../constants/events';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';

export class AppItemModal extends HTMLElement {
    connectedCallback() {
        this.classList.add('hidden');
        EVENT_BUS.register(Events.ICON_CLICKED, this.openModalHandler.bind(this));
    }

    async openModalHandler(event) {
        const item = event.detail as IItemDataRetrievable;
        const itemData = await item.retrieveItemData();
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