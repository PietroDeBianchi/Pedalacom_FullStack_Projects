import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ProductSales } from '../../../shared/dataModel/productSales'
import { LogApiServiceService } from '../../../shared/CRUD/log-api-service.service'
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-view-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-log.component.html',
  styleUrl: './view-log.component.scss',
  providers: [LogApiServiceService]
})
export class ViewLogComponent {

  producsSales: ProductSales[] = []
  paginationInfo : any
  totalPage: number = 1
  pageNumber : number = 1
  productId: number = 1
  page: number = 1
  showPagination: boolean = true

  constructor(private productSalesService: LogApiServiceService) {}

  ngOnInit() {
    this.getSalesDetails(this.pageNumber)
  }

  getSalesDetails(pageNumber : number = 1) {

    this.productSalesService.getProductsSales(pageNumber).subscribe({
      next: (data : any) =>{
        this.producsSales = data.orderDetails
        this.showPagination = true
        if(data.paginationInfo){
          this.paginationInfo = data.paginationInfo
          this.totalPage = data.paginationInfo.totalPages
          this.pageNumber = data.paginationInfo.pageNumber
        }
      }, 
      error: (err : any) => { console.error(err) } 
    })
  }

  getSalesDetailsID(productId : number) {
    this.productId = productId
    this.producsSales = []
    this.showPagination = false

    this.productSalesService.getProductSalesId(productId).subscribe({
      next: (data : any) =>{
        this.producsSales = [data]
        this.showPagination = false
      }, 
      error: (err : any) => { console.error(err) } 
    })
  }

  getPages(): number[] {
    const { pageNumber, totalPages } = this.paginationInfo || {}
    const allPages = Array.from({ length: totalPages }, (_, i) => i + 1)
    let start = Math.max(1, pageNumber - 2)
    let end = Math.min(totalPages, pageNumber + 2)

    if (!pageNumber || !totalPages) 
      return []

    this.pageNumber = this.paginationInfo.pageNumber

    
    if (pageNumber <= 2) 
      // Se siamo nelle prime due pagine, visualizza le prime 5 pagine
      end = Math.min(5, totalPages)
     else if (pageNumber >= totalPages - 1) 
      // Se siamo nelle ultime due pagine, visualizza le ultime 5 pagine
      start = Math.max(1, totalPages - 4)
    
    return allPages.slice(start - 1, end)
  }

  changePage(page: number): void {
    if (!this.paginationInfo || !this.paginationInfo.pageNumber || !this.paginationInfo.totalPages) 
      return console.error("Le informazioni sulla paginazione non sono valide.", this.paginationInfo)

    this.getSalesDetails(page)
  }

}
