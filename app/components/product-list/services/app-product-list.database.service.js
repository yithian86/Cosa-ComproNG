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
        var queryString = "SELECT * FROM " + globals_1.DB_GLOBALS.TABLES.PRODUCTS;
        if (!!category) {
            queryString += " WHERE category='" + category + "'";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUFnRDtBQUNoRCxnRUFBOEQ7QUFHOUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFHNUM7SUFFRSwyQkFBb0IsYUFBOEI7UUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO0lBQUksQ0FBQztJQUUvQywrQ0FBbUIsR0FBM0I7UUFDRSxJQUFNLFdBQVcsR0FBVyxFQUFFLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3FCQUNwQixJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNkLENBQUMsRUFBRSxVQUFBLEtBQUs7b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsUUFBaUI7UUFBcEMsaUJBNkJDO1FBNUJDLElBQUksV0FBVyxHQUFXLG1CQUFpQixvQkFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFVLENBQUM7UUFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDZixXQUFXLElBQUksc0JBQW9CLFFBQVEsTUFBRyxDQUFDO1FBQ2pELENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQXlCO29CQUN6RCxJQUFJLE1BQU0sR0FBb0IsRUFBRSxDQUFDO29CQUVqQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBYzt3QkFDOUIsSUFBTSxVQUFVLEdBQWE7NEJBQzNCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNYLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDaEIsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUNmLENBQUE7d0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDMUIsQ0FBQyxDQUFDLENBQUM7b0JBRUgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsRUFBRSxVQUFBLEtBQUs7b0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDNUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXBEVSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTt5Q0FHd0Isa0NBQWU7T0FGdkMsaUJBQWlCLENBcUQ3QjtJQUFELHdCQUFDO0NBQUEsQUFyREQsSUFxREM7QUFyRFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERCX0dMT0JBTFMgfSBmcm9tIFwifi9lbnRpdGllcy9nbG9iYWxzXCI7XHJcbmltcG9ydCB7IERhdGFiYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2RhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSVByb2R1Y3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvcHJvZHVjdFwiO1xyXG5cclxubGV0IFNRTGl0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtc3FsaXRlXCIpO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgUHJvZHVjdHNEQlNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJhc2VEQlNlcnZpY2U6IERhdGFiYXNlU2VydmljZSkgeyB9XHJcblxyXG4gIHByaXZhdGUgY3JlYXRlUHJvZHVjdHNUYWJsZSgpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBgYDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXR1cm4gKG5ldyBTUUxpdGUoREJfR0xPQkFMUy5EQl9OQU1FKSkudGhlbihkYiA9PiB7XHJcbiAgICAgICAgZGIuZXhlY1NRTChxdWVyeVN0cmluZylcclxuICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGNyZWF0ZURCIC0+IGNyZWF0ZSB0YWJsZTpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RzKGNhdGVnb3J5Pzogc3RyaW5nKSB7XHJcbiAgICBsZXQgcXVlcnlTdHJpbmc6IHN0cmluZyA9IGBTRUxFQ1QgKiBGUk9NICR7REJfR0xPQkFMUy5UQUJMRVMuUFJPRFVDVFN9YDtcclxuICAgIGlmICghIWNhdGVnb3J5KSB7XHJcbiAgICAgIHF1ZXJ5U3RyaW5nICs9IGAgV0hFUkUgY2F0ZWdvcnk9JyR7Y2F0ZWdvcnl9J2A7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5iYXNlREJTZXJ2aWNlLmNvbm5lY3RUb0RCKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmFsbChxdWVyeVN0cmluZykudGhlbigocHJvZHVjdHM6IEFycmF5PElQcm9kdWN0PikgPT4ge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8SVByb2R1Y3Q+ID0gW107XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIHByb2R1Y3RzLmZvckVhY2goKHByb2Q6IElQcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2R1Y3Q6IElQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICAgIGlkOiBwcm9kWzBdLFxyXG4gICAgICAgICAgICAgIHdlaWdodFZvbHVtZTogcHJvZFsxXSxcclxuICAgICAgICAgICAgICBiYXJDb2RlOiBwcm9kWzJdLFxyXG4gICAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kWzNdLFxyXG4gICAgICAgICAgICAgIGJyYW5kOiBwcm9kWzRdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3UHJvZHVjdCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLCBlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBnZXRQcm9kdWN0czpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=