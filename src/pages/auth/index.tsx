import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

import { AuthLayout, CenteredLayout } from '@src/components';

import LoginForm from '../../components/login-form/LoginForm';
import RegisterForm from '../../components/register-form/RegisterForm';
import { PagePath } from './constants/pageTab';

const AuthPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const theme = useTheme();

  const currentTab = useMemo(
    () => (router.query.tab === PagePath.REGISTER ? PagePath.REGISTER : PagePath.LOGIN),
    [router.query.tab]
  );

  const onChangeTab = (_event: React.SyntheticEvent, value: string) => {
    router.push({
      pathname: router.pathname,
      query: { tab: value.slice(1) },
    });
  };

  return (
    <AuthLayout>
      <CenteredLayout>
        <TabContext value={currentTab}>
          <TabList
            TabIndicatorProps={{ sx: { color: theme.palette.text.primary } }}
            onChange={onChangeTab}
            sx={{ mb: 4 }}
            variant="fullWidth"
          >
            <Tab
              label={t('auth.login')}
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.text.white,
              }}
              value="/login"
            />
            <Tab
              label={t('auth.signUp')}
              sx={{
                fontSize: theme.typography.h5.fontSize,
                color: theme.palette.text.white,
              }}
              value="/register"
            />
          </TabList>
          <TabPanel value="/register" sx={{ p: 0 }}>
            <RegisterForm />
          </TabPanel>
          <TabPanel value="/login" sx={{ p: 0 }}>
            <LoginForm />
          </TabPanel>
        </TabContext>
      </CenteredLayout>
    </AuthLayout>
  );
};

export default AuthPage;
