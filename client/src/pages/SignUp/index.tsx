import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';
import { FaFire } from 'react-icons/fa';

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          first_name: Yup.string().required('First name mandatory'),
          last_name: Yup.string().required('Last name mandatory'),
          email: Yup.string()
            .email('Insert a valid email')
            .required('E-mail mandatory'),
          password: Yup.string().min(6, 'At least 6 digits'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'Success!',
          description: 'You can now log in.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Registration error',
          description:
            'An error occurred while trying to sign you up, please try again.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <div className="sidebar-icon group bg-white text-secondary">
            <FaFire size="80" />
          </div>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Register</h1>

            <Input name="first_name" icon={FiUser} placeholder="First Name" />
            <Input name="last_name" icon={FiUser} placeholder="Last Name" />

            <Input name="email" icon={FiMail} placeholder="Email" />

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />

            <Button type="submit">Register</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Back to sign in
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
