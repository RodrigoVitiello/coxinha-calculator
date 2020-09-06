import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import NumberInput from './NumberInput'

describe('NumberInput', () => {
  const handleOnChangeMock = jest.fn()
  const defaultValue: number = Math.floor(Math.random() * 100)
  const component = (
    <NumberInput
      defaultValue={defaultValue}
      labelText='my input'
      handleOnChange={handleOnChangeMock}
    />
  )
  const inputQuery: string = '.number-input-container input'

  xit('renders number input component', () => {
    const { container } = render(component);

    expect(container).toMatchSnapshot();
  });

  it('renders the default values correctly', () => {
    const { container } = render(component)
    const label = container.querySelector('.number-input-container label')
    const input = container.querySelector(inputQuery)

    expect(label).toHaveTextContent('my input')
    expect(input).toHaveValue(String(defaultValue))
  })

  describe('changing the field value', () => {
    const newInputValue: string = String(Math.floor(Math.random() * 100))

    it('triggers callback on input change', async () => {
      const { container } = render(component)
      const input = container.querySelector(inputQuery)

      await fireEvent.change(input, { target: { value: newInputValue } })

      expect(handleOnChangeMock.mock.calls.length).toBe(1)
    })

    it('triggers callback with the new value converted to type number', async () => {
      const { container } = render(component)
      const input = container.querySelector(inputQuery)
      const expectedValue: number = Number(newInputValue)
      await fireEvent.change(input, { target: { value: newInputValue } })

      expect(handleOnChangeMock.mock.calls[0][0]).toBe(expectedValue)
    })

    it('updates the input value', () => {
      const { container } = render(component)
      const input = container.querySelector(inputQuery)

      fireEvent.change(input, { target: { value: newInputValue } })

      expect(input).toHaveValue(newInputValue)
    })

    it('does not accept invalid characters and keep the previous value', () => {
      const { container } = render(component)
      const input = container.querySelector(inputQuery)

      expect(input).toHaveValue(String(defaultValue))
      fireEvent.change(input, { target: { value: 'bla' } })
      expect(input).toHaveValue(String(defaultValue))
    })

    it('keep value 0 when deleting all characters from input', () => {
      const { container } = render(component)
      const input = container.querySelector(inputQuery)

      expect(input).toHaveValue(String(defaultValue))
      fireEvent.change(input, { target: { value: '' } })
      expect(input).toHaveValue('0')
    })
  })
})
