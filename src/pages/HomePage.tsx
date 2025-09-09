import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Smartphone, Shield, Clock, Star, Wrench, Battery, Wifi, Cpu } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ServicesSlideshow from '../components/ServicesSlideshow';

interface HomePageProps {
  onPageChange?: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let W = 0, H = 0;

    const config = {
      count: 90,
      baseSpeed: 0.35,
      maxSpeed: 2.5,
      linkDist: 130,
      repelDist: 130,
      repelPower: 1.2,
      attractRange: 280,
      attractPower: 0.02,
      friction: 0.982,
      particleRadius: [1.2, 2.8],
    };

    let particles: any[] = [];
    const mouse = { x: null as number | null, y: null as number | null, vx: 0, vy: 0, inside: false, lastX: null as number | null, lastY: null as number | null };
    let ripples: any[] = [];
    let animationId: number;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(rect.width * DPR);
      canvas.height = Math.floor(rect.height * DPR);
      W = canvas.width; 
      H = canvas.height;
      if (!particles.length) initParticles();
    }

    function rand(a: number, b: number) { 
      return a + Math.random() * (b - a); 
    }

    function initParticles() {
      particles = Array.from({length: config.count}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: rand(-config.baseSpeed, config.baseSpeed),
        vy: rand(-config.baseSpeed, config.baseSpeed),
        r: rand(config.particleRadius[0] * DPR, config.particleRadius[1] * DPR),
        hue: rand(190, 220),
        maxV: rand(config.baseSpeed, config.maxSpeed),
      }));
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * DPR;
      const y = (e.clientY - rect.top) * DPR;
      if (mouse.lastX == null) { mouse.lastX = x; mouse.lastY = y; }
      mouse.vx = (x - mouse.lastX);
      mouse.vy = (y - mouse.lastY);
      mouse.lastX = x; mouse.lastY = y;
      mouse.x = x; mouse.y = y;
      mouse.inside = true;
    }

    function onPointerLeave() { 
      mouse.inside = false; 
      mouse.x = mouse.y = null; 
    }

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * DPR;
      const y = (e.clientY - rect.top) * DPR;
      ripples.push({ x, y, r: 0, alpha: 0.6 });
    }

    function step() {
      ctx.clearRect(0, 0, W, H);

      // Update particles
      for (const p of particles) {
        if (mouse.inside && mouse.x != null && mouse.y != null) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < config.repelDist * DPR && dist > 0.001) {
            const force = (config.repelPower * DPR) / dist;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          } else if (dist < config.attractRange * DPR) {
            const force = (1 - dist / (config.attractRange * DPR)) * config.attractPower * DPR;
            p.vx += (-dx / dist) * force;
            p.vy += (-dy / dist) * force;
          }
        }
        p.vx *= config.friction;
        p.vy *= config.friction;
        p.x += p.vx; 
        p.y += p.vy;

        if (p.x < 0) p.x = W; 
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; 
        if (p.y > H) p.y = 0;
      }

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < config.linkDist * DPR) {
            ctx.strokeStyle = `rgba(180, 220, 255, ${1 - d / (config.linkDist * DPR)})`;
            ctx.beginPath(); 
            ctx.moveTo(a.x, a.y); 
            ctx.lineTo(b.x, b.y); 
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = `rgba(200, 240, 255, 0.9)`;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); 
        ctx.fill();
      }

      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 8; 
        r.alpha -= 0.01;
        ctx.strokeStyle = `rgba(0, 200, 255, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); 
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); 
        ctx.stroke();
        if (r.alpha <= 0) ripples.splice(i, 1);
      }

      animationId = requestAnimationFrame(step);
    }

    // Event listeners
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize, { passive: true });

    // Initialize
    resize();
    initParticles();
    animationId = requestAnimationFrame(step);

    // Cleanup
    return () => {
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  // CTA Section Particles Effect
  useEffect(() => {
    const canvas = ctaCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let W = 0, H = 0;

    const config = {
      count: 60, // Fewer particles for smaller section
      baseSpeed: 0.25,
      maxSpeed: 2.0,
      linkDist: 120,
      repelDist: 120,
      repelPower: 1.0,
      attractRange: 250,
      attractPower: 0.015,
      friction: 0.985,
      particleRadius: [1.0, 2.5],
    };

    let particles: any[] = [];
    const mouse = { x: null as number | null, y: null as number | null, vx: 0, vy: 0, inside: false, lastX: null as number | null, lastY: null as number | null };
    let ripples: any[] = [];
    let animationId: number;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(rect.width * DPR);
      canvas.height = Math.floor(rect.height * DPR);
      W = canvas.width; 
      H = canvas.height;
      if (!particles.length) initParticles();
    }

    function rand(a: number, b: number) { 
      return a + Math.random() * (b - a); 
    }

    function initParticles() {
      particles = Array.from({length: config.count}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: rand(-config.baseSpeed, config.baseSpeed),
        vy: rand(-config.baseSpeed, config.baseSpeed),
        r: rand(config.particleRadius[0] * DPR, config.particleRadius[1] * DPR),
        hue: rand(190, 220),
        maxV: rand(config.baseSpeed, config.maxSpeed),
      }));
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * DPR;
      const y = (e.clientY - rect.top) * DPR;
      if (mouse.lastX == null) { mouse.lastX = x; mouse.lastY = y; }
      mouse.vx = (x - mouse.lastX);
      mouse.vy = (y - mouse.lastY);
      mouse.lastX = x; mouse.lastY = y;
      mouse.x = x; mouse.y = y;
      mouse.inside = true;
    }

    function onPointerLeave() { 
      mouse.inside = false; 
      mouse.x = mouse.y = null; 
    }

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * DPR;
      const y = (e.clientY - rect.top) * DPR;
      ripples.push({ x, y, r: 0, alpha: 0.6 });
    }

    function step() {
      ctx.clearRect(0, 0, W, H);

      // Update particles
      for (const p of particles) {
        if (mouse.inside && mouse.x != null && mouse.y != null) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.hypot(dx, dy);
          if (dist < config.repelDist * DPR && dist > 0.001) {
            const force = (config.repelPower * DPR) / dist;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          } else if (dist < config.attractRange * DPR) {
            const force = (1 - dist / (config.attractRange * DPR)) * config.attractPower * DPR;
            p.vx += (-dx / dist) * force;
            p.vy += (-dy / dist) * force;
          }
        }
        p.vx *= config.friction;
        p.vy *= config.friction;
        p.x += p.vx; 
        p.y += p.vy;

        if (p.x < 0) p.x = W; 
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; 
        if (p.y > H) p.y = 0;
      }

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < config.linkDist * DPR) {
            ctx.strokeStyle = `rgba(180, 220, 255, ${1 - d / (config.linkDist * DPR)})`;
            ctx.beginPath(); 
            ctx.moveTo(a.x, a.y); 
            ctx.lineTo(b.x, b.y); 
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.fillStyle = `rgba(200, 240, 255, 0.9)`;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); 
        ctx.fill();
      }

      // Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 8; 
        r.alpha -= 0.01;
        ctx.strokeStyle = `rgba(0, 200, 255, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); 
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2); 
        ctx.stroke();
        if (r.alpha <= 0) ripples.splice(i, 1);
      }

      animationId = requestAnimationFrame(step);
    }

    // Event listeners
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('click', onClick);
    window.addEventListener('resize', resize, { passive: true });

    // Initialize
    resize();
    initParticles();
    animationId = requestAnimationFrame(step);

    // Cleanup
    return () => {
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const services = [
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Scherm Reparatie',
      description: 'Gebroken scherm? Wij vervangen het snel en professioneel.',
      price: 'Vanaf €50',
      guarantee: '6 maanden garantie',
      popular: true,
      duration: '1-2 uur',
      category: 'Hardware'
    },
    {
      icon: <Battery className="h-8 w-8" />,
      title: 'Batterij Vervanging',
      description: 'Batterij houdt niet meer lang genoeg? Nieuwe batterij geïnstalleerd.',
      price: 'Vanaf €50',
      guarantee: '3 maanden garantie',
      popular: false,
      duration: '30 min',
      category: 'Hardware',
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: 'Waterschade Reparatie',
      description: 'Telefoon nat geworden? Wij proberen hem te redden.',
      price: 'Vanaf €30',
      guarantee: 'Geen garantie',
      popular: false,
      duration: '2-3 dagen',
      category: 'Noodreparatie'
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: 'Algemene Reparaties',
      description: 'Camera, speakers, knoppen en meer reparaties.',
      price: 'Op aanvraag',
      guarantee: '6 maanden garantie',
      popular: false,
      duration: '1-3 uur',
      category: 'Hardware'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: 'Moederbord Reparatie',
      description: 'Complexe moederbord problemen professioneel opgelost.',
      price: 'Vanaf €85',
      guarantee: '1 maand garantie',
      popular: false,
      duration: '3-5 dagen',
      category: 'Specialist'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Software Herstel',
      description: 'Systeem crashes, bootloops en software problemen opgelost.',
      price: 'Vanaf €40',
      guarantee: '1 maand garantie',
      popular: false,
      duration: '1-2 uur',
      category: 'Software'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Premium Service',
      description: 'Prioriteit behandeling met express service en pickup/delivery.',
      price: 'Vanaf €25 extra',
      guarantee: 'Standaard garantie',
      popular: true,
      duration: 'Express',
      category: 'Service'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Preventief Onderhoud',
      description: 'Complete check-up, reiniging en optimalisatie van uw apparaat.',
      price: 'Vanaf €35',
      guarantee: '3 maanden garantie',
      popular: false,
      duration: '45 min',
      category: 'Onderhoud'
    }
  ];

  const features = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Snelle Service',
      description: 'Meeste reparaties binnen 30 min - 1,5 uur klaar'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Garantie op Reparaties',
      description: 'Tot 6 maanden garantie afhankelijk van reparatietype'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Ervaren Technici',
      description: 'Meer dan 8 jaar ervaring in reparaties'
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: 'Repareren op Locatie',
      description: 'Wij komen naar u toe voor reparaties op locatie'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white min-h-screen flex items-center animate-fade-in overflow-hidden -mt-24 pt-24" style={{ background: '#19355c' }}>
        {/* Interactive Particles Canvas */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-in-up">
                Professionele <span className="text-blue-200">Telefoonreparatie</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl lg:mx-0 mx-auto animate-slide-in-up animate-delay-200">
                Snel, betrouwbaar en betaalbaar. Wij repareren alle merken smartphones en tablets 
                met de beste kwaliteit onderdelen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center animate-slide-in-up animate-delay-400">
                <button 
                  onClick={() => onPageChange?.('booking')}
                  className="bg-white text-[#19355c] px-8 py-4 rounded-lg font-semibold text-lg btn-hover-primary transition-smooth"
                >
                  Reparatie Plannen
                </button>
                <a href="tel:0685550154" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#19355c] transition-smooth text-center hover-lift">
                  Bel Nu: 06-85550154
                </a>
              </div>
            </div>
            
            {/* Right side with GIF */}
            <div className="flex justify-center lg:justify-end animate-slide-in-right animate-delay-300">
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-white/15 via-white/10 to-white/5 border border-white/30 rounded-[20px] p-6 shadow-2xl hover-scale transition-smooth overflow-hidden">
                {/* Liquid glass animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/15 to-cyan-400/20 rounded-[20px] animate-pulse"></div>
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-300/30 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-purple-300/25 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
                
                {/* Flowing liquid effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse rounded-[20px]" style={{ animationDuration: '2s' }}></div>
                
                <img 
                  src="/20250906-1848-Smartphone-s-Inn-unscreen.gif" 
                  alt="Phone Repair Animation" 
                  className="relative z-10 max-w-full h-auto rounded-[15px]"
                  style={{ maxHeight: '500px' }}
                />
                
                {/* Additional liquid glass overlay */}
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-[20px] border border-white/40 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSlideshow onPageChange={onPageChange} />

      {/* Features Section */}
      <AnimatedSection animation="slide-in-up">
        <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`text-center animate-slide-in-up animate-delay-${(index + 1) * 200}`}>
                <div className="bg-[#19355c] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover-scale icon-bounce">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="fade-in">
        <section className="relative bg-[#19355c] text-white py-16 overflow-hidden">
        {/* Interactive Particles Canvas */}
        <canvas 
          ref={ctaCanvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-in-up">
            Klaar om uw telefoon te laten repareren?
          </h2>
          <p className="text-xl mb-8 text-blue-100 animate-slide-in-up animate-delay-200">
            Kom langs in onze winkel of bel voor een afspraak
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up animate-delay-400">
            <button 
              onClick={() => onPageChange?.('booking')}
              className="bg-white text-[#19355c] px-8 py-4 rounded-lg font-semibold text-lg btn-hover-primary transition-smooth"
            >
              Maak Afspraak
            </button>
            <a href="tel:0685550154" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#19355c] transition-smooth text-center hover-lift">
              Bel Nu: 06-85550154
            </a>
          </div>
          </div>
        </div>
        </section>
      </AnimatedSection>
    </div>
  );
}