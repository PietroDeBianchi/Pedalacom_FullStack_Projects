import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Cart } from '../dataModel/cart'

@Injectable({
  providedIn: 'root'
})
export class CartApiServiceService {

  constructor(private http: HttpClient) { }
  
  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })

  getCartByID(id: number): Observable<any> {
    return this.http.get(`https://localhost:7150/api/Cart/${id}` )
  }

  postCart(obj: Cart): Observable<any> {
    return this.http.post('https://localhost:7150/api/Cart', obj, {headers : new HttpHeaders({ contantType: 'application/json' }), observe : 'response'})
  }

  removeCart(id:number) : Observable<any>{
    return this.http.delete(`https://localhost:7150/api/Cart/${id}`)
  }
}
