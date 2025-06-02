import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { tokenApi } from '~/query/create-api.ts';

import { transformErrorResponse } from '../errors/transformErrors';
import { File } from './file.api.types';

export const measureUnitsApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.FILE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            uploadFile: builder.mutation<File, FormData>({
                query: (formData) => ({
                    url: `${ApiEndpoints.FILE_UPLOAD}`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.FILE,
                    name: EndpointNames.UPLOAD_FILE,
                    body: formData,
                }),
                transformErrorResponse: transformErrorResponse,
            }),
        }),
    });
export const { useUploadFileMutation } = measureUnitsApiSlice;
