import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calculator, home, settings, statsChart } from 'ionicons/icons';

@Component({
  selector: 'app-tab-layout',
  templateUrl: 'tab-layout.page.html',
  styleUrls: ['tab-layout.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabLayoutComponent {
  items = [
    { path: 'home', label: 'Home', icon: 'home' },
    { path: 'chart', label: 'Chart', icon: 'stats-chart' },
    { path: 'tool', label: 'Tool', icon: 'calculator' },
    { path: 'settings', label: 'Settings', icon: 'settings' },
  ];

  constructor() {
    addIcons({
      home,
      calculator,
      statsChart,
      settings,
    });
  }
}
