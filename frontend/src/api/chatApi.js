import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const FALLBACK_MODELS = ['gemma4:e4b', 'exaone3.5:7.8b', 'llama3.2', 'qwen3:8b', 'phi3:mini'];

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

function normalizeModelList(payload) {
  if (Array.isArray(payload)) {
    return payload.filter((item) => typeof item === 'string' && item.trim());
  }
  if (payload && Array.isArray(payload.models)) {
    return payload.models.filter((item) => typeof item === 'string' && item.trim());
  }
  return [];
}

export async function fetchModels() {
  try {
    const response = await apiClient.get('/models');
    const list = normalizeModelList(response.data);
    return list.length > 0 ? list : FALLBACK_MODELS;
  } catch {
    return FALLBACK_MODELS;
  }
}

export async function sendChat({ message, model, system_prompt, temperature, top_p, num_predict }) {
  const safeNumPredict = Number.isFinite(num_predict) && num_predict >= 1 ? Math.floor(num_predict) : 256;
  const safeTemperature = Number.isFinite(temperature) ? Math.min(Math.max(temperature, 0), 2) : 0.7;
  const safeTopP = Number.isFinite(top_p) ? Math.min(Math.max(top_p, 0), 1) : 0.9;
  const safeModel = typeof model === 'string' && model.trim() && model !== 'custom'
    ? model.trim()
    : FALLBACK_MODELS[0];

  try {
    const response = await apiClient.post('/chat', {
      message,
      model: safeModel,
      system_prompt,
      temperature: safeTemperature,
      top_p: safeTopP,
      num_predict: safeNumPredict,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const detail = error.response.data?.detail;
      if (Array.isArray(detail)) {
        const msg = detail.map((d) => `[${d.loc?.join('.')}] ${d.msg}`).join(', ');
        throw new Error(`서버 검증 오류: ${msg}`);
      }
      throw new Error(`서버 오류 (${error.response.status}): ${typeof detail === 'string' ? detail : JSON.stringify(detail)}`);
    }
    throw error;
  }
}
