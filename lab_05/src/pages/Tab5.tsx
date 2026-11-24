import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import PoleCzworokata from '../components/PoleCzworokata';
import './Tab5.css';

const Tab5: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pole czworokąta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pole czworokąta</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PoleCzworokata />
      </IonContent>
    </IonPage>
  );
};

export default Tab5;
