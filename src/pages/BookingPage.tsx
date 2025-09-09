import React, { useEffect, useRef } from 'react';
import { Calendar, Clock, CheckCircle, Star, Shield, Zap } from 'lucide-react';

export default function BookingPage() {
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);

  // Interactive particles for CTA section
  useEffect(() => {
    const canvas = ctaCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    let W = 0, H = 0;

    const config = {
      count: 60,
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

  useEffect(() => {
    // Load Calendly script if not already loaded
    if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const benefits = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Snelle Service',
      description: 'Meeste reparaties binnen 30 min - 1,5 uur klaar'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Gratis Diagnose',
      description: 'Wij bekijken uw apparaat altijd eerst gratis'
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Flexibele Tijden',
      description: 'Plan uw afspraak op een moment dat u uitkomt'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero Section */}
      <section className="relative bg-gradient-to-br from-[#19355c] via-[#1a4a6b] to-[#0f2a47] text-white py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Plan Uw <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Reparatie</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Kies een tijd die u uitkomt en kom langs voor een gratis diagnose van uw apparaat
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section - Modern Cards */}
      <section className="py-20 bg-gray-50 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                <div className="text-[#19355c] flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-[#19355c]/10 rounded-2xl flex items-center justify-center">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendly Widget Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="inline-flex items-center px-6 py-3 bg-[#19355c]/10 rounded-full text-[#19355c] font-semibold text-sm mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                Afspraak Plannen
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Kies Uw <span className="text-[#19355c]">Gewenste Tijd</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Selecteer een datum en tijd die u het beste uitkomt
              </p>
            </div>
            
            {/* Calendly inline widget */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/foonclinic/30min" 
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section - Interactive Particles Background */}
      <section className="relative bg-[#19355c] text-white py-20 overflow-hidden">
        {/* Interactive Particles Canvas */}
        <canvas 
          ref={ctaCanvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Wat kunt u <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">verwachten?</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Bij uw bezoek:</h3>
              </div>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Gratis diagnose van uw apparaat
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Transparante prijsopgave
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Uitleg over het reparatieproces
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Inschatting van de reparatietijd
                </li>
              </ul>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Wat mee te nemen:</h3>
              </div>
              <ul className="space-y-4 text-blue-100">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Uw defecte apparaat
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Oplader (indien mogelijk)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Garantiebewijs (indien van toepassing)
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-200 rounded-full mr-3"></div>
                  Eventuele accessoires
                </li>
              </ul>
            </div>
          </div>

          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <Clock className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">Snelle Service</h4>
              <p className="text-sm text-blue-100">Meeste reparaties binnen 30 min - 1,5 uur</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <Shield className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">Garantie</h4>
              <p className="text-sm text-blue-100">Tot 6 maanden garantie</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
              <Star className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
              <h4 className="font-semibold mb-2">Kwaliteit</h4>
              <p className="text-sm text-blue-100">Originele onderdelen</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}