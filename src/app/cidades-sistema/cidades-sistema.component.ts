import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-cidades-sistema',
  templateUrl: './cidades-sistema.component.html',
  styleUrls: ['./cidades-sistema.component.css']
})
export class CidadesSistemaComponent implements OnInit {


  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c4'];
  itens = [];


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('cidades_sistema').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

add(): void {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '450px',
    data: {tipo: 'add', nomeDialog: 'form_cidade'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

onClickEditar(i): void {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'form_cidade', item: i}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.editar(result) ;
    }
  });
}

editar(form) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.itens = r.resultado;
    }
    console.log(r);
  };
  this.crud.post_api('editar_cidade_sistema', accallback, form);
}

f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.itens = r.resultado;
    }
    console.log(r);
  };
  this.crud.post_api('add_cidade_sistema', accallback, form);
}

removerItem(item) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('rem_cidade_sistema', accallback, item);

}

}
