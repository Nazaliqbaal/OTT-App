import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have the primary class by default', () => {
      const cardContainer = fixture.debugElement.query(By.css('.card-container')).nativeElement
      expect(cardContainer.classList).toContain('primary')
  })
   it('should have the secondary class if type is set to "secondary"', () => {
       component.type = 'secondary'
       fixture.detectChanges()
       const cardContainer = fixture.debugElement.query(By.css('.card-container')).nativeElement
       expect(cardContainer.classList).toContain('secondary')
   })
   it('should display the content passed as ng-content', () => {
       const content = 'Test content'
       component.type = 'primary'
       fixture.detectChanges()
       const cardContainer = fixture.debugElement.query(By.css('.card-container')).nativeElement
       cardContainer.innerHTML = content
       fixture.detectChanges()
       expect(cardContainer.textContent).toBe(content)
   })

});
