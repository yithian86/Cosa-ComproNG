"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globals_1 = require("~/entities/globals");
var database_service_1 = require("~/services/database.service");
var SQLite = require("nativescript-sqlite");
var GroceryListDetailsDBService = /** @class */ (function () {
    function GroceryListDetailsDBService(baseDBService) {
        this.baseDBService = baseDBService;
    }
    GroceryListDetailsDBService.prototype.createGroceryListTable = function () {
        return new Promise(function (resolve, reject) {
            return (new SQLite(globals_1.DB_GLOBALS.DB_NAME)).then(function (db) {
                db.execSQL("\n          CREATE TABLE IF NOT EXISTS " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + " (\n            glist_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL DEFAULT (0),\n            quantity INTEGER DEFAULT (1),\n            product_id_fk INTEGER NOT NULL,\n            list_id_fk INTEGER NOT NULL,\n            FOREIGN KEY (product_id_fk) REFERENCES list (glist_id),\n            FOREIGN KEY (list_id_fk) REFERENCES product (product_id)\n          )\n        ")
                    .then(function () {
                    resolve(db);
                }, function (error) {
                    console.log("[DATABASE SERVICE ERROR] createDB -> create table:", error);
                    reject(error);
                });
            }, function (error) {
                console.log("[DATABASE SERVICE ERROR] createDB:", error);
                reject(error);
            });
        });
    };
    GroceryListDetailsDBService.prototype.getGroceryListDetails = function (listId) {
        var _this = this;
        var queryString = "\n      SELECT\n        " + globals_1.DB_GLOBALS.MYLISTS_TABLE_NAME + ".glist_id as glist_id,\n        groceryList.glist_id as id,\n        glist_name,\n        product_id_fk,\n        product_name,\n        brand,\n        quantity\n      FROM " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + "\n      INNER JOIN " + globals_1.DB_GLOBALS.MYLISTS_TABLE_NAME + " ON " + globals_1.DB_GLOBALS.MYLISTS_TABLE_NAME + ".glist_id = " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + ".list_id_fk\n      INNER JOIN " + globals_1.DB_GLOBALS.PRODUCTS_TABLE_NAME + " ON " + globals_1.DB_GLOBALS.PRODUCTS_TABLE_NAME + ".product_id = " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + ".product_id_fk\n      WHERE list_id_fk = " + listId + " ORDER BY glist_id COLLATE NOCASE\n    ";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then(function (rows) {
                    var result = [];
                    rows.forEach(function (row) {
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
                }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] getGroceries:", error);
                    reject(error);
                };
            });
        });
    };
    GroceryListDetailsDBService.prototype.insertIntoGroceryListDetails = function (listId, productId, quantity) {
        var _this = this;
        var queryString = "\n      INSERT INTO " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + " (product_id_fk, list_id_fk, quantity)\n      VALUES (" + productId + ", " + listId + ", " + quantity + ")\n    ";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then((function (rows) { return resolve(true); }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] insertIntoGroceryListDetails");
                    console.log(queryString);
                    reject(error);
                }), function (error) { return reject(error); };
            });
        });
    };
    GroceryListDetailsDBService.prototype.updateGroceryListDetails = function (glistId, listId, productId, quantity) {
        var _this = this;
        var queryString = "\n      UPDATE " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + "\n      SET product_id_fk=" + productId + ", list_id_fk=" + listId + ", quantity=" + quantity + "\n      WHERE glist_id=" + glistId + "\n    ";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then((function (rows) { return resolve(true); }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] updateGroceryListDetails");
                    console.log(queryString);
                    reject(error);
                }), function (error) { return reject(error); };
            });
        });
    };
    GroceryListDetailsDBService.prototype.deleteGroceryListItem = function (id) {
        var _this = this;
        var queryString = "\n      DELETE FROM " + globals_1.DB_GLOBALS.GROCERYLIST_TABLE_NAME + "\n      WHERE glist_id=" + id + "\n    ";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then((function (rows) { return resolve(true); }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] deleteGroceryListItem");
                    console.log(queryString);
                    reject(error);
                }), function (error) { return reject(error); };
            });
        });
    };
    GroceryListDetailsDBService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], GroceryListDetailsDBService);
    return GroceryListDetailsDBService;
}());
exports.GroceryListDetailsDBService = GroceryListDetailsDBService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmRhdGFiYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtZ3JvY2VyeS1saXN0LWRldGFpbHMuZGF0YWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw4Q0FBZ0Q7QUFDaEQsZ0VBQThEO0FBRTlELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRzVDO0lBRUUscUNBQW9CLGFBQThCO1FBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtJQUFJLENBQUM7SUFFL0MsNERBQXNCLEdBQTlCO1FBQ0UsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsNENBQ29CLG9CQUFVLENBQUMsc0JBQXNCLHlYQVEvRCxDQUFDO3FCQUNDLElBQUksQ0FBQztvQkFDSixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLFVBQUEsS0FBSztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN6RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSwyREFBcUIsR0FBNUIsVUFBNkIs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QUFBLEtBQUs7b0JBQzdELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELENBQUMsQ0FBQztvQkFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDekIsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUE7WUFDNUIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF2SFUsMkJBQTJCO1FBRHZDLGlCQUFVLEVBQUU7eUNBR3dCLGtDQUFlO09BRnZDLDJCQUEyQixDQXlIdkM7SUFBRCxrQ0FBQztDQUFBLEFBekhELElBeUhDO0FBekhZLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEQl9HTE9CQUxTIH0gZnJvbSBcIn4vZW50aXRpZXMvZ2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5sZXQgU1FMaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VEQlNlcnZpY2U6IERhdGFiYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlR3JvY2VyeUxpc3RUYWJsZSgpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJldHVybiAobmV3IFNRTGl0ZShEQl9HTE9CQUxTLkRCX05BTUUpKS50aGVuKGRiID0+IHtcclxuICAgICAgICBkYi5leGVjU1FMKGBcclxuICAgICAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICR7REJfR0xPQkFMUy5HUk9DRVJZTElTVF9UQUJMRV9OQU1FfSAoXHJcbiAgICAgICAgICAgIGdsaXN0X2lkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCBOT1QgTlVMTCBERUZBVUxUICgwKSxcclxuICAgICAgICAgICAgcXVhbnRpdHkgSU5URUdFUiBERUZBVUxUICgxKSxcclxuICAgICAgICAgICAgcHJvZHVjdF9pZF9mayBJTlRFR0VSIE5PVCBOVUxMLFxyXG4gICAgICAgICAgICBsaXN0X2lkX2ZrIElOVEVHRVIgTk9UIE5VTEwsXHJcbiAgICAgICAgICAgIEZPUkVJR04gS0VZIChwcm9kdWN0X2lkX2ZrKSBSRUZFUkVOQ0VTIGxpc3QgKGdsaXN0X2lkKSxcclxuICAgICAgICAgICAgRk9SRUlHTiBLRVkgKGxpc3RfaWRfZmspIFJFRkVSRU5DRVMgcHJvZHVjdCAocHJvZHVjdF9pZClcclxuICAgICAgICAgIClcclxuICAgICAgICBgKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGRiKTtcclxuICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gY3JlYXRlREIgLT4gY3JlYXRlIHRhYmxlOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGNyZWF0ZURCOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0R3JvY2VyeUxpc3REZXRhaWxzKGxpc3RJZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gYFxyXG4gICAgICBTRUxFQ1RcclxuICAgICAgICAke0RCX0dMT0JBTFMuTVlMSVNUU19UQUJMRV9OQU1FfS5nbGlzdF9pZCBhcyBnbGlzdF9pZCxcclxuICAgICAgICBncm9jZXJ5TGlzdC5nbGlzdF9pZCBhcyBpZCxcclxuICAgICAgICBnbGlzdF9uYW1lLFxyXG4gICAgICAgIHByb2R1Y3RfaWRfZmssXHJcbiAgICAgICAgcHJvZHVjdF9uYW1lLFxyXG4gICAgICAgIGJyYW5kLFxyXG4gICAgICAgIHF1YW50aXR5XHJcbiAgICAgIEZST00gJHtEQl9HTE9CQUxTLkdST0NFUllMSVNUX1RBQkxFX05BTUV9XHJcbiAgICAgIElOTkVSIEpPSU4gJHtEQl9HTE9CQUxTLk1ZTElTVFNfVEFCTEVfTkFNRX0gT04gJHtEQl9HTE9CQUxTLk1ZTElTVFNfVEFCTEVfTkFNRX0uZ2xpc3RfaWQgPSAke0RCX0dMT0JBTFMuR1JPQ0VSWUxJU1RfVEFCTEVfTkFNRX0ubGlzdF9pZF9ma1xyXG4gICAgICBJTk5FUiBKT0lOICR7REJfR0xPQkFMUy5QUk9EVUNUU19UQUJMRV9OQU1FfSBPTiAke0RCX0dMT0JBTFMuUFJPRFVDVFNfVEFCTEVfTkFNRX0ucHJvZHVjdF9pZCA9ICR7REJfR0xPQkFMUy5HUk9DRVJZTElTVF9UQUJMRV9OQU1FfS5wcm9kdWN0X2lkX2ZrXHJcbiAgICAgIFdIRVJFIGxpc3RfaWRfZmsgPSAke2xpc3RJZH0gT1JERVIgQlkgZ2xpc3RfaWQgQ09MTEFURSBOT0NBU0VcclxuICAgIGA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5iYXNlREJTZXJ2aWNlLmNvbm5lY3RUb0RCKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmFsbChxdWVyeVN0cmluZykudGhlbihyb3dzID0+IHtcclxuICAgICAgICAgIGxldCByZXN1bHQ6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgIHJvd3MuZm9yRWFjaChyb3cgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyb3cpKTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xyXG4gICAgICAgICAgICAgIGlkOiByb3dbMV0sXHJcbiAgICAgICAgICAgICAgcHJvZHVjdElkOiByb3dbM10sXHJcbiAgICAgICAgICAgICAgcHJvZHVjdE5hbWU6IHJvd1s0XSxcclxuICAgICAgICAgICAgICBicmFuZDogcm93WzVdLFxyXG4gICAgICAgICAgICAgIHF1YW50aXR5OiByb3dbNl1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gZ2V0R3JvY2VyaWVzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGluc2VydEludG9Hcm9jZXJ5TGlzdERldGFpbHMobGlzdElkOiBudW1iZXIsIHByb2R1Y3RJZDogbnVtYmVyLCBxdWFudGl0eTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gYFxyXG4gICAgICBJTlNFUlQgSU5UTyAke0RCX0dMT0JBTFMuR1JPQ0VSWUxJU1RfVEFCTEVfTkFNRX0gKHByb2R1Y3RfaWRfZmssIGxpc3RfaWRfZmssIHF1YW50aXR5KVxyXG4gICAgICBWQUxVRVMgKCR7cHJvZHVjdElkfSwgJHtsaXN0SWR9LCAke3F1YW50aXR5fSlcclxuICAgIGA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5iYXNlREJTZXJ2aWNlLmNvbm5lY3RUb0RCKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmFsbChxdWVyeVN0cmluZykudGhlbigocm93cyA9PiByZXNvbHZlKHRydWUpKSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gaW5zZXJ0SW50b0dyb2NlcnlMaXN0RGV0YWlsc1wiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5U3RyaW5nKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSksIGVycm9yID0+IHJlamVjdChlcnJvcilcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHVwZGF0ZUdyb2NlcnlMaXN0RGV0YWlscyhnbGlzdElkOiBudW1iZXIsIGxpc3RJZDogbnVtYmVyLCBwcm9kdWN0SWQ6IG51bWJlciwgcXVhbnRpdHk6IG51bWJlcikge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmc6IHN0cmluZyA9IGBcclxuICAgICAgVVBEQVRFICR7REJfR0xPQkFMUy5HUk9DRVJZTElTVF9UQUJMRV9OQU1FfVxyXG4gICAgICBTRVQgcHJvZHVjdF9pZF9maz0ke3Byb2R1Y3RJZH0sIGxpc3RfaWRfZms9JHtsaXN0SWR9LCBxdWFudGl0eT0ke3F1YW50aXR5fVxyXG4gICAgICBXSEVSRSBnbGlzdF9pZD0ke2dsaXN0SWR9XHJcbiAgICBgO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuYmFzZURCU2VydmljZS5jb25uZWN0VG9EQigpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5hbGwocXVlcnlTdHJpbmcpLnRoZW4oKHJvd3MgPT4gcmVzb2x2ZSh0cnVlKSksIGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIHVwZGF0ZUdyb2NlcnlMaXN0RGV0YWlsc1wiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5U3RyaW5nKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSksIGVycm9yID0+IHJlamVjdChlcnJvcilcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGRlbGV0ZUdyb2NlcnlMaXN0SXRlbShpZDogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gYFxyXG4gICAgICBERUxFVEUgRlJPTSAke0RCX0dMT0JBTFMuR1JPQ0VSWUxJU1RfVEFCTEVfTkFNRX1cclxuICAgICAgV0hFUkUgZ2xpc3RfaWQ9JHtpZH1cclxuICAgIGA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5iYXNlREJTZXJ2aWNlLmNvbm5lY3RUb0RCKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmFsbChxdWVyeVN0cmluZykudGhlbigocm93cyA9PiByZXNvbHZlKHRydWUpKSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gZGVsZXRlR3JvY2VyeUxpc3RJdGVtXCIpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2cocXVlcnlTdHJpbmcpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSJdfQ==