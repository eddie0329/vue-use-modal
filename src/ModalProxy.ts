import type {
  IModalProxy,
  ModalExposed,
  AddModalProxyParams,
  CloseModalProxyParams
} from './types/modal-proxy';
import {err} from './utils';

const modalKey = Symbol('modal_key');

export default class ModalProxy implements IModalProxy {
  static modalProxy?: ModalProxy;
  modalExposed?: ModalExposed;

  constructor(key: any) {
    if (key !== modalKey) err(`Invalid construct key ${key}`);
    return this;
  }

  static getInstance(): ModalProxy {
    if (this.modalProxy) return this.modalProxy;
    else {
      this.modalProxy = new ModalProxy(modalKey);
      return this.modalProxy;
    }
  }

  setModalExposed(exposed: ModalExposed): this {
    this.modalExposed = exposed;
    return this;
  }

  addModal<T>(params: AddModalProxyParams) {
    if (typeof window === 'undefined') return;
    return this.modalExposed?.addModal<T>(params);
  }

  closeModal(key: string) {
    if (typeof window === 'undefined') return;
    return this.modalExposed?.closeModal({ key });
  }
}
