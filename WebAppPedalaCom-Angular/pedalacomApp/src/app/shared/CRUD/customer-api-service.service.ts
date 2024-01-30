import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Customer } from '../dataModel/customer'


@Injectable({
  providedIn: 'root'
})

export class CustomerApiServiceService {
  
  constructor(private http: HttpClient) { }
  
  headerOptions = new HttpHeaders({
    contentType: 'application/json',
    responseType: 'text'
  })
  
  // string initialization 
  customer: string = ""
  
  // Get all customers
  getCustomers(): Observable<any> {
    return this.http.get('https://localhost:7150/api/Customers')
  }
  
  // Get a customer by ID
  getCustomerById(): Observable<any> {
    return this.http.get(`https://localhost:7150/api/Customers/${this.customer}`)
  }
  
  // Add a new customer
  postCustomer(obj: Customer): Observable<any> {
    this.setTokenHttpHeader(obj.EmailAddress, obj.PasswordHash)
    return this.http.post('https://localhost:7150/api/CwCustomers', obj, {headers : this.headerOptions, observe : 'response'})
  }
  
  // Update a customer
  putCustomer(customerId: string, obj: Object): Observable<any> {
    return this.http.put(`https://localhost:7150/api/Customers/${customerId}`, obj)
  }
  
  // Delete a customer
  deleteCustomer(customerId: string): Observable<any> {
    return this.http.delete(`https://localhost:7150/api/CwCustomers/${customerId}`)
  }

  loginCustomer(email: string, password: string)
  {
    var user = {
      'EmailAddress': email,
      'PasswordHash': password
    }
    this.setTokenHttpHeader(user.EmailAddress,user.PasswordHash)
    return this.http.post('https://localhost:7150/Login', user, {headers: this.headerOptions, observe: 'response'})
  }
  
  setTokenHttpHeader(user: string, password: string){
    this.headerOptions = 
      this.headerOptions.set('Authorization', 'Basic '+ btoa(user + ':' + password))
  }

  setLoggedToken(email: string, user: string, id: number, remember: boolean)
  {
    let emailSplit = email.split('@')

    if(emailSplit[1].toLowerCase() == "pedalacom.com"){
      if(remember){
        localStorage.setItem('username', user)
        localStorage.setItem('id', id.toString())
        localStorage.setItem('email', email)
        localStorage.setItem('authorization', btoa('Admin'))
      }else{
        sessionStorage.setItem('username', user)
        sessionStorage.setItem('id', id.toString())
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('authorization', btoa('Admin'))
      }
    } else{
      if(remember){
        localStorage.setItem('username', user)
        localStorage.setItem('id', id.toString())
        localStorage.setItem('email', email)
      }else{
        sessionStorage.setItem('username', user)
        sessionStorage.setItem('id', id.toString())
        sessionStorage.setItem('email', email)
      }
    }

    
  }

}

