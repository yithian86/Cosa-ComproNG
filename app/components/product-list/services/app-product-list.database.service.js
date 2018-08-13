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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUFnRDtBQUNoRCxnRUFBOEQ7QUFHOUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFHNUM7SUFFRSwyQkFBb0IsYUFBOEI7UUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO0lBQUksQ0FBQztJQUUvQywrQ0FBbUIsR0FBM0I7UUFDRSxJQUFNLFdBQVcsR0FBVyxFQUFFLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3FCQUNwQixJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNkLENBQUMsRUFBRSxVQUFBLEtBQUs7b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsUUFBaUI7UUFBcEMsaUJBNkJDO1FBNUJDLElBQUksV0FBVyxHQUFXLG1CQUFpQixvQkFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLE1BQUcsQ0FBQztRQUN6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLFdBQVcsSUFBSSxxQkFBbUIsUUFBUSxNQUFHLENBQUM7UUFDaEQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBUTtnQkFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBeUI7b0JBQ3pELElBQUksTUFBTSxHQUFvQixFQUFFLENBQUM7b0JBRWpDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFjO3dCQUM5QixJQUFNLFVBQVUsR0FBYTs0QkFDM0IsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ1gsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNoQixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ2YsQ0FBQTt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztvQkFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxFQUFFLFVBQUEsS0FBSztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM1RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBcERVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUd3QixrQ0FBZTtPQUZ2QyxpQkFBaUIsQ0FxRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJERCxJQXFEQztBQXJEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgREJfR0xPQkFMUyB9IGZyb20gXCJ+L2VudGl0aWVzL2dsb2JhbHNcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJUHJvZHVjdCB9IGZyb20gXCJ+L2NvbXBvbmVudHMvdHlwaW5ncy9wcm9kdWN0XCI7XHJcblxyXG5sZXQgU1FMaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0c0RCU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYmFzZURCU2VydmljZTogRGF0YWJhc2VTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVQcm9kdWN0c1RhYmxlKCkge1xyXG4gICAgY29uc3QgcXVlcnlTdHJpbmc6IHN0cmluZyA9IGBgO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJldHVybiAobmV3IFNRTGl0ZShEQl9HTE9CQUxTLkRCX05BTUUpKS50aGVuKGRiID0+IHtcclxuICAgICAgICBkYi5leGVjU1FMKHF1ZXJ5U3RyaW5nKVxyXG4gICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKGRiKTtcclxuICAgICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gY3JlYXRlREIgLT4gY3JlYXRlIHRhYmxlOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGNyZWF0ZURCOlwiLCBlcnJvcik7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0UHJvZHVjdHMoY2F0ZWdvcnk/OiBzdHJpbmcpIHtcclxuICAgIGxldCBxdWVyeVN0cmluZzogc3RyaW5nID0gYFNFTEVDVCAqIEZST00gJHtEQl9HTE9CQUxTLlRBQkxFUy5QUk9EVUNUU30gYDtcclxuICAgIGlmICghIWNhdGVnb3J5KSB7XHJcbiAgICAgIHF1ZXJ5U3RyaW5nICs9IGBXSEVSRSBjYXRlZ29yeT0nJHtjYXRlZ29yeX0nYDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmJhc2VEQlNlcnZpY2UuY29ubmVjdFRvREIoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuYWxsKHF1ZXJ5U3RyaW5nKS50aGVuKChwcm9kdWN0czogQXJyYXk8SVByb2R1Y3Q+KSA9PiB7XHJcbiAgICAgICAgICBsZXQgcmVzdWx0OiBBcnJheTxJUHJvZHVjdD4gPSBbXTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcHJvZHVjdHMuZm9yRWFjaCgocHJvZDogSVByb2R1Y3QpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3UHJvZHVjdDogSVByb2R1Y3QgPSB7XHJcbiAgICAgICAgICAgICAgaWQ6IHByb2RbMF0sXHJcbiAgICAgICAgICAgICAgd2VpZ2h0Vm9sdW1lOiBwcm9kWzFdLFxyXG4gICAgICAgICAgICAgIGJhckNvZGU6IHByb2RbMl0sXHJcbiAgICAgICAgICAgICAgcHJvZHVjdE5hbWU6IHByb2RbM10sXHJcbiAgICAgICAgICAgICAgYnJhbmQ6IHByb2RbNF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXdQcm9kdWN0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSksIGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGdldFByb2R1Y3RzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==