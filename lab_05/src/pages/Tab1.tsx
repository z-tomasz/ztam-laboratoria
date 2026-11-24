import { IonList, IonItem, IonThumbnail, IonLabel, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';

type Item = {
  src: string;
  text: string;
};
const items: Item[] = [
  { src: '/img/pies.jpg', text: 'Pies' },
  { src: '/img/kot.jpg', text: 'Kot' },
  { src: '/img/ptak.jpg', text: 'Ptak' },
  { src: '/img/motyl.jpg', text: 'Motyl' },
  { src: '/img/ryby.jpg', text: 'Ryby' },
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Obrazki</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Obrazki</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {items.map((image) => (
            <IonItem key={image.src}>
              <IonThumbnail slot="start">
                <img src={image.src} alt={image.text} loading="lazy" />
              </IonThumbnail>
              <IonLabel>{image.text}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
