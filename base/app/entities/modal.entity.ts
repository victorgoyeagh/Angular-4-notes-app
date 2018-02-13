import { register } from 'ts-node/dist';
import { MiscUtil } from './../helpers/MiscUtils';

export class ModalInfo {
    ModalTitle: string;
    ModalBody: string;
    ModalCommand: ModalCommand;
    ModalType: ModalType;
    ModalConfirmText: string;
    ModalCancelText: string;
    ModalValue: any;
    ModalKey: string;
    ModalFormType: ModalFormType;
    Random?: number;
    ModalDimensions?: IDimensions;
    ModalLocation?: ModalLocation;
    ModalShowCloseButton?: boolean;

    constructor(
        _modalTitle: string,
        _modalBody: string,
        _modalCommand: ModalCommand,
        _modalType: ModalType,
        _modalConfirmText?: string,
        _modalCancelText?: string,
        _modalValue?: any,
        _modalFormType?: ModalFormType,
        _modalKey?: string,
        _dimensions?: IDimensions,
        _modalLocation?: ModalLocation,
        _modalShowCloseButton?: boolean
    ) {
        this.ModalTitle = _modalTitle;
        this.ModalBody = _modalBody;
        this.ModalCommand = _modalCommand;
        this.ModalType = _modalType;
        this.ModalConfirmText = _modalConfirmText;
        this.ModalCancelText = _modalCancelText;
        this.ModalValue = ((_modalValue) ? _modalValue : undefined);
        this.ModalKey = ((_modalKey) ? _modalKey : 'modal');
        this.ModalFormType = _modalFormType;
        this.Random = MiscUtil.GetRandomNumber();
        this.ModalDimensions = (_dimensions) ? _dimensions : undefined;
        this.ModalLocation = (_modalLocation) ? _modalLocation : undefined;
        this.ModalShowCloseButton = (_modalShowCloseButton) ? _modalShowCloseButton : undefined;
    }
}

export enum ModalFormType {
    Default
}

export enum ModalCommand {
    Open = 1,
    Close = 2,
    Notify = 3
}

export enum ModalType {
    Alert = 1,
    Confirm = 2,
    None = 3
}

export enum ModalLocation {
    Center = <any>'center',
    Right = <any>'right',
    Left = <any>'left'
}

export interface IDimensions {
    Width,
    Height
}

export interface IModalReturnValue {
    ModalKey: string,
    ModalResponse: boolean,
    ModalValue: any,
    ModalFormValue: any,
    random: number
}
