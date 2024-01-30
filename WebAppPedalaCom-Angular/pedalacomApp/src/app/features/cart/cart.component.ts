import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { CartApiServiceService } from '../../shared/CRUD/cart-api-service.service'
import { CartInfo } from '../../shared/dataModel/cart'
import { ImageService } from '../../shared/services/image-service.service'
import { RouterModule } from '@angular/router'
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  providers: [CartApiServiceService, ImageService]
})
export class CartComponent {

  hoverIndex: number | null = null
  userLogged = false
  tot: number = 0
  cartInfo : CartInfo [] = []

  constructor(
    private cartService: CartApiServiceService, 
    private imgService : ImageService, 
    private router: Router
  ){}

  checkLogged(){
    if(localStorage.getItem("username") != null || sessionStorage.getItem("username") != null)
      this.userLogged = true
    else this.userLogged = false
  }

  setHoverIndex(index: number) {
    this.hoverIndex = index
  }

  clearHoverIndex() {
    this.hoverIndex = null
  }

  ngOnInit(): void {
    this.checkLogged()
    this.getProduct()
  }


  redirectProd(productId: number){
    this.router.navigate(['/product', productId])
  }

  removeProduct(cartId: number){
    this.cartService.removeCart(cartId).subscribe({
      next: () => { window.location.reload() },
      error: (err: Error) => {console.error(err)}
    })
  }


  getProduct(){
    let valuer: number

    if(sessionStorage.getItem('id') != null)
      valuer = Number(sessionStorage.getItem('id'))
    else if(localStorage.getItem('id') != null)
      valuer = Number(localStorage.getItem('id'))
    else return console.error("error")

    this.cartService.getCartByID(valuer).subscribe({
      next: (data:any) => {
        this.cartInfo = data
        this.cartInfo.forEach((x:any) => {
          x.thumbNailPhoto = this.imgService.blobToUrl(x.thumbNailPhoto)
          this.tot += x.listPrice         
        })
      },
      error: (err:Error)=>{ console.error(err) }
    })
  }
}