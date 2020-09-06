import { Item } from '../../models/item';

export interface IAppAttachmentService {
    upload: (item: Item, label: string, files: FileList) => Promise<any>;
    download: (id: string) => Promise<any>;
}