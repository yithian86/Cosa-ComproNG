import { Injectable } from "@angular/core";
import { DB_GLOBALS } from "~/entities/globals";
import { DatabaseService } from "~/services/database.service";

let SQLite = require("nativescript-sqlite");

@Injectable()
export class ProductsDBService {

  constructor(private baseDBService: DatabaseService) { }

  private createProductsTable() {
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

  public getProducts(category?: string) {
    let queryString: string = `SELECT * FROM ${DB_GLOBALS.TABLES.PRODUCTS} `;
    if (!!category) {
      queryString += `WHERE category='${category}'`;
    }

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((products: Array<any>) => {
          let result: Array<any> = [];
          products.forEach(prod => {
            const newProduct: any = {
              id: prod[0],
              weightVolume: prod[1],
              barCode: prod[2],
              productName: prod[3],
              brand: prod[4]
            }
            result.push(newProduct);
          });
          resolve(result);
        }), error => {
          console.log("[DATABASE SERVICE ERROR] getProducts:", error);
          reject(error);
        }
      })
    });
  }
}