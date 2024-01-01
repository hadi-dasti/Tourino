import { Module } from '@nestjs/common';
import { authAminModule } from './auth/auth.admin.module';

// Decorate the AdminModule class with the Module decorator
@Module({
  // Import the authAminModule into the AdminModule
  imports: [authAminModule],
})
export class AdminModule {}
