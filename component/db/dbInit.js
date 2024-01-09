import db from './db';
import categoryData from './data/categoryListDb.json';
import sizeData from './data/sizeListDb.json';
import productData from './data/productListDb.json';
import prodSizeData from './data/prodSizeListDb.json';

const createTables = () => {
  console.log('Attempting to create tables ...');
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ProdCatalog (ID INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, Name TEXT, Description TEXT,  Price REAL,  Category TEXT,  Image TEXT, isNewsFeed INTEGER, isBestseller INTEGER, FOREIGN KEY(Category) REFERENCES Category(Name) );'
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS ProdSize ( ProdID INTEGER, SizeName TEXT, isAvailable INTEGER, FOREIGN KEY(ProdID) REFERENCES ProdCatalog(ID), FOREIGN KEY(SizeName) REFERENCES Size(Name) );'
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Category ( Name TEXT PRIMARY KEY UNIQUE );'
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS Size ( Name TEXT PRIMARY KEY UNIQUE );'
        );
      },
      error => {
        console.log('Error creating tables:', error);
      }
    );
    console.log('Finished creating tables ...');
  };


  const insertCategoryData = () => {
    console.log('Attempting to insertCategoryData');
    return new Promise((resolve, reject) => {
      categoryData.forEach(category => {
        db.transaction(
          tx => {
            tx.executeSql(
              'SELECT * FROM Category WHERE Name = ?;',
              [category.name],
              (_, results) => {
                const existingCategory = results.rows._array[0];
                if (!existingCategory) {
                  tx.executeSql(
                    'INSERT INTO Category (Name) VALUES (?);',
                    [category.name],
                    (_, results) => {
                      console.log('Category data inserted for:', category.name);
                    },
                    error => {
                      console.log('Error inserting category data for:', category.name, error);
                      reject(error);
                    }
                  );
                } else {
                  console.log('Category already exists, skipping insertion for:', category.name);
                }
              },
              error => {
                console.log('Error checking for existing category data:', error);
                reject(error);
              }
            );
          },
          error => {
            console.log('Error during Category data transaction:', error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
    });
  };

  const insertSizeData = () => {
    console.log('Attempting to insertSizeData');
    return new Promise((resolve, reject) => {
      sizeData.forEach(size => {
        db.transaction(
          tx => {
            tx.executeSql(
              'SELECT * FROM Size WHERE Name = ?;',
              [size.name],
              (_, results) => {
                const existingSize = results.rows._array[0];
                if (!existingSize) {
                  tx.executeSql(
                    'INSERT INTO Size (Name) VALUES (?);',
                    [size.name],
                    (_, results) => {
                      console.log('Size data inserted for:', size.name);
                    },
                    error => {
                      console.log('Error inserting size data for:', size.name, error);
                      reject(error);
                    }
                  );
                } else {
                  console.log('Size already exists, skipping insertion for:', size.name);
                }
              },
              error => {
                console.log('Error checking for existing size data:', error);
                reject(error);
              }
            );
          },
          error => {
            console.log('Error during Size data transaction:', error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
    });
  };

  const insertProductData = () => {
    return new Promise((resolve, reject) => {
      productData.forEach(product => {
        db.transaction(
          tx => {
            tx.executeSql(
              'SELECT * FROM ProdCatalog WHERE Name = ?;',
              [product.name],
              (_, results) => {
                const existingProduct = results.rows._array[0];
                if (!existingProduct) {
                  tx.executeSql(
                    'INSERT INTO ProdCatalog (Name, Description, Price, Category, Image, isNewsFeed, isBestseller) VALUES (?, ?, ?, ?, ?, ?, ?);',
                    [product.name, product.description, product.price, product.category, product.image, product.isNewsFeed, product.isBestseller],
                    (_, results) => {
                      console.log('Product data inserted for:', product.name);
                    },
                    error => {
                      console.log('Error inserting product data for:', product.name, error);
                      reject(error);
                    }
                  );
                } else {
                  console.log('Product already exists, skipping insertion for:', product.name);
                }
              },
              error => {
                console.log('Error checking for existing product data:', error);
                reject(error);
              }
            );
          },
          error => {
            console.log('Error during Product data transaction:', error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
    });
  };

  const insertProdSizeData = () => {
    return new Promise((resolve, reject) => {
      prodSizeData.forEach(prodSize => {
        db.transaction(
          tx => {
            tx.executeSql(
              'SELECT * FROM ProdSize WHERE prodID = ? AND SizeName = ?;',
              [prodSize.prodId, prodSize.SizeName],
              (_, results) => {
                const existingProdSize = results.rows._array[0];
                if (!existingProdSize) {
                  tx.executeSql(
                    'INSERT INTO ProdSize (ProdId, SizeName, isAvailable) VALUES (?, ?, ?);',
                    [prodSize.prodId, prodSize.SizeName, prodSize.isAvailable],
                    (_, results) => {
                      console.log('ProdSize data inserted for:', prodSize.prodId, ' + ', prodSize.sizeName);
                    },
                    error => {
                      console.log('Error inserting ProdSize data for:', prodSize.prodId, ' + ', prodSize.SizeName, error);
                      reject(error);
                    }
                  );
                } else {
                  console.log('ProdSize Data already exists, skipping insertion for:', prodSize.prodId, ' + ', prodSize.SizeName);
                }
              },
              error => {
                console.log('Error checking for existing ProdSize data:', error);
                reject(error);
              }
            );
          },
          error => {
            console.log('Error during ProdSize data transaction:', error);
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
    });
  };


  const initializeDatabase = async () => {
    console.log('Initializing database...');
    //To clear the DB, uncomment the 2 lines below.
    // await db.closeAsync();
    // await db.deleteAsync();
    createTables();
    await insertCategoryData();
    await insertSizeData();
    await insertProductData();
    await insertProdSizeData();
    console.log('The initializeDatabase function has finished');
    
  };

export default initializeDatabase;
