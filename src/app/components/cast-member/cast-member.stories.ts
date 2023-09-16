import { CastMemberComponent } from './cast-member.component'

export default {
    title: 'OTT App/Cast Member',
    component: CastMemberComponent,
}

export const Casts = () => ({
    props: {
        name: 'Morgan Freeman',
    },
})
