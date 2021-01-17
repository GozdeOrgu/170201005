import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MekanPage } from './mekan.page';

describe('MekanPage', () => {
  let component: MekanPage;
  let fixture: ComponentFixture<MekanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MekanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MekanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
