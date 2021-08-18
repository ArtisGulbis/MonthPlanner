import {
  AddHabitDocument,
  AddHabitMutation,
  AddHabitMutationVariables,
  DeleteHabitDocument,
  DeleteHabitMutation,
  UpdateHabitCompletionDocument,
  UpdateHabitCompletionMutation,
} from '../../generated/graphql';
import { apolloClient } from '../../utils/graphql';

class HabitService {
  public async addHabit(
    values: AddHabitMutationVariables
  ): Promise<AddHabitMutation | null> {
    const respnse = await apolloClient
      .mutate({
        mutation: AddHabitDocument,
        variables: {
          habitName: values.habitName,
          dayId: values.dayId,
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

  public async deleteHabit(
    habitId: string
  ): Promise<DeleteHabitMutation | null> {
    const respnse = await apolloClient
      .mutate({
        mutation: DeleteHabitDocument,
        variables: {
          habitId,
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

  public async updateHabitCompletion(
    value: boolean,
    habitId: string
  ): Promise<UpdateHabitCompletionMutation | null> {
    const response = await apolloClient
      .mutate({
        mutation: UpdateHabitCompletionDocument,
        variables: {
          value,
          habitId,
        },
      })
      .catch((err) => {
        throw err;
      });

    console.log(response);
    console.log(response.data);
    if (response && response.data) {
      return response.data;
    }
    return null;
  }
}

export default new HabitService();
