import { Customer } from "./customer";
import { OrderItem } from "./orderitem";
import { User } from "./user";

export interface Order {
    id: BigInt;
    createdAt: Date;
    createdBy :User;
    customer: Customer;
    status: string;
    total: number;
    itemcount:number;
    orderItem:OrderItem;
}