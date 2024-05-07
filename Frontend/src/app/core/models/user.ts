import { Organizations } from "./organizations";

export class User {
    id!: number;
    email!: string;
    password!: string;
    name!: string;
    roles!: string[];
    imageUrl?: string;
    token?: string;
    email_verified?:boolean;
    organizationId:bigint;
}