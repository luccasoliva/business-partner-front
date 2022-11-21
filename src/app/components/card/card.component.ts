import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { newCard } from 'src/app/interfaces/newCard';
import { card } from '../../interfaces/card';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  allCards?: Observable<card[]>;
  selectedTrace!: card;
  gridColumns = 3;
  avatarPreview: string = '';
  foto!: File;

  newCardForm: FormGroup = this.fb.group({
    CardName: ['', Validators.required],
    avatar: ['', Validators.required],
    Address: ['', Validators.required],
    ZipCode: ['', Validators.required],
  });

  cardForm: FormGroup = this.fb.group({
    CardName: ['', Validators.required],
    avatar: ['', Validators.required],
    Address: [{value: '', disabled: true }],
    ZipCode: [{value: '', disabled: true }],
  });

  @ViewChild('newCardDialog')
  newCardDialog!: TemplateRef<any>;

  @ViewChild('editCardDialog')
  editCardDialog!: TemplateRef<any>;

  @ViewChild('deleteCardDialog')
  deleteCardDialog!: TemplateRef<any>;

  constructor(
    private cardService: CardService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //reverse
    this.allCards = this.cardService.getAllCards();
  }

  public saveNewCard(): void {
    this.dialog.closeAll();
    const newCard: newCard = {

      CardName: this.newCardForm.value.CardName,
      avatar: this.newCardForm.value.avatar,
      Address: this.newCardForm.value.Address,
      ZipCode: this.newCardForm.value.ZipCode,
    };
      this.cardService.createCard(newCard, this.foto);

  }


  public deleteCard(selectedTrace: card): void {

    this.dialog.closeAll();
    this.cardService.deleteCard(selectedTrace).subscribe(
      (data) => {
        this.closeDialog();
        this.allCards = this.cardService.getAllCards();
        this.snackBar.open('The Card was successfully deleted', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      (err) => {
        this.closeDialog();
        this.allCards = this.cardService.getAllCards();
        this.snackBar.open('An error occurred. Please try again later.', 'OK', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });

      }
    );
  }
  public updateCard(): void {
    this.dialog.closeAll();
    this.selectedTrace.CardName = this.cardForm.value.CardName;
    this.cardService.updateCard(this.selectedTrace).subscribe(
      (data) => {
        this.allCards = this.cardService.getAllCards();
        this.snackBar.open('The Card was successfully updated', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }, (err) => {
        this.allCards = this.cardService.getAllCards();
        this.snackBar.open('An error occurred. Please try again later.', 'OK', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  public getAvatar(event: any): void {
    this.foto = event.target.files[0];
    this.loadPreview();
  }

  public loadPreview(): void {
    const reader = new FileReader();

    reader.readAsDataURL(this.foto);

    reader.onload = () => {
      this.avatarPreview = reader.result as string;
    };
  }

  public selectCard(card: card): void {
    this.selectedTrace = card;
  }

  public OpenNewCardDialog(): void {
    this.avatarPreview = '';
    this.dialog.open(this.newCardDialog);
  }
  public openDeleteCargoDialog(card: card): void {
    this.selectCard(card);
    this.dialog.open(this.deleteCardDialog);
  }
  public openEditCargoDialog(card: card): void {
    this.cardForm.setValue({
      CardName: card.CardName,
      avatar: card.avatar,
      Address: card.Address,
      ZipCode: card.ZipCode,
    });

    this.selectCard(card);
    this.avatarPreview = card.avatar;
    this.dialog.open(this.editCardDialog);
  }

  public closeDialog(){
    this.dialog.closeAll();
  }
}
