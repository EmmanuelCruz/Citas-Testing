import React from 'react';
import Formulario from '../components/Formulario'
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn()

afterEach( cleanup )

test('<Formulario /> Verificar que todo sea correcto', () => {
  // const wrapper = render(<Formulario />)
  
  render(<Formulario crearCita={crearCita}/>)

  // Heading
  expect( screen.getByText('Crear Cita') ).toBeInTheDocument( )
  expect( screen.getByTestId('titulo').tagName).toBe('H2')
  expect( screen.getByTestId('titulo').textContent).toBe('Crear Cita')

  expect( screen.getByTestId('btn-submit').tagName ).toBe('BUTTON')
})

test('validacion de formulario', () => {
  render(<Formulario crearCita={crearCita}/>)

  const btnSubmit = screen.getByTestId('btn-submit')
  fireEvent.click(btnSubmit)

  expect(screen.getByTestId('alerta').textContent).toBe('Todos los campos son obligatorios')
  expect(screen.getByText('Todos los campos son obligatorios')).toBeInTheDocument()
})

// Prueba para llenar un formulario
test('validacion de formulario', () => {
  render(<Formulario crearCita={crearCita}/>)

  fireEvent.change(screen.getByTestId('mascota'), {
    target: { value: 'Hook'}
  })

  fireEvent.change(screen.getByTestId('propietario'), {
    target: { value: 'Emmanuel'}
  })

  const btnSubmit = screen.getByTestId('btn-submit')
  fireEvent.click(btnSubmit)

})

// Prueba para llenar un formulario con userEvent
test('validacion de formulario con user Event', () => {
  render(<Formulario crearCita={crearCita}/>)

  userEvent.type(screen.getByTestId('mascota'), 'Hook')
  userEvent.type(screen.getByTestId('propietario'), 'Emma')
  userEvent.type(screen.getByTestId('fecha'), '2022-09-10')
  userEvent.type(screen.getByTestId('hora'), '10:30')
  userEvent.type(screen.getByTestId('sintomas'), 'Solo duerme')

  const btnSubmit = screen.getByTestId('btn-submit')
  userEvent.click(btnSubmit)
  expect(screen.queryByTestId('alerta')).not.toBeInTheDocument()

  // Crear cita y comprobar
  expect(crearCita).toHaveBeenCalled()
  expect(crearCita).toHaveBeenCalledTimes(1)

})