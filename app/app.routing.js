"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_grocery_list_details_component_1 = require("~/components/grocery-list-details/components/app-grocery-list-details.component");
var app_my_grocery_lists_component_1 = require("~/components/my-grocery-lists/components/app-my-grocery-lists.component");
var app_product_list_component_1 = require("~/components/product-list/components/app-product-list.component");
var app_barcode_scanner_component_1 = require("~/components/product-list/components/app-barcode-scanner.component");
exports.routes = [
    { path: "", redirectTo: "/home/groceryList/groceryListDetails", pathMatch: "full" },
    {
        path: "home", children: [
            {
                path: "groceryList", children: [
                    { path: "groceryListDetails", component: app_grocery_list_details_component_1.AppGroceryListDetailsComponent }
                ]
            },
            { path: "myGroceryLists", component: app_my_grocery_lists_component_1.AppMyGroceryListsComponent },
            {
                path: "productList", children: [
                    { path: "list", component: app_product_list_component_1.AppProductListComponent },
                    { path: "barcodeScanner", component: app_barcode_scanner_component_1.AppBarcodeScannerComponent }
                ]
            }
        ]
    }
];
exports.navigatableComponents = [
    app_grocery_list_details_component_1.AppGroceryListDetailsComponent,
    app_my_grocery_lists_component_1.AppMyGroceryListsComponent,
    app_product_list_component_1.AppProductListComponent,
    app_barcode_scanner_component_1.AppBarcodeScannerComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNJQUFnSTtBQUNoSSwwSEFBcUg7QUFDckgsOEdBQXlHO0FBQ3pHLG9IQUFnSDtBQUVuRyxRQUFBLE1BQU0sR0FBRztJQUNwQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLHNDQUFzQyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDbkY7UUFDRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtZQUN0QjtnQkFDRSxJQUFJLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRTtvQkFDN0IsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLG1FQUE4QixFQUFFO2lCQUMxRTthQUNGO1lBQ0QsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLDJEQUEwQixFQUFFO1lBQ2pFO2dCQUNFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFO29CQUM3QixFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLG9EQUF1QixFQUFFO29CQUNwRCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsMERBQTBCLEVBQUU7aUJBQ2xFO2FBQ0Y7U0FDRjtLQUNGO0NBQ0YsQ0FBQztBQUVXLFFBQUEscUJBQXFCLEdBQUc7SUFDbkMsbUVBQThCO0lBQzlCLDJEQUEwQjtJQUMxQixvREFBdUI7SUFDdkIsMERBQTBCO0NBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBHcm9jZXJ5TGlzdERldGFpbHNDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL2NvbXBvbmVudHMvYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudFwiXHJcbmltcG9ydCB7IEFwcE15R3JvY2VyeUxpc3RzQ29tcG9uZW50IH0gZnJvbSBcIn4vY29tcG9uZW50cy9teS1ncm9jZXJ5LWxpc3RzL2NvbXBvbmVudHMvYXBwLW15LWdyb2NlcnktbGlzdHMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEFwcFByb2R1Y3RMaXN0Q29tcG9uZW50IH0gZnJvbSBcIn4vY29tcG9uZW50cy9wcm9kdWN0LWxpc3QvY29tcG9uZW50cy9hcHAtcHJvZHVjdC1saXN0LmNvbXBvbmVudFwiXHJcbmltcG9ydCB7IEFwcEJhcmNvZGVTY2FubmVyQ29tcG9uZW50IH0gZnJvbSBcIn4vY29tcG9uZW50cy9wcm9kdWN0LWxpc3QvY29tcG9uZW50cy9hcHAtYmFyY29kZS1zY2FubmVyLmNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcclxuICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiL2hvbWUvZ3JvY2VyeUxpc3QvZ3JvY2VyeUxpc3REZXRhaWxzXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcclxuICB7XHJcbiAgICBwYXRoOiBcImhvbWVcIiwgY2hpbGRyZW46IFtcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6IFwiZ3JvY2VyeUxpc3RcIiwgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHsgcGF0aDogXCJncm9jZXJ5TGlzdERldGFpbHNcIiwgY29tcG9uZW50OiBBcHBHcm9jZXJ5TGlzdERldGFpbHNDb21wb25lbnQgfVxyXG4gICAgICAgIF1cclxuICAgICAgfSxcclxuICAgICAgeyBwYXRoOiBcIm15R3JvY2VyeUxpc3RzXCIsIGNvbXBvbmVudDogQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnQgfSxcclxuICAgICAge1xyXG4gICAgICAgIHBhdGg6IFwicHJvZHVjdExpc3RcIiwgY2hpbGRyZW46IFtcclxuICAgICAgICAgIHsgcGF0aDogXCJsaXN0XCIsIGNvbXBvbmVudDogQXBwUHJvZHVjdExpc3RDb21wb25lbnQgfSxcclxuICAgICAgICAgIHsgcGF0aDogXCJiYXJjb2RlU2Nhbm5lclwiLCBjb21wb25lbnQ6IEFwcEJhcmNvZGVTY2FubmVyQ29tcG9uZW50IH1cclxuICAgICAgICBdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9XHJcbl07XHJcblxyXG5leHBvcnQgY29uc3QgbmF2aWdhdGFibGVDb21wb25lbnRzID0gW1xyXG4gIEFwcEdyb2NlcnlMaXN0RGV0YWlsc0NvbXBvbmVudCxcclxuICBBcHBNeUdyb2NlcnlMaXN0c0NvbXBvbmVudCxcclxuICBBcHBQcm9kdWN0TGlzdENvbXBvbmVudCxcclxuICBBcHBCYXJjb2RlU2Nhbm5lckNvbXBvbmVudFxyXG5dOyJdfQ==