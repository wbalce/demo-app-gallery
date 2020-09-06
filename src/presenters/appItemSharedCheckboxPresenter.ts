import { Events } from '../constants/events';
import { EVENT_BUS } from '../services/eventBus';
import { isItem, Item } from '../models/item';
import { IView } from '../components/interfaces/view';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';

export type AppItemSharedCheckboxData = {
    connectionId: string,
    userId: string,
    isItemChosenShared: boolean
}

export class AppItemSharedCheckboxPresenter {
    #itemChosen: Item;
    #data: AppItemSharedCheckboxData;
    #view: IView<AppItemSharedCheckboxData>;

    constructor(view: IView<AppItemSharedCheckboxData>, connectionId: string, userId: string) {
        this.#view = view;
        this.#data = {connectionId, userId, isItemChosenShared: false};
    }

    async clickHandler() {
        EVENT_BUS.fire(Events.SHARE_OP_STARTED);

        if (this.#data.isItemChosenShared) {
            await this.#itemChosen.unshare(this.#data.connectionId);
            this.#data.isItemChosenShared = false;
        } else {
            await this.#itemChosen.share(this.#data.connectionId);
            this.#data.isItemChosenShared = true;
        }
    
        EVENT_BUS.fire(Events.SHARE_OP_ENDED);

        this.#view.render([this.#data]);
    }

    async itemChosenHandler(event: CustomEvent) {
        const itemDataRetrievable = event.detail as IItemDataRetrievable;

        if (isItem(itemDataRetrievable)) {
            this.#itemChosen = itemDataRetrievable;
            const itemDetails = await this.#itemChosen.itemData;

            this.#data.isItemChosenShared = !!itemDetails.shares.find(x => x.connection_id === this.#data.connectionId);

            this.#view.render([this.#data]);
        } else {
            this.shareChosenHandler();
        }
    }

    shareChosenHandler() {
        this.#itemChosen = null;
        this.#view.render([]);
    }
}