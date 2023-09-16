import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'board', pathMatch: 'full' },
    {
        path: 'board', loadComponent: () => import('./game/board.component')
            .then(mod => mod.BoardComponent)
    },
];
