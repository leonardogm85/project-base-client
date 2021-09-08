import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, switchMap } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSave, faChevronLeft, faList } from '@fortawesome/free-solid-svg-icons';

import { Role } from 'src/app/models/role';
import { MenuClaim } from 'src/app/models/menu-claim';
import { PapelService } from 'src/app/services/papel.service';
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

  model: Role;
  menus: MenuClaim[];

  descricaoAtivo: string = StringValidation.empty;

  constructor(
    private _papelService: PapelService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._papelService.obter(this._route.snapshot.paramMap.get('id')).pipe(
      tap(m => {
        this.model = m;
        this.descricaoAtivo = this.model.active ?
          'Registro ativo' :
          'Registro inativo';
      }),
      switchMap(() => this._papelService.obterMenusAutorizados(this.model.id)),
    ).subscribe(m => this.menus = m);
  }

}
