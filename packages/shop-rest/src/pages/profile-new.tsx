import { NextPage } from 'next';
import { Modal } from '@redq/reuse-modal';
import { ProfileProvider } from 'contexts/profile/profile.provider';
import SettingsContent from 'features/user-profile/settings/settings';
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from 'features/user-profile/user-profile.style';
import Sidebar from 'features/user-profile/sidebar/sidebar';
import Point from 'features/poin-pay';
import { SEO } from 'components/seo';
import Footer from 'layouts/footer';
import ErrorMessage from 'components/error-message/error-message';

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const ProfilePage: NextPage<Props> = ({ deviceType }) => {
  return (
    <>
      <SEO title="Profile - SecondHandShop" description="Profile Details" />
      <ProfileProvider>
        <Modal>
          <PageWrapper>
            <SidebarSection>
              <Sidebar /> 
              <Point deviceType={deviceType}/>
            </SidebarSection>
            <ContentBox>
              <SettingsContent deviceType={deviceType} />
            </ContentBox>

            <Footer />
          </PageWrapper>
        </Modal>
      </ProfileProvider>
    </>
  );
};

export default ProfilePage;