import { MatDialog } from '@angular/material/dialog';
import { FormOrganizacaoComponent } from './form-organizacao/form-organizacao.component';
import { CrudServicoService } from './../crud-servico.service';
import { ServicoService } from './../servico.service';
import { Component, OnInit } from '@angular/core';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-organizacao-entregador',
  templateUrl: './organizacao-entregador.component.html',
  styleUrls: ['./organizacao-entregador.component.css']
})
export class OrganizacaoEntregadorComponent implements OnInit {

  itens: any;
  title = 'ng-calendar-demo';
  selectedDate: any;
  startAt: any;
  minDate: any;
  maxDate: any;
  year: any;
  DayAndDate: string;

  delsucData: any;

  btRem = true;
  btAdd = true;

  diasMark: Array<any>;

  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog,
              private us: UsuariosAdmService ) { }

  ngOnInit(): void {
    this.btAdd = this.us.getPermissoessuario()[9].children[9].status;
    this.btRem = this.us.getPermissoessuario()[9].children[10].status;
    this.f1();
  }

  f1() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        if (r.resultado) {
          this.itens = r.resultado.itens.lista;
          this.diasMark = r.resultado.itens.listaMes;
          this.iniciaCalendario(r.resultado.itens.data);
        }
      }
    };
    this.crud.post_api('consultaOrgEnt', accallback, {nome: ''});
  }

  f2(f) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        if (r.resultado) {
          this.itens = r.resultado.itens.lista;
          this.delsucData = r.resultado.itens.info;
          this.diasMark = r.resultado.itens.listaMes;
        }
      }
    };
    this.crud.post_api('consultaOrgEnt', accallback, {filtro: f});
  }


  iniciaCalendario(data) {
    this.title = 'ng-calendar-demo';
    this.selectedDate = data;
    // this.startAt = new Date('2019/09/11');
    // this.minDate = new Date('2019/09/14');
    // this.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
    this.year = '';
    this.DayAndDate = '';
  }

  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
    const dateString = event.toDateString();
    const dateValue = dateString.split(' ');
    this.year = dateValue[3];
    this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
    console.log(this.DayAndDate);
    this.f2(this.DayAndDate);
  }

  myDateFilter = (d: Date): boolean => {
    console.log('myDateFilter');
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 ;
  }

  addEvento(): void {
    const dialogRef = this.dialog.open(FormOrganizacaoComponent, {
      width: '450px',
      data: this.delsucData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.f2(this.delsucData);
      }
    });
  }

  removerItem(item) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        if (r.resultado) {
          this.f1();
        }
      }
    };
    this.crud.post_api('remOrgEnt', accallback, item.id);
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      console.log(date.getDay() + '/' + date.getMonth() + '/' + date.getUTCFullYear())
      if ( date.getDate() === 1) {
        return 'special-date';
      } else {
        return;
      }
    };
  }

  verificaDiasmark(dia: number) {
    let r = false;
    this.diasMark.forEach(element => {
        if (element.dia_marcado === dia) { r = true; } else { r = false; }
    });
    return r;
  }

}
