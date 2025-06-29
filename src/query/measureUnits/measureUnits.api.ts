import { ApiGroups } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { EndpointUrl } from '~/query/constants/enpoint-url';
import { tokenApi } from '~/query/create-api.ts';

import { ApiMethods } from '../constants/api-methods';
import { transformErrorResponse } from '../errors/transformErrors';
import { OptionType } from '../types';
import { measureUnit } from './measureUnits.api.types';

export const measureUnitsApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [ApiGroups.MEASURE_UNITS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.GET_MEASURE_UNITS]: builder.query<OptionType[], void>({
                query: () => ({
                    apiGroupName: ApiGroups.MEASURE_UNITS,
                    name: EndpointNames.GET_MEASURE_UNITS,
                    url: `${EndpointUrl.MEASURE_UNITS}`,
                    method: ApiMethods.GET,
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
