import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN from '../components/AppFunction';
import './Home.css';

import { useEffect, useState } from 'react';

function DataPaketList(datapaket) {
  let satuanmasaaktif;
  if (datapaket == 'add') {
    datapaket.kd_paket, datapaket.nama_paket, datapaket.masa_aktif = '';
    satuanmasaaktif = '';
  } else {
    datapaket = datapaket.datapaket;
    satuanmasaaktif = datapaket.satuan_masa_aktif;
  }
  return (
    <IonList>
      <IonItem>
        <IonInput labelPlacement="floating" value={datapaket.kd_paket} label="Kode Paket" placeholder='Kode Paket' maxlength={75}></IonInput>
      </IonItem>
      <IonItem>
        <IonInput labelPlacement="floating" value={datapaket.nama_paket} label="Nama Paket" placeholder='Nama Paket' maxlength={150}></IonInput>
      </IonItem>
      <IonItem>
        <IonInput labelPlacement="floating" value={datapaket.masa_aktif} label="Masa Aktif" placeholder='Masa Aktif' min={1} type='number'></IonInput>
      </IonItem>
      <IonItem>
        <IonSelect label="Satuan " labelPlacement="floating" value={satuanmasaaktif}>
          <IonSelectOption value="0">Detik</IonSelectOption>
          <IonSelectOption value="1">Menit</IonSelectOption>
          <IonSelectOption value="2">Jam</IonSelectOption>
          <IonSelectOption value="3">Hari</IonSelectOption>
          <IonSelectOption value="4">Bulan</IonSelectOption>
          <IonSelectOption value="5">Tahun</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>

  );
}

const DetailDataPaket: React.FC = ({ datapaket }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/" />
          </IonButtons>
          <IonTitle>{datapaket == 'add' ? 'Tambah' : 'Detail'} Data Paket - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DataPaketList datapaket={datapaket} />
      </IonContent>
    </IonPage>
  );
};

export default DetailDataPaket;