import { Events } from '../constants/events';
import eventBus from '../services/eventBus';
import { Item } from '../models/item';

export class AppItem extends HTMLElement {
    #item: Item;

    async connectedCallback() {
        try { 
            this.render();
            this.firstElementChild.addEventListener('click', this.clickHandler.bind(this));
        } catch (e) {
            console.error(e);
        }
    }

    set item(payload) {
        this.#item = payload;
    }

    async clickHandler() {
        eventBus.fire(Events.ITEM_CLICKED, this.#item);
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