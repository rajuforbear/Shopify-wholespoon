import { HelperNavigationParams } from "../navigation/Helper";
import { NavigationParams } from "../navigation";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackScreenProps,StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp, } from "@react-navigation/drawer";
import { DrawerNavigationPramas } from "../navigation/drawer";
export type RootNavigationParams = CompositeNavigationProp<
StackNavigationProp<NavigationParams>,
StackNavigationProp<HelperNavigationParams>>

type DrawerProps= DrawerNavigationProp<DrawerNavigationPramas>