import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PanelManagerService {
  private source = new BehaviorSubject<string>('add')
  action$ = this.source.asObservable()

  setAction(action: string) {
    this.source.next(action)
  }
  
}
