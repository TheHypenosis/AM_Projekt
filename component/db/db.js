import * as SQLite from 'expo-sqlite';

// Open or create the SQLite database
const db = SQLite.openDatabase('matchymatchy.db');

export default db;