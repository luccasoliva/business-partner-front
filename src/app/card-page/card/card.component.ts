import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { card } from '../interfaces/card';
import { CardService } from '../services/card.service';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  allCards?: Observable<card[]>;
  selectedTrace!: card;
  avatarPreview: string = '';
  foto!: File;

  newCardForm: FormGroup = this.fb.group({
    avatar: ['', Validators.required],
    cardName: ['', Validators.required],
    address: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', Validators.required],
    description: ['', Validators.required],
  });

  cardForm: FormGroup = this.fb.group({
    avatar: ['', Validators.required],
    cardName: ['', Validators.required],
    address: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', Validators.required],
    description: ['', Validators.required],
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
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    //reverse
    this.allCards = this.cardService.getAllCards();
  }

  public saveNewCard(): void {
    this.dialog.closeAll();
    const newCard: card = this.newCardForm.value;
    this.cardService.createCard(newCard, this.foto);
    console.log(this.newCardForm.value);
    this.ngOnInit();
  }


  async deleteCard(selectedTrace: card): Promise<void> {
    this.dialog.closeAll();
    this.cardService.deleteCard(selectedTrace).subscribe({
      next: () => {
        this.ngOnInit();
        this.snackBar.open('Card deletado com Sucesso!!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      error: () => this.snackBar.open('Um erro ocorreu. Por favor, tente novamente mais tarde.', 'OK', {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['error-snackbar'],
      })
    });
  }


  public updateCard(): void {
    this.dialog.closeAll();
    this.selectedTrace.cardName = this.cardForm.value.cardName;
    this.cardService.updateCard(this.selectedTrace).subscribe({
      next: () => {
        this.allCards = this.cardService.getAllCards();
        this.snackBar.open('O Card foi atualizado com Sucesso!!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      error: () => {
        this.allCards = this.cardService.getAllCards();
        this.snackBar.open('Um erro ocorreu. Por favor, tente novamente mais tarde.', 'OK', {
          duration: 4000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      }
    });
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

  OpenNewCardDialog(): void {
    this.avatarPreview = '';
    this.dialog.open(this.newCardDialog);
   }
  public openDeleteCargoDialog(card: card): void {
    this.selectCard(card);
    this.dialog.open(this.deleteCardDialog);
  }

  public openEditCargoDialog(card: card): void {
    this.cardForm.setValue({
      cardName: card.cardName,
      avatar: card.avatar,
      address: card.address,
      tel: card.tel,
      email: card.email,
      description: card.description
    });

    this.selectCard(card);
    this.avatarPreview = card.avatar;
    this.dialog.open(this.editCardDialog);
  }

  public closeDialog(){
    this.dialog.closeAll();
  }

  logout() {
    this.authService.logout();
  }
}
