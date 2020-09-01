import { AppItem } from './components/app-item';
import { AppGallery } from './components/app-gallery';
import { AppLogin } from './components/app-login';
import { AppItemModal } from './components/app-item-modal';
import { AppConnections } from './components/app-connections';
import { AppItemSharedCheckbox } from './components/app-item-shared-checkbox';
import './index.scss';

window.customElements.define('app-login', AppLogin);
window.customElements.define('app-item', AppItem);
window.customElements.define('app-gallery', AppGallery);
window.customElements.define('app-item-modal', AppItemModal);
window.customElements.define('app-item-shared-checkbox', AppItemSharedCheckbox);
window.customElements.define('app-connections', AppConnections);

document.getElementById('app').innerHTML = `
    <app-login></app-login>
    <app-gallery></app-gallery>
    <app-item-modal></app-item-modal>
    <app-connections></app-connections>
`;