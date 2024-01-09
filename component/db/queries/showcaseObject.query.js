import db from '../db'; 

export const getNewsFeedShowcase = async () => {
    const query = 'SELECT * FROM ProdCatalog WHERE isNewsFeed = ?';
    const params = ['1'];
  
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          query,
          params,
          (_, result) => {
            const data = [];
            for (let i = 0; i < result.rows.length; i++) {
              const showcaseItem = result.rows.item(i);
              data.push(showcaseItem);
            }
            resolve(data);
          },
          (_, error) => {
            console.error('Error fetching News Feed showcase data:', error);
            reject(error);
          }
        );
      });
    });
  };

export const getBestsellerShowcase = async () => {
  const query = 'SELECT * FROM ProdCatalog WHERE isBestseller = ?';
  const params = ['1'];

  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        query,
        params,
        (_, result) => {
          const data = [];
          for (let i = 0; i < result.rows.length; i++) {
            const showcaseItem = result.rows.item(i);
            data.push(showcaseItem);
          }
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching Bestseller showcase data:', error);
          reject(error);
        }
      );
    });
  });
};
