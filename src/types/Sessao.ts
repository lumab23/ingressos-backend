export interface Sessao {
    _id: string;
    filmeId: string;
    dataHora: string;
    sala: string;
    preco: number;
    assentosDisponiveis: number;
    filme: {
      id: string;
      titulo: string;
      diretor: string;
      duracao: number;
      genero: string;
      classificacao: string;
    };
  }