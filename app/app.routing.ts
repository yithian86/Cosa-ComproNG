import { AppGroceryListDetailsComponent } from "~/components/grocery-list-details/components/app-grocery-list-details.component"
import { AppMyGroceryListsComponent } from "~/components/my-grocery-lists/components/app-my-grocery-lists.component";

export const routes = [
  { path: "", redirectTo: "/home/groceryListDetails", pathMatch: "full" },
  {
    path: "home", children: [
      { path: "groceryListDetails", component: AppGroceryListDetailsComponent },
      { path: "myGroceryLists", component: AppMyGroceryListsComponent }
    ]
  }
];

export const navigatableComponents = [
  AppGroceryListDetailsComponent,
  AppMyGroceryListsComponent
];