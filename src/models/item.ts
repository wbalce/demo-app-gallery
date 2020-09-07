import { IShareable } from './interfaces/shareable';
import { IFileAttachable } from './interfaces/fileAttachable';
import { IItemDataRetrievable } from './interfaces/itemDataRetrievable';
import { IAppItemDataService } from '../services/interfaces/appItemDataService';
import { IAppShareService } from '../services/interfaces/appShareService';
import { IAppAttachmentService } from '../services/interfaces/appAttachmentService';

export const isItem = (it: IItemDataRetrievable): it is Item => {
    return ((<Item>it).share) !== undefined;
}

export class Item implements IShareable, IItemDataRetrievable, IFileAttachable {
    readonly id: string;
    #itemData: any;
    #isItemDataDirty: boolean;
    #dataService: IAppItemDataService;
    #shareService: IAppShareService;
    #attachmentService: IAppAttachmentService;
    #attachmentIds: string[];

    constructor(id: string, shareService: IAppShareService, dataService: IAppItemDataService, attachmentService: IAppAttachmentService) {
        this.id = id;
        this.#dataService = dataService;
        this.#shareService = shareService;
        this.#attachmentService = attachmentService;
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

    async getAttachmentIds() {
        return (async () => {
            return await this.retrieveAttachmentIds();
        })();
    }

    private async retrieveAttachmentIds() {
        if (this.#isItemDataDirty || !this.#attachmentIds) {
            this.#attachmentIds = await this.#attachmentService.getAttachmentIds(this);
        }
        return this.#attachmentIds;
    }

    async uploadAttachment(label: string, files: FileList) {
        await this.#attachmentService.upload(this, label, files);
        this.#isItemDataDirty = true;
    }

    async downloadAttachment(attachmentId: string) {
        const result = await this.#attachmentService.download(attachmentId); 
        debugger;
    }

    async deleteAttachment(attachmentId: string) {
        await this.#attachmentService.delete(this, attachmentId);
        this.#isItemDataDirty = true;
    }
}