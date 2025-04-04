import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Int64: { input: any; output: any; }
};

export type ChartData = {
  __typename?: 'ChartData';
  chartId: Scalars['String']['output'];
  data: Array<ChartPoint>;
};

export type ChartDataTimestamp = {
  __typename?: 'ChartDataTimestamp';
  chartData: Array<ChartData>;
  timestamp: Scalars['Int64']['output'];
};

export type ChartPoint = {
  __typename?: 'ChartPoint';
  timestamp: Scalars['String']['output'];
  values: Array<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateSettings?: Maybe<Settings>;
};


export type MutationUpdateSettingsArgs = {
  settings: SettingsInput;
};

export type Query = {
  __typename?: 'Query';
  getCharts?: Maybe<ChartDataTimestamp>;
  settings?: Maybe<Settings>;
};

export type Settings = {
  __typename?: 'Settings';
  NumPlotsPerChart: Scalars['Int']['output'];
  NumPoints: Scalars['Int']['output'];
};

export type SettingsInput = {
  NumPlotsPerChart?: InputMaybe<Scalars['Int']['input']>;
  NumPoints?: InputMaybe<Scalars['Int']['input']>;
};

export type GetSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSettingsQuery = { __typename?: 'Query', settings?: { __typename?: 'Settings', NumPlotsPerChart: number, NumPoints: number } | null };

export type UpdateSettingsMutationVariables = Exact<{
  settings: SettingsInput;
}>;


export type UpdateSettingsMutation = { __typename?: 'Mutation', updateSettings?: { __typename?: 'Settings', NumPlotsPerChart: number, NumPoints: number } | null };


export const GetSettingsDocument = gql`
    query GetSettings {
  settings {
    NumPlotsPerChart
    NumPoints
  }
}
    `;

/**
 * __useGetSettingsQuery__
 *
 * To run a query within a React component, call `useGetSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSettingsQuery(baseOptions?: Apollo.QueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options);
      }
export function useGetSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options);
        }
export function useGetSettingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSettingsQuery, GetSettingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSettingsQuery, GetSettingsQueryVariables>(GetSettingsDocument, options);
        }
export type GetSettingsQueryHookResult = ReturnType<typeof useGetSettingsQuery>;
export type GetSettingsLazyQueryHookResult = ReturnType<typeof useGetSettingsLazyQuery>;
export type GetSettingsSuspenseQueryHookResult = ReturnType<typeof useGetSettingsSuspenseQuery>;
export type GetSettingsQueryResult = Apollo.QueryResult<GetSettingsQuery, GetSettingsQueryVariables>;
export const UpdateSettingsDocument = gql`
    mutation UpdateSettings($settings: SettingsInput!) {
  updateSettings(settings: $settings) {
    NumPlotsPerChart
    NumPoints
  }
}
    `;
export type UpdateSettingsMutationFn = Apollo.MutationFunction<UpdateSettingsMutation, UpdateSettingsMutationVariables>;

/**
 * __useUpdateSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSettingsMutation, { data, loading, error }] = useUpdateSettingsMutation({
 *   variables: {
 *      settings: // value for 'settings'
 *   },
 * });
 */
export function useUpdateSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSettingsMutation, UpdateSettingsMutationVariables>(UpdateSettingsDocument, options);
      }
export type UpdateSettingsMutationHookResult = ReturnType<typeof useUpdateSettingsMutation>;
export type UpdateSettingsMutationResult = Apollo.MutationResult<UpdateSettingsMutation>;
export type UpdateSettingsMutationOptions = Apollo.BaseMutationOptions<UpdateSettingsMutation, UpdateSettingsMutationVariables>;