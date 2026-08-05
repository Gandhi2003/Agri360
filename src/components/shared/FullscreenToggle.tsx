import { useEffect, useState } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import { Button } from '@components/ui/Button';

export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement));

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggle = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hidden sm:inline-flex"
      onClick={toggle}
      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
    >
      {isFullscreen ? <Minimize className="size-5" /> : <Maximize className="size-5" />}
    </Button>
  );
}
