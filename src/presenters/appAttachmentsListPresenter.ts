import { isItem } from '../models/item';
import { IView } from '../components/interfaces/view';
import { FileAttachment } from '../models/fileAttachment';

export class AppAttachmentsListPresenter {
    #view: IView<FileAttachment>;

    constructor(view: IView<FileAttachment>) {
        this.#view = view;
    }

    async iconClickedHandler(event: CustomEvent) {
        const result: FileAttachment[] = [];
        const payload = event.detail;
        
        if (isItem(payload)) {
            const itemData = await payload.itemData;

            itemData.attachments.forEach(attachment => {
                const slot = itemData.slots.find(x => x.attachment_ids.includes(attachment.id));

                result.push(new FileAttachment(
                    attachment.id,
                    slot.label,
                    attachment.filename,
                    payload 
                ));
            });
        }

        this.#view.render(result);
    }
}