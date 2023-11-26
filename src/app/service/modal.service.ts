import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { PasarelaComponent } from '../pasarela/pasarela.component';
import { filter, take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialogRef: MatDialogRef<PasarelaComponent, any> | undefined;
  private modalClosedSource = new Subject<void>();
  modalClosed$ = this.modalClosedSource.asObservable();

  constructor(public dialog: MatDialog) {}

  openModal(producto: string, precio: number): Observable<void> {
    this.dialogRef = this.dialog.open(PasarelaComponent, {
      width: '400px',
      data: { producto, precio }, 
      // ... otras configuraciones del modal
    });

    // Devolver un observable que se completa solo cuando se ejecuta closeDialog
    return this.modalClosed$.pipe(take(1));
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.afterClosed().pipe(
        // Filtrar para asegurarse de que solo se complete cuando se ejecuta closeDialog
        filter(result => result === 'closedByService'),
        take(1)
      ).subscribe(() => {
        this.modalClosedSource.next();
      });

      this.dialogRef.close('closedByService');
    }
  }
}