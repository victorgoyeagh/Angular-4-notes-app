import { Injectable } from "@angular/core";
import { ModalInfo } from './../entities/modal.entity';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CommunicationService {

    constructor(){
    }

    public sharedModalInfoData: Subject<any> = new Subject<any>();
    public ShareModalInfoData(value: any){
        this.sharedModalInfoData.next(value);
    }

    public sharedModalResponseData: Subject<any> = new Subject<any>();
    public ShareModalResponseData(value: any){
        this.sharedModalResponseData.next(value);
    }

    public sharedModalIsOpenState: Subject<boolean> = new Subject<boolean>();
    public ShareModalIsOpenState(value: boolean){
        this.sharedModalIsOpenState.next(value);
    }

}