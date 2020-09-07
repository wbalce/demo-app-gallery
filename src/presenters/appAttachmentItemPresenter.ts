import { IView } from '../components/interfaces/view';
import { IFileAttachment } from '../models/interfaces/fileAttachment';

export class AppAttachmentItemPresenter {
    #view: IView<IFileAttachment>;
    #fileAttachment: IFileAttachment;

    constructor(view: IView<IFileAttachment>, fileAttachment: IFileAttachment) {
        this.#view = view;
        this.#fileAttachment = fileAttachment;
    }

    async onDownloadClickedHandler() {
        await this.#fileAttachment.download();
    }

    async onDeleteClickedHandler() {
        await this.#fileAttachment.delete();
        this.#view.render([]);
    }
}