import { IBaseModel } from './baseModel';

export interface IFileAttachment extends IBaseModel {
    readonly label: string;
    readonly fileName: string;
    readonly fileType: string;
    download: () => Promise<void>;
    delete: () => Promise<void>;
}