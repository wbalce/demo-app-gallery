import { Environment } from '@meeco/sdk';

export const ENVIRONMENT_CONFIG = new Environment({ 
    vault: {
        url: 'http://localhost:3000',
        subscription_key: '',
    },
    keystore: {
        url: 'http://localhost:4000',
        subscription_key: '',
        provider_api_key: '',
    }
});