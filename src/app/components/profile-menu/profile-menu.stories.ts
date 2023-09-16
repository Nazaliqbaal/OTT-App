import { moduleMetadata, Story } from '@storybook/angular'

import { DropDownMenuComponent } from '../drop-down-menu/drop-down-menu.component'
import { ProfileMenuComponent } from './profile-menu.component'

export default {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/angular/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: 'OTT App/Profile Detail',
    component: ProfileMenuComponent,
    decorators: [
        moduleMetadata({
            declarations: [DropDownMenuComponent, ProfileMenuComponent],
        }),
    ],
}

export const ProfileIcon: Story = () => ({
    props: {
        dropDownData: [
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
        icon: 'assets/profile-menu.svg',
    },
})
