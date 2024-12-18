import { DetailsTrip } from '../Components/PassengersPageComponents/DetailsTrip/DetailsTrip'
import { PassengersInfo } from '../Components/PassengersPageComponents/Passengers/PassengersInfo'
import '../styles/Passengers.scss'

export const Passengers = () => {
  return (
    <section className='Passengers-wrapper'>
     <DetailsTrip />
     <PassengersInfo />
    </section>
  )
}
