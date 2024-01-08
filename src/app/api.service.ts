import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getProduct() {
    return this.http.get<any>('http://localhost:3000/posts')
      .pipe(
        map((res: any) => res)
      );
  }

  getProductData() {
    const githubRawUrl = 'https://raw.githubusercontent.com/Akila2002/Akila/main/db.json';
    return this.http.get<any>(githubRawUrl);
  }
}
