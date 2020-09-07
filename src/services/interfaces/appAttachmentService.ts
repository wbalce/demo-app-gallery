import { IFileAttachable } from '../../models/interfaces/fileAttachable';

export interface IAppAttachmentService {
    getAttachmentIds: (fileAttachable: IFileAttachable) => Promise<string[]>;
    upload: (fileAttachable: IFileAttachable, label: string, files: FileList) => Promise<any>;
    download: (id: string) => Promise<any>;
    delete: (fileAttachable: IFileAttachable, id: string) => Promise<any>;
}