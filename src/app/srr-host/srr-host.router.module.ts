import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { SrrHostPage } from './srr-host.page';

const routes:Routes=[
    {
        path:'srr-host',
        component:SrrHostPage,
        children:[
            {
                path:'text',
                children:[
                    {
                        path:'',
                        loadChildren:'../srr-text/srr-text.module#SrrTextPageModule'
                    }
                ]
            },
            {
                path:'map',
                children:[
                    {
                        path:'',
                        loadChildren:'../srr-map/srr-map.module#SrrMapPageModule'
                    }
                ]
            },
            {
                path:'',
                redirectTo:'/srr-host/text',
                pathMatch:'full'
            }
        ]
    },
    {
        path:'',
        redirectTo:'srr-host/text',
        pathMatch:'full'
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})

export class SrrPageRoutingModule {}