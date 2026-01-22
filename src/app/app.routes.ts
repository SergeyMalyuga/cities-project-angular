import { Routes } from '@angular/router';
import { AppRoute } from './core/constants/const';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: AppRoute.MAIN,
    title: 'Main',
    loadComponent: () =>
      import('./pages/main/main.component').then((m) => m.MainComponent),
  },
  {
    path: AppRoute.FAVORITES,
    title: 'Favorites',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent,
      ),
  },
  {
    path: AppRoute.LOGIN,
    title: 'Login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: `${AppRoute.OFFER}/:id`,
    title: 'Offer',
    loadComponent: () =>
      import('./pages/offer/offer.component').then((m) => m.OfferComponent),
  },
  {
    path: '**',
    title: '404',
    loadComponent: () =>
      import('./pages/404/404.component').then((m) => m.NotFoundComponent),
  },
];
