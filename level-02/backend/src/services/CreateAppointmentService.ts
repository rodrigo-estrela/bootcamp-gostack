import { startOfHour } from 'date-fns'

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request{
  provider: string;
  date: Date;
}

class CreateAppointmentService{
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const appointmentWithSameDate = this.appointmentsRepository.findByDate(appointmentDate)
    if(appointmentWithSameDate){
      throw Error('This date is already booked and it is not available!')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
