import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdmService {
  private usuarioSelecionado: any;
  private permissoes = [
    {
      id: 0,
      name: 'Pedidos',
      status: true,
      children: [
        {id: 0, status: true, name: 'Abrir e fechar o sistema'},
        {id: 1, status: true, name: 'Acesso aos pedidos do dia atual'},
        {id: 2, status: true, name: 'Acesso a pedidos por período'},
      ]
    },
    {
      id: 1,
      status: true,
      name: 'Meus clientes',
      children: [
        {id: 0, status: true, name: 'Baixar lista em excel'},
        {id: 1, status: true, name: 'Remover cliente'},
        {id: 2, status: true, name: 'Acessar menu ded opções'},
        {id: 3, status: true, name: 'Adicionar novo cliente'},
      ]
    },

    {
      id: 2,
      status: true,
      name: 'Entregas',
      children: [
        {id: 0, status: true, name: 'Acessar status de entregas'},
        {id: 0, status: true, name: 'Atualizar status de entregas'},
      ]
    },

    {
      id: 3,
      status: true,
      name: 'Mapa',
      children: [
        {id: 0, status: true, name: 'Visualizar mapa'},
      ]
    },


    {
      id: 4,
      status: true,
      name: 'Notificações',
      children: [
        {id: 0, status: true, name: 'Remover'},
      ]
    },

    {
      id: 5,
      status: true,
      name: 'Estoque',
      children: [
        {id: 0, status: true, name: 'Enviar estoque'},
        {id: 1, status: true, name: 'Adicionar estoque'},
        {id: 2, status: true, name: 'Retirar estoque estoque'},
        {id: 3, status: true, name: 'Transferir estoque'},
        {id: 4, status: true, name: 'Adicionar nova logística'},
        {id: 5, status: true, name: 'Adicionar estoque de logística'},
        {id: 6, status: true, name: 'Acessar auditoria'},
      ]
    },

    {
      id: 6,
      status: true,
      name: 'Relatórios',
      children: [
        {id: 0, status: true, name: 'Histórico de vendas'},
        {id: 1, status: true, name: 'Histórico de caixa'},
        {id: 2, status: true, name: 'Posição de estoque'},
      ]
    },

    {
      id: 7,
      status: true,
      name: 'Financeiro',
      children: [
        {id: 0, status: true, name: 'Conciliação bancária'},
        {id: 1, status: true, name: 'Consolidação de cartões'},
        {id: 2, status: true, name: 'Consolidação de dinheiro'},
        {id: 3, status: true, name: 'Controle de fiado'},
        {id: 4, status: true, name: 'Comissão por entrega'},
        {id: 5, status: true, name: 'Consolidção financeira'},
      ]
    },

    {
      id: 8,
      status: true,
      name: 'Fechar caixa',
      children: [
        {name: 'Finalizar caixa do dia'},
      ]
    },

    {
      id: 9,
      status: true,
      name: 'Painel',
      children: [
        {id: 0, status: true, name: 'Cardápio'},
        {id: 1, status: true, name: 'Item Cardápio'},
        {id: 2, status: true, name: 'Categoria adicional'},
        {id: 3, status: true, name: 'Item adicional'},
        {id: 4, status: true, name: 'Avaliações'},
        {id: 5, status: true, name: 'Configuração de funcionamento delivery'},
        {id: 6, status: true, name: 'Gráficos de relatórios'},
        {id: 7, status: true, name: 'Iniciar sistema com data retroativa'},
        {id: 8, status: true, name: 'Organização entregador'},
        {id: 9, status: true, name: 'Organização - Adicionar item'},
        {id: 10, status: true, name: 'Organização - remover item'},
        {id: 11, status: true, name: 'Perfil logísta'},
      ]
    },

    {
      id: 10,
      status: true,
      name: 'Configurações especiais',
      children: [
        {id: 0, status: true, name: 'Cidades'},
        {id: 0, status: true, name: 'Bairros'},
        {id: 0, status: true, name: 'Galeria'},
        {id: 0, status: true, name: 'Motoboys'},
        {id: 0, status: true, name: 'Formas de pagamento'},
        {id: 0, status: true, name: 'Itens de pagamento'},
        {id: 0, status: true, name: 'Bancos'},
        {id: 0, status: true, name: 'Usuários app'},
        {id: 0, status: true, name: 'Usuários administrativos do sistema'},
        {id: 0, status: true, name: 'Cupons'},
        {id: 0, status: true, name: 'Notificações'},
        {id: 0, status: true, name: 'Pagamento online'},
      ]
    },



  ];

  constructor() { }

  setUsuario(usuario: any) { this.usuarioSelecionado = usuario; }
  getUsuario() { return this.usuarioSelecionado; }

  initPermissao(status, permissoes) {
    console.log('#initPermissao');
    console.log(status);
    console.log(permissoes);

    if (status) {} else {
        console.log('Permissões de usuário consedidas');
        this.permissoes = permissoes;
      }
   }

  setPermissoes(permissoes: any) { this.permissoes = permissoes; }
  getPermissoessuario(): any { return this.permissoes; }
}
