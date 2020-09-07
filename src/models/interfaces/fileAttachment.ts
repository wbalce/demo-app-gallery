import { IBaseModel } from './baseModel';

export interface IFileAttachment extends IBaseModel {
    readonly label: string;
    readonly fileName: string;
    download: () => Promise<void>;
    delete: () => Promise<void>;
}