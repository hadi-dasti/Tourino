import { Module } from "@nestjs/common";
import { RegisterClientModule } from "./regitster_client/registerClient.module";

@Module({
    imports:[RegisterClientModule]
})

export class ClientModule{}