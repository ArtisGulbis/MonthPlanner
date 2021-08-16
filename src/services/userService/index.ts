import {
  GetMonthDocument,
  Month,
  RegisterDocument,
  User,
} from '../../generated/graphql';
import { apolloClient } from '../../utils/graphql';

class UserService {
  public async register(
    username: string,
    password: string
  ): Promise<User | null> {
    const response = await apolloClient
      .mutate({
        mutation: RegisterDocument,
        variables: { username, password },
      })
      .catch((err) => {
        throw err;
      });

    if (response && response.data) {
      return response.data;
    }

    return null;
  }

  public async getMonth(id: string): Promise<Month | null> {
    const response = await apolloClient
      .query({
        query: GetMonthDocument,
        variables: { id },
      })
      .catch((err) => {
        throw err;
      });

    if (response && response.data) {
      console.log(response.data);
    }
    return null;
  }
}

export default new UserService();
