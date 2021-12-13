import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { classToClass } from 'class-transformer';
import ShowProfileService from '../../../services/ShowProfileService';
import UpdateProfileService from '../../../services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ userId: id });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { first_name, last_name, email, old_password, password } =
      request.body;

    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      userId: id,
      first_name,
      last_name,
      email,
      old_password,
      password,
    });

    return response.json(classToClass(user));
  }
}
