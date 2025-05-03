import { Expose } from "class-transformer";
import { AccountDto } from "./account.dto";

export class UserDto {
        @Expose()
        id?: number;
        @Expose()
        username?: string;
        @Expose()
        email?: string;
        @Expose()
        password?: string;
        @Expose()
        accounts?: AccountDto[];
}