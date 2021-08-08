export interface ModalOptions {
    presentingElement?: HTMLElement;
    showBackdrop?: boolean;
    backdropDismiss?: boolean;
    cssClass?: string | string[];
    animated?: boolean;
    swipeToClose?: boolean;
    keyboardClose?: boolean;
    id?: string;
  }