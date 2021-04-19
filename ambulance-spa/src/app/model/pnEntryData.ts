import { Attachment } from './attachment';
import { PnForm } from 'src/app/model/pnForm';
import { Patient } from "./patient";

export class PnEntryData {
    patient: Patient;
    pnForm: PnForm;
    attachments: Attachment[];
}
