export interface IFileAttachable {
    uploadAttachment: (label: string, files: FileList) => Promise<any>;
    downloadAttachment: (attachmentId: string) => Promise<any>;
}