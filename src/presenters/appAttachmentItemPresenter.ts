import { IView } from '../components/interfaces/view';
import { FileAttachment } from '../models/fileAttachment';

export class AppAttachmentItemPresenter {
    #view: IView<FileAttachment>;
    #fileAttachment: FileAttachment;

    constructor(view: IView<FileAttachment>, fileAttachment: FileAttachment) {
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