import { IAppItemDataService } from '../../src/services/appItemDataService';
import { IAppShareService } from '../../src/services/appShareService';
import { Item } from '../../src/models/item';
import { expect } from 'chai';
import { rejects } from 'assert';

class MockShareService implements IAppShareService {
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

describe('item', () => {
    it('should share to connected user', async () => {
       

    });

    it('should cache item data', async () => {
        const item = new Item('0', new MockShareService(), new MockDataService());

        const itemData1: number = await item.itemData;
        const itemData2: number = await item.itemData;

        expect(itemData1).equal(itemData2);
    });

    it('should retrieve new item data if shared', async () => {
        const item = new Item('0', new MockShareService(), new MockDataService());

        const itemData1: number = await item.itemData;
        await item.share('0');
        const itemData2: number = await item.itemData;

        expect(itemData1).lessThan(itemData2);
    });

    it('should retrieve new item data if unshared', async () => {
        const item = new Item('0', new MockShareService(), new MockDataService());

        const itemData1: number = await item.itemData;
        await item.unshare('0');
        const itemData2: number = await item.itemData;

        expect(itemData1).lessThan(itemData2);
    });
});