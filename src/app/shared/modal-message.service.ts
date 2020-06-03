import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalMessageService {
  message: string;
  currentModal: MatDialogRef<ConfirmModalComponent>;
  constructor(private dialog: MatDialog) {
    //this.service.currentMessage.subscribe(message => this.message = message)
  }

  buildDeleteConfirmationModal(titulo: string, mensagem: string) {
    this.currentModal = this.dialog.open(ConfirmModalComponent, {
      width: "250px",
      data: {
        titulo: "Apagar " + titulo,
        mensagem: mensagem, //'Tem certeza que deseja apagar? Esta ação não poderá ser desfeita',
        msgCancel: "Cancelar",
        msgConfirm: "Confirmar",
      },
    });
  }

  deleteConfirmationModal(titulo: string) {
    this.currentModal = this.dialog.open(ConfirmModalComponent, {
      width: "250px",
      data: {
        titulo: "Apagar " + titulo,
        mensagem: 'Tem certeza que deseja apagar? Esta ação não poderá ser desfeita',
        msgCancel: "Cancelar",
        msgConfirm: "Confirmar",
      },
    });
  }

  getModal() {
    return this.currentModal;
  }

  confirmado() {
    return this.currentModal.componentInstance.data.acao;
  }
}
