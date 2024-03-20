import { IonAvatar, IonCol, IonGrid, IonImg, IonItem, IonLabel, IonRow, IonText } from "@ionic/react";
import "./DashboardFeature.css";
interface ContainerProps { }

const BodyAkun = () => {
  return (
    <IonGrid>
    <IonRow>
        <IonCol size="12" id="akun">
          <IonItem>
            <IonAvatar slot='start'>
              <IonImg src='favicon.png' />
            </IonAvatar>
            <IonLabel>
              <h1 className='ion-text-nowrap'><strong>Jilbert Novander Kaat</strong></h1>
              <IonText>AkunJiBeNet</IonText>
            </IonLabel>
          </IonItem>
        </IonCol>
      </IonRow>
    </IonGrid>);
}

const BodyFeature = ({ platforms }) => {
  if (platforms == 'desktop') {
    return (<>
      <IonGrid>
        <IonRow className="ion-padding">
          <IonCol size="4" onClick={()=>{
            window.location.href='/data-perangkat-jaringan';
          }}>
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png"/>
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Perangkat Jaringan</IonLabel>
            </div>
          </IonCol>
          
          <IonCol size="4" onClick={()=>{
            window.location.href='/data-paket';
          }}>
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Paket</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Pelanggan</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Personel</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Pengaduan Pelanggan</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Statistik</IonLabel>
            </div>
          </IonCol>

        </IonRow>
      </IonGrid>
    </>);
  } else {
    return (<>
      <IonGrid>
        <IonRow className="ion-padding">
          <IonCol size="4" onClick={()=>{
            window.location.href='/data-perangkat-jaringan';
          }}>
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png"/>
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Perangkat Jaringan</IonLabel>
            </div>
          </IonCol>
          
          <IonCol size="4" onClick={()=>{
            window.location.href='/data-paket';
          }}>
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Paket</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4" onClick={()=>{
            window.location.href='/data-pelanggan';
          }}>
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Pelanggan</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Personel</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Pengaduan Pelanggan</IonLabel>
            </div>
          </IonCol>

          <IonCol size="4">
            <div className="logoFitur">
              <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
                <IonImg src="favicon.png" />
              </IonAvatar>
            </div>
            <div className="namaFitur">
              <IonLabel>Data Statistik</IonLabel>
            </div>
          </IonCol>

        </IonRow>
      </IonGrid>
    </>);
  }
};

const DashboardFeature: React.FC<ContainerProps> = ({ platform }) => {
  return (<>
    <BodyAkun />
    <BodyFeature platforms={platform} />
  </>);
};

export default DashboardFeature;
