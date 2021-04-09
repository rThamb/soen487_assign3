// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  base_url: 'http://localhost:4200/assets/mock-api/',
  team_list: 'team-list.json',
  team_details: 'team-details-{id}.json',
  league_players: 'player-list.json',
  auth: 'https://jsonplaceholder.typicode.com/post',
  leaderboard: 'ranks.json',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
