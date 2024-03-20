import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonNav, IonNavLink, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN, { ErrorAxioss, LoadingData, getDataAPI } from '../components/AppFunction';
import './Home.css';

import { add, listCircle, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import DetailDataPerangkatJaringan from './DetailDataPerangkatJaringan';

function DataPerangkatJaringan() {
  return <IonNav root={() => <DataPerangkatJaringanPageRoot />}></IonNav>;
}

const getDataPerangkatJaringan = async ({ limit, setLimit, search }) => {
  if (typeof search == 'undefined') {
    search = '';
  } else {
    search = 'merktipepelangganmacip-' + search;
    limit = 0;
  }
  const data = await getDataAPI({
    url: 'read-alat',
    data: { filter:'statusalat-1', limit: (limit * 10) + ',10', search: search },
    metode: 'get'
  });
  if (data.respon.status == 'err') {
    return ErrorAxioss(5000, data.respon.data, true);
  } else {
    return data.respon.data;
  }
}

function DataAlatList(dataalat) {
  dataalat = dataalat.dataalat;
  let koordinat, statusmilik = '';
  if (dataalat.status_kepemilikan == 1) {
    statusmilik = 'Hak Milik Perusahaan';
  } else {
    statusmilik = 'Hak Milik Pelanggan';
  }
  koordinat = { __html: '<p>' + dataalat.latitude + ',' + dataalat.longitude + '</p>' };
  return (
    <IonNavLink routerDirection="forward" component={() => <DetailDataPerangkatJaringan dataalat={dataalat} />}>
      <IonItem detail={true} button={true} >
        <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
        <IonLabel>
          <h2 className='ion-text-nowrap'>{dataalat.merk_alat} {dataalat.tipe_alat}</h2>
          <p>{dataalat.ip_address}</p>
          <p>{dataalat.mac_address}</p>
          <p>{statusmilik}</p>
          <p dangerouslySetInnerHTML={koordinat} />
        </IonLabel>
      </IonItem>
    </IonNavLink>
  );
}

const DataPerangkatJaringanPageRoot: React.FC = () => {
  const [dataPerangkat, setDataPerangkat] = useState([]);
  const [dataPerangkatSearch, setDataPerangkatSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [searchIcon, searchIconClick] = useState(false);
  useEffect(() => {
    if (dataPerangkat.length == 0) {
      getDataPerangkatJaringan({ setLimit: setPage, limit: page }).then((dataPJ) => {
        setDataPerangkat(dataPJ);
      });
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons onClick={() => { history.back(); }} slot="start">
            <IonBackButton defaultHref='/home' />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => {
              if (searchIcon == false) {
                searchIconClick(true);
              } else {
                searchIconClick(false);
              }
            }}>
              <IonIcon slot="icon-only" icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Data Perangkat Jaringan - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
        {searchIcon == true && (
          <IonToolbar>
            <IonSearchbar animated={true} searchIcon={search} placeholder="Search" onKeyUp={(e) => {
              let vals = e.currentTarget.value;
              let searchLength = vals?.length;
              if (searchLength > 3) {
                getDataPerangkatJaringan({ search: vals }).then((dataPJSearch) => {
                  if (dataPJSearch == 0) {
                    setDataPerangkatSearch([]);
                  } else {
                    setDataPerangkatSearch(dataPJSearch);
                  }
                });
              }
            }}></IonSearchbar>
          </IonToolbar>)}
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset={true}>
          {searchIcon == false ?
            dataPerangkat.length == 0 || !dataPerangkat ? (<LoadingData tipe='skeleton' jumlah='6' />) : dataPerangkat.map((dataalat) => {
              return (<DataAlatList dataalat={dataalat} />);
            })
            : dataPerangkatSearch.length == 0 ? (<LoadingData tipe='skeleton' jumlah='6' />) : dataPerangkatSearch.map((dataalat) => {
              return (<DataAlatList dataalat={dataalat} />);
            })}
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonNavLink routerDirection="forward" component={() => <DetailDataPerangkatJaringan dataalat='add' />}>
            <IonFabButton>
              <IonNavLink routerDirection="forward" component={() => <DetailDataPerangkatJaringan dataalat='add' />}><IonIcon icon={add}></IonIcon></IonNavLink>
            </IonFabButton>
          </IonNavLink>
        </IonFab>
        {searchIcon == false && (
          <IonInfiniteScroll onIonInfinite={(ev) => {
            if (page >= 0) {
              getDataPerangkatJaringan({ setLimit: setPage, limit: page }).then((dataPJ) => {
                if (dataPJ) {
                  setPage(page + 1);
                  setDataPerangkat([...dataPerangkat, ...dataPJ]);
                } else {
                  setPage(-1);
                }
              });
            }
            setTimeout(() => ev.target.complete(), 500);
          }}
          >
            <IonInfiniteScrollContent loadingText={"Please wait [" + page + "]..."} loadingSpinner="dots"></IonInfiniteScrollContent>
          </IonInfiniteScroll>)}

      </IonContent>
    </IonPage>
  );
};

export default DataPerangkatJaringan;
