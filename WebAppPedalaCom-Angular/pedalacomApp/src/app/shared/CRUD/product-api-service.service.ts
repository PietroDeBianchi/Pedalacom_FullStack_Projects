import { ProductModel } from './../dataModel/products'
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {

  constructor(private http: HttpClient) { }

  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })

  // string initialization 
  product: string = ""

  // Get all products
  getProducts(): Observable<any> {
    return this.http.get('https://localhost:7150/api/Products')
  }

  // Get a product by ID
  getProductById(productId: number): Observable<any> {
    return this.http.get(`https://localhost:7150/api/Products/${productId}`)
  }
  

  getProductFiltered(searchData: string, pageNumber: number = 1, order : string, bodyReq: any = null): Observable<any> {
    const params = new HttpParams()
        .set('searchData', searchData)
        .set('pageNumber', pageNumber.toString())
        .set('order', order)

    return this.http.post(`https://localhost:7150/api/Products/info`, bodyReq, { params: params })
  }

  getProductByName(searchData : string, pageNumber: number = 1) : Observable<any> {
    const params = new HttpParams()
    .set('searchData', searchData)
    .set('pageNumber', pageNumber.toString())
    return this.http.get(`https://localhost:7150/api/Products/info`, {params : params})
  }

  getHomeProductInfo(): Observable<any> {
    return this.http.get('https://localhost:7150/api/Products/info', {headers : new HttpHeaders({ contantType: 'application/json' })})
  }
  // Add a new product w OBJECT Injection
  postProducts(obj: Object, arr: string[]): Observable<any> {
    return this.http.post('https://localhost:7150/api/Products', [obj, arr], { headers : new HttpHeaders({ contantType: 'application/json' }), observe: 'response' })
  }

  // Update a product w string Injection & OBJECT Injection
  putProducts(productId: number, descriptionId: number, product: Object, description: string, model: string): Observable<any> {
  // if(descriptionId != null)
  //     return this.http.put(`https://localhost:7150/api/Products/${productId},${descriptionId}`,     
  //     {
  //       "model" : model,
  //       "description": description, 
  //       "product": product
  //     })
  //   else 
  //   return this.http.put(`https://localhost:7150/api/Products/${productId}`,     
  //   {
  //     "model" : model,
  //     "description": description, 
  //     "product": product
  //   }) 

    return this.http.put(`https://localhost:7150/api/Products/${productId}`,   
    {
      "model" : model,
      "description": description, 
      "product": product
    })
  }

  // Delete a product  w string Injection
  deleteProducts(productId: string): Observable<any> {
    return this.http.delete(`https://localhost:7150/api/Products/${productId}`)
  }
}

