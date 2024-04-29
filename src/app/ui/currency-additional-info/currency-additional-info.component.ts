import { Component } from '@angular/core';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Browser } from '@capacitor/browser';

const recentNews = [
  {
    title: 'Tech stocks rally as major companies report strong earnings',
    date: '2021-05-14',
    source: 'CNN Business',
    url: 'https://www.cnn.com/2021/05/14/business/tech-stocks-rally-earnings/index.html',
    description:
      'Technology stocks surged on Friday as major companies reported better-than-expected earnings, boosting investor confidence in the sector amid a broader market rally.',
  },
  {
    title: 'Oil prices jump as OPEC+ sticks to gradual output increases',
    date: '2021-05-13',
    source: 'Bloomberg',
    url: 'https://www.bloomberg.com/news/articles/2021-05-13/oil-jumps-as-opec-sticks-to-gradual-output-increases',
    description:
      'Oil prices soared on Thursday after the Organization of the Petroleum Exporting Countries and allies (OPEC+) decided to stick to their plan of gradual output increases, easing concerns about supply shortages.',
  },
  {
    title: 'Global stock markets hit new highs on positive economic outlook',
    date: '2021-05-12',
    source: 'Financial Times',
    url: 'https://www.ft.com/content/91a55fe3-5aa6-4e71-bdb2-0a9c64a32d17',
    description:
      'Global stock markets reached new highs on Wednesday amid growing optimism about the global economic recovery, fueled by strong corporate earnings and progress in vaccination efforts against COVID-19.',
  },
];

@Component({
  selector: 'app-currency-additional-info',
  templateUrl: './currency-additional-info.component.html',
  styleUrls: ['./currency-additional-info.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
  ],
})
export class CurrencyAdditionalInfoComponent {
  recommendations = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF'];
  recentNews = recentNews;

  openBrowser(url: string) {
    Browser.open({ url });
  }
}
