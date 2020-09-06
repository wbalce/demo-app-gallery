import { Events } from '../constants/events';
import { EVENT_BUS } from '../services/eventBus';
import { ENVIRONMENT_CONFIG } from '../services/environmentService';
import { UserService } from '@meeco/sdk';

export class AppLoginPresenter {
    getAuthData(password: string, secret: string): Promise<any> {
        return new UserService(ENVIRONMENT_CONFIG).get(password, secret);
    }

    async login(password, secret) {
        EVENT_BUS.fire(Events.LOGIN_OP_STARTED);

        try {
            const user = await this.getAuthData(password, secret);
            EVENT_BUS.fire(Events.LOGIN_SUCCESSFUL, user);
        } catch (e) {
            console.error(e);
            EVENT_BUS.fire(Events.LOGIN_FAILED);
        }

        EVENT_BUS.fire(Events.LOGIN_OP_ENDED);
    }
}