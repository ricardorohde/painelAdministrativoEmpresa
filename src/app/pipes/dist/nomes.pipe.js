"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NomesPipe = void 0;
var core_1 = require("@angular/core");
var NomesPipe = /** @class */ (function () {
    function NomesPipe() {
    }
    NomesPipe.prototype.transform = function (items, filterBy) {
        if (!filterBy || filterBy === '') {
            return items;
        }
        console.log('items');
        console.log(items);
        console.log('filterBy');
        console.log(':' + filterBy + ':');
        return items.filter(function (item) { return item.nome.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1; });
    };
    NomesPipe = __decorate([
        core_1.Pipe({
            name: 'nomes'
        })
    ], NomesPipe);
    return NomesPipe;
}());
exports.NomesPipe = NomesPipe;
