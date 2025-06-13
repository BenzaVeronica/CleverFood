import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useUploadFileMutation } from '~/query/file/file.api';
import { TEST_ID } from '~/test/test.constant';

import CustomModal from '../UI/CustomModal';
import { ImageBox } from '../UI/ImageBox/ImageBox';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (image: string, field: string) => void;
    uploadFor: string | null;
    currentImage?: string;
    dataTestId?: string;
    isEditCrop?: boolean;
};

export function ModalImageUploader({
    isOpen,
    onClose,
    onSuccess,
    uploadFor,
    dataTestId,
    currentImage,
    isEditCrop = false,
}: Props) {
    const [tempImage, setTempImage] = useState<string | null>(currentImage || null);
    useEffect(() => {
        if (isOpen) {
            setTempImage(currentImage || null);
            setSelectedFile(null);
        }
    }, [isOpen, currentImage]);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [uploadFile, { isLoading }] = useUploadFileMutation();

    const handleUpload = async () => {
        // console.log('handleUpload');
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
            const response = await uploadFile(formData).unwrap();
            // console.log('Файл загружен:', response);
            // console.log(uploadFor);
            if (uploadFor) {
                onSuccess(response.url, uploadFor);
            }
            handleClose();
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setTempImage(reader.result as string);
            setSelectedFile(file);
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        setTempImage(null);
        setSelectedFile(null);
        onClose();
    };

    const handleRemove = () => {
        setTempImage(null);
        setSelectedFile(null);
        if (uploadFor) {
            onSuccess('', uploadFor);
        }
        onClose();
    };

    const titleObj = isEditCrop
        ? {
              title: 'Изменить\n изображение профиля',
              btn: 'Кадрировать и сохранить',
          }
        : {
              title: 'Изображение',
              btn: 'Сохранить',
          };

    return (
        <CustomModal
            dataTestId={TEST_ID.Modal.RecipeImageModal}
            isOpen={isOpen}
            onClose={handleClose}
        >
            <VStack spacing={8}>
                <Text fontSize='2xl' fontWeight='700' textAlign='center'>
                    {titleObj.title}
                </Text>

                <Box h='206px' w='206px'>
                    <ImageBox
                        // dataTestId={TEST_ID.Modal.RecipeImageModal}
                        dataTestIdPreview={TEST_ID.Modal.RecipeImageModalPreviewImage}
                        image={tempImage}
                        onClick={() => document.getElementById('image-upload')?.click()}
                        isEditCrop
                    />

                    <Input
                        data-test-id={dataTestId}
                        type='file'
                        accept='image/*'
                        onChange={handleFileChange}
                        display='none'
                        id='image-upload'
                    />
                </Box>
                {tempImage && (
                    <VStack w='full'>
                        <Button
                            variant='btnMain'
                            onClick={handleUpload}
                            disabled={isLoading}
                            w='full'
                        >
                            {titleObj.btn}
                        </Button>
                        {!isEditCrop && (
                            <Button
                                onClick={handleRemove}
                                bg='transparent'
                                size='lg'
                                fontWeight={600}
                                w='full'
                            >
                                Удалить
                            </Button>
                        )}
                    </VStack>
                )}
            </VStack>
        </CustomModal>
    );
}
