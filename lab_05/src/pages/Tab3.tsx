import { IonButton, IonGrid, IonRow, IonCol, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Tab3.css';
import '@ionic/react/css/ionic-swiper.css';

const Tab3: React.FC = () => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const slideChange = (s: SwiperType) => {
    setDisablePrev(s.isBeginning);
    setDisableNext(s.isEnd);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pokaz slajdów</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pokaz slajdów</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Swiper className="slajdy" initialSlide={0} speed={300} onSwiper={setSwiper}
          onSlideChange={slideChange}>
          <SwiperSlide>Slajd 1</SwiperSlide>
          <SwiperSlide>Slajd 2</SwiperSlide>
          <SwiperSlide>Slajd 3</SwiperSlide>
        </Swiper>
        <IonGrid>
          <IonRow>
            <IonCol><IonButton expand="block" disabled={disablePrev} onClick={() => swiper?.slidePrev()}>PREV</IonButton></IonCol>
            <IonCol><IonButton expand="block" disabled={disableNext} onClick={() => swiper?.slideNext()}>NEXT</IonButton></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
