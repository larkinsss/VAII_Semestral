import { PnForm } from 'src/app/model/pnForm';
import { Patient } from "./patient";

export class Attachment {
    id: string;
    data: Blob;
    name:string;
    type:string;
    patient: string;
    pnForm: string;
}