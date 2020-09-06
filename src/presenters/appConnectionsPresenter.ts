import { AuthData } from '@meeco/sdk';
import { AppConnectionService } from '../services/appConnectionService';
import { IView } from '../components/interfaces/view';

export type ConnectionAndUserIdPair = {
    connectionId: string,
    userId: string
}

export class AppConnectionsPresenter {
    #view: IView<ConnectionAndUserIdPair>;

    constructor(view: IView<ConnectionAndUserIdPair>) {
        this.#view = view;
    }

    async loginHandler(event: CustomEvent) {
        const result: ConnectionAndUserIdPair[] = [];
        const user = event.detail as AuthData;
        const connections = await new AppConnectionService(user).getConnections();

        connections.forEach(x => {
            result.push({
                connectionId: x.connection.id,
                userId: x.connection.user_id 
            });
        });
    
        this.#view.render(result)
    }
}