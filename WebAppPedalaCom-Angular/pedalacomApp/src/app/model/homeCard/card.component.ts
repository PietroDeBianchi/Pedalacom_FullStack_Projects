import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
// IMPORT SERVICES
import { ImageService } from '../../shared/services/image-service.service'


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [ImageService]
})
export class CardComponent {

  @Input() product: any

  constructor(private imgService: ImageService) {}

  ngOnInit(): void {
    this.product.thumbNailPhoto = this.imgService.blobToUrl(this.product.thumbNailPhoto)
  }
}