import { Router } from 'express';
import { body } from 'express-validator';
import { comprarIngresso, listarIngressos, buscarIngressoPorId } from '../controllers/ingressoController';

const router = Router();

const validacaoCompra = [
  body('sessaoId').isMongoId().withMessage('O ID da sessão é obrigatório e deve ser válido.'),
];

router.post('/', validacaoCompra, comprarIngresso);
router.get('/', listarIngressos);
router.get('/:id', buscarIngressoPorId);

export default router;