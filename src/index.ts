import { AppIcon } from './components/app-icon';
import { AppGallery } from './components/app-gallery';
import { AppLogin } from './components/app-login';
import { AppItemModal } from './components/app-item-modal';
import { AppConnections } from './components/app-connections';
import { AppItemSharedCheckbox } from './components/app-item-shared-checkbox';
import { AppAttachmentUpload } from './components/app-attachment-upload';
import { AppAttachmentItem } from './components/app-attachment-item';
import { AppAttachmentsList } from './components/app-attachments-list';
import './index.scss';

window.customElements.define('app-login', AppLogin);
window.customElements.define('app-icon', AppIcon);
window.customElements.define('app-gallery', AppGallery);
window.customElements.define('app-item-modal', AppItemModal);
window.customElements.define('app-item-shared-checkbox', AppItemSharedCheckbox);
window.customElements.define('app-connections', AppConnections);
window.customElements.define('app-attachment-upload', AppAttachmentUpload);
window.customElements.define('app-attachment-item', AppAttachmentItem);
window.customElements.define('app-attachments-list', AppAttachmentsList);

const appEl = document.getElementById('app');

appEl.innerHTML = `
    <app-login></app-login>
    <app-item-modal></app-item-modal>
    <app-gallery></app-gallery>
    <app-connections></app-connections>
    <hr>
    <app-attachments-list></app-attachments-list>
    <app-attachment-upload></app-attachment-upload>
`;
