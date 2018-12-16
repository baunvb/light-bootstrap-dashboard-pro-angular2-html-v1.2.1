import {Routes} from '@angular/router';

import {HomestayComponent} from './homestay/homestay.component';

export const AdminRoutes: Routes = [{
    path: '',
    children: [{
        path: 'homestay',
        component: HomestayComponent
    }]
}, {
    path: '',
    children: [{
        path: 'station',
        component: HomestayComponent
    }]
}];
