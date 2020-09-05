import ICoxinhasData from './icoxinhasdata.interface'

export type coxinhasResult = { pricePerPerson: number, coxinhasPerPerson: number }
export type pricePerPersonParams = {
  peopleCount: number,
  birthdayPeopleCount: number,
  boxesCount: number,
  boxPrice: number,
  deliveryPrice: number
}

const defaultCoxinhasCount: number = 100

const defaultPricePerPersonValues: pricePerPersonParams = {
  peopleCount: 2,
  birthdayPeopleCount: 0,
  boxesCount: 1,
  boxPrice: 27.5,
  deliveryPrice: 6
}

const coxinhasPerPerson = (peopleCount: number, coxinhasPerBox: number, boxesCount: number): number => {
  const totalCoxinhas = coxinhasPerBox * boxesCount
  const totalPerPerson = totalCoxinhas / peopleCount

  return totalPerPerson
}

const pricePerPerson = (params: pricePerPersonParams): number => {
  const { boxesCount, boxPrice, deliveryPrice, peopleCount, birthdayPeopleCount } = params

  const totalPrice = (boxesCount * boxPrice) + deliveryPrice
  const totalPayingPeople = peopleCount - birthdayPeopleCount

  return Number((totalPrice / totalPayingPeople).toFixed(2))
}

const calculator = (coxinhasData: ICoxinhasData): coxinhasResult => {
  const {
    boxesCount, boxPrice, deliveryPrice, peopleCount, birthdayPeopleCount, coxinhasPerBox
  } = coxinhasData

  const pricePerPersonParams: pricePerPersonParams = {
    boxesCount, boxPrice, deliveryPrice, birthdayPeopleCount, peopleCount
  }

  return {
    pricePerPerson: pricePerPerson(pricePerPersonParams),
    coxinhasPerPerson: coxinhasPerPerson(peopleCount, coxinhasPerBox, boxesCount)
  }
}

export {
  defaultCoxinhasCount,
  defaultPricePerPersonValues,
  coxinhasPerPerson,
  pricePerPerson
}

export default calculator
