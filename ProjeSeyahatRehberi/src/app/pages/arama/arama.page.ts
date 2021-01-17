import { DatabaseService,SehAd } from './../../services/database.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-arama',
  templateUrl: './arama.page.html',
  styleUrls: ['./arama.page.scss'],
})
export class AramaPage implements OnInit {

  constructor(private db: DatabaseService) {
   }

   sehirler: SehAd[] = [];
   isItemAvailable = false;

   ngOnInit() {

  }

   getItems(ev: any) {

       this.db.getDatabaseState().subscribe(rdy => {
        if (rdy) {
          this.db.getSehirAdi(ev.target.value).subscribe(sehir => {
            this.sehirler= sehir;
          })
        }
      });

      const val = ev.target.value;

       if (val && val.trim() !== '') {
           this.isItemAvailable = true;
           this.sehirler = this.sehirler.filter((item) => {
               return (item.sehir.toLowerCase().indexOf(val.toLowerCase()) > -1);
           })
       } else {
           this.isItemAvailable = false;
       }
   }


  
}
