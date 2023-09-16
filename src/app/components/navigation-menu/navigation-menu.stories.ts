// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, moduleMetadata } from '@storybook/angular'
import { NavigationMenuComponent } from './navigation-menu.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, RouterModule } from '@angular/router'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
    title: 'OTT App/Navigation Menu',
    component: NavigationMenuComponent,
    decorators: [
        moduleMetadata({
            imports: [RouterTestingModule, RouterModule],
            declarations: [NavigationMenuComponent],
        }),
    ],
}

export const NavigationMenu: Story = () => ({
    props: {
        items: [
            { name: 'home', icon: 'assets/home-icon.svg', path: '/home' },
            { name: 'movie', icon: 'assets/movie-icon.svg', path: '/movies' },
            { name: 'series', icon: 'assets/series-icon.svg', path: '/series' },
            { name: 'bookmark', icon: 'assets/bookmark-icon.svg', path: '/bookmarks' },
        ],
    },
})
