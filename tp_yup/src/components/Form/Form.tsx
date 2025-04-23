import React, { useState } from 'react';
import { formSchema, FormData } from '../../schemas/formSchema';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Swal from 'sweetalert2';
import styles from './Form.module.css';
import * as yup from 'yup';

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData(prev => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };
  
      formSchema
        .validateAt(name, updatedForm)
        .then(() => {
          setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name as keyof FormData];
            return newErrors;
          });
        })
        .catch((error: unknown) => {
          if (error instanceof yup.ValidationError) {
            setErrors(prevErrors => ({
              ...prevErrors,
              [name]: error.message,
            }));
          }
        });
  
      return updatedForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await formSchema.validate(formData, { abortEarly: false });
      
      await Swal.fire({
        title: 'Éxito',
        text: 'Formulario enviado correctamente',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Partial<FormData> = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path as keyof FormData] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Formulario sobre manejo de errores</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Nombre:"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Correo:"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Contraseña:"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="Confirmar contraseña:"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />
        <Button type="submit" disabled={hasErrors}>
          Confirmar y enviar
        </Button>
      </form>
    </div>
  );
};

export default Form;