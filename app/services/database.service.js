"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var globals_1 = require("~/entities/globals");
var SQLite = require("nativescript-sqlite");
var DatabaseService = /** @class */ (function () {
    function DatabaseService() {
    }
    DatabaseService.prototype.connectToDB = function () {
        return new Promise(function (resolve, reject) {
            return (new SQLite(globals_1.DB_GLOBALS.DB_NAME))
                .then(function (db) { return resolve(db); }, function (error) {
                console.log("[DATABASE SERVICE ERROR] createDB:", error);
                reject(error);
            });
        });
    };
    DatabaseService = __decorate([
        core_1.Injectable()
    ], DatabaseService);
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhdGFiYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsOENBQWdEO0FBRWhELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRzVDO0lBQUE7SUFZQSxDQUFDO0lBVlEscUNBQVcsR0FBbEI7UUFDRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxvQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNwQyxJQUFJLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQVgsQ0FBVyxFQUFFLFVBQUEsS0FBSztnQkFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBVlUsZUFBZTtRQUQzQixpQkFBVSxFQUFFO09BQ0EsZUFBZSxDQVkzQjtJQUFELHNCQUFDO0NBQUEsQUFaRCxJQVlDO0FBWlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgREJfR0xPQkFMUyB9IGZyb20gXCJ+L2VudGl0aWVzL2dsb2JhbHNcIjtcclxuXHJcbmxldCBTUUxpdGUgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXNxbGl0ZVwiKTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFiYXNlU2VydmljZSB7XHJcblxyXG4gIHB1YmxpYyBjb25uZWN0VG9EQigpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHJldHVybiAobmV3IFNRTGl0ZShEQl9HTE9CQUxTLkRCX05BTUUpKVxyXG4gICAgICAgIC50aGVuKGRiID0+IHJlc29sdmUoZGIpLCBlcnJvciA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIltEQVRBQkFTRSBTRVJWSUNFIEVSUk9SXSBjcmVhdGVEQjpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG59Il19