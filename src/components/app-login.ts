import { UserService } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG } from '../services/environmentService';
import { EVENT_BUS } from '../services/eventBus';
import { Events } from '../constants/events';

export class AppLogin extends HTMLElement {
    connectedCallback() {
        this.render();
        this.firstElementChild.addEventListener('click', this.clickHandler.bind(this));
        EVENT_BUS.register(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }

    getAuthData(password: string, secret: string): Promise<any> {
        return new UserService(ENVIRONMENT_CONFIG).get(password, secret);
    }

    async clickHandler(event) {
        event.preventDefault();
        if (event.target.tagName !== 'BUTTON') return;

        const buttonEl = this.querySelector('button');
        buttonEl.classList.add('disabled');

        try {
            const form = this.firstElementChild as HTMLFormElement;
            const user = await this.getAuthData(form.elements['password'].value, form.elements['secret'].value);
            EVENT_BUS.fire(Events.LOGIN_SUCCESSFUL, user);
        } catch (e) {
            console.error(e);
            EVENT_BUS.fire(Events.LOGIN_FAILED);
        }

        buttonEl.classList.remove('disabled');
    }

    loginHandler() {
        this.classList.add('hidden');
    }

    render() {
        this.innerHTML = `
            <form>
                <label>
                    Password
                    <input id="password" type="text"/>
                </label>
                <label>
                    Secret
                    <input id="secret" type="text"/>
                </label>
                <button>Login</button>
            </form>
        `;
    }

    disconnectedCallback() {
        EVENT_BUS.remove(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
        this.firstElementChild.removeEventListener('click', this.clickHandler.bind(this));
    }
}