import { useState, useEffect } from "react";
import {motion, AnimatePresence} from 'framer-motion';


const ALIENS = [
  { id: 'ghostfreak', name: 'Ghostfreak', color: '#AFA9EC' },
  { id: 'fourarms', name: 'Four Arms', color: '#F0997B' },
  { id: 'greymatter', name: 'Grey Matter', color: '#85B7EB' },
  { id: 'titan', name: 'Titan', color: '#FAC775' },
  { id: 'clockwork', name: 'Clockwork', color: '#5DCAA5' },];

  export default function Dial(){
    const [selectedId, setSelectedId] = useState(null);
    const [isTransforming, setIsTransforming] = useState(false);
    const [activeAlien, setActiveAlien] = useState(null);

    const radius = 140 ;
    const center = 160 ;

    const angleStep = (2 * Math.PI) / ALIENS.length;

    function handleSlam() {
        if (!selectedId) return;
        const alien = ALIENS.find((a) => a.id === selectedId);
        setActiveAlien(alien);
        setIsTransforming(true);
    }
    useEffect(() => {
    if (!isTransforming || !activeAlien) return;

    const utterance = new SpeechSynthesisUtterance("It's Hero Time!");
    window.speechSynthesis.speak(utterance);

    const timer = setTimeout(() => {
      setIsTransforming(false);
      setSelectedId(null);
    }, 2200);
    
    return () => clearTimeout(timer);
  }, [isTransforming, activeAlien]);

    return (
    <>
      <div
        className="relative mx-auto rounded-full bg-neutral-900 border-4 border-neutral-700"
        style={{ width: center * 2, height: center * 2 }}
      >
        {ALIENS.map((alien, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const isSelected = selectedId === alien.id;

          return (
            <button
              key={alien.id}
              onClick={() => setSelectedId(alien.id)}
              className="absolute rounded-full flex items-center justify-center text-xs font-bold text-black transition-transform"
              style={{
                width: 64,
                height: 64,
                left: x - 32,
                top: y - 32,
                backgroundColor: alien.color,
                transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                boxShadow: isSelected ? `0 0 20px ${alien.color}` : 'none',
              }}
            >
              {alien.name}
            </button>
          );
        })}

        <button
          onClick={handleSlam}
          className="absolute rounded-full bg-white/10 border-2 border-white/40 text-white text-sm font-bold hover:bg-white/20"
          style={{
            width: 72,
            height: 72,
            left: center - 36,
            top: center - 36,
          }}
        >
          SLAM
        </button>
      </div>

      <AnimatePresence>
        {isTransforming && activeAlien && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: '#22c55e33' }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="rounded-2xl px-10 py-8 text-center border-4"
              style={{ borderColor: activeAlien.color, backgroundColor: '#111' }}
            >
              <p className="text-3xl font-extrabold text-white">It's Hero Time!</p>
              <p className="mt-2 text-lg" style={{ color: activeAlien.color }}>
                {activeAlien.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}