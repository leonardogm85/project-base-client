import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { UnidadeMedida } from 'src/app/models/unidade-medida';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';
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

  model: UnidadeMedida;

  descricaoAtivo: string = StringValidation.empty;

  constructor(
    private _unidadeMedidaService: UnidadeMedidaService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._unidadeMedidaService.obter(this._route.snapshot.paramMap.get('id'))
      .subscribe(m => {
        this.model = m;
        this.descricaoAtivo = this.model.ativo ?
          'Registro ativo' :
          'Registro inativo';
      });
  }

}
