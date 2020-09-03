import { AuthData } from '@meeco/sdk';

export abstract class AppBaseMeecoService {
    #user: AuthData;

    constructor(user: AuthData) {
        this.#user = user;
    }

    get user() {
        return this.#user;
    }
} 