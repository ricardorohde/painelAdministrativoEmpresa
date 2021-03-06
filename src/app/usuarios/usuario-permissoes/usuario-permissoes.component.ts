import { UsuariosSistemaService } from './usuarios-sistema.service';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { UsuariosAdmService } from '../usuarios-adm.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

@Component({
  selector: 'app-usuario-permissoes',
  templateUrl: './usuario-permissoes.component.html',
  styleUrls: ['./usuario-permissoes.component.css']
})


export class UsuarioPermissoesComponent implements OnInit {

  treeControl = new NestedTreeControl<any>(node => node.children);
  dataSource = new MatTreeNestedDataSource<any>();
  TREE_DATA: FoodNode[] = [];
  tipoOperador: string;
  constructor(public servico: ServicoService, private crud: CrudServicoService, private router: Router,
              public us: UsuariosAdmService) { }

  ngOnInit(): void {
    this.tipoOperador = this.servico.getDadosEmpresa().operador.tipo;
    console.log(this.us.getUsuario().nome);
    console.log(this.us.getPermissoessuario());
    if (this.us.getUsuario().permissoes) {
      this.dataSource.data = this.us.getUsuario().permissoes;
    } else {
      this.dataSource.data = this.us.getPermissoessuario();
    }
  }

  onClickSalvar(dataSource) {
    console.log(dataSource._data._value);
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.router.navigate(['/painel/usuarios']);
      }
      console.log(r);
    };
    this.crud.post_api('attPermissoesUsuarioSistema', accallback, {id: this.us.getUsuario().id, perm: dataSource._data._value});
 
  }
  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;
}
