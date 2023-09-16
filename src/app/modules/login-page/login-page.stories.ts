// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { LoginPageComponent } from './login-page.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Login page',
    component: LoginPageComponent,
    decorators: [
        moduleMetadata({
            declarations: [LoginPageComponent],
        }),
    ],
}

export const registration: Story = () => ({
    props: {},
})
