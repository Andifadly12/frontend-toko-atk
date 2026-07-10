const useCard = ({ products = [], limitStock = 10 } = {}) => {
  const safeProducts = Array.isArray(products) ? products : [];

  const lowStockProducts = safeProducts.filter(product => {
    return Number(product.stock || 0) <= limitStock;
  });

  return {
    lowStockProducts,
  };
};

export default useCard;
