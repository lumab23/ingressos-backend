import Ingresso, { IIngresso } from '../models/Ingresso';

class IngressoRepository {
  async create(data: Partial<IIngresso>): Promise<IIngresso> {
    const ingresso = new Ingresso(data);
    return await ingresso.save();
  }

  async findById(id: string): Promise<IIngresso | null> {
    return Ingresso.findById(id).exec();
  }

  async findAll(): Promise<IIngresso[]> {
    return Ingresso.find().exec();
  }

  async deleteById(id: string): Promise<IIngresso | null> {
    return Ingresso.findByIdAndDelete(id).exec();
  }
}

export default new IngressoRepository();