import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the correct title', () => {
      component.title = 'Test Movie'
      fixture.detectChanges()
      const titleElement = fixture.nativeElement.querySelector('.banner-title')
      expect(titleElement.textContent).toContain('Test Movie')
  })

  it('should display the correct year', () => {
      component.year = '2022'
      fixture.detectChanges()
      const yearElement = fixture.nativeElement.querySelector('.detail-year')
      expect(yearElement.textContent).toContain('2022')
  })

  it('should display the correct overview', () => {
      component.overview = 'Test Movie Overview'
      fixture.detectChanges()
      const overviewElement = fixture.nativeElement.querySelector('.banner-detail')
      expect(overviewElement.textContent).toContain('Test Movie Overview')
  })

  it('should display the correct vote average', () => {
      component.voteAverage = '8.5'
      fixture.detectChanges()
      const voteAverageElement = fixture.nativeElement.querySelector('.second-line-detail').querySelectorAll('p')[0]
      expect(voteAverageElement.textContent).toContain('8.5')
  })

  it('should have a background image set', () => {
      component.background = 'https://example.com/image.jpg'
      fixture.detectChanges()
      const backgroundElement = fixture.nativeElement.querySelector('.background-body')
      expect(backgroundElement.style.backgroundImage).toContain('https://example.com/image.jpg')
  })
});
