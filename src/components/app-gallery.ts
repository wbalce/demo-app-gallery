import { Events } from '../constants/events';
import { AppIcon } from './app-icon';
import { IView } from './interfaces/view';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { AppGalleryPresenter } from '../presenters/appGalleryPresenter';
import { EVENT_BUS } from '../services/eventBus';

export class AppGallery extends HTMLElement implements IView<IItemDataRetrievable> {
    #presenter: AppGalleryPresenter;

    connectedCallback() {
        this.#presenter = new AppGalleryPresenter(this);
        EVENT_BUS.register(Events.LOGIN_SUCCESSFUL, this.#presenter.galleryLoginHandler.bind(this.#presenter));
        this.classList.add('hidden');
    }

    render(items: IItemDataRetrievable[]) {
        items.forEach(x => {
            const itemEl = document.createElement('app-icon') as AppIcon;
            itemEl.itemDataRetreivable = x;
            this.appendChild(itemEl);
        })

        this.classList.remove('hidden');
    }

    disconnectedCallback() {
        EVENT_BUS.remove(Events.LOGIN_SUCCESSFUL, this.#presenter.galleryLoginHandler.bind(this.#presenter));
    }
}