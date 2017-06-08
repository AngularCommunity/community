import { Component, Pipe, PipeTransform, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { AuthService } from '../shared/auth.service';

import "../shared/shareResults";
import { AngularFireDatabase } from 'angularfire2/database';

declare var firebase: any;
declare var prompt;

@Component({
    selector: 'resources',
    templateUrl: './resources.component.html',
    styleUrls: [ '../developers/expert-form.component.scss', './resources.component.scss'],
})
export class ResourcesComponent implements OnInit{
    adjustJumpnav: boolean = false;

    data: Observable<any[]>;
    priority: number;
    subPriority: number;
    priorityMode: boolean;

    constructor(public db: AngularFireDatabase, public auth: AuthService) {
        this.data = db.list('/resources').shareResults();

    }

    ngOnInit() {
        window.addEventListener('scroll', this.changeScrollPos.bind(this), false);
    }

    ngOnDestroy() {
        window.removeEventListener('scroll', this.changeScrollPos.bind(this), false);
    }

    setCategoryPriority(category, priority: number) {
        firebase.database().ref('/resources/' + category).setPriority(priority);
        this.priority = null;

    }

    setSubcategoryPriority(category, subcategory, priority: number) {
        firebase.database().ref('/resources/' + category + '/' + subcategory).setPriority(priority);
        this.priority = null;

    }

    changeScrollPos() {
        if (window.scrollY > 250) {
            this.adjustJumpnav = true;
        } else {
            this.adjustJumpnav = false;
        }
    }
}
