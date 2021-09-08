import { Directive, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Access } from 'src/app/models/access.enum';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appAuthorizedRead]'
})
export class AuthorizedReadDirective implements OnInit {

  private _hasView: boolean = false;

  constructor(
    private _authService: AuthService,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const authorized = this._authService.isAuthorized(this._route.snapshot.data.item, Access.read);

    if (authorized && !this._hasView) {
      this._viewContainer.createEmbeddedView(this._templateRef);
      this._hasView = true;
    } else if (!authorized && this._hasView) {
      this._viewContainer.clear();
      this._hasView = false;
    }
  }

}
