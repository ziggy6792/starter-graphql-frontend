import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: Date;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** Timecode scalar type */
  Timecode: any;
};

export type Clip = {
  __typename?: 'Clip';
  createdAt: Scalars['DateTime'];
  definition: Definition;
  description: Scalars['String'];
  endTimecode: Scalars['Timecode'];
  id: Scalars['ObjectId'];
  name: Scalars['String'];
  standard: Standard;
  startTimecode: Scalars['Timecode'];
  updatedAt: Scalars['DateTime'];
};

export type ClipList = {
  __typename?: 'ClipList';
  items: Array<Clip>;
  nextCursor?: Maybe<Scalars['String']>;
  prevCursor?: Maybe<Scalars['String']>;
  totalCount: Scalars['Float'];
};

export type ClipTimeline = {
  __typename?: 'ClipTimeline';
  endTimecode: Scalars['Timecode'];
  items: Array<ClipTimelineItem>;
};

export type ClipTimelineItem = {
  __typename?: 'ClipTimelineItem';
  clip: Clip;
  endTimecode: Scalars['Timecode'];
  startTimecode: Scalars['Timecode'];
};

export enum Definition {
  Hd = 'HD',
  Sd = 'SD'
}

export type ListClipsFilter = {
  definition?: Maybe<Definition>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  standard?: Maybe<Standard>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateReel: Reel;
};


export type MutationUpdateReelArgs = {
  input: UpdateReelInput;
};

export type Query = {
  __typename?: 'Query';
  getReel: Reel;
  listClips: ClipList;
  listReels: Array<Reel>;
};


export type QueryGetReelArgs = {
  id?: Maybe<Scalars['ObjectId']>;
};


export type QueryListClipsArgs = {
  filter?: Maybe<ListClipsFilter>;
  limit?: Maybe<Scalars['Float']>;
  nextCursor?: Maybe<Scalars['String']>;
};


export type QueryListReelsArgs = {
  limit?: Maybe<Scalars['Float']>;
};

export type Reel = {
  __typename?: 'Reel';
  clips: Array<Scalars['ObjectId']>;
  createdAt: Scalars['DateTime'];
  definition: Definition;
  description: Scalars['String'];
  fps: Scalars['Float'];
  id: Scalars['ObjectId'];
  name: Scalars['String'];
  standard: Standard;
  timelineClips: ClipTimeline;
  updatedAt: Scalars['DateTime'];
};

export enum Standard {
  Ntsc = 'NTSC',
  Pal = 'PAL'
}

export type UpdateReelInput = {
  clips?: Maybe<Array<Scalars['ObjectId']>>;
  definition?: Maybe<Definition>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  name?: Maybe<Scalars['String']>;
  standard?: Maybe<Standard>;
};

export type ListClipsQueryVariables = Exact<{
  filter?: Maybe<ListClipsFilter>;
}>;


export type ListClipsQuery = { __typename?: 'Query', listClips: { __typename?: 'ClipList', items: Array<{ __typename?: 'Clip', id: any, name: string, description: string, startTimecode: any, endTimecode: any, standard: Standard, definition: Definition }> } };

export type ClipTileFragment = { __typename?: 'Clip', id: any, name: string, description: string, startTimecode: any, endTimecode: any, standard: Standard, definition: Definition };

export type GetReelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReelQuery = { __typename?: 'Query', getReel: { __typename?: 'Reel', id: any, name: string, description: string, standard: Standard, definition: Definition, timelineClips: { __typename?: 'ClipTimeline', endTimecode: any, items: Array<{ __typename?: 'ClipTimelineItem', startTimecode: any, endTimecode: any, clip: { __typename?: 'Clip', id: any, name: string, description: string, startTimecode: any, endTimecode: any, standard: Standard, definition: Definition } }> } } };

export type ReelSummaryFragment = { __typename?: 'Reel', id: any, name: string, description: string, standard: Standard, definition: Definition };

export type ReelDetailsFragment = { __typename?: 'Reel', id: any, name: string, description: string, standard: Standard, definition: Definition, timelineClips: { __typename?: 'ClipTimeline', endTimecode: any, items: Array<{ __typename?: 'ClipTimelineItem', startTimecode: any, endTimecode: any, clip: { __typename?: 'Clip', id: any, name: string, description: string, startTimecode: any, endTimecode: any, standard: Standard, definition: Definition } }> } };

export type UpdateReelMutationVariables = Exact<{
  input: UpdateReelInput;
}>;


export type UpdateReelMutation = { __typename?: 'Mutation', updateReel: { __typename?: 'Reel', id: any, name: string, description: string, standard: Standard, definition: Definition } };

export const ReelSummaryFragmentDoc = gql`
    fragment ReelSummary on Reel {
  id
  name
  description
  standard
  definition
}
    `;
export const ClipTileFragmentDoc = gql`
    fragment ClipTile on Clip {
  id
  name
  description
  startTimecode
  endTimecode
  standard
  definition
}
    `;
export const ReelDetailsFragmentDoc = gql`
    fragment ReelDetails on Reel {
  ...ReelSummary
  timelineClips {
    endTimecode
    items {
      startTimecode
      endTimecode
      clip {
        ...ClipTile
      }
    }
  }
}
    ${ReelSummaryFragmentDoc}
${ClipTileFragmentDoc}`;
export const ListClipsDocument = gql`
    query listClips($filter: ListClipsFilter) {
  listClips(filter: $filter) {
    items {
      ...ClipTile
    }
  }
}
    ${ClipTileFragmentDoc}`;

/**
 * __useListClipsQuery__
 *
 * To run a query within a React component, call `useListClipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListClipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListClipsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useListClipsQuery(baseOptions?: Apollo.QueryHookOptions<ListClipsQuery, ListClipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListClipsQuery, ListClipsQueryVariables>(ListClipsDocument, options);
      }
export function useListClipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListClipsQuery, ListClipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListClipsQuery, ListClipsQueryVariables>(ListClipsDocument, options);
        }
export type ListClipsQueryHookResult = ReturnType<typeof useListClipsQuery>;
export type ListClipsLazyQueryHookResult = ReturnType<typeof useListClipsLazyQuery>;
export type ListClipsQueryResult = ApolloReactCommon.QueryResult<ListClipsQuery, ListClipsQueryVariables>;
export const GetReelDocument = gql`
    query getReel {
  getReel {
    ...ReelDetails
  }
}
    ${ReelDetailsFragmentDoc}`;

/**
 * __useGetReelQuery__
 *
 * To run a query within a React component, call `useGetReelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReelQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReelQuery(baseOptions?: Apollo.QueryHookOptions<GetReelQuery, GetReelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReelQuery, GetReelQueryVariables>(GetReelDocument, options);
      }
export function useGetReelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReelQuery, GetReelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReelQuery, GetReelQueryVariables>(GetReelDocument, options);
        }
export type GetReelQueryHookResult = ReturnType<typeof useGetReelQuery>;
export type GetReelLazyQueryHookResult = ReturnType<typeof useGetReelLazyQuery>;
export type GetReelQueryResult = ApolloReactCommon.QueryResult<GetReelQuery, GetReelQueryVariables>;
export const UpdateReelDocument = gql`
    mutation updateReel($input: UpdateReelInput!) {
  updateReel(input: $input) {
    ...ReelSummary
  }
}
    ${ReelSummaryFragmentDoc}`;
export type UpdateReelMutationFn = ApolloReactCommon.MutationFunction<UpdateReelMutation, UpdateReelMutationVariables>;

/**
 * __useUpdateReelMutation__
 *
 * To run a mutation, you first call `useUpdateReelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReelMutation, { data, loading, error }] = useUpdateReelMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateReelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReelMutation, UpdateReelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReelMutation, UpdateReelMutationVariables>(UpdateReelDocument, options);
      }
export type UpdateReelMutationHookResult = ReturnType<typeof useUpdateReelMutation>;
export type UpdateReelMutationResult = ApolloReactCommon.MutationResult<UpdateReelMutation>;
export type UpdateReelMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateReelMutation, UpdateReelMutationVariables>;