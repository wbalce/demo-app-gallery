import { IBaseModel } from './baseModel';

export interface IFileAttachable extends IBaseModel {
    getAttachmentIds: () => Promise<string[]>;
    uploadAttachment: (label: string, files: FileList) => Promise<any>;
    downloadAttachment: (attachmentId: string) => Promise<any>;
    deleteAttachment: (attachmentId: string) => Promise<any>;
}