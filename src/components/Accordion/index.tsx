import { ReactNode, useCallback, useState } from 'react';

export interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion = ({ children, title }: AccordionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-4">
        {title}
        <button onClick={handleToggle}>{isVisible ? '접기' : '열기'}</button>
      </div>
      {isVisible && children}
    </div>
  );
};

export default Accordion;
