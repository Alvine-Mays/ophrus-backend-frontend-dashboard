import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreVertical,
  MapPin,
  Home,
  Calendar,
  DollarSign
} from 'lucide-react';
import { propertiesAPI } from '../../lib/api';

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    city: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });

  // Charger les propriétés
  const loadProperties = async (page = 1) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pagination.limit,
        search: searchTerm,
        ...filters
      };
      
      const response = await propertiesAPI.getAll(params);
      setProperties(response.data || []);
      setPagination(response.pagination || pagination);
    } catch (error) {
      console.error('Erreur lors du chargement des propriétés:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [searchTerm, filters]);

  // Supprimer une propriété
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      try {
        await propertiesAPI.delete(id);
        loadProperties(pagination.currentPage);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  // Changer le statut d'une propriété
  const handleStatusChange = async (id, newStatus) => {
    try {
      await propertiesAPI.update(id, { statut: newStatus });
      loadProperties(pagination.currentPage);
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error);
    }
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        {property.images && property.images[0] ? (
          <img
            src={property.images[0]}
            alt={property.titre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Badge de statut */}
        <div className="absolute top-2 left-2">
          <span className={`
            px-2 py-1 text-xs font-medium rounded-full
            ${property.statut === 'disponible' ? 'bg-green-100 text-green-800' : ''}
            ${property.statut === 'vendu' ? 'bg-red-100 text-red-800' : ''}
            ${property.statut === 'loue' ? 'bg-blue-100 text-blue-800' : ''}
            ${property.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' : ''}
          `}>
            {property.statut}
          </span>
        </div>

        {/* Menu d'actions */}
        <div className="absolute top-2 right-2">
          <div className="relative group">
            <button className="p-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            
            <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-1">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  Voir les détails
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </button>
                <button 
                  onClick={() => handleDelete(property._id)}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 truncate">
          {property.titre}
        </h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">{property.adresse}, {property.ville}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="capitalize">{property.type}</span>
          <span>{property.superficie} m²</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-blue-600">
            {property.prix?.toLocaleString()} CFA
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(property.dateCreation).toLocaleDateString()}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="mt-3 pt-3 border-t flex space-x-2">
          <select
            value={property.statut}
            onChange={(e) => handleStatusChange(property._id, e.target.value)}
            className="flex-1 text-xs border border-gray-300 rounded px-2 py-1"
          >
            <option value="disponible">Disponible</option>
            <option value="en_attente">En attente</option>
            <option value="vendu">Vendu</option>
            <option value="loue">Loué</option>
          </select>
        </div>
      </div>
    </div>
  );

  const PropertyTable = () => (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Propriété
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      {property.images && property.images[0] ? (
                        <img
                          className="h-10 w-10 rounded-lg object-cover"
                          src={property.images[0]}
                          alt={property.titre}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Home className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {property.titre}
                      </div>
                      <div className="text-sm text-gray-500">
                        {property.ville}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {property.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {property.prix?.toLocaleString()} CFA
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`
                    inline-flex px-2 py-1 text-xs font-semibold rounded-full
                    ${property.statut === 'disponible' ? 'bg-green-100 text-green-800' : ''}
                    ${property.statut === 'vendu' ? 'bg-red-100 text-red-800' : ''}
                    ${property.statut === 'loue' ? 'bg-blue-100 text-blue-800' : ''}
                    ${property.statut === 'en_attente' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                    {property.statut}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(property.dateCreation).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(property._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'table'

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Propriétés</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une propriété
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les types</option>
            <option value="maison">Maison</option>
            <option value="appartement">Appartement</option>
            <option value="terrain">Terrain</option>
            <option value="bureau">Bureau</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="disponible">Disponible</option>
            <option value="en_attente">En attente</option>
            <option value="vendu">Vendu</option>
            <option value="loue">Loué</option>
          </select>

          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Grille
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 rounded-lg ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Tableau
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des propriétés...</p>
        </div>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <PropertyTable />
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between bg-white px-6 py-3 rounded-lg shadow-sm border">
              <div className="text-sm text-gray-700">
                Affichage de {((pagination.currentPage - 1) * pagination.limit) + 1} à{' '}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)} sur{' '}
                {pagination.totalItems} résultats
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => loadProperties(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Précédent
                </button>
                <button
                  onClick={() => loadProperties(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PropertyManagement;

