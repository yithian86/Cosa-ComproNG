import { Injectable } from "@angular/core";
import { DB_GLOBALS } from "~/entities/globals";
import { DatabaseService } from "~/services/database.service";
import { IProduct } from "~/components/typings/product";

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
    let queryString: string = `SELECT * FROM ${DB_GLOBALS.TABLES.PRODUCTS}`;
    if (!!category) {
      queryString += ` WHERE category='${category}'`;
    }

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((products: Array<IProduct>) => {
          let result: Array<IProduct> = [];

          products.forEach((prod: IProduct) => {
            const newProduct: IProduct = {
              id: prod[0],
              weightVolume: prod[1],
              barCode: prod[2],
              productName: prod[3],
              brand: prod[4],
              category: prod[5]
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

  public getProductByBarcode(barcode: string) {
    let queryString: string = `SELECT * FROM ${DB_GLOBALS.TABLES.PRODUCTS} WHERE barcode='${barcode}'`;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((res: any) => {
        return res.all(queryString).then((result: Array<any>) => {
          if (result && result.length > 0) {
            const prod = result[0];
            const resultProduct: IProduct = {
              id: prod[0],
              weightVolume: prod[1],
              barCode: prod[2],
              productName: prod[3],
              brand: prod[4],
              category: prod[5]
            }
            resolve(resultProduct);
          } else {
            resolve(undefined);
          }
        }), error => {
          console.log("[DATABASE SERVICE ERROR] getProductByBarcode:", error);
          reject(error);
        }
      })
    });
  }

  public addProduct(product: IProduct): any {
    let queryString: string = `INSERT INTO ${DB_GLOBALS.TABLES.PRODUCTS} ("product_name", "barCode", "brand", "category", "weight_volume")`;
    queryString += ` VALUES ('${product.productName}', '${product.barCode}', '${product.brand}', '${product.category}', '${product.weightVolume}')`;

    return new Promise((resolve, reject) => {
      this.baseDBService.connectToDB().then((db: any) => {
        return db.execSQL(queryString).then(id => {
          id ? resolve(id) : reject("error");
        }, error => {
          reject(error);
        });
      })
    })
  }
}