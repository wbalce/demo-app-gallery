import { AppItemSharedCheckbox } from './app-item-shared-checkbox';
import { IView } from './interfaces/view';
import { Events } from '../constants/events';
import { ConnectionAndUserIdPair, AppConnectionsPresenter } from '../presenters/appConnectionsPresenter';
import { EVENT_BUS } from '../services/eventBus';

export class AppConnections extends HTMLElement implements IView<ConnectionAndUserIdPair> {
    #presenter: AppConnectionsPresenter;

    connectedCallback() {
        this.#presenter = new AppConnectionsPresenter(this);
        EVENT_BUS.register(Events.LOGIN_SUCCESSFUL, this.#presenter.loginHandler.bind(this.#presenter))
    }

    render(connectionAndUserIdPairs: ConnectionAndUserIdPair[]) {
        connectionAndUserIdPairs.forEach(x => {
            const connectionEl = document.createElement('app-item-shared-checkbox') as AppItemSharedCheckbox;
            connectionEl.connectionId = x.connectionId;
            connectionEl.userId = x.userId;
            this.appendChild(connectionEl);
        });
    }

   disconnectedCallback() {
        EVENT_BUS.remove(Events.LOGIN_SUCCESSFUL, this.#presenter.loginHandler.bind(this.#presenter)) 
   } 
}