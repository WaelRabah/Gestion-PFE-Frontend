import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Session } from '../../session.model';
import { Soutenance } from '../models/soutenance.model';
import { SoutenanceService } from '../services/soutenance.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  @Input() index: number;
  @Input() selectedSoutenance: number;
  @Input() selectedSession: Session;
  @Input() item: Soutenance;
  @Input() original: any;
  @Input() sessionId: string;
  constructor(private router: Router, private service: SoutenanceService) {}
  onNavigateModify() {
    this.router.navigate([
      `/Administrateur/session/soutenances/${this.sessionId}/modify/${this.original._id}`,
    ]);
  }
  removeSoutenanceFromSession() {
    Swal.fire({
      title: 'Tu es sure?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprime la session!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.removeSoutenanceFromSession(
          this.original,
          this.selectedSession
        );
        Swal.fire(
          'Supprimée!',
          'La soutenance a été supprimée de la session',
          'success'
        )
        this.router.navigate([
          `/Administrateur/session`,
        ]);
      }
    })
  
  }
  ngOnInit(): void {}
}
