import { UserService } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG, STATE } from '../services/environmentService';
import eventBus from '../services/eventBus';
import { Events } from '../constants/events';

export class AppLogin extends HTMLElement {
    async connectedCallback() {
        this.render();
        this.firstElementChild.addEventListener('click', this.clickHandler.bind(this));
        eventBus.register(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
    }

    async getAuthData(password: string, secret: string) {
        return await new UserService(ENVIRONMENT_CONFIG).get(password, secret);
    }

    async clickHandler(event) {
        event.preventDefault();
        if (event.target.tagName !== 'BUTTON') return;

        try {
            const form = this.firstElementChild as HTMLFormElement;
            const user = await this.getAuthData(form.elements['password'].value, form.elements['secret'].value);
            STATE.user = user;
            eventBus.fire(Events.LOGIN_SUCCESSFUL, user);
        } catch (e) {
            console.error(e);
            eventBus.fire(Events.LOGIN_FAILED);
        }
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
        eventBus.remove(Events.LOGIN_SUCCESSFUL, this.loginHandler.bind(this));
        this.firstElementChild.removeEventListener('click', this.clickHandler.bind(this));
    }
}