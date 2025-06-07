import axios from 'axios';
import dotenv from 'dotenv';
import { Sessao } from '../types/Sessao';


dotenv.config();

const sessaoServiceApi = axios.create({
  baseURL: process.env.SESSAO_SERVICE_URL,
  timeout: 10000, 
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 segundo

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const buscarSessaoPorId = async (id: string): Promise<Sessao | null> => {
  console.log(`[DEBUG] Buscando sessão na URL: ${process.env.SESSAO_SERVICE_URL}/sessoes/${id}`);
  
  let lastError: any = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[DEBUG] Tentativa ${attempt} de ${MAX_RETRIES}...`);
      const response = await sessaoServiceApi.get<Sessao>(`/sessoes/${id}`);
      console.log('[DEBUG] Resposta recebida:', {
        status: response.status,
        statusText: response.statusText,
        hasData: !!response.data,
        data: response.data
      });
      
      if (response.status === 200 && response.data && response.data._id) {
        return response.data;
      }
      console.log('[DEBUG] Resposta inválida do serviço de sessões');
      return null;
    } catch (error) {
      lastError = error;
      if (axios.isAxiosError(error)) {
        console.error(`[ERRO] Tentativa ${attempt} falhou:`, {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data
        });
        
        // Se não for timeout, não tenta novamente
        if (error.code !== 'ECONNABORTED') {
          break;
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`[ERRO] Tentativa ${attempt} falhou:`, errorMessage);
        break;
      }
      
      if (attempt < MAX_RETRIES) {
        console.log(`[DEBUG] Aguardando ${RETRY_DELAY}ms antes da próxima tentativa...`);
        await delay(RETRY_DELAY);
      }
    }
  }
  
  console.error('[ERRO] Todas as tentativas falharam');
  return null;
};