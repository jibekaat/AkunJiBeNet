import { IonBackButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN, { LoadingData, getDataAPI } from '../components/AppFunction';
import './Home.css';

import { add, listCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';

const getDataPaket = async () => {
  const data = await getDataAPI({
    url: 'read-paket',
    data: { limit: '0,5' },
    metode: 'get'
  });
  if (data.respon.data.length > 0) {
    return data.respon.data;
  }
}

const DataPerangkatJaringan: React.FC = () => {
  const [dataPerangkat, setDataPerangkat] = useState([]);
  useEffect(() => {
    if (dataPerangkat.length == 0) {
      getDataPerangkatJaringan().then((dataPJ) => {
        setDataPerangkat(dataPJ);
      });
    }
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/" />
          </IonButtons>
          <IonTitle>Data Perangkat Jaringan - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset={true}>
          {dataPerangkat.length == 0 ? (<LoadingData tipe='skeleton' jumlah='6' />) : dataPerangkat.map((dataalat) => {
            let koordinat, statusmilik = '';
            if (dataalat.status_kepemilikan == 1) {
              statusmilik = 'Hak Milik Perusahaan';
            } else {
              statusmilik = 'Hak Milik Pelanggan';
            }
            koordinat = { __html: '<p>' + dataalat.latitude + ',' + dataalat.longitude + '</p>' };
            return (
              <IonItem detail={true} button={true}>
                <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
                <IonLabel>
                  <h2 className='ion-text-nowrap'>{dataalat.merk_alat} {dataalat.tipe_alat}</h2>
                  <p>{dataalat.ip_address}</p>
                  <p>{dataalat.mac_address}</p>
                  <p>{statusmilik}</p>
                  <div dangerouslySetInnerHTML={koordinat} />
                </IonLabel>
              </IonItem>);
          })}
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default DataPerangkatJaringan;
