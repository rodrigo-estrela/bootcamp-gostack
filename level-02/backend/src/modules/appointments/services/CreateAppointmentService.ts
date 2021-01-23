import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  constructor(private appointmentsRepository: IAppointmentsRepository) { }

  public async execute({ provider_id, date }: Request): Promise<Appointment | undefined> {

    const appointmentDate = startOfHour(date);

    const appointmentWithSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (appointmentWithSameDate) {
      throw new AppError('This date is already booked and it is not available!', 401);
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;
