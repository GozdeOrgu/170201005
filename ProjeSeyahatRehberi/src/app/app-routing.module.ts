import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  { path: '', redirectTo: 'anasayfa', pathMatch: 'full' },
  { path: 'lokasyon', loadChildren: './pages/lokasyon/lokasyon.module#LokasyonPageModule' },
  { path: 'lokasyon/:id', loadChildren: './pages/mekan/mekan.module#MekanPageModule' },
  { path: 'arama', loadChildren: './pages/arama/arama.module#AramaPageModule' },
  { path: 'arama/:id', loadChildren: './pages/mekan/mekan.module#MekanPageModule' },
  {
    path: 'anasayfa',
    loadChildren: () => import('./pages/anasayfa/anasayfa.module').then( m => m.AnasayfaPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
