import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-cast-member',
    templateUrl: './cast-member.component.html',
    styleUrls: ['./cast-member.component.scss'],
})
export class CastMemberComponent {
    @Input() name!: string
}
