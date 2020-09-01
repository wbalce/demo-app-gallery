import { IAppShareService } from '../services/appShareService';
import { IAppItemDataService } from '../services/appItemDataService';

export class Item {
    #id: string; // Could be Item Id or Share Id
    #itemData: any;
    #isItemDataUpdated: boolean;
    #dataService: IAppItemDataService;
    #shareService: IAppShareService;

    constructor(id: string, shareService: IAppShareService, dataService: IAppItemDataService) {
        this.#id = id;
        this.#dataService = dataService;
        this.#shareService = shareService;
    }

    get id() {
        return this.#id;
    }

    get itemData() {
        return (async () => {
            if (this.#isItemDataUpdated || !this.#itemData) {
                this.#itemData = await this.#dataService.getItem(this);
            }
            return this.#itemData;
        })();
    }

    async share(connectionId: string) {
        await this.#shareService.shareItem(this, connectionId);
        this.#isItemDataUpdated = true;
    }

    async unshare(connectionId: string) {
        await this.#shareService.unshareItem(this, connectionId);
        this.#isItemDataUpdated = true;
    }
}