import * as yup from 'yup';

export const formSchema = yup.object().shape({
  name: yup.string().min(3, 'El nombre debe tener un mínimo de 3 caracteres.').required('Debes introducir tu nombre.'),
  email: yup.string().email('Correo ingresado invalido. El correo debe tener formato ejemplo@example y sin espacios.').required('Necesitas ingresar un correo para registrarte.'),
  password: yup.string().min(6, 'Contraseña invalida, debe ser de minimo 6 caracteres.').required('La contraseña es obligatoria.'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las constraseñas deben se iguales.')
    .required('Es obligatorio confirmar la contraseña.'),
});

export type FormData = yup.InferType<typeof formSchema>;