import { Injectable } from "@angular/core";
import { DB_GLOBALS } from "~/entities/globals";
import { DatabaseService } from "~/services/database.service";

let SQLite = require("nativescript-sqlite");

@Injectable()
export class MyGroceryListsDBService {
  constructor(private baseDBService: DatabaseService) { }

  private createMyLists() {
    const queryString: string = `
      CREATE TABLE IF NOT EXISTS ${DB_GLOBALS.MYLISTS_TABLE_NAME} (
        glist_id INTEGER PRIMARY KEY NOT NULL DEFAULT (0),
        glist_name TEXT NOT NULL,
        start TEXT,
        end TEXT
      )
    `;

    return new Promise((resolve, reject) => {
      return (new SQLite(DB_GLOBALS.DB_NAME)).then(db => {
        db.execSQL(queryString)
          .then(() => {
            resolve(db);
          }, error => {
            console.log("[DATABASE SERVICE ERROR] createDB -> create table:", error);
            reject(error);
          });
      }, error => {
        console.log("[DATABASE SERVICE ERROR] createDB:", error);
        reject(error);
      })
    })
  }

  public getMyLists() {
    const queryString: string = `SELECT * FROM ${DB_GLOBALS.MYLISTS_TABLE_NAME}`;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then(rows => {
          let result: Array<any> = [];
          rows.forEach(row => {
            result.push({
              listId: row[0],
              listName: row[1],
              startDate: row[2],
              endDate: row[3]
            });
          });
          resolve(result);
        }), error => {
          console.log("[DATABASE SERVICE ERROR] getGroceries:", error);
          reject(error);
        }
      })
    });
  }
}