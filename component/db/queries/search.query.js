import db from '../db'; 

export const getSearchResult = async (searchPhrase) => {
    const query = 'SELECT * FROM ProdCatalog WHERE Name LIKE ?';
    const params = [`%${searchPhrase}%`];
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
          transaction.executeSql(
            query,
            params,
            (_, result) => {
              const data = [];
              for (let i = 0; i < result.rows.length; i++) {
                const searchResultItem = result.rows.item(i);
                data.push(searchResultItem);
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