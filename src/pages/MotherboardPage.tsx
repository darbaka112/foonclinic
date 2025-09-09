import React, { useEffect, useRef } from 'react';
import { Cpu, Zap, Shield, Clock, CheckCircle, AlertTriangle, Wrench, Star } from 'lucide-react';

interface MotherboardPageProps {
  onPageChange?: (page: string) => void;
}

export default function MotherboardPage({ onPageChange }: MotherboardPageProps) {
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);

  const handlePageChange = (page: string) => {
    if (onPageChange) {
      onPageChange(page);
      window.scrollTo(0, 0);
    }
  };

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

  const problems = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Telefoon gaat niet aan',
      description: 'Apparaat reageert niet meer, geen teken van leven'
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Bootloop problemen',
      description: 'Telefoon blijft hangen op Apple logo'
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: 'Oververhitting',
      description: 'Apparaat wordt extreem heet tijdens gebruik'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Waterschade gevolgen',
      description: 'Corrosie en schade na contact met vloeistof'
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Diagnose',
      description: 'Wij onderzoeken uw apparaat grondig om het exacte probleem te identificeren'
    },
    {
      step: '2',
      title: 'Kostenopgave',
      description: 'U ontvangt een transparante prijsopgave voordat wij beginnen'
    },
    {
      step: '3',
      title: 'Micro-solderen',
      description: 'Onze ervaren technici voeren precisiewerk uit op componentniveau'
    },
    {
      step: '4',
      title: 'Testen & Afleveren',
      description: 'Uitgebreid testen om te zorgen dat alles perfect werkt'
    }
  ];

  const features = [
    {
      icon: <Wrench className="h-6 w-6" />,
      title: 'Micro-solderen Expertise',
      description: 'Wij zijn gespecialiseerd in precisiewerk op moederbordniveau.'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '3-5 Werkdagen',
      description: 'Complexe reparaties vereisen meer tijd voor kwaliteit'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: '1 Maand Garantie',
      description: 'Garantie op de uitgevoerde moederbord reparatie'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: '8+ Jaar Ervaring',
      description: 'Uitgebreide ervaring met complexe elektronica reparaties'
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
              <Cpu className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Moederbord <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Reparatie</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Gespecialiseerd in complexe moederbord reparaties. Van micro-solderen tot 
              componentvervanging - wij lossen het op wat anderen niet kunnen.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20">
              <div className="flex items-center justify-center space-x-4 text-lg">
                <span className="font-semibold">Vanaf €85</span>
                <span className="text-blue-200">•</span>
                <span>1 Maand Garantie</span>
                <span className="text-blue-200">•</span>
                <span>3-5 Werkdagen</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button 
                onClick={() => handlePageChange('booking')}
                className="group relative bg-white text-[#19355c] px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10">Reparatie Plannen</span>
              </button>
              <a href="tel:0685550154" className="group relative border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10 group-hover:text-[#19355c] transition-colors duration-300">Bel Nu: 06-85550154</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve - Modern Cards */}
      <section className="py-20 bg-gray-50 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-[#19355c]/10 rounded-full text-[#19355c] font-semibold text-sm mb-6">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Problemen die wij oplossen
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Complexe <span className="text-[#19355c]">moederbord</span> problemen
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Moederbord problemen zijn complex, maar wij hebben de expertise om ze op te lossen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                <div className="text-[#19355c] flex justify-center mb-6 transform hover:scale-110 transition-transform duration-300">
                  <div className="w-16 h-16 bg-[#19355c]/10 rounded-2xl flex items-center justify-center">
                    {problem.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Professional Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-[#19355c]/10 rounded-full text-[#19355c] font-semibold text-sm mb-6">
              <Wrench className="h-4 w-4 mr-2" />
              Ons Proces
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stap voor stap naar een 
              <span className="block text-[#19355c]">werkende telefoon</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#19355c] to-gray-300 transform translate-x-4"></div>
                )}
                
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#19355c] to-[#0f2a47] text-white rounded-2xl text-2xl font-bold mx-auto mb-6 shadow-xl">
                    {step.step}
                    <div className="absolute inset-0 bg-white/20 rounded-2xl transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Liquid Glass Cards */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#19355c] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full text-[#19355c] font-semibold text-sm mb-6 border border-white/40 shadow-lg">
              <Star className="h-4 w-4 mr-2" />
              Waarom kiezen voor ons?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Onze <span className="bg-gradient-to-r from-[#19355c] to-blue-600 bg-clip-text text-transparent">expertise</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/60 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Liquid Glass Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#19355c]/5 rounded-3xl pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#19355c]/10 rounded-full blur-2xl group-hover:bg-[#19355c]/20 transition-all duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                <div className="relative z-10 text-center">
                  <div className="text-[#19355c] flex justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <div className="w-16 h-16 bg-[#19355c]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#19355c]/20 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[#19355c] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl shadow-2xl p-10 border border-yellow-200">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-yellow-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Belangrijk om te weten
                </h3>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    In de meeste gevallen kunnen we je moederbord weer tot leven wekken. Dat vraagt soms extra tijd voor diagnose en nauwkeurig microsolderen—af en toe in etappes. Voor we beginnen, lopen we samen de opties, tijd en kosten door.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200">
                      <h4 className="font-bold text-gray-900 mb-2">Diagnose €25</h4>
                      <p className="text-gray-600">Garantie mits er geen andere bijzonderheden zijn. Mocht je verder willen gaan met repareren dan wordt de €25 verrekend in de reparatiekosten.</p>
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200">
                      <h4 className="font-bold text-gray-900 mb-2">Gegevens backup aanbevolen</h4>
                      <p className="text-gray-600">Een kapot moederbord betekent meestal dat backup maken niet meer mogelijk is.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Interactive Particles Background */}
      <section className="relative bg-[#19355c] text-white py-20 overflow-hidden">
        {/* Interactive Particles Canvas */}
        <canvas 
          ref={ctaCanvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Moederbord <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">problemen?</span>
            </h2>
            <p className="text-xl mb-10 text-blue-100 leading-relaxed">
              Laat ons uw apparaat gratis diagnosticeren en ontdek of wij uw moederbord kunnen repareren
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => handlePageChange('booking')}
                className="group relative bg-white text-[#19355c] px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10 flex items-center">
                  <Cpu className="h-5 w-5 mr-2" />
                  Reparatie Plannen
                </span>
              </button>
              
              <div className="flex items-center space-x-4 text-blue-100">
                <div className="w-px h-12 bg-blue-300/50"></div>
                <div className="text-left">
                  <p className="text-sm font-medium">Direct contact</p>
                  <a href="tel:0685550154" className="text-lg font-bold hover:text-white transition-colors">
                    06-85550154
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Clock className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Reparatietijd</h4>
                <p className="text-sm text-blue-100">3-5 werkdagen</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Garantie</h4>
                <p className="text-sm text-blue-100">1 maand garantie</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Star className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Expertise</h4>
                <p className="text-sm text-blue-100">8+ jaar ervaring</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}