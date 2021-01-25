import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

const makeAppointmentsRepo = () => {
  class AppointmentsRepoSpy implements IAppointmentsRepository {
    async create(data: ICreateAppointmentDTO): Promise<Appointment | undefined> {
      const appointment = new Appointment();
      appointment.provider_id = 'any_provider_id',
        appointment.date = new Date(2021, 2, 26);

      return appointment;
    }

    async findByDate(date: Date): Promise<Appointment | undefined> {
      return undefined;
    }
  }

  return new AppointmentsRepoSpy();
};

const makeSut = () => {
  const appointmentsRepoSpy = makeAppointmentsRepo();
  const sut = new CreateAppointmentService(appointmentsRepoSpy);

  return {
    sut,
    appointmentsRepoSpy
  };
};


describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const { sut } = makeSut();
    const appointment = await sut.execute({
      provider_id: 'any_providr_id',
      date: new Date(2021, 2, 26),
    });

    expect(appointment?.provider_id).toBe('any_provider_id');
  });

  it('should throws AppError if already exists an appointment booked for the same date', async () => {
    const { sut, appointmentsRepoSpy } = makeSut();
    jest.spyOn(appointmentsRepoSpy, 'findByDate').mockReturnValueOnce(Promise.resolve(new Appointment()));

    const appointment = {
      provider_id: 'any_providr_id',
      date: new Date(2021, 2, 26),
    };

    expect(sut.execute(appointment)).rejects.toThrow();
  });
});
