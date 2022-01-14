import { useSelector } from 'react-redux';
import { ForgotPasswordResetForm } from '../../components/password-reset/ForgotPasswordResetForm';

import PasswordResetForm from '../../components/password-reset-form/PasswordResetForm';

const ResetPassword = () => {
  const { showResetPasswordForm } = useSelector((state) => state.user);
  return (
    <div className="register-page mb-5">
      {showResetPasswordForm ? (
        <ForgotPasswordResetForm />
      ) : (
        <PasswordResetForm />
      )}
    </div>
  );
};

export default ResetPassword;
