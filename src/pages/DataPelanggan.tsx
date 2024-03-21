import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonNav, IonNavLink, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN, { LoadingData, formatBytes, getDataAPI, satuanMasaAktif, toRupiah } from '../components/AppFunction';
import './Home.css';

import { add, listCircle, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';

function DataPelanggan() {
  return <IonNav root={() => <DataPelangganPageRoot />}></IonNav>;
}

const getDataPelanggan = async ({ limit, setLimit, search }) => {
  if (typeof search == 'undefined') {
    search = '';
  } else {
    search = 'namapelanggannik-' + search;
    limit = 0;
  }
  const data = await getDataAPI({
    url: 'read-pelanggan',
    data: { filter: 'statuspelanggan-2', limit: (limit * 10) + ',10', search: search },
    metode: 'get'
  });
  if (data.respon.data.length > 0) {
    return data.respon.data;
  } else {
    return data.respon.status;
  }
}

function DataPelangganList(datapaket) {
  datapaket = datapaket.datapaket;
  return (
    <IonNavLink routerDirection="forward" component={() => <DetailDataPelanggan datapaket={datapaket} />}>
      <IonItem detail={true} button={true} >
        <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
        <IonLabel>
          <h2 className='ion-text-nowrap'>{datapaket.nama_pelanggan}</h2>
          <p>{datapaket.kd_pelanggan}</p>
          <p>{datapaket.alamat} Kelurahan/Desa {datapaket.kel_desa} Kecamatan {datapaket.kec} {datapaket.kab_kota} Provinsi {datapaket.prov}</p>
        </IonLabel>
      </IonItem>
    </IonNavLink>
  );
}

const DataPelangganPageRoot: React.FC = () => {
  const [dataPaket, setDataPelanggan] = useState([]);
  const [dataPaketSearch, setDataPelangganSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [searchIcon, searchIconClick] = useState(false);
  useEffect(() => {
    if (dataPaket.length == 0) {
      getDataPelanggan({ setLimit: setPage, limit: page }).then((dataPkt) => {
        setDataPelanggan(dataPkt);
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
          <IonTitle>Data Pelanggan - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value="terpasang">
            <IonSegmentButton value="terpasang">
              <IonLabel>Terpasang</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="barudaftar">
              <IonLabel>Baru Daftar</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="belumpasang">
              <IonLabel>Belum Terpasang</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="berhenti">
              <IonLabel>Berhenti Berlangganan</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="batal">
              <IonLabel>Dibatalkan</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
        {searchIcon == true && (
          <IonToolbar>
            <IonSearchbar animated={true} searchIcon={search} placeholder="Search" onKeyUp={(e) => {
              let vals = e.currentTarget.value;
              let searchLength = vals?.length;
              if (searchLength > 3) {
                getDataPelanggan({ search: vals }).then((dataPktSearch) => {
                  if (dataPktSearch == 0) {
                    setDataPelangganSearch([]);
                  } else {
                    setDataPelangganSearch(dataPktSearch);
                  }
                });
              }
            }}></IonSearchbar>
          </IonToolbar>)}
      </IonHeader>
      <IonContent fullscreen>
        <IonList inset={true}>
          {searchIcon == false ?
            dataPaket.length == 0 || !dataPaket ? (<LoadingData tipe='skeleton' jumlah='6' />) : dataPaket.map((datapakets) => {
              return (<DataPelangganList datapaket={datapakets} />);
            })
            : dataPaketSearch.length == 0 ? (<LoadingData tipe='skeleton' jumlah='6' />) : dataPaketSearch.map((datapakets) => {
              return (<DataPelangganList datapaket={datapakets} />);
            })}
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonNavLink routerDirection="forward" component={() => <DetailDataPelanggan datapaket='add' />}>
            <IonFabButton>
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonNavLink>
        </IonFab>
        {searchIcon == false && (
          <IonInfiniteScroll onIonInfinite={(ev) => {
            if (page >= 0) {
              getDataPelanggan({ setLimit: setPage, limit: page }).then((dataPkt) => {
                if (dataPkt) {
                  setPage(page + 1);
                  setDataPelanggan([...dataPaket, ...dataPkt]);
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

export default DataPelanggan;
