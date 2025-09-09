import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Users, Star, Shield } from 'lucide-react';

export default function ContactPage() {
  const ctaCanvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    model: '',
    problem: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Device models mapping
  const deviceModels = {
    'Apple': [
      'AirPods',
      'Apple Watch',
      'iPad',
      'iPhone',
      'Macbook'
    ],
    'Samsung': [
      'Samsung Galaxy A series',
      'Samsung Galaxy F series',
      'Samsung Galaxy M series',
      'Samsung Galaxy Note series',
      'Samsung Galaxy S series',
      'Samsung Galaxy Watch series'
    ],
    'Overige apparaten': [
      'Desktop',
      'Laptop',
      'Nintendo',
      'PlayStation',
      'Xbox'
    ]
  };

  // Get available models based on selected device brand
  const getAvailableModels = () => {
    return deviceModels[formData.device as keyof typeof deviceModels] || [];
  };

  // Interactive particles for hero section
  useEffect(() => {
    const canvas = ctaCanvasRef.current;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      email: '',
      phone: '',
      device: '',
      model: '',
      problem: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Reset model when device brand changes
    if (name === 'device') {
      setFormData({
        ...formData,
        [name]: value,
        model: '' // Reset model selection
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Adres',
      details: ['Tolhûswei 2', '8501 ZR Joure', 'Nederland'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Telefoon',
      details: ['06-85550154', 'WhatsApp: 06-85550154'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email',
      details: ['foonclinic@hotmail.com'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Openingstijden',
      details: ['Open op afspraak'],
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Professional Hero Section with Interactive Particles */}
      <section className="relative bg-[#19355c] text-white py-32 overflow-hidden">
        {/* Interactive Particles Canvas */}
        <canvas 
          ref={ctaCanvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl mb-8 border border-white/20">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Neem <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Contact</span> Op
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Heeft u vragen over onze diensten of wilt u een afspraak maken? 
              Wij helpen u graag verder met professionele service!
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Info Cards */}
      <section className="py-20 bg-gray-50 -mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div 
                key={index} 
                className="group relative bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-3xl border border-gray-100 overflow-hidden"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                <div className="relative z-10">
                  <div className={`text-white flex justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-[#19355c] transition-colors duration-300">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section - Liquid Glass Design */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-[#19355c] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full text-[#19355c] font-semibold text-sm mb-6 border border-white/40 shadow-lg">
              <Send className="h-4 w-4 mr-2" />
              Contact Formulier
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Stuur ons een <span className="bg-gradient-to-r from-[#19355c] to-blue-600 bg-clip-text text-transparent">bericht</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form - Liquid Glass */}
            <div 
              className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
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

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-[#19355c] transition-colors duration-300">
                  Stuur ons een bericht
                </h3>

                {isSubmitted && (
                  <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-4 mb-6 flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800 font-medium">Bedankt! Uw bericht is verzonden.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Naam *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80"
                        placeholder="Uw volledige naam"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80"
                        placeholder="uw.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefoon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80"
                        placeholder="06-12345678"
                      />
                    </div>
                    <div>
                      <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-2">
                        Merk
                      </label>
                      <select
                        id="device"
                        name="device"
                        value={formData.device}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80"
                      >
                        <option value="">Selecteer het merk</option>
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Overige apparaten">Overige apparaten</option>
                      </select>
                    </div>
                    
                    {/* Model Selection - Only show when device brand is selected */}
                    {formData.device && (
                      <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                          Model
                        </label>
                        <select
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80"
                        >
                          <option value="">Selecteer het model</option>
                          {getAvailableModels().map((model) => (
                            <option key={model} value={model}>
                              {model}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-2">
                      Probleem
                    </label>
                    <select
                      id="problem"
                      name="problem"
                      value={formData.problem}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80"
                    >
                      <option value="">Selecteer het probleem</option>
                      <option value="Gebroken scherm">Gebroken scherm</option>
                      <option value="Batterij problemen">Batterij problemen</option>
                      <option value="Waterschade">Waterschade</option>
                      <option value="Camera defect">Camera defect</option>
                      <option value="Laadpoort defect">Laadpoort defect</option>
                      <option value="Speaker/microfoon">Speaker/microfoon</option>
                      <option value="Software problemen">Software problemen</option>
                      <option value="Anders">Anders</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Bericht
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl focus:ring-2 focus:ring-[#19355c] focus:border-transparent transition-all duration-300 hover:bg-white/80 resize-none"
                      placeholder="Beschrijf uw probleem of vraag in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full bg-gradient-to-r from-[#19355c] to-[#0f2a47] text-white px-8 py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f2a47] to-[#19355c] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Verstuur Bericht</span>
                    </span>
                  </button>
                </form>
              </div>
            </div>

            {/* Map & Additional Info - Liquid Glass */}
            <div className="space-y-8">
              {/* Map Container */}
              <div 
                className="group relative bg-white/40 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                {/* Liquid Glass Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#19355c]/5 rounded-3xl pointer-events-none"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl group-hover:bg-blue-300/20 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 group-hover:text-[#19355c] transition-colors duration-300">
                    Bezoek onze winkel
                  </h3>
                  
                  {/* Google Maps */}
                  <div className="rounded-2xl overflow-hidden shadow-xl mb-6 transform hover:scale-105 transition-transform duration-300">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2402.7639356208683!2d5.7905623762221285!3d52.97066090276743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c8f4357483d8b3%3A0x945eb738760c56ae!2sTolh%C3%BBswei%202%2C%208501%20ZR%20Joure!5e0!3m2!1snl!2snl!4v1757095137021!5m2!1snl!2snl" 
                      width="100%" 
                      height="300" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Foon Clinic Locatie - Tolhûswei 2, Joure"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className="group relative bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-green-600/5 rounded-2xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-[#19355c] mb-4 flex items-center">
                      <Phone className="h-5 w-5 mr-2" />
                      Snel Contact
                    </h4>
                    <div className="space-y-3">
                      <a href="tel:0685550154" className="flex items-center text-gray-700 hover:text-[#19355c] transition-colors duration-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        06-85550154
                      </a>
                      <a href="mailto:foonclinic@hotmail.com" className="flex items-center text-gray-700 hover:text-[#19355c] transition-colors duration-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                        foonclinic@hotmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div 
                  className="group relative bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-transparent to-red-600/5 rounded-2xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <h4 className="text-lg font-bold text-red-700 mb-4 flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Spoedreparaties
                    </h4>
                    <p className="text-gray-700 mb-3 text-sm">
                      Heeft u een spoedgeval? Bel ons direct!
                    </p>
                    <a href="tel:0685550154" className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-300 text-sm">
                      Bel Nu: 06-85550154
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}