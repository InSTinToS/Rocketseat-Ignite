import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const formValidations = {
    image: {
      required: 'Arquivo obrigatório',
      validate: {
        lessThan10MB: value =>
          value.size > 10 || 'O arquivo deve ser menor que 10MB',
        acceptedFormats: (value: string) =>
          value.match(/(png|jpeg|gif)$/) ||
          'Somente são aceitos arquivos PNG, JPEG e GIF',
      },
    },
    title: {
      required: 'Título obrigatório',
      minLength: {
        value: 2,
        message: 'Mínimo de 2 caracteres.',
      },
      maxLength: {
        value: 20,
        message: 'Mínimo de 20 caracteres.',
      },
    },
    description: {
      required: 'Descrição obrigatória',
      maxLength: {
        value: 65,
        message: ' Máximo de 65 caracteres.',
      },
    },
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(data => api.post('/api/images', data), {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      if (!data) toast({ title: 'Error' });

      await mutation.mutateAsync(data as any);

      toast({
        title: 'Imagem não adicionada',
        description:
          'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
      });
    } catch {
      toast({ title: 'Error' });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          error={errors?.image as any}
          {...register('image', formValidations.image)}
        />

        <TextInput
          placeholder="Título da imagem..."
          error={errors?.title as any}
          {...register('title', formValidations.title)}
        />

        <TextInput
          error={errors?.description as any}
          placeholder="Descrição da imagem..."
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
