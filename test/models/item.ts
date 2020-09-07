import { IAppItemDataService } from '../../src/services/interfaces/appItemDataService';
import { IAppShareService } from '../../src/services/interfaces/appShareService';
import { Item } from '../../src/models/item';
import { expect } from 'chai';
import { rejects } from 'assert';
import { IAppAttachmentService } from '../../src/services/interfaces/appAttachmentService';
import { IFileAttachable } from '../../src/models/interfaces/fileAttachable';
import { IFileAttachment } from '../../src/models/interfaces/fileAttachment';
import { IShareable } from '../../src/models/interfaces/shareable';

class MockShareService implements IAppShareService {
    isItemAlreadyShared: (shareable: IShareable, connectionId: string) => Promise<boolean>;
    shareItem(item: Item, connectionId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 300);   
        });
    }

    unshareItem(item: Item, connectionId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }
}

class MockDataService implements IAppItemDataService {
    #count: number = 0;
    getItem(Item: any): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.#count++;
                resolve(this.#count);
            }, 300);
        });
    }
}

class MockAttachmentService implements IAppAttachmentService {
    getAttachments: (fileAttachable: IFileAttachable) => Promise<IFileAttachment[]>;
    delete: (item: Item, id: string) => Promise<any>;
    upload: (item: Item, label: string, files: FileList) => Promise<any>;
    download: (id: string) => Promise<any>;
}

describe('item', () => {
    it('should cache item data', async () => {
        const item = new Item('0', new MockShareService(), new MockDataService(), new MockAttachmentService());

        const itemData1: number = await item.itemData;
        const itemData2: number = await item.itemData;

        expect(itemData1).equal(itemData2);
    });

    it('should retrieve new item data if shared', async () => {
        const item = new Item('0', new MockShareService(), new MockDataService(), new MockAttachmentService());

        const itemData1: number = await item.itemData;
        await item.share('0');
        const itemData2: number = await item.itemData;

        expect(itemData1).lessThan(itemData2);
    });

    it('should retrieve new item data if unshared', async () => {
        const item = new Item('0', new MockShareService(), new MockDataService(), new MockAttachmentService());

        const itemData1: number = await item.itemData;
        await item.unshare('0');
        const itemData2: number = await item.itemData;

        expect(itemData1).lessThan(itemData2);
    });
});