import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, Search, Shield, Users, Clock, CheckCircle } from 'lucide-react';

const IntroPage = () => {
  const [timeLeft, setTimeLeft] = useState(10); // 10 secondes de minuterie
  const [showSkipButton, setShowSkipButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Afficher le bouton "Suivant" après 2 secondes
    const skipButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    // Minuterie de 10 secondes
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          navigate('/home');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(skipButtonTimer);
      clearInterval(timer);
    };
  }, [navigate]);

  const handleSkip = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo et titre principal */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#009fe3] to-[#0077b3] rounded-full mb-6 shadow-lg">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bienvenue chez <span className="text-[#009fe3]">Ophrus Immobilier</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Votre partenaire de confiance pour l'immobilier au Congo-Brazzaville
          </p>
        </div>

        {/* Vision et mission */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Notre Vision</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Révolutionner le marché immobilier congolais en offrant une plateforme moderne, 
            sécurisée et accessible à tous. Nous connectons propriétaires et locataires 
            dans un environnement de confiance et de transparence.
          </p>

          {/* Fonctionnalités clés */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#009fe3] bg-opacity-10 rounded-lg mb-3">
                <Search className="w-6 h-6 text-[#009fe3]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recherche Avancée</h3>
              <p className="text-sm text-gray-600">
                Trouvez facilement votre bien idéal avec nos filtres intelligents
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#009fe3] bg-opacity-10 rounded-lg mb-3">
                <Shield className="w-6 h-6 text-[#009fe3]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sécurité Garantie</h3>
              <p className="text-sm text-gray-600">
                Toutes les annonces sont vérifiées pour votre sécurité
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#009fe3] bg-opacity-10 rounded-lg mb-3">
                <Users className="w-6 h-6 text-[#009fe3]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Communauté Active</h3>
              <p className="text-sm text-gray-600">
                Rejoignez des milliers d'utilisateurs satisfaits
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#009fe3] bg-opacity-10 rounded-lg mb-3">
                <CheckCircle className="w-6 h-6 text-[#009fe3]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Service Premium</h3>
              <p className="text-sm text-gray-600">
                Support client disponible 7j/7 pour vous accompagner
              </p>
            </div>
          </div>
        </div>

        {/* Comment ça fonctionne */}
        <div className="bg-gradient-to-r from-[#009fe3] to-[#0077b3] rounded-2xl shadow-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Comment ça fonctionne ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Créez votre compte</h3>
              <p className="text-sm opacity-90">
                Inscription gratuite et sécurisée en quelques clics
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Explorez les biens</h3>
              <p className="text-sm opacity-90">
                Parcourez notre catalogue de propriétés vérifiées
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-lg mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Contactez directement</h3>
              <p className="text-sm opacity-90">
                Échangez avec les propriétaires en toute sécurité
              </p>
            </div>
          </div>
        </div>

        {/* Minuterie et bouton */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Redirection automatique dans {timeLeft} secondes</span>
          </div>

          {showSkipButton && (
            <button
              onClick={handleSkip}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-[#009fe3] to-[#0077b3] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          )}
        </div>

        {/* Footer de la page intro */}
        <div className="mt-12 text-sm text-gray-500">
          <p>© 2025 Ophrus Immobilier - Votre avenir commence ici</p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;

