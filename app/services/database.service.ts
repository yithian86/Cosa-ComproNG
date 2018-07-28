import { Injectable } from "@angular/core";

let SQLite = require("nativescript-sqlite");

@Injectable()
export class DatabaseService {

  private DB_NAME: string = "cosacompro.db";
  private PRODUCTS_TABLE_NAME: string = "products";
  private GROCERYLIST_TABLE_NAME: string = "grocerylist";
  private MYLISTS_TABLE_NAME: string = "list";

  private createGroceryList() {
    return new Promise((resolve, reject) => {
      return (new SQLite(this.DB_NAME)).then(db => {
        db.execSQL(`
            CREATE TABLE IF NOT EXISTS ${this.GROCERYLIST_TABLE_NAME} (
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

  private createMyLists() {
    return new Promise((resolve, reject) => {
      return (new SQLite(this.DB_NAME)).then(db => {
        db.execSQL(`
          CREATE TABLE IF NOT EXISTS ${this.MYLISTS_TABLE_NAME} (
            glist_id INTEGER PRIMARY KEY NOT NULL DEFAULT (0),
            glist_name TEXT NOT NULL,
            start TEXT,
            end TEXT
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

  public insertGrocery(grocerie: any) {
    return new Promise((resolve, reject) => {
      this.createGroceryList()
        .then((res: any) => {
          res.execSQL(`INSERT INTO ${this.GROCERYLIST_TABLE_NAME} (BARCODE, PRODUCT_NAME) VALUES (?, ?)`, [grocerie.barCode, grocerie.productName])
            .then(id => {
              console.log(`[DATABASE SERVICE] Added record in ${this.GROCERYLIST_TABLE_NAME} table, id: `, id);
              resolve(true);
            }, error => {
              console.log(`[DATABASE SERVICE] Insert record in ${this.GROCERYLIST_TABLE_NAME} table ERROR: `, error);
              reject(false);
            })
        })
    });
  }

  public getMyLists() {
    return new Promise((resolve, reject) => {
      this.createGroceryList().then((res: any) => {
        return res.all(`SELECT * FROM ${this.MYLISTS_TABLE_NAME}`).then(rows => {
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

  public getGroceryList(listId: number) {
    return new Promise((resolve, reject) => {
      this.createGroceryList().then((res: any) => {
        return res.all(`
            SELECT
              ${this.MYLISTS_TABLE_NAME}.glist_id as glist_id,
              glist_name,
              product_name,
              brand,
              quantity
            FROM ${this.GROCERYLIST_TABLE_NAME}
            INNER JOIN ${this.MYLISTS_TABLE_NAME} ON ${this.MYLISTS_TABLE_NAME}.glist_id = ${this.GROCERYLIST_TABLE_NAME}.list_id_fk
            INNER JOIN ${this.PRODUCTS_TABLE_NAME} ON ${this.PRODUCTS_TABLE_NAME}.product_id = ${this.GROCERYLIST_TABLE_NAME}.product_id_fk
            WHERE list_id_fk = ${listId} ORDER BY glist_id COLLATE NOCASE
          `).then(rows => {
            let result: Array<any> = [];
            rows.forEach(row => {
              result.push({
                productName: row[2],
                brand: row[3],
                quantity: row[4]
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