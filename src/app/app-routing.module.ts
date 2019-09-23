import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'route-number',
    loadChildren: () => import('./route-number/route-number.module').then(m => m.RouteNumberPageModule)
  },
  {
    path:'current-place-to-destination',
    loadChildren:()=>import('./cptodest/cptodest.module').then(m =>m.CptodestPageModule)
  },
  {
    path:'buses-in-current-place',
    loadChildren:()=>import('./busincp/busincp.module').then(m =>m.BusincpPageModule)
  },
  { path: 'srr-host', loadChildren: './srr-host/srr-host.module#SrrHostPageModule' },
  { path: 'srr-text', loadChildren: './srr-text/srr-text.module#SrrTextPageModule' },
  { path: 'srr-map', loadChildren: './srr-map/srr-map.module#SrrMapPageModule' },
  { path: 'route-number', loadChildren: './route-number/route-number.module#RouteNumberPageModule' },
  { path: 'cptodest', loadChildren: './cptodest/cptodest.module#CptodestPageModule' },
  { path: 'busincp', loadChildren: './busincp/busincp.module#BusincpPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
