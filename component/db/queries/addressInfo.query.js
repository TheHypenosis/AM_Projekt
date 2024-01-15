import db from '../db'; 

export const getAddressInfo = async (methodId) => {
    const query = 'SELECT * FROM Address WHERE ID = ?';
    const params = [`${methodId}`];
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
              console.error('Error fetching Payment Info data:', error);
              reject(error);
            }
          );
        });
      });
};

export const setAddressInfo = async (addressLine1, addressLine2, addressPostalCode, addressCity, addressCountry, addressName, addressSurname) => {
    const query = 'INSERT INTO Address (AddressLine1, AddressLine2, PostalCode, City, Country, Name, Surname) VALUES(?, ?, ?, ?, ?, ?, ?) ';
    const params = [addressLine1, addressLine2, addressPostalCode, addressCity, addressCountry, addressName, addressSurname];
    console.log('Query:', query);
    console.log('Params:', params);
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
          transaction.executeSql(
              query,
              params,
              (_, result) => {
                const insertedId = result.insertId; // Retrieve the ID of the last inserted row
                resolve({ result, insertedId });
            },
              (_, error) => {
                  console.error('Error inserting Payment Info data:', error);
                  reject(error);
              }
          );
      });
  });
};

export const updateAddressInfo = async (addressLine1, addressLine2, addressPostalCode, addressCity, addressCountry, addressName, addressSurname, userPaymentID) => {
  const query = 'UPDATE PaymentMethod SET Name = ?,CardNumber = ?, CCV = ?, ExpiryDate = ?  WHERE ID = ?';
  const params = [addressLine1, addressLine2, addressPostalCode, addressCity, addressCountry, addressName, addressSurname, userPaymentID];
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
                console.error('Error inserting Payment Info data:', error);
                reject(error);
            }
        );
    });
});
};

  export const updateUserAddressInfo = async (addressID, Email) => {
    const query = 'UPDATE User SET Address = ? WHERE Email = ?';
    const params = [addressID, Email];
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
                  console.error('Error inserting Payment Info data:', error);
                  reject(error);
              }
          );
      });
  });
};
