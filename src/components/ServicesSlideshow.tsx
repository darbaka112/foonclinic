import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Battery, Droplets, Wrench, Cpu, Shield, Star, Clock, Play, Pause } from 'lucide-react';

interface Service {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  guarantee: string;
  duration: string;
  category: string;
  popular: boolean;
  image: string;
}

interface ServicesSlideshowProps {
  onPageChange?: (page: string) => void;
}

export default function ServicesSlideshow({ onPageChange }: ServicesSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const services: Service[] = [
    {
      id: 1,
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Scherm Reparatie',
      description: 'Gebroken scherm? Wij vervangen het snel en professioneel met originele onderdelen.',
      price: 'Vanaf €50',
      guarantee: '6 maanden garantie',
      duration: '30 min - 1,5 uur',
      category: 'Hardware',
      popular: true,
      image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      icon: <Battery className="h-8 w-8" />,
      title: 'Batterij Vervanging',
      description: 'Merk je dat je batterij steeds sneller leegloopt? In een half uurtje zit er bij ons weer een nieuwe batterij in.',
      price: 'Vanaf €50',
      guarantee: '3 maanden garantie',
      duration: '30 min',
      category: 'Hardware',
      popular: false,
      image: '/image.png'
    },
    {
      id: 3,
      icon: <Droplets className="h-8 w-8" />,
      title: 'Waterschade Reparatie',
      description: 'Telefoon in het water gevallen? Geen paniek, met onze ervaring in waterschadeherstel krijgen we veel toestellen weer werkend.',
      price: 'Vanaf €30',
      guarantee: 'Geen garantie',
      duration: '2-3 dagen',
      category: 'Noodreparatie',
      popular: false,
      image: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 4,
      icon: <Wrench className="h-8 w-8" />,
      title: 'Algemene Reparaties',
      description: 'Camera, speakers, knoppen en meer reparaties door ervaren technici.',
      price: 'Op aanvraag',
      guarantee: '6 maanden garantie',
      duration: '1-3 uur',
      category: 'Hardware',
      popular: false,
      image: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 5,
      icon: <Cpu className="h-8 w-8" />,
      title: 'Moederbord Reparatie',
      description: 'Complexe moederbord problemen professioneel opgelost met micro-solderen.',
      price: 'Vanaf €85',
      guarantee: '1 maand garantie',
      duration: '3-5 dagen',
      category: 'Specialist',
      popular: false,
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 6,
      icon: <Shield className="h-8 w-8" />,
      title: 'Software Herstel',
      description: 'Systeem crashes, bootloops en software problemen vakkundig opgelost.',
      price: 'Vanaf €40',
      guarantee: '1 maand garantie',
      duration: '1-2 uur',
      category: 'Software',
      popular: false,
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 7,
      icon: <Star className="h-8 w-8" />,
      title: 'Premium Service',
      description: 'Prioriteit behandeling met express service en pickup/delivery service.',
      price: 'Vanaf €25 extra',
      guarantee: 'Standaard garantie',
      duration: 'Express',
      category: 'Service',
      popular: true,
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 8,
      icon: <Clock className="h-8 w-8" />,
      title: 'Preventief Onderhoud',
      description: 'Complete check-up, reiniging en optimalisatie van uw apparaat.',
      price: 'Vanaf €35',
      guarantee: '3 maanden garantie',
      duration: '45 min',
      category: 'Onderhoud',
      popular: false,
      image: 'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const cardWidth = 308; // Card width including gap
  const totalServices = services.length;
  
  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (totalServices * 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (totalServices * 2)) % (totalServices * 2));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsPaused(!isPaused);
  };

  // Calculate transform value
  const translateX = -currentIndex * cardWidth;
  
  // Reset position when we've scrolled through all duplicates
  useEffect(() => {
    if (currentIndex >= totalServices) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - totalServices);
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, totalServices]);

  return (
    <div 
      className="relative bg-white py-20 overflow-hidden w-full"
    >
      {/* Background Pattern - Subtle for white background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#19355c] rounded-full blur-3xl animate-pulse opacity-5"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#19355c] rounded-full blur-3xl animate-pulse opacity-5" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#19355c] rounded-full blur-2xl animate-pulse opacity-5" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 relative overflow-hidden">
            <span className="inline-block animate-slide-in-left text-gray-900">Onze</span>
            {' '}
            <span className="inline-block animate-slide-in-right animate-delay-300 bg-gradient-to-r from-[#19355c] to-[#0f2a47] bg-clip-text text-transparent relative">
              Diensten
              {/* Animated underline */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#19355c] to-[#0f2a47] transform scale-x-0 animate-scale-x-in animate-delay-500 origin-left"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professionele reparatiediensten voor alle populaire smartphone merken
          </p>
        </div>

        {/* Continuous Scrolling Cards Container */}
        <div className="relative overflow-hidden" style={{ height: '480px' }}>
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-[#19355c] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm hover:bg-white text-[#19355c] p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <div 
            className={`flex gap-8 ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ 
              transform: `translateX(${translateX}px)`,
              width: `${(totalServices * 2) * cardWidth}px`
            }}
          >
            {/* Render services twice for seamless infinite loop */}
            {[...services, ...services].map((service, index) => (
              <div
                key={`${service.id}-${index}`}
                className="group relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2 flex-shrink-0 flex flex-col"
                style={{ width: '300px', height: '400px' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-2 -right-2 z-20">
                    <div className="bg-gradient-to-r from-[#19355c] to-[#0f2a47] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg transform rotate-12">
                      Populair
                    </div>
                  </div>
                )}

                {/* Image Section */}
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19355c]/30 via-transparent to-transparent"></div>
                  
                  {/* Category Tag */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                      {service.category}
                    </span>
                  </div>

                  {/* Icon Overlay */}
                  <div className="absolute bottom-2 right-2">
                    <div className="bg-gradient-to-br from-[#19355c] to-[#0f2a47] text-white p-2 rounded-xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-[#19355c] transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm flex-grow">
                    {service.description}
                  </p>

                  {/* Service Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Duur:</span>
                      <span className="font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-full text-xs">
                        {service.duration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 font-medium">Garantie:</span>
                      <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
                        {service.guarantee}
                      </span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="border-t border-gray-100 pt-3 mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xl font-bold bg-gradient-to-r from-[#19355c] to-[#0f2a47] bg-clip-text text-transparent">
                        {service.price}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => onPageChange?.('contact')}
                      className="w-full bg-gradient-to-r from-[#19355c] to-[#0f2a47] text-white py-2 px-4 rounded-xl font-semibold text-sm hover:from-[#0f2a47] hover:to-[#19355c] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Meer Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          {/* Dots */}
          <div className="flex space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex % totalServices === index
                    ? 'w-8 h-3 bg-[#19355c]' 
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={toggleAutoPlay}
            className="ml-4 bg-[#19355c] text-white p-2 rounded-full hover:bg-[#0f2a47] transition-all duration-300 hover:scale-110"
            title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}