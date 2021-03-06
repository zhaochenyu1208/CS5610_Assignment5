import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user.model.client';
import {Website} from '../../../../models/website.model.client';
import {Page} from '../../../../models/page.model.client';
import {Widget} from '../../../../models/widget.model.client';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {WebsiteService} from '../../../../services/website.service.client';
import {UserService} from '../../../../services/user.service.client';
import {PageService} from '../../../../services/page.service.client';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  user: User = new User('', '', '', '', '', '');;
  website: Website = new Website('', '', '', '');
  page: Page = new Page('', '', '', '');
  widgets: Widget[] = [];
  currWidget: Widget = new Widget('', '', '',
      '', '', '', '', '', true, 1, '');
  newWidget: Widget = new Widget('', '',
      '', '', '', '', '', '',  true, 1, '');

  constructor(private webService: WebsiteService, private userService: UserService, private sanitizer: DomSanitizer,
              private pageService: PageService, private widgetService: WidgetService, private route: ActivatedRoute,
              private router: Router) {}

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
      this.pageService.findPageById(params['pageId']).subscribe(
          (page: any) => {
            this.page = new Page(page._id, page.name, page.websiteId, page.description);
            this.newWidget = new Widget('', 'HEADING', this.page.pageId, '', '', '', '', '',
                true, 1, '');
          }
      );
      this.widgetService.findWidgetsByPageId(params['pageId']).subscribe(
          (widgets: any[]) => {
              for(var i = 0; i < widgets.length; i++) {
                  const widget = widgets[i];
                  const newWid = new Widget(widget._id, widget.type,
                      widget.pageId, widget.size, widget.text, widget.width,
                      widget.url, widget.name, widget.formatted, widget.rows, widget.placeholder);
                  this.widgets.push(newWid);
              }
          }
      );
      this.widgetService.findWidgetById(params['widgetId']).subscribe(
          (widget: any) => {
              if (widget.message !== 'Widget not found!') {
                  this.currWidget = new Widget(widget._id, widget.type, widget.pageId,
                      widget.size, widget.text,
                      widget.width, widget.url, widget.name,  widget.formatted, widget.rows, widget.placeholder);
                  this.newWidget.text = this.currWidget.text;
                  this.newWidget.size = this.currWidget.size;
              }
          }
      );
    });
  }

  updateWidget() {
    if (this.currWidget.text !== '') {
      this.currWidget.text = this.newWidget.text;
      this.currWidget.size = this.newWidget.size;
      if (this.currWidget.text !== '') {
        this.widgetService.updateWidget(this.currWidget.widgetId, this.currWidget).subscribe(
            (data: any) => {
              this.router.navigate(['/profile/' + this.user.uid +
              '/website/' + this.website.websiteId + '/page/' + this.page.pageId + '/widget']);
            }
        );
      } else {
        alert('Text cannot be empty!');
      }
    } else {
      if (this.newWidget.text !== '') {
        this.widgetService.createWidget(this.page.pageId, this.newWidget).subscribe(
            (data: any) => {
              this.router.navigate(['/profile/' + this.user.uid +
              '/website/' + this.website.websiteId + '/page/' + this.page.pageId + '/widget']);
            }
        );
      } else {
        alert('Text cannot be empty!');
      }
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.currWidget.widgetId).subscribe(
        (data: any) => {
            this.router.navigate(['/profile/' + this.user.uid +
            '/website/' + this.website.websiteId + '/page/' + this.page.pageId + '/widget']);
        }
    );
  }

}
