import { IBaseModel } from './baseModel';
import { IFileAttachment } from './fileAttachment';

export const isIFileAttachable = (candidate: IBaseModel): candidate is IFileAttachable => {
    return ((<IFileAttachable>candidate).getAttachments) !== undefined;
}

export interface IFileAttachable extends IBaseModel {
    getAttachments: () => Promise<IFileAttachment[]>;
    uploadAttachment: (label: string, files: FileList) => Promise<any>;
    downloadAttachment: (fileAttachment: IFileAttachment) => Promise<any>;
    deleteAttachment: (attachmentId: string) => Promise<any>;
}