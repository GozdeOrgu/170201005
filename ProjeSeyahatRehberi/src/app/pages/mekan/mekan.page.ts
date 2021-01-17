import { DatabaseService, Yer} from './../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
 

@Component({
  selector: 'app-mekan',
  templateUrl: './mekan.page.html',
  styleUrls: ['./mekan.page.scss'],
})
export class MekanPage implements OnInit {

  yerler : Yer[] = []; 
  sehirAdi : string;

  constructor(private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) {

   }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      let sehirId = params.get('id');

      this.db.getYerler(sehirId).subscribe(yer => {
        this.yerler = yer;
      });
    });
    
  }

}
