interface CardDimensions {
  width: number;
  height: number;
}

interface StoredCardDimensions {
  [cardId: string]: CardDimensions;
}

const STORAGE_KEY = 'dashboard_card_dimensions';

export const saveCardDimensions = (cardId: string, dimensions: CardDimensions): void => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    const existingData: StoredCardDimensions = storedData ? JSON.parse(storedData) : {};
    
    existingData[cardId] = dimensions;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error saving card dimensions:', error);
  }
};

export const getCardDimensions = (cardId: string): CardDimensions | null => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return null;

    const existingData: StoredCardDimensions = JSON.parse(storedData);
    return existingData[cardId] || null;
  } catch (error) {
    console.error('Error getting card dimensions:', error);
    return null;
  }
};

export const getAllCardDimensions = (): StoredCardDimensions => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Error getting all card dimensions:', error);
    return {};
  }
};

export const removeCardDimensions = (cardId: string): void => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) return;

    const existingData: StoredCardDimensions = JSON.parse(storedData);
    delete existingData[cardId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
  } catch (error) {
    console.error('Error removing card dimensions:', error);
  }
}; 