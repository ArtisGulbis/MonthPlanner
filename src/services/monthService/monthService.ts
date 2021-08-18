import { GetMonthDocument, GetMonthQuery } from '../../generated/graphql';
import { apolloClient } from '../../utils/graphql';

class MonthService {
  public async getMonth(id: string): Promise<GetMonthQuery | null> {
    const response = await apolloClient
      .query({
        query: GetMonthDocument,
        variables: { id },
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

export default new MonthService();
