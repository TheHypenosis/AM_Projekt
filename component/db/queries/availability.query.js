import db from '../db'; 

export const getAvailability = async (prodID) => {
    const query = 'SELECT SizeName, isAvailable FROM ProdSize WHERE ProdID = ?';
    const params = [`${prodID}`];
    console.log('Query:', query);
    console.log('Params:', params);
    return new Promise((resolve, reject) => {
        db.transaction((transaction) => {
          transaction.executeSql(
            query,
            params,
            (_, result) => {
              const data = [];
              for (let i = 0; i < result.rows.length; i++) {
                const itemAvailability = result.rows.item(i);
                data.push(itemAvailability);
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