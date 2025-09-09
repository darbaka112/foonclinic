import React from 'react';
import { Smartphone, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onPageChange?: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 rounded-tl-3xl rounded-tr-3xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/Afbeelding van WhatsApp op 2025-09-04 om 19.48.28_ad489505.jpg" 
                alt="Foon Clinic Logo" 
                className="h-10 w-10 object-contain rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">Foon Clinic</h3>
                <p className="text-gray-600 text-sm">Professionele Telefoonreparatie</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Wij zijn gespecialiseerd in het repareren van alle soorten smartphones en tablets. 
              Snelle service, eerlijke prijzen en kwaliteitsgarantie.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Contact Informatie</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#19355c]" />
                <span className="text-gray-600">Tolhûswei 2, 8501 ZR Joure</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#19355c]" />
                <a href="tel:0685550154" className="text-gray-600 hover:text-[#19355c] transition-colors">06-85550154</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#19355c]" />
                <a href="mailto:foonclinic@hotmail.com" className="text-gray-600 hover:text-[#19355c] transition-colors">foonclinic@hotmail.com</a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900">Openingstijden</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-[#19355c]" />
                <div className="text-gray-600">
                  <p>Open op afspraak</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <div className="mb-4">
            <button 
              onClick={() => onPageChange?.('terms')}
              className="text-[#19355c] hover:text-[#0f2a47] transition-colors"
            >
              Algemene Voorwaarden
            </button>
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Foon Clinic. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}