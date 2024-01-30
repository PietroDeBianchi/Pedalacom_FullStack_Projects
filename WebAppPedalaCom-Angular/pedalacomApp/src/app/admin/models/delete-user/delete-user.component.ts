import { Component } from '@angular/core'
import { CustomerApiServiceService } from '../../../shared/CRUD/customer-api-service.service'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'



@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
  providers :[CustomerApiServiceService]
})
export class DeleteUserComponent {
  
  emailUser = ""
  userDelete = false
  userError = false
  userEmail:string =  ''

  constructor (private customer : CustomerApiServiceService) { }

  changeEmail(email: string){
    this.userEmail = email
  }

  deleteUser( email : string) {
    this.userError = false
    this.userDelete = false
    this.customer.deleteCustomer(email).subscribe({
      next:() => {
        this.userDelete = true
      },
      error : (err : any) => {
        console.error(err)
        this.userError = true
      }
    })
  }
}
