import { Component, OnInit } from '@angular/core';

import { tap, filter, switchMap } from 'rxjs/operators';

import { AccessMenu } from 'src/app/models/access-menu';
import { ContaService } from 'src/app/services/conta.service';
import { MenuService } from 'src/app/services/menu.service';
import { AuthService } from 'src/app/services/auth.service';
import { Guid } from 'src/app/common/guid/guid';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _collapse: boolean;

  menus: AccessMenu[];

  userName: string;
  isAuthenticated: boolean;

  get collapsed(): boolean {
    return this._collapse;
  }
  get expanded(): boolean {
    return !this._collapse;
  }

  constructor(
    private _contaService: ContaService,
    private _menuService: MenuService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.onAuthenticated().pipe(
      tap(a => this.isAuthenticated = a),
      filter(() => this.isAuthenticated),
      switchMap(() => this._menuService.obterMenusUsuarioAutenticado()),
      tap(m => m.forEach(c => c.code = Guid.newGuid()))
    ).subscribe(m => {
      this.menus = m;
      this.userName = this._authService.getUserName();
      this.markAsCollapsed();
    });
  }

  onCollapse(): void {
    this._collapse = !this._collapse;
  }

  markAsCollapsed(): void {
    this._collapse = true;
  }

  onLogout(): void {
    this._contaService.logout();
  }

}
