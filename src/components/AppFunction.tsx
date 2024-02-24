import { IonItem, IonLabel, IonList, IonSkeletonText, getPlatforms, isPlatform } from '@ionic/react';

import axios from "axios";
import 'cors';

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
    urlapi: 'http://jibenet.jilberlian.id/api/v2/',
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

export default NAMAPERUSAHAAN;