import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';

export interface WaitingListEntry{
    id: number;
    firstname: string;
    lastname: string;
    dateOfBirth: Date;
    dateOfArrival: Date;
    email: string;
    phoneNumber: string;
    illnessDesc: string;
}
