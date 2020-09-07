import { IFileAttachable } from './interfaces/fileAttachable';
import { IFileAttachment } from './interfaces/fileAttachment';

export class FileAttachment implements IFileAttachment {
    readonly id: string;
    readonly label: string;
    readonly fileName: string;
    #fileAttachableOwner: IFileAttachable;
    #isDeleted: boolean;

    constructor(id: string, label: string, fileName: string, fileAttachableOwner: IFileAttachable) {
        this.id = id;
        this.label = label;
        this.fileName = fileName;
        this.#fileAttachableOwner = fileAttachableOwner;
        this.#isDeleted = false;
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