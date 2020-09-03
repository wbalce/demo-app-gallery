import { EVENT_BUS } from '../services/eventBus';
import { Events } from '../constants/events';
import { AuthData, ConnectionService } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG } from '../services/environmentService';
import { AppItemSharedCheckbox } from './app-item-shared-checkbox';

export class AppConnections extends HTMLElement {
    #connections: any[] = [];

    connectedCallback() {
        EVENT_BUS.register(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }

    async loginHandler(event) {
        const user: AuthData = event.detail;

        this.#connections = await new ConnectionService(ENVIRONMENT_CONFIG).listConnections(user);

        this.render();
    }

    render() {
        this.#connections.forEach(x => {
            const connectionEl = document.createElement('app-item-shared-checkbox') as AppItemSharedCheckbox;
            connectionEl.connection = x;
            this.appendChild(connectionEl);
        });
    }
}