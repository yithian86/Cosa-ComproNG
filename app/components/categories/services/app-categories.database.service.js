"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globals_1 = require("~/entities/globals");
var database_service_1 = require("~/services/database.service");
var SQLite = require("nativescript-sqlite");
var CategoriesDBService = /** @class */ (function () {
    function CategoriesDBService(baseDBService) {
        this.baseDBService = baseDBService;
    }
    CategoriesDBService.prototype.createCategoriesTable = function () {
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
    CategoriesDBService.prototype.getCategories = function () {
        var _this = this;
        var queryString = "SELECT * FROM " + globals_1.DB_GLOBALS.TABLES.CATEGORIES;
        return new Promise(function (resolve, reject) {
            _this.baseDBService.connectToDB().then(function (res) {
                return res.all(queryString).then(function (rows) {
                    var result = [];
                    rows.forEach(function (row) { return result.push(row[0]); });
                    resolve(result);
                }), function (error) {
                    console.log("[DATABASE SERVICE ERROR] getCategories:", error);
                    reject(error);
                };
            });
        });
    };
    CategoriesDBService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [database_service_1.DatabaseService])
    ], CategoriesDBService);
    return CategoriesDBService;
}());
exports.CategoriesDBService = CategoriesDBService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNhdGVnb3JpZXMuZGF0YWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC1jYXRlZ29yaWVzLmRhdGFiYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQWdEO0FBQ2hELGdFQUE4RDtBQUU5RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUc1QztJQUVFLDZCQUFvQixhQUE4QjtRQUE5QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7SUFBSSxDQUFDO0lBRS9DLG1EQUFxQixHQUE3QjtRQUNFLElBQU0sV0FBVyxHQUFXLEVBQUUsQ0FBQztRQUUvQixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsRUFBRTtnQkFDN0MsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7cUJBQ3BCLElBQUksQ0FBQztvQkFDSixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLFVBQUEsS0FBSztvQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN6RSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxFQUFFLFVBQUEsS0FBSztnQkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTSwyQ0FBYSxHQUFwQjtRQUFBLGlCQWVDO1FBZEMsSUFBTSxXQUFXLEdBQVcsbUJBQWlCLG9CQUFVLENBQUMsTUFBTSxDQUFDLFVBQVksQ0FBQztRQUU1RSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxLQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVE7Z0JBQzdDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQWdCO29CQUNoRCxJQUFJLE1BQU0sR0FBZSxFQUFFLENBQUM7b0JBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFuQixDQUFtQixDQUFDLENBQUM7b0JBQ3pDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLEVBQUUsVUFBQSxLQUFLO29CQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQzlELE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF0Q1UsbUJBQW1CO1FBRC9CLGlCQUFVLEVBQUU7eUNBR3dCLGtDQUFlO09BRnZDLG1CQUFtQixDQXVDL0I7SUFBRCwwQkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEQl9HTE9CQUxTIH0gZnJvbSBcIn4vZW50aXRpZXMvZ2xvYmFsc1wiO1xyXG5pbXBvcnQgeyBEYXRhYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5sZXQgU1FMaXRlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1zcWxpdGVcIik7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYXRlZ29yaWVzREJTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYXNlREJTZXJ2aWNlOiBEYXRhYmFzZVNlcnZpY2UpIHsgfVxyXG5cclxuICBwcml2YXRlIGNyZWF0ZUNhdGVnb3JpZXNUYWJsZSgpIHtcclxuICAgIGNvbnN0IHF1ZXJ5U3RyaW5nOiBzdHJpbmcgPSBgYDtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICByZXR1cm4gKG5ldyBTUUxpdGUoREJfR0xPQkFMUy5EQl9OQU1FKSkudGhlbihkYiA9PiB7XHJcbiAgICAgICAgZGIuZXhlY1NRTChxdWVyeVN0cmluZylcclxuICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZShkYik7XHJcbiAgICAgICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0RBVEFCQVNFIFNFUlZJQ0UgRVJST1JdIGNyZWF0ZURCIC0+IGNyZWF0ZSB0YWJsZTpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH0sIGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQjpcIiwgZXJyb3IpO1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldENhdGVnb3JpZXMoKSB7XHJcbiAgICBjb25zdCBxdWVyeVN0cmluZzogc3RyaW5nID0gYFNFTEVDVCAqIEZST00gJHtEQl9HTE9CQUxTLlRBQkxFUy5DQVRFR09SSUVTfWA7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5iYXNlREJTZXJ2aWNlLmNvbm5lY3RUb0RCKCkudGhlbigocmVzOiBhbnkpID0+IHtcclxuICAgICAgICByZXR1cm4gcmVzLmFsbChxdWVyeVN0cmluZykudGhlbigocm93czogQXJyYXk8YW55PikgPT4ge1xyXG4gICAgICAgICAgbGV0IHJlc3VsdDogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgICAgICAgcm93cy5mb3JFYWNoKHJvdyA9PiByZXN1bHQucHVzaChyb3dbMF0pKTtcclxuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICB9KSwgZXJyb3IgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJbREFUQUJBU0UgU0VSVklDRSBFUlJPUl0gZ2V0Q2F0ZWdvcmllczpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9KTtcclxuICB9XHJcbn0iXX0=