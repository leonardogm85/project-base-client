import { Component, OnInit } from '@angular/core';

import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _selectConfig: NgSelectConfig) { }

  ngOnInit(): void {
    this.replaceDefaultSelectConfig(this._selectConfig);
  }

  replaceDefaultSelectConfig(selectConfig: NgSelectConfig): void {
    selectConfig.placeholder = 'Selecione';
    selectConfig.notFoundText = 'Não encontrado';
    selectConfig.typeToSearchText = 'Digite para pesquisar';
    selectConfig.addTagText = 'Adicione o item';
    selectConfig.loadingText = 'Carregando...';
    selectConfig.clearAllText = 'Remove os itens selecionados';
    selectConfig.disableVirtualScroll = true;
    selectConfig.openOnEnter = true;
  }

}
