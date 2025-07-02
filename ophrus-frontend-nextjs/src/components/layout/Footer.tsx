import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Propriétés', href: '/properties' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Achat', href: '/services/achat' },
    { name: 'Vente', href: '/services/vente' },
    { name: 'Location', href: '/services/location' },
    { name: 'Estimation', href: '/services/estimation' },
  ],
  legal: [
    { name: 'Mentions légales', href: '/legal/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/legal/confidentialite' },
    { name: 'Conditions d\'utilisation', href: '/legal/conditions' },
    { name: 'Cookies', href: '/legal/cookies' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/ophrus',
      icon: Facebook,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/ophrus',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/ophrus',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/ophrus',
      icon: Linkedin,
    },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/images/logo-white.svg"
                alt="Logo Ophrus"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">Ophrus</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              La plateforme immobilière moderne qui révolutionne votre expérience 
              d'achat, de vente et de location de propriétés.
            </p>
            
            {/* Informations de contact */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <a 
                  href="tel:+33123456789" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Téléphone"
                >
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <a 
                  href="mailto:contact@ophrus.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Email"
                >
                  contact@ophrus.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <address className="text-gray-300 not-italic">
                  123 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </address>
              </div>
            </div>
          </div>

          {/* Navigation principale */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations légales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Recevez les dernières actualités immobilières et nos meilleures offres.
            </p>
            <form className="flex space-x-3">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Adresse email pour la newsletter"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Réseaux sociaux et copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Suivez-nous sur ${item.name}`}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              © {currentYear} Ophrus. Tous droits réservés.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Plateforme immobilière certifiée et sécurisée
            </p>
          </div>
        </div>
      </div>

      {/* Schema.org JSON-LD pour l'organisation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Ophrus',
            url: 'https://ophrus.com',
            logo: 'https://ophrus.com/images/logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+33123456789',
              contactType: 'customer service',
              availableLanguage: 'French',
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Avenue des Champs-Élysées',
              addressLocality: 'Paris',
              postalCode: '75008',
              addressCountry: 'FR',
            },
            sameAs: [
              'https://facebook.com/ophrus',
              'https://twitter.com/ophrus',
              'https://instagram.com/ophrus',
              'https://linkedin.com/company/ophrus',
            ],
          }),
        }}
      />
    </footer>
  );
}

