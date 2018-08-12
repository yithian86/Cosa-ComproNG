import { Injectable } from "@angular/core";
import { DB_GLOBALS } from "~/entities/globals";
import { DatabaseService } from "~/services/database.service";

let SQLite = require("nativescript-sqlite");

@Injectable()
export class CategoriesDBService {

  constructor(private baseDBService: DatabaseService) { }

  private createCategoriesTable() {
    const queryString: string = ``;

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

  public getCategories() {
    const queryString: string = `SELECT * FROM ${DB_GLOBALS.TABLES.CATEGORIES}`;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((rows: Array<any>) => {
          let result: Array<any> = [];
          rows.forEach(row => result.push(row[0]));
          resolve(result);
        }), error => {
          console.log("[DATABASE SERVICE ERROR] getCategories:", error);
          reject(error);
        }
      })
    });
  }
}