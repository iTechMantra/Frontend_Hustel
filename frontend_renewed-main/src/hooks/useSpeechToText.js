import { useCallback, useEffect, useRef, useState } from 'react';

export default function useSpeechToText({ lang = 'en-IN', interim = false } = {}) {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = interim;
    rec.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join(' ');
      setTranscript(text);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
  }, [lang, interim]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    setTranscript('');
    setListening(true);
    try { recognitionRef.current.start(); } catch (_) {}
  }, []);

  const stop = useCallback(() => {
    if (!recognitionRef.current) return;
    try { recognitionRef.current.stop(); } catch (_) {}
    setListening(false);
  }, []);

  return { transcript, listening, start, stop };
}


