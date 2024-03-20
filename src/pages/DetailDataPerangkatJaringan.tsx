import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN, { LoadingData, SelectIPAddress, getDataAPI, validateMAC } from '../components/AppFunction';
import './Home.css';

import { add, listCircle, save, saveOutline, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';



function DataAlatList(dataalat) {
  const [isValidMAC, setIsValidMAC] = useState<boolean>();
  const [isOpenIPAddress, setOpenIPAddress] = useState<boolean>(false);
  let tipepakai, statusmilik;
  if (dataalat == 'add') {
    dataalat.ip_address, dataalat.merk_alat, dataalat.tipe_alat, dataalat.mac_address ='';
    tipepakai='';
    statusmilik='';
  } else {
    dataalat = dataalat.dataalat;
    tipepakai=dataalat.tipe_pemakaian;
    statusmilik=dataalat.status_kepemilikan;
  }
  const [ipaddress, setIPAdress] = useState(dataalat.ip_address);
  return (
    <IonList>
      <IonItem>
        <IonSelect className='fonts' label="Tipe Pemakaian" labelPlacement="floating" value={tipepakai}>
          <IonSelectOption value="1">Radio Pemancar</IonSelectOption>
          <IonSelectOption value="2">Radio Penerima</IonSelectOption>
          <IonSelectOption value="3">Router Bridge</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect className='fonts' label="Status Kepemilikan" labelPlacement="floating" value={statusmilik}>
          <IonSelectOption value="1">Sewa/Milik Perusahaan</IonSelectOption>
          <IonSelectOption value="2">Milik Pelanggan</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonInput className='fonts' labelPlacement="floating" value={dataalat.merk_alat} label="Merk Alat" placeholder='Merk Alat'></IonInput>
      </IonItem>
      <IonItem>
        <IonInput className='fonts' labelPlacement="floating" value={dataalat.tipe_alat} label="Tipe Alat" placeholder='Tipe Alat'></IonInput>
      </IonItem>
      <IonItem>
        <IonInput className='fonts' labelPlacement="floating" value={dataalat.mac_address} label="MAC Address" placeholder='MAC Address' maxlength={17} onKeyUp={(e) => {
          let val = e.target.value;
          if (val.length >= 17) {
            let valid = validateMAC(val, 'penghubung');
          } else if (val.length == 12) {
            let valsplit = val.split(':');
            if (valsplit.length == 1) {
              e.currentTarget.maxlength = 12;
              let valid = validateMAC(val);
            } else if (valsplit.length == 6) {
              e.currentTarget.maxlength = 17;
            }
          }
        }}></IonInput>
      </IonItem>
      <IonItem>
        <IonInput className='fonts' id="ipaddress" labelPlacement="floating" value={ipaddress} label="IP Address" placeholder='IP Address' onClick={() => { setOpenIPAddress(true); }}></IonInput>
        <SelectIPAddress setOpen={setOpenIPAddress} open={isOpenIPAddress} ipAddressSelect={ipaddress} setipaddress={setIPAdress} />
      </IonItem>
    </IonList>

  );
}

const DetailDataPerangkatJaringan: React.FC = ({ dataalat }) => {
  const [dataPerangkat, setDataPerangkat] = useState([]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton default-href="/" />
          </IonButtons>
          <IonTitle>{dataalat=='add' ? 'Tambah':'Detail'} Data Perangkat Jaringan - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <DataAlatList dataalat={dataalat} />
      </IonContent>
    </IonPage>
  );
};

export default DetailDataPerangkatJaringan;