import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Property {
  _id: string;
  address: string;
  size: string;
  category: 'apartment' | 'house' | 'office' | 'studio' | 'penthouse';
  title: string;
  favourite: boolean;
  description: string;
  images: string[];
  operation: 'rent' | 'sale';
  price: string;
  date_of_creation: string;
  rooms: string;
  bathrooms: string;
  visits: string[];
  amenities: {
    parking: boolean;
    ac: boolean;
    furnished: boolean;
    pool: boolean;
    microwave: boolean;
    near_subway: boolean;
    beach_view: boolean;
    alarm: boolean;
    garden: boolean;
  };
}

interface FavoritesContextProps {
  favorites: Property[];
  addToFavorites: (property: Property) => void;
  removeFromFavorites: (propertyId: string) => void;
}

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Property[]>([]);

  const addToFavorites = (property: Property) => {
    setFavorites((prevFavorites) => [...prevFavorites, property]);
  };

  const removeFromFavorites = (propertyId: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((property) => property._id !== propertyId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
