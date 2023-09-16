import { Story, moduleMetadata } from '@storybook/angular'
import { NavigationMenuComponent } from '../navigation-menu/navigation-menu.component'
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component'
import { NavigationBarComponent } from './navigation-bar.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Navigation Bar',
    component: NavigationBarComponent,
    decorators: [
        moduleMetadata({
            declarations: [NavigationBarComponent, ProfileMenuComponent, NavigationMenuComponent],
        }),
    ],
}

export const NavigationWithNavMenu: Story = () => ({
    template: `<app-navigation-bar>
    <app-navigation-menu></app-navigation-menu>
    </app-navigation-bar>`,
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
