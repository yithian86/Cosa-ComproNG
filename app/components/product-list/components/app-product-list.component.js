"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_extensions_1 = require("nativescript-angular/router/router-extensions");
var router_1 = require("@angular/router");
var dialogs_1 = require("ui/dialogs");
var app_component_1 = require("~/app.component");
var app_categories_database_service_1 = require("~/components/categories/services/app-categories.database.service");
var app_product_list_database_service_1 = require("~/components/product-list/services/app-product-list.database.service");
var app_grocery_list_database_service_1 = require("~/components/grocery-list-details/services/app-grocery-list.database.service");
var AppProductListComponent = /** @class */ (function (_super) {
    __extends(AppProductListComponent, _super);
    function AppProductListComponent(activatedRoute, routerExtensions, categoriesDBService, productsDBService, groceryListDetailsDBService) {
        var _this = _super.call(this) || this;
        _this.activatedRoute = activatedRoute;
        _this.routerExtensions = routerExtensions;
        _this.categoriesDBService = categoriesDBService;
        _this.productsDBService = productsDBService;
        _this.groceryListDetailsDBService = groceryListDetailsDBService;
        //////////////////////////////////////// GETTERS AND SETTERS ///////////////////////////////////////////
        _this.getproductsListByCategory = function () { return _this.productsListByCategory && _this.productsListByCategory.length > 0 ? _this.productsListByCategory : []; };
        _this.getProductList = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList) {
                // console.log(JSON.stringify(this.productsListByCategory[index]));
                return _this.productsListByCategory[index].productList;
            }
            else {
                return [];
            }
        };
        _this.getCategory = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].category) {
                return _this.productsListByCategory[index].category;
            }
            else {
                return "-";
            }
        };
        _this.getProductListHeight = function (index) {
            if (_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList) {
                return _this.productsListByCategory[index].productList.length * 78;
            }
            else {
                return 0;
            }
        };
        _this.getFilterByText = function () {
            if (_this.categoryList && _this.categoryList.length > 0) {
                return "Filter products by: " + _this.selectedCategory;
            }
            else {
                return "-";
            }
        };
        ///////////////////////////////////////////// CHECKERS /////////////////////////////////////////////////
        _this.isProductListEmpty = function (index) {
            return !(_this.productsListByCategory && _this.productsListByCategory[index] && _this.productsListByCategory[index].productList && _this.productsListByCategory[index].productList.length > 0);
        };
        _this.isProductsListByCategoryEmpty = function () {
            return !(_this.productsListByCategory && _this.productsListByCategory.length > 0);
        };
        ///////////////////////////////////////////// SERVICES /////////////////////////////////////////////////
        _this.retrieveproductsListByCategory = function (category) {
            _this.productsListByCategory = [];
            _this.productsDBService.getProducts(category)
                .then(function (productList) {
                if (productList && productList.length > 0) {
                    _this.productsListByCategory.push({
                        category: category,
                        productList: productList
                    });
                }
            })
                .catch(function (error) { return console.error(error); });
        };
        _this.retrieveProductList = function () {
            _this.categoriesDBService.getCategories()
                .then(function (categories) {
                _this.categoryList = categories;
                _this.categoryList.unshift("All");
                categories.forEach(function (category) {
                    _this.retrieveproductsListByCategory(category);
                });
            })
                .catch(function (error) { return console.error(error); });
        };
        _this.onTapProduct = function (event, categoryIndex) {
            if (_this.readOnlyMode !== "readOnly") {
                var productIndex = event.index;
                var product_1 = _this.getProductList(categoryIndex)[productIndex];
                var categoryName = _this.getCategory(categoryIndex);
                console.log("TAPPED PRODUCT: " + product_1.productName + ", CATEGORY: " + categoryName);
                _this.groceryListDetailsDBService.getListItem(_this.activeListId, product_1.id)
                    .then(function (items) {
                    if (!items || items.length === 0) {
                        _this.groceryListDetailsDBService.insertIntoGroceryListDetails(_this.activeListId, product_1.id, 1)
                            .then(function () {
                            _this.displayMessage(product_1.productName + " added to your grocery list!");
                            _this.goToGroceryListDetails();
                        })
                            .catch(function (error) { return console.error(error); });
                    }
                    else {
                        _this.displayMessage(product_1.productName + " already present in your grocery list!", "error");
                    }
                })
                    .catch(function (error) { return console.error(error); });
            }
        };
        _this.showCategoryDialog = function () {
            var options = {
                title: "Choose product category:",
                message: "",
                cancelButtonText: "Cancel",
                actions: _this.categoryList
            };
            dialogs_1.action(options).then(function (selectedCategory) {
                if (selectedCategory && selectedCategory !== "Cancel") {
                    _this.selectedCategory = selectedCategory;
                    if (selectedCategory === "All") {
                        // Show all products
                        _this.retrieveProductList();
                    }
                    else {
                        // Filter by a specific category
                        _this.retrieveproductsListByCategory(selectedCategory);
                    }
                    console.log("Filter list by:", selectedCategory);
                }
            });
        };
        _this.goToBarcodeScanner = function () {
            console.log("Navigating to Barcode Scanner...");
            _this.routerExtensions.navigate(["/home/productList/barcode-scanner"], {
                transition: {
                    name: "slideLeft",
                    duration: 300
                }
            });
        };
        _this.goToGroceryListDetails = function () {
            console.log("Navigating to Grocery List Details...");
            _this.routerExtensions.navigate(["/home/groceryListDetails"], {
                transition: {
                    name: "slideRight",
                    duration: 300
                }
            });
        };
        _this.readOnlyParamSubscription = _this.activatedRoute.params.subscribe(function (params) {
            _this.readOnlyMode = params['mode'];
            _this.activeListId = params['listId'];
        });
        _this.selectedCategory = "All";
        _this.categoryList = [];
        _this.productsListByCategory = [];
        return _this;
    }
    AppProductListComponent.prototype.ngOnInit = function () {
        this.retrieveProductList();
    };
    ///////////////////////////////////////// HANDLERS/ACTIONS /////////////////////////////////////////////
    AppProductListComponent.prototype.ngOnDestroy = function () {
        if (this.readOnlyParamSubscription) {
            this.readOnlyParamSubscription.unsubscribe();
        }
        ;
    };
    ;
    AppProductListComponent = __decorate([
        core_1.Component({
            selector: "app-product-list",
            templateUrl: "components/product-list/views/app-product-list.component.html",
            styleUrls: ["components/product-list/styles/app-product-list.component.css"],
            providers: [app_categories_database_service_1.CategoriesDBService, app_product_list_database_service_1.ProductsDBService, app_grocery_list_database_service_1.GroceryListDetailsDBService]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_extensions_1.RouterExtensions,
            app_categories_database_service_1.CategoriesDBService,
            app_product_list_database_service_1.ProductsDBService,
            app_grocery_list_database_service_1.GroceryListDetailsDBService])
    ], AppProductListComponent);
    return AppProductListComponent;
}(app_component_1.AppComponent));
exports.AppProductListComponent = AppProductListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLXByb2R1Y3QtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRkFBaUY7QUFDakYsMENBQWlEO0FBQ2pELHNDQUFvQztBQUdwQyxpREFBK0M7QUFDL0Msb0hBQXVHO0FBQ3ZHLDBIQUF5RztBQUN6RyxrSUFBMkg7QUFTM0g7SUFBNkMsMkNBQVk7SUFRdkQsaUNBQ1UsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQ2xDLG1CQUF3QyxFQUN4QyxpQkFBb0MsRUFDcEMsMkJBQXdEO1FBTGxFLFlBT0UsaUJBQU8sU0FTUjtRQWZTLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHlCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsdUJBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxpQ0FBMkIsR0FBM0IsMkJBQTJCLENBQTZCO1FBa0JsRSx3R0FBd0c7UUFDakcsK0JBQXlCLEdBQUcsY0FBZ0MsT0FBQSxLQUFJLENBQUMsc0JBQXNCLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUF4RyxDQUF3RyxDQUFDO1FBRXJLLG9CQUFjLEdBQUcsVUFBQyxLQUFhO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsSUFBSSxLQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hILG1FQUFtRTtnQkFDbkUsTUFBTSxDQUFDLEtBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENB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QVEsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsc0JBQXNCLEdBQUcsRUFBRSxDQUFDOztJQUNuQyxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFpRkQsd0dBQXdHO0lBQ3hHLDZDQUFXLEdBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMvQyxDQUFDO1FBQUEsQ0FBQztJQUNKLENBQUM7SUFBQSxDQUFDO0lBbEhTLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsK0RBQStEO1lBQzVFLFNBQVMsRUFBRSxDQUFDLCtEQUErRCxDQUFDO1lBQzVFLFNBQVMsRUFBRSxDQUFDLHFEQUFtQixFQUFFLHFEQUFpQixFQUFFLCtEQUEyQixDQUFDO1NBQ2pGLENBQUM7eUNBVTBCLHVCQUFjO1lBQ1osb0NBQWdCO1lBQ2IscURBQW1CO1lBQ3JCLHFEQUFpQjtZQUNQLCtEQUEyQjtPQWJ2RCx1QkFBdUIsQ0FzTG5DO0lBQUQsOEJBQUM7Q0FBQSxBQXRMRCxDQUE2Qyw0QkFBWSxHQXNMeEQ7QUF0TFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlci9yb3V0ZXItZXh0ZW5zaW9uc1wiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XHJcblxyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwifi9hcHAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENhdGVnb3JpZXNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2NhdGVnb3JpZXMvc2VydmljZXMvYXBwLWNhdGVnb3JpZXMuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0c0RCU2VydmljZSB9IGZyb20gXCJ+L2NvbXBvbmVudHMvcHJvZHVjdC1saXN0L3NlcnZpY2VzL2FwcC1wcm9kdWN0LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBHcm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2UgfSBmcm9tIFwifi9jb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL3NlcnZpY2VzL2FwcC1ncm9jZXJ5LWxpc3QuZGF0YWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBJQ2F0ZWdvcnlQcm9kdWN0cywgSVByb2R1Y3QgfSBmcm9tIFwifi9jb21wb25lbnRzL3R5cGluZ3MvcHJvZHVjdFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6IFwiYXBwLXByb2R1Y3QtbGlzdFwiLFxyXG4gIHRlbXBsYXRlVXJsOiBcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3ZpZXdzL2FwcC1wcm9kdWN0LWxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuICBzdHlsZVVybHM6IFtcImNvbXBvbmVudHMvcHJvZHVjdC1saXN0L3N0eWxlcy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudC5jc3NcIl0sXHJcbiAgcHJvdmlkZXJzOiBbQ2F0ZWdvcmllc0RCU2VydmljZSwgUHJvZHVjdHNEQlNlcnZpY2UsIEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcFByb2R1Y3RMaXN0Q29tcG9uZW50IGV4dGVuZHMgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwdWJsaWMgcmVhZE9ubHlQYXJhbVN1YnNjcmlwdGlvbjogYW55O1xyXG4gIHB1YmxpYyBjYXRlZ29yeUxpc3Q6IEFycmF5PHN0cmluZz47XHJcbiAgcHVibGljIHByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnk6IEFycmF5PElDYXRlZ29yeVByb2R1Y3RzPjtcclxuICBwdWJsaWMgc2VsZWN0ZWRDYXRlZ29yeTogc3RyaW5nO1xyXG4gIHByaXZhdGUgcmVhZE9ubHlNb2RlOiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBhY3RpdmVMaXN0SWQ6IG51bWJlcjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFjdGl2YXRlZFJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgIHByaXZhdGUgY2F0ZWdvcmllc0RCU2VydmljZTogQ2F0ZWdvcmllc0RCU2VydmljZSxcclxuICAgIHByaXZhdGUgcHJvZHVjdHNEQlNlcnZpY2U6IFByb2R1Y3RzREJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBncm9jZXJ5TGlzdERldGFpbHNEQlNlcnZpY2U6IEdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZVxyXG4gICkge1xyXG4gICAgc3VwZXIoKTtcclxuXHJcbiAgICB0aGlzLnJlYWRPbmx5UGFyYW1TdWJzY3JpcHRpb24gPSB0aGlzLmFjdGl2YXRlZFJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgdGhpcy5yZWFkT25seU1vZGUgPSBwYXJhbXNbJ21vZGUnXTtcclxuICAgICAgdGhpcy5hY3RpdmVMaXN0SWQgPSBwYXJhbXNbJ2xpc3RJZCddO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ2F0ZWdvcnkgPSBcIkFsbFwiO1xyXG4gICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBbXTtcclxuICAgIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IFtdO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLnJldHJpZXZlUHJvZHVjdExpc3QoKTtcclxuICB9XHJcblxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEdFVFRFUlMgQU5EIFNFVFRFUlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gIHB1YmxpYyBnZXRwcm9kdWN0c0xpc3RCeUNhdGVnb3J5ID0gKCk6IEFycmF5PElDYXRlZ29yeVByb2R1Y3RzPiA9PiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDAgPyB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgOiBbXTtcclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0ID0gKGluZGV4OiBudW1iZXIpOiBBcnJheTxJUHJvZHVjdD4gPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgLy8gY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSkpO1xyXG4gICAgICByZXR1cm4gdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XS5wcm9kdWN0TGlzdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRDYXRlZ29yeSA9IChpbmRleDogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5KSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLmNhdGVnb3J5O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFByb2R1Y3RMaXN0SGVpZ2h0ID0gKGluZGV4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gICAgaWYgKHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QubGVuZ3RoICogNzg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRGaWx0ZXJCeVRleHQgPSAoKTogc3RyaW5nID0+IHtcclxuICAgIGlmICh0aGlzLmNhdGVnb3J5TGlzdCAmJiB0aGlzLmNhdGVnb3J5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBgRmlsdGVyIHByb2R1Y3RzIGJ5OiAke3RoaXMuc2VsZWN0ZWRDYXRlZ29yeX1gO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFwiLVwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBDSEVDS0VSUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIGlzUHJvZHVjdExpc3RFbXB0eSA9IChpbmRleDogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5W2luZGV4XSAmJiB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnlbaW5kZXhdLnByb2R1Y3RMaXN0ICYmIHRoaXMucHJvZHVjdHNMaXN0QnlDYXRlZ29yeVtpbmRleF0ucHJvZHVjdExpc3QubGVuZ3RoID4gMCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNQcm9kdWN0c0xpc3RCeUNhdGVnb3J5RW1wdHkgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgICByZXR1cm4gISh0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgJiYgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5Lmxlbmd0aCA+IDApO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBTRVJWSUNFUyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgcHVibGljIHJldHJpZXZlcHJvZHVjdHNMaXN0QnlDYXRlZ29yeSA9IChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgICB0aGlzLnByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkgPSBbXTtcclxuXHJcbiAgICB0aGlzLnByb2R1Y3RzREJTZXJ2aWNlLmdldFByb2R1Y3RzKGNhdGVnb3J5KVxyXG4gICAgICAudGhlbigocHJvZHVjdExpc3Q6IEFycmF5PElQcm9kdWN0PikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocHJvZHVjdExpc3QgJiYgcHJvZHVjdExpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9kdWN0c0xpc3RCeUNhdGVnb3J5LnB1c2goe1xyXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgICAgICAgIHByb2R1Y3RMaXN0OiBwcm9kdWN0TGlzdFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJldHJpZXZlUHJvZHVjdExpc3QgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmNhdGVnb3JpZXNEQlNlcnZpY2UuZ2V0Q2F0ZWdvcmllcygpXHJcbiAgICAgIC50aGVuKChjYXRlZ29yaWVzOiBBcnJheTxzdHJpbmc+KSA9PiB7XHJcbiAgICAgICAgdGhpcy5jYXRlZ29yeUxpc3QgPSBjYXRlZ29yaWVzO1xyXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlMaXN0LnVuc2hpZnQoXCJBbGxcIik7XHJcblxyXG4gICAgICAgIGNhdGVnb3JpZXMuZm9yRWFjaCgoY2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVwcm9kdWN0c0xpc3RCeUNhdGVnb3J5KGNhdGVnb3J5KTtcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEhBTkRMRVJTL0FDVElPTlMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5yZWFkT25seVBhcmFtU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMucmVhZE9ubHlQYXJhbVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfTtcclxuICB9O1xyXG5cclxuICBwdWJsaWMgb25UYXBQcm9kdWN0ID0gKGV2ZW50OiBhbnksIGNhdGVnb3J5SW5kZXg6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gICAgaWYgKHRoaXMucmVhZE9ubHlNb2RlICE9PSBcInJlYWRPbmx5XCIpIHtcclxuICAgICAgY29uc3QgcHJvZHVjdEluZGV4OiBudW1iZXIgPSBldmVudC5pbmRleDtcclxuICAgICAgY29uc3QgcHJvZHVjdDogSVByb2R1Y3QgPSB0aGlzLmdldFByb2R1Y3RMaXN0KGNhdGVnb3J5SW5kZXgpW3Byb2R1Y3RJbmRleF07XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5TmFtZTogc3RyaW5nID0gdGhpcy5nZXRDYXRlZ29yeShjYXRlZ29yeUluZGV4KTtcclxuICAgICAgY29uc29sZS5sb2coYFRBUFBFRCBQUk9EVUNUOiAke3Byb2R1Y3QucHJvZHVjdE5hbWV9LCBDQVRFR09SWTogJHtjYXRlZ29yeU5hbWV9YCk7XHJcblxyXG4gICAgICB0aGlzLmdyb2NlcnlMaXN0RGV0YWlsc0RCU2VydmljZS5nZXRMaXN0SXRlbSh0aGlzLmFjdGl2ZUxpc3RJZCwgcHJvZHVjdC5pZClcclxuICAgICAgICAudGhlbigoaXRlbXM6IEFycmF5PGFueT4pID0+IHtcclxuICAgICAgICAgIGlmICghaXRlbXMgfHwgaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ3JvY2VyeUxpc3REZXRhaWxzREJTZXJ2aWNlLmluc2VydEludG9Hcm9jZXJ5TGlzdERldGFpbHModGhpcy5hY3RpdmVMaXN0SWQsIHByb2R1Y3QuaWQsIDEpXHJcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSBhZGRlZCB0byB5b3VyIGdyb2NlcnkgbGlzdCFgKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29Ub0dyb2NlcnlMaXN0RGV0YWlscygpXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TWVzc2FnZShgJHtwcm9kdWN0LnByb2R1Y3ROYW1lfSBhbHJlYWR5IHByZXNlbnQgaW4geW91ciBncm9jZXJ5IGxpc3QhYCwgXCJlcnJvclwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiBjb25zb2xlLmVycm9yKGVycm9yKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2hvd0NhdGVnb3J5RGlhbG9nID0gKCkgPT4ge1xyXG4gICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgIHRpdGxlOiBcIkNob29zZSBwcm9kdWN0IGNhdGVnb3J5OlwiLFxyXG4gICAgICBtZXNzYWdlOiBcIlwiLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbFwiLFxyXG4gICAgICBhY3Rpb25zOiB0aGlzLmNhdGVnb3J5TGlzdFxyXG4gICAgfTtcclxuXHJcbiAgICBhY3Rpb24ob3B0aW9ucykudGhlbigoc2VsZWN0ZWRDYXRlZ29yeSkgPT4ge1xyXG4gICAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSAmJiBzZWxlY3RlZENhdGVnb3J5ICE9PSBcIkNhbmNlbFwiKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRDYXRlZ29yeSA9PT0gXCJBbGxcIikge1xyXG4gICAgICAgICAgLy8gU2hvdyBhbGwgcHJvZHVjdHNcclxuICAgICAgICAgIHRoaXMucmV0cmlldmVQcm9kdWN0TGlzdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBGaWx0ZXIgYnkgYSBzcGVjaWZpYyBjYXRlZ29yeVxyXG4gICAgICAgICAgdGhpcy5yZXRyaWV2ZXByb2R1Y3RzTGlzdEJ5Q2F0ZWdvcnkoc2VsZWN0ZWRDYXRlZ29yeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRmlsdGVyIGxpc3QgYnk6XCIsIHNlbGVjdGVkQ2F0ZWdvcnkpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnb1RvQmFyY29kZVNjYW5uZXIgPSAoKTogdm9pZCA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gQmFyY29kZSBTY2FubmVyLi4uXCIpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9ob21lL3Byb2R1Y3RMaXN0L2JhcmNvZGUtc2Nhbm5lclwiXSwge1xyXG4gICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgbmFtZTogXCJzbGlkZUxlZnRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdvVG9Hcm9jZXJ5TGlzdERldGFpbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIk5hdmlnYXRpbmcgdG8gR3JvY2VyeSBMaXN0IERldGFpbHMuLi5cIik7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2hvbWUvZ3JvY2VyeUxpc3REZXRhaWxzXCJdLCB7XHJcbiAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcclxuICAgICAgICBkdXJhdGlvbjogMzAwXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufSJdfQ==