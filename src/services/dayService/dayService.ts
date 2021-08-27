import {
  SetDayPassedDocument,
  SetDayPassedMutation,
  SetDayPassedMutationVariables,
} from '../../generated/graphql';
import { apolloClient } from '../../utils/graphql';

class DayService {
  public async setDayPassed(
    dayIds: SetDayPassedMutationVariables
  ): Promise<SetDayPassedMutation | null> {
    const response = await apolloClient
      .mutate({
        mutation: SetDayPassedDocument,
        variables: dayIds,
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

export default new DayService();
