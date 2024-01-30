import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { infoProduct } from '../../shared/dataModel/products'

@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.scss'
})
export class ProductsCardComponent {

  // Recive Input product from father Component products.component
  @Input() product: infoProduct = new infoProduct
}
