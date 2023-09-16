import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { moduleMetadata } from '@storybook/angular'
import { StarRatingComponent } from './star-rating.component'

export default {
    title: 'OTT App/Star Rating',
    decorators: [
        moduleMetadata({
            imports: [NgbRatingModule],
            declarations: [StarRatingComponent],
        }),
    ],
}

const starTemplate = `
  <ng-template #star let-fill="fill">
    <span class="star" [class.full]="fill === 100">
      <span class="half" [style.width.%]="fill"> &#9733;</span>&#9733;
    </span>
  </ng-template>
`

export const TwoStarRating = () => ({
    component: StarRatingComponent,
    props: {
        rating: 2,
        starTemplate,
    },
})

export const ThreeStarRating = () => ({
    component: StarRatingComponent,
    props: {
        rating: 3.5,
        starTemplate,
    },
})
