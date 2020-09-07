import { IView } from '../components/interfaces/view';
import { IFileAttachment } from '../models/interfaces/fileAttachment';
import { IFileAttachable } from '../models/interfaces/fileAttachable';

export class AppAttachmentsListPresenter {
    #view: IView<IFileAttachment>;

    constructor(view: IView<IFileAttachment>) {
        this.#view = view;
    }

    async iconClickedHandler(event: CustomEvent) {
        const item = event.detail as IFileAttachable;
        const results = await item.getAttachments(); 

        this.#view.render(results);
    }
}