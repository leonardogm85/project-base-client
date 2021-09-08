import { Injectable } from '@angular/core';
import { KeyValue, } from '@angular/common';

import { TipoPessoa } from '../models/tipo-pessoa.enum';
import { SelectResult } from '../common/selects/select-result';

@Injectable({
  providedIn: 'root'
})
export class TipoPessoaService {

  private _data: KeyValue<number, string>[] = [
    { key: TipoPessoa.pessoaFisica, value: 'Pessoa física' },
    { key: TipoPessoa.pessoaJuridica, value: 'Pessoa jurídica' }
  ];

  obterSelecaoPorId(key: number): SelectResult {
    const data = this._data.filter(t => t.key === key);
    return {
      recordsFiltered: data.length,
      data: data
    };
  }

  obterSelecao(): SelectResult {
    return {
      recordsFiltered: this._data.length,
      data: this._data
    };
  }

}
