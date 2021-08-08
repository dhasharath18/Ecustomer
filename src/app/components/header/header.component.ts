import { Component, OnInit, Input } from '@angular/core';
import { ItemListService } from '../../providers/item-list.service';
import { UtilsService } from '../../providers/utils.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() data: any;
  constructor(
    private itemListService: ItemListService,
    private router: Router,
    private authService: AuthService,
    private utils: UtilsService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  openCart() {
    this.router.navigateByUrl('/cart');
  }
}
