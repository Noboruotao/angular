import { Component } from '@angular/core';

import {
  faBars,
  faSearch,
  faComment,
  faBell,
  faThLarge,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faBars = faBars;
  faSearch = faSearch;
  faComment = faComment;
  faBell = faBell;
  faThLarge = faThLarge;
}
