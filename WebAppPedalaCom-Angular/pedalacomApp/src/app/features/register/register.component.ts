import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomerApiServiceService } from '../../shared/CRUD/customer-api-service.service'
import { FormsModule } from '@angular/forms'
import { Customer } from '../../shared/dataModel/customer'
import { Router, RouterModule} from '@angular/router'


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [CustomerApiServiceService]
})
export class RegisterComponent {

  alreadyRegister: boolean = false
  errorList: string[] = []
  valueOK: boolean = true
  remember: boolean = false
  samePassword: boolean = false
  
  constructor(
    private registration : CustomerApiServiceService,
    private router: Router
  ){}

  ngOnInit(){
    this.redirect()
  }

  isPasswordValid(password: string): boolean {
    const passwordRegex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:<>,.?~\\/-]).{8,}$/
    return passwordRegex.test(password)
  }

  checkValue(Title: string, FirstName: string, LastName: string, Email: string, PhoneNumber: string, password: string, checkPassword: string){
    this.valueOK = true
    this.errorList = []

    if(Title == "Choose..."){
      this.valueOK = false
      this.errorList.push("Devi scegliere almeno un titolo")
    }

    if(!FirstName.match("^([a-zA-Z\u00C0-\u00FF\s]{3,}\s?)+$")){
      this.valueOK = false
      if(FirstName != "")
        this.errorList.push("Il nome non è valido")
    }

    if(!LastName.match("^([a-zA-Z\u00C0-\u00FF\s]{3,}\s?)+$")){
      this.valueOK = false
      if(LastName != "")
        this.errorList.push("Il cognome non è valido")
    }

    if(!Email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")){
      this.valueOK = false
      if(Email != "")
        this.errorList.push("Email non valida")
    }

    if(!this.isPasswordValid(password)){
      this.valueOK = false
      if(password != "")
        this.errorList.push("La password deve contenere:" + "<br>" +
          "- Almeno una lettera maiuscola" + "<br>" + "- Almeno un numero"+ "<br>" + "- Almeno un carattere speciale" + "<br>" + "La Password deve avere minimo 8 caratteri" )
    }

    if(password === checkPassword && password != ''){
      this.samePassword = true
    } else if(password != "" && checkPassword != "")
        this.errorList.push("Le password non coincidono")

    if(PhoneNumber.length < 10 || PhoneNumber.length > 13){
      this.valueOK = false
      if(PhoneNumber != "")
        this.errorList.push("Il numero di telefono non è valido")
    }
  }
  
  PasswordCheck(password: string, checkPassword: string){
    this.errorList = []
    if(password === checkPassword && password != '')
      this.samePassword = true
    else{
      this.samePassword = false
      this.errorList.push("Le password non coincidono")
    }
  }

  redirect(){
    if(localStorage.getItem("username") || sessionStorage.getItem("username")){
      localStorage.setItem("register", "first_registration")
      this.router.navigate(['/'])
    }
  }

  checkControl(){
    this.remember = !this.remember
  }

  sendRegistration(title : string,firstName : string,middleName : string,lastName : string,email : string,password : string,companyName : string,phoneNumber : string){
    let cst:  Customer =  new Customer() 
    cst = {
      Title : title ,
      FirstName  : firstName,
      MiddleName  : middleName,
      LastName  : lastName,
      EmailAddress  : email.toLowerCase(),
      PasswordHash  : password,
      CompanyName  : companyName,
      Phone  : phoneNumber,
    }
    
    this.registration.postCustomer(cst).subscribe({
      next: (data: any) => {
        this.registration.setLoggedToken(cst.EmailAddress, cst.FirstName, data.body.customerId, this.remember)
        this.redirect()
      },
      error: (err: any) => {
        this.alreadyRegister = false
        if(err.error == "alreadyRegister")
          this.alreadyRegister = true
      }
    })
  }
}