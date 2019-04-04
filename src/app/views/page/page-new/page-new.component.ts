import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user.model.client';
import {Website} from '../../../models/website.model.client';
import {Page} from '../../../models/page.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {UserService} from '../../../services/user.service.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  user: User = new User('', '', '', '', '', '');
  website: Website = new Website('', '', '', '');
  pages: Page[] = [];
  newPage: Page = new Page('', '', '', '');

  constructor(private webService: WebsiteService, private userService: UserService,
              private pageService: PageService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.findUserById(params['uid']).subscribe(
          (user: any) => {
              this.user = new User(user._id, user.username, user.password, user.firstName, user.lastName, user.email);
          }
      );
      this.webService.findWebsiteById(params['websiteId']).subscribe(
          (website: any) => {
            this.website = new Website(website._id, website.name, website.developerId, website.description);
          }
      );
      this.pageService.findPageByWebsiteId(params['websiteId']).subscribe(
          (pages: any[]) => {
              for(var i = 0; i < pages.length; i++) {
                  const page = pages[i];
                  const newPage = new Page(page._id, page.name, page.websiteId, page.description);
                  this.pages.push(newPage);
              }
          }
      );
    });
    this.newPage = new Page('', '', this.website.websiteId, '');
  }

  addPage() {
    if (this.newPage.name && this.newPage.description) {
      this.pageService.createPage(this.website.websiteId, this.newPage).subscribe(
          (page: any) => {
            this.newPage = new Page(page._id, page.name, page.websiteId, page.description);
            this.router.navigate(['/profile/' + this.user.uid + '/website/' + this.website.websiteId + '/page']);
          }
      );
    } else {
      alert('Please enter page name and title!');
    }
  }

}
