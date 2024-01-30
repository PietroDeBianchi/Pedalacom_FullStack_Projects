import { Component, TemplateRef, inject, OnInit, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgbModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { ProductsCardComponent } from '../../model/productsCard/products-card.component'
import { ProductApiService } from '../../shared/CRUD/product-api-service.service'
import { infoProduct } from '../../shared/dataModel/products'
import { ImageService } from '../../shared/services/image-service.service'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'

@Component({
	selector: 'app-products',
	standalone: true,
	imports: [CommonModule, NgbModule, ProductsCardComponent],
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
	providers: [ProductApiService, ImageService]
})
export class SearchComponent {

	searchData : string = ""
	filterParams : any[] = []
	myImg: any
	filterView: string[] = [] 
	products: infoProduct[] = []
	isOffcanvasOpen: boolean = false
	valueFilter: string = 'In Evidenza'
	btnID: string = ''
	page: number = 1
	totalPage: number = 49
	pageNumber : number = 1
  	paginationInfo: any
	flagLoad: boolean = true

	constructor(
		private productService: ProductApiService, 
		private imgService: ImageService, 
		private offcanvasService: NgbOffcanvas, 
		private route : ActivatedRoute,
		private router: Router
	) { }
	
	ngOnInit(): void {
		this.route.paramMap.subscribe(params => {
			const param = params.get('searchParam')
			if(param) this.searchData = param
		})
		this.GetProducts(this.searchData, this.pageNumber, this.valueFilter , this.filterParams)
	}

	populateFilter(param : string){
		let obj : any = {"categoryName" : param}
		this.pageNumber = 1
		this.products = []

		if (this.filterParams.find(x => x.categoryName === obj.categoryName))
			this.filterParams.splice(this.filterParams.findIndex(x => x.categoryName === obj.categoryName),1)
		else this.filterParams.push(obj)
		
		this.GetProducts(this.searchData, this.pageNumber,this.valueFilter, this.filterParams, )
	}

	navigateToProductPage(productId: number) {
		this.router.navigate(['/product', productId])
	}
	
	populateFilterView(str: string){
		if(this.filterView.includes(str))
			this.filterView.splice(this.filterParams.indexOf(str), 1)
		else this.filterView.push(str)
	}
	
	open(content: TemplateRef<any>) {

		this.offcanvasService.open(content, { position: 'bottom', ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
			(result) => this.toggleIcon(),
			(reason) => this.toggleIcon(),
		)
		this.toggleIcon()
	}

	close() {
		this.offcanvasService.dismiss()
	}

	toggleIcon() {
		this.isOffcanvasOpen = !this.isOffcanvasOpen
	}

	mobileFilterData(btn: HTMLButtonElement, id: string) {
		this.valueFilter = btn.value
		this.btnID = id
	}

	GetProducts(searchData: string, pageNumber: number = 1, order : string, filterParams: any) {
		const productObservable = filterParams && filterParams.length > 0 ?
			this.productService.getProductFiltered(searchData, pageNumber, order, filterParams) :
			this.productService.getProductFiltered(searchData, pageNumber,order)
		
		productObservable.subscribe({
			next: (data: any) => {
				if (data) {
					if(data.products){
						data.products.forEach((e: any) => e.photo = this.imgService.blobToUrl(e.photo))
						this.products = data.products
					}
					if(data.paginationInfo) {
						this.paginationInfo = data.paginationInfo
						this.totalPage = data.paginationInfo.totalPages
						this.page = data.paginationInfo.pageNumber
					}
				}
				this.paginationInfo = data ? data.paginationInfo : null
			},
			error: (err: any) => {
				console.error(err)
			}
		})
	}

	getPages(): number[] {
		const { pageNumber, totalPages } = this.paginationInfo || {}
		const allPages = Array.from({ length: totalPages }, (_, i) => i + 1)
		let start = Math.max(1, pageNumber - 2)
		let end = Math.min(totalPages, pageNumber + 2)

		if (!pageNumber || !totalPages) {
			return []
		}
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
		const { searchData, filterParams } = this

		if (!this.paginationInfo || !this.paginationInfo.pageNumber || !this.paginationInfo.totalPages) 
			return console.error("Le informazioni sulla paginazione non sono valide.", this.paginationInfo)

		this.GetProducts(searchData, page, this.valueFilter,  filterParams)
	}
  
	// getFile(event: any) {
	// 	const img = event.target.files[0]
	// 	this.imgService.imgToBlob(img).then((blob) => {
	// 		return this.imgService.blobToBase64(blob)
	// 	}).then((base64) => this.myImg = this.imgService.blobToUrl(base64.split(",")[1]))
	// }

	categoryList = [
		{ data: "Mountain Bikes", ita: "Mountain Bikes" },
		{ data: "Road Bikes", ita: "Bici da strada" },
		{ data: "Touring Bikes", ita: "Bici da turismo" }
	]

	accessoriesList = [
		{ data: "Bike Stands", ita: "Portabici" },
		{ data: "Bottles and Cages", ita: "Borraccia & Porta borraccia" },
		{ data: "Cleaners", ita: "kit di pulizia" },
		{ data: "Locks", ita: "Lucchetti" },
		{ data: "Lights", ita: "Luci" },
		{ data: "Pumps", ita: "Pompe" }
	]

	clothingsList = [
		{ data: "Bib-Shorts", ita: "Pantaloncini con bretelle" },
		{ data: "Gloves", ita: "Guanti" },
		{ data: "Headsets", ita: "Cuffie" },
		{ data: "Helmets", ita: "Caschi" },
		{ data: "Hydration Packs", ita: "Zaini idrici" },
		{ data: "Jerseys", ita: "Maglie" },
		{ data: "Panniers", ita: "Borse laterali" },
		{ data: "Shorts", ita: "Pantaloncini" },
		{ data: "Socks", ita: "Calze" },
		{ data: "Tights", ita: "Collant" },
		{ data: "Vests", ita: "Gillet" }
	]

	componentsList = [
		{ data: "Bottom Brackets", ita: "Staffe inferiori" },
		{ data: "Brakes", ita: "Freni" },
		{ data: "Caps", ita: "Tappi" },
		{ data: "Chains", ita: "Catene" },
		{ data: "Guarniture", ita: "Guarniture" },
		{ data: "Derailleurs", ita: "Deragliatori" },
		{ data: "Fenders", ita: "Parafanghi" },
		{ data: "Forks", ita: "Forcelle" },
		{ data: "Handlebars", ita: "Manubri" },
		{ data: "Pedals", ita: "Pedali" },
		{ data: "Saddles", ita: "Selle" },
		{ data: "Wheels", ita: "Cerchioni" },
		{ data: "Tires and Tubes", ita: "pneumatici e budelli" },
		{ data: "Touring Frames", ita: "Telai da turismo" },
		{ data: "Road Frames", ita: "Telai da strada" },
		{ data: "Mountain Frames", ita: "Telai da mountain bike" }
	]

}

