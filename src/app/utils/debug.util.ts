
// import { environment } from "../../environments/environment.prod";
// import { Observable } from "rxjs";


// declare module 'rxjs/internal/Observable' {
//     interface Observable<T> {
//         debug: (...any) => Observable<T>;
//     }
// };

// Observable.prototype.debug = function (message: string) {
//     return this.tap(
//         (next) => {
//             if (!environment.production) {
//                 console.log(message, next);
//             }
//         },
//         (err) => {
//             if (!environment.production) {
//                 console.error('ERROR>>', message, err);
//             }
//         },
//         () => {
//             if (!environment.production) {
//                 console.log('Completed -');
//             }
//         }
//     );
// }