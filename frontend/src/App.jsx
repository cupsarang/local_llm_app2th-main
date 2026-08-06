import { useState, useEffect } from 'react';
import SettingsPanel from './components/SettingsPanel';
import ChatWindow from './components/ChatWindow';
import { FALLBACK_MODELS, fetchModels } from './api/chatApi';
import { promptModes } from './api/promptModes';
import './App.css';

const DEFAULT_SETTINGS = {
  model: FALLBACK_MODELS[0],
  system_prompt: promptModes.basic.prompt,
  temperature: 0.7,
  top_p: 0.9,
  num_predict: 256,
};

function App() {
  const [models, setModels] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    fetchModels()
      .then((list) => {
        const nextModels = Array.isArray(list) ? list : FALLBACK_MODELS;
        setModels(nextModels);
        setSettings((prev) => ({
          ...prev,
          model: nextModels.includes(prev.model) ? prev.model : nextModels[0],
        }));
      })
      .catch(() => {
        setModels(FALLBACK_MODELS);
        setSettings((prev) => ({
          ...prev,
          model: prev.model || FALLBACK_MODELS[0],
        }));
      });
  }, []);

  return (
    <div className="app-layout">
      <SettingsPanel
        models={models}
        settings={settings}
        onSettingsChange={setSettings}
      />
      <ChatWindow settings={settings} />
    </div>
  );
}

export default App;
