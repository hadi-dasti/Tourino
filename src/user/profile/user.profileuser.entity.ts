import { ChildEntity } from "typeorm";
import { AuthUserEntity } from "../auth/authuser.entity";



@ChildEntity()
export class ProfileUserEntity extends AuthUserEntity{
    
}