import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import { TEST_ID } from '~/test/test.constant';

import CustomModal from '../UI/CustomModal';
import ImageBox from '../UI/ImageBox';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSuccessCrop: (file: Blob) => void;
    currentImage?: string;
    dataTestId?: string;
};

export function ModalImageCanvaUploader({
    isOpen,
    onClose,
    currentImage,
    onSuccessCrop,
    dataTestId,
}: Props) {
    const [tempImage, setTempImage] = useState<string | null>(currentImage || null);
    useEffect(() => {
        if (isOpen) {
            setTempImage(currentImage || null);
        }
    }, [isOpen, currentImage]);

    const handleClose = () => {
        setTempImage(null);
        onClose();
    };

    const titleObj = {
        title: 'Изменить\n изображение профиля',
        btn: 'Кадрировать и сохранить',
    };

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropCompleteCallback = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.src = url;
        });

    const getCroppedImg = async (tempImage: string): Promise<Blob> => {
        const image = await createImage(tempImage);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx || !croppedAreaPixels) {
            throw new Error('Could not create canvas context');
        }

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) throw new Error('Canvas is empty');
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const handleSave = async () => {
        if (!tempImage) return;
        const croppedImage = await getCroppedImg(tempImage);
        onSuccessCrop(croppedImage);
        handleClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setTempImage(reader.result as string);
            reader.readAsDataURL(file);
        }
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
                    {tempImage ? (
                        <Box position='relative' w='full' h='full' overflow='hidden'>
                            <Cropper
                                image={tempImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                onCropChange={setCrop}
                                onCropComplete={onCropCompleteCallback}
                                onZoomChange={setZoom}
                                cropSize={{ width: 200, height: 200 }}
                                showGrid={false}
                                cropShape='round'
                                style={{
                                    cropAreaStyle: {
                                        border: 'none',
                                        color: 'rgba(45, 177, 0, 0.50)',
                                    },
                                }}
                            />
                        </Box>
                    ) : (
                        <>
                            <ImageBox
                                dataTestIdPreview={TEST_ID.Modal.RecipeImageModalPreviewImage}
                                image={tempImage}
                                onClick={() => document.getElementById('image-upload')?.click()}
                            />
                            <Input
                                data-test-id={dataTestId}
                                type='file'
                                accept='image/*'
                                onChange={handleFileChange}
                                display='none'
                                id='image-upload'
                            />
                        </>
                    )}
                </Box>
                {tempImage && (
                    <VStack w='full'>
                        <Button variant='btnMain' onClick={handleSave} w='full'>
                            {titleObj.btn}
                        </Button>
                        {/* <Button
                                onClick={handleClose}
                                bg='transparent'
                                size='lg'
                                fontWeight={600}
                                w='full'
                            >
                                Удалить
                            </Button> */}
                    </VStack>
                )}
            </VStack>
        </CustomModal>
    );
}
