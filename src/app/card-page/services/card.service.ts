import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {card} from '../interfaces/card';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private PATH_API = 'https://verdant-bruin-370422.rj.r.appspot.com/api/v1/card';

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private snackbar: MatSnackBar) {}

  public getAllCards(): Observable<card[]> {
    return this.http.get<card[]>(`${this.PATH_API}`);
  }


  public updateCard(card: card): Observable<card> {
    return this.http.put<card>(`${this.PATH_API}/${card.cardCode}`, card);
  }

  public deleteCard(card: card): Observable<void> {
    if (card.avatar.includes('firebasestorage')) {
      const ref = this.storage.refFromURL(card.avatar);
      ref.delete();
      return this.http.delete<void>(`${this.PATH_API}/${card.cardCode}`);
    }else{
      return this.http.delete<void>(`${this.PATH_API}/${card.cardCode}`);
    }
  }

  public async createCard(newCard: card, avatar: File): Promise<Subscription>{
    newCard.avatar = await this.uploadAvatar(avatar);
    return this.http.post<card>(`${this.PATH_API}`, newCard).subscribe({
      next: () => {
          window.location.reload();
        },
        error: () => {
            this.snackbar.open('Um erro ocorreu. Por favor, tente novamente mais tarde!', 'OK', {
                duration: 3000,
                panelClass: ['error-snackbar'],
                verticalPosition: 'top',
            });
      }
    });
  }



  private async uploadAvatar(foto: File): Promise<string> {
    const nomeDoArquivo = Date.now();
    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto);
    return await dados.ref.getDownloadURL();
  }


}
