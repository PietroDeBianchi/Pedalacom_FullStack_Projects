import { Component, inject, TemplateRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { LogApiServiceService } from '../../../shared/CRUD/log-api-service.service'
// IMPORT DATA MODEL
import { LogError } from '../../../shared/dataModel/logError'

@Component({
  selector: 'app-view-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-error.component.html',
  styleUrls: ['./view-error.component.scss'],
  providers: [LogApiServiceService]
})
export class ViewErrorComponent {

  logErrors: LogError[] = []
  paginationInfo : any
  totalPage: number = 1
  pageNumber : number = 1
  page: number = 1
  private modalService = inject(NgbModal)
	closeResult = ''

  constructor(private logErrorService: LogApiServiceService) {}

  ngOnInit() {
    this.getErrors(this.pageNumber)
  }

  getErrors(pageNumber : number = 1) {
    
    this.logErrorService.getLogErrors(pageNumber).subscribe({
      next: (data : any) =>{
        this.logErrors = data.errorLog
        if(data.paginationInfo){
          this.paginationInfo = data.paginationInfo
          this.totalPage = data.paginationInfo.totalPages
          this.pageNumber = data.paginationInfo.pageNumber
        }
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
    if (!this.paginationInfo || !this.paginationInfo.pageNumber || !this.paginationInfo.totalPages) {
      console.error("Le informazioni sulla paginazione non sono valide.", this.paginationInfo)
      return
    }
      // Update the local page number
      this.getErrors(page)
  }

  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => { this.closeResult = `Closed with: ${result}` },
			(reason) => { this.closeResult = `Dismissed ${this.getDismissReason(reason)}` },
		)
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC'
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop'
			default:
				return `with: ${reason}`
		}
	}
}
