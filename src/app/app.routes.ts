import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/home/main-page.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'playground',
    loadChildren: () =>
      import(
        './pages/components-playgrounds/components-playground.routes'
      ).then((m) => m.PLAYGROUND_ROUTES),
  },
  {
    path: 'form',
    component: FormComponent,
  },
];
