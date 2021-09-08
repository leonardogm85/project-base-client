import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faSave, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { Fornecedor } from 'src/app/models/fornecedor';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { TipoPessoaService } from 'src/app/services/tipo-pessoa.service';
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

  model: Fornecedor;

  descricaoAtivo: string = StringValidation.empty;
  descricaoTipoPessoa: string = StringValidation.empty;

  constructor(
    private _fornecedorService: FornecedorService,
    private _tipoPessoaService: TipoPessoaService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._fornecedorService.obter(this._route.snapshot.paramMap.get('id'))
      .subscribe(m => {
        this.model = m;
        this.descricaoAtivo = this.model.ativo ?
          'Registro ativo' :
          'Registro inativo';
        this.descricaoTipoPessoa = this._tipoPessoaService.obterSelecaoPorId(this.model.tipoPessoa).data[0].value;
      });
  }

}
