import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ChallengeService } from '../../../services/challenge.service';
import { GlobalService } from '../../../services/global.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-challengeparticipate',
  templateUrl: './challengeparticipate.component.html',
  styleUrls: ['./challengeparticipate.component.scss']
})
export class ChallengeparticipateComponent implements OnInit {
  isLoggedIn = false;
  challenge: any;
  routerPublic: any;
  isParticipated: any;
  isActive: any;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
              private challengeService: ChallengeService, private globalService: GlobalService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    this.routerPublic = this.router;
    this.challengeService.currentChallenge.subscribe(challenge => {
      this.challenge = challenge;
      this.isActive = this.challenge['is_active'];
    });
    this.challengeService.currentParticipationStatus.subscribe(status => {
      this.isParticipated = status;
      if (status) {
        const REDIRECT = this.globalService.getData(this.globalService.redirectStorageKey);
        if (REDIRECT && REDIRECT['path']) {
          this.globalService.deleteData(this.globalService.redirectStorageKey);
          this.router.navigate([REDIRECT['path']]);
        } else {
          console.log('navigating to /submit', status);
          this.router.navigate(['../submit'], {relativeTo: this.route});
        }
      }
    });
  }

}