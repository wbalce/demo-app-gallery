import { ItemService } from '@meeco/sdk';
import { ItemResponse } from '@meeco/vault-api-sdk';
import { AppBaseMeecoService } from './appBaseMeecoService';
import { ENVIRONMENT_CONFIG } from './environmentService';
import { IAppAttachmentService } from './interfaces/appAttachmentService';
import { IFileAttachable } from '../models/interfaces/fileAttachable';
import { IItemDataRetrievable } from '../models/interfaces/itemDataRetrievable';
import { FileAttachment } from '../models/fileAttachment';
import { IFileAttachment } from '../models/interfaces/fileAttachment';

type fileAttachmentData = {
    itemId: string,
    label: string,
    fileName: string,
    fileType: string,
    file: ArrayBuffer
}

const getArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            resolve(fileReader.result as ArrayBuffer);
        }
        fileReader.readAsArrayBuffer(file);
    });
}

const buildFileAttachmentConfigs = async (itemId: string, label: string, files: FileList): Promise<fileAttachmentData[]> => {
    const result: fileAttachmentData[] = []; 

    for (let i=0; i<files.length; i++) {
        const file = files[i] as File;
        const arrayBuffer = await getArrayBuffer(file);        
        result.push({
            itemId: itemId,
            label: label,
            fileName: file.name,
            fileType: file.type,
            file: arrayBuffer
        });
    }

    return result;
}

export class AppAttachmentService extends AppBaseMeecoService implements IAppAttachmentService {
    async getAttachments(item: IFileAttachable & IItemDataRetrievable) {
        const result: FileAttachment[] = [];
        const itemData = await item.retrieveItemData();

        itemData.attachments.forEach(attachment => {
            const slot = itemData.slots.find(x => x.attachment_ids.includes(attachment.id));

            result.push(new FileAttachment(
                attachment.id,
                slot.label,
                attachment.content_type,
                attachment.filename,
                item
            ));
        });

        return result;
    }

    async upload(item: IFileAttachable, label: string, files: FileList): Promise<ItemResponse[]>{
        const result: ItemResponse[] = [];
        const data = await buildFileAttachmentConfigs(item.id, label, files);
        const itemService = new ItemService(ENVIRONMENT_CONFIG);

        for (let i=0; i<data.length; i++) {
            const itemResponse = await itemService.attachFile(data[i], this.user);
            result.push(itemResponse);
        }

        return result;
    }

    async download(attachment: IFileAttachment) {
        const result = await new ItemService(ENVIRONMENT_CONFIG).downloadAttachment(attachment.id, this.user.vault_access_token, this.user.data_encryption_key);
        const blob: Blob = new Blob([result], {type: attachment.fileType});
        const fileName: string = attachment.fileName;
        const objectUrl: string = URL.createObjectURL(blob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
    
        a.href = objectUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();        
    
        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);

    }

    async delete(item: IFileAttachable & IItemDataRetrievable, attachmentId: string) {
        const itemData = await item.retrieveItemData();
        const attachmentSlot = itemData.slots.find(slot => slot.attachment_ids.find(x => x === attachmentId));
        return await new ItemService(ENVIRONMENT_CONFIG).removeSlot(attachmentSlot.id, this.user.vault_access_token);
    }
}
