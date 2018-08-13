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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUFnRDtBQUNoRCxnRUFBOEQ7QUFHOUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFHNUM7SUFFRSwyQkFBb0IsYUFBOEI7UUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO0lBQUksQ0FBQztJQUUvQywrQ0FBbUIsR0FBM0I7UUFDRSxJQUFNLFdBQVcsR0FBVyxFQUFFLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3FCQUNwQixJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNkLENBQUMsRUFBRSxVQUFBLEtBQUs7b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsUUFBaUI7UUFBcEMsaUJBNkJDO1FBNUJDLElBQUksV0FBVyxHQUFXLG1CQUFpQixvQkFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLE1BQUcsQ0FBQztRQUN6RSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNmLFdBQVcsSUFBSSxxQkFBbUIsUUFBUSxNQUFHLENBQUM7UUFDaEQsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLEtBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBUTtnQkFDN0MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsUUFBd0I7b0JBQ3hELElBQUksTUFBTSxHQUFtQixFQUFFLENBQUM7b0JBRWhDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFhO3dCQUM3QixJQUFNLFVBQVUsR0FBWTs0QkFDMUIsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ1gsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUNoQixXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7eUJBQ2YsQ0FBQTt3QkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztvQkFFSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxFQUFFLFVBQUEsS0FBSztvQkFDUCxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM1RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBcERVLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFO3lDQUd3QixrQ0FBZTtPQUZ2QyxpQkFBaUIsQ0FxRDdCO0lBQUQsd0JBQUM7Q0FBQSxBQXJERCxJQXFEQztBQXJEWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgREJfR0xPQkFMUyB9IGZyb20gXCJ+L2VudGl0aWVzL2dsb2JhbHNcIjtcclxuaW1wb3J0IHsgRGF0YWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIn4vY29tcG9uZW50cy90eXBpbmdzL3Byb2R1Y3RcIjtcclxuXHJcbmxldCBTUUxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzREJTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlREJTZXJ2aWNlOiBEYXRhYmFzZVNlcnZpY2UpIHsgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVByb2R1Y3RzVGFibGUoKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gYGA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmV0dXJuIChuZXcgU1FMaXRlKERCX0dMT0JBTFMuREJfTkFNRSkpLnRoZW4oZGIgPT4ge1xyXG4gICAgICAgIGRiLmV4ZWNTUUwocXVlcnlTdHJpbmcpXHJcbiAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGIpO1xyXG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQiAtPiBjcmVhdGUgdGFibGU6XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gY3JlYXRlREI6XCIsIGVycm9yKTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9kdWN0cyhjYXRlZ29yeT86IHN0cmluZykge1xyXG4gICAgbGV0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBgU0VMRUNUICogRlJPTSAke0RCX0dMT0JBTFMuVEFCTEVTLlBST0RVQ1RTfSBgO1xyXG4gICAgaWYgKCEhY2F0ZWdvcnkpIHtcclxuICAgICAgcXVlcnlTdHJpbmcgKz0gYFdIRVJFIGNhdGVnb3J5PScke2NhdGVnb3J5fSdgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuYmFzZURCU2VydmljZS5jb25uZWN0VG9EQigpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5hbGwocXVlcnlTdHJpbmcpLnRoZW4oKHByb2R1Y3RzOiBBcnJheTxQcm9kdWN0PikgPT4ge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8UHJvZHVjdD4gPSBbXTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcHJvZHVjdHMuZm9yRWFjaCgocHJvZDogUHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdQcm9kdWN0OiBQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICAgIGlkOiBwcm9kWzBdLFxyXG4gICAgICAgICAgICAgIHdlaWdodFZvbHVtZTogcHJvZFsxXSxcclxuICAgICAgICAgICAgICBiYXJDb2RlOiBwcm9kWzJdLFxyXG4gICAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kWzNdLFxyXG4gICAgICAgICAgICAgIGJyYW5kOiBwcm9kWzRdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3UHJvZHVjdCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgIH0pLCBlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBnZXRQcm9kdWN0czpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=