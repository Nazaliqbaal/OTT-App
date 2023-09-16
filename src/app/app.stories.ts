import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Story, moduleMetadata } from '@storybook/angular'
import { AppComponent } from 'src/app/app.component'

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'OTT App/OTT',
    component: AppComponent,
    decorators: [
        moduleMetadata({
            declarations: [AppComponent],
            imports: [CommonModule, FormsModule],
        }),
    ],
}

export const OTTApp: Story = () => ({
    props: {},
})
