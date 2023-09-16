// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { CardComponent } from './card.component'
import './card.component.scss'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Card',
    component: CardComponent,
    decorators: [
        moduleMetadata({
            declarations: [CardComponent],
        }),
    ],
}

export const primaryCard: Story = () => ({
    props: {
        type: 'primary',
    },
})

export const secondaryCard: Story = () => ({
    props: {
        type: 'secondary',
    },
})

export const loginCard: Story = () => ({
    template: `
    <app-card type="primary"> 
    <div style="display: flex; margin: -60px -48px;">
    <app-card type="secondary" style="flex: 0 0 50%"></app-card>
    <div>
    goto signup
    </div>  
    </div>      
    </app-card>`,
})
