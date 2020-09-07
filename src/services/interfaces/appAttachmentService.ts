import { IFileAttachable } from '../../models/interfaces/fileAttachable';
import { IFileAttachment } from '../../models/interfaces/fileAttachment';

export interface IAppAttachmentService {
    getAttachments: (fileAttachable: IFileAttachable) => Promise<IFileAttachment[]>;
    upload: (fileAttachable: IFileAttachable, label: string, files: FileList) => Promise<any>;
    download: (id: string) => Promise<any>;
    delete: (fileAttachable: IFileAttachable, id: string) => Promise<any>;
}