import db from '../db'; 

export const getPaymentInfo = async (methodId) => {
    const query = 'SELECT * FROM PaymentMethod WHERE ID = ?';
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

export const setPaymentInfo = async (paymentName, paymentCardNumer, paymentCCV, paymentExpiaryDate) => {
    const query = 'INSERT INTO PaymentMethod (Name, CardNumber, CCV, ExpiryDate) VALUES(?, ?, ?, ?) ';
    const params = [paymentName, paymentCardNumer, paymentCCV, paymentExpiaryDate];
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

export const updatePaymentInfo = async (paymentName, paymentCardNumer, paymentCCV, paymentExpiaryDate, userPaymentID) => {
  const query = 'UPDATE PaymentMethod SET Name = ?,CardNumber = ?, CCV = ?, ExpiryDate = ?  WHERE ID = ?';
  const params = [paymentName, paymentCardNumer, paymentCCV, paymentExpiaryDate, userPaymentID];
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

  export const updateUserPaymentInfo = async (paymentMethodID, Email) => {
    const query = 'UPDATE User SET PaymentMethod = ? WHERE Email = ?';
    const params = [paymentMethodID, Email];
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
