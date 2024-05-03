# Currency Exchange

This project is a currency exchange application built with Angular and Ionic. It uses the [Narodowy Bank Polski](https://api.nbp.pl/en.html) API to fetch exchange rates. Targetting FX traders makes me choose Dark theme as a go-to.

## Demonstration & Snapshots

https://github.com/thanhhoa214/ionic-curex/assets/32329202/057b88e8-0f83-422a-a4ae-e099fa00feee

<br/>

<p align="middle">
<img src="https://github.com/thanhhoa214/ionic-curex/assets/32329202/fe4b6595-3385-49b2-a157-96713995be88" width="200" alt="Home"/>
<img src="https://github.com/thanhhoa214/ionic-curex/assets/32329202/a4840e6b-2026-4d08-8e49-d219f7d5db6e" width="200" alt="home_detail"/>
<img src="https://github.com/thanhhoa214/ionic-curex/assets/32329202/2e9d11e6-9408-49b8-92e1-e2dea086bf17" width="200" alt="favorite_reorder_remove"/>

</p>
<p align="middle">
<img src="https://github.com/thanhhoa214/ionic-curex/assets/32329202/9f66c607-ed21-4022-850d-e4bc6b404d0d" width="200" alt="chart_detail"/>
<img src="https://github.com/thanhhoa214/ionic-curex/assets/32329202/f0456278-636a-4301-b50e-fab8e9e49516" width="200" alt="tool"/>
<img src="https://github.com/thanhhoa214/ionic-curex/assets/32329202/5f71d745-5e2d-4c61-90a6-3ba0d58ecbbf" width="200" alt="setting"/>
</p>

## Features

- Periodically update exchange rates: Fetches exchange rates every 1 minute from API.
- Quickly check out the 7-day chart by tapping on a currency in style of bottom sheet.
- Favorite list: add/reorder currency pair and remove items with ease by swiping interaction.
- Cache data for next session.
- Currency conversion: Converts between different currencies using the fetched exchange rates.

## Coming Features

- iOS Widget for favorite currencies

## Project Structure

Architecture strategy [Module as library](https://nx.dev/structure/library-types#library-types) to get these advantages:

- Clear documentation folders and their purposes
- Inherit effective module-based architecture from Angular official recommendation
- Separate concerns between kinds of things, reduces dependent relations between modules
- Prevents heavy-based on old shared module strategy
- Prevents from uncountable meaningless folder
- Prevents too much-nested component
- Enhance awareness and scalability

```
📦  root
 ┣ 📃 demo.mp4 - Demo file
 ┣ 📃 angular.json - Configurations for Angular project
 ┣ 📃 capacitor.config.ts - Configurations for capacitor
 ┣ 📂 android - Android native project
 ┣ 📂 ios - iOS native project
 ┣ 📂 src
 ┃ ┣ 📂 app - Contains the main web/hybrid codebase. If more features, the 4 types of folders below will be repeatable for each "big feature".
 ┃ ┃ ┣ 📂 data-access - Data acccess things such as store, API services, API models, OpenAPI generated folder
 ┃ ┃ ┣ 📂 pages - components as pages
 ┃ ┃ ┣ 📂 ui - shared components or just section components
 ┃ ┃ ┣ 📂 util - shared things like constants, utility functions, helpers to keep the main logic stay inside components
```

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

- I got into trouble with the latest XCode iOS version installation, took hours while getting network/storage errors time after time. => Switched to test on Android, I will try installing it back and update iOS demo here.
- Trial API budget ran out on the day of submission during development => Switched all codes from XE exchange API and https://rapidapi.com/exchangerateapi/api/exchangerate-api to use http://api.nbp.pl/en.html

## Thank you!

Thank you so much for interviews and valuable chats. From the bottom of my heart, I would love to be a part of your team to bring better life quality for everyone. Wish all the best to you!
