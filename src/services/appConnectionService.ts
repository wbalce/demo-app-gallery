import { ConnectionService } from '@meeco/sdk';
import { ENVIRONMENT_CONFIG } from './environmentService';
import { AppBaseMeecoService } from './appBaseMeecoService';

export class AppConnectionService extends AppBaseMeecoService {
    async getConnections() {
        return await new ConnectionService(ENVIRONMENT_CONFIG).listConnections(this.user);
    }
}

