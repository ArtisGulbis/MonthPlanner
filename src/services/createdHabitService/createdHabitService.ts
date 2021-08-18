import {
  CreateUserHabitDocument,
  CreateUserHabitMutation,
  GetUserHabitsDocument,
  GetUserHabitsQuery,
} from '../../generated/graphql';
import { apolloClient } from '../../utils/graphql';

class CreatedHabitService {
  public async createUserHabit(
    username: string,
    habitName: string
  ): Promise<CreateUserHabitMutation | null> {
    const respnse = await apolloClient
      .mutate({
        mutation: CreateUserHabitDocument,
        variables: {
          username,
          habitName,
        },
      })
      .catch((err) => {
        throw err;
      });

    if (respnse && respnse.data) {
      return respnse.data;
    }

    return null;
  }

  public async getUserHabits(
    userId: string | undefined
  ): Promise<GetUserHabitsQuery | null> {
    const response = await apolloClient
      .query({
        query: GetUserHabitsDocument,
        variables: {
          userId,
        },
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

export default new CreatedHabitService();
