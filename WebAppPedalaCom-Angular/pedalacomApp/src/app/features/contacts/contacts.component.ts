import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  valueOk: boolean = true
  messageSend: boolean = false
  errorList: string[] = []

  sendMessage(){
    this.messageSend = true
  }

  checkValue(name: string, surname: string, email: string, object: string, message: string){
    this.valueOk = false
    this.errorList = []

    if(!email.match("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")){
      this.valueOk = true
      if(email != "")
        this.errorList.push("Email non valida")
    } 

    if(!name.match("^[a-zA-Z ]{3,}$")){
      this.valueOk = true
      if(name != "")
        this.errorList.push("Il nome non è valido")
    }

    if(!surname.match("^[a-zA-Z ]{3,}$")){
      this.valueOk = true
      if(surname != "")
        this.errorList.push("Il cognome non è valido")
    }

    if(!object.match(".{3,}")){
      this.valueOk = true
      if(object != "")
        this.errorList.push("L'oggetto del messaggio non è valido")
    }

    if(!message.match(".{3,}")){
      this.valueOk = true
      if(message != "")
        this.errorList.push("Scrivi un messaggio valido")
    }
  }
}