import React from 'react';
import { FileText, Shield, Clock, AlertCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#19355c] to-[#0f2a47] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Algemene <span className="text-blue-200">Voorwaarden</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Transparante voorwaarden voor onze reparatiediensten
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="h-8 w-8 text-[#19355c]" />
                <h2 className="text-2xl font-bold text-gray-900">1. Definities</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>1.1</strong> In deze voorwaarden wordt verstaan onder:
                </p>
                <p>
                  <strong>Klant:</strong> de persoon of rechtspersoon die gebruikmaakt van de diensten van Foon Clinic.
                </p>
                <p>
                  <strong>Apparaat:</strong> het toestel of elektronische apparaat dat door de klant ter reparatie wordt aangeboden.
                </p>
                <p>
                  <strong>Reparatie:</strong> de dienst die bestaat uit het herstel of de vervanging van onderdelen van het apparaat.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="h-8 w-8 text-[#19355c]" />
                <h2 className="text-2xl font-bold text-gray-900">2. Beperking van Garantie en Aansprakelijkheid</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>2.1</strong> Foon Clinic biedt een beperkte garantie van 3 maanden op het vervangen onderdeel. Er wordt geen garantie verleend op andere onderdelen van het apparaat.
                </p>
                <p>
                  <strong>2.2</strong> Foon Clinic is niet aansprakelijk voor enige vorm van directe of indirecte schade, inclusief maar niet beperkt tot gegevensverlies, verlies van gebruik, of verlies van inkomen als gevolg van defecten na reparatie.
                </p>
                <p>
                  <strong>2.3</strong> De klant erkent dat bepaalde problemen (zoals waterschade of valschade) leiden tot onvoorziene complicaties waarvoor Foon Clinic niet aansprakelijk kan worden gehouden, ook niet indien deze pas later aan het licht komen.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Gegevens en Privacy</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>3.1</strong> De klant is verantwoordelijk voor het maken van een back-up van alle gegevens op het apparaat. Foon Clinic is niet aansprakelijk voor verlies van data of persoonlijke gegevens tijdens of na de reparatie.
                </p>
                <p>
                  <strong>3.2</strong> Foon Clinic behoudt zich het recht voor om het apparaat zonder toegang tot klantgegevens te repareren, en neemt geen verantwoordelijkheid voor mogelijke inbreuken op privacy door derden.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Diagnose- en Onderzoekskosten</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>4.1</strong> Indien een apparaat niet gerepareerd kan worden, kan Foon Clinic diagnosekosten in rekening brengen. Deze kosten worden ook gerekend indien de klant besluit om de reparatie niet uit te laten voeren.
                </p>
                <p>
                  <strong>4.2</strong> De klant is verantwoordelijk voor volledige betaling van onderzoekskosten, ongeacht het uiteindelijke resultaat van de reparatie.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Onderdelen en Installatie</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>5.1</strong> Foon Clinic gebruikt originele of hoogwaardige, gelijkwaardige onderdelen, maar kan niet garanderen dat deze identiek zijn aan de oorspronkelijke onderdelen van het apparaat.
                </p>
                <p>
                  <strong>5.2</strong> Foon Clinic is niet verantwoordelijk voor defecten als gevolg van fabrieksfouten of andere verborgen gebreken in het apparaat, ongeacht de kwaliteit van de geïnstalleerde onderdelen.
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Klantverantwoordelijkheid en Toestemming</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>6.1</strong> De klant geeft Foon Clinic toestemming om het apparaat te openen en te onderzoeken. De klant accepteert dat dit mogelijk invloed heeft op de fabrieksgarantie van het apparaat.
                </p>
                <p>
                  <strong>6.2</strong> Apparaten die eerder door andere dienstverleners zijn gerepareerd vallen buiten enige garantie van Foon Clinic, en Foon Clinic is niet aansprakelijk voor reeds aanwezige problemen.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Beleid voor Niet-opgehaalde Apparaten</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>7.1</strong> De klant dient het apparaat binnen 31 dagen na de reparatie op te halen.
                </p>
                <p>
                  <strong>7.2</strong> Apparaten die na 90 dagen niet zijn opgehaald, kunnen door Foon Clinic hergebruikt/gerecycled worden of vernietigd.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Betaling en Retentierecht</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>8.1</strong> De klant dient de volledige betaling te verrichten voordat het apparaat wordt teruggegeven.
                </p>
                <p>
                  <strong>8.2</strong> Foon Clinic behoudt zich het recht voor om het apparaat in bezit te houden totdat volledige betaling is ontvangen.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Uitsluiting van Verborgen Gebreken</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>9.1</strong> Foon Clinic is niet aansprakelijk voor eventuele verborgen gebreken die tijdens de reparatie aan het licht komen en die additionele kosten met zich mee kunnen brengen. Deze kosten worden eerst besproken met de klant.
                </p>
                <p>
                  <strong>9.2</strong> Indien tijdens de reparatie blijkt dat het apparaat onherstelbaar is door verborgen schade, blijft de klant verantwoordelijk voor de reeds gemaakte diagnose- en reparatiekosten.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Overmacht</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>10.1</strong> Foon Clinic is niet verantwoordelijk voor vertragingen of schade door overmacht, zoals natuurrampen, stroomuitval, of storingen in de levering van onderdelen.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Toepasselijk Recht en Geschillen</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>11.1</strong> Op deze algemene voorwaarden is Nederlands recht van toepassing.
                </p>
                <p>
                  <strong>11.2</strong> Geschillen worden, indien mogelijk, opgelost via bemiddeling. Bij uitblijvende oplossing wordt het geschil voorgelegd aan de bevoegde rechter.
                </p>
              </div>
            </div>

            {/* Section 12 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Insteek tot Herstel naar Fabriekskwaliteit</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>12.1</strong> Het doel van Foon Clinic is om het apparaat zoveel mogelijk te herstellen naar de oorspronkelijke fabriekskwaliteit. Dit houdt in dat de reparatie wordt uitgevoerd met zorg en precisie, gericht op de best mogelijke staat van het apparaat.
                </p>
                <p>
                  <strong>12.2</strong> Foon Clinic kan echter niet garanderen dat elk apparaat volledig naar fabriekskwaliteit hersteld kan worden. Bij toestellen met ernstige schade, zoals buigingen, kromme behuizingen, of andere structurele defecten, kan dit niet altijd worden gerealiseerd.
                </p>
                <p>
                  <strong>12.3</strong> Indien de klant ervoor kiest om bepaalde defecte onderdelen niet te laten vervangen of herstellen, accepteert de klant dat Foon Clinic niet verantwoordelijk kan worden gehouden voor de volledige functionaliteit of esthetische staat van het apparaat.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Beperkingen bij Herstel naar Fabriekskwaliteit</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>13.1</strong> Foon Clinic zal de klant informeren over eventuele beperkingen in het herstelproces die het behalen van fabriekskwaliteit kunnen beïnvloeden. De klant dient akkoord te gaan met deze beperkingen alvorens de reparatie wordt uitgevoerd.
                </p>
                <p>
                  <strong>13.2</strong> Specifieke onderdelen kunnen dusdanig beschadigd zijn dat het overzetten van bepaalde componenten, zoals een IC-chip naar een nieuw scherm of een BMS-board, technisch niet haalbaar is. Foon Clinic doet zijn uiterste best om dergelijke onderdelen over te zetten, maar dit is afhankelijk van de staat van de componenten.
                </p>
                <p>
                  <strong>13.3</strong> De klant wordt vooraf geïnformeerd over beperkingen die de herstelkwaliteit beïnvloeden. Door akkoord te gaan met de reparatie, accepteert de klant deze mogelijke beperkingen.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">14. Garantie bij Reparaties/Moederbordreparaties</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>14.1</strong> Moederbordreparaties betreffen delicate elektronica en kunnen door de complexiteit en de aard van het component 1 maand garantie krijgen bij Foon Clinic.
                </p>
                <p>
                  <strong>14.2</strong> Foon Clinic informeert de klant vooraf over de risico's van moederbordreparaties en biedt deze dienst aan op 1 maand garantie op verdere functionaliteit of op een blijvend resultaat.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">15. Garantie op Reparaties</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>15.1 Schermen:</strong> Na reparatie van het scherm biedt Foon Clinic een garantie van 6 maanden op de vervangingen en het herstelde scherm. Deze garantie dekt defecten die ontstaan door fabricagefouten of andere defecten die verband houden met de vervanging van het scherm, maar is niet van toepassing op schade door bijvoorbeeld vallen, stoten, krassen of waterschade.
                </p>
                <p>
                  <strong>15.2 Accu's:</strong> Na vervanging van de accu biedt Foon Clinic een garantie van 3 maanden. Deze garantie dekt alleen defecten die voortkomen uit de vervangingsprocedure zelf, zoals het niet goed functioneren van de nieuwe accu. Schade door verkeerd gebruik of externe factoren valt buiten deze garantie.
                </p>
                <p>
                  <strong>15.3 Overige Onderdelen:</strong> Voor alle andere vervangingen van onderdelen (zoals camera's, sensoren, oplaadpoorten, etc.) biedt Foon Clinic een garantie van 6 maanden. Deze garantie geldt voor defecten die voortkomen uit de vervangingsprocedure of fabricagefouten, maar niet voor schade door externe invloeden zoals stoten, vallen, of waterschade.
                </p>
                <p>
                  <strong>15.4 Moederbord Reparaties:</strong> Na reparatie van het moederbord biedt Foon Clinic een garantie van 1 maand. Vanwege de complexiteit van moederbordreparaties kan het apparaat na verloop van tijd alsnog onherstelbare schade vertonen. De garantie dekt uitsluitend defecten die direct verband houden met de uitgevoerde reparatie.
                </p>
                <p>
                  <strong>15.5 Uitsluitingen van Garantie:</strong> De garantie is niet van toepassing in de volgende gevallen:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Schade door onzorgvuldig gebruik, zoals vallen, stoten of het in contact komen met water.</li>
                  <li>Schade door externe factoren zoals blikseminslag, overbelasting, of onjuiste software-updates.</li>
                  <li>Schade die veroorzaakt is door reparaties door derden of het openen van het apparaat na de reparatie.</li>
                </ul>
              </div>
            </div>

            {/* Section 16 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">16. Uitsluiting van Aansprakelijkheid na Behandeling door Derden</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>16.1</strong> Foon Clinic is niet aansprakelijk voor defecten, problemen of andere schade die ontstaat als gevolg van reparaties, aanpassingen of behandelingen uitgevoerd door andere reparateurs na de service van Foon Clinic.
                </p>
                <p>
                  <strong>16.2</strong> In het geval dat een apparaat na een reparatie bij Foon Clinic naar een andere dienstverlener wordt gebracht, vervalt automatisch elke garantie of verantwoordelijkheid van Foon Clinic met betrekking tot eerdere uitgevoerde reparaties.
                </p>
              </div>
            </div>

            {/* Section 17 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">17. Afwijkingen van de Voorwaarden</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>17.1</strong> Afwijkingen van deze algemene voorwaarden zijn alleen geldig indien ze schriftelijk met Foon Clinic zijn overeengekomen.
                </p>
              </div>
            </div>

            {/* Section 18 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">18. Meerwerk</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>18.1</strong> Indien na het sluiten van de overeenkomst blijkt dat extra werkzaamheden noodzakelijk zijn, zal Foon Clinic de klant hierover informeren en overleggen over de uitvoering en vergoeding van het meerwerk. De klant kan bezwaar maken tegen het meerwerk, maar is verplicht om de al uitgevoerde werkzaamheden te vergoeden.
                </p>
              </div>
            </div>

            {/* Section 19 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">19. Annulering van de Opdracht</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>19.1</strong> De klant kan de opdracht annuleren, maar alleen voor werkzaamheden die nog niet zijn uitgevoerd.
                </p>
              </div>
            </div>

            {/* Section 20 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">20. Toegangscode voor Testen van het Product</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>20.1</strong> Bij reparatie kan Foon Clinic vragen om een toegangscode om de functionaliteit van het product te testen. De klant is niet verplicht deze code te verstrekken, maar zonder toegangscode kan Foon Clinic niet garanderen dat alle functies van het product na reparatie goed werken.
                </p>
              </div>
            </div>

            {/* Section 21 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">21. Terugzetten naar Fabrieksinstellingen</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>21.1</strong> Foon Clinic kan het product terugzetten naar de fabrieksinstellingen indien dit noodzakelijk is voor de reparatie. Foon Clinic zal dit proberen te vermijden, maar kan dit niet altijd voorkomen.
                </p>
              </div>
            </div>

            {/* Section 22 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">22. Verantwoordelijkheid van de Klant</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>22.1</strong> De klant is verantwoordelijk voor het verstrekken van de juiste gegevens aan Foon Clinic om de reparatie correct uit te voeren.
                </p>
              </div>
            </div>

            {/* Section 23 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">23. Inschakeling van Derden</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>23.1</strong> Foon Clinic heeft het recht om derden in te schakelen voor de uitvoering van haar diensten zonder voorafgaande kennisgeving.
                </p>
              </div>
            </div>

            {/* Section 24 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">24. Reparatietijd</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>24.1</strong> Foon Clinic streeft ernaar om de meeste reparaties, zoals scherm- en accuwissels, binnen een uur uit te voeren.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 rounded-xl p-8 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="text-gray-700 mb-4">
                Heeft u vragen over deze algemene voorwaarden? Neem dan contact met ons op:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Foon Clinic</strong></p>
                <p>KvK: 83945768</p>
                <p>Tolhûswei 2</p>
                <p>8501 ZR Joure</p>
                <p>Telefoon: <a href="tel:0685550154" className="text-[#19355c] hover:text-[#0f2a47] transition-colors">06-85550154</a></p>
                <p>Email: <a href="mailto:foonclinic@hotmail.com" className="text-[#19355c] hover:text-[#0f2a47] transition-colors">foonclinic@hotmail.com</a></p>
              </div>
            </div>

            <div className="text-center mt-8 text-gray-500">
              <p>Laatst bijgewerkt: December 2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}