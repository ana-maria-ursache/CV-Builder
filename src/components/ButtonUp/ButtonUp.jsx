import { ArrowUp } from 'lucide-react';

export default function ButtonUp() {
  const topFunction = () => {
    document.documentElement.scrollTop = 0;
  };

  return (
    <button className="back-to-top" onClick={topFunction} aria-label="Back to top">
      <ArrowUp className="icon-style" size={24} />
    </button>
  );
}
