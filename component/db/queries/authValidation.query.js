import db from '../db';

export const getUserData = async ({ login, password }) => {
  const query = 'SELECT * FROM User WHERE Email = ? AND Password = ?';
  const params = [login, password];
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
            const userData = result.rows.item(i);
            data.push(userData);
          }
          resolve(data);
        },
        (_, error) => {
          console.error('Error fetching user data:', error);
          reject(error);
        }
      );
    });
  });
};
