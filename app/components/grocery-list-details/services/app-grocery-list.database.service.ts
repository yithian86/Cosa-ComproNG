import { Injectable } from "@angular/core";
import { DB_GLOBALS } from "~/entities/globals";
import { DatabaseService } from "~/services/database.service";

let SQLite = require("nativescript-sqlite");

@Injectable()
export class GroceryListDetailsDBService {

  constructor(private baseDBService: DatabaseService) { }

  private createGroceryListTable() {
    return new Promise((resolve, reject) => {
      return (new SQLite(DB_GLOBALS.DB_NAME)).then(db => {
        db.execSQL(`
          CREATE TABLE IF NOT EXISTS ${DB_GLOBALS.TABLES.GROCERYLIST} (
            glist_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL DEFAULT (0),
            quantity INTEGER DEFAULT (1),
            product_id_fk INTEGER NOT NULL,
            list_id_fk INTEGER NOT NULL,
            FOREIGN KEY (product_id_fk) REFERENCES list (glist_id),
            FOREIGN KEY (list_id_fk) REFERENCES product (product_id)
          )
        `)
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

  public getGroceryListDetails(listId: number) {
    const queryString: string = `
      SELECT
        ${DB_GLOBALS.TABLES.MYLISTS}.glist_id as glist_id,
        groceryList.glist_id as id,
        glist_name,
        product_id_fk,
        product_name,
        brand,
        quantity
      FROM ${DB_GLOBALS.TABLES.GROCERYLIST}
      INNER JOIN ${DB_GLOBALS.TABLES.MYLISTS} ON ${DB_GLOBALS.TABLES.MYLISTS}.glist_id = ${DB_GLOBALS.TABLES.GROCERYLIST}.list_id_fk
      INNER JOIN ${DB_GLOBALS.TABLES.PRODUCTS} ON ${DB_GLOBALS.TABLES.PRODUCTS}.product_id = ${DB_GLOBALS.TABLES.GROCERYLIST}.product_id_fk
      WHERE list_id_fk = ${listId} ORDER BY glist_id COLLATE NOCASE
    `;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then(rows => {
          let result: Array<any> = [];
          rows.forEach(row => {
            // console.log(JSON.stringify(row));
            result.push({
              id: row[1],
              productId: row[3],
              productName: row[4],
              brand: row[5],
              quantity: row[6]
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

  public getListItem(listId: number, productId: number) {
    const queryString: string = `
      SELECT * FROM ${DB_GLOBALS.TABLES.GROCERYLIST}
      WHERE list_id_fk = ${listId} AND product_id_fk = ${productId}
    `;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((rows => {
          let result: Array<any> = [];
          rows.forEach(row => {
            console.log(JSON.stringify(row));
            result.push({
              id: row[1],
              productId: row[3],
              productName: row[4],
              brand: row[5],
              quantity: row[6]
            });
          });
          resolve(result);
        }), error => {
          console.log("[DATABASE SERVICE ERROR] getListItem");
          reject(error);
        }), error => reject(error)
      })
    });
  }

  public insertIntoGroceryListDetails(listId: number, productId: number, quantity: number) {
    const queryString: string = `
      INSERT INTO ${DB_GLOBALS.TABLES.GROCERYLIST} (product_id_fk, list_id_fk, quantity)
      VALUES (${productId}, ${listId}, ${quantity})
    `;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((rows => resolve(true)), error => {
          console.log("[DATABASE SERVICE ERROR] insertIntoGroceryListDetails");
          console.log(queryString);
          reject(error);
        }), error => reject(error)
      })
    });
  }

  public updateGroceryListDetails(glistId: number, listId: number, productId: number, quantity: number) {
    const queryString: string = `
      UPDATE ${DB_GLOBALS.TABLES.GROCERYLIST}
      SET product_id_fk=${productId}, list_id_fk=${listId}, quantity=${quantity}
      WHERE glist_id=${glistId}
    `;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((rows => resolve(true)), error => {
          console.log("[DATABASE SERVICE ERROR] updateGroceryListDetails");
          console.log(queryString);
          reject(error);
        }), error => reject(error)
      })
    });
  }

  public deleteGroceryListItem(id: number) {
    const queryString: string = `
      DELETE FROM ${DB_GLOBALS.TABLES.GROCERYLIST}
      WHERE glist_id=${id}
    `;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((rows => resolve(true)), error => {
          console.log("[DATABASE SERVICE ERROR] deleteGroceryListItem");
          console.log(queryString);
          reject(error);
        }), error => reject(error)
      })
    });
  }

}