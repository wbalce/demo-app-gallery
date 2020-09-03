import { IShareable } from './interfaces/shareable';
import { IItemDataRetrievable } from './interfaces/itemDataRetrievable';
import { IAppShareService } from '../services/interfaces/appShareService';
import { IAppItemDataService } from '../services/interfaces/appItemDataService';

export class Item implements IShareable, IItemDataRetrievable {
    readonly id: string;
    #itemData: any;
    #isItemDataDirty: boolean;
    #dataService: IAppItemDataService;
    #shareService: IAppShareService;

    constructor(id: string, shareService: IAppShareService, dataService: IAppItemDataService) {
        this.id = id;
        this.#dataService = dataService;
        this.#shareService = shareService;
    }

    get itemData() {
        return (async () => {
            return await this.retrieveItemData();
        })();
    }

    async retrieveItemData() {
        if (this.#isItemDataDirty || !this.#itemData) {
            this.#itemData = await this.#dataService.getItem(this);
        }
        this.#isItemDataDirty = false;
        return this.#itemData;
    }

    async share(connectionId: string) {
        await this.#shareService.shareItem(this, connectionId);
        this.#isItemDataDirty = true;
    }

    async unshare(connectionId: string) {
        await this.#shareService.unshareItem(this, connectionId);
        this.#isItemDataDirty = true;
    }
}