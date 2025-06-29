import { tokenApi } from '~/query/create-api.ts';

import { ApiGroups } from '../constants/api-group-names';
import { ApiMethods } from '../constants/api-methods';
import { EndpointNames } from '../constants/endpoint-names';
import { EndpointUrl } from '../constants/enpoint-url';
import { transformErrorResponse } from '../errors/transformErrors';
import { Statistic } from './statistic.types';

export const statisticApi = tokenApi
    .enhanceEndpoints({
        addTagTypes: [ApiGroups.STATISTIC],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.GET_STATISTIC]: builder.query<Statistic, void>({
                query: () => ({
                    apiGroupName: ApiGroups.USERS,
                    name: EndpointNames.GET_STATISTIC,
                    url: EndpointUrl.STATISTIC,
                    method: ApiMethods.GET,
                }),
                transformErrorResponse,
            }),
        }),
    });

export const { useGetStatisticQuery } = statisticApi;
