import { Events } from '../constants/events';
import eventBus from '../services/eventBus';
import { Item } from '../models/item';

export class AppItem extends HTMLElement {
    #item: Item;

    async connectedCallback() {
        this.render();
        eventBus.register(Events.SHARE_OP_STARTED, this.disableAppItem.bind(this));
        eventBus.register(Events.SHARE_OP_ENDED, this.enableAppItem.bind(this));
        this.firstElementChild.addEventListener('click', this.clickHandler.bind(this));
    }

    set item(payload) {
        this.#item = payload;
    }

    async clickHandler() {
        eventBus.fire(Events.ITEM_CLICKED, this.#item);
    }

    enableAppItem() {
        this.classList.remove('disabled');
    }

    disableAppItem() {
        this.classList.add('disabled');
    }

    render() {
        this.classList.add('card');
        this.innerHTML = `
            <img src="https://via.placeholder.com/100"/>
        `;
    }

    disconnectedCallback() {
        this.firstElementChild.removeEventListener('click', this.clickHandler.bind(this));
    }
}