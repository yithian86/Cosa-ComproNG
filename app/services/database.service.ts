import { Injectable } from "@angular/core";
import { DB_GLOBALS } from "~/entities/globals";

let SQLite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {

  public connectToDB() {
    return new Promise((resolve, reject) => {
      return (new SQLite(DB_GLOBALS.DB_NAME))
        .then(db => resolve(db), error => {
          console.log("[DATABASE SERVICE ERROR] createDB:", error);
          reject(error);
        })
    })
  }

}