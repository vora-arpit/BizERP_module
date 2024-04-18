// import { Injectable } from '@angular/core';
// import * as OrderItemActions from '../actions/orderItem.action';
// import { OrderItem, OrderItemService } from '../../core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, map, of, switchMap } from 'rxjs';

// @Injectable()
// export class OrderItemEffects{
//     constructor(
//         private actions$: Actions, 
//         private orderItemService: OrderItemService
//     ){}

//     getOrderItems$= createEffect(()=> {
//         return this.actions$.pipe(
//             ofType(OrderItemActions.getOrderItem),
//             switchMap(()=>{
//                 return this.orderItemService.getOrderItemsByOrderId.pipe(
//                     map(orderItems=> 
//                         OrderItemActions.getOrderItemSuccess({ orderItems })),
//                     catchError(error=> of(OrderItemActions.getOrderItemFailure({error})))
//                 );
//             })
//         );
//     });
// }
