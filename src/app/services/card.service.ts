import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { card } from '../interfaces/card';
import { newCard } from '../interfaces/newCard';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class CardService {
  private url = 'https://verdant-bruin-370422.rj.r.appspot.com/api/v1/card';

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar,
  ) {}

  public getAllCards(): Observable<card[]> {
    return this.http.get<card[]>(`${this.url}`);
  }

  public getCardById(id: number): Observable<card> {
    return this.http.get<card>(`${this.url}/${id}`);
  }

  public updateCard(card: card): Observable<card> {
    return this.http.put<card>(`${this.url}/${card.CardCode}`, card);
  }

  public deleteCard(card: card): Observable<void> {
    if (card.avatar.includes('firebasestorage')) {
      const ref = this.storage.refFromURL(card.avatar);
      ref.delete();
      return this.http.delete<void>(`${this.url}/${card.CardCode}`);
    }else{
      return this.http.delete<void>(`${this.url}/${card.CardCode}`);
    }
  }

  public createCard(newCard: newCard, avatar: File) {
    this.uploadAvatar(avatar).then((url) => {
      newCard.avatar = url;

      this.http.post<newCard>(`${this.url}`, newCard).subscribe(
        (newCard) => {

          this.snackbar.open('Card created successfully!', 'OK', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          }).afterDismissed().subscribe(() => {
            window.location.reload();
          });
        },
        (err) => {
          this.snackbar.open(
            'An error occurred. Please try again later.',
            'OK',
            {
              duration: 4000,
              verticalPosition: 'top',
              panelClass: ['error-snackbar'],
            }
          ).afterDismissed().subscribe(() => {
            window.location.reload();
          });
        }
      );
    });
  }

  private async uploadAvatar(foto: File): Promise<string> {
    const nomeDoArquivo = Date.now();
    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto);
    const downloadURL = await dados.ref.getDownloadURL();

    return downloadURL;
  }
}
