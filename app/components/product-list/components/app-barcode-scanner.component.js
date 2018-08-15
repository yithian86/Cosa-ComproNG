"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var dialogs_1 = require("ui/dialogs");
var app_product_list_database_service_1 = require("~/components/product-list/services/app-product-list.database.service");
var app_categories_database_service_1 = require("~/components/categories/services/app-categories.database.service");
var AppBarcodeScannerComponent = /** @class */ (function () {
    function AppBarcodeScannerComponent(routerExtensions, barcodeScanner, productsDBService, categoriesDBService) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.barcodeScanner = barcodeScanner;
        this.productsDBService = productsDBService;
        this.categoriesDBService = categoriesDBService;
        this.isProductValid = function () { return _this.product && _this.product.productName && _this.product.barCode && _this.product.category; };
        this.addProduct = function () {
            if (_this.isProductValid()) {
                _this.productsDBService.addProduct(_this.product)
                    .then(function (id) {
                    id ? console.log("Product added with id:", id) : console.log("There was a problem:", id);
                    _this.resetProduct();
                })
                    .catch(function (error) { return console.error("Error while trying to add a new product:", error); });
            }
        };
        this.resetProduct = function () {
            _this.product = {
                barCode: "",
                brand: "",
                category: "",
                id: undefined,
                productName: "",
                weightVolume: ""
            };
        };
        this.showCategoryDialog = function () {
            var options = {
                title: "Choose product category:",
                message: "",
                cancelButtonText: "Cancel",
                actions: _this.categoryList
            };
            dialogs_1.action(options).then(function (result) {
                if (result && result !== "Cancel") {
                    _this.product.category = result;
                }
            });
        };
        this.goToProductList = function () {
            console.log("Navigating to Product List...");
            _this.routerExtensions.navigate(["/home/productList/list"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        this.format = " - ";
        this.code = " - ";
        this.isEditing = true;
        this.resetProduct();
    }
    AppBarcodeScannerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoriesDBService.getCategories().then(function (categories) { return _this.categoryList = categories; });
    };
    AppBarcodeScannerComponent.prototype.scanBarcode = function () {
        var _this = this;
        this.isEditing = true;
        this.resetProduct();
        this.barcodeScanner
            .scan({
            formats: "CODE_39, CODE_93, CODE_128, EAN_8, EAN_13, UPC_E",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            resultDisplayDuration: 2000,
            orientation: "portrait",
            openSettingsIfPermissionWasPreviouslyDenied: true //ios only 
        })
            .then(function (result) {
            _this.format = result.format;
            _this.code = result.text;
            console.log("Looking for duplicates in the database...");
            // this.productsDBService.getProductByBarcode("8001120912916")
            _this.productsDBService.getProductByBarcode(_this.code)
                .then(function (resultProduct) {
                if (!!resultProduct) {
                    console.log("Found it!", JSON.stringify(resultProduct));
                    _this.isEditing = false;
                    _this.product = resultProduct;
                }
                else {
                    console.log("No products found with this barcode:", _this.code);
                    _this.product.barCode = _this.code;
                }
            })
                .catch(function (error) { return console.error(error); });
        }, function (errorMessage) {
            console.log("Error when scanning " + errorMessage);
        });
    };
    AppBarcodeScannerComponent = __decorate([
        core_1.Component({
            selector: "app-barcode-scanner",
            templateUrl: "components/product-list/views/app-barcode-scanner.component.html",
            styleUrls: ["components/product-list/styles/app-barcode-scanner.component.css"],
            providers: [nativescript_barcodescanner_1.BarcodeScanner, app_product_list_database_service_1.ProductsDBService, app_categories_database_service_1.CategoriesDBService]
        }),
        __metadata("design:paramtypes", [router_extensions_1.RouterExtensions,
            nativescript_barcodescanner_1.BarcodeScanner,
            app_product_list_database_service_1.ProductsDBService,
            app_categories_database_service_1.CategoriesDBService])
    ], AppBarcodeScannerComponent);
    return AppBarcodeScannerComponent;
}());
exports.AppBarcodeScannerComponent = AppBarcodeScannerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMkVBQTZEO0FBQzdELHNDQUFvQztBQUVwQywwSEFBeUc7QUFDekcsb0hBQXVHO0FBU3ZHO0lBT0Usb0NBQ1UsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxtQkFBd0M7UUFKbEQsaUJBV0M7UUFWUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFhM0MsbUJBQWMsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBekYsQ0FBeUYsQ0FBQTtRQTBDaEgsZUFBVSxHQUFHO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQztxQkFDNUMsSUFBSSxDQUFDLFVBQUMsRUFBVTtvQkFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3pGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxD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aW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lcic7XHJcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBQcm9kdWN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3NlcnZpY2VzL2FwcC1wcm9kdWN0LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yaWVzREJTZXJ2aWNlIH0gZnJvbSBcIn4vY29tcG9uZW50cy9jYXRlZ29yaWVzL3NlcnZpY2VzL2FwcC1jYXRlZ29yaWVzLmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgSVByb2R1Y3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvcHJvZHVjdFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLWJhcmNvZGUtc2Nhbm5lclwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3ZpZXdzL2FwcC1iYXJjb2RlLXNjYW5uZXIuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3N0eWxlcy9hcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbQmFyY29kZVNjYW5uZXIsIFByb2R1Y3RzREJTZXJ2aWNlLCBDYXRlZ29yaWVzREJTZXJ2aWNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQmFyY29kZVNjYW5uZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHB1YmxpYyBwcm9kdWN0OiBJUHJvZHVjdDtcclxuICBwdWJsaWMgY2F0ZWdvcnlMaXN0OiBBcnJheTxzdHJpbmc+XHJcbiAgcHVibGljIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBwdWJsaWMgZm9ybWF0OiBzdHJpbmc7XHJcbiAgcHVibGljIGNvZGU6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcclxuICAgIHByaXZhdGUgcHJvZHVjdHNEQlNlcnZpY2U6IFByb2R1Y3RzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBjYXRlZ29yaWVzREJTZXJ2aWNlOiBDYXRlZ29yaWVzREJTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICB0aGlzLmZvcm1hdCA9IFwiIC0gXCI7XHJcbiAgICB0aGlzLmNvZGUgPSBcIiAtIFwiO1xyXG4gICAgdGhpcy5pc0VkaXRpbmcgPSB0cnVlO1xyXG5cclxuICAgIHRoaXMucmVzZXRQcm9kdWN0KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY2F0ZWdvcmllc0RCU2VydmljZS5nZXRDYXRlZ29yaWVzKCkudGhlbigoY2F0ZWdvcmllczogQXJyYXk8c3RyaW5nPikgPT4gdGhpcy5jYXRlZ29yeUxpc3QgPSBjYXRlZ29yaWVzKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBpc1Byb2R1Y3RWYWxpZCA9ICgpID0+IHRoaXMucHJvZHVjdCAmJiB0aGlzLnByb2R1Y3QucHJvZHVjdE5hbWUgJiYgdGhpcy5wcm9kdWN0LmJhckNvZGUgJiYgdGhpcy5wcm9kdWN0LmNhdGVnb3J5XHJcblxyXG4gIHB1YmxpYyBzY2FuQmFyY29kZSgpIHtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gdHJ1ZTtcclxuICAgIHRoaXMucmVzZXRQcm9kdWN0KCk7XHJcblxyXG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lclxyXG4gICAgICAuc2Nhbih7XHJcbiAgICAgICAgZm9ybWF0czogXCJDT0RFXzM5LCBDT0RFXzkzLCBDT0RFXzEyOCwgRUFOXzgsIEVBTl8xMywgVVBDX0VcIiwgLy8gUVJfQ09ERSBhbHNvIGFsbG93ZWRcclxuICAgICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsXHJcbiAgICAgICAgc2hvd1RvcmNoQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgIGJlZXBPblNjYW46IHRydWUsXHJcbiAgICAgICAgdG9yY2hPbjogZmFsc2UsXHJcbiAgICAgICAgcmVzdWx0RGlzcGxheUR1cmF0aW9uOiAyMDAwLFxyXG4gICAgICAgIG9yaWVudGF0aW9uOiBcInBvcnRyYWl0XCIsXHJcbiAgICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvL2lvcyBvbmx5IFxyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSByZXN1bHQuZm9ybWF0O1xyXG4gICAgICAgIHRoaXMuY29kZSA9IHJlc3VsdC50ZXh0O1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkxvb2tpbmcgZm9yIGR1cGxpY2F0ZXMgaW4gdGhlIGRhdGFiYXNlLi4uXCIpO1xyXG4gICAgICAgIC8vIHRoaXMucHJvZHVjdHNEQlNlcnZpY2UuZ2V0UHJvZHVjdEJ5QmFyY29kZShcIjgwMDExMjA5MTI5MTZcIilcclxuICAgICAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RCeUJhcmNvZGUodGhpcy5jb2RlKVxyXG4gICAgICAgICAgLnRoZW4oKHJlc3VsdFByb2R1Y3Q6IElQcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghIXJlc3VsdFByb2R1Y3QpIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZvdW5kIGl0IVwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHRQcm9kdWN0KSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5pc0VkaXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICB0aGlzLnByb2R1Y3QgPSByZXN1bHRQcm9kdWN0O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gcHJvZHVjdHMgZm91bmQgd2l0aCB0aGlzIGJhcmNvZGU6XCIsIHRoaXMuY29kZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0LmJhckNvZGUgPSB0aGlzLmNvZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG5cclxuICAgICAgfSwgKGVycm9yTWVzc2FnZSkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBzY2FubmluZyBcIiArIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFkZFByb2R1Y3QgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBpZiAodGhpcy5pc1Byb2R1Y3RWYWxpZCgpKSB7XHJcbiAgICAgIHRoaXMucHJvZHVjdHNEQlNlcnZpY2UuYWRkUHJvZHVjdCh0aGlzLnByb2R1Y3QpXHJcbiAgICAgICAgLnRoZW4oKGlkOiBudW1iZXIpID0+IHtcclxuICAgICAgICAgIGlkID8gY29uc29sZS5sb2coXCJQcm9kdWN0IGFkZGVkIHdpdGggaWQ6XCIsIGlkKSA6IGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGEgcHJvYmxlbTpcIiwgaWQpO1xyXG4gICAgICAgICAgdGhpcy5yZXNldFByb2R1Y3QoKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKFwiRXJyb3Igd2hpbGUgdHJ5aW5nIHRvIGFkZCBhIG5ldyBwcm9kdWN0OlwiLCBlcnJvcikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0UHJvZHVjdCA9ICgpOiB2b2lkID0+IHtcclxuICAgIHRoaXMucHJvZHVjdCA9IHtcclxuICAgICAgYmFyQ29kZTogXCJcIixcclxuICAgICAgYnJhbmQ6IFwiXCIsXHJcbiAgICAgIGNhdGVnb3J5OiBcIlwiLFxyXG4gICAgICBpZDogdW5kZWZpbmVkLFxyXG4gICAgICBwcm9kdWN0TmFtZTogXCJcIixcclxuICAgICAgd2VpZ2h0Vm9sdW1lOiBcIlwiXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0NhdGVnb3J5RGlhbG9nID0gKCkgPT4ge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiBcIkNob29zZSBwcm9kdWN0IGNhdGVnb3J5OlwiLFxyXG4gICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICBhY3Rpb25zOiB0aGlzLmNhdGVnb3J5TGlzdFxyXG4gICAgfTtcclxuXHJcbiAgICBhY3Rpb24ob3B0aW9ucykudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0ICE9PSBcIkNhbmNlbFwiKSB7XHJcbiAgICAgICAgdGhpcy5wcm9kdWN0LmNhdGVnb3J5ID0gcmVzdWx0O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvUHJvZHVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gUHJvZHVjdCBMaXN0Li4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3Byb2R1Y3RMaXN0L2xpc3RcIl0sIHtcclxuICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiLFxyXG4gICAgICAgIGR1cmF0aW9uOiAzMDBcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSJdfQ==