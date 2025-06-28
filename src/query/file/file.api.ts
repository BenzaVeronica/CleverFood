import { ApiGroups } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { EndpointUrl } from '~/query/constants/enpoint-url';
import { tokenApi } from '~/query/create-api.ts';

import { ApiMethods } from '../constants/api-methods';
import { transformErrorResponse } from '../errors/transformErrors';
import { File } from './file.api.types';

export const measureUnitsApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [ApiGroups.FILE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            [EndpointNames.UPLOAD_FILE]: builder.mutation<File, FormData>({
                query: (formData) => ({
                    apiGroupName: ApiGroups.FILE,
                    name: EndpointNames.UPLOAD_FILE,
                    url: `${EndpointUrl.FILE_UPLOAD}`,
                    method: ApiMethods.POST,
                    body: formData,
                }),
                transformErrorResponse: transformErrorResponse,
            }),
        }),
    });
export const { useUploadFileMutation } = measureUnitsApiSlice;
