import React from 'react';
import App from '../App'
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';

test('should create', () => {
  render(<App />)

  expect( screen.getByText('Administrador de Pacientes')).toBeInTheDocument()
  expect( screen.getByTestId('nombre-app').textContent).toBe('Administrador de Pacientes')
  expect( screen.getByTestId('nombre-app').tagName).toBe('H1')

  expect( screen.getByText('Crear Cita')).toBeInTheDocument()

})


test('Crear cita', () => {
  render(<App />)

  userEvent.type(screen.getByTestId('mascota'), 'Hook')
  userEvent.type(screen.getByTestId('propietario'), 'Emma')
  userEvent.type(screen.getByTestId('fecha'), '2022-09-10')
  userEvent.type(screen.getByTestId('hora'), '10:30')
  userEvent.type(screen.getByTestId('sintomas'), 'Solo duerme')

  const btnSubmit = screen.getByTestId('btn-submit')
  userEvent.click(btnSubmit)
  expect(screen.queryByTestId('alerta')).not.toBeInTheDocument()

  // Revisar por titulo
  expect(screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas')
  expect(screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas')
})

test('Verificar las citas en el dom', async () => {
  render(<App />)

  const citas = await screen.findAllByTestId('cita')

  // Para ver un estado del programa en un archivo para ver su contenido
  // expect(citas).toMatchSnapshot()

  expect(screen.getByText('Hook')).toBeInTheDocument()
})

test('Elimina la cita', async () => {
  render(<App />)

  const btnEliminar = screen.getByTestId('btn-eliminar')
  expect(btnEliminar).toBeInTheDocument()

  userEvent.click(btnEliminar)

  expect(btnEliminar).not.toBeInTheDocument()
  expect(screen.queryByTestId('cita')).not.toBeInTheDocument()
})