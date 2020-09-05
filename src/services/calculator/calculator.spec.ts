import ICoxinhasData from "./icoxinhasdata.interface"
import calculator, { coxinhasPerPerson, pricePerPerson, defaultPricePerPersonValues, defaultCoxinhasCount } from "./calculator"
import type { pricePerPersonParams } from "./calculator"

describe('defaultCoxinhasCount', () => {
  it('contains expected default value', () => {
    expect(defaultCoxinhasCount).toEqual(100)
  })
})

describe('defaultPricePerPersonValues', () => {
  const { peopleCount, birthdayPeopleCount, boxesCount, boxPrice, deliveryPrice } = defaultPricePerPersonValues

  it('contains expected default values', () => {
    expect(peopleCount).toEqual(2)
    expect(birthdayPeopleCount).toEqual(0)
    expect(boxesCount).toEqual(1)
    expect(boxPrice).toEqual(27.5)
    expect(deliveryPrice).toEqual(6)
  })
})

describe('coxinhasPerPerson', () => {
  describe('given two people', () => {
    const peopleCount: number = 2

    describe('with 100 coxinhas per box', () => {
      const coxinhasPerBox: number = 100

      describe('and one coxinhas box', () => {
        const boxesCount: number = 1

        it('calculates coxinhas for each person correctly', () => {
          expect(coxinhasPerPerson(peopleCount, coxinhasPerBox, boxesCount)).toEqual(50)
        })
      })

      describe('and two coxinhas box', () => {
        const boxesCount: number = 2

        it('calculates coxinhas for each person correctly', () => {
          expect(coxinhasPerPerson(peopleCount, coxinhasPerBox, boxesCount)).toEqual(100)
        })
      })
    })

    describe('with 50 coxinhas per box', () => {
      const coxinhasPerBox: number = 50

      describe('and one coxinhas box', () => {
        const boxesCount: number = 1

        it('calculates coxinhas for each person correctly', () => {
          expect(coxinhasPerPerson(peopleCount, coxinhasPerBox, boxesCount)).toEqual(25)
        })
      })

      describe('and two coxinhas box', () => {
        const boxesCount: number = 2

        it('calculates coxinhas for each person correctly', () => {
          expect(coxinhasPerPerson(peopleCount, coxinhasPerBox, boxesCount)).toEqual(50)
        })
      })
    })
  })
})

describe('pricePerPerson', () => {
  let params: pricePerPersonParams

  beforeEach(() => {
    params = {
      ...defaultPricePerPersonValues
    }
  })

  it('with default param values calculates the price per person correctly', () => {
    expect(pricePerPerson(params)).toEqual(16.75)
  })

  describe('with three people', () => {
    beforeEach(() => {
      params.peopleCount = 3
    })

    it('divides the price per all people', () => {
      expect(pricePerPerson(params)).toEqual(11.17)
    })

    describe('and is a birthday of one of them', () => {
      beforeEach(() => {
        params.birthdayPeopleCount = 1
      })

      it('excludes the birthday person from the price division', () => {
        expect(pricePerPerson(params)).toEqual(16.75)
      })
    })
  })

  describe('with one birthday person', () => {
    beforeEach(() => {
      params.birthdayPeopleCount = 1
    })

    it('excludes the birthday person from the price division', () => {
      expect(pricePerPerson(params)).toEqual(33.5)
    })
  })

  describe('with two coxinhas boxes', () => {
    beforeEach(() => {
      params.boxesCount = 2
    })

    it('adds the additional coxinhas box to the price', () => {
      expect(pricePerPerson(params)).toEqual(30.5)
    })
  })

  describe('with a more cheap coxinhas box', () => {
    beforeEach(() => {
      params.boxPrice = 20
    })

    it('adjusts the price division by person', () => {
      expect(pricePerPerson(params)).toEqual(13)
    })
  })

  describe('with a more expensive delivery price', () => {
    beforeEach(() => {
      params.deliveryPrice = 10
    })

    it('adjusts the price division by person', () => {
      expect(pricePerPerson(params)).toEqual(18.75)
    })
  })
})

describe('calculator', () => {
  let params: ICoxinhasData

  beforeEach(() => {
    params = {coxinhasPerBox: defaultCoxinhasCount, ...defaultPricePerPersonValues}
  })

  it('calculates the price and coxinhas per person correctly', () => {
    expect(calculator(params)).toEqual({
      pricePerPerson: 16.75,
      coxinhasPerPerson: 50
    })
  })
})
