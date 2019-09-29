import { Injectable } from '@nestjs/common';
import { ManagementClient, UpdateUserData } from 'auth0';

@Injectable()
export class AuthManagementApi {
  private client: ManagementClient;

  constructor() {
    this.client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN,
      clientId: process.env.SYNC_USER_CLIENT_ID,
      clientSecret: process.env.SYNC_USER_CLIENT_SECRET,
      scope: 'read:users update:users',
    });
  }

  async updateUser(params: { id: string }, data: UpdateUserData) {
    return await this.client.updateUser(params, data);
  }
}
