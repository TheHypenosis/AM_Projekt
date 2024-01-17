import db from '../db'; 
import { useEffect, useState } from 'react';

export const setStatus = async (status) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
    const query = 'INSERT INTO OrdersStatus (Name, Date) VALUES(?, ?)';
    const params = [status, formattedDate];
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

export const setOrder = async (PaymentMethodID, AddressID, UserEmail, StatusID, Price, PromoCode) => {
    const query = 'INSERT INTO Orders (PaymentMethodID, AddressID, UserEmail, StatusID, Price, PromoCode) VALUES(?, ?, ?, ?, ?, ?)';
    const params = [PaymentMethodID, AddressID, UserEmail, StatusID, Price, PromoCode];
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

export const setOrdersProducts = async (OrdersID, ProductsID, Amount) => {
    const query = 'INSERT INTO OrdersProducts (OrdersID, ProductsID, Amount) VALUES(?, ?, ?)';
    const params = [OrdersID, ProductsID, Amount];
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
