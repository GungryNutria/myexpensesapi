import { Expose,Type } from "class-transformer";
import { TypeAccountDto } from "./typeaccount.dto";

export class AccountDto{
    @Expose()
    id: number;
    @Expose()
    name: string;
    @Expose()
    description: string;
    @Expose()
    @Type(() => TypeAccountDto)
    TypeAccount: TypeAccountDto;
}