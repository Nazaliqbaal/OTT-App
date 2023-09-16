import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMemberComponent } from './cast-member.component';

describe('CastMemberComponent', () => {
  let component: CastMemberComponent;
  let fixture: ComponentFixture<CastMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CastMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CastMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
