import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { tokenApi } from '~/query/create-api.ts';

import { transformErrorResponse } from '../errors/transformErrors';
import { OptionType } from '../types';
import { measureUnit } from './measureUnits.api.types';

export const measureUnitsApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.MEASURE_UNITS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getAllMeasureUnits: builder.query<OptionType[], void>({
                query: () => ({
                    url: `${ApiEndpoints.MEASURE_UNITS}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.MEASURE_UNITS,
                    name: EndpointNames.GET_MEASURE_UNITS,
                    credentials: 'include',
                }),
                transformResponse: (response: measureUnit[]) =>
                    response.map((unit) => ({
                        id: unit.name,
                        label: unit.name,
                    })),
                transformErrorResponse: transformErrorResponse,
            }),
        }),
    });

export const { useGetAllMeasureUnitsQuery } = measureUnitsApiSlice;
