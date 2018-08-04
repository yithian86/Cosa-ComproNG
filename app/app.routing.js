"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_grocery_list_details_component_1 = require("~/components/grocery-list-details/components/app-grocery-list-details.component");
var app_grocery_list_form_component_1 = require("~/components/grocery-list-details/components/app-grocery-list-form.component");
var app_my_grocery_lists_component_1 = require("~/components/my-grocery-lists/components/app-my-grocery-lists.component");
exports.routes = [
    { path: "", redirectTo: "/home/groceryList/groceryListDetails", pathMatch: "full" },
    {
        path: "home", children: [
            {
                path: "groceryList", children: [
                    { path: "groceryListDetails", component: app_grocery_list_details_component_1.AppGroceryListDetailsComponent },
                    { path: "groceryListForm", component: app_grocery_list_form_component_1.AppGroceryListFormComponent }
                ]
            },
            {
                path: "myGroceryLists", component: app_my_grocery_lists_component_1.AppMyGroceryListsComponent
            }
        ]
    }
];
exports.navigatableComponents = [
    app_grocery_list_details_component_1.AppGroceryListDetailsComponent,
    app_grocery_list_form_component_1.AppGroceryListFormComponent,
    app_my_grocery_lists_component_1.AppMyGroceryListsComponent
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNJQUFnSTtBQUNoSSxnSUFBMEg7QUFDMUgsMEhBQXFIO0FBRXhHLFFBQUEsTUFBTSxHQUFHO0lBQ3BCLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsc0NBQXNDLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNuRjtRQUNFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO1lBQ3RCO2dCQUNFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFO29CQUM3QixFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUUsbUVBQThCLEVBQUU7b0JBQ3pFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSw2REFBMkIsRUFBRTtpQkFDcEU7YUFDRjtZQUNEO2dCQUNFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsMkRBQTBCO2FBQzlEO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLHFCQUFxQixHQUFHO0lBQ25DLG1FQUE4QjtJQUM5Qiw2REFBMkI7SUFDM0IsMkRBQTBCO0NBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBHcm9jZXJ5TGlzdERldGFpbHNDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL2dyb2NlcnktbGlzdC1kZXRhaWxzL2NvbXBvbmVudHMvYXBwLWdyb2NlcnktbGlzdC1kZXRhaWxzLmNvbXBvbmVudFwiXHJcbmltcG9ydCB7IEFwcEdyb2NlcnlMaXN0Rm9ybUNvbXBvbmVudCB9IGZyb20gXCJ+L2NvbXBvbmVudHMvZ3JvY2VyeS1saXN0LWRldGFpbHMvY29tcG9uZW50cy9hcHAtZ3JvY2VyeS1saXN0LWZvcm0uY29tcG9uZW50XCJcclxuaW1wb3J0IHsgQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnQgfSBmcm9tIFwifi9jb21wb25lbnRzL215LWdyb2NlcnktbGlzdHMvY29tcG9uZW50cy9hcHAtbXktZ3JvY2VyeS1saXN0cy5jb21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBjb25zdCByb3V0ZXMgPSBbXHJcbiAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIi9ob21lL2dyb2NlcnlMaXN0L2dyb2NlcnlMaXN0RGV0YWlsc1wiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXHJcbiAge1xyXG4gICAgcGF0aDogXCJob21lXCIsIGNoaWxkcmVuOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiBcImdyb2NlcnlMaXN0XCIsIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICB7IHBhdGg6IFwiZ3JvY2VyeUxpc3REZXRhaWxzXCIsIGNvbXBvbmVudDogQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50IH0sXHJcbiAgICAgICAgICB7IHBhdGg6IFwiZ3JvY2VyeUxpc3RGb3JtXCIsIGNvbXBvbmVudDogQXBwR3JvY2VyeUxpc3RGb3JtQ29tcG9uZW50IH1cclxuICAgICAgICBdXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBwYXRoOiBcIm15R3JvY2VyeUxpc3RzXCIsIGNvbXBvbmVudDogQXBwTXlHcm9jZXJ5TGlzdHNDb21wb25lbnRcclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuXTtcclxuXHJcbmV4cG9ydCBjb25zdCBuYXZpZ2F0YWJsZUNvbXBvbmVudHMgPSBbXHJcbiAgQXBwR3JvY2VyeUxpc3REZXRhaWxzQ29tcG9uZW50LFxyXG4gIEFwcEdyb2NlcnlMaXN0Rm9ybUNvbXBvbmVudCxcclxuICBBcHBNeUdyb2NlcnlMaXN0c0NvbXBvbmVudFxyXG5dOyJdfQ==