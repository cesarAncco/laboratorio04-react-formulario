import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Define el esquema de validación usando yup
const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  lastname: yup.string().required('El nombre es requerido'),
  email: yup.string().email('El correo no es válido').required('El correo es requerido'),
  number: yup.string().max(9, 'El numero solo puede ser de 9 digitos').required('El celular es requerido'),
  message: yup.string().required('El mensaje es requerido').min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

const Formulario = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    reset();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nombre</label>
        <input id="name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="lastname">Apellido</label>
        <input id="lastname" {...register('lastname')} />
        {errors.lastname && <p>{errors.lastname.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Correo Electrónico</label>
        <input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="number">Celular</label>
        <input type="number" id="number" {...register('number')} />
        {errors.number && <p>{errors.number.message}</p>}
      </div>

      <div>
        <label htmlFor="message">Mensaje</label>
        <textarea id="message" {...register('message')} />
        {errors.message && <p>{errors.message.message}</p>}
      </div>

      <button type="submit">Enviar</button>
      <button type="button" onClick={handleReset}>Limpiar</button>
    </form>
  );
};

export default Formulario;
