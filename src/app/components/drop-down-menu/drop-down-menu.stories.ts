// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { DropDownMenuComponent } from './drop-down-menu.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Drop Down Menu',
    component: DropDownMenuComponent,
    decorators: [
        moduleMetadata({
            declarations: [DropDownMenuComponent],
        }),
    ],
}

export const DropDownOptions: Story = () => ({
        props: {
            dropdownData: [
                {
                    name: 'Profile Menu',
                    onClick: () => {
                        console.log('Option 1 clicked')
                    },
                },
                {
                    name: 'Logout',
                    onClick: () => {
                        console.log('Option 2 clicked')
                    },
                },
            ],
        },
})