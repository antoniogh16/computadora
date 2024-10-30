import React from 'react';
import { useParams } from 'react-router-dom';
import FormMarca from '../../Components/FormMarca'; 

const Edit = () => {
  const { id } = useParams();

  return (
    <FormMarca id={id} title='Edit Marca' /> 
  );
}

export default Edit;
