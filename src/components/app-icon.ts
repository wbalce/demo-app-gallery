import { Events } from '../constants/events';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { EVENT_BUS } from '../services/eventBus';

export class AppIcon extends HTMLElement {
    #itemDataRetreivable: IItemDataRetrievable;

    connectedCallback() {
        this.render();
        EVENT_BUS.register(Events.SHARE_OP_STARTED, this.disableAppItem.bind(this));
        EVENT_BUS.register(Events.SHARE_OP_ENDED, this.enableAppItem.bind(this));
        this.firstElementChild.addEventListener('click', this.clickHandler.bind(this));
    }

    set itemDataRetreivable(value: IItemDataRetrievable) {
        this.#itemDataRetreivable = value;
    }

    async clickHandler() {
        EVENT_BUS.fire<IItemDataRetrievable>(Events.ICON_CLICKED, this.#itemDataRetreivable);
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