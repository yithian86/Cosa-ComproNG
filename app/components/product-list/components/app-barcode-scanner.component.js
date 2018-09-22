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
            _this.routerExtensions.navigate(["/home/productList/list", ''], {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMkVBQTZEO0FBQzdELHNDQUFvQztBQUVwQywwSEFBeUc7QUFDekcsb0hBQXVHO0FBU3ZHO0lBT0Usb0NBQ1UsZ0JBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLGlCQUFvQyxFQUNwQyxtQkFBd0M7UUFKbEQsaUJBV0M7UUFWUyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFhM0MsbUJBQWMsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBekYsQ0FBeUYsQ0FBQTtRQTBDaEgsZUFBVSxHQUFHO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQztxQkFDNUMsSUFBSSxDQUFDLFVBQUMsRUFBVTtvQkFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ3pGLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDdEIsQ0FBQyxD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b250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXIvcm91dGVyLWV4dGVuc2lvbnNcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xyXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgUHJvZHVjdHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zZXJ2aWNlcy9hcHAtcHJvZHVjdC1saXN0LmRhdGFiYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcmllc0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvY2F0ZWdvcmllcy9zZXJ2aWNlcy9hcHAtY2F0ZWdvcmllcy5kYXRhYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IElQcm9kdWN0IH0gZnJvbSBcIn4vY29tcG9uZW50cy90eXBpbmdzL3Byb2R1Y3RcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcImFwcC1iYXJjb2RlLXNjYW5uZXJcIixcclxuICB0ZW1wbGF0ZVVybDogXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC92aWV3cy9hcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJjb21wb25lbnRzL3Byb2R1Y3QtbGlzdC9zdHlsZXMvYXBwLWJhcmNvZGUtc2Nhbm5lci5jb21wb25lbnQuY3NzXCJdLFxyXG4gIHByb3ZpZGVyczogW0JhcmNvZGVTY2FubmVyLCBQcm9kdWN0c0RCU2VydmljZSwgQ2F0ZWdvcmllc0RCU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcEJhcmNvZGVTY2FubmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgcHJvZHVjdDogSVByb2R1Y3Q7XHJcbiAgcHVibGljIGNhdGVnb3J5TGlzdDogQXJyYXk8c3RyaW5nPlxyXG4gIHB1YmxpYyBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIGZvcm1hdDogc3RyaW5nO1xyXG4gIHB1YmxpYyBjb2RlOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgcHJpdmF0ZSBiYXJjb2RlU2Nhbm5lcjogQmFyY29kZVNjYW5uZXIsXHJcbiAgICBwcml2YXRlIHByb2R1Y3RzREJTZXJ2aWNlOiBQcm9kdWN0c0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgY2F0ZWdvcmllc0RCU2VydmljZTogQ2F0ZWdvcmllc0RCU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5mb3JtYXQgPSBcIiAtIFwiO1xyXG4gICAgdGhpcy5jb2RlID0gXCIgLSBcIjtcclxuICAgIHRoaXMuaXNFZGl0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLnJlc2V0UHJvZHVjdCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNEQlNlcnZpY2UuZ2V0Q2F0ZWdvcmllcygpLnRoZW4oKGNhdGVnb3JpZXM6IEFycmF5PHN0cmluZz4pID0+IHRoaXMuY2F0ZWdvcnlMaXN0ID0gY2F0ZWdvcmllcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNQcm9kdWN0VmFsaWQgPSAoKSA9PiB0aGlzLnByb2R1Y3QgJiYgdGhpcy5wcm9kdWN0LnByb2R1Y3ROYW1lICYmIHRoaXMucHJvZHVjdC5iYXJDb2RlICYmIHRoaXMucHJvZHVjdC5jYXRlZ29yeVxyXG5cclxuICBwdWJsaWMgc2NhbkJhcmNvZGUoKSB7XHJcbiAgICB0aGlzLmlzRWRpdGluZyA9IHRydWU7XHJcbiAgICB0aGlzLnJlc2V0UHJvZHVjdCgpO1xyXG5cclxuICAgIHRoaXMuYmFyY29kZVNjYW5uZXJcclxuICAgICAgLnNjYW4oe1xyXG4gICAgICAgIGZvcm1hdHM6IFwiQ09ERV8zOSwgQ09ERV85MywgQ09ERV8xMjgsIEVBTl84LCBFQU5fMTMsIFVQQ19FXCIsIC8vIFFSX0NPREUgYWxzbyBhbGxvd2VkXHJcbiAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsXHJcbiAgICAgICAgcHJlZmVyRnJvbnRDYW1lcmE6IGZhbHNlLFxyXG4gICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgICBiZWVwT25TY2FuOiB0cnVlLFxyXG4gICAgICAgIHRvcmNoT246IGZhbHNlLFxyXG4gICAgICAgIHJlc3VsdERpc3BsYXlEdXJhdGlvbjogMjAwMCxcclxuICAgICAgICBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLFxyXG4gICAgICAgIG9wZW5TZXR0aW5nc0lmUGVybWlzc2lvbldhc1ByZXZpb3VzbHlEZW5pZWQ6IHRydWUgLy9pb3Mgb25seSBcclxuICAgICAgfSlcclxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZm9ybWF0ID0gcmVzdWx0LmZvcm1hdDtcclxuICAgICAgICB0aGlzLmNvZGUgPSByZXN1bHQudGV4dDtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJMb29raW5nIGZvciBkdXBsaWNhdGVzIGluIHRoZSBkYXRhYmFzZS4uLlwiKTtcclxuICAgICAgICAvLyB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RCeUJhcmNvZGUoXCI4MDAxMTIwOTEyOTE2XCIpXHJcbiAgICAgICAgdGhpcy5wcm9kdWN0c0RCU2VydmljZS5nZXRQcm9kdWN0QnlCYXJjb2RlKHRoaXMuY29kZSlcclxuICAgICAgICAgIC50aGVuKChyZXN1bHRQcm9kdWN0OiBJUHJvZHVjdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoISFyZXN1bHRQcm9kdWN0KSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJGb3VuZCBpdCFcIiwgSlNPTi5zdHJpbmdpZnkocmVzdWx0UHJvZHVjdCkpO1xyXG4gICAgICAgICAgICAgIHRoaXMuaXNFZGl0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5wcm9kdWN0ID0gcmVzdWx0UHJvZHVjdDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHByb2R1Y3RzIGZvdW5kIHdpdGggdGhpcyBiYXJjb2RlOlwiLCB0aGlzLmNvZGUpO1xyXG4gICAgICAgICAgICAgIHRoaXMucHJvZHVjdC5iYXJDb2RlID0gdGhpcy5jb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUuZXJyb3IoZXJyb3IpKTtcclxuXHJcbiAgICAgIH0sIChlcnJvck1lc3NhZ2UpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gc2Nhbm5pbmcgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBhZGRQcm9kdWN0ID0gKCk6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHRoaXMuaXNQcm9kdWN0VmFsaWQoKSkge1xyXG4gICAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmFkZFByb2R1Y3QodGhpcy5wcm9kdWN0KVxyXG4gICAgICAgIC50aGVuKChpZDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICBpZCA/IGNvbnNvbGUubG9nKFwiUHJvZHVjdCBhZGRlZCB3aXRoIGlkOlwiLCBpZCkgOiBjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhIHByb2JsZW06XCIsIGlkKTtcclxuICAgICAgICAgIHRoaXMucmVzZXRQcm9kdWN0KCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihcIkVycm9yIHdoaWxlIHRyeWluZyB0byBhZGQgYSBuZXcgcHJvZHVjdDpcIiwgZXJyb3IpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldFByb2R1Y3QgPSAoKTogdm9pZCA9PiB7XHJcbiAgICB0aGlzLnByb2R1Y3QgPSB7XHJcbiAgICAgIGJhckNvZGU6IFwiXCIsXHJcbiAgICAgIGJyYW5kOiBcIlwiLFxyXG4gICAgICBjYXRlZ29yeTogXCJcIixcclxuICAgICAgaWQ6IHVuZGVmaW5lZCxcclxuICAgICAgcHJvZHVjdE5hbWU6IFwiXCIsXHJcbiAgICAgIHdlaWdodFZvbHVtZTogXCJcIlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNob3dDYXRlZ29yeURpYWxvZyA9ICgpID0+IHtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICB0aXRsZTogXCJDaG9vc2UgcHJvZHVjdCBjYXRlZ29yeTpcIixcclxuICAgICAgbWVzc2FnZTogXCJcIixcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgYWN0aW9uczogdGhpcy5jYXRlZ29yeUxpc3RcclxuICAgIH07XHJcblxyXG4gICAgYWN0aW9uKG9wdGlvbnMpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0ICYmIHJlc3VsdCAhPT0gXCJDYW5jZWxcIikge1xyXG4gICAgICAgIHRoaXMucHJvZHVjdC5jYXRlZ29yeSA9IHJlc3VsdDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ29Ub1Byb2R1Y3RMaXN0ID0gKCkgPT4ge1xyXG4gICAgY29uc29sZS5sb2coXCJOYXZpZ2F0aW5nIHRvIFByb2R1Y3QgTGlzdC4uLlwiKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvaG9tZS9wcm9kdWN0TGlzdC9saXN0XCIsICcnXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZVJpZ2h0XCIsXHJcbiAgICAgICAgZHVyYXRpb246IDMwMFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59Il19