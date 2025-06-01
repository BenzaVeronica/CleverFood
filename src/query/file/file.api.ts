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
                // queryFn: async () => {
                //     await new Promise(resolve => setTimeout(resolve, 200));

                //     return {
                //         data: {
                //             name: "bd9e706e-6d6a-4123-9641-7ea69f7b5c53.jpg",
                //             url: "/media/images/bd9e706e-6d6a-4123-9641-7ea69f7b5c53.jpg",
                //             _id: "68323b06b7cf34db7212e244"
                //         }
                //     };
                // },
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
