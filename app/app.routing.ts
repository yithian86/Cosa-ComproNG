import { AppGroceryListDetailsComponent } from "~/components/grocery-list-details/components/app-grocery-list-details.component"
import { AppMyGroceryListsComponent } from "~/components/my-grocery-lists/components/app-my-grocery-lists.component";
import { AppProductListComponent } from "~/components/product-list/components/app-product-list.component"

export const routes = [
  { path: "", redirectTo: "/home/groceryList/groceryListDetails", pathMatch: "full" },
  {
    path: "home", children: [
      {
        path: "groceryList", children: [
          { path: "groceryListDetails", component: AppGroceryListDetailsComponent }
        ]
      },
      { path: "myGroceryLists", component: AppMyGroceryListsComponent },
      { path: "productList", component: AppProductListComponent }
    ]
  }
];

export const navigatableComponents = [
  AppGroceryListDetailsComponent,
  AppMyGroceryListsComponent,
  AppProductListComponent
];