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
                            brand: prod[4],
                            category: prod[5]
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
    ProductsDBService.prototype.getProductByBarcode = function (barcode) {
        var _this = this;
        var queryString = "SELECT * FROM " + globals_1.DB_GLOBALS.TABLES.PRODUCTS + " WHERE barcode='" + barcode + "'";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then(function (result) {
                    if (result && result.length > 0) {
                        var prod = result[0];
                        var resultProduct = {
                            id: prod[0],
                            weightVolume: prod[1],
                            barCode: prod[2],
                            productName: prod[3],
                            brand: prod[4],
                            category: prod[5]
                        };
                        resolve(resultProduct);
                    }
                    else {
                        resolve(undefined);
                    }
                }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] getProductByBarcode:", error);
                    reject(error);
                };
            });
        });
    };
    ProductsDBService.prototype.getProductPrices = function (productId) {
        var _this = this;
        var queryString = "SELECT * FROM " + globals_1.DB_GLOBALS.TABLES.PRODUCTPRICES + " WHERE product_id_fk='" + productId + "'";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then(function (prices) {
                    var result = [];
                    prices.forEach(function (prod) {
                        var newPrice = {
                            id: prod[0],
                            normalPrice: prod[1],
                            specialPrice: prod[2],
                            specialDate: prod[3],
                            productId: prod[4],
                            sellerId: prod[5]
                        };
                        result.push(newPrice);
                    });
                    resolve(result);
                }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] getProductByBarcode:", error);
                    reject(error);
                };
            });
        });
    };
    ProductsDBService.prototype.addProduct = function (product) {
        var _this = this;
        var queryString = "INSERT INTO " + globals_1.DB_GLOBALS.TABLES.PRODUCTS + " (\"product_name\", \"barCode\", \"brand\", \"category\", \"weight_volume\")";
        queryString += " VALUES ('" + product.productName + "', '" + product.barCode + "', '" + product.brand + "', '" + product.category + "', '" + product.weightVolume + "')";
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (db) {
                return db.execSQL(queryString).then(function (id) {
                    id ? resolve(id) : reject("error");
                }, function (error) {
                    reject(error);
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLXByb2R1Y3QtbGlzdC5kYXRhYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUFnRDtBQUNoRCxnRUFBOEQ7QUFHOUQsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFHNUM7SUFFRSwyQkFBb0IsYUFBOEI7UUFBOUIsa0JBQWEsR0FBYixhQUFhLENBQWlCO0lBQUksQ0FBQztJQUUvQywrQ0FBbUIsR0FBM0I7UUFDRSxJQUFNLFdBQVcsR0FBVyxFQUFFLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsTUFBTSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEVBQUU7Z0JBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO3FCQUNwQixJQUFJLENBQUM7b0JBQ0osT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNkLENBQUMsRUFBRSxVQUFBLEtBQUs7b0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvREFBb0QsRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsRUFBRSxVQUFBLEtBQUs7Z0JBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRU0sdUNBQVcsR0FBbEIsVUFBbUIsUUFBaUI7UUFBcEMs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fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEQl9HTE9CQUxTIH0gZnJvbSBcIn4vZW50aXRpZXMvZ2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElQcm9kdWN0IH0gZnJvbSBcIn4vY29tcG9uZW50cy90eXBpbmdzL3Byb2R1Y3RcIjtcclxuXHJcbmxldCBTUUxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFByb2R1Y3RzREJTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlREJTZXJ2aWNlOiBEYXRhYmFzZVNlcnZpY2UpIHsgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZVByb2R1Y3RzVGFibGUoKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gYGA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgcmV0dXJuIChuZXcgU1FMaXRlKERCX0dMT0JBTFMuREJfTkFNRSkpLnRoZW4oZGIgPT4ge1xyXG4gICAgICAgIGRiLmV4ZWNTUUwocXVlcnlTdHJpbmcpXHJcbiAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGIpO1xyXG4gICAgICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQiAtPiBjcmVhdGUgdGFibGU6XCIsIGVycm9yKTtcclxuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gY3JlYXRlREI6XCIsIGVycm9yKTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRQcm9kdWN0cyhjYXRlZ29yeT86IHN0cmluZykge1xyXG4gICAgbGV0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBgU0VMRUNUICogRlJPTSAke0RCX0dMT0JBTFMuVEFCTEVTLlBST0RVQ1RTfWA7XHJcbiAgICBpZiAoISFjYXRlZ29yeSkge1xyXG4gICAgICBxdWVyeVN0cmluZyArPSBgIFdIRVJFIGNhdGVnb3J5PScke2NhdGVnb3J5fSdgO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuYmFzZURCU2VydmljZS5jb25uZWN0VG9EQigpLnRoZW4oKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlcy5hbGwocXVlcnlTdHJpbmcpLnRoZW4oKHByb2R1Y3RzOiBBcnJheTxJUHJvZHVjdD4pID0+IHtcclxuICAgICAgICAgIGxldCByZXN1bHQ6IEFycmF5PElQcm9kdWN0PiA9IFtdO1xyXG5cclxuICAgICAgICAgIHByb2R1Y3RzLmZvckVhY2goKHByb2Q6IElQcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2R1Y3Q6IElQcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICAgIGlkOiBwcm9kWzBdLFxyXG4gICAgICAgICAgICAgIHdlaWdodFZvbHVtZTogcHJvZFsxXSxcclxuICAgICAgICAgICAgICBiYXJDb2RlOiBwcm9kWzJdLFxyXG4gICAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBwcm9kWzNdLFxyXG4gICAgICAgICAgICAgIGJyYW5kOiBwcm9kWzRdLFxyXG4gICAgICAgICAgICAgIGNhdGVnb3J5OiBwcm9kWzVdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzdWx0LnB1c2gobmV3UHJvZHVjdCk7XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgfSksIGVycm9yID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGdldFByb2R1Y3RzOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RCeUJhcmNvZGUoYmFyY29kZTogc3RyaW5nKSB7XHJcbiAgICBsZXQgcXVlcnlTdHJpbmc6IHN0cmluZyA9IGBTRUxFQ1QgKiBGUk9NICR7REJfR0xPQkFMUy5UQUJMRVMuUFJPRFVDVFN9IFdIRVJFIGJhcmNvZGU9JyR7YmFyY29kZX0nYDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmJhc2VEQlNlcnZpY2UuY29ubmVjdFRvREIoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuYWxsKHF1ZXJ5U3RyaW5nKS50aGVuKChyZXN1bHQ6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZCA9IHJlc3VsdFswXTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0UHJvZHVjdDogSVByb2R1Y3QgPSB7XHJcbiAgICAgICAgICAgICAgaWQ6IHByb2RbMF0sXHJcbiAgICAgICAgICAgICAgd2VpZ2h0Vm9sdW1lOiBwcm9kWzFdLFxyXG4gICAgICAgICAgICAgIGJhckNvZGU6IHByb2RbMl0sXHJcbiAgICAgICAgICAgICAgcHJvZHVjdE5hbWU6IHByb2RbM10sXHJcbiAgICAgICAgICAgICAgYnJhbmQ6IHByb2RbNF0sXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHByb2RbNV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNvbHZlKHJlc3VsdFByb2R1Y3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLCBlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBnZXRQcm9kdWN0QnlCYXJjb2RlOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RQcmljZXMocHJvZHVjdElkOiBudW1iZXIpIHtcclxuICAgIGxldCBxdWVyeVN0cmluZzogc3RyaW5nID0gYFNFTEVDVCAqIEZST00gJHtEQl9HTE9CQUxTLlRBQkxFUy5QUk9EVUNUUFJJQ0VTfSBXSEVSRSBwcm9kdWN0X2lkX2ZrPScke3Byb2R1Y3RJZH0nYDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmJhc2VEQlNlcnZpY2UuY29ubmVjdFRvREIoKS50aGVuKChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgIHJldHVybiByZXMuYWxsKHF1ZXJ5U3RyaW5nKS50aGVuKChwcmljZXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgIGxldCByZXN1bHQ6IEFycmF5PElQcm9kdWN0PiA9IFtdO1xyXG5cclxuICAgICAgICAgIHByaWNlcy5mb3JFYWNoKChwcm9kOiBJUHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdQcmljZTogYW55ID0ge1xyXG4gICAgICAgICAgICAgIGlkOiBwcm9kWzBdLFxyXG4gICAgICAgICAgICAgIG5vcm1hbFByaWNlOiBwcm9kWzFdLFxyXG4gICAgICAgICAgICAgIHNwZWNpYWxQcmljZTogcHJvZFsyXSxcclxuICAgICAgICAgICAgICBzcGVjaWFsRGF0ZTogcHJvZFszXSxcclxuICAgICAgICAgICAgICBwcm9kdWN0SWQ6IHByb2RbNF0sXHJcbiAgICAgICAgICAgICAgc2VsbGVySWQ6IHByb2RbNV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXN1bHQucHVzaChuZXdQcmljZSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gZ2V0UHJvZHVjdEJ5QmFyY29kZTpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRQcm9kdWN0KHByb2R1Y3Q6IElQcm9kdWN0KTogYW55IHtcclxuICAgIGxldCBxdWVyeVN0cmluZzogc3RyaW5nID0gYElOU0VSVCBJTlRPICR7REJfR0xPQkFMUy5UQUJMRVMuUFJPRFVDVFN9IChcInByb2R1Y3RfbmFtZVwiLCBcImJhckNvZGVcIiwgXCJicmFuZFwiLCBcImNhdGVnb3J5XCIsIFwid2VpZ2h0X3ZvbHVtZVwiKWA7XHJcbiAgICBxdWVyeVN0cmluZyArPSBgIFZBTFVFUyAoJyR7cHJvZHVjdC5wcm9kdWN0TmFtZX0nLCAnJHtwcm9kdWN0LmJhckNvZGV9JywgJyR7cHJvZHVjdC5icmFuZH0nLCAnJHtwcm9kdWN0LmNhdGVnb3J5fScsICcke3Byb2R1Y3Qud2VpZ2h0Vm9sdW1lfScpYDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLmJhc2VEQlNlcnZpY2UuY29ubmVjdFRvREIoKS50aGVuKChkYjogYW55KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGRiLmV4ZWNTUUwocXVlcnlTdHJpbmcpLnRoZW4oaWQgPT4ge1xyXG4gICAgICAgICAgaWQgPyByZXNvbHZlKGlkKSA6IHJlamVjdChcImVycm9yXCIpO1xyXG4gICAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxufSJdfQ==