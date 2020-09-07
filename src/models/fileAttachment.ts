import { IBaseModel } from './interfaces/baseModel';
import { IFileAttachable } from './interfaces/fileAttachable';

export class FileAttachment implements IBaseModel {
    readonly id: string;
    #label: string;
    #fileName: string;
    #fileAttachableOwner: IFileAttachable;
    #isDeleted: boolean;

    constructor(id: string, label: string, fileName: string, fileAttachableOwner: IFileAttachable) {
        this.id = id;
        this.#label = label;
        this.#fileName = fileName;
        this.#fileAttachableOwner = fileAttachableOwner;
        this.#isDeleted = false;
    }

    get fileName() {
        return this.#fileName;
    }

    get label() {
        return this.#label;
    }

    async download() {
        if (!this.#isDeleted) {
            await this.#fileAttachableOwner.downloadAttachment(this.id);
        }
    }

    async delete() {
        await this.#fileAttachableOwner.deleteAttachment(this.id);
        this.#isDeleted = true;
    }
}