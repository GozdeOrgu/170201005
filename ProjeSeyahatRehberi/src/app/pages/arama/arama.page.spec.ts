import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AramaPage } from './arama.page';

describe('AramaPage', () => {
  let component: AramaPage;
  let fixture: ComponentFixture<AramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AramaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
