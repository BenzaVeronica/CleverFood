import { ModalExitSave } from './ModalExitSave';

type Props = {
    onSaveDraft: () => void;
    resetForm: () => void;
    onConfirmNavigation: () => void;
    isOpen: boolean;
    onClose: () => void;
};

export function ModalExitSaveNavBlock({
    onSaveDraft,
    resetForm,
    onConfirmNavigation,
    isOpen,
    onClose,
}: Props) {
    const handleSaveDraft = async () => {
        try {
            await onSaveDraft();
            onConfirmNavigation();
        } catch (error) {
            console.log(error);

            onClose();
        }
    };

    const handleDiscardChanges = () => {
        resetForm();
        onConfirmNavigation();
    };

    return (
        <ModalExitSave
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={handleSaveDraft}
            onCancel={handleDiscardChanges}
        />
    );
}
