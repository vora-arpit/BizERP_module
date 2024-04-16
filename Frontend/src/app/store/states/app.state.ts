import { ActionReducerMap } from "@ngrx/store";
import { StateNameEnum as StateNames } from "../enums/state-names.enum"
import { ProductState } from "./products.state";
import { productReducer } from "../reducers/products.reducer";
import { ProductEffects } from "../effects/products.effect";
import { CustomerState } from "./customer.state";
import { customerReducer } from "../reducers/customer.reducer";
import { CustomerEffects } from "../effects/customer.effect";


export interface AppState{
    [StateNames.PRODUCT_STATE_NAME]:ProductState;
    [StateNames.CUSTOMER_STATE_NAME]:CustomerState;

}

export const allReducers: ActionReducerMap<AppState> ={
    [StateNames.PRODUCT_STATE_NAME]:productReducer,
    [StateNames.CUSTOMER_STATE_NAME]:customerReducer
};

export const allEffects=[
    ProductEffects,CustomerEffects
];


