import { ItensService } from './../../itens-adicionais/itens.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoriaAdicionalService } from '../../categorias-adicionais/categoria-adicional.service';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-item-adicional',
  templateUrl: './dialog-add-item-adicional.component.html',
  styleUrls: ['./dialog-add-item-adicional.component.css']
})
export class DialogAddItemAdicionalComponent implements OnInit {

  form: FormGroup;
  btstatus: boolean;
  categoriasItem: any;
  categoriaLista: any;
  tipoacao: boolean;
  adiPersona = false;

  constructor(public servcadc: CategoriaAdicionalService, private formBuilder: FormBuilder, private servapp: ServicoService,
              private crud: CrudServicoService, public itensServ: ItensService,
              public dialogRef: MatDialogRef<DialogAddItemAdicionalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.categoriaLista = this.servcadc.getCategoriasAdicional();

    console.log(this.categoriaLista);

    this.tipoacao = this.itensServ.getTipoacao();

    if (this.itensServ.getTipoacao()) {


      this.form = this.formBuilder.group({
      id_empresa: [this.servapp.getDadosEmpresa().id],
      nome: [''],
      disponivel: [false],
      categoria: [''],
      preco: [''],
      id_item_catalogo: [''],
    });

  } else {


    // editar item

                   console.log(this.itensServ.getItemAdicional().id_item_catalogo);
                   this.categoriasItem = this.itensServ.getItemAdicional().categoria;

                   if (this.itensServ.getItemAdicional().id_item_catalogo === '0') {
                    this.adiPersona = true;
                  }

                   this.form = this.formBuilder.group({
                    id_empresa: [this.servapp.getDadosEmpresa().id],
                    id: [this.itensServ.getItemAdicional().id],
                    nome: [this.itensServ.getItemAdicional().nome],
                    disponivel: [this.itensServ.getItemAdicional().disponivel],
                    categoria: [''],
                    id_item_catalogo: [this.itensServ.getItemAdicional().id_item_catalogo],
                    preco: [this.itensServ.getItemAdicional().preco]
                   });

                     // async orders
                   (this.itensServ.getItemAdicional().categoria).subscribe(orders => {
                      this.categoriaLista = orders;
                      this.form.controls.categoria.patchValue(this.categoriaLista[0]);
                    });

                   

  }


  }


  selecionarOpt(item) {
    this.form.controls.id_item_catalogo.setValue(item.id);
    this.form.controls.preco.setValue(item.preco);
  }

  onClickDis(evento, item) {
    console.log(evento);
    console.log(item);
    if (item.value.disponivel) { item.value.disponivel = false; } else { item.value.disponivel = true; }
  }

  buildCategoriasAdicionais(itens): any {
    let valores;
    if (this.itensServ.getTipoacao()) {
     valores = itens.map((v) => new FormControl(
     false
    ));
  } else {
     valores = itens.map((v) => new FormControl(
     v
     ));
  }

    return this.formBuilder.array(valores);
  }

  onClickItemSelect(evento) {
      console.log(evento);
  }

  onSalvarItem() {

    console.log(this.form.value);

    this.btstatus = true;
    const callbfun = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
        this.btstatus = false;
      } else {
        this.btstatus = false;
        this.itensServ.consultaAdicionais();
        this.servapp.mostrarMensagem(r.detalhes);
        // this.form.controls.nome.setValue('');
        // this.form.controls.preco.setValue('');
      }
    };
    this.crud.post_api('editar_item_adc', callbfun, this.form.value );
  }

  onClickAdd() {
    console.log(this.form.value);
    this.btstatus = true;
    const callbfun = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
        this.btstatus = false;
      } else {
        this.servapp.mostrarMensagem(r.detalhes);
        this.btstatus = false;
        this.itensServ.setItensAdicional(r.lista);
        this.form.controls.nome.setValue('');
        this.form.controls.preco.setValue('');
      }
    };
    this.crud.post_api('add_adicional', callbfun, this.form.value );
  }

}
