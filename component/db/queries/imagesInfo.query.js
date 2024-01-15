import db from '../db'

  export const saveImageToDatabase = async (uri, email) => {
    const query = 'UPDATE User SET Photo = ? WHERE Email = ?';
    const params = [uri, email];
    console.log('Query:', query);
    console.log('Params:', params);
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
          transaction.executeSql(
              query,
              params,
              (_, result) => {
                resolve({ result });
            },
              (_, error) => {
                  console.error('Error inserting Photo data:', error);
                  reject(error);
              }
          );
      });
  });
  };