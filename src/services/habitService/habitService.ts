import {
  AddHabitDocument,
  AddHabitMutation,
  AddHabitMutationVariables,
  DeleteHabitDocument,
  DeleteHabitMutation,
  DeleteHabitsDocument,
  DeleteHabitsMutation,
  DeleteHabitsMutationVariables,
  EditHabitTextDocument,
  EditHabitTextMutation,
  EditHabitTextMutationVariables,
  GetUserHabitsDocument,
  GetUserHabitsQuery,
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
          userId: values.userId,
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

    if (response && response.data) {
      return response.data;
    }
    return null;
  }

  public async getHabits(userId: string): Promise<GetUserHabitsQuery | null> {
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

  public async updateHabitName(
    values: EditHabitTextMutationVariables
  ): Promise<EditHabitTextMutation | null> {
    const response = await apolloClient
      .mutate({
        mutation: EditHabitTextDocument,
        variables: {
          userId: values.userId,
          newText: values.newText,
          habitName: values.habitName,
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

  public async deleteHabits(
    values: DeleteHabitsMutationVariables
  ): Promise<DeleteHabitsMutation | null> {
    const response = await apolloClient
      .mutate({
        mutation: DeleteHabitsDocument,
        variables: {
          userId: values.userId,
          habitName: values.habitName,
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

export default new HabitService();
