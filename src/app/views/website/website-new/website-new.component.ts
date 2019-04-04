import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  user: User = new User('', '', '', '', '', '');
  websites: Website[] = [];
  newWebsite: Website;

  constructor(private webService: WebsiteService, private userService: UserService,
              private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.findUserById(params['uid']).subscribe(
          (user: any) => {
              this.user = new User(user._id, user.username, user.password, user.firstName, user.lastName, user.email);
          }
      );
      this.webService.findWebsiteByUser(params['uid']).subscribe(
          (websites: any[]) => {
              var website;
              for(var i = 0; i < websites.length; i++) {
                  website = websites[i];
                  var newWeb = new Website(website._id, website.name, website.developerId, website.description);
                  this.websites.push(newWeb);
              }
          }
      );
      this.newWebsite = new Website('', '', this.user.uid, '');
    });
  }

  newWeb() {
    if (this.newWebsite.name && this.newWebsite.description) {
      this.webService.createWebsite(this.user.uid, this.newWebsite).subscribe(
          (data: any) => {
            this.router.navigate(['/profile/' + this.user.uid + '/website']);
          }
      );
    } else {
      alert('Please enter name and description!');
    }

  }

}
