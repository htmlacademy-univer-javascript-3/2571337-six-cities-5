import { withHistory, withStore } from '../../mocks/mocks-component';
import { LoginPage } from './login-page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: LoginPage', () => {
  it('should render correctly', () => {
    const imgAltText = '6 cities logo';
    const headerText = 'Sign in';
    const emailText = 'E-mail';
    const passwordText = 'Password';
    const componentWithRouting = withHistory(<LoginPage/>);
    const { componentWithStore: preparedComponent } = withStore(componentWithRouting);

    render(preparedComponent);

    expect(screen.getByAltText(imgAltText)).toBeInTheDocument();
    expect(screen.getAllByText(headerText).length).toBe(2);
    expect(screen.getByText(emailText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correcltly with enter email and password', async () => {
    const emailElement = 'emailElement';
    const passwordElement = 'passwordElement';
    const expectedEmailText = 'student@gmail.com';
    const expectedPasswordText = '12344321';
    const componentWithRouting = withHistory(<LoginPage/>);
    const { componentWithStore: preparedComponent } = withStore(componentWithRouting);

    render(preparedComponent);
    await userEvent.type(screen.getByTestId(emailElement), expectedEmailText);
    await userEvent.type(screen.getByTestId(passwordElement), expectedPasswordText);

    expect(screen.getByDisplayValue(expectedEmailText)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordText)).toBeInTheDocument();
  });
});
