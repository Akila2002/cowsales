// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators';
// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   post(arg0: string, value: any) {
//   }
//   constructor(private http: HttpClient) { }

//   getProduct() {
//     return this.http.get<any>('https://6529ee5555b137ddc83f33c3.mockapi.io/users')
//       .pipe(map((res: any) => {
//         return res;
//       }))
//     }

// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  getCattle() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<any[]>('http://localhost:3000/cattle');
  }
}

  // In api.service.ts
  
// getProduct() {
//   return this.http.get<any>('api/posts')
//     .pipe(map((res: any) => {
//       return res;
//     }))
// }




