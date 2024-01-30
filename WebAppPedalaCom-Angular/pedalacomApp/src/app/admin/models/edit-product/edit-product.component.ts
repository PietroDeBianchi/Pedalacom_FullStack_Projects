import { Component, Input } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { ProductApiService } from '../../../shared/CRUD/product-api-service.service'
import { ImageService } from '../../../shared/services/image-service.service'
import { Product } from '../../../shared/dataModel/products'
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  providers: [ProductApiService]
})

export class EditProductComponent {

  @Input () productId: number = 0
  modaleId : string = ''
  myImg: string = ''
  okStatus: boolean = false
  showMessage:boolean = false
  product: any
  allValueOk: boolean = false
  errorList: string[] = []
  priceRegex = /^\d+\,\d{2,}$/

  productEdit : any = {
    name: '',
    productNumber:'',
    color:'',
    standardCost: 0,
    listPrice: 0,
    size: '',
    weight: 0,
    productCategoryId:0,
    thumbnailPhotoFileName: '',
    modifiedDate:new Date(),
    model: '', 
    desc: '',
    modelId: 0,
    descId: 0
  }

  constructor(
    private productService: ProductApiService, 
    private imgService: ImageService
  ){}

  checkValue(Category: string, Name: string, Color: string, Code: string, ListPrice: string, StandardPrice: string, Model: string, Weight: string, Size: string, Description: string) {
    this.allValueOk = true
    this.errorList = []

    if (!Name.match(/^.{3,}$/)) {
      this.allValueOk = false
      if (Name !== "") 
        this.errorList.push("Il nome non è valido")
    }

    if (!Code.match(/^.{10,}$/)) {
      this.allValueOk = false
      if (Code !== "") 
        this.errorList.push("Il codice è formato in questo modo BK-R89R-58")
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

  reload(){
    window.location.reload()
  }
  getFile(event: any) {
		const img = event.target.files[0]
		this.imgService.imgToBlob(img).then((blob) => {
			return this.imgService.blobToBase64(blob)
		}).then((base64) => {
			this.myImg = base64
		})
	}

  postProduct(Category: string, Name: string, Color: string, ProductNumber: string, ListPrice: string, StandardCost: string, Weight: string, Size: string, Desc: string, Model: string){
    let newProduct: Product = new Product()
    
    newProduct = {
      productId : this.productId,
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
      SellStartDate: new Date(),
      ProductModelId: this.productEdit.modelId,
    }

    this.productService.putProducts(this.productId, this.productEdit.descId, newProduct, Desc, Model).subscribe({
      next: () => {
        this.okStatus = true 
        this.reload()
      },
      error: (err:any) =>{
        this.okStatus = false
        console.error("errore", err)
      }
    })
  }

  getProductByID(productId: number){

    this.productService.getProductById(productId).subscribe({
      next: (data:any) => {
        this.modaleId = productId.toString()
        this.myImg = data.thumbNailPhoto
        
        this.productEdit = {
          name: data.name,
          productNumber:data.productNumber,
          color:data.color,
          standardCost: data.standardCost,
          listPrice: data.listPrice,
          size: data.size,
          weight:data.weight,
          productCategoryId:data.productCategoryId,
          thumbNailPhoto: this.imgService.blobToUrl(data.thumbNailPhoto),
          modifiedDate:new Date(),
          desc: data.productModel != null ? data.productModel.productModelProductDescriptions[0].productDescription.description : null,
          model: data.productModel != null ? data.productModel.name : null,
          modelId: data.productModel != null ? data.productModel.productModelId : null,
          descId: data.productModel != null ? data.productModel.productModelProductDescriptions[0].productDescription.productDescriptionId : null
        }
      },
      error: (err:Error) => { console.error(err) }
    })
  }

  
}
