import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Day = {
  __typename?: 'Day';
  id: Scalars['String'];
  dayNumber: Scalars['Float'];
  weekday: Scalars['String'];
  passed: Scalars['Boolean'];
  habits?: Maybe<Array<Habit>>;
  month: Month;
};

export type Habit = {
  __typename?: 'Habit';
  id: Scalars['String'];
  habitName: Scalars['String'];
  completed: Scalars['Boolean'];
  missed: Scalars['Boolean'];
  day: Day;
};

export type Month = {
  __typename?: 'Month';
  id: Scalars['String'];
  name: Scalars['String'];
  user: User;
  days: Array<Day>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewMonth: Month;
  login: User;
  register: User;
  addHabit: Habit;
  deleteHabit: Habit;
  editHabitText: Scalars['Boolean'];
  updateHabitCompletion: Scalars['Boolean'];
  updateHabitMissed: Scalars['Boolean'];
};

export type MutationAddNewMonthArgs = {
  newMonthData: NewMonthInput;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};

export type MutationAddHabitArgs = {
  newHabitInput: NewHabitInput;
};

export type MutationDeleteHabitArgs = {
  habitId: Scalars['String'];
};

export type MutationEditHabitTextArgs = {
  newText: Scalars['String'];
  habitId: Scalars['String'];
};

export type MutationUpdateHabitCompletionArgs = {
  value: Scalars['Boolean'];
  habitId: Scalars['String'];
};

export type MutationUpdateHabitMissedArgs = {
  value: Scalars['Boolean'];
  habitId: Scalars['String'];
};

export type NewHabitInput = {
  habitName: Scalars['String'];
  dayId: Scalars['String'];
};

export type NewMonthInput = {
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMonths: Array<Month>;
  getMonth: Month;
  getUsers: Array<User>;
  getUser: User;
  month: Month;
  getDay: Day;
};

export type QueryGetMonthArgs = {
  id: Scalars['String'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type QueryMonthArgs = {
  monthId: Scalars['String'];
};

export type QueryGetDayArgs = {
  dayId: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  month: Month;
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'User';
    username: string;
    id: string;
    month: {
      __typename?: 'Month';
      id: string;
      name: string;
      days: Array<{
        __typename?: 'Day';
        dayNumber: number;
        weekday: string;
        id: string;
      }>;
    };
  };
};

export type GetMonthQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type GetMonthQuery = {
  __typename?: 'Query';
  getMonth: {
    __typename?: 'Month';
    id: string;
    name: string;
    days: Array<{
      __typename?: 'Day';
      id: string;
      dayNumber: number;
      weekday: string;
      habits?: Maybe<
        Array<{
          __typename?: 'Habit';
          id: string;
          habitName: string;
          completed: boolean;
          missed: boolean;
        }>
      >;
    }>;
  };
};

export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(registerInput: { username: $username, password: $password }) {
      username
      id
      month {
        id
        name
        days {
          dayNumber
          weekday
          id
        }
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const GetMonthDocument = gql`
  query GetMonth($id: String!) {
    getMonth(id: $id) {
      id
      name
      days {
        id
        dayNumber
        weekday
        habits {
          id
          habitName
          completed
          missed
        }
      }
    }
  }
`;

/**
 * __useGetMonthQuery__
 *
 * To run a query within a React component, call `useGetMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMonthQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMonthQuery(
  baseOptions: Apollo.QueryHookOptions<GetMonthQuery, GetMonthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMonthQuery, GetMonthQueryVariables>(
    GetMonthDocument,
    options
  );
}
export function useGetMonthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMonthQuery,
    GetMonthQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMonthQuery, GetMonthQueryVariables>(
    GetMonthDocument,
    options
  );
}
export type GetMonthQueryHookResult = ReturnType<typeof useGetMonthQuery>;
export type GetMonthLazyQueryHookResult = ReturnType<
  typeof useGetMonthLazyQuery
>;
export type GetMonthQueryResult = Apollo.QueryResult<
  GetMonthQuery,
  GetMonthQueryVariables
>;
