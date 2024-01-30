import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LogApiServiceService {

  constructor(private http: HttpClient) { }

  getLogErrors(pageNumber = 1): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
    return this.http.get('https://localhost:7150/api/ErrorLogs', { params: params })
  }

  getProductsSales(pageNumber = 1): Observable<any> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
    return this.http.get('https://localhost:7150/api/OrderDetails', { params: params })
  }

  getProductSalesId(productId: number): Observable<any> {
    return this.http.get(`https://localhost:7150/api/OrderDetails/${productId}`)
  }
}
