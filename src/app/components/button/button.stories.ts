// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { ButtonComponent } from './button.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Button',
    component: ButtonComponent,
    decorators: [
        moduleMetadata({
            declarations: [ButtonComponent],
        }),
    ],
}

export const SignInEnabled: Story = () => ({
    props: {
        label: 'Sign In',
        disabled: false,
        type: 'primary',
    },
})

export const SignInDisabled: Story = () => ({
    props: {
        label: 'Sign In',
        disabled: true,
    },
})
export const SignUpEnabled: Story = () => ({
    props: {
        label: 'Sign Up',
        disabled: false,
        type: 'secondary',
    },
})
export const SignUpDisabled: Story = () => ({
    props: {
        label: 'Sign Up',
        disabled: true,
        type: 'secondary',
    },
})
export const RegisterEnabled: Story = () => ({
    props: {
        label: 'Register',
        disabled: false,
        type: 'primary',
    },
})
export const RegisterDisabled: Story = () => ({
    props: {
        label: 'Register',
        disabled: true,
        type: 'primary',
    },
})
export const SearchDisabled: Story = () => ({
    props: {
        label: 'Search',
        size: 'large',
        type: 'primary',
        disabled: true,
    },
})
export const SearchEnabled: Story = () => ({
    props: {
        label: 'Search',
        size: 'large',
        type: 'primary',
        disabled: false,
    },
})
