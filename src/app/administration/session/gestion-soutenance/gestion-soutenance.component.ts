import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from '../session.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-gestion-soutenance',
  templateUrl: './gestion-soutenance.component.html',
  styleUrls: ['./gestion-soutenance.component.css'],
})
export class GestionSoutenanceComponent implements OnInit {
  sessionId: string;
  selectedSession: Session;
  constructor(
    private route: ActivatedRoute,
    private readonly sessionService: SessionService,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      this.sessionId = params.sessionId;
      this.sessionService.fetchSessionById(this.sessionId).subscribe((data) => {
        this.selectedSession = data;
      });
    });
  }
  onNavigateCreate() {
    this.router.navigate([
      `/Administrateur/session/soutenances/${this.sessionId}/add`,
    ]);
  }

  ngOnInit(): void {}
}
