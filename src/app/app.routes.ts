import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'game', pathMatch: 'full' },
    {
        path: 'game', loadComponent: () => import('./pages/game.component')
            .then(mod => mod.GameComponent)
    },
];
