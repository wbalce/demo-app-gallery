import { Events } from '../constants/events';
import { AppLoginPresenter } from '../presenters/appLoginPresenter';
import { EVENT_BUS } from '../services/eventBus';

export class AppLogin extends HTMLElement {
    #presenter: AppLoginPresenter;

    connectedCallback() {
        this.#presenter = new AppLoginPresenter();
        this.render();
        this.firstElementChild.addEventListener('click', this.clickHandler.bind(this));
        EVENT_BUS.register(Events.LOGIN_SUCCESSFUL, this.loginSuccessfulHandler.bind(this));
        EVENT_BUS.register(Events.LOGIN_OP_STARTED, this.disableButton.bind(this));
        EVENT_BUS.register(Events.LOGIN_OP_ENDED, this.enableButton.bind(this));
    }

    enableButton() {
        const buttonEl = this.querySelector('button');
        buttonEl.classList.remove('disabled');
    }

    disableButton() {
        const buttonEl = this.querySelector('button');
        buttonEl.classList.add('disabled');
    }

    async clickHandler(event) {
        event.preventDefault();
        if (event.target.tagName !== 'BUTTON') return;

        const form = this.firstElementChild as HTMLFormElement; 
        const password = form.elements['password'].value;
        const secret = form.elements['secret'].value;
        this.#presenter.login(password, secret);      
    }

    loginSuccessfulHandler() {
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
        EVENT_BUS.remove(Events.LOGIN_SUCCESSFUL, this.loginSuccessfulHandler.bind(this));
        this.firstElementChild.removeEventListener('click', this.clickHandler.bind(this));
        EVENT_BUS.remove(Events.LOGIN_OP_STARTED, this.disableButton.bind(this));
        EVENT_BUS.remove(Events.LOGIN_OP_ENDED, this.enableButton.bind(this));
    }
}