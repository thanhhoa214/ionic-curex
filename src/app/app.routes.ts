import { Routes } from '@angular/router';
import { TabLayoutComponent } from './ui/tab-layout/tab-layout.page';

export const routes: Routes = [
  {
    path: '',
    component: TabLayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'chart',
        loadComponent: () =>
          import('./pages/chart/chart.page').then((m) => m.ChartPage),
      },
      {
        path: 'tool',
        loadComponent: () =>
          import('./pages/tool/tool.page').then((m) => m.ToolPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./pages/setting/setting.page').then((m) => m.SettingPage),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
