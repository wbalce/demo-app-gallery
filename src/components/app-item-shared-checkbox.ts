import { Events } from '../constants/events';
import { AppItemSharedCheckboxData, AppItemSharedCheckboxPresenter } from '../presenters/appItemSharedCheckboxPresenter';
import { EVENT_BUS } from '../services/eventBus';
import { IView } from './interfaces/view';

enum CheckboxAccessability {
    ENABLED,
    DISABLED
}

export class AppItemSharedCheckbox extends HTMLElement implements IView<AppItemSharedCheckboxData> {
    #presenter: AppItemSharedCheckboxPresenter;
    #connectionId: string;
    #userId: string;

    connectedCallback() {
        this.#presenter = new AppItemSharedCheckboxPresenter(this, this.#connectionId, this.#userId);
        EVENT_BUS.register(Events.ICON_CLICKED, this.#presenter.itemChosenHandler.bind(this.#presenter));
        EVENT_BUS.register(Events.SHARE_CLICKED, this.#presenter.shareChosenHandler.bind(this.#presenter));
        EVENT_BUS.register(Events.SHARE_OP_STARTED, this.disableCheckboxes.bind(this));
        EVENT_BUS.register(Events.SHARE_OP_ENDED, this.enableCheckboxes.bind(this));
    }

    set connectionId(value: string) {
        this.#connectionId = value;       
    }

    set userId(value: string) {
        this.#userId = value;
    }

    enableCheckboxes() {
        this.toggleCheckboxes(CheckboxAccessability.ENABLED);   
    }

    disableCheckboxes() {
        this.toggleCheckboxes(CheckboxAccessability.DISABLED);
    }

    toggleCheckboxes(toggle: CheckboxAccessability) {
        const checkBoxes = this.querySelectorAll('input');
        checkBoxes.forEach(x => {
            x.disabled = CheckboxAccessability.DISABLED === toggle;
        });
    }

    render(data: AppItemSharedCheckboxData[]) {
        // Remove child nodes along with its event listener
        while (this.firstChild) {
            this.removeChild(this.firstChild);
        }

        data.forEach(x => {
            const label = document.createElement('label');
            label.innerText = x.userId;
            label.addEventListener('click', this.#presenter.clickHandler.bind(this.#presenter));

            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox');
            if (x.isItemChosenShared) {
                input.setAttribute('checked', 'checked');
            }

            label.appendChild(input);
            this.appendChild(label);
        });
    }

    disconnectedCallback() {
        EVENT_BUS.remove(Events.ICON_CLICKED, this.#presenter.itemChosenHandler.bind(this.#presenter));
        EVENT_BUS.remove(Events.SHARE_CLICKED, this.#presenter.shareChosenHandler.bind(this.#presenter));
        EVENT_BUS.remove(Events.SHARE_OP_STARTED, this.disableCheckboxes.bind(this));
        EVENT_BUS.register(Events.SHARE_OP_ENDED, this.enableCheckboxes.bind(this));
    }
}