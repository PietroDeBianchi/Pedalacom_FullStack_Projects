import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { Cart } from '../../shared/dataModel/cart'
// import Services
import { ProductApiService } from '../../shared/CRUD/product-api-service.service'
import { ImageService } from '../../shared/services/image-service.service'
import { CartApiServiceService } from '../../shared/CRUD/cart-api-service.service'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-bikepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productpage.component.html',
  styleUrl: './productpage.component.scss',
  providers: [ProductApiService, ImageService, CartApiServiceService]

})
export class ProductPageComponent {
  
  flagNotLogged: boolean =  false
  productData: any
  flagLoad: boolean = false

  constructor(
    private route: ActivatedRoute, 
    private cartService: CartApiServiceService,
    private productService: ProductApiService,
    private imgService: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
      this.fetchProductData()
  }

  backPage(){
    window.history.back()
  }

  sendCart(){
    let newCart : Cart = new Cart()
    let valuer: number

    if(sessionStorage.getItem('id') != null){
      valuer = Number(sessionStorage.getItem('id'))
      this.router.navigate(['/cart'])
    }else if(localStorage.getItem('id') != null)
      valuer = Number(localStorage.getItem('id'))
    else{
      this.flagNotLogged = true
      return console.error("error")
    }

    newCart = {
      CustomerId: valuer,
      ProductId: this.productData.productId,
      Quantity:1
    }
  
    this.cartService.postCart(newCart).subscribe({
      next:() => { },
      error:(err:Error)=>{ console.error(err) }
    })
  }

  private fetchProductData() {
    this.route.params.subscribe(params => {
      const productId = +params['productId']

      if (!isNaN(productId)) {

        this.productService.getProductById(productId).subscribe({
          next: productData => {
            if(productData){
              this.productData = productData
              this.productData.thumbNailPhoto = this.imgService.blobToUrl(this.productData.thumbNailPhoto)
            }
            this.flagLoad = true
          },
          error: err => { console.error('Error fetching product:', err) }
        })
      } else console.error('Invalid productId:', params['productId'])
    })
  }
}