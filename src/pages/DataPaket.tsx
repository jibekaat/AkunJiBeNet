import { IonBackButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN from '../components/AppFunction';
import './Home.css';

import { listCircle } from 'ionicons/icons';


const DataPaket: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/" />
          </IonButtons>
          <IonTitle>Data Paket - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset={true}>
        <IonItem detail={true} button={true}>
            <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>
              <h2 className='ion-text-nowrap'>Nama Paket</h2>
              <p>Rp. Biaya Bulanan</p>
              <p>Masa Aktif</p>
              <p>Pelanggan Paket</p>
            </IonLabel>
          </IonItem>
          <IonItem detail={true} button={true}>
            <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>
              <h2 className='ion-text-nowrap'>Nama Paket</h2>
              <p>Rp. Biaya Bulanan</p>
              <p>Masa Aktif</p>
              <p>Pelanggan Paket</p>
            </IonLabel>
          </IonItem>
          <IonItem detail={true} button={true}>
            <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>
              <h2 className='ion-text-nowrap'>Nama Paket</h2>
              <p>Rp. Biaya Bulanan</p>
              <p>Masa Aktif</p>
              <p>Pelanggan Paket</p>
            </IonLabel>
          </IonItem>
          <IonItem detail={true} button={true}>
            <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>
              <h2 className='ion-text-nowrap'>Nama Paket</h2>
              <p>Rp. Biaya Bulanan</p>
              <p>Masa Aktif</p>
              <p>Pelanggan Paket</p>
            </IonLabel>
          </IonItem>
          <IonItem detail={true} button={true}>
            <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
            <IonLabel>
              <h2 className='ion-text-nowrap'>Nama Paket</h2>
              <p>Rp. Biaya Bulanan</p>
              <p>Masa Aktif</p>
              <p>Pelanggan Paket</p>
            </IonLabel>
          </IonItem>

        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DataPaket;
