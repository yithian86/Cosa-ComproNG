"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globals_1 = require("~/entities/globals");
var database_service_1 = require("~/services/database.service");
var SQLite = require("nativescript-sqlite");
var ProductsDBService = /** @class */ (function () {
    function ProductsDBService(baseDBService) {
        this.baseDBService = baseDBService;
    }
    ProductsDBService.prototype.createProductsTable = function () {
        var queryString = "";
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
    ProductsDBService.prototype.getProducts = function (category) {
        var _this = this;
        var queryString = "SELECT * FROM " + globals_1.DB_GLOBALS.TABLES.PRODUCTS + " ";
        if (!!category) {
            queryString += "WHERE category='" + category + "'";
        }
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then(function (products) {
                    var result = [];
                    products.forEach(function (prod) {
                        var newProduct = {
                            id: prod[0],
                            weightVolume: prod[1],
                            barCode: prod[2],
                            productName: prod[3],
                            brand: prod[4]
                        };
                        result.push(newProduct);
                    });
                    resolve(result);
                }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] getProducts:", error);
                    reject(error);
                };
            });
        });
    };
    ProductsDBService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], ProductsDBService);
    return ProductsDBService;
}());
exports.ProductsDBService = ProductsDBService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3RzLmRhdGFiYXNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdHMuZGF0YWJhc2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyw4Q0FBZ0Q7QUFDaEQsZ0VBQThEO0FBRTlELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRzVDO0lBRUUsMkJBQW9CLGFBQThCO1FBQTlCLGtCQUFhLEdBQWIsYUFBYSxDQUFpQjtJQUFJLENBQUM7SUFFL0MsK0NBQW1CLEdBQTNCO1FBQ0UsSUFBTSxXQUFXLEdBQVcsRUFBRSxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLE1BQU0sQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLG9CQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxFQUFFO2dCQUM3QyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztxQkFDcEIsSUFBSSxDQUFDO29CQUNKLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDZCxDQUFDLEVBQUUsVUFBQSxLQUFLO29CQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLEVBQUUsVUFBQSxLQUFLO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3pELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVNLHVDQUFXLEdBQWxCLFVBQW1CLFFBQWlCO1FBQXBDLGlCQTJCQztRQTFCQyxJQUFJLFdBQVcsR0FBVyxtQkFBaUIsb0JBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxNQUFHLENBQUM7UUFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixXQUFXLElBQUkscUJBQW1CLFFBQVEsTUFBRyxDQUFDO1FBQ2hELENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQW9CO29CQUNwRCxJQUFJLE1BQU0sR0FBZSxFQUFFLENBQUM7b0JBQzVCLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO3dCQUNuQixJQUFNLFVBQVUsR0FBUTs0QkFDdEIsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ1gsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNoQixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ2YsQ0FBQTt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztvQkFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxFQUFFLFVBQUEsS0FBSztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM1RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBbERVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUd3QixrQ0FBZTtPQUZ2QyxpQkFBaUIsQ0FtRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQW5ERCxJQW1EQztBQW5EWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgREJfR0xPQkFMUyB9IGZyb20gXCJ+L2VudGl0aWVzL2dsb2JhbHNcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5cclxubGV0IFNRTGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNEQlNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VEQlNlcnZpY2U6IERhdGFiYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUHJvZHVjdHNUYWJsZSgpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBgYDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXR1cm4gKG5ldyBTUUxpdGUoREJfR0xPQkFMUy5EQl9OQU1FKSkudGhlbihkYiA9PiB7XHJcbiAgICAgICAgZGIuZXhlY1NRTChxdWVyeVN0cmluZylcclxuICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGNyZWF0ZURCIC0+IGNyZWF0ZSB0YWJsZTpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RzKGNhdGVnb3J5Pzogc3RyaW5nKSB7XHJcbiAgICBsZXQgcXVlcnlTdHJpbmc6IHN0cmluZyA9IGBTRUxFQ1QgKiBGUk9NICR7REJfR0xPQkFMUy5UQUJMRVMuUFJPRFVDVFN9IGA7XHJcbiAgICBpZiAoISFjYXRlZ29yeSkge1xyXG4gICAgICBxdWVyeVN0cmluZyArPSBgV0hFUkUgY2F0ZWdvcnk9JyR7Y2F0ZWdvcnl9J2A7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5iYXNlREJTZXJ2aWNlLmNvbm5lY3RUb0RCKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmFsbChxdWVyeVN0cmluZykudGhlbigocHJvZHVjdHM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgIGxldCByZXN1bHQ6IEFycmF5PGFueT4gPSBbXTtcclxuICAgICAgICAgIHByb2R1Y3RzLmZvckVhY2gocHJvZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2R1Y3Q6IGFueSA9IHtcclxuICAgICAgICAgICAgICBpZDogcHJvZFswXSxcclxuICAgICAgICAgICAgICB3ZWlnaHRWb2x1bWU6IHByb2RbMV0sXHJcbiAgICAgICAgICAgICAgYmFyQ29kZTogcHJvZFsyXSxcclxuICAgICAgICAgICAgICBwcm9kdWN0TmFtZTogcHJvZFszXSxcclxuICAgICAgICAgICAgICBicmFuZDogcHJvZFs0XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld1Byb2R1Y3QpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSksIGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGdldFByb2R1Y3RzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==