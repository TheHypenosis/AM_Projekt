import db from '../db';

export const addUserData = async ({ email, name, surname, phone, password, photo = "" }) => {
  const query = 'INSERT INTO User (Email, Name, Surname, Phone, Password, Photo) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [email, name, surname, phone, password, photo];
  console.log('Query:', query);
  console.log('Params:', params);

  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        query,
        params,
        (_, result) => {
          resolve({ success: true, message: 'User added successfully' });
        },
        (_, error) => {
          console.error('Error adding user data:', error);
          reject({ success: false, message: 'Error adding user' });
        }
      );
    });
  });
};
