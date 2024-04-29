# Currency Exchange

This project is a currency exchange application built with Angular and Ionic. It uses the [Narodowy Bank Polski](https://api.nbp.pl/en.html) API to fetch exchange rates. Targetting FX traders makes me choose Dark theme as a go-to.

## Demonstration
https://github.com/thanhhoa214/ionic-curex/assets/32329202/057b88e8-0f83-422a-a4ae-e099fa00feee



## Features

- Periodically update exchange rates: Fetches exchange rates every 1 minute from API.
- Quickly check out the 7-day chart by tapping on a currency in style of bottom sheet.
- Favorite list: add/reorder currency pair and remove items with ease by swiping interaction.
- Cache data for next session.
- Currency conversion: Converts between different currencies using the fetched exchange rates.

## Coming Features
- iOS Widget for favorite currencies

## Techniques Used

- Angular: The application is built with Angular, a platform for building web applications.
- Ionic: Ionic is used for building the mobile app version of the application.
- Capacitor: Capacitor is used to provide native functionality to the mobile app.
- NGXS: NGXS is used for state management in the application with Storage plugin for cache previous session data, and Logger for debugging easily.
- Tailwind CSS: Tailwind CSS is used for styling the application.
- OpenAPI tool generator: Generate TypeScript API services from API specs.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/thanhhoa214/ionic-curex.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Deployment

To build the application for production, use the following command to build it at `www/browser` destination:

```bash
npm run build
```

To copy web bundle and assets to native apps, use the following command:

```bash
npx cap sync
```

## Native Apps
- Look into great Ionic document for iOS: https://capacitorjs.com/docs/ios
- Look into great Ionic document for Android: https://capacitorjs.com/docs/android

## Built With

- [Angular 17](https://angular.io/)
- [Ionic 8](https://ionicframework.com/)
- [Capacitor](https://capacitorjs.com/)
- [NGXS](https://www.ngxs.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Challenges and Obstacles

- I got into trouble with the latest XCode iOS version installation, took hours while getting network/storage errors time after time.
- Trial API budget ran out on the day of submission during development => Switched all codes from XE exchange API and https://rapidapi.com/exchangerateapi/api/exchangerate-api to use http://api.nbp.pl/en.html
- I am so sorry for the late submission. Please, don't take this as my excuse, my wife was sick on weekends, I just want to say with limited time, I tried my best to arrange to research, design, implement, and test to deliver my proud product to you (not as an assignment).

## Thank you!
Thank you so much for interviews and valuable chats. From the bottom of my heart, I would love to be a part of your team to bring better life quality for everyone. Wish all the best to you!
