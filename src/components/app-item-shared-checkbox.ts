import { Events } from '../constants/events';
import eventBus from '../services/eventBus';
import { Item } from '../models/item';

enum CheckboxAccessability {
    ENABLED,
    DISABLED
}

export class AppItemSharedCheckbox extends HTMLElement {
    #connectionData: any;
    #isItemChosenShared: boolean;
    #chosenItem: Item;

    async connectedCallback() {
        eventBus.register(Events.ITEM_CLICKED, this.itemChosenHandler.bind(this));
        this.renderDisabled();
    }

    set connection(payload) {
        this.#connectionData = payload;       
    }

    async clickHandler() {
        this.renderDisabled();

        if (this.#isItemChosenShared) {
            await this.#chosenItem.unshare(this.#connectionData.connection.id);
            this.#isItemChosenShared = false;
        } else {
            await this.#chosenItem.share(this.#connectionData.connection.id);
            this.#isItemChosenShared = true;
        }

        this.renderThenAddEventListener();
    }

    async itemChosenHandler(event) {
        this.#chosenItem = event.detail as Item;
        const itemDetails = await this.#chosenItem.itemData;

        // Shares don't have shares[] property.
        if (itemDetails.shares) {
            this.#isItemChosenShared = !!itemDetails.shares.find(x => x.connection_id === this.#connectionData.connection.id);
            this.renderThenAddEventListener();
        } else {
            this.#isItemChosenShared = false;
            this.renderDisabled(); 
        }
    }

    renderDisabled() {
        this.firstElementChild?.removeEventListener('click', this.clickHandler.bind(this));
        this.render(CheckboxAccessability.DISABLED);
    }

    renderThenAddEventListener() {
        this.firstElementChild?.removeEventListener('click', this.clickHandler.bind(this));
        this.render(CheckboxAccessability.ENABLED);
        this.firstElementChild?.addEventListener('click', this.clickHandler.bind(this));
    }

    render(checkboxAccessability: CheckboxAccessability) {
        this.innerHTML = `
            <label>
                ${this.#connectionData.connection.user_id}
                <input type="checkbox" 
                    ${checkboxAccessability === CheckboxAccessability.DISABLED ? "disabled" : ""} 
                    ${this.#isItemChosenShared ? "checked" : ""}
                >
            </label>
        `;
    }

    disconnectedCallback() {
        this.firstElementChild?.removeEventListener('click', this.clickHandler.bind(this));
    }
}