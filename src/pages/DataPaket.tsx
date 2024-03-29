import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonNav, IonNavLink, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import NAMAPERUSAHAAN, { LoadingData, formatBytes, getDataAPI, satuanMasaAktif, toRupiah } from '../components/AppFunction';
import './Home.css';

import { add, listCircle, search } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import DetailDataPaket from './DetailDataPaket';

function DataPaket() {
  return <IonNav root={() => <DataPaketPageRoot />}></IonNav>;
}

const getDataPaket = async ({ limit, setLimit, search }) => {
  if (typeof search == 'undefined') {
    search = '';
  } else {
    search = 'namapaket-' + search;
    limit = 0;
  }
  const data = await getDataAPI({
    url: 'read-paket',
    data: { filter: 'status-1', limit: (limit * 10) + ',10', search: search },
    metode: 'get'
  });
  if (data.respon.data.length > 0) {
    return data.respon.data;
  } else {
    return data.respon.status;
  }
}

function DataPaketList(datapaket) {
  datapaket = datapaket.datapaket;
  return (
    <IonNavLink routerDirection="forward" component={() => <DetailDataPaket datapaket={datapaket} /> }>
      <IonItem detail={true} button={true} >
        <IonIcon color="info" slot="start" icon={listCircle} size="large"></IonIcon>
        <IonLabel>
          <h2 className='ion-text-nowrap'>{datapaket.nama_paket}</h2>
          <p>Bandwidth Upload {formatBytes((datapaket.kec_up * 1000 * 1.5))}</p>
          <p>Bandwidth Download {formatBytes((datapaket.kec_down * 1000 * 2.5))}</p>
          <p>{toRupiah(datapaket.biaya)} per {datapaket.masa_aktif} {satuanMasaAktif(datapaket.satuan_masa_aktif)}</p>
        </IonLabel>
      </IonItem>
    </IonNavLink>
  );
}

const DataPaketPageRoot: React.FC = () => {
  const [dataPaket, setDataPaket] = useState([]);
  const [dataPaketSearch, setDataPaketSearch] = useState([]);
  const [page, setPage] = useState(0);
  const [searchIcon, searchIconClick] = useState(false);
  useEffect(() => {
    if (dataPaket.length == 0) {
      getDataPaket({ setLimit: setPage, limit: page }).then((dataPkt) => {
        setDataPaket(dataPkt);
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
          <IonTitle>Data Paket - {NAMAPERUSAHAAN().pendek}</IonTitle>
        </IonToolbar>
        {searchIcon == true && (
          <IonToolbar>
            <IonSearchbar animated={true} searchIcon={search} placeholder="Search" onKeyUp={(e) => {
              let vals = e.currentTarget.value;
              let searchLength = vals?.length;
              if (searchLength > 3) {
                getDataPaket({ search: vals }).then((dataPktSearch) => {
                  if (dataPktSearch == 0) {
                    setDataPaketSearch([]);
                  } else {
                    setDataPaketSearch(dataPktSearch);
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
              return (<DataPaketList datapaket={datapakets} />);
            })
            : dataPaketSearch.length == 0 ? (<LoadingData tipe='skeleton' jumlah='6' />) : dataPaketSearch.map((datapakets) => {
              return (<DataPaketList datapaket={datapakets} />);
            })}
        </IonList>
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonNavLink routerDirection="forward" component={() => <DetailDataPaket datapaket='add' />}><IonIcon icon={add}></IonIcon></IonNavLink>
          </IonFabButton>
        </IonFab>
        {searchIcon == false && (
          <IonInfiniteScroll onIonInfinite={(ev) => {
            if (page >= 0) {
              getDataPaket({ setLimit: setPage, limit: page }).then((dataPkt) => {
                if (dataPkt) {
                  setPage(page + 1);
                  setDataPaket([...dataPaket, ...dataPkt]);
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

export default DataPaket;
