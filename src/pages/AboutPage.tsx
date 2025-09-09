import React, { useEffect, useRef } from 'react';
import { Users, Award, Clock, Heart, Wrench, Shield, Star, CheckCircle } from 'lucide-react';

interface AboutPageProps {
  onPageChange?: (page: string) => void;
}

export default function AboutPage({ onPageChange }: AboutPageProps) {
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

  const stats = [
    { number: '8+', label: 'Jaar Ervaring', icon: <Clock className="h-8 w-8" /> },
    { number: '500+', label: 'Tevreden Klanten', icon: <Users className="h-8 w-8" /> },
    { number: '900+', label: 'Reparaties Uitgevoerd', icon: <Wrench className="h-8 w-8" /> },
    { number: '87%', label: 'Succespercentage', icon: <Award className="h-8 w-8" /> }
  ];

  const values = [
    {
      icon: <Heart className="h-12 w-12" />,
      title: 'Klanttevredenheid',
      description: 'Uw tevredenheid staat bij ons altijd op de eerste plaats. Wij gaan pas tevreden naar huis als u dat ook bent.',
      features: ['24/7 Support', 'Persoonlijke Service', 'Leen Toestel', 'Klantgerichte Aanpak']
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'Kwaliteit & Garantie',
      description: 'Wij gebruiken alleen originele of hoogwaardige onderdelen en geven 6 maanden garantie op alle reparaties.',
      features: ['Originele Onderdelen', '6 Maanden Garantie', 'Kwaliteitscontrole']
    },
    {
      icon: <Clock className="h-12 w-12" />,
      title: 'Snelle Service',
      description: 'Tijd is kostbaar. Daarom proberen wij de meeste reparaties binnen 1-2 uur uit te voeren.',
      features: ['Express Service', '30 min - 1,5 Uur Reparatie', 'Spoedbehandeling']
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: 'Vakmanschap',
      description: 'Onze technici zijn opgeleid en gecertificeerd voor het repareren van alle populaire smartphone merken.',
      features: ['Gecertificeerde Technici', '8+ Jaar Ervaring', 'Alle Merken']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Professional Style */}
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
              <Users className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Over <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Foon Clinic</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Al meer dan 8 jaar uw betrouwbare partner voor professionele telefoonreparaties. 
              Wij combineren vakmanschap met de nieuwste technologie.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section - Modern Cards */}
      <section className="py-20 bg-gray-50 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                <div className="text-[#19355c] flex justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Professional Layout */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-[#19355c]/10 rounded-full text-[#19355c] font-semibold text-sm mb-6">
                  <Star className="h-4 w-4 mr-2" />
                  Ons Verhaal
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Meer dan 8 jaar 
                  <span className="block text-[#19355c]">ervaring</span>
                </h2>
              </div>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Al meer dan 8 jaar ervaring in elektronica reparatie vormt de basis van onze service. 
                  Met diepgaande kennis van zowel hardware als software lossen wij storingen op die vaak 
                  onoplosbaar lijken.
                </p>
                <p>
                  Dankzij onze persoonlijke aanpak kunt u rekenen op een snelle en duurzame oplossing. 
                  FoonClinic is de vertrouwde keuze voor het herstellen van uw apparaten.
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  <div className="w-12 h-12 bg-[#19355c] rounded-full flex items-center justify-center text-white font-bold">FC</div>
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">8+</div>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Foon Clinic Team</p>
                  <p className="text-gray-600">8+ jaar ervaring</p>
                </div>
              </div>
            </div>

            {/* Right Image/Content */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#19355c] to-[#0f2a47] rounded-3xl p-8 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 bg-blue-300 rounded-full blur-xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Ervaren Professionals</h3>
                      <p className="text-blue-200">Uw vertrouwde partner</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 text-blue-100">
                    <p>
                      Bij FoonClinic hebben we meer dan 8 jaar ervaring in het vakgebied van elektronica reparatie. 
                      Gedurende deze tijd hebben we ons gespecialiseerd in zowel hardware- als softwareherstellingen.
                    </p>
                    <p>
                      Wij begrijpen dat wanneer een apparaat defect is, het niet alleen gaat om het herstellen van 
                      de functionaliteit, maar ook om het herstellen van vertrouwen.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm text-blue-200">Tevreden klanten</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-blue-200">Succespercentage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Liquid Glass UI/UX */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#19355c] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full text-[#19355c] font-semibold text-sm mb-6 border border-white/40 shadow-lg">
              <Heart className="h-4 w-4 mr-2" />
              Onze Waarden
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Wie zijn <span className="bg-gradient-to-r from-[#19355c] to-blue-600 bg-clip-text text-transparent">wij?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Deze principes staan centraal in alles wat wij doen en maken ons tot uw vertrouwde partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
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
                <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-blue-300/20 rounded-full blur-xl group-hover:bg-blue-300/30 transition-all duration-500"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl border border-white/40 group-hover:border-white/60 transition-all duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-[#19355c] mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {value.icon}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#19355c] transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {value.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {value.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-[#19355c] rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#19355c] transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Hover Indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-full h-1 bg-gradient-to-r from-[#19355c] to-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </div>
                </div>
              </div>
            ))}
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
              Ervaar het <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">verschil</span> zelf
            </h2>
            <p className="text-xl mb-10 text-blue-100 leading-relaxed">
              Kom langs in onze winkel en ontdek waarom duizenden klanten ons vertrouwen. 
              Ervaar onze professionele service en vakmanschap uit eerste hand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => onPageChange?.('contact')}
                className="group relative bg-white text-[#19355c] px-10 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <span className="relative z-10 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Bezoek Onze Winkel
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
                <h4 className="font-semibold mb-2">Openingstijden</h4>
                <p className="text-sm text-blue-100">Open op afspraak</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Shield className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Garantie</h4>
                <p className="text-sm text-blue-100">Tot 6 maanden</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Star className="h-8 w-8 text-blue-200 mb-3 mx-auto" />
                <h4 className="font-semibold mb-2">Kwaliteit</h4>
                <p className="text-sm text-blue-100">Originele onderdelen</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}