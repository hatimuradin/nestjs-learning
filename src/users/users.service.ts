import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/users.schema';
import { MailService } from 'src/mail/mail.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('MQ_SERVICE') private mq_client: ClientProxy,
    @Inject(MailService) private mailService: MailService,
  ) {}

  async create(user: User): Promise<User> {
    const newProduct = new this.userModel(user);
    return newProduct.save();
  }
  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id, Product: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, Product, { new: true });
  }

  async delete(id): Promise<any> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async createUser(body): Promise<any> {
    const user = await this.create(body);
    if (user) {
      this.mailService.sendUserEmail(user);
      this.mq_client.emit('user-created', { user: user.name });
    }
  }
}
