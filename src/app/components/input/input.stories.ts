// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { moduleMetadata, Story } from '@storybook/angular'
import { CommonModule } from '@angular/common'
import { InputComponent } from './input.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Input Text Field',
    component: InputComponent,
    decorators: [
        moduleMetadata({
            declarations: [InputComponent],
            imports: [CommonModule, FormsModule, ReactiveFormsModule],
        }),
    ],
}

export const InputName: Story = () => ({
    props: {
        label: 'Full Name',
        placeholder: 'Full Name',
    },
})

export const InputPassword: Story = () => ({
    props: {
        label: 'Password',
        placeholder: 'Password',
    },
})

export const ConfirmPassword: Story = () => ({
    props: {
        label: 'Confirm password',
        placeholder: 'Confirm password',
    },
})

export const InputEmail: Story = () => ({
    props: {
        label: 'Email',
        placeholder: 'Email',
    },
})
