"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globals_1 = require("~/entities/globals");
var database_service_1 = require("~/services/database.service");
var SQLite = require("nativescript-sqlite");
var MyGroceryListsDBService = /** @class */ (function () {
    function MyGroceryListsDBService(baseDBService) {
        this.baseDBService = baseDBService;
    }
    MyGroceryListsDBService.prototype.createMyLists = function () {
        var queryString = "\n      CREATE TABLE IF NOT EXISTS " + globals_1.DB_GLOBALS.MYLISTS_TABLE_NAME + " (\n        glist_id INTEGER PRIMARY KEY NOT NULL DEFAULT (0),\n        glist_name TEXT NOT NULL,\n        start TEXT,\n        end TEXT\n      )\n    ";
        return new Promise(function (resolve, reject) {
            return (new SQLite(globals_1.DB_GLOBALS.DB_NAME)).then(function (db) {
                db.execSQL(queryString)
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
    MyGroceryListsDBService.prototype.getMyLists = function () {
        var _this = this;
        var queryString = "SELECT * FROM " + globals_1.DB_GLOBALS.MYLISTS_TABLE_NAME;
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then(function (rows) {
                    var result = [];
                    rows.forEach(function (row) {
                        result.push({
                            listId: row[0],
                            listName: row[1],
                            startDate: row[2],
                            endDate: row[3]
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
    MyGroceryListsDBService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], MyGroceryListsDBService);
    return MyGroceryListsDBService;
}());
exports.MyGroceryListsDBService = MyGroceryListsDBService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLW15LWdyb2NlcnktbGlzdHMuZGF0YWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1teS1ncm9jZXJ5LWxpc3RzLmRhdGFiYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQWdEO0FBQ2hELGdFQUE4RDtBQUU5RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUc1QztJQUNFLGlDQUFvQixhQUE4QjtRQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7SUFBSSxDQUFDO0lBRS9DLCtDQUFhLEdBQXJCO1FBQ0UsSUFBTSxXQUFXLEdBQVcsd0NBQ0csb0JBQVUsQ0FBQyxrQkFBa0IsNEpBTTNELENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtnQkFDN0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7cUJBQ3BCLElBQUksQ0FBQztvQkFDSixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLFVBQUEsS0FBSztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN6RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSw0Q0FBVSxHQUFqQjtRQUFBLGlCQXNCQztRQXJCQyxJQUFNLFdBQVcsR0FBVyxtQkFBaUIsb0JBQVUsQ0FBQyxrQkFBb0IsQ0FBQztRQUU3RSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7b0JBQ25DLElBQUksTUFBTSxHQUFlLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7d0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQzs0QkFDVixNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDaEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQ2pCLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3lCQUNoQixDQUFDLENBQUM7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsRUFBRSxVQUFBLEtBQUs7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDN0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQW5EVSx1QkFBdUI7UUFEbkMsaUJBQVUsRUFBRTt5Q0FFd0Isa0NBQWU7T0FEdkMsdUJBQXVCLENBb0RuQztJQUFELDhCQUFDO0NBQUEsQUFwREQsSUFvREM7QUFwRFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERCX0dMT0JBTFMgfSBmcm9tIFwifi9lbnRpdGllcy9nbG9iYWxzXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2RhdGFiYXNlLnNlcnZpY2VcIjtcclxuXHJcbmxldCBTUUxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE15R3JvY2VyeUxpc3RzREJTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VEQlNlcnZpY2U6IERhdGFiYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlTXlMaXN0cygpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBgXHJcbiAgICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTICR7REJfR0xPQkFMUy5NWUxJU1RTX1RBQkxFX05BTUV9IChcclxuICAgICAgICBnbGlzdF9pZCBJTlRFR0VSIFBSSU1BUlkgS0VZIE5PVCBOVUxMIERFRkFVTFQgKDApLFxyXG4gICAgICAgIGdsaXN0X25hbWUgVEVYVCBOT1QgTlVMTCxcclxuICAgICAgICBzdGFydCBURVhULFxyXG4gICAgICAgIGVuZCBURVhUXHJcbiAgICAgIClcclxuICAgIGA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmV0dXJuIChuZXcgU1FMaXRlKERCX0dMT0JBTFMuREJfTkFNRSkpLnRoZW4oZGIgPT4ge1xyXG4gICAgICAgIGRiLmV4ZWNTUUwocXVlcnlTdHJpbmcpXHJcbiAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGIpO1xyXG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQiAtPiBjcmVhdGUgdGFibGU6XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gY3JlYXRlREI6XCIsIGVycm9yKTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNeUxpc3RzKCkge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmc6IHN0cmluZyA9IGBTRUxFQ1QgKiBGUk9NICR7REJfR0xPQkFMUy5NWUxJU1RTX1RBQkxFX05BTUV9YDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmJhc2VEQlNlcnZpY2UuY29ubmVjdFRvREIoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuYWxsKHF1ZXJ5U3RyaW5nKS50aGVuKHJvd3MgPT4ge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgcm93cy5mb3JFYWNoKHJvdyA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcclxuICAgICAgICAgICAgICBsaXN0SWQ6IHJvd1swXSxcclxuICAgICAgICAgICAgICBsaXN0TmFtZTogcm93WzFdLFxyXG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZTogcm93WzJdLFxyXG4gICAgICAgICAgICAgIGVuZERhdGU6IHJvd1szXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLCBlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBnZXRHcm9jZXJpZXM6XCIsIGVycm9yKTtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcbiAgfVxyXG59Il19