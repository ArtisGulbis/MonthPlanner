import { RegisterDocument, RegisterMutation } from '../../generated/graphql';
import { apolloClient } from '../../utils/graphql';

class UserService {
  public async register(
    username: string,
    password: string
  ): Promise<RegisterMutation | null> {
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
}

export default new UserService();
