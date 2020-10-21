"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsolidacaoDinheiroComponent = void 0;
var core_1 = require("@angular/core");
var adicionar_banco_component_1 = require("../conciliacao-bancaria/adicionar-banco/adicionar-banco.component");
var ConsolidacaoDinheiroComponent = /** @class */ (function () {
    function ConsolidacaoDinheiroComponent(servico, crud, dialog, fb) {
        this.servico = servico;
        this.crud = crud;
        this.dialog = dialog;
        this.fb = fb;
        this.displayedColumns = ['c1', 'c8', 'c9', 'c2', 'c3', 'c5', 'c6'];
    }
    ConsolidacaoDinheiroComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            porcentagem: [''],
            datai: [''],
            dataf: ['']
        });
        this.conciliacaoDin();
    };
    ConsolidacaoDinheiroComponent.prototype.onfcalldelsuc = function (evento) {
        console.log(evento);
        this.conciliacaoDin();
    };
    ConsolidacaoDinheiroComponent.prototype.conciliacaoDin = function () {
        var _this = this;
        var fcall = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
            }
            else {
                _this.dataSource = r.resultado.itens.lista;
                _this.total = r.resultado.itens.total;
                _this.totalDesc = r.resultado.itens.total_valor_conciliado;
            }
        };
        this.crud.post_api('conciliacaoDinheiro', fcall, this.form.value);
    };
    ConsolidacaoDinheiroComponent.prototype.adicionarbanco = function () {
        var dialogRef = this.dialog.open(adicionar_banco_component_1.AdicionarBancoComponent, {
            width: '250px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ConsolidacaoDinheiroComponent.prototype.lancarFluxo = function (element, porcentagem) {
        var _this = this;
        var fcall = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
                _this.conciliacaoDin();
            }
        };
        this.crud.post_api('lancarConsolidacaoDinheiro', fcall, { id_pagamento: element.id, porc: porcentagem, operador: this.servico.getDadosEmpresa().operador.nome });
    };
    ConsolidacaoDinheiroComponent = __decorate([
        core_1.Component({
            selector: 'app-consolidacao-dinheiro',
            templateUrl: './consolidacao-dinheiro.component.html',
            styleUrls: ['./consolidacao-dinheiro.component.css']
        })
    ], ConsolidacaoDinheiroComponent);
    return ConsolidacaoDinheiroComponent;
}());
exports.ConsolidacaoDinheiroComponent = ConsolidacaoDinheiroComponent;
