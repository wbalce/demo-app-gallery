import { IView } from './interfaces/view';
import { Events } from '../constants/events';
import { EVENT_BUS } from '../services/eventBus';
import { AppAttachmentsListPresenter } from '../presenters/appAttachmentsListPresenter';
import { AppAttachmentItem } from './app-attachment-item';
import { FileAttachment } from '../models/fileAttachment';

export class AppAttachmentsList extends HTMLElement implements IView<FileAttachment> {
    #presenter: AppAttachmentsListPresenter;

    connectedCallback() {
        this.#presenter = new AppAttachmentsListPresenter(this);
        EVENT_BUS.register(Events.ICON_CLICKED, this.#presenter.iconClickedHandler.bind(this.#presenter));
    }

    render(attachmentData: FileAttachment[]) {
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }
    
        attachmentData.forEach(x => {
            const appAttachmentItemEl = document.createElement('app-attachment-item') as AppAttachmentItem;
            appAttachmentItemEl.fileAttachment = x;
            this.appendChild(appAttachmentItemEl);
        });
    }
}