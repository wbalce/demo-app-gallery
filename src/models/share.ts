import { IItemDataRetrievable } from './interfaces/itemDataRetrievable';
import { IAppItemDataService } from '../services/interfaces/appItemDataService';

export class Share implements IItemDataRetrievable {
    readonly id: string;
    #itemDataService: IAppItemDataService;
    #itemData: any;

    constructor(id: string, itemDataService: IAppItemDataService) {
        this.id = id;
        this.#itemDataService = itemDataService;
    }

    get itemData() {
        return (async () => {
            return await this.retrieveItemData();
        })();
    }

    async retrieveItemData() {
        if (!this.#itemData) {
            this.#itemData = await this.#itemDataService.getItem(this);
        }
        return this.#itemData;
    }
}