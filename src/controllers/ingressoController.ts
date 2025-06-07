import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { buscarSessaoPorId } from '../services/sessaoService';
import ingressoRepository from '../repositories/ingressoRepository';

export const comprarIngresso = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { sessaoId } = req.body;

  try {
    // validar sessão
    const sessao = await buscarSessaoPorId(sessaoId);
    if (!sessao) {
      res.status(404).json({ message: `Sessão com ID ${sessaoId} não encontrada.` });
      return;
    }

    // assentos disponiveis
    if (sessao.assentosDisponiveis <= 0) {
      res.status(400).json({ message: "Desculpe, esta sessão está esgotada." });
      return;
    }

    const novoIngresso = await ingressoRepository.create({
      sessaoId: sessao._id,
      filmeId: sessao.filme.id,
      filmeTitulo: sessao.filme.titulo,
      dataHoraSessao: new Date(sessao.dataHora),
      sala: sessao.sala,
      preco: sessao.preco, 
    });

    res.status(201).json(novoIngresso);

  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro ao processar a compra do ingresso.", error });
  }
};

export const listarIngressos = async (req: Request, res: Response) => {
  const ingressos = await ingressoRepository.findAll();
  res.status(200).json(ingressos);
};

export const buscarIngressoPorId = async (req: Request, res: Response) => {
    const ingresso = await ingressoRepository.findById(req.params.id);
    if (!ingresso) {
        res.status(404).json({ message: 'Ingresso não encontrado.' });
        return;
    }
    res.status(200).json(ingresso);
}