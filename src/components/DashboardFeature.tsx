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
            <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
              <IonImg src="favicon.png" />
            </IonAvatar>
          <IonLabel className="ion-text-wrap namaFitur">Data Perangkat Jaringan</IonLabel>
          </IonCol>
          <IonCol size="4" onClick={()=>{
            window.location.href='/data-paket';
          }}>
            <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
              <IonImg src="favicon.png" />
            </IonAvatar>
            <IonLabel className="ion-text-wrap namaFitur">Data Paket</IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
              <IonImg src="favicon.png" />
            </IonAvatar>
            <IonLabel className="ion-text-wrap namaFitur">Data Pelanggan</IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
              <IonImg src="favicon.png" />
            </IonAvatar>
            <IonLabel className="ion-text-wrap namaFitur">Data Personel</IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
              <IonImg src="favicon.png" />
            </IonAvatar>
            <IonLabel className="ion-text-wrap namaFitur">Data Pengaduan Pelanggan</IonLabel>
          </IonCol>
          <IonCol size="4">
            <IonAvatar className="ion-margin-top ion-margin-start ion-margin-end">
              <IonImg src="favicon.png" />
            </IonAvatar>
            <IonLabel className="ion-text-wrap namaFitur">Data Statistik</IonLabel>
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
