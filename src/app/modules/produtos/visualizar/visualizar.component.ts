import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { tap, switchMap } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { UnidadeMedidaService } from 'src/app/services/unidade-medida.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { MaskTypes } from 'src/app/common/mask/mask-types';
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

  model: Produto;

  descricaoAtivo: string = StringValidation.empty;
  descricaoUnidadeMedida: string = StringValidation.empty;
  descricaoFornecedor: string = StringValidation.empty;

  maskValor: string = MaskTypes.decimal;

  constructor(
    private _produtoService: ProdutoService,
    private _unidadeMedidaService: UnidadeMedidaService,
    private _fornecedorService: FornecedorService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._produtoService.obter(this._route.snapshot.paramMap.get('id')).pipe(
      tap(m => {
        this.model = m;
        this.descricaoAtivo = this.model.ativo ?
          'Registro ativo' :
          'Registro inativo';
      }),
      switchMap(() => this._unidadeMedidaService.obterSelecaoPorIdentidades(this.model.unidadeMedidaId)),
      tap(r => this.descricaoUnidadeMedida = r.data[0].value),
      switchMap(() => this._fornecedorService.obterSelecaoPorIdentidades(this.model.fornecedorId))
    ).subscribe(r => this.descricaoFornecedor = r.data[0].value);
  }

}
