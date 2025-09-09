import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'slide-in-up' | 'slide-in-left' | 'slide-in-right' | 'scale-up';
  delay?: number;
  className?: string;
}

/**
 * Reusable component for scroll-triggered animations
 * Wraps content and animates it when it comes into view
 */
export default function AnimatedSection({ 
  children, 
  animation = 'fade-in', 
  delay = 0,
  className = '' 
}: AnimatedSectionProps) {
  const { elementRef, isVisible } = useScrollAnimation();

  const animationClass = `animate-${animation}`;
  const delayClass = delay > 0 ? `animate-delay-${delay}` : '';
  
  return (
    <div
      ref={elementRef}
      className={`
        ${!isVisible ? 'opacity-0' : animationClass}
        ${delayClass}
        ${className}
      `.trim()}
      style={{
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
}