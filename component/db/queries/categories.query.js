import db from '../db'; 

export const getCategories = async () => {
    const query = 'SELECT Name FROM Category';
    const params = []; 
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
          transaction.executeSql(
            query,
            params,
            (_, result) => {
              const data = [];
              for (let i = 0; i < result.rows.length; i++) {
                const categoryItem = result.rows.item(i);
                data.push(categoryItem);
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