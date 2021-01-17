import { DatabaseService, Seh } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lokasyon',
  templateUrl: './lokasyon.page.html',
  styleUrls: ['./lokasyon.page.scss'],
})
export class LokasyonPage implements OnInit {

  sehirler: Seh[] = [];

  sehirPlaka : string;
  sehirAdi : string;
 
  constructor(private db: DatabaseService, public router : Router) {
    
  }

  ngOnInit() {

      this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getSehirler().subscribe(sehir => {
            this.sehirler= sehir;
          })
        }
      });

  }

}
