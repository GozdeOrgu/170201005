import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LokasyonPage } from './lokasyon.page';

describe('LokasyonPage', () => {
  let component: LokasyonPage;
  let fixture: ComponentFixture<LokasyonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokasyonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LokasyonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
