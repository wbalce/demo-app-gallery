import { AppAttachmentItemPresenter } from '../presenters/appAttachmentItemPresenter';
import { FileAttachment } from '../models/fileAttachment';
import { IView } from './interfaces/view';

export class AppAttachmentItem extends HTMLElement implements IView<FileAttachment> {
    #presenter: AppAttachmentItemPresenter;
    #fileAttachment: FileAttachment;

    connectedCallback() {
        this.render([this.#fileAttachment]);
        this.#presenter = new AppAttachmentItemPresenter(this, this.#fileAttachment);
        this.querySelector('.download')?.addEventListener('click', this.#presenter.onDownloadClickedHandler.bind(this.#presenter));
        this.querySelector('.delete')?.addEventListener('click', this.#presenter.onDeleteClickedHandler.bind(this.#presenter));
    }

    set fileAttachment(value: FileAttachment) {
        this.#fileAttachment = value;
    }

    render(data: FileAttachment[]) {
        const fileAttachment = data[0];

        if (fileAttachment) {
            this.innerHTML = `
                <div class="list">
                    ${fileAttachment.id}
                    <button class="download">Download</button>
                    <button class="delete">Delete</button>
                </div>
            `;
        } else {
            this.classList.add('hidden');
        }
    }

    disconnectedCallback() {
        this.querySelector('.download')?.removeEventListener('click', this.#presenter.onDownloadClickedHandler.bind(this.#presenter));
        this.querySelector('.delete')?.removeEventListener('click', this.#presenter.onDeleteClickedHandler.bind(this.#presenter));
    }
}