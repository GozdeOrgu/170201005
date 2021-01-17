import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
export interface Seh {
  id: number,
  sehir: string,
  img: string
}

export interface Yer {
  id: number,
  mekan: string,
  img: string,
  sehirId: number
}

export interface SehAd {
  sehir: string,
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  sehirler = new BehaviorSubject([]);
  yerler = new BehaviorSubject([]);
  sehirAdlari = new BehaviorSubject([]);
 
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'uygulama.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadsehirler();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getSehirler():Observable<any[]> 
  {
    return this.sehirler.asObservable();
  }

  getYerler(id):Observable<Yer[]> 
  {
    this.loadYerler(id);
    return this.yerler.asObservable();
  }

  getSehirAdi(shr): Observable<any[]> {
    this.loadSehirAdi(shr);
    return this.sehirAdlari.asObservable();
  }

  loadsehirler() {
    return this.database.executeSql('SELECT * FROM lokasyon', []).then(data => {
      let sehirler: Seh[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

          sehirler.push({ 
            id: data.rows.item(i).id,
            sehir: data.rows.item(i).sehir,
            img: data.rows.item(i).img
           });
        }
      }
      this.sehirler.next(sehirler);
    });
  }
  loadYerler(id) {
    return this.database.executeSql('SELECT * FROM yerler WHERE sehirId = ?', [id]).then(data => {
      let yer: Yer[] = [];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

           yer.push({ 
            id: data.rows.item(i).id,
            mekan: data.rows.item(i).mekan, 
            img: data.rows.item(i).img, 
            sehirId: data.rows.item(i).sehirId
           });
        }
      }
      this.yerler.next(yer);
    });
  }
  
  loadSehirAdi(shr){
    return this.database.executeSql('SELECT sehir,id FROM lokasyon WHERE sehir= ?', [shr]).then(data => {
      let sehirAdi=[];

      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          sehirAdi.push({ 
            sehir: data.rows.item(i).sehir,
            id: data.rows.item(i).id
           });
        }
      }
      this.sehirAdlari.next(sehirAdi);
    });
  }
}
