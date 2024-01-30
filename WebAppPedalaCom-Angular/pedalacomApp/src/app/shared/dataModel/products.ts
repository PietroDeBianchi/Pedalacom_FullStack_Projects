export class Product {
    productId: number = 0
    name: string = ''
    productNumber: string = ''
    color: string = ''
    standardCost: number = 0
    listPrice: number = 0
    size: string = ''
    weight: number = 0
    productCategoryId: number = 0
    thumbnailPhotoFileName: string = ''
    modifiedDate: Date = new Date()
    SellStartDate: Date = new Date()
    ProductModelId: number = 0
}
 
export class ProductCategory {
    productCategoryID: number = 0
    parentProductCategoryID: number = 0
    name: string = ''
    rowguid: string = ''
    modifiedDate: Date = new Date()
}


export class ProductModel {
    productModelID: number = 0
    name: string = ''
    catalogDescription: string = ''
    rowguid: string = ''
    modifiedDate: Date = new Date()
}

export class infoProduct {
    productName: string = ""
    productId: number = 0
    productPrice: number = 0.0
    photo: any = ""
    productCategory: string = ""
}

export class fullInfo extends infoProduct{
    productNumber: string = ''
    color: string = ''
    standardCost: number = 0
    size: string = ''
    weight: number = 0
    productCategoryId: number = 0
    modifiedDate: Date = new Date()
}