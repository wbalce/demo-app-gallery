import { Events } from '../constants/events';
import { EVENT_BUS } from '../services/eventBus';
import { AppAttachmentUploadPresenter } from '../presenters/appAttachmentUploadPresenter';
import { IView } from './interfaces/view';

export class AppAttachmentUpload extends HTMLElement implements IView<boolean> {
    #presenter: AppAttachmentUploadPresenter;

    connectedCallback() {
        this.#presenter = new AppAttachmentUploadPresenter(this);
        this.renderForm();
        EVENT_BUS.register(Events.ICON_CLICKED, this.#presenter.itemChosenHandler.bind(this.#presenter));
        EVENT_BUS.register(Events.ATTACHMENT_OP_STARTED, this.disableUploadButton.bind(this));
        EVENT_BUS.register(Events.ATTACHMENT_OP_ENDED, this.enableUploadButton.bind(this));
        this.classList.add('hidden');

        this.render([false]);
    }

    disableUploadButton() {
        this.querySelector('button')?.classList.add('disabled');
    }

    enableUploadButton() {
        this.querySelector('button')?.classList.remove('disabled');
    }

    uploadHandler(event) {
        event.preventDefault();

        const form = this.firstElementChild as HTMLFormElement;
        const files = form.elements['file'].files as FileList;
        const label = form.elements['label'].value;

        this.#presenter.uploadAttachment(label, files);
    }

    renderForm() {
        const form = document.createElement('form');
        const labelLabel = document.createElement('label');
        const labelInput = document.createElement('input');
        labelInput.setAttribute('id', 'label');
        labelInput.setAttribute('type', 'text');

        const fileLabel = document.createElement('label');
        const fileInput = document.createElement('input');
        fileInput.setAttribute('id', 'file');
        fileInput.setAttribute('type', 'file');

        const button = document.createElement('button');
        button.addEventListener('click', this.uploadHandler.bind(this));

        labelLabel.innerText = 'Label';
        fileLabel.innerText = 'Attach file';
        button.innerText = 'Upload';

        labelLabel.appendChild(labelInput);
        fileLabel.appendChild(fileInput);

        form.appendChild(labelLabel);
        form.appendChild(fileLabel);
        form.appendChild(button);

        this.appendChild(form);
    }

    render(toggle: boolean[]) {
        if (toggle[0]) {
            this.classList.remove('hidden');
        } else {
            this.classList.add('hidden');
        }
    }
}