import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, switchMap } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSave, faChevronLeft, faList, faBars } from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/models/user';
import { MenuClaim } from 'src/app/models/menu-claim';
import { UsuarioService } from 'src/app/services/usuario.service';
import { StringValidation } from 'src/app/common/validations/helpers/string-validation';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.component.html',
  styleUrls: ['./visualizar.component.css']
})
export class VisualizarComponent implements OnInit {

  iconSearch: IconDefinition = faSearch;
  iconSave: IconDefinition = faSave;
  iconReturn: IconDefinition = faChevronLeft;
  iconAuthorize: IconDefinition = faList;
  iconRole: IconDefinition = faBars;

  model: User;
  menus: MenuClaim[];
  papeis: string[];

  descricaoAtivo: string = StringValidation.empty;

  constructor(
    private _usuarioService: UsuarioService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._usuarioService.obter(this._route.snapshot.paramMap.get('id')).pipe(
      tap(m => {
        this.model = m;
        this.descricaoAtivo = this.model.active ?
          'Registro ativo' :
          'Registro inativo';
      }),
      switchMap(() => this._usuarioService.obterMenusAutorizados(this.model.id)),
      tap(m => this.menus = m),
      switchMap(() => this._usuarioService.obterNomePapeis(this.model.id)),
    ).subscribe(m => this.papeis = m);
  }

}
