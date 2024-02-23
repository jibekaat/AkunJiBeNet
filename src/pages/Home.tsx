import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN from '../components/AppFunction';
import './Home.css';
import DashboardFeature from '../components/DashboardFeature';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{NAMAPERUSAHAAN().panjang}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DashboardFeature platform={NAMAPERUSAHAAN().platform} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
