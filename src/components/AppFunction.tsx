import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonSearchbar, IonSkeletonText, IonTitle, IonToast, IonToolbar, getPlatforms, isPlatform } from '@ionic/react';

import axios from "axios";
import 'cors';
import { useEffect, useRef, useState } from 'react';

function NAMAPERUSAHAAN() {
  let platforms = getPlatforms();
  let platform;
  platforms.map((val) => {
    if (val == 'desktop' || val == 'tablet') {
      platform = 'desktop';
    } else {
      platform = 'mobile';
    }
  });
  let obj = {
    panjang: 'PT Jaringan Bersama Kawanan Teknologi',
    pendek: 'PT JiBe',
    urlapi: 'http://dashboard.jibenet.my.id/api/v2/',
    platform: platform
  };
  return obj;
};

export const getDataAPI = async ({ url, data, metode }) => {
  let error, respon = '';
  const getting = await axios({
    baseURL: NAMAPERUSAHAAN().urlapi,
    url: "/index.php?metode=" + url,
    params: data,
    method: metode,
    responseType: 'json',
    timeout: 5000,
}).catch((err) => {
    return { data: err, status: 'err' };
  });
  return { respon: getting.data, error: getting.status };
};

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}

export function LoadingData({ tipe, jumlah }) {
  let jml = [];
  for (let i = 0; i < jumlah; i++) {
    jml[i] = i;
  }
  if (tipe == 'skeleton') {
    return (
      <IonList>
        {jml.map((jml) => {
          return (<IonItem button={true}>
            <IonSkeletonText style={{ width: '30px' }} slot='start' animated={true} />
            <IonLabel>
              <IonSkeletonText animated={true} style={{ width: '80%', height: '20px' }} />
              <IonSkeletonText animated={true} style={{ width: '80%', height: '20px' }} /></IonLabel>
          </IonItem>)
        })}
      </IonList>
    );
  }
}

export const validateMAC = (mac: string, ket: string) => {
  let regex;
  if (ket == 'penghubung') {
    regex = new RegExp('^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$');
  } else {
    regex = new RegExp('^(([A-Fa-f0-9]{2}){5}[A-Fa-f0-9]{2})$');
  }
  return regex.test(mac);
};


export function SelectIPAddress({ open, setOpen, ipAddressSelect, setipaddress }) {
  const [dataIP, setDataIP] = useState([]);
  const [ipAddressSelection, setSelectionIP] = useState(ipAddressSelect);
  const SearchIPAddress = useRef();
  const getDataIPAddress = async () => {
    const data = await getDataAPI({
      url: 'read-ipaddress',
      data: { filter: 'statusip-0|ipalat-' + ipAddressSelect + '/20' },
      metode: 'get'
    });
    if (data.respon.data.length > 0) {
      return data.respon.data;
    } else {
      return data.respon.status;
    }
  }
  if (open === true) {
    if (dataIP.length == 0) {
      getDataIPAddress().then((dataIPA) => {
        setDataIP(dataIPA);
      });
    }
  }
  return (<>
    <IonModal id="modalsIP" isOpen={open} onWillDismiss={() => {
      setOpen(false);
      setipaddress(SearchIPAddress.current.value);
    }}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cari IP Address</IonTitle>
          <IonButtons slot='end'>
            <IonButton onIonFocus={(e) => {
              setOpen(false);
            }} strong={true}>Confirm</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar id="SearchIPAddress" ref={SearchIPAddress} value={ipAddressSelection} placeholder="Masukan IP Address" onIonInput={(e) => {
            let val = e.currentTarget.value;
            val = val.replace("/20", "");
            dataIP.map((ipad) => {
              let ipadd = ipad.ip_address;
              ipadd = ipadd.replace("/20", "");
              let iditem = ipadd.replaceAll(".", "");
              let docitem = document.querySelector("#ipad" + iditem);
              if (val == ipadd || val == '') {
                docitem?.setAttribute('style', 'display:inline');
              } else {
                docitem?.setAttribute('style', 'display:none');
              }
            });
          }}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList inset={true}>
          {dataIP.map((ipadd) => {
            let iditem = ipadd.ip_address.replace("/20", "");
            iditem = iditem.replaceAll(".", "");
            return (<><IonItem button id={"ipad" + iditem} onclick={(e) => {
              setSelectionIP(ipadd.ip_address.replace("/20", ""));
            }} >
              {ipadd.ip_address}

            </IonItem></>)
          })}
        </IonList>
      </IonContent>
    </IonModal>
  </>);
}

export const ErrorAxioss = (durasi: string, errtext: string, isOpen: boolean) => {
  return (<IonToast isOpen={isOpen} message={errtext} duration={durasi}></IonToast>);
}

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 bps'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['bps', 'kbps', 'mbps', 'gbps', 'tbps']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const satuanMasaAktif = (satuan) => {
  let satuanku;
  if (satuan == 0) { satuanku = 'detik'; } else if (satuan == 1) { satuanku = 'menit'; } else if (satuan == 2) { satuanku = 'jam'; } else if (satuan == 3) { satuanku = 'hari'; } else if (satuan == 4) { satuanku = 'bulan'; } else if (satuan == 5) { satuanku = 'tahun'; }
  return satuanku;
}

export const toRupiah = (nominal) => {
  let rupiahformat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(nominal);
  return rupiahformat;
}

export default NAMAPERUSAHAAN;