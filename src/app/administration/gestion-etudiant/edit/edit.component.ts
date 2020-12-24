import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  data:any;
  action: Subject<any> = new Subject();

  constructor(public modalRef: MDBModalRef) {}
  onYesClick() {
    this.action.next('yes');
    this.modalRef.hide();
  }
  ngOnInit(){
    console.log(this.data);
  }

}
