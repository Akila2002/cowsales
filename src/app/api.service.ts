import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  post(arg0: string, value: any) {
  }
  constructor(private http: HttpClient) { }

  getProduct() {
    return this.http.get<any>('https://6529ee5555b137ddc83f33c3.mockapi.io/users')
      .pipe(map((res: any) => {
        return res;
      }))
    }
  // In api.service.ts
  
// getProduct() {
//   return this.http.get<any>('api/posts')
//     .pipe(map((res: any) => {
//       return res;
//     }))
// }

}




