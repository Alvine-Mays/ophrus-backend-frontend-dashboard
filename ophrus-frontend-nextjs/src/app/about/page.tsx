'use client';

import React from 'react';
import { Award, Users, Shield, TrendingUp, Heart, Target, Eye, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

const AboutPage = () => {
  const stats = [
    { icon: TrendingUp, label: 'Propriétés vendues', value: '500+' },
    { icon: Users, label: 'Clients satisfaits', value: '1200+' },
    { icon: Shield, label: 'Taux de satisfaction', value: '98%' },
    { icon: Award, label: 'Années d\'expérience', value: '15+' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Nous sommes passionnés par l\'immobilier et mettons tout notre cœur dans chaque projet.'
    },
    {
      icon: Shield,
      title: 'Confiance',
      description: 'La confiance est la base de toute relation durable. Nous la cultivons chaque jour.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans tous nos services pour dépasser vos attentes.'
    },
    {
      icon: Eye,
      title: 'Transparence',
      description: 'Nous croyons en la transparence totale dans toutes nos transactions.'
    }
  ];

  const team = [
    {
      name: 'Jean-Claude MVOULA',
      role: 'Directeur Général',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: '15 ans d\'expérience dans l\'immobilier congolais'
    },
    {
      name: 'Marie NGOMA',
      role: 'Directrice Commerciale',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Experte en négociation et relation client'
    },
    {
      name: 'Paul MAKAYA',
      role: 'Responsable Technique',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Spécialiste en évaluation et expertise immobilière'
    },
    {
      name: 'Grace LOUBAKI',
      role: 'Responsable Marketing',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      description: 'Stratège en communication et marketing digital'
    }
  ];

  const services = [
    'Achat et vente de propriétés',
    'Location et gestion locative',
    'Estimation et expertise immobilière',
    'Conseil en investissement',
    'Accompagnement juridique',
    'Financement et crédit immobilier'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-primary to-blue-dark text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos d'Ophrus Immobilier</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Depuis 2009, nous révolutionnons le marché immobilier congolais avec passion, 
            expertise et innovation.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Faciliter l'accès à la propriété pour tous les Congolais en proposant des solutions 
                immobilières innovantes, transparentes et adaptées aux besoins de chacun. Nous nous 
                engageons à démocratiser l'immobilier et à accompagner nos clients dans la réalisation 
                de leurs rêves.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Notre Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Devenir la référence incontournable de l'immobilier au Congo-Brazzaville en créant 
                un écosystème digital moderne qui connecte propriétaires, locataires et investisseurs 
                dans un environnement de confiance mutuelle.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Notre mission"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Réalisations</h2>
            <p className="text-xl text-gray-600">Des chiffres qui témoignent de notre engagement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-primary to-blue-dark rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-xl text-gray-600">Les principes qui guident notre action quotidienne</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-primary bg-opacity-10 rounded-full mb-6">
                  <value.icon className="w-8 h-8 text-blue-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-xl text-gray-600">Des professionnels passionnés à votre service</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden text-center">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nos Services</h2>
              <p className="text-lg text-gray-600 mb-8">
                Nous offrons une gamme complète de services immobiliers pour répondre à tous vos besoins.
              </p>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Nos services"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
            <p className="text-xl text-gray-600">15 ans d'évolution et d'innovation</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-primary">2009</span>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Création d'Ophrus Immobilier</h3>
                  <p className="text-gray-600">Fondation de l'entreprise avec une vision claire : démocratiser l'accès à l'immobilier au Congo.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-primary">2015</span>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expansion nationale</h3>
                  <p className="text-gray-600">Ouverture de bureaux à Pointe-Noire et Dolisie pour mieux servir nos clients.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-primary">2020</span>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Transformation digitale</h3>
                  <p className="text-gray-600">Lancement de notre plateforme en ligne pour faciliter la recherche et la transaction immobilière.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-primary">2024</span>
                </div>
                <div className="ml-8 flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation continue</h3>
                  <p className="text-gray-600">Intégration de nouvelles technologies et services pour une expérience client optimale.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-primary to-blue-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Rejoignez Notre Communauté</h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez pourquoi des milliers de clients nous font confiance pour leurs projets immobiliers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="bg-white text-blue-primary hover:bg-gray-100">
              Voir nos propriétés
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-primary">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

