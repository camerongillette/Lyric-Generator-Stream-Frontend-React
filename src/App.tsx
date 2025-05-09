import React, { useState, useRef } from 'react';
import './App.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL;
console.log(backendUrl); 

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const handleToggle = async () => {
    if (isGenerating) {
      // Stop streaming
      controllerRef.current?.abort();
      setIsGenerating(false);
    } else {
      // Start streaming
      setIsGenerating(true);
      controllerRef.current = new AbortController();

      try {
        const response = await fetch(backendUrl+'/lyricgenerator/songwriter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ existing_lyrics: text, topic: topic }),
          signal: controllerRef.current.signal,
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader!.read();
          if (done) break;

          const chunk = decoder.decode(value);
          setText(prev => prev + chunk);
        }
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          console.error('Stream error:', error);
        }
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={20}
        cols={80}
        style={{ fontSize: '1rem', marginBottom: '1rem' }}
      />
      <input type="hidden" value="depression" name="topic" />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <input type="text" name="topic" id="lyricTopic" placeholder="TOPIC" onChange={(e) => setTopic(e.target.value)}/>
        <button id="generateButton" onClick={handleToggle} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          {isGenerating ? 'Stop' : 'GENERATE'}
        </button>
      </div>
    </div>
  );
};

export default App;
