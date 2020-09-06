import { IView } from '../components/interfaces/view';
import { Events } from '../constants/events';
import { isItem, Item } from '../models/item';
import { EVENT_BUS } from '../services/eventBus';

export class AppAttachmentUploadPresenter {
    #itemChosen: Item;
    #view: IView<boolean>;

    constructor(view: IView<boolean>) {
        this.#view = view;
    }

    itemChosenHandler(event: CustomEvent) {
        const payload = event.detail;
        if (isItem(payload)) {
            this.#itemChosen = payload;
            this.#view.render([true]);
        } else {
            this.#itemChosen = null;
            this.#view.render([false]);
        }
    }

    async uploadAttachment(label: string, files: FileList) {
        EVENT_BUS.fire(Events.ATTACHMENT_OP_STARTED);
        await this.#itemChosen.uploadAttachment(label, files);
        EVENT_BUS.fire(Events.ATTACHMENT_OP_ENDED);
    }
}