import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service'
import { Product } from '../../../shared/dataModel/products'
import { ImageService } from '../../../shared/services/image-service.service'
import { Router } from '@angular/router'
import { NavigationExtras, RouterModule } from '@angular/router'



@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.scss',
  providers: [ProductApiService]
})
export class AddProductsComponent {
  
  myImg: string = ''
  okStatus: boolean = false
  showMessage:boolean = false
  showForm: boolean = true
  allValueOk: boolean = false
  errorList: string[] = []
  priceRegex = /^\d+\,\d{2,}$/

  constructor(private productService: ProductApiService, private imgService: ImageService, private router: Router){}

  getFile(event: any) {
		const img = event.target.files[0]
		this.imgService.imgToBlob(img).then((blob) => {
			return this.imgService.blobToBase64(blob)
		}).then((base64) => {
			this.myImg = base64
		})
	}

  reload(){
    window.location.reload()
  }

  checkValue(Category: string, Name: string, Color: string, Code: string, ListPrice: string, StandardPrice: string, Image: string, Model: string, Weight: string, Size: string, Description: string) {
    this.allValueOk = true
    this.errorList = []

    if (!Name.match(/^([a-zA-Z\u00C0-\u00FF\s]{3,}\s?)+$/)) {
      this.allValueOk = false
      if (Name !== "") 
        this.errorList.push("Il nome non è valido")
    }

    if (!Code.match(/^.{10,}$/)) {
      this.allValueOk = false
      if (Code !== "") 
        this.errorList.push("Il codice è formato in questo modo BK-R89R-58")
    }

    if (!this.priceRegex.test(StandardPrice)) {
      this.allValueOk = false
      if (StandardPrice !== "") 
        this.errorList.push("Il prezzo attuale è sbagliato, controlla che il formato sia 123,00")
    }

    if (!this.priceRegex.test(ListPrice)) {
      this.allValueOk = false
      if (ListPrice !== "") 
        this.errorList.push("Il prezzo di listino è sbagliato, controlla che il formato sia 123,00")
    }

    if (!this.priceRegex.test(Weight)) {
      this.allValueOk = false
      if (Weight !== "") 
        this.errorList.push("Il peso è sbagliato, controlla che il formato sia 1100,00")
    }

    if (!Model.match(/.{4,}/)) {
      this.allValueOk = false
      if (Model !== "") 
        this.errorList.push("Il modello non è valido")
    }

    if (!Description.match(/.{10,}/)) {
      this.allValueOk = false
      if (Description !== "") 
        this.errorList.push("La descrizione dev'essere più lunga")
    }

    if (Color === "none") 
      this.allValueOk = false

    if (Category === "none") 
      this.allValueOk = false

    if (Size === "none") 
      this.allValueOk = false
    
  }

  sendProduct(Category: string, Name: string, Color: string, ProductNumber: string, ListPrice: string, StandardCost: string, Weight: string, Size: string, Description: string, Model: string){
    let newProduct: Product = new Product()
    newProduct = {
      productId: 0,
      name : Name,
      productNumber: ProductNumber,
      color: Color,
      standardCost : parseInt(StandardCost),
      listPrice : parseInt(ListPrice),
      size : Size,
      productCategoryId : parseInt(Category),
      thumbnailPhotoFileName: this.myImg,
      weight : parseInt(Weight),
      modifiedDate : new Date(), 
      SellStartDate : new Date(),
      ProductModelId: 0
    }
    
    this.productService.postProducts(newProduct, [Model, Description]).subscribe({
      next: () => {
        this.showForm = false
        this.showMessage = true
        this.okStatus = true 
      },
      error: () =>{
        this.showForm = false
        this.showMessage = true
        this.okStatus = false
      }
    })
  }
}
